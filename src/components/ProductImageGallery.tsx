"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  emoji?: string;
  productName: string;
  isNew?: boolean;
  discount?: number;
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
}

export default function ProductImageGallery({
  images,
  emoji,
  productName,
  isNew,
  discount,
  isWishlisted = false,
  onWishlistToggle,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const hasValidImages = images.length > 0 && !images.every((_, i) => imageError[i]);
  const displayImages = hasValidImages ? images : [];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Main Image */}
      <div
        style={{
          background: "linear-gradient(135deg, #F0EFFE 0%, #E8E5FF 100%)",
          borderRadius: 24,
          position: "relative",
          aspectRatio: "1",
          overflow: "hidden",
        }}
      >
        {/* Image or Emoji fallback */}
        {displayImages.length > 0 && !imageError[selectedIndex] ? (
          <Image
            src={displayImages[selectedIndex]}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            fill
            style={{ objectFit: "contain", padding: 24 }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={selectedIndex === 0}
            onError={() => setImageError((prev) => ({ ...prev, [selectedIndex]: true }))}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "min(200px, 40vw)" }}>{emoji || "📦"}</span>
          </div>
        )}

        {/* Navigation Arrows - Only show if multiple images */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                width: 40,
                height: 40,
                background: "rgba(255,255,255,0.9)",
                border: "none",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                zIndex: 2,
              }}
            >
              <ChevronLeft size={20} style={{ color: "#1E1E2F" }} />
            </button>
            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                width: 40,
                height: 40,
                background: "rgba(255,255,255,0.9)",
                border: "none",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                zIndex: 2,
              }}
            >
              <ChevronRight size={20} style={{ color: "#1E1E2F" }} />
            </button>
          </>
        )}

        {/* Badges */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            zIndex: 2,
          }}
        >
          {isNew && (
            <span
              style={{
                padding: "6px 14px",
                background: "#F0EFFE",
                color: "#6C5CE7",
                fontSize: 12,
                fontWeight: 700,
                borderRadius: 999,
                textTransform: "uppercase",
              }}
            >
              NEW
            </span>
          )}
          {discount && discount > 0 && (
            <span
              style={{
                padding: "6px 14px",
                background: "#FEF2F2",
                color: "#EF4444",
                fontSize: 12,
                fontWeight: 700,
                borderRadius: 999,
              }}
            >
              -{discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {onWishlistToggle && (
          <button
            onClick={onWishlistToggle}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 48,
              height: 48,
              background: "#fff",
              border: "none",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              zIndex: 2,
            }}
          >
            <Heart
              size={24}
              style={{
                color: isWishlisted ? "#EF4444" : "#6B6B8A",
                fill: isWishlisted ? "#EF4444" : "transparent",
              }}
            />
          </button>
        )}

        {/* Image Counter */}
        {displayImages.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "6px 12px",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 999,
              zIndex: 2,
            }}
          >
            {selectedIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails - Only show if multiple images */}
      {displayImages.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            padding: "4px 0",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {displayImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              style={{
                flexShrink: 0,
                width: 72,
                height: 72,
                borderRadius: 12,
                overflow: "hidden",
                border: selectedIndex === index ? "2px solid #6C5CE7" : "2px solid transparent",
                background: "#F0EFFE",
                cursor: "pointer",
                padding: 0,
                position: "relative",
                opacity: imageError[index] ? 0.5 : 1,
              }}
            >
              {!imageError[index] ? (
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  style={{ objectFit: "contain", padding: 8 }}
                  sizes="72px"
                  onError={() => setImageError((prev) => ({ ...prev, [index]: true }))}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{emoji || "📦"}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
