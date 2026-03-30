"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import { watchWishlistCount } from "@/lib/wishlist";

const tap = (fn: () => void) => ({
  onTouchStart: (e: React.TouchEvent) => {
    e.preventDefault();
    fn();
  },
  onClick: fn,
});

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();
  const { totalItems } = useCart();

  const [wishlistCount, setWishlistCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (!user) {
      setWishlistCount(0);
      return;
    }

    return watchWishlistCount(user.uid, setWishlistCount);
  }, [user, mounted]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  if (!mounted) {
    return (
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 66,
          background: "rgba(255,255,255,0.98)",
          borderBottom: "1px solid #E4E6F1",
        }}
      />
    );
  }

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 66,
          zIndex: 50,
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E4E6F1",
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            gap: 16,
          }}
        >
          {/* === LEFT: Logo === */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo.png"
              alt="RoboNest"
              width={60}
              height={36}
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
              }}
              priority
            />
            <span
              className="hidden sm:block"
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1E1E2F",
                letterSpacing: 0.2,
              }}
            >
              RoboNest
            </span>
          </Link>

          {/* === CENTER: Search Bar (Desktop only) === */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 justify-center"
            style={{
              maxWidth: 400,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: 44,
                background: "#F0EFFE",
                borderRadius: 999,
                padding: "0 16px",
                gap: 8,
              }}
            >
              <Search size={20} style={{ color: "#6B6B8A", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: 14,
                  minWidth: 0,
                }}
              />
            </div>
          </form>

          {/* === RIGHT: Nav Links + Icons === */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            {/* Desktop Nav Links */}
            <div
              className="hidden lg:flex"
              style={{
                alignItems: "center",
                gap: 16,
                marginRight: 8,
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#1E1E2F",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Search Icon */}
            <button
              {...tap(() => setSearchOpen(true))}
              className="flex md:hidden items-center justify-center"
              style={{
                width: 40,
                height: 40,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                borderRadius: 999,
              }}
            >
              <Search size={22} style={{ color: "#1E1E2F" }} />
            </button>

            {/* Wishlist (desktop only) */}
            <Link
              href="/wishlist"
              className="hidden md:flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                position: "relative",
              }}
            >
              <Heart size={22} style={{ color: "#1E1E2F" }} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    minWidth: 18,
                    height: 18,
                    background: "#6C5CE7",
                    color: "#fff",
                    fontSize: 11,
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 5px",
                  }}
                >
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <ShoppingCart size={22} style={{ color: "#1E1E2F" }} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    minWidth: 18,
                    height: 18,
                    background: "#6C5CE7",
                    color: "#fff",
                    fontSize: 11,
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 5px",
                  }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link
              href={user ? "/profile" : "/login"}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={22} style={{ color: "#1E1E2F" }} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              {...tap(() => setMobileMenuOpen(!mobileMenuOpen))}
              className="flex lg:hidden items-center justify-center"
              style={{
                width: 40,
                height: 40,
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              {mobileMenuOpen ? (
                <X size={24} style={{ color: "#1E1E2F" }} />
              ) : (
                <Menu size={24} style={{ color: "#1E1E2F" }} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div
            className="flex lg:hidden flex-col"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              borderBottom: "1px solid #E4E6F1",
              padding: 16,
              gap: 8,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...tap(() => setMobileMenuOpen(false))}
                style={{
                  padding: "12px 16px",
                  background: "#F8F9FF",
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1E1E2F",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* MOBILE SEARCH MODAL */}
      {searchOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 80,
          }}
          {...tap(() => setSearchOpen(false))}
        >
          <form
            onSubmit={handleSearch}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "calc(100% - 32px)",
              maxWidth: 400,
              background: "#fff",
              borderRadius: 20,
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#F0EFFE",
                borderRadius: 999,
                padding: "0 16px",
                height: 48,
              }}
            >
              <Search size={20} style={{ color: "#6B6B8A" }} />
              <input
                autoFocus
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 16,
                }}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
