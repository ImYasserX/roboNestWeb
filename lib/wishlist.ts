import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import type { WishlistItemRef } from "@/types/wishlist";

const WISHLIST_SUBCOLLECTION = "wishlist";
const USERS_COLLECTION = "users";

/* ---------------- GET WISHLIST ---------------- */

export async function getWishlist(userId: string): Promise<WishlistItemRef[]> {
  if (!userId) return [];

  const ref = collection(
    db,
    USERS_COLLECTION,
    userId,
    WISHLIST_SUBCOLLECTION
  );

  const snapshot = await getDocs(ref);

  return snapshot.docs.map((d) => ({
    productId: d.id,
  }));
}

/* ---------------- ADD ---------------- */

export async function addToWishlist(
  userId: string,
  productId: string
): Promise<void> {
  if (!userId || !productId) return;

  const ref = doc(
    db,
    USERS_COLLECTION,
    userId,
    WISHLIST_SUBCOLLECTION,
    productId
  );

  await setDoc(ref, { productId }, { merge: true });
}

/* ---------------- REMOVE ---------------- */

export async function removeFromWishlist(
  userId: string,
  productId: string
): Promise<void> {
  if (!userId || !productId) return;

  const ref = doc(
    db,
    USERS_COLLECTION,
    userId,
    WISHLIST_SUBCOLLECTION,
    productId
  );

  await deleteDoc(ref);
}

/* ---------------- CHECK SINGLE ITEM ---------------- */

export async function isInWishlist(
  userId: string,
  productId: string
): Promise<boolean> {
  if (!userId || !productId) return false;

  const ref = doc(
    db,
    USERS_COLLECTION,
    userId,
    WISHLIST_SUBCOLLECTION,
    productId
  );

  const snap = await getDoc(ref);

  return snap.exists();
}

/* ---------------- REAL-TIME COUNT ---------------- */

export function watchWishlistCount(
  userId: string,
  callback: (count: number) => void
): () => void {
  if (!userId) {
    callback(0);
    return () => {};
  }

  const ref = collection(
    db,
    USERS_COLLECTION,
    userId,
    WISHLIST_SUBCOLLECTION
  );

  return onSnapshot(
    ref,
    (snapshot) => {
      callback(snapshot.size);
    },
    (error) => {
      console.error("[wishlist] watchWishlistCount error:", error);
      callback(0);
    }
  );
}