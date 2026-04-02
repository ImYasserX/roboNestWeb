import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let adminApp: App | undefined;
let adminAuth: Auth | undefined;
let adminDb: Firestore | undefined;

function getAdminApp(): App {
  if (adminApp) return adminApp;

  const apps = getApps();
  if (apps.length > 0) {
    adminApp = apps[0];
    return adminApp;
  }

  // Initialize with service account credentials
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  if (!serviceAccount) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. " +
      "Please add your Firebase service account JSON as an environment variable."
    );
  }

  try {
    const credentials = JSON.parse(serviceAccount);
    adminApp = initializeApp({
      credential: cert(credentials),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    return adminApp;
  } catch (error) {
    throw new Error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Ensure it is valid JSON.");
  }
}

export function getAdminAuth(): Auth {
  if (adminAuth) return adminAuth;
  adminAuth = getAuth(getAdminApp());
  return adminAuth;
}

export function getAdminDb(): Firestore {
  if (adminDb) return adminDb;
  adminDb = getFirestore(getAdminApp());
  return adminDb;
}

// Set custom claims for a user (e.g., admin role)
export async function setUserRole(uid: string, role: "admin" | "customer"): Promise<void> {
  const auth = getAdminAuth();
  await auth.setCustomUserClaims(uid, { role });
}

// Get user by email
export async function getUserByEmail(email: string) {
  const auth = getAdminAuth();
  return auth.getUserByEmail(email);
}

// Verify ID token and check admin status
export async function verifyAdminToken(idToken: string): Promise<boolean> {
  try {
    const auth = getAdminAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken.role === "admin";
  } catch (error) {
    return false;
  }
}

// Verify any ID token
export async function verifyIdToken(idToken: string) {
  const auth = getAdminAuth();
  return auth.verifyIdToken(idToken);
}
