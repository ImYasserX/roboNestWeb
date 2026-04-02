"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import PageContainer from "@/src/components/PageContainer";
import { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/services/productService";

function ProductSkeleton() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        aspectRatio: "1 / 1.25",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
  );
}

export default function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadPopularProducts = async () => {
      try {
        const result = await fetchProducts({ limitCount: 8 });

        if (!active) {
          return;
        }

        setProducts(result.products.slice(0, 8));
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPopularProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <PageContainer as="section" style={{ paddingBlock: "32px" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#1E1E2F",
          marginBottom: 24,
        }}
      >
        Popular Products
      </h2>

      {loading ? (
        <>
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
          <style jsx>{`
            @keyframes pulse {
              0%,
              100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }
          `}</style>
        </>
      ) : products.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "48px 16px",
            background: "#F8F9FF",
            borderRadius: 16,
          }}
        >
          <p style={{ color: "#6B6B8A", fontSize: 16 }}>
            Popular products will appear here when your catalog is ready.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
