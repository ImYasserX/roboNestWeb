import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/src/context/AuthContext";
import { CartProvider } from "@/src/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoboNest | Electronics & Robotics Store",
  description:
    "Your one-stop shop for Arduinos, ESP32s, sensors, displays, modules, kits, cables, and tools for makers and engineers in Iraq.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#6C5CE7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased"
        suppressHydrationWarning
      >
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
