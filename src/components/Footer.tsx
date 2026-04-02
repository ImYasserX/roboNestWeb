import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/src/components/PageContainer";
import {
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

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
  {
    icon: Instagram,
    href: "https://instagram.com/robo.nest",
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@robo-nest?si=pDRNY3q7nph2YGx-",
    label: "YouTube",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/9647503958385",
    label: "WhatsApp",
  },
];

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      style={{
        background: "#1E1E2F",
        color: "#fff",
        marginTop: 48,
      }}
    >
      <PageContainer as="div" className="py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Image
              src="/logo.png"
              alt="RoboNest"
              width={110}
              height={32}
              style={{ objectFit: "contain", marginBottom: 16 }}
            />
            <p className="mb-6 max-w-[280px] text-sm leading-6 text-white/70">
              Your one-stop shop for electronics and robotics components in Iraq.
              Empowering makers and engineers since 2020.
            </p>

            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MapPin size={16} style={{ color: "#6C5CE7" }} />
                <span>Zakho, Iraq</span>
              </div>
              <a
                href="tel:+9647701234567"
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Phone size={16} style={{ color: "#6C5CE7" }} />
                <span>+964 770 123 4567</span>
              </a>
              <a
                href="mailto:hello@robonest.iq"
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Mail size={16} style={{ color: "#6C5CE7" }} />
                <span>hello@robonest.iq</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.08em] text-white">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.08em] text-white">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.08em] text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>

      <PageContainer as="div" className="pb-5">
        <div className="border-t border-white/10 pt-5 text-center">
          <p className="text-xs text-white/50">
            &copy; {year} RoboNest. All rights reserved.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
