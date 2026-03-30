"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/src/components/PageContainer";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Microcontrollers", href: "/products?category=Microcontrollers" },
    { label: "Sensors", href: "/products?category=Sensors" },
    { label: "Kits", href: "/products?category=Kits" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Info", href: "/shipping" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/robo.nest", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@robo-nest?si=pDRNY3q7nph2YGx-", label: "YouTube" },
];

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState(2024);

  useEffect(() => {
    setMounted(true);
    setYear(new Date().getFullYear());
  }, []);

  if (!mounted) return null;

  return (
    <footer
      style={{
        background: "#1E1E2F",
        color: "#fff",
        marginTop: 48,
      }}
    >
      <PageContainer as="div" style={{ paddingBlock: "48px" }}>
        <div
          className="hidden md:grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
          }}
        >
        {/* Brand Column */}
        <div>
          <Image
            src="/logo.png"
            alt="RoboNest"
            width={110}
            height={32}
            style={{ objectFit: "contain", marginBottom: 16 }}
          />
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              maxWidth: 280,
              marginBottom: 24,
            }}
          >
            Your one-stop shop for electronics and robotics components in Iraq.
            Empowering makers and engineers since 2020.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <MapPin size={16} style={{ color: "#6C5CE7" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
              Zakho, Iraq
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Phone size={16} style={{ color: "#6C5CE7" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
              +964 770 123 4567
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Mail size={16} style={{ color: "#6C5CE7" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
              hello@robonest.iq
            </span>
          </div>
        </div>

        {/* Shop Column */}
        <div>
          <h4
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Shop
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {footerLinks.shop.map((link) => (
              <li key={link.href} style={{ marginBottom: 12 }}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  className="hover:!text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Support
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {footerLinks.support.map((link) => (
              <li key={link.href} style={{ marginBottom: 12 }}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  className="hover:!text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Company
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {footerLinks.company.map((link) => (
              <li key={link.href} style={{ marginBottom: 12 }}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  className="hover:!text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                className="hover:!bg-primary"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      </PageContainer>

      {/* Mobile Footer */}
      <PageContainer as="div" style={{ paddingBlock: "32px" }}>
        <div
          className="flex flex-col md:hidden"
          style={{
            gap: 24,
          }}
        >
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Image
            src="/logo.png"
            alt="RoboNest"
            width={100}
            height={28}
            style={{ objectFit: "contain", margin: "0 auto 12px" }}
          />
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              maxWidth: 280,
              margin: "0 auto",
            }}
          >
            Your one-stop shop for electronics and robotics in Iraq.
          </p>
        </div>

        {/* Social Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              style={{
                width: 44,
                height: 44,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        {/* Pill Links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            marginBottom: 24,
          }}
        >
          {[...footerLinks.shop, ...footerLinks.support.slice(0, 2)].map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 999,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Contact */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span>+964 770 123 4567</span>
          <span>hello@robonest.iq</span>
        </div>
      </div>
      </PageContainer>

      {/* Copyright */}
      <PageContainer as="div" style={{ paddingBlock: "20px" }}>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 20,
            textAlign: "center",
          }}
        >
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          &copy; {year} RoboNest. All rights reserved.
        </p>
      </div>
      </PageContainer>
    </footer>
  );
}
