"use client";

import React from "react";
import { Package, Users, Award, Truck } from "lucide-react";
import PageContainer from "@/src/components/PageContainer";

const stats = [
  { icon: Package, value: "500+", label: "Products" },
  { icon: Users, value: "2000+", label: "Happy Makers" },
  { icon: Award, value: "30+", label: "Brands" },
  { icon: Truck, value: "24h", label: "Delivery" },
];

export default function StatsBar() {
  return (
    <PageContainer as="section" style={{ paddingBlock: "32px" }}>
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          gap: 16,
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
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
              <stat.icon size={24} style={{ color: "#6C5CE7" }} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#1E1E2F",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#6B6B8A",
                }}
              >
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
