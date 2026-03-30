"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { useAuth } from "@/src/context/AuthContext";
import { db } from "@/src/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { Order } from "@/src/data/products";
import { formatPrice } from "@/src/lib/currency";
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  ShoppingBag,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

const statusConfig = {
  pending: {
    label: "Pending",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    color: "#6C5CE7",
    bgColor: "#F0EFFE",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    color: "#3B82F6",
    bgColor: "#DBEAFE",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "#10B981",
    bgColor: "#D1FAE5",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "#EF4444",
    bgColor: "#FEE2E2",
    icon: XCircle,
  },
};

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/orders");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setLoading(false);
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <main style={{ paddingTop: 66, minHeight: "100vh" }}>
        <Navbar />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              border: "4px solid #F0EFFE",
              borderTopColor: "#6C5CE7",
              borderRadius: 999,
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <Footer />
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main style={{ paddingTop: 66, minHeight: "100vh" }}>
        <Navbar />
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
              width: 100,
              height: 100,
              background: "#F0EFFE",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <ShoppingBag size={48} style={{ color: "#6C5CE7" }} />
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1E1E2F",
              marginBottom: 12,
            }}
          >
            No orders yet
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#6B6B8A",
              marginBottom: 32,
              maxWidth: 400,
            }}
          >
            You haven&apos;t placed any orders yet. Start shopping to see your
            orders here.
          </p>
          <Link
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              background: "#6C5CE7",
              color: "#fff",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Start Shopping
            <ChevronRight size={20} />
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 66, minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "24px 16px",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#1E1E2F",
            marginBottom: 24,
          }}
        >
          My Orders
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {orders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={order.id}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, color: "#6B6B8A" }}>
                        Order ID:
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#1E1E2F",
                          textTransform: "uppercase",
                        }}
                      >
                        {order.id?.slice(-8).toUpperCase()}
                      </span>
                    </div>
                    {order.createdAt && (
                      <div style={{ fontSize: 13, color: "#6B6B8A", marginTop: 4 }}>
                        {new Date(
                          (order.createdAt as { seconds: number }).seconds * 1000
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 16px",
                      background: status.bgColor,
                      borderRadius: 999,
                    }}
                  >
                    <StatusIcon size={16} style={{ color: status.color }} />
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: status.color,
                      }}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 20,
                    padding: "16px",
                    background: "#F8F9FF",
                    borderRadius: 12,
                  }}
                >
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 12px",
                        background: "#fff",
                        borderRadius: 8,
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{item.emoji}</span>
                      <span style={{ fontSize: 13, color: "#1E1E2F" }}>
                        {item.name.length > 25
                          ? item.name.substring(0, 25) + "..."
                          : item.name}
                      </span>
                      <span style={{ fontSize: 12, color: "#6B6B8A" }}>
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery Info */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 24,
                    paddingTop: 16,
                    borderTop: "1px solid #E4E6F1",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <MapPin size={18} style={{ color: "#6C5CE7" }} />
                    <span style={{ fontSize: 14, color: "#6B6B8A" }}>
                      {order.delivery.city}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Phone size={18} style={{ color: "#6C5CE7" }} />
                    <span style={{ fontSize: 14, color: "#6B6B8A" }}>
                      {order.delivery.phone}
                    </span>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <span style={{ fontSize: 12, color: "#6B6B8A" }}>Total: </span>
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#6C5CE7",
                      }}
                    >
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}
