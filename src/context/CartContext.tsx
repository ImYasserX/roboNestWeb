"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "./AuthContext";
import { CartItem, Product } from "@/src/data/products";

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "robonest_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage or Firestore
  const loadCart = useCallback(async () => {
    setLoading(true);
    
    // Always check localStorage first
    const localCart = localStorage.getItem(CART_KEY);
    const localItems: CartItem[] = localCart ? JSON.parse(localCart) : [];
    
    if (user) {
      try {
        // Try to load from Firestore
        const docRef = doc(db, "carts", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const firestoreItems = docSnap.data().items || [];
          // Merge with localStorage items
          if (localItems.length > 0) {
            const mergedItems = [...firestoreItems];
            localItems.forEach((localItem) => {
              const existingIndex = mergedItems.findIndex(
                (item) => item.productId === localItem.productId
              );
              if (existingIndex >= 0) {
                mergedItems[existingIndex].quantity += localItem.quantity;
              } else {
                mergedItems.push(localItem);
              }
            });
            setItems(mergedItems);
            localStorage.removeItem(CART_KEY);
            // Save merged cart to Firestore
            try {
              await setDoc(docRef, { items: mergedItems, updatedAt: serverTimestamp() });
            } catch (e) {
              // Save to localStorage if Firestore fails
              localStorage.setItem(CART_KEY, JSON.stringify(mergedItems));
            }
          } else {
            setItems(firestoreItems);
          }
        } else {
          // No Firestore cart, use localStorage
          setItems(localItems);
          if (localItems.length > 0) {
            try {
              await setDoc(docRef, { items: localItems, updatedAt: serverTimestamp() });
              localStorage.removeItem(CART_KEY);
            } catch (e) {
              // Keep in localStorage if Firestore fails
            }
          }
        }
      } catch (error) {
        // Firestore not accessible, use localStorage (silent for better UX)
        setItems(localItems);
      }
    } else {
      // Not logged in, use localStorage
      setItems(localItems);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Save cart
  const saveCart = useCallback(
    async (newItems: CartItem[]) => {
      // Always save to localStorage as backup
      localStorage.setItem(CART_KEY, JSON.stringify(newItems));
      
      if (user) {
        try {
          const docRef = doc(db, "carts", user.uid);
          await setDoc(docRef, { items: newItems, updatedAt: serverTimestamp() });
          // Clear localStorage on successful Firestore save
          localStorage.removeItem(CART_KEY);
        } catch (error) {
          // Keep in localStorage if Firestore fails (silent for better UX)
        }
      }
    },
    [user]
  );

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.productId === product.id);
        let newItems: CartItem[];
        if (existingIndex >= 0) {
          newItems = [...prev];
          newItems[existingIndex].quantity += quantity;
        } else {
          const newItem: CartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            imageUrl: product.imageUrl,
            quantity,
          };
          newItems = [...prev, newItem];
        }
        saveCart(newItems);
        return newItems;
      });
    },
    [saveCart]
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prev) => {
        const newItems = prev.filter((item) => item.productId !== productId);
        saveCart(newItems);
        return newItems;
      });
    },
    [saveCart]
  );

  const updateQty = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }
      setItems((prev) => {
        const newItems = prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        saveCart(newItems);
        return newItems;
      });
    },
    [removeItem, saveCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
  }, [saveCart]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, totalItems, totalPrice, loading, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
