import { NextRequest, NextResponse } from "next/server";
import { setUserRole, verifyAdminToken, getUserByEmail } from "@/src/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    
    // Verify the requesting user is an admin
    const isAdmin = await verifyAdminToken(idToken);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Only admins can set user roles" },
        { status: 403 }
      );
    }

    // Get the target user email and role from request body
    const body = await request.json();
    const { email, role } = body;

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 }
      );
    }

    if (role !== "admin" && role !== "customer") {
      return NextResponse.json(
        { error: "Role must be 'admin' or 'customer'" },
        { status: 400 }
      );
    }

    // Get the target user by email
    const targetUser = await getUserByEmail(email);
    
    // Set the custom claims
    await setUserRole(targetUser.uid, role);

    return NextResponse.json({
      success: true,
      message: `User ${email} role set to ${role}`,
      uid: targetUser.uid,
    });
  } catch (error) {
    console.error("Error setting user role:", error);
    
    if (error instanceof Error && error.message.includes("no user record")) {
      return NextResponse.json(
        { error: "User not found with that email" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to set user role" },
      { status: 500 }
    );
  }
}
