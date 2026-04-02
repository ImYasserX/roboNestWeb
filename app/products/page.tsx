"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import PageContainer from "@/src/components/PageContainer";
import ProductCard from "@/src/components/ProductCard";
import { categories as defaultCategories, sampleProducts } from "@/src/data/products";
import { fetchProducts, FetchProductsResult } from "@/src/services/productService";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Search,
  Package,
  AlertCircle,
  RefreshCw,
  Filter,
} from "lucide-react";

const tap = (fn: () => void) => ({
  onTouchStart: (e: React.TouchEvent) => {
    e.preventDefault();
    fn();
  },
  onClick: fn,
});

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

// Skeleton component for loading state
function ProductSkeleton() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          aspectRatio: "1",
          background: "linear-gradient(90deg, #F0F0F5 25%, #E8E8ED 50%, #F0F0F5 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          style={{
            height: 10,
            width: "40%",
            background: "#F0F0F5",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            height: 14,
            width: "90%",
            background: "#F0F0F5",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            height: 14,
            width: "70%",
            background: "#F0F0F5",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            height: 12,
            width: "50%",
            background: "#F0F0F5",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            height: 18,
            width: "35%",
            background: "#F0F0F5",
            borderRadius: 4,
            marginTop: 4,
          }}
        />
      </div>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";

  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  // Firebase data state
  const [products, setProducts] = useState<typeof sampleProducts>([]);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"firebase" | "fallback">("fallback");

  // Fetch products from Firebase
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result: FetchProductsResult = await fetchProducts();
      setProducts(result.products);
      setDynamicCategories(result.categories);
      setDataSource(result.source);

      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
      setProducts(sampleProducts);
      setDynamicCategories([...new Set(sampleProducts.map((p) => p.category))]);
      setDataSource("fallback");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    setSearchQuery(queryParam);
    setSelectedCategory(categoryParam);
  }, [categoryParam, queryParam]);

  // Combined categories from default + dynamic
  const allCategories = useMemo(() => {
    const categorySet = new Set([
      ...defaultCategories.map((c) => c.name),
      ...dynamicCategories,
    ]);
    return Array.from(categorySet);
  }, [dynamicCategories]);

  // Client-side filtering and sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by in-stock
    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => {
          const aScore = (a.discount || 0) + a.rating * 10;
          const bScore = (b.discount || 0) + b.rating * 10;
          return bScore - aScore;
        });
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy, inStockOnly]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortBy("featured");
    setInStockOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedCategory || inStockOnly;

  // Category counts
  const getCategoryCount = (categoryName: string) => {
    return products.filter((p) => p.category === categoryName).length;
  };

  if (!mounted) return null;

  return (
    <main style={{ paddingTop: 66, minHeight: "100vh", background: "#F8F9FF" }}>
      <Navbar />

      <PageContainer style={{ paddingBlock: "24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1E1E2F",
              marginBottom: 4,
            }}
          >
            {selectedCategory || "All Products"}
          </h1>
          <p style={{ fontSize: 14, color: "#6B6B8A" }}>
            Discover our complete collection of robotics and electronics components
          </p>
          {dataSource === "fallback" && !isLoading && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 8,
                padding: "6px 12px",
                background: "#FEF3C7",
                borderRadius: 8,
                fontSize: 12,
                color: "#92400E",
              }}
            >
              <AlertCircle size={14} />
              Using demo data - Firebase not connected
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row" style={{ gap: 32 }}>
          {/* Desktop Sidebar */}
          <aside
            className="hidden lg:block"
            style={{
              width: 260,
              flexShrink: 0,
            }}
          >
            {/* Search */}
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 16px",
                  background: "#fff",
                  borderRadius: 12,
                  border: "1px solid #E4E6F1",
                }}
              >
                <Search size={18} style={{ color: "#6B6B8A" }} />
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
                    background: "transparent",
                  }}
                />
                {searchQuery && (
                  <button
                    {...tap(() => setSearchQuery(""))}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                    }}
                  >
                    <X size={16} style={{ color: "#6B6B8A" }} />
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1E1E2F",
                  marginBottom: 16,
                }}
              >
                Categories
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  {...tap(() => setSelectedCategory(""))}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    background: !selectedCategory ? "#F0EFFE" : "transparent",
                    border: "none",
                    borderRadius: 10,
                    cursor: "pointer",
                    textAlign: "left",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: !selectedCategory ? 600 : 400,
                      color: !selectedCategory ? "#6C5CE7" : "#1E1E2F",
                    }}
                  >
                    All Products
                  </span>
                  <span style={{ fontSize: 12, color: "#6B6B8A" }}>{products.length}</span>
                </button>
                {allCategories.map((catName) => {
                  const defaultCat = defaultCategories.find((c) => c.name === catName);
                  const count = getCategoryCount(catName);
                  if (count === 0) return null;
                  return (
                    <button
                      key={catName}
                      {...tap(() => setSelectedCategory(catName))}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 12px",
                        background: selectedCategory === catName ? "#F0EFFE" : "transparent",
                        border: "none",
                        borderRadius: 10,
                        cursor: "pointer",
                        textAlign: "left",
                        touchAction: "manipulation",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 14,
                          fontWeight: selectedCategory === catName ? 600 : 400,
                          color: selectedCategory === catName ? "#6C5CE7" : "#1E1E2F",
                        }}
                      >
                        <span>{defaultCat?.emoji || "📦"}</span>
                        {catName}
                      </span>
                      <span style={{ fontSize: 12, color: "#6B6B8A" }}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In-Stock Filter */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1E1E2F",
                  marginBottom: 16,
                }}
              >
                Availability
              </h3>
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
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{
                    width: 20,
                    height: 20,
                    accentColor: "#6C5CE7",
                    cursor: "pointer",
                  }}
                />
                <span style={{ fontSize: 14, color: "#1E1E2F" }}>In Stock Only</span>
              </label>
            </div>

            {hasActiveFilters && (
              <button
                {...tap(clearFilters)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "#FEF2F2",
                  color: "#EF4444",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Main Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Mobile Filter Bar */}
            <div
              className="flex lg:hidden"
              style={{
                gap: 12,
                marginBottom: 16,
              }}
            >
              <button
                {...tap(() => setFilterModalOpen(true))}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 16px",
                  background: "#fff",
                  border: "1px solid #E4E6F1",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1E1E2F",
                  cursor: "pointer",
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <Filter size={18} />
                Filters
                {hasActiveFilters && (
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      background: "#6C5CE7",
                      borderRadius: 999,
                    }}
                  />
                )}
              </button>

              <div style={{ position: "relative", flex: 1 }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 36px 12px 16px",
                    background: "#fff",
                    border: "1px solid #E4E6F1",
                    borderRadius: 12,
                    fontSize: 14,
                    color: "#1E1E2F",
                    cursor: "pointer",
                    appearance: "none",
                  }}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#6B6B8A",
                  }}
                />
              </div>
            </div>

            {/* Desktop Sort + Results Count */}
            <div
              className="hidden lg:flex"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 14, color: "#6B6B8A" }}>
                {filteredProducts.length} products found
              </span>
              <div style={{ position: "relative" }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: "10px 36px 10px 16px",
                    background: "#fff",
                    border: "1px solid #E4E6F1",
                    borderRadius: 10,
                    fontSize: 14,
                    color: "#1E1E2F",
                    cursor: "pointer",
                    appearance: "none",
                  }}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#6B6B8A",
                  }}
                />
              </div>
            </div>

            {/* Error State */}
            {error && !isLoading && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "32px 24px",
                  background: "#FEF2F2",
                  borderRadius: 16,
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                <AlertCircle size={32} style={{ color: "#EF4444", marginBottom: 12 }} />
                <p style={{ fontSize: 14, color: "#991B1B", marginBottom: 12 }}>
                  Failed to load products from server
                </p>
                <button
                  {...tap(loadProducts)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    background: "#EF4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <RefreshCw size={16} />
                  Retry
                </button>
              </div>
            )}

            {/* Product Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "64px 24px",
                  background: "#fff",
                  borderRadius: 20,
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
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1E1E2F",
                    marginBottom: 8,
                  }}
                >
                  No products found
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B6B8A",
                    marginBottom: 24,
                  }}
                >
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
                <button
                  {...tap(clearFilters)}
                  style={{
                    padding: "12px 24px",
                    background: "#6C5CE7",
                    color: "#fff",
                    border: "none",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </PageContainer>

      {/* Mobile Filter Modal */}
      {filterModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.5)",
          }}
          {...tap(() => setFilterModalOpen(false))}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#fff",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: "80vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid #E4E6F1",
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1E1E2F" }}>Filters</h3>
              <button
                {...tap(() => setFilterModalOpen(false))}
                style={{
                  width: 40,
                  height: 40,
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
                <X size={24} style={{ color: "#1E1E2F" }} />
              </button>
            </div>

            <div style={{ padding: 20 }}>
              {/* Search */}
              <div style={{ marginBottom: 24 }}>
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1E1E2F",
                    marginBottom: 12,
                  }}
                >
                  Search
                </h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 16px",
                    background: "#F8F9FF",
                    borderRadius: 12,
                    border: "1px solid #E4E6F1",
                  }}
                >
                  <Search size={18} style={{ color: "#6B6B8A" }} />
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
                      background: "transparent",
                    }}
                  />
                </div>
              </div>

              {/* Categories */}
              <div style={{ marginBottom: 24 }}>
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1E1E2F",
                    marginBottom: 12,
                  }}
                >
                  Category
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <button
                    {...tap(() => setSelectedCategory(""))}
                    style={{
                      padding: "8px 16px",
                      background: !selectedCategory ? "#6C5CE7" : "#F8F9FF",
                      color: !selectedCategory ? "#fff" : "#1E1E2F",
                      border: "none",
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    All
                  </button>
                  {allCategories.map((catName) => {
                    const count = getCategoryCount(catName);
                    if (count === 0) return null;
                    return (
                      <button
                        key={catName}
                        {...tap(() => setSelectedCategory(catName))}
                        style={{
                          padding: "8px 16px",
                          background: selectedCategory === catName ? "#6C5CE7" : "#F8F9FF",
                          color: selectedCategory === catName ? "#fff" : "#1E1E2F",
                          border: "none",
                          borderRadius: 999,
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        {catName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div style={{ marginBottom: 24 }}>
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1E1E2F",
                    marginBottom: 12,
                  }}
                >
                  Availability
                </h4>
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
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    style={{
                      width: 20,
                      height: 20,
                      accentColor: "#6C5CE7",
                      cursor: "pointer",
                    }}
                  />
                  <span style={{ fontSize: 14, color: "#1E1E2F" }}>In Stock Only</span>
                </label>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 12 }}>
                {hasActiveFilters && (
                  <button
                    {...tap(clearFilters)}
                    style={{
                      flex: 1,
                      padding: "14px 24px",
                      background: "#FEF2F2",
                      color: "#EF4444",
                      border: "none",
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Clear
                  </button>
                )}
                <button
                  {...tap(() => setFilterModalOpen(false))}
                  style={{
                    flex: 1,
                    padding: "14px 24px",
                    background: "#6C5CE7",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
