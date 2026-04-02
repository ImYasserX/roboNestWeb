"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { DeliveryInfo, Order, OrderStatus, TimestampLike } from "@/src/data/products";
import { formatPrice } from "@/src/lib/currency";
import {
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ChevronDown,
  Search,
  ShoppingCart,
} from "lucide-react";

const statusOptions = [
  { value: "pending", label: "Pending", color: "#F59E0B", bg: "#FEF3C7" },
  { value: "processing", label: "Processing", color: "#6C5CE7", bg: "#EDE9FE" },
  { value: "shipped", label: "Shipped", color: "#3B82F6", bg: "#DBEAFE" },
  { value: "delivered", label: "Delivered", color: "#10B981", bg: "#D1FAE5" },
  { value: "cancelled", label: "Cancelled", color: "#EF4444", bg: "#FEE2E2" },
];

function getOrderDelivery(order: Order): DeliveryInfo | null {
  return order.delivery || order.shippingAddress || null;
}

function formatOrderDate(timestamp: TimestampLike): string {
  if (!timestamp) return "N/A";
  if (timestamp instanceof Date) return timestamp.toLocaleDateString();
  if (typeof timestamp.toDate === "function") return timestamp.toDate().toLocaleDateString();
  if (typeof timestamp.seconds === "number") {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }
  return "N/A";
}

const statusIcons: Record<string, React.ElementType> = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState("");

  const loadOrders = async () => {
    try {
      const ordersQuery = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(ordersQuery);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(data);
    } catch (error) {
      // Permission denied - user not authenticated or not admin
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdating(orderId);
    setUpdateError("");
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (error) {
      setUpdateError("Failed to update order status. Please try again.");
    }
    setUpdating(null);
  };

  const filteredOrders = orders.filter((order) => {
    const delivery = getOrderDelivery(order);
    const orderId = order.id ?? "";
    const matchesSearch =
      orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false;
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          Orders
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                height: 100,
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
        Orders ({orders.length})
      </h1>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <div
          style={{
            flex: 1,
            minWidth: 240,
            background: "#fff",
            borderRadius: 12,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <Search size={20} color="#6B7280" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "#1E1E2F",
            }}
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "12px 16px",
            background: "#fff",
            border: "none",
            borderRadius: 12,
            fontSize: 14,
            color: "#1E1E2F",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <option value="all">All Status</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Orders List */}
      {updateError && (
        <p style={{ marginBottom: 16, color: "#DC2626", fontSize: 14 }}>
          {updateError}
        </p>
      )}

      {filteredOrders.length === 0 ? (
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "60px 24px",
            textAlign: "center",
          }}
        >
          <ShoppingCart
            size={48}
            color="#D1D5DB"
            style={{ marginBottom: 16 }}
          />
          <h3
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#1E1E2F",
              marginBottom: 8,
            }}
          >
            No orders found
          </h3>
          <p style={{ color: "#6B7280" }}>
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "Orders will appear here when customers place them"}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filteredOrders.map((order) => {
            const StatusIcon = statusIcons[order.status || "pending"] || Clock;
            const statusConfig = statusOptions.find(
              (s) => s.value === order.status
            ) || statusOptions[0];
            const orderId = order.id ?? "";
            const delivery = getOrderDelivery(order);
            const isExpanded = expandedOrder === orderId;

            return (
              <div
                key={orderId}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                {/* Order Header */}
                <div
                  onClick={() =>
                    setExpandedOrder(isExpanded ? null : orderId)
                  }
                  style={{
                    padding: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    cursor: "pointer",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Order Info */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#1E1E2F",
                        marginBottom: 4,
                      }}
                    >
                      Order #{orderId.slice(-6).toUpperCase()}
                    </div>
                    <div style={{ fontSize: 13, color: "#6B7280" }}>
                      {delivery?.fullName || "N/A"} -{" "}
                      {order.items?.length || 0} items
                    </div>
                  </div>

                  {/* Total */}
                  <div style={{ textAlign: "right", minWidth: 100 }}>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#1E1E2F",
                      }}
                    >
                      {formatPrice(order.total || 0)}
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>
                      {formatOrderDate(order.createdAt)}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 16px",
                      borderRadius: 999,
                      background: statusConfig.bg,
                      color: statusConfig.color,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    <StatusIcon size={16} />
                    {statusConfig.label}
                  </div>

                  {/* Expand Icon */}
                  <ChevronDown
                    size={20}
                    color="#6B7280"
                    style={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s",
                    }}
                  />
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div
                    style={{
                      padding: "0 20px 20px",
                      borderTop: "1px solid #E4E6F1",
                    }}
                  >
                    {/* Order Items */}
                    <div style={{ marginTop: 16 }}>
                      <h4
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#6B7280",
                          marginBottom: 12,
                          textTransform: "uppercase",
                        }}
                      >
                        Items
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                        }}
                      >
                        {order.items?.map((item, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              padding: 12,
                              background: "#F9FAFB",
                              borderRadius: 10,
                            }}
                          >
                            <div
                              style={{
                                width: 48,
                                height: 48,
                                borderRadius: 8,
                                background: "#E4E6F1",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 24,
                              }}
                            >
                              {(item as any).emoji || "📦"}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  color: "#1E1E2F",
                                }}
                              >
                                {(item as any).name}
                              </div>
                              <div style={{ fontSize: 12, color: "#6B7280" }}>
                                Qty: {item.quantity}
                              </div>
                            </div>
                            <div
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#1E1E2F",
                              }}
                            >
                              {formatPrice((item as any).price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    {delivery && (
                      <div style={{ marginTop: 20 }}>
                        <h4
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#6B7280",
                            marginBottom: 8,
                            textTransform: "uppercase",
                          }}
                        >
                          Shipping Address
                        </h4>
                        <div
                          style={{
                            padding: 12,
                            background: "#F9FAFB",
                            borderRadius: 10,
                            fontSize: 14,
                            color: "#374151",
                            lineHeight: 1.6,
                          }}
                        >
                          <div style={{ fontWeight: 500 }}>
                            {delivery.fullName}
                          </div>
                          <div>{delivery.address || delivery.details || "N/A"}</div>
                          <div>
                            {delivery.city}
                            {delivery.country ? `, ${delivery.country}` : ""}
                          </div>
                          <div>{delivery.phone}</div>
                        </div>
                      </div>
                    )}

                    {/* Update Status */}
                    <div style={{ marginTop: 20 }}>
                      <h4
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#6B7280",
                          marginBottom: 8,
                          textTransform: "uppercase",
                        }}
                      >
                        Update Status
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        {statusOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() =>
                              orderId && updateOrderStatus(orderId, opt.value as OrderStatus)
                            }
                            disabled={
                              updating === orderId ||
                              order.status === opt.value
                            }
                            style={{
                              padding: "8px 16px",
                              borderRadius: 8,
                              border:
                                order.status === opt.value
                                  ? `2px solid ${opt.color}`
                                  : "1px solid #E4E6F1",
                              background:
                                order.status === opt.value ? opt.bg : "#fff",
                              color:
                                order.status === opt.value
                                  ? opt.color
                                  : "#6B7280",
                              fontSize: 13,
                              fontWeight: 500,
                              cursor:
                                order.status === opt.value
                                  ? "default"
                                  : "pointer",
                              opacity: updating === orderId ? 0.5 : 1,
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
