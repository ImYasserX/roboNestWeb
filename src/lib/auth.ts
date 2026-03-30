"use client";

import { User, getIdTokenResult, IdTokenResult } from "firebase/auth";
import { auth } from "./firebase";

// Custom claims interface
export interface CustomClaims {
  role?: "admin" | "customer";
  [key: string]: unknown;
}

// Check if the current user has admin role via custom claims
export async function isAdmin(user: User | null): Promise<boolean> {
  if (!user) return false;

  try {
    const tokenResult: IdTokenResult = await getIdTokenResult(user, true);
    return tokenResult.claims?.role === "admin";
  } catch (error) {
    return false;
  }
}

// Get current user's custom claims
export async function getUserClaims(user: User | null): Promise<CustomClaims | null> {
  if (!user) return null;

  try {
    const tokenResult: IdTokenResult = await getIdTokenResult(user, true);
    return tokenResult.claims as CustomClaims;
  } catch (error) {
    return null;
  }
}

// Get the current user's role from custom claims
export async function getUserRole(user: User | null): Promise<string | null> {
  if (!user) return null;

  try {
    const tokenResult: IdTokenResult = await getIdTokenResult(user, true);
    return (tokenResult.claims?.role as string) || "customer";
  } catch (error) {
    return null;
  }
}

// Refresh user token to get latest claims
export async function refreshUserToken(): Promise<IdTokenResult | null> {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    return await getIdTokenResult(user, true);
  } catch (error) {
    return null;
  }
}

// Get ID token for API calls
export async function getAuthToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    return await user.getIdToken();
  } catch (error) {
    return null;
  }
}
