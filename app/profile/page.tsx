"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { useAuth } from "@/src/context/AuthContext";
import { iraqCities } from "@/src/data/products";
import {
  User,
  Mail,
  Phone,
  MapPin,
  LogOut,
  Package,
  ChevronDown,
  Check,
  Settings,
} from "lucide-react";

const tap = (fn: () => void) => ({
  onTouchStart: (e: React.TouchEvent) => {
    e.preventDefault();
    fn();
  },
  onClick: fn,
});

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, updateProfile, logOut } = useAuth();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    city: "",
    area: "",
    address: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/profile");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || "",
        phone: profile.phone?.replace("+964", "") || "",
        city: profile.city || "",
        area: profile.area || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({
        displayName: formData.displayName,
        phone: formData.phone ? `+964${formData.phone}` : undefined,
        city: formData.city || undefined,
        area: formData.area || undefined,
        address: formData.address || undefined,
      });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (authLoading) {
    return (
      <main style={{ paddingTop: 66, minHeight: "100vh" }}>
        <Navbar />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
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
        </div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 66, minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "24px 16px",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#1E1E2F",
            marginBottom: 24,
          }}
        >
          My Profile
        </h1>

        {/* Profile Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: 24,
            marginBottom: 16,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                background: "#F0EFFE",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={32} style={{ color: "#6C5CE7" }} />
            </div>
            <div>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1E1E2F",
                }}
              >
                {profile?.displayName || "User"}
              </h2>
              <p style={{ fontSize: 14, color: "#6B6B8A" }}>{user?.email}</p>
            </div>
          </div>

          {editing ? (
            /* Edit Form */
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Name */}
              <div>
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
                    value={formData.displayName}
                    onChange={(e) =>
                      setFormData({ ...formData, displayName: e.target.value })
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
              </div>

              {/* Phone */}
              <div>
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
              </div>

              {/* City */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1E1E2F",
                    marginBottom: 8,
                  }}
                >
                  City
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "14px 40px 14px 16px",
                      background: "#F8F9FF",
                      borderRadius: 12,
                      border: "none",
                      fontSize: 15,
                      color: formData.city ? "#1E1E2F" : "#6B6B8A",
                      appearance: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Select city</option>
                    {iraqCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={20}
                    style={{
                      position: "absolute",
                      right: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6B6B8A",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>

              {/* Area */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1E1E2F",
                    marginBottom: 8,
                  }}
                >
                  Area / District
                </label>
                <input
                  type="text"
                  placeholder="Enter your area"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "#F8F9FF",
                    borderRadius: 12,
                    border: "none",
                    fontSize: 15,
                    color: "#1E1E2F",
                  }}
                />
              </div>

              {/* Address */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1E1E2F",
                    marginBottom: 8,
                  }}
                >
                  Address Details
                </label>
                <textarea
                  placeholder="Building, floor, landmarks..."
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "#F8F9FF",
                    borderRadius: 12,
                    border: "none",
                    fontSize: 15,
                    color: "#1E1E2F",
                    resize: "none",
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button
                  {...tap(() => setEditing(false))}
                  style={{
                    flex: 1,
                    padding: "14px 24px",
                    background: "#F8F9FF",
                    color: "#6B6B8A",
                    border: "none",
                    borderRadius: 999,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  Cancel
                </button>
                <button
                  {...tap(handleSave)}
                  disabled={saving}
                  style={{
                    flex: 1,
                    padding: "14px 24px",
                    background: saving ? "#A29BFE" : "#6C5CE7",
                    color: "#fff",
                    border: "none",
                    borderRadius: 999,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: saving ? "not-allowed" : "pointer",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            /* View Mode */
            <div>
              {/* Info Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 16,
                    background: "#F8F9FF",
                    borderRadius: 12,
                  }}
                >
                  <Mail size={20} style={{ color: "#6C5CE7" }} />
                  <div>
                    <div style={{ fontSize: 12, color: "#6B6B8A" }}>Email</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "#1E1E2F" }}>
                      {user?.email}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 16,
                    background: "#F8F9FF",
                    borderRadius: 12,
                  }}
                >
                  <Phone size={20} style={{ color: "#6C5CE7" }} />
                  <div>
                    <div style={{ fontSize: 12, color: "#6B6B8A" }}>Phone</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "#1E1E2F" }}>
                      {profile?.phone || "Not set"}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 16,
                    background: "#F8F9FF",
                    borderRadius: 12,
                  }}
                >
                  <MapPin size={20} style={{ color: "#6C5CE7" }} />
                  <div>
                    <div style={{ fontSize: 12, color: "#6B6B8A" }}>Address</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "#1E1E2F" }}>
                      {profile?.city
                        ? `${profile.area ? profile.area + ", " : ""}${profile.city}`
                        : "Not set"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                {...tap(() => setEditing(true))}
                style={{
                  width: "100%",
                  marginTop: 24,
                  padding: "14px 24px",
                  background: "#F0EFFE",
                  color: "#6C5CE7",
                  border: "none",
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {saved ? (
                  <>
                    <Check size={20} />
                    Saved!
                  </>
                ) : (
                  <>
                    <Settings size={20} />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <Link
            href="/orders"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: 20,
              textDecoration: "none",
              borderBottom: "1px solid #F0EFFE",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: "#F0EFFE",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Package size={22} style={{ color: "#6C5CE7" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1E1E2F" }}>
                My Orders
              </div>
              <div style={{ fontSize: 13, color: "#6B6B8A" }}>
                View order history and status
              </div>
            </div>
          </Link>

          <button
            {...tap(handleLogout)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: 20,
              width: "100%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: "#FEF2F2",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LogOut size={22} style={{ color: "#EF4444" }} />
            </div>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#EF4444" }}>
                Sign Out
              </div>
              <div style={{ fontSize: 13, color: "#6B6B8A" }}>
                Log out of your account
              </div>
            </div>
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
