"use client";

import React, { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { watchWishlistCount } from "@/lib/wishlist";
import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import PageContainer from "@/src/components/PageContainer";

const tap = (fn: () => void) => ({
  onTouchStart: (e: React.TouchEvent) => {
    e.preventDefault();
    fn();
  },
  onClick: fn,
});

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();
  const { totalItems } = useCart();

  const [wishlistCount, setWishlistCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const desktopSearchId = useId();
  const mobileSearchId = useId();
  const mobileMenuId = useId();
  const tabletMenuId = useId();
  const mobileSearchDialogId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (!user) {
      setWishlistCount(0);
      return;
    }

    return watchWishlistCount(user.uid, setWishlistCount);
  }, [mounted, user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/products?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (!mobileMenuOpen && !searchOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, searchOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

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
      <nav className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[#E4E6F1] bg-white/95 backdrop-blur-sm">
        <PageContainer className="h-full">
          <div className="flex h-full items-center justify-between gap-3 md:hidden">
            <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
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
                className="hidden sm:block text-base font-semibold"
                style={{ color: "#1E1E2F", letterSpacing: 0.2 }}
              >
                RoboNest
              </span>
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                {...tap(() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                })}
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#E4E6F1]"
                aria-label="Open search"
                aria-haspopup="dialog"
                aria-expanded={searchOpen}
                aria-controls={mobileSearchDialogId}
              >
                <Search size={22} style={{ color: "#1E1E2F" }} />
              </button>

              <Link
                href="/cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#E4E6F1]"
                aria-label="Cart"
              >
                <ShoppingCart size={22} style={{ color: "#1E1E2F" }} />
                {totalItems > 0 && (
                  <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#6C5CE7] px-1.5 text-[11px] text-white">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>

              <button
                {...tap(() => setMobileMenuOpen(!mobileMenuOpen))}
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#E4E6F1]"
                aria-label="Toggle menu"
                aria-haspopup="menu"
                aria-expanded={mobileMenuOpen}
                aria-controls={mobileMenuId}
              >
                {mobileMenuOpen ? (
                  <X size={24} style={{ color: "#1E1E2F" }} />
                ) : (
                  <Menu size={24} style={{ color: "#1E1E2F" }} />
                )}
              </button>
            </div>
          </div>

          <div className="hidden h-full md:grid md:grid-cols-[minmax(0,1fr)_minmax(320px,420px)_minmax(0,1fr)] md:items-center md:gap-4 lg:grid-cols-[minmax(220px,1fr)_minmax(340px,460px)_minmax(320px,1fr)] lg:gap-6">
            <div className="flex min-w-0 items-center justify-self-start">
              <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
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
                  className="text-base font-semibold"
                  style={{ color: "#1E1E2F", letterSpacing: 0.2 }}
                >
                  RoboNest
                </span>
              </Link>
            </div>

            <div className="min-w-0">
              <form onSubmit={handleSearch} className="w-full">
                <label htmlFor={desktopSearchId} className="sr-only">
                  Search products
                </label>
                <div className="flex h-11 items-center gap-2 rounded-full bg-[#F0EFFE] px-4">
                  <Search size={19} style={{ color: "#6B6B8A", flexShrink: 0 }} />
                  <input
                    id={desktopSearchId}
                    type="text"
                    placeholder="Search products..."
                    aria-label="Search products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full min-w-0 border-none bg-transparent text-sm text-[#1E1E2F] placeholder:text-[#6B6B8A] outline-none"
                  />
                </div>
              </form>
            </div>

            <div className="flex min-w-0 items-center justify-self-end">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="hidden items-center gap-5 lg:flex">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-[#1E1E2F] transition-opacity hover:opacity-75"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/wishlist"
                  className="relative hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#E4E6F1] lg:flex"
                  aria-label="Wishlist"
                >
                  <Heart size={22} style={{ color: "#1E1E2F" }} />
                  {wishlistCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#6C5CE7] px-1.5 text-[11px] text-white">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#E4E6F1]"
                  aria-label="Cart"
                >
                  <ShoppingCart size={22} style={{ color: "#1E1E2F" }} />
                  {totalItems > 0 && (
                    <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#6C5CE7] px-1.5 text-[11px] text-white">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </Link>

                <Link
                  href={user ? "/profile" : "/login"}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#E4E6F1]"
                  aria-label="Profile"
                >
                  <User size={22} style={{ color: "#1E1E2F" }} />
                </Link>

                <button
                  {...tap(() => setMobileMenuOpen(!mobileMenuOpen))}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#E4E6F1] md:flex lg:hidden"
                  aria-label="Toggle menu"
                  aria-haspopup="menu"
                  aria-expanded={mobileMenuOpen}
                  aria-controls={tabletMenuId}
                >
                  {mobileMenuOpen ? (
                    <X size={24} style={{ color: "#1E1E2F" }} />
                  ) : (
                    <Menu size={24} style={{ color: "#1E1E2F" }} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </PageContainer>

        {mobileMenuOpen && (
          <div
            id={mobileMenuId}
            className="absolute inset-x-0 top-full border-b border-[#E4E6F1] bg-white shadow-lg md:hidden"
            role="menu"
            aria-label="Mobile navigation"
          >
            <PageContainer>
              <div className="flex flex-col gap-2 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    {...tap(() => setMobileMenuOpen(false))}
                    className="rounded-xl bg-[#F8F9FF] px-4 py-3 text-base font-medium text-[#1E1E2F]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </PageContainer>
          </div>
        )}

        {mobileMenuOpen && (
          <div
            id={tabletMenuId}
            className="absolute inset-x-0 top-full hidden border-b border-[#E4E6F1] bg-white shadow-lg md:block lg:hidden"
            role="menu"
            aria-label="Tablet navigation"
          >
            <PageContainer>
              <div className="flex items-center gap-6 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    {...tap(() => setMobileMenuOpen(false))}
                    className="text-sm font-medium text-[#1E1E2F] transition-opacity hover:opacity-75"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#E4E6F1]"
                  aria-label="Wishlist"
                >
                  <Heart size={22} style={{ color: "#1E1E2F" }} />
                  {wishlistCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#6C5CE7] px-1.5 text-[11px] text-white">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
            </PageContainer>
          </div>
        )}
      </nav>

      {searchOpen && (
        <div
          id={mobileSearchDialogId}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-20"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          {...tap(() => setSearchOpen(false))}
        >
          <form
            onSubmit={handleSearch}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-2xl"
          >
            <label htmlFor={mobileSearchId} className="sr-only">
              Search products
            </label>
            <div className="flex h-12 items-center gap-3 rounded-full bg-[#F0EFFE] px-4">
              <Search size={20} style={{ color: "#6B6B8A" }} />
              <input
                id={mobileSearchId}
                autoFocus
                placeholder="Search products..."
                aria-label="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none bg-transparent text-base text-[#1E1E2F] placeholder:text-[#6B6B8A] outline-none"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
