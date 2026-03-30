"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { useCart } from "@/src/context/CartContext";
import { useAuth } from "@/src/context/AuthContext";
import { iraqCities } from "@/src/data/products";
import { db } from "@/src/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { formatPrice } from "@/src/lib/currency";
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  CheckCircle,
  ChevronDown,
  Package,
  ArrowRight,
} from "lucide-react";

const tap = (fn: () => void) => ({
  onTouchStart: (e: React.TouchEvent) => {
    e.preventDefault();
    fn();
  },
  onClick: fn,
});

const DELIVERY_FEE = 5;

export default function CheckoutPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const { items, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    area: "",
    details: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, authLoading, router]);

  // Pre-fill from profile
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.displayName || "",
        phone: profile.phone?.replace("+964", "") || "",
        city: profile.city || "",
        area: profile.area || "",
        details: profile.address || "",
      });
    }
  }, [profile]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.area.trim()) {
      newErrors.area = "Area/District is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !user) return;

    setSubmitting(true);
    try {
      const order = {
        userId: user.uid,
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          emoji: item.emoji,
          quantity: item.quantity,
        })),
        subtotal: totalPrice,
        deliveryFee: DELIVERY_FEE,
        total: totalPrice + DELIVERY_FEE,
        status: "pending",
        paymentMethod: "cod",
        delivery: {
          fullName: formData.fullName,
          phone: `+964${formData.phone}`,
          city: formData.city,
          area: formData.area,
          details: formData.details,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order. Please try again.");
    }
    setSubmitting(false);
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

  if (orderSuccess) {
    return (
      <main style={{ paddingTop: 66, minHeight: "100vh" }}>
        <Navbar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            padding: 24,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              background: "#ECFDF5",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <CheckCircle size={56} style={{ color: "#10B981" }} />
          </div>

          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1E1E2F",
              marginBottom: 12,
            }}
          >
            Order Placed Successfully!
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "#6B6B8A",
              marginBottom: 8,
              maxWidth: 400,
            }}
          >
            Thank you for your order. We&apos;ll contact you at{" "}
            <strong>+964{formData.phone}</strong> to confirm delivery.
          </p>

          <div
            style={{
              padding: "12px 24px",
              background: "#F0EFFE",
              borderRadius: 12,
              marginBottom: 32,
            }}
          >
            <span style={{ fontSize: 14, color: "#6B6B8A" }}>Order ID: </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#6C5CE7",
                textTransform: "uppercase",
              }}
            >
              {orderId.slice(-8).toUpperCase()}
            </span>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <Link
              href="/orders"
              style={{
                padding: "14px 28px",
                background: "#6C5CE7",
                color: "#fff",
                borderRadius: 999,
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              View Orders
            </Link>
            <Link
              href="/products"
              style={{
                padding: "14px 28px",
                background: "#F0EFFE",
                color: "#6C5CE7",
                borderRadius: 999,
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main style={{ paddingTop: 66, minHeight: "100vh" }}>
        <Navbar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            padding: 24,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: "#F0EFFE",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <Package size={36} style={{ color: "#6C5CE7" }} />
          </div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1E1E2F",
              marginBottom: 8,
            }}
          >
            Your cart is empty
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#6B6B8A",
              marginBottom: 24,
            }}
          >
            Add some products before checking out.
          </p>
          <Link
            href="/products"
            style={{
              padding: "12px 24px",
              background: "#6C5CE7",
              color: "#fff",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Browse Products
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 66, minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: 1440,
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
          Checkout
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
          }}
          className="lg:!grid-cols-[1fr_380px]"
        >
          {/* Delivery Form */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#1E1E2F",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <MapPin size={22} style={{ color: "#6C5CE7" }} />
              Delivery Information
            </h2>

            <div style={{ display: "grid", gap: 20 }}>
              {/* Full Name */}
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
                  Full Name *
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "0 16px",
                    background: "#F8F9FF",
                    borderRadius: 12,
                    border: errors.fullName ? "1px solid #EF4444" : "1px solid transparent",
                  }}
                >
                  <User size={20} style={{ color: "#6B6B8A" }} />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
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
                {errors.fullName && (
                  <span style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>
                    {errors.fullName}
                  </span>
                )}
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
                  Phone Number *
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "0 16px",
                    background: "#F8F9FF",
                    borderRadius: 12,
                    border: errors.phone ? "1px solid #EF4444" : "1px solid transparent",
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
                      setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })
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
                {errors.phone && (
                  <span style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>
                    {errors.phone}
                  </span>
                )}
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
                  City *
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
                      border: errors.city ? "1px solid #EF4444" : "1px solid transparent",
                      fontSize: 15,
                      color: formData.city ? "#1E1E2F" : "#6B6B8A",
                      appearance: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Select your city</option>
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
                {errors.city && (
                  <span style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>
                    {errors.city}
                  </span>
                )}
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
                  Area / District *
                </label>
                <input
                  type="text"
                  placeholder="Enter your area or district"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "#F8F9FF",
                    borderRadius: 12,
                    border: errors.area ? "1px solid #EF4444" : "1px solid transparent",
                    fontSize: 15,
                    color: "#1E1E2F",
                  }}
                />
                {errors.area && (
                  <span style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>
                    {errors.area}
                  </span>
                )}
              </div>

              {/* Address Details */}
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
                  Address Details (Optional)
                </label>
                <textarea
                  placeholder="Building name, floor, apartment number, nearby landmarks..."
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "#F8F9FF",
                    borderRadius: 12,
                    border: "1px solid transparent",
                    fontSize: 15,
                    color: "#1E1E2F",
                    resize: "none",
                  }}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div style={{ marginTop: 32 }}>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1E1E2F",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <CreditCard size={22} style={{ color: "#6C5CE7" }} />
                Payment Method
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 20,
                  background: "#F0EFFE",
                  borderRadius: 16,
                  border: "2px solid #6C5CE7",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    background: "#6C5CE7",
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircle size={16} color="#fff" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#1E1E2F",
                    }}
                  >
                    Cash on Delivery
                  </div>
                  <div style={{ fontSize: 13, color: "#6B6B8A" }}>
                    Pay when you receive your order
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              height: "fit-content",
              position: "sticky",
              top: 90,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#1E1E2F",
                marginBottom: 20,
              }}
            >
              Order Summary
            </h2>

            {/* Items */}
            <div style={{ marginBottom: 20 }}>
              {items.map((item) => (
                <div
                  key={item.productId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 0",
                    borderBottom: "1px solid #F0EFFE",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{item.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#1E1E2F",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#6B6B8A" }}>
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1E1E2F",
                    }}
                  >
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 14, color: "#6B6B8A" }}>Subtotal</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1E1E2F" }}>
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 14, color: "#6B6B8A" }}>Delivery</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1E1E2F" }}>
                  {formatPrice(DELIVERY_FEE)}
                </span>
              </div>
              <div
                style={{
                  height: 1,
                  background: "#E4E6F1",
                  margin: "16px 0",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 700, color: "#1E1E2F" }}>
                  Total
                </span>
                <span style={{ fontSize: 24, fontWeight: 800, color: "#6C5CE7" }}>
                  {formatPrice(totalPrice + DELIVERY_FEE)}
                </span>
              </div>
            </div>

            <button
              {...tap(handleSubmit)}
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
                marginTop: 24,
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {submitting ? (
                "Placing Order..."
              ) : (
                <>
                  Place Order
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
