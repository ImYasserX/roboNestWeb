/**
 * Setup Admin User Script
 * 
 * This script sets up the first admin user using Firebase Admin SDK.
 * Run this once to bootstrap your admin account.
 * 
 * Usage:
 *   1. Set FIREBASE_SERVICE_ACCOUNT_KEY environment variable with your service account JSON
 *   2. Run: npx ts-node scripts/setup-admin.ts <email>
 * 
 * Example:
 *   npx ts-node scripts/setup-admin.ts admin@example.com
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const ADMIN_EMAIL = process.argv[2];

if (!ADMIN_EMAIL) {
  console.error("Usage: npx ts-node scripts/setup-admin.ts <email>");
  console.error("Example: npx ts-node scripts/setup-admin.ts admin@example.com");
  process.exit(1);
}

async function setupAdmin() {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  if (!serviceAccount) {
    console.error("Error: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.");
    console.error("Please set it with your Firebase service account JSON.");
    process.exit(1);
  }

  try {
    const credentials = JSON.parse(serviceAccount);
    
    initializeApp({
      credential: cert(credentials),
    });

    const auth = getAuth();
    
    // Get user by email
    const user = await auth.getUserByEmail(ADMIN_EMAIL);
    console.log(`Found user: ${user.uid} (${user.email})`);

    // Set admin custom claims
    await auth.setCustomUserClaims(user.uid, { role: "admin" });
    console.log(`Successfully set admin role for ${ADMIN_EMAIL}`);
    console.log("\nThe user must sign out and sign back in for the changes to take effect.");
    
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("no user record")) {
        console.error(`Error: No user found with email ${ADMIN_EMAIL}`);
        console.error("Make sure the user has registered first.");
      } else {
        console.error("Error:", error.message);
      }
    }
    process.exit(1);
  }
}

setupAdmin();
