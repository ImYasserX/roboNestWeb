"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdTokenResult,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/src/lib/firebase";
import { UserProfile } from "@/src/data/products";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  adminLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, phone?: string) => Promise<void>;
  logOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshAdminStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  // Check admin status from Firebase Custom Claims
  const checkAdminStatus = useCallback(async (currentUser: User | null): Promise<boolean> => {
    if (!currentUser) {
      setIsAdmin(false);
      setAdminLoading(false);
      return false;
    }

    try {
      // Force refresh to get latest claims
      const tokenResult = await getIdTokenResult(currentUser, true);
      const adminStatus = tokenResult.claims?.role === "admin";
      setIsAdmin(adminStatus);
      setAdminLoading(false);
      return adminStatus;
    } catch (error) {
      setIsAdmin(false);
      setAdminLoading(false);
      return false;
    }
  }, []);

  // Public method to refresh admin status
  const refreshAdminStatus = useCallback(async (): Promise<boolean> => {
    setAdminLoading(true);
    return checkAdminStatus(user);
  }, [user, checkAdminStatus]);

  const fetchProfile = useCallback(async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      } else {
        setProfile(null);
      }
    } catch (error) {
      // Profile not accessible - user may need to complete registration
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Check admin status from custom claims (secure, token-based)
        await checkAdminStatus(currentUser);
        // Also fetch profile for display purposes
        await fetchProfile(currentUser.uid);
      } else {
        setProfile(null);
        setIsAdmin(false);
        setAdminLoading(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchProfile, checkAdminStatus]);

  const signIn = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    // Check admin status after sign in
    await checkAdminStatus(credential.user);
  };

  const signUp = async (email: string, password: string, displayName: string, phone?: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const userProfile: UserProfile = {
      uid: credential.user.uid,
      email,
      displayName,
      phone: phone ? `+964${phone}` : undefined,
      role: "customer", // Default role, admin role must be set via Firebase Admin SDK
    };
    await setDoc(doc(db, "users", credential.user.uid), {
      ...userProfile,
      createdAt: serverTimestamp(),
    });
    setProfile(userProfile);
    setIsAdmin(false); // New users are never admin
  };

  const logOut = async () => {
    await signOut(auth);
    setProfile(null);
    setIsAdmin(false);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, data, { merge: true });
    setProfile((prev) => (prev ? { ...prev, ...data } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        adminLoading,
        signIn,
        signUp,
        logOut,
        updateProfile,
        refreshAdminStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
