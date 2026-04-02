"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const tap = (fn: () => void) => ({
  onTouchStart: (e: React.TouchEvent) => {
    e.preventDefault();
    fn();
  },
  onClick: fn,
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { user, loading, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push(redirect);
    }
  }, [user, loading, router, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signIn(email, password);
      router.push(redirect);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error && err.message.includes("auth/invalid-credential")) {
        setError("Invalid email or password");
      } else if (err instanceof Error && err.message.includes("auth/user-not-found")) {
        setError("No account found with this email");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: "4px solid #F0EFFE",
            borderTopColor: "#6C5CE7",
            borderRadius: 999,
            animation: "spin 1s linear infinite",
          }}
        />
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        background: "#fff",
        borderRadius: 24,
        padding: 32,
        boxShadow: "0 8px 32px rgba(108,92,231,0.1)",
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="RoboNest"
            width={150}
            height={44}
            style={{ objectFit: "contain", height: "auto" }}
            priority
          />
        </Link>
      </div>

      <h1
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#1E1E2F",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        Welcome back
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "#6B6B8A",
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        Sign in to your account to continue
      </p>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            background: "#FEF2F2",
            color: "#EF4444",
            borderRadius: 12,
            fontSize: 14,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="login-email"
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1E1E2F",
              marginBottom: 8,
            }}
          >
            Email
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 16px",
              background: "#F8F9FF",
              borderRadius: 12,
            }}
          >
            <Mail size={20} style={{ color: "#6B6B8A" }} />
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: "14px 0",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 15,
                color: "#1E1E2F",
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: 8 }}>
          <label
            htmlFor="login-password"
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1E1E2F",
              marginBottom: 8,
            }}
          >
            Password
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 16px",
              background: "#F8F9FF",
              borderRadius: 12,
            }}
          >
            <Lock size={20} style={{ color: "#6B6B8A" }} />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                flex: 1,
                padding: "14px 0",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 15,
                color: "#1E1E2F",
              }}
            />
            <button
              type="button"
              {...tap(() => setShowPassword(!showPassword))}
              style={{
                background: "transparent",
                border: "none",
                padding: 4,
                cursor: "pointer",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {showPassword ? (
                <EyeOff size={20} style={{ color: "#6B6B8A" }} />
              ) : (
                <Eye size={20} style={{ color: "#6B6B8A" }} />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <Link
            href="/forgot-password"
            style={{
              fontSize: 12,
              color: "#6C5CE7",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "16px 24px",
            background: submitting ? "#A29BFE" : "#6C5CE7",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            fontSize: 16,
            fontWeight: 700,
            cursor: submitting ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {submitting ? (
            "Signing in..."
          ) : (
            <>
              Sign In
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      <p
        style={{
          textAlign: "center",
          marginTop: 24,
          fontSize: 14,
          color: "#6B6B8A",
        }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          style={{
            color: "#6C5CE7",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
