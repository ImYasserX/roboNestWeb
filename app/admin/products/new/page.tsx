"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Check, Package } from "lucide-react";
import { createProduct, ProductInput } from "@/src/services/productService";
import { categories } from "@/src/data/products";

// Common product emojis
const productEmojis = [
  "🤖", "🔧", "⚡", "🔌", "💡", "🎮", "📱", "💻", "🖥️", "⌨️",
  "🖱️", "🔋", "📷", "🎧", "🔊", "📡", "🛠️", "⚙️", "🔩", "🧲",
  "🎛️", "📺", "🕹️", "💾", "📀", "🔬", "🔭", "🧪", "🧬", "🔮"
];

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    originalPrice: "",
    description: "",
    stock: "",
    isNew: true,
    emoji: "🤖",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!form.name || !form.brand || !form.category || !form.price || !form.stock) {
      setError("Please fill in all required fields");
      return;
    }

    setSaving(true);

    try {
      const productData: ProductInput = {
        name: form.name,
        brand: form.brand,
        category: form.category,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        description: form.description,
        stock: parseInt(form.stock),
        isNew: form.isNew,
        emoji: form.emoji,
        images: [],
      };

      await createProduct(productData);
      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setSaving(false);
    }
  };

  if (success) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 400,
          gap: 16,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            background: "#ECFDF5",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check size={32} color="#10B981" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1E1E2F" }}>
          Product Created!
        </h2>
        <p style={{ fontSize: 14, color: "#6B7280" }}>
          Redirecting to products list...
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Link
          href="/admin/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            color: "#6B7280",
            textDecoration: "none",
            marginBottom: 16,
          }}
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1E1E2F" }}>
          Add New Product
        </h1>
      </div>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            background: "#FEE2E2",
            borderRadius: 10,
            marginBottom: 24,
            color: "#DC2626",
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          {/* Emoji Selector */}
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
              Product Icon
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: "#F3F4F6",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                }}
              >
                {form.emoji}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  flex: 1,
                }}
              >
                {productEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setForm({ ...form, emoji })}
                    style={{
                      width: 40,
                      height: 40,
                      background: form.emoji === emoji ? "#EDE9FE" : "#F3F4F6",
                      border: form.emoji === emoji ? "2px solid #6C5CE7" : "none",
                      borderRadius: 8,
                      fontSize: 20,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 8 }}>
              Select an emoji to represent your product (image uploads coming soon)
            </p>
          </div>

          {/* Product Name */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                color: "#1E1E2F",
                marginBottom: 8,
              }}
            >
              Product Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter product name"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #E4E6F1",
                borderRadius: 10,
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>

          {/* Brand & Category Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 20,
            }}
          >
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
                Brand *
              </label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                placeholder="Enter brand"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #E4E6F1",
                  borderRadius: 10,
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>
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
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #E4E6F1",
                  borderRadius: 10,
                  fontSize: 14,
                  outline: "none",
                  background: "#fff",
                }}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
              marginBottom: 20,
            }}
          >
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
                Price (USD) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #E4E6F1",
                  borderRadius: 10,
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>
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
                Original Price (USD)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                placeholder="0.00"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #E4E6F1",
                  borderRadius: 10,
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>
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
                Stock *
              </label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="0"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #E4E6F1",
                  borderRadius: 10,
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                color: "#1E1E2F",
                marginBottom: 8,
              }}
            >
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter product description"
              rows={4}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #E4E6F1",
                borderRadius: 10,
                fontSize: 14,
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          {/* Is New Toggle */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={form.isNew}
                onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
                style={{ width: 18, height: 18, cursor: "pointer" }}
              />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1E1E2F" }}>
                Mark as New Product
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div style={{ display: "flex", gap: 12 }}>
            <Link
              href="/admin/products"
              style={{
                padding: "14px 28px",
                border: "1px solid #E4E6F1",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                color: "#6B7280",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              style={{
                flex: 1,
                padding: "14px 28px",
                background: saving ? "#A5B4FC" : "#6C5CE7",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: saving ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Package size={18} />
                  Create Product
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
