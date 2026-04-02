"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import PageContainer from "@/src/components/PageContainer";
import { useCart } from "@/src/context/CartContext";
import { useAuth } from "@/src/context/AuthContext";
import { formatPrice } from "@/src/lib/currency";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const tap = (fn: () => void) => ({
  onTouchStart: (e: React.TouchEvent) => {
    e.preventDefault();
    fn();
  },
  onClick: fn,
});

const DELIVERY_FEE = 5;

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalPrice, updateQty, removeItem, clearCart } = useCart();

  const handleCheckout = () => {
    if (user) {
      router.push("/checkout");
    } else {
      router.push("/login?redirect=/checkout");
    }
  };

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
              width: 100,
              height: 100,
              background: "#F0EFFE",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <ShoppingBag size={48} style={{ color: "#6C5CE7" }} />
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1E1E2F",
              marginBottom: 12,
            }}
          >
            Your cart is empty
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#6B6B8A",
              marginBottom: 32,
              maxWidth: 400,
            }}
          >
            Looks like you haven&apos;t added any items to your cart yet.
            Start shopping to fill it up!
          </p>
          <Link
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              background: "#6C5CE7",
              color: "#fff",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Browse Products
            <ArrowRight size={20} />
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 66, minHeight: "100vh" }}>
      <Navbar />

      <PageContainer style={{ paddingBlock: "24px" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#1E1E2F",
            marginBottom: 24,
          }}
        >
          Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
          }}
          className="lg:!grid-cols-[1fr_380px]"
        >
          {/* Cart Items */}
          <div>
            {items.map((item) => (
              <div
                key={item.productId}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: 20,
                  background: "#fff",
                  borderRadius: 16,
                  marginBottom: 16,
                }}
              >
                {/* Emoji */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    background: "#F0EFFE",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    flexShrink: 0,
                  }}
                >
                  {item.emoji}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link
                    href={`/products/${item.productId}`}
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#1E1E2F",
                      textDecoration: "none",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.name}
                  </Link>

                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#6C5CE7",
                      marginTop: 8,
                    }}
                  >
                    {formatPrice(item.price)}
                  </div>

                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      marginTop: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: "#F8F9FF",
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      <button
                        {...tap(() => updateQty(item.productId, item.quantity - 1))}
                        style={{
                          width: 36,
                          height: 36,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          touchAction: "manipulation",
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        <Minus size={16} style={{ color: "#6B6B8A" }} />
                      </button>
                      <span
                        style={{
                          width: 36,
                          textAlign: "center",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#1E1E2F",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        {...tap(() => updateQty(item.productId, item.quantity + 1))}
                        style={{
                          width: 36,
                          height: 36,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          touchAction: "manipulation",
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        <Plus size={16} style={{ color: "#6B6B8A" }} />
                      </button>
                    </div>

                    <button
                      {...tap(() => removeItem(item.productId))}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 12px",
                        background: "#FEF2F2",
                        border: "none",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontSize: 13,
                        color: "#EF4444",
                        fontWeight: 500,
                        touchAction: "manipulation",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div
                  className="hidden md:block"
                  style={{
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ fontSize: 12, color: "#6B6B8A", marginBottom: 4 }}>
                    Total
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#1E1E2F",
                    }}
                  >
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <button
              {...tap(clearCart)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                background: "transparent",
                border: "1px solid #E4E6F1",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 14,
                color: "#6B6B8A",
                fontWeight: 500,
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <Trash2 size={16} />
              Clear Cart
            </button>
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

            <div style={{ marginBottom: 20 }}>
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
                <span style={{ fontSize: 14, color: "#6B6B8A" }}>Delivery Fee</span>
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
                <span style={{ fontSize: 20, fontWeight: 800, color: "#6C5CE7" }}>
                  {formatPrice(totalPrice + DELIVERY_FEE)}
                </span>
              </div>
            </div>

            <button
              {...tap(handleCheckout)}
              style={{
                width: "100%",
                padding: "16px 24px",
                background: "#6C5CE7",
                color: "#fff",
                border: "none",
                borderRadius: 999,
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>

            <Link
              href="/products"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: 16,
                fontSize: 14,
                color: "#6C5CE7",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </main>
  );
}
