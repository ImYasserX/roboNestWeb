"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import {
  Package,
  Plus,
  ShoppingCart,
  LayoutDashboard,
  Menu,
  X,
  LogOut,
  Shield,
  Loader2,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package, exact: true },
  { href: "/admin/products/new", label: "Add Product", icon: Plus, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart, exact: false },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, profile, loading: authLoading, isAdmin, adminLoading, logOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logOut();
    window.location.href = "/";
  };

  // Check if route is active
  const isRouteActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Loading state - wait for mount, auth, and admin check
  if (!mounted || authLoading || adminLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8F9FA",
          gap: 16,
        }}
      >
        <Loader2
          size={40}
          style={{
            color: "#6C5CE7",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ color: "#6B7280", fontSize: 14 }}>Verifying admin access...</p>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Access denied - user not logged in or not admin (based on custom claims)
  if (!user || !isAdmin) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8F9FA",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: "#FEE2E2",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <Shield size={40} color="#EF4444" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1E1E2F", marginBottom: 8 }}>
          Access Denied
        </h1>
        <p style={{ color: "#6B7280", marginBottom: 24, maxWidth: 400 }}>
          {!user
            ? "You need to be logged in as an admin to access this page."
            : "Your account does not have admin privileges. Contact the system administrator to request access."}
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          {!user ? (
            <Link
              href="/login"
              style={{
                padding: "12px 24px",
                background: "#6C5CE7",
                color: "#fff",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Log In
            </Link>
          ) : null}
          <Link
            href="/"
            style={{
              padding: "12px 24px",
              background: "#fff",
              color: "#1E1E2F",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14,
              border: "1px solid #E4E6F1",
            }}
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#F8F9FA" }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: 260,
          background: "#1E1E2F",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s ease-out",
          willChange: "transform",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              background: "#6C5CE7",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Shield size={22} color="#fff" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>RoboNest</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Admin Panel</div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
            style={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <X size={20} color="#fff" />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          {navItems.map((item) => {
            const active = isRouteActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 10,
                  marginBottom: 4,
                  background: active ? "#6C5CE7" : "transparent",
                  color: active ? "#fff" : "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  transition: "background 0.15s, color 0.15s",
                  position: "relative",
                }}
              >
                {active && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: 24,
                      background: "#fff",
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                )}
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div
          style={{
            padding: "16px 12px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#6C5CE7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {profile?.displayName || "Admin"}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 11,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                borderRadius: 6,
                flexShrink: 0,
              }}
              title="Logout"
            >
              <LogOut size={18} color="rgba(255,255,255,0.7)" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        id="admin-main-content"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <style jsx>{`
          #admin-main-content {
            margin-left: 0;
            width: 100%;
          }
          @media (min-width: 768px) {
            #admin-main-content {
              margin-left: 260px;
              width: calc(100% - 260px);
            }
          }
        `}</style>

        {/* Mobile Header */}
        <header
          className="flex md:hidden"
          style={{
            height: 60,
            background: "#fff",
            borderBottom: "1px solid #E4E6F1",
            alignItems: "center",
            padding: "0 16px",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Menu size={24} color="#1E1E2F" />
          </button>
          <div style={{ fontWeight: 600, color: "#1E1E2F" }}>Admin Panel</div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}
