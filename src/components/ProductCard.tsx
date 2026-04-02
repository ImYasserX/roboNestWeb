"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/src/data/products";
import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import {
  addToWishlist,
  isInWishlist as checkIsInWishlist,
  removeFromWishlist,
} from "@/lib/wishlist";
import { formatPrice } from "@/src/lib/currency";

const categoryEmoji: Record<string, string> = {
  Microcontrollers: "🤖",
  Sensors: "📡",
  Displays: "🖥️",
  Power: "⚡",
  Modules: "📦",
  Kits: "🧰",
  Cables: "🔌",
  Tools: "🔧",
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { addItem } = useCart();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      setIsWishlisted(false);
      return;
    }

    let active = true;

    const loadWishlistState = async () => {
      try {
        const exists = await checkIsInWishlist(user.uid, product.id);
        if (active) {
          setIsWishlisted(exists);
        }
      } catch {
        if (active) {
          setIsWishlisted(false);
        }
      }
    };

    loadWishlistState();

    return () => {
      active = false;
    };
  }, [product.id, user]);

  const handleWishlistClick = useCallback(async () => {
    if (!user?.uid) {
      router.push(`/login?redirect=/products/${product.id}`);
      return;
    }

    const nextState = !isWishlisted;
    setIsWishlisted(nextState);

    try {
      if (nextState) {
        await addToWishlist(user.uid, product.id);
      } else {
        await removeFromWishlist(user.uid, product.id);
      }
    } catch {
      setIsWishlisted(!nextState);
    }
  }, [isWishlisted, product.id, router, user]);

  const handleAddToCart = useCallback(() => {
    addItem(product);
  }, [addItem, product]);

  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  const productHref = `/products/${product.id}`;

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,30,47,0.08)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-[linear-gradient(135deg,#F8F9FF,#F0EFFE)]">
        <Link
          href={productHref}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 z-0"
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "contain", padding: 12 }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center text-[3rem]"
              role="img"
              aria-label={product.category}
            >
              {product.emoji || categoryEmoji[product.category] || "📦"}
            </span>
          )}
        </Link>

        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="rounded-full bg-[#F0EFFE] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#6C5CE7]">
              New
            </span>
          )}
          {product.discount && (
            <span className="rounded-full bg-[#FEF2F2] px-2 py-1 text-[9px] font-bold text-[#EF4444]">
              -{product.discount}%
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleWishlistClick}
          className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition hover:bg-[#F8F9FF]"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            style={{
              color: isWishlisted ? "#EF4444" : "#6B6B8A",
              fill: isWishlisted ? "#EF4444" : "transparent",
            }}
          />
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute inset-x-2 bottom-2 z-10 hidden items-center justify-center gap-2 rounded-full bg-[#6C5CE7] px-4 py-2 text-xs font-semibold text-white transition md:flex"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(10px)",
          }}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#6B6B8A]">
          {product.brand}
        </span>

        <h3 className="min-h-[2.6em] text-sm font-bold leading-[1.3] text-[#1E1E2F]">
          <Link
            href={productHref}
            className="line-clamp-2 transition-colors hover:text-[#6C5CE7]"
          >
            {product.name}
          </Link>
        </h3>

        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={10}
              style={{
                color: star <= Math.floor(product.rating) ? "#F59E0B" : "#E5E7EB",
                fill: star <= Math.floor(product.rating) ? "#F59E0B" : "transparent",
              }}
            />
          ))}
          <span className="ml-1 text-[10px] text-[#6B6B8A]">
            ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-1">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-extrabold text-[#6C5CE7]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-[#9CA3AF] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {savings > 0 && (
              <span className="block text-[10px] font-semibold text-[#10B981]">
                Save {formatPrice(savings)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6C5CE7] shadow-[0_2px_8px_rgba(108,92,231,0.3)] transition hover:brightness-105 md:hidden"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={16} color="#fff" />
          </button>
        </div>
      </div>
    </article>
  );
}
