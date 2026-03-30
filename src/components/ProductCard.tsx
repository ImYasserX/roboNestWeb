"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Product } from "@/src/data/products";
import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import { addToWishlist, removeFromWishlist } from "@/lib/wishlist";
import { formatPrice } from "@/src/lib/currency";

const categoryEmoji: Record<string, string> = {
  Microcontrollers: "🤖",
  Sensors: "📡",
  Displays: "🖥️",
  Power: "⚡",
  Modules: "📦",
  Kits: "🧰",
  Cables: "🔌",
  Tools: "🔧",
};

const tap = (fn: () => void) => ({
  onTouchStart: (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fn();
  },
  onClick: (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fn();
  },
});

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistClick = useCallback(async () => {
    if (!user?.uid) {
      console.error("No user logged in");
      return;
    }

    try {
      if (isWishlisted) {
        console.log("[ProductCard] REMOVING from wishlist", { userId: user.uid, productId: product.id });
        await removeFromWishlist(user.uid, product.id);
        setIsWishlisted(false);
        console.log("[ProductCard] wishlist removed from card", product.id);
      } else {
        console.log("[ProductCard] ADDING to wishlist", { userId: user.uid, productId: product.id });
        await addToWishlist(user.uid, product.id);
        setIsWishlisted(true);
        console.log("[ProductCard] wishlist added from card", product.id);
      }
    } catch (err) {
      console.error("wishlist add/remove failed:", err, {
        userId: user.uid,
        productId: product.id,
      });
    }
  }, [user, isWishlisted, product.id]);

  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className="block h-full"
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        textDecoration: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1",
          background: "linear-gradient(135deg, #F8F9FF, #F0EFFE)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: "contain", padding: 12 }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <span
            style={{ fontSize: "3rem" }}
            role="img"
            aria-label={product.category}
          >
            {product.emoji || categoryEmoji[product.category] || "📦"}
          </span>
        )}

        {/* Badges */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {product.isNew && (
            <span
              style={{
                padding: "3px 8px",
                background: "#F0EFFE",
                color: "#6C5CE7",
                fontSize: 9,
                fontWeight: 700,
                borderRadius: 999,
                textTransform: "uppercase",
              }}
            >
              NEW
            </span>
          )}
          {product.discount && (
            <span
              style={{
                padding: "3px 8px",
                background: "#FEF2F2",
                color: "#EF4444",
                fontSize: 9,
                fontWeight: 700,
                borderRadius: 999,
              }}
            >
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          {...tap(handleWishlistClick)}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 32,
            height: 32,
            background: "#fff",
            border: "none",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <Heart
            size={16}
            style={{
              color: isWishlisted ? "#EF4444" : "#6B6B8A",
              fill: isWishlisted ? "#EF4444" : "transparent",
            }}
          />
        </button>

        {/* Desktop Add to Cart - slides up on hover */}
        <button
          {...tap(() => addItem(product))}
          className="hidden md:flex items-center justify-center"
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            right: 8,
            padding: "8px 12px",
            background: "#6C5CE7",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            gap: 6,
            cursor: "pointer",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.2s, transform 0.2s",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>

      {/* Content - No absolute positioning */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 12,
          gap: 4,
        }}
      >
        {/* Brand */}
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            color: "#6B6B8A",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {product.brand}
        </span>

        {/* Name */}
        <h3
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#1E1E2F",
            lineHeight: 1.3,
            minHeight: "2.6em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={10}
              style={{
                color: star <= Math.floor(product.rating) ? "#F59E0B" : "#E5E7EB",
                fill: star <= Math.floor(product.rating) ? "#F59E0B" : "transparent",
              }}
            />
          ))}
          <span
            style={{
              fontSize: 10,
              color: "#6B6B8A",
              marginLeft: 2,
            }}
          >
            ({product.reviewCount})
          </span>
        </div>

        {/* Price Row - includes mobile cart button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#6C5CE7",
                }}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: 11,
                    color: "#9CA3AF",
                    textDecoration: "line-through",
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {savings > 0 && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#10B981",
                  display: "block",
                }}
              >
                Save {formatPrice(savings)}
              </span>
            )}
          </div>

          {/* Mobile Add to Cart Button - in document flow, not absolute */}
          <button
            {...tap(() => addItem(product))}
            className="flex md:hidden items-center justify-center"
            style={{
              width: 36,
              height: 36,
              background: "#6C5CE7",
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(108,92,231,0.3)",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <ShoppingCart size={16} color="#fff" />
          </button>
        </div>
      </div>
    </Link>
  );
}
