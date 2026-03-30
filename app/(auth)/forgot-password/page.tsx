"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/src/lib/firebase";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("auth/user-not-found")) {
        setError("No account found with this email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#F8F9FF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overflow: "hidden",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
          }}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="RoboNest"
              width={150}
              height={44}
              priority
              style={{ objectFit: "contain", height: "auto" }}
            />
          </Link>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            border: "1px solid #E4E6F1",
            padding: 28,
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          }}
        >
          {sent ? (
            /* Success state */
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 999,
                  background: "#ecfdf5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle size={32} color="#10b981" />
              </div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#1E1E2F",
                  margin: 0,
                }}
              >
                Check your email
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#6B6B8A",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                We sent a password reset link to
                <br />
                <strong style={{ color: "#1E1E2F" }}>{email}</strong>
              </p>
              <p style={{ fontSize: 13, color: "#6B6B8A", margin: 0 }}>
                Didn&apos;t receive it? Check your spam folder or{" "}
                <button
                  onClick={() => setSent(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6C5CE7",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 13,
                    padding: 0,
                  }}
                >
                  try again
                </button>
              </p>
              <Link
                href="/login"
                style={{
                  marginTop: 8,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  height: 44,
                  borderRadius: 12,
                  background: "#6C5CE7",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              <div style={{ marginBottom: 24 }}>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#1E1E2F",
                    margin: "0 0 6px",
                  }}
                >
                  Reset your password
                </h2>
                <p style={{ fontSize: 13, color: "#6B6B8A", margin: 0 }}>
                  Enter your email and we&apos;ll send you a reset link
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1E1E2F",
                    }}
                  >
                    Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    >
                      <Mail size={16} color="#6B6B8A" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      style={{
                        width: "100%",
                        height: 44,
                        borderRadius: 12,
                        border: "1.5px solid #E4E6F1",
                        background: "#F8F9FF",
                        padding: "0 16px 0 42px",
                        fontSize: 14,
                        color: "#1E1E2F",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                {error && (
                  <div
                    style={{
                      background: "#fef2f2",
                      borderRadius: 10,
                      padding: "10px 14px",
                      fontSize: 13,
                      color: "#ef4444",
                      fontWeight: 500,
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    height: 44,
                    borderRadius: 12,
                    background: "#6C5CE7",
                    color: "#fff",
                    border: "none",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    marginTop: 4,
                    opacity: loading ? 0.65 : 1,
                  }}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>

        <Link
          href="/login"
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontSize: 13,
            color: "#6B6B8A",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
