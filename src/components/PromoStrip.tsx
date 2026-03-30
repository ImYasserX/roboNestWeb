"use client";

import React from "react";
import { Truck, Shield, RotateCcw } from "lucide-react";
import PageContainer from "@/src/components/PageContainer";

const promos = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Cash on delivery",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day return policy",
  },
];

export default function PromoStrip() {
  return (
    <PageContainer as="section" style={{ paddingBlock: "32px" }}>
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ gap: 16 }}
      >
        {promos.map((promo, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: 20,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                background: "#F0EFFE",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <promo.icon size={24} style={{ color: "#6C5CE7" }} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1E1E2F",
                }}
              >
                {promo.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#6B6B8A",
                  marginTop: 2,
                }}
              >
                {promo.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
