"use client";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTask,
} from "firebase/storage";
import { storage } from "@/src/lib/firebase";

export interface UploadProgress {
  progress: number;
  status: "uploading" | "completed" | "error";
  url?: string;
  error?: string;
}

export interface UploadResult {
  url: string;
  path: string;
  fileName: string;
}

/**
 * Upload a single product image to Firebase Storage
 * Path: products/{productId}/{timestamp-fileName}
 */
export async function uploadProductImage(
  file: File,
  productId: string,
  onProgress?: (progress: number) => void
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    // Create unique filename with timestamp
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}-${sanitizedFileName}`;
    const storagePath = `products/${productId}/${fileName}`;

    // Check if storage is initialized
    if (!storage) {
      reject(new Error("Firebase Storage not initialized"));
      return;
    }

    const storageRef = ref(storage, storagePath);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(Math.round(progress));
      },
      (error) => {
        reject(new Error(`Upload failed: ${error.message}`));
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            url: downloadURL,
            path: storagePath,
            fileName,
          });
        } catch (error) {
          reject(new Error("Failed to get download URL"));
        }
      }
    );
  });
}

/**
 * Upload multiple product images
 */
export async function uploadProductImages(
  files: File[],
  productId: string,
  onProgress?: (index: number, progress: number) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const result = await uploadProductImage(files[i], productId, (progress) => {
      onProgress?.(i, progress);
    });
    results.push(result);
  }

  return results;
}

/**
 * Delete an image from Firebase Storage
 */
export async function deleteProductImage(storagePath: string): Promise<void> {
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("[Storage] Delete error:", error);
    throw new Error("Failed to delete image");
  }
}

/**
 * Generate a temporary product ID for new products
 */
export function generateTempProductId(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload JPEG, PNG, WebP, or GIF images.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "File too large. Maximum size is 5MB.",
    };
  }

  return { valid: true };
}
