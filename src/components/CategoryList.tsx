"use client";

import React from "react";
import Link from "next/link";
import PageContainer from "@/src/components/PageContainer";
import { categories } from "@/src/data/products";

const tap = (fn: () => void) => ({
  onTouchStart: (e: React.TouchEvent) => {
    e.preventDefault();
    fn();
  },
  onClick: fn,
});

export default function CategoryList() {
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
        Popular Categories
      </h2>

      {/* Mobile: Horizontal scroll */}
      <div
        className="flex lg:hidden no-scrollbar"
        style={{
          overflowX: "auto",
          gap: 16,
          paddingBottom: 8,
        }}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${encodeURIComponent(category.name)}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                background: "#fff",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              {category.emoji}
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#1E1E2F",
                textAlign: "center",
                maxWidth: 80,
              }}
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop: Grid */}
      <div
        className="hidden lg:grid"
        style={{
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: 24,
        }}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${encodeURIComponent(category.name)}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              padding: 16,
              borderRadius: 20,
              transition: "background 0.2s",
            }}
            className="hover:bg-white"
          >
            <div
              style={{
                width: 80,
                height: 80,
                background: "#fff",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
              }}
              className="hover:scale-110 hover:shadow-lg"
            >
              {category.emoji}
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1E1E2F",
                }}
              >
                {category.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#6B6B8A",
                  marginTop: 2,
                }}
              >
                {category.count} items
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
