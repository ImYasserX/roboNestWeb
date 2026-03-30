"use client";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  QueryConstraint,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { Product, sampleProducts } from "@/src/data/products";

// Firestore product document structure
export interface FirestoreProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images?: string[];
  imageUrl?: string;
  description?: string;
  category: string;
  brand?: string;
  emoji?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  discount?: number;
  isNew?: boolean;
  inStock?: boolean;
  createdAt?: Timestamp;
}

// Convert Firestore document to Product type
function mapFirestoreToProduct(docData: FirestoreProduct): Product {
  return {
    id: docData.id,
    name: docData.name,
    brand: docData.brand || "Unknown",
    category: docData.category,
    price: docData.price,
    originalPrice: docData.originalPrice,
    discount: docData.discount,
    emoji: docData.emoji || "📦",
    imageUrl: docData.imageUrl || (docData.images && docData.images[0]),
    isNew: docData.isNew,
    rating: docData.rating || 4.0,
    reviewCount: docData.reviewCount || 0,
    stock: docData.stock ?? (docData.inStock === false ? 0 : 10),
    description: docData.description,
  };
}

export interface FetchProductsOptions {
  category?: string;
  sortBy?: "price-asc" | "price-desc" | "newest" | "featured";
  limitCount?: number;
  inStockOnly?: boolean;
}

export interface FetchProductsResult {
  products: Product[];
  categories: string[];
  source: "firebase" | "fallback";
  error?: string;
}

// Fetch all products from Firestore
export async function fetchProducts(
  options: FetchProductsOptions = {}
): Promise<FetchProductsResult> {
  try {
    const constraints: QueryConstraint[] = [];

    // Category filter
    if (options.category) {
      constraints.push(where("category", "==", options.category));
    }

    // In-stock filter
    if (options.inStockOnly) {
      constraints.push(where("inStock", "!=", false));
    }

    // Sorting
    switch (options.sortBy) {
      case "price-asc":
        constraints.push(orderBy("price", "asc"));
        break;
      case "price-desc":
        constraints.push(orderBy("price", "desc"));
        break;
      case "newest":
        constraints.push(orderBy("createdAt", "desc"));
        break;
      default:
        // Featured or default - no specific order from Firestore
        break;
    }

    // Limit
    if (options.limitCount) {
      constraints.push(limit(options.limitCount));
    }

    const productsRef = collection(db, "products");
    const q = constraints.length > 0 ? query(productsRef, ...constraints) : productsRef;
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // No products in Firestore, use fallback
      return {
        products: sampleProducts,
        categories: [...new Set(sampleProducts.map((p) => p.category))],
        source: "fallback",
      };
    }

    const products: Product[] = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<FirestoreProduct, "id">;
      return mapFirestoreToProduct({ id: doc.id, ...data });
    });

    // Extract unique categories from fetched products
    const categories = [...new Set(products.map((p) => p.category))];

    return {
      products,
      categories,
      source: "firebase",
    };
  } catch (error) {
    // Return fallback data on error (silent fallback for better UX)
    console.log("[Products] Using demo data (Firebase not configured or permission denied)");
    return {
      products: sampleProducts,
      categories: [...new Set(sampleProducts.map((p) => p.category))],
      source: "fallback",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Fetch a single product by ID
export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<FirestoreProduct, "id">;
      return mapFirestoreToProduct({ id: docSnap.id, ...data });
    }

    // Fallback to sample products
    const fallbackProduct = sampleProducts.find((p) => p.id === id);
    return fallbackProduct || null;
  } catch (error) {
    // Fallback to sample products on error (silent for better UX)
    console.log("[Products] Using demo product (Firebase not accessible)");
    const fallbackProduct = sampleProducts.find((p) => p.id === id);
    return fallbackProduct || null;
  }
}

// Product data for creating/updating
export interface ProductInput {
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  discount?: number | null;
  emoji?: string;
  description?: string;
  stock: number;
  isNew?: boolean;
  images?: string[];
  imageUrl?: string;
}

// Create a new product in Firestore
export async function createProduct(data: ProductInput): Promise<string> {
  try {
    const productData = {
      ...data,
      rating: 4.5,
      reviewCount: 0,
      inStock: data.stock > 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "products"), productData);
    return docRef.id;
  } catch (error) {
    console.error("[v0] Firebase create product error:", error);
    throw new Error("Failed to create product");
  }
}

// Update an existing product in Firestore
export async function updateProduct(id: string, data: Partial<ProductInput>): Promise<void> {
  try {
    const updateData = {
      ...data,
      inStock: data.stock !== undefined ? data.stock > 0 : undefined,
      updatedAt: serverTimestamp(),
    };

    // Remove undefined values
    Object.keys(updateData).forEach((key) => {
      if (updateData[key as keyof typeof updateData] === undefined) {
        delete updateData[key as keyof typeof updateData];
      }
    });

    await updateDoc(doc(db, "products", id), updateData);
  } catch (error) {
    console.error("[v0] Firebase update product error:", error);
    throw new Error("Failed to update product");
  }
}

// Delete a product from Firestore
export async function deleteProduct(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error) {
    console.error("[v0] Firebase delete product error:", error);
    throw new Error("Failed to delete product");
  }
}

// Fetch related products (same category, exclude current)
export async function fetchRelatedProducts(
  category: string,
  excludeId: string,
  limitCount: number = 4
): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      where("category", "==", category),
      limit(limitCount + 1) // Fetch one extra in case current product is included
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Fallback to sample products
      return sampleProducts
        .filter((p) => p.category === category && p.id !== excludeId)
        .slice(0, limitCount);
    }

    const products: Product[] = snapshot.docs
      .map((doc) => {
        const data = doc.data() as Omit<FirestoreProduct, "id">;
        return mapFirestoreToProduct({ id: doc.id, ...data });
      })
      .filter((p) => p.id !== excludeId)
      .slice(0, limitCount);

    return products;
  } catch (error) {
    // Fallback to sample products (silent for better UX)
    console.log("[Products] Using demo related products");
    return sampleProducts
      .filter((p) => p.category === category && p.id !== excludeId)
      .slice(0, limitCount);
  }
}

// Fetch all unique categories from Firestore
export async function fetchCategories(): Promise<string[]> {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    if (snapshot.empty) {
      return [...new Set(sampleProducts.map((p) => p.category))];
    }

    const categories = new Set<string>();
    snapshot.docs.forEach((doc) => {
      const data = doc.data() as FirestoreProduct;
      if (data.category) {
        categories.add(data.category);
      }
    });

    return Array.from(categories);
  } catch (error) {
    console.log("[Products] Using demo categories");
    return [...new Set(sampleProducts.map((p) => p.category))];
  }
}
