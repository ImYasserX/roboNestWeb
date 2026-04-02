"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import PageContainer from "@/src/components/PageContainer";
import ProductImageGallery from "@/src/components/ProductImageGallery";
import ProductInfo from "@/src/components/ProductInfo";
import RelatedProducts from "@/src/components/RelatedProducts";
import { useAuth } from "@/src/context/AuthContext";
import { addToWishlist, isInWishlist, removeFromWishlist } from "@/lib/wishlist";
import { Product } from "@/src/data/products";
import { fetchProductById } from "@/src/services/productService";
import { ChevronLeft, Package, AlertCircle } from "lucide-react";

// Loading Skeleton Component
function ProductSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 32,
      }}
      className="lg:!grid-cols-2"
    >
      {/* Image Skeleton */}
      <div
        style={{
          background: "linear-gradient(135deg, #F0EFFE 0%, #E8E5FF 100%)",
          borderRadius: 24,
          aspectRatio: "1",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />

      {/* Info Skeleton */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Category */}
        <div
          style={{
            width: 100,
            height: 24,
            background: "#E4E6F1",
            borderRadius: 999,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        {/* Title */}
        <div
          style={{
            width: "80%",
            height: 36,
            background: "#E4E6F1",
            borderRadius: 8,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        {/* Rating */}
        <div
          style={{
            width: 200,
            height: 20,
            background: "#E4E6F1",
            borderRadius: 8,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        {/* Price */}
        <div
          style={{
            width: 150,
            height: 40,
            background: "#E4E6F1",
            borderRadius: 8,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        {/* Stock */}
        <div
          style={{
            width: 180,
            height: 20,
            background: "#E4E6F1",
            borderRadius: 8,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        {/* Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: i === 3 ? "60%" : "100%",
                height: 16,
                background: "#E4E6F1",
                borderRadius: 8,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
        {/* Button */}
        <div
          style={{
            width: "100%",
            height: 56,
            background: "#E4E6F1",
            borderRadius: 999,
            marginTop: 24,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
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

// Not Found Component
function ProductNotFound() {
  return (
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
        Product Not Found
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "#6B6B8A",
          marginBottom: 24,
        }}
      >
        {"The product you're looking for doesn't exist or has been removed."}
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
  );
}

// Error Component
function ProductError({ onRetry }: { onRetry: () => void }) {
  return (
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
          background: "#FEE2E2",
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <AlertCircle size={36} style={{ color: "#EF4444" }} />
      </div>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#1E1E2F",
          marginBottom: 8,
        }}
      >
        Something Went Wrong
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "#6B6B8A",
          marginBottom: 24,
        }}
      >
        We couldn&apos;t load this product. Please try again.
      </p>
      <button
        onClick={onRetry}
        style={{
          padding: "12px 24px",
          background: "#6C5CE7",
          color: "#fff",
          borderRadius: 999,
          border: "none",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const loadProduct = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchProductById(productId);
      setProduct(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && productId) {
      loadProduct();
    }
  }, [mounted, productId]);

  useEffect(() => {
    if (!mounted || !productId) {
      return;
    }

    let active = true;

    const loadWishlistState = async () => {
      if (!user) {
        if (active) setIsWishlisted(false);
        return;
      }

      try {
        const exists = await isInWishlist(user.uid, productId);
        if (active) {
          setIsWishlisted(exists);
        }
      } catch (loadError) {
        if (active) {
          setIsWishlisted(false);
        }
      }
    };

    loadWishlistState();

    return () => {
      active = false;
    };
  }, [mounted, user, productId]);

  const handleWishlistToggle = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    const nextState = !isWishlisted;
    setIsWishlisted(nextState);

    try {
      if (nextState) {
        await addToWishlist(user.uid, productId);
      } else {
        await removeFromWishlist(user.uid, productId);
      }
    } catch (toggleError) {
      setIsWishlisted(!nextState);
    }
  };

  if (!mounted) {
    return null;
  }

  // Get product images array
  const productImages: string[] = product
    ? [
        ...(product.images || []),
        ...(product.imageUrl && !product.images?.includes(product.imageUrl)
          ? [product.imageUrl]
          : []),
      ].filter(Boolean)
    : [];

  return (
    <main style={{ paddingTop: 66, minHeight: "100vh" }}>
      <Navbar />

      <PageContainer style={{ paddingBlock: "24px" }}>
        {/* Breadcrumb */}
        <Link
          href="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 14,
            color: "#6B6B8A",
            textDecoration: "none",
            marginBottom: 24,
          }}
        >
          <ChevronLeft size={18} />
          Back to Products
        </Link>

        {/* Content */}
        {loading ? (
          <ProductSkeleton />
        ) : error ? (
          <ProductError onRetry={loadProduct} />
        ) : !product ? (
          <ProductNotFound />
        ) : (
          <>
            {/* Product Section */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 32,
              }}
              className="lg:!grid-cols-2"
            >
              {/* Image Gallery */}
              <ProductImageGallery
                images={productImages}
                emoji={product.emoji}
                productName={product.name}
                isNew={product.isNew}
                discount={product.discount}
                isWishlisted={isWishlisted}
                onWishlistToggle={handleWishlistToggle}
              />

              {/* Product Info */}
              <ProductInfo product={product} />
            </div>

            {/* Related Products */}
            <RelatedProducts category={product.category} excludeId={product.id} />
          </>
        )}
      </PageContainer>

      <Footer />
    </main>
  );
}
