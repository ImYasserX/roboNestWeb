/*
  HOW TO ADD HERO IMAGES:
  1. Go to Firebase Console → Storage
  2. Create folder: hero/
  3. Upload images: hero/slide-1.jpg, hero/slide-2.jpg, hero/slide-3.jpg
  4. Copy each download URL
  5. Add imageUrl to the banners array in src/data/products.ts
  
  Recommended image size: 800x400px, WebP format for best performance
  If imageUrl is not set, the emoji will be shown as fallback
*/

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/src/components/PageContainer";
import { banners } from "@/src/data/products";

const tap = (fn: () => void) => ({
  onTouchStart: (e: React.TouchEvent) => {
    e.preventDefault();
    fn();
  },
  onClick: fn,
});

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const banner = banners[currentSlide];

  return (
    <section
      className="relative w-full min-h-[400px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            background: banner.gradient,
          }}
        />
      </AnimatePresence>

      {/* Purple scrim overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg,rgba(76,29,149,0.75) 0%,rgba(109,40,217,0.4) 55%,transparent 100%)",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 70% 50%,rgba(139,92,246,0.5),rgba(109,40,217,0.2) 50%,transparent 75%)",
        }}
      />

      {/* Content */}
      <div className="mx-auto w-full max-w-7xl rounded-2xl overflow-hidden">
        <PageContainer style={{ paddingBlock: "48px", minHeight: 400 }}>
          <div
            className="relative z-20 flex flex-col md:flex-row items-center justify-between gap-8 w-full"
            style={{
              minHeight: 400,
            }}
          >
          {/* Left Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ flex: 1, maxWidth: 600 }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 16px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 16,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {banner.tag}
              </span>

              <h1
                style={{
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                {banner.title}
              </h1>

              <h2
                style={{
                  fontSize: "clamp(20px, 3vw, 32px)",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                {banner.subtitle}
              </h2>

              <p
                style={{
                  fontSize: "clamp(14px, 2vw, 16px)",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: 24,
                  maxWidth: 400,
                  lineHeight: 1.6,
                }}
              >
                {banner.description}
              </p>

              <Link
                href="/products"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  background: "#fff",
                  color: "#6C5CE7",
                  fontSize: 16,
                  fontWeight: 700,
                  borderRadius: 999,
                  textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(108,92,231,0.18)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                {banner.cta}
                <ChevronRight size={20} />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Right Image/Emoji - Hidden on mobile */}
          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="hidden md:flex items-center justify-center"
              style={{
                flex: "0 0 auto",
                width: "40%",
                position: "relative",
                height: "100%",
                minHeight: 200,
              }}
            >
              {banner.imageUrl ? (
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  priority
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 0vw, 40vw"
                />
              ) : (
                <span
                  style={{
                    fontSize: "clamp(80px, 15vw, 160px)",
                    lineHeight: 1,
                    userSelect: "none",
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))",
                  }}
                >
                  {banner.emoji}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </PageContainer>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        {...tap(prevSlide)}
        className="hidden md:flex items-center justify-center"
        style={{
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: 48,
          height: 48,
          background: "rgba(255,255,255,0.2)",
          border: "none",
          borderRadius: 999,
          cursor: "pointer",
          transition: "background 0.2s",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <ChevronLeft size={24} color="#fff" />
      </button>

      <button
        {...tap(nextSlide)}
        className="hidden md:flex items-center justify-center"
        style={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: 48,
          height: 48,
          background: "rgba(255,255,255,0.2)",
          border: "none",
          borderRadius: 999,
          cursor: "pointer",
          transition: "background 0.2s",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <ChevronRight size={24} color="#fff" />
      </button>

      {/* Dot Indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          gap: 8,
        }}
      >
        {banners.map((_, index) => (
          <button
            key={index}
            {...tap(() => setCurrentSlide(index))}
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: index === currentSlide ? "#fff" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          />
        ))}
      </div>
    </section>
  );
}
