"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ShoppingCart, DollarSign, Users, ArrowRight } from "lucide-react";
import { fetchProducts } from "@/src/services/productService";
import { formatPrice } from "@/src/lib/currency";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { Product, Order } from "@/src/data/products";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Fetch products (this should always work with public read)
        const productsResult = await fetchProducts();
        
        let orders: Order[] = [];
        let allOrders: Order[] = [];
        
        // Try to fetch orders (may fail if not authenticated)
        try {
          const ordersQuery = query(
            collection(db, "orders"),
            orderBy("createdAt", "desc"),
            limit(5)
          );
          const ordersSnap = await getDocs(ordersQuery);
          orders = ordersSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Order[];

          // Fetch all orders for stats
          const allOrdersSnap = await getDocs(collection(db, "orders"));
          allOrders = allOrdersSnap.docs.map((doc) => doc.data()) as Order[];
        } catch (orderError) {
          // Orders require authentication - admin will see 0 orders until logged in
        }

        // Calculate stats
        const totalRevenue = allOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        const uniqueCustomers = new Set(allOrders.map((o) => o.userId)).size;

        setStats({
          totalProducts: productsResult.products.length,
          totalOrders: allOrders.length,
          totalRevenue,
          totalCustomers: uniqueCustomers,
        });
        setRecentOrders(orders);
      } catch (error) {
        // Silent error handling - stats will show 0 values
      }
      setLoading(false);
    };

    loadStats();
  }, []);

  const statCards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "#6C5CE7",
      href: "/admin/products",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "#3B82F6",
      href: "/admin/orders",
    },
    {
      label: "Revenue",
      value: formatPrice(stats.totalRevenue, { compact: true }),
      icon: DollarSign,
      color: "#10B981",
      href: "/admin/orders",
    },
    {
      label: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "#F59E0B",
      href: "/admin/orders",
    },
  ];

  if (loading) {
    return (
      <div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#1E1E2F",
            marginBottom: 24,
          }}
        >
          Dashboard
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                height: 120,
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
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#1E1E2F",
          marginBottom: 24,
        }}
      >
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
          marginBottom: 32,
        }}
      >
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                textDecoration: "none",
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${stat.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={24} color={stat.color} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#6B7280",
                    marginBottom: 4,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#1E1E2F",
                  }}
                >
                  {stat.value}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1E1E2F" }}>
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 14,
              color: "#6C5CE7",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 0",
              color: "#6B7280",
            }}
          >
            No orders yet
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Order ID", "Customer", "Items", "Total", "Status"].map(
                    (header) => (
                      <th
                        key={header}
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#6B7280",
                          textTransform: "uppercase",
                          borderBottom: "1px solid #E4E6F1",
                        }}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id ?? order.userId}>
                    <td
                      style={{
                        padding: "16px",
                        fontSize: 14,
                        color: "#1E1E2F",
                        fontWeight: 500,
                        borderBottom: "1px solid #E4E6F1",
                      }}
                    >
                      #{(order.id ?? "").slice(-6).toUpperCase()}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        fontSize: 14,
                        color: "#6B7280",
                        borderBottom: "1px solid #E4E6F1",
                      }}
                    >
                      {(order.delivery?.fullName || order.shippingAddress?.fullName || "N/A")}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        fontSize: 14,
                        color: "#6B7280",
                        borderBottom: "1px solid #E4E6F1",
                      }}
                    >
                      {order.items?.length || 0} items
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        fontSize: 14,
                        color: "#1E1E2F",
                        fontWeight: 600,
                        borderBottom: "1px solid #E4E6F1",
                      }}
                    >
                      {formatPrice(order.total || 0)}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        borderBottom: "1px solid #E4E6F1",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 500,
                          background:
                            order.status === "delivered"
                              ? "#D1FAE5"
                              : order.status === "cancelled"
                              ? "#FEE2E2"
                              : "#FEF3C7",
                          color:
                            order.status === "delivered"
                              ? "#065F46"
                              : order.status === "cancelled"
                              ? "#991B1B"
                              : "#92400E",
                        }}
                      >
                        {order.status || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
