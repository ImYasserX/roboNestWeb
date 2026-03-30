"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import ProductCard from "./ProductCard";
import PageContainer from "@/src/components/PageContainer";
import { Product, sampleProducts } from "@/src/data/products";

interface FirestoreProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  emoji: string;
  imageUrl?: string;
  description?: string;
  specs?: Record<string, string>;
  features?: string[];
  isPopular?: boolean;
}

export default function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        
        let snap = await getDocs(
          query(productsRef, where("isPopular", "==", true), limit(8))
        );

        if (snap.empty) {
          snap = await getDocs(query(productsRef, limit(8)));
        }

        if (!snap.empty) {
          const firestoreProducts: Product[] = snap.docs.map((doc) => {
            const data = doc.data() as FirestoreProduct;
            return {
              id: doc.id,
              name: data.name,
              price: data.price,
              originalPrice: data.originalPrice,
              category: data.category,
              rating: data.rating || 4.5,
              reviews: data.reviews || 0,
              stock: data.stock || 10,
              emoji: data.emoji || "📦",
              imageUrl: data.imageUrl,
              description: data.description || "",
              specs: data.specs || {},
              features: data.features || [],
            };
          });
          setProducts(firestoreProducts);
        }
      } catch (error) {
        // Firebase not accessible - use sample products as fallback
        setProducts(sampleProducts.slice(0, 8));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [mounted]);

  if (!mounted) return null;

  if (loading) {
    return (
      <PageContainer as="section" style={{ paddingBlock: "32px" }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#1E1E2F",
            marginBottom: 24,
          }}
        >
          Popular Products
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={{ gap: 24 }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                background: "#F0EFFE",
                borderRadius: 16,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </PageContainer>
    );
  }

  if (products.length === 0) {
    return (
      <PageContainer as="section" style={{ paddingBlock: "32px" }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#1E1E2F",
            marginBottom: 24,
          }}
        >
          Popular Products
        </h2>
        <div
          style={{
            textAlign: "center",
            padding: "48px 16px",
            background: "#F8F9FF",
            borderRadius: 16,
          }}
        >
          <p style={{ color: "#6B6B8A", fontSize: 16 }}>
            No products available. Add products to Firestore to display them here.
          </p>
        </div>
    </PageContainer>
  );
}

  return (
    <PageContainer as="section" style={{ paddingBlock: "32px" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#1E1E2F",
          marginBottom: 24,
        }}
      >
        Popular Products
      </h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        style={{ gap: 24 }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PageContainer>
  );
}
