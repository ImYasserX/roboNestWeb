"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, Package } from "lucide-react";
import { fetchProducts, deleteProduct } from "@/src/services/productService";
import { Product } from "@/src/data/products";
import { formatPrice } from "@/src/lib/currency";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const loadProducts = async () => {
    try {
      const result = await fetchProducts();
      setProducts(result.products);
    } catch (error) {
      console.error("Error loading products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      setDeleteError("Failed to delete product. Please try again.");
    }
    setDeleting(false);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1E1E2F" }}>
            Products
          </h1>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 16,
                height: 280,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {deleteError && (
        <div
          style={{
            padding: "12px 16px",
            background: "#FEF2F2",
            color: "#EF4444",
            borderRadius: 12,
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          {deleteError}
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1E1E2F" }}>
          Products ({products.length})
        </h1>
        <Link
          href="/admin/products/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 20px",
            background: "#6C5CE7",
            color: "#fff",
            borderRadius: 10,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "12px 16px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <Search size={20} color="#6B7280" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: 14,
            color: "#1E1E2F",
          }}
        />
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "60px 24px",
            textAlign: "center",
          }}
        >
          <Package size={48} color="#D1D5DB" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1E1E2F", marginBottom: 8 }}>
            No products found
          </h3>
          <p style={{ color: "#6B7280", marginBottom: 24 }}>
            {searchQuery
              ? "Try a different search term"
              : "Get started by adding your first product"}
          </p>
          {!searchQuery && (
            <Link
              href="/admin/products/new"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                background: "#6C5CE7",
                color: "#fff",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <Plus size={18} />
              Add Product
            </Link>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  height: 160,
                  background: "#F3F4F6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {(product as any).images?.[0] || (product as any).imageUrl ? (
                  <Image
                    src={(product as any).images?.[0] || (product as any).imageUrl}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ fontSize: 48 }}>{product.emoji}</span>
                )}
                {product.isNew && (
                  <span
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "#6C5CE7",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "4px 8px",
                      borderRadius: 6,
                    }}
                  >
                    NEW
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: 16 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#6B7280",
                    marginBottom: 4,
                    textTransform: "uppercase",
                  }}
                >
                  {product.category}
                </div>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#1E1E2F",
                    marginBottom: 8,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#6C5CE7" }}>
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span
                      style={{
                        fontSize: 14,
                        color: "#9CA3AF",
                        textDecoration: "line-through",
                      }}
                    >
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: product.stock > 0 ? "#10B981" : "#EF4444",
                    }}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link
                      href={`/admin/products/${product.id}`}
                      style={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#F3F4F6",
                        borderRadius: 8,
                        color: "#6B7280",
                      }}
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => setDeleteConfirmId(product.id)}
                      style={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#FEE2E2",
                        borderRadius: 8,
                        border: "none",
                        cursor: "pointer",
                        color: "#EF4444",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              maxWidth: 400,
              width: "100%",
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#1E1E2F",
                marginBottom: 12,
              }}
            >
              Delete Product?
            </h3>
            <p style={{ color: "#6B7280", marginBottom: 24 }}>
              This action cannot be undone. The product will be permanently deleted.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={deleting}
                style={{
                  padding: "10px 20px",
                  background: "#F3F4F6",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "#6B7280",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleting}
                style={{
                  padding: "10px 20px",
                  background: "#EF4444",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "#fff",
                  opacity: deleting ? 0.7 : 1,
                }}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
