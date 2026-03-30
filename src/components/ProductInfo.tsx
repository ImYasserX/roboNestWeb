"use client";

import React, { useState } from "react";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  Truck,
  Shield,
  Package,
} from "lucide-react";
import { Product } from "@/src/data/products";
import { useCart } from "@/src/context/CartContext";
import { formatPrice } from "@/src/lib/currency";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div>
      {/* Category & Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            padding: "4px 12px",
            background: "#F0EFFE",
            color: "#6C5CE7",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 999,
          }}
        >
          {product.category}
        </span>
        {product.brand && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#6B6B8A",
              textTransform: "uppercase",
            }}
          >
            {product.brand}
          </span>
        )}
      </div>

      {/* Name */}
      <h1
        style={{
          fontSize: "clamp(24px, 4vw, 32px)",
          fontWeight: 800,
          color: "#1E1E2F",
          lineHeight: 1.2,
          marginBottom: 16,
        }}
      >
        {product.name}
      </h1>

      {/* Rating */}
      {product.rating !== undefined && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                style={{
                  color: star <= Math.floor(product.rating || 0) ? "#F59E0B" : "#E5E7EB",
                  fill: star <= Math.floor(product.rating || 0) ? "#F59E0B" : "transparent",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#1E1E2F" }}>
            {product.rating}
          </span>
          <span style={{ fontSize: 14, color: "#6B6B8A" }}>
            ({product.reviewCount || 0} reviews)
          </span>
        </div>
      )}

      {/* Price */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#6C5CE7",
            }}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span
              style={{
                fontSize: 20,
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
              display: "inline-block",
              marginTop: 8,
              padding: "6px 12px",
              background: "#ECFDF5",
              color: "#10B981",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 999,
            }}
          >
            You save {formatPrice(savings)}
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: isOutOfStock ? "#EF4444" : product.stock > 10 ? "#10B981" : "#F59E0B",
          }}
        />
        <span style={{ fontSize: 14, color: isOutOfStock ? "#EF4444" : "#6B6B8A" }}>
          {isOutOfStock
            ? "Out of Stock"
            : product.stock > 10
            ? `In Stock (${product.stock} available)`
            : `Only ${product.stock} left`}
        </span>
      </div>

      {/* Description */}
      {product.description && (
        <p
          style={{
            fontSize: 15,
            color: "#6B6B8A",
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: 600,
          }}
        >
          {product.description}
        </p>
      )}

      {/* Quantity Selector */}
      {!isOutOfStock && (
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1E1E2F",
              marginBottom: 12,
            }}
          >
            Quantity
          </label>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "#F8F9FF",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Minus size={20} style={{ color: "#6B6B8A" }} />
            </button>
            <span
              style={{
                width: 48,
                textAlign: "center",
                fontSize: 16,
                fontWeight: 600,
                color: "#1E1E2F",
              }}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Plus size={20} style={{ color: "#6B6B8A" }} />
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        style={{
          width: "100%",
          padding: "16px 32px",
          background: isOutOfStock ? "#D1D5DB" : addedToCart ? "#10B981" : "#6C5CE7",
          color: "#fff",
          border: "none",
          borderRadius: 999,
          fontSize: 16,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          cursor: isOutOfStock ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          marginBottom: 24,
        }}
      >
        {isOutOfStock ? (
          "Out of Stock"
        ) : addedToCart ? (
          <>
            <Check size={22} />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart size={22} />
            Add to Cart — {formatPrice(product.price * quantity)}
          </>
        )}
      </button>

      {/* Features */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: 16,
            background: "#F8F9FF",
            borderRadius: 12,
          }}
        >
          <Truck size={24} style={{ color: "#6C5CE7" }} />
          <span style={{ fontSize: 12, color: "#6B6B8A", textAlign: "center" }}>
            Free Shipping
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: 16,
            background: "#F8F9FF",
            borderRadius: 12,
          }}
        >
          <Shield size={24} style={{ color: "#6C5CE7" }} />
          <span style={{ fontSize: 12, color: "#6B6B8A", textAlign: "center" }}>
            Warranty
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: 16,
            background: "#F8F9FF",
            borderRadius: 12,
          }}
        >
          <Package size={24} style={{ color: "#6C5CE7" }} />
          <span style={{ fontSize: 12, color: "#6B6B8A", textAlign: "center" }}>
            24h Delivery
          </span>
        </div>
      </div>
    </div>
  );
}
