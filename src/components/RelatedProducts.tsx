"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/src/data/products";
import { fetchRelatedProducts } from "@/src/services/productService";

interface RelatedProductsProps {
  category: string;
  excludeId: string;
}

export default function RelatedProducts({ category, excludeId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelated = async () => {
      setLoading(true);
      const related = await fetchRelatedProducts(category, excludeId, 4);
      setProducts(related);
      setLoading(false);
    };
    loadRelated();
  }, [category, excludeId]);

  if (loading) {
    return (
      <section style={{ marginTop: 64 }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#1E1E2F",
            marginBottom: 24,
          }}
        >
          Related Products
        </h2>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 16 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                background: "#F0EFFE",
                borderRadius: 16,
                aspectRatio: "1",
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
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section style={{ marginTop: 64 }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#1E1E2F",
          marginBottom: 24,
        }}
      >
        Related Products
      </h2>
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ gap: 16 }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
