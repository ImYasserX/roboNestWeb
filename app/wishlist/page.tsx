"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, X, ArrowRight } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { formatPrice } from "@/src/lib/currency";
import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from "@/src/data/products";

interface WishlistCardProps {
  product: Product;
  onRemove: () => void;
  onAddToCart: () => void;
}

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const { addItem } = useCart();
  const {
    refs,
    products,
    loading,
    error,
    removeFromWishlist: removeItem,
  } = useWishlist(user?.uid, true);

  const handleRemove = useCallback(
    async (productId: string) => {
      if (!user) {
        console.warn("[WishlistPage] remove skipped: no authenticated user");
        return;
      }

      const success = await removeItem(productId);
      if (!success) {
        console.error("[WishlistPage] failed to remove wishlist item", { productId });
      }
    },
    [removeItem, user]
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      addItem(product);
    },
    [addItem]
  );

  const isEmpty = !loading && user && products.length === 0;

  if (authLoading || loading) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: "100vh",
            background: "#F8F9FF",
            paddingTop: 66,
          }}
        >
          <div
            style={{
              maxWidth: 1440,
              margin: "0 auto",
              padding: "24px 16px",
            }}
            className="md:px-8"
          >
            <div style={{ marginBottom: 24 }}>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#1E1E2F",
                  marginBottom: 4,
                }}
              >
                Your Wishlist
              </h1>
              <p
                style={{
                  fontSize: 14,
                  color: "#6B6B8A",
                }}
              >
                Loading saved items...
              </p>
            </div>
            <LoadingState />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: "100vh",
            background: "#F8F9FF",
            paddingTop: 66,
          }}
        >
          <div
            style={{
              maxWidth: 1440,
              margin: "0 auto",
              padding: "24px 16px",
            }}
            className="md:px-8"
          >
            <div style={{ marginBottom: 24 }}>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#1E1E2F",
                  marginBottom: 4,
                }}
              >
                Your Wishlist
              </h1>
              <p
                style={{
                  fontSize: 14,
                  color: "#6B6B8A",
                }}
              >
                Sign in to access your saved items.
              </p>
            </div>
            <AuthRequiredState />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          background: "#F8F9FF",
          paddingTop: 66,
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "24px 16px",
          }}
          className="md:px-8"
        >
          <div style={{ marginBottom: 24 }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#1E1E2F",
                marginBottom: 4,
              }}
            >
              Your Wishlist
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#6B6B8A",
              }}
            >
              Saved items for later
            </p>
          </div>

          {error && (
            <div
              style={{
                marginBottom: 24,
                padding: 16,
                borderRadius: 20,
                background: "#FEF3F2",
                color: "#B91C1C",
              }}
            >
              Unable to load your wishlist. Please refresh the page.
            </div>
          )}

          {isEmpty ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {products.map((product) => (
                <WishlistCard
                  key={product.id}
                  product={product}
                  onRemove={() => handleRemove(product.id)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function WishlistCard({ product, onRemove, onAddToCart }: WishlistCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E4E6F1",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove();
        }}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 32,
          height: 32,
          background: "#fff",
          border: "1px solid #E4E6F1",
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <X size={16} style={{ color: "#6B6B8A" }} />
      </button>

      <Link href={`/products/${product.id}`}>
        <div
          style={{
            height: 160,
            background: "linear-gradient(135deg, #F8F9FF, #F0EFFE)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "contain", padding: 16 }}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <span style={{ fontSize: 56 }} role="img" aria-label={product.name}>
              {product.emoji}
            </span>
          )}
        </div>
      </Link>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 14,
          flex: 1,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "#6B6B8A",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 4,
          }}
        >
          {product.brand}
        </span>

        <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#1E1E2F",
              lineHeight: 1.35,
              minHeight: "2.7em",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: 8,
            }}
          >
            {product.name}
          </h3>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#6C5CE7",
            }}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span
              style={{
                fontSize: 12,
                color: "#9CA3AF",
                textDecoration: "line-through",
              }}
            >
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div style={{ flex: 1 }} />

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart();
          }}
          style={{
            width: "100%",
            height: 44,
            background: "#6C5CE7",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 320,
        color: "#6B6B8A",
      }}
    >
      Loading your wishlist...
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
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
        <Heart size={44} style={{ color: "#6C5CE7" }} />
      </div>

      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1E1E2F",
          marginBottom: 8,
        }}
      >
        Your wishlist is empty
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "#6B6B8A",
          marginBottom: 24,
          maxWidth: 280,
        }}
      >
        Save items to view them later.
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
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
          transition: "background 0.2s",
        }}
      >
        Browse Products
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

function AuthRequiredState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
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
        <Heart size={44} style={{ color: "#6C5CE7" }} />
      </div>

      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1E1E2F",
          marginBottom: 8,
        }}
      >
        Sign in to view your wishlist
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "#6B6B8A",
          marginBottom: 24,
          maxWidth: 320,
        }}
      >
        Your wishlist is stored for your account, so you can access saved products from any device.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            background: "#6C5CE7",
            color: "#fff",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.2s",
          }}
        >
          Sign In
        </Link>
        <Link
          href="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            background: "#E5E7EB",
            color: "#1E1E2F",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.2s",
          }}
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
