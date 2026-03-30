"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";

const tap = (fn: () => void) => ({
  onTouchStart: (e: React.TouchEvent) => {
    e.preventDefault();
    fn();
  },
  onClick: fn,
});

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading, signUp } = useAuth();

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      setError("Please enter your full name");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.phone && formData.phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await signUp(
        formData.email,
        formData.password,
        formData.displayName,
        formData.phone || undefined
      );
      router.push("/");
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error && err.message.includes("auth/email-already-in-use")) {
        setError("An account with this email already exists");
      } else if (err instanceof Error && err.message.includes("auth/invalid-email")) {
        setError("Please enter a valid email address");
      } else if (err instanceof Error && err.message.includes("auth/weak-password")) {
        setError("Password should be at least 6 characters");
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
        Create account
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "#6B6B8A",
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        Join RoboNest and start building amazing projects
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
        {/* Full Name */}
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1E1E2F",
              marginBottom: 8,
            }}
          >
            Full Name
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
            <User size={20} style={{ color: "#6B6B8A" }} />
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
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

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label
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
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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

        {/* Phone */}
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1E1E2F",
              marginBottom: 8,
            }}
          >
            Phone Number
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
            <Phone size={20} style={{ color: "#6B6B8A" }} />
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#1E1E2F",
                paddingRight: 8,
                borderRight: "1px solid #E4E6F1",
              }}
            >
              +964
            </span>
            <input
              type="tel"
              placeholder="07XX XXX XXXX"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
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
          {formData.phone && (
            <div style={{ fontSize: 12, color: "#6B6B8A", marginTop: 6 }}>
              Full number: +964 {formData.phone}
            </div>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: 24 }}>
          <label
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
              type={showPassword ? "text" : "password"}
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              minLength={6}
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
            "Creating account..."
          ) : (
            <>
              Create Account
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
        Already have an account?{" "}
        <Link
          href="/login"
          style={{
            color: "#6C5CE7",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
