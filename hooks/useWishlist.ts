"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import {
  addToWishlist as addToWishlistService,
  removeFromWishlist as removeFromWishlistService,
} from "@/lib/wishlist";
import { fetchProductsByIds } from "@/lib/products";
import type { Product } from "@/src/data/products";
import type { WishlistItemRef } from "@/types/wishlist";

export function useWishlist(userId?: string | null, fetchProducts = true) {
  const [refs, setRefs] = useState<WishlistItemRef[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setRefs([]);
      setProducts([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const wishlistCollection = collection(db, "users", userId, "wishlist");
    const unsubscribe = onSnapshot(
      wishlistCollection,
      (snapshot) => {
        const nextRefs = snapshot.docs.map((doc) => ({
          productId: doc.id,
        }));

        console.log("[useWishlist] snapshot received", { userId, count: nextRefs.length });
        setRefs(nextRefs);
        setLoading(false);
      },
      (snapshotError) => {
        console.error("[useWishlist] snapshot error", snapshotError);
        setError(snapshotError as Error);
        setRefs([]);
        setProducts([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (!fetchProducts) {
      setProducts([]);
      return;
    }

    if (refs.length === 0) {
      setProducts([]);
      return;
    }

    let active = true;

    (async () => {
      try {
        const nextProducts = await fetchProductsByIds(refs.map((item) => item.productId));
        if (!active) {
          return;
        }

        setProducts(nextProducts);
      } catch (fetchError) {
        console.error("[useWishlist] fetchProductsByIds failed", fetchError);
        if (active) {
          setProducts([]);
          setError(fetchError as Error);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [refs, fetchProducts]);

  const addToWishlist = useCallback(
    async (productId: string) => {
      if (!userId || !productId) {
        console.warn("[useWishlist] addToWishlist skipped, missing userId or productId", {
          userId,
          productId,
        });
        return false;
      }

      try {
        await addToWishlistService(userId, productId);
        console.log("[useWishlist] addToWishlist success", { userId, productId });
        return true;
      } catch (addError) {
        console.error("[useWishlist] addToWishlist failed", addError);
        setError(addError as Error);
        return false;
      }
    },
    [userId]
  );

  const removeFromWishlist = useCallback(
    async (productId: string) => {
      if (!userId || !productId) {
        console.warn("[useWishlist] removeFromWishlist skipped, missing userId or productId", {
          userId,
          productId,
        });
        return false;
      }

      try {
        await removeFromWishlistService(userId, productId);
        console.log("[useWishlist] removeFromWishlist success", { userId, productId });
        return true;
      } catch (removeError) {
        console.error("[useWishlist] removeFromWishlist failed", removeError);
        setError(removeError as Error);
        return false;
      }
    },
    [userId]
  );

  const isInWishlist = useCallback(
    (productId: string) => refs.some((item) => item.productId === productId),
    [refs]
  );

  return {
    refs,
    products,
    count: refs.length,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
}
