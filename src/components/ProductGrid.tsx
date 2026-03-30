"use client";

import React from "react";
import { Product } from "@/src/data/products";
import PageContainer from "@/src/components/PageContainer";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <PageContainer as="section" style={{ paddingBlock: "32px" }}>
      {title && (
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#1E1E2F",
            marginBottom: 24,
          }}
        >
          {title}
        </h2>
      )}

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        style={{ gap: 24 }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PageContainer>
  );
}
