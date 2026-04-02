"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeDollarSign,
  Bot,
  Briefcase,
  CircuitBoard,
  Cpu,
  GraduationCap,
  MapPin,
  Rocket,
  Settings2,
  Target,
  Wrench,
} from "lucide-react";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import PageContainer from "@/src/components/PageContainer";

const brandColors = {
  bgLight: "#F8F9FF",
  primary: "#6C5CE7",
  primaryHover: "#5B4BD6",
  primaryLight: "#F0EFFE",
  surface: "#FFFFFF",
  textDark: "#1E1E2F",
  textMuted: "#6B6B8A",
  border: "#E4E6F1",
};

const intro = [
  "Electronics store",
  "Robotics lab",
  "Engineering service provider",
];

const whatWeDo: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Component Store",
    description: "Arduino, ESP boards, sensors, IoT modules, robotics kits.",
    icon: Cpu,
  },
  {
    title: "Custom Robotics",
    description: "Custom robotics builds tailored to your project needs.",
    icon: Bot,
  },
  {
    title: "Engineering Services",
    description: "3D printing, CAD design, prototyping, and product assembly.",
    icon: Wrench,
  },
];

const whyRoboNest: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Affordable sourcing",
    description: "Competitive pricing on the core components people actually need.",
    icon: BadgeDollarSign,
  },
  {
    title: "Hands-on engineering",
    description: "We do more than resell parts. We build, test, and solve.",
    icon: Settings2,
  },
  {
    title: "Wide service range",
    description: "From quick component orders to full prototype support.",
    icon: CircuitBoard,
  },
  {
    title: "Built for every level",
    description: "Helpful for beginners and capable enough for advanced teams.",
    icon: GraduationCap,
  },
];

const targetUsers: {
  label: string;
  icon: LucideIcon;
}[] = [
  { label: "Students", icon: GraduationCap },
  { label: "Engineers", icon: Briefcase },
  { label: "Robotics builders", icon: Bot },
];

const mission =
  "Make robotics and electronics accessible and affordable while delivering professional engineering capability for every project.";

const vision =
  "Become a leading robotics brand and evolve into a future PCB manufacturing lab serving Iraq and the wider region.";

const team = [
  { name: "Yasser Elyas", role: "Founder" },
  { name: "Anas Hussien", role: "Founder" },
  { name: "Ayman Ramadhan", role: "Co-Founder" },
];

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
};

const milestoneCards = [
  { title: "Our Mission", body: mission, icon: Target },
  { title: "Our Vision", body: vision, icon: Rocket },
];

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      {...reveal}
      transition={{ duration: 0.45 }}
      className="mx-auto max-w-3xl text-center"
    >
      <h2
        className="text-3xl font-bold md:text-4xl"
        style={{ color: brandColors.textDark }}
      >
        {title}
      </h2>
      <p
        className="mt-4 text-base leading-relaxed md:text-lg"
        style={{ color: brandColors.textMuted }}
      >
        {subtitle}
      </p>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: 66,
          minHeight: "100vh",
          background: brandColors.bgLight,
        }}
      >
        <div className="flex flex-col gap-14 pb-20 pt-10 lg:gap-20 lg:pb-24 lg:pt-12">
          <PageContainer as="section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="overflow-hidden rounded-[32px] border px-6 py-12 text-center shadow-[0_16px_48px_-36px_rgba(108,92,231,0.35)] sm:px-8 lg:px-12 lg:py-16"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,239,254,0.8) 100%)",
                borderColor: brandColors.border,
              }}
            >
              <div className="mx-auto max-w-3xl">
                <div
                  className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
                  style={{
                    backgroundColor: brandColors.primaryLight,
                    color: brandColors.primary,
                  }}
                >
                  About RoboNest
                </div>

                <h1
                  className="mt-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
                  style={{ color: brandColors.textDark }}
                >
                  Engineering Your{" "}
                  <span style={{ color: brandColors.primary }}>
                    Robotics Future
                  </span>
                </h1>

                <p
                  className="mx-auto mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
                  style={{ color: brandColors.textMuted }}
                >
                  RoboNest combines an electronics component store, engineering
                  lab, and full-service robotics builder for the Iraq market.
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {intro.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + index * 0.08, duration: 0.35 }}
                    className="flex items-center justify-center gap-3 rounded-2xl border bg-white px-5 py-4 text-center"
                    style={{ borderColor: brandColors.border }}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: brandColors.primary }}
                    />
                    <span
                      className="text-base font-semibold"
                      style={{ color: brandColors.textDark }}
                    >
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </PageContainer>

          <PageContainer as="section">
            <div
              className="rounded-[32px] border px-6 py-10 sm:px-8 lg:px-10 lg:py-12"
              style={{
                backgroundColor: brandColors.surface,
                borderColor: brandColors.border,
              }}
            >
              <SectionTitle
                title="What We Do"
                subtitle="End-to-end support for robotics and electronics projects, from sourcing to prototyping."
              />

              <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-3">
                {whatWeDo.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      {...reveal}
                      transition={{ delay: index * 0.1, duration: 0.45 }}
                      className="flex h-full flex-col rounded-3xl border p-8"
                      style={{
                        backgroundColor: brandColors.bgLight,
                        borderColor: brandColors.border,
                      }}
                    >
                      <div
                        className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: brandColors.primaryLight }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: brandColors.primary }}
                        />
                      </div>

                      <h3
                        className="text-xl font-bold"
                        style={{ color: brandColors.textDark }}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="mt-3 text-base leading-relaxed"
                        style={{ color: brandColors.textMuted }}
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </PageContainer>

          <PageContainer as="section">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div
                {...reveal}
                transition={{ duration: 0.45 }}
                className="rounded-[32px] border p-8 lg:p-10"
                style={{
                  backgroundColor: brandColors.surface,
                  borderColor: brandColors.border,
                }}
              >
                <h2
                  className="text-3xl font-bold md:text-4xl"
                  style={{ color: brandColors.textDark }}
                >
                  Why RoboNest
                </h2>
                <p
                  className="mt-5 text-base leading-relaxed md:text-lg"
                  style={{ color: brandColors.textMuted }}
                >
                  We are built around practical engineering support, not just
                  storefront convenience.
                </p>
              </motion.div>

              <div className="grid gap-5 md:auto-rows-fr md:grid-cols-2">
                {whyRoboNest.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      {...reveal}
                      transition={{ delay: index * 0.08, duration: 0.45 }}
                      className="flex h-full flex-col rounded-3xl border p-6"
                      style={{
                        backgroundColor: brandColors.surface,
                        borderColor: brandColors.border,
                      }}
                    >
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: brandColors.primaryLight }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: brandColors.primary }}
                        />
                      </div>

                      <p
                        className="text-lg font-semibold"
                        style={{ color: brandColors.textDark }}
                      >
                        {item.title}
                      </p>

                      <p
                        className="mt-2 text-base leading-relaxed"
                        style={{ color: brandColors.textMuted }}
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </PageContainer>

          <PageContainer as="section">
            <div className="grid gap-6 lg:grid-cols-2">
              {milestoneCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    {...reveal}
                    transition={{ delay: index * 0.1, duration: 0.45 }}
                    className="rounded-[32px] border p-8 lg:p-10"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(240,239,254,0.88) 100%)",
                      borderColor: brandColors.border,
                    }}
                  >
                    <div
                      className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: brandColors.primaryLight }}
                    >
                      <Icon
                        className="h-7 w-7"
                        style={{ color: brandColors.primary }}
                      />
                    </div>

                    <h3
                      className="text-2xl font-bold"
                      style={{ color: brandColors.textDark }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="mt-4 text-base leading-relaxed md:text-lg"
                      style={{ color: brandColors.textMuted }}
                    >
                      {item.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </PageContainer>

          <PageContainer as="section">
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <motion.div
                {...reveal}
                transition={{ duration: 0.45 }}
                className="flex h-full flex-col rounded-[32px] border p-8 lg:p-10"
                style={{
                  backgroundColor: brandColors.surface,
                  borderColor: brandColors.border,
                }}
              >
                <h2
                  className="text-3xl font-bold md:text-4xl"
                  style={{ color: brandColors.textDark }}
                >
                  Who We Serve
                </h2>

                <p
                  className="mt-4 text-base leading-relaxed md:text-lg"
                  style={{ color: brandColors.textMuted }}
                >
                  Supporting the robotics community at every level, from first
                  experiments to professional product work.
                </p>

                <div className="mt-8 grid gap-4">
                  {targetUsers.map((user, index) => {
                    const Icon = user.icon;

                    return (
                      <motion.div
                        key={user.label}
                        {...reveal}
                        transition={{ delay: index * 0.08, duration: 0.4 }}
                        className="flex items-center gap-4 rounded-2xl border px-5 py-4"
                        style={{
                          backgroundColor: brandColors.bgLight,
                          borderColor: brandColors.border,
                        }}
                      >
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{ backgroundColor: brandColors.primaryLight }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: brandColors.primary }}
                          />
                        </div>
                        <span
                          className="text-lg font-semibold"
                          style={{ color: brandColors.textDark }}
                        >
                          {user.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                {...reveal}
                transition={{ delay: 0.1, duration: 0.45 }}
                className="flex h-full flex-col justify-between rounded-[32px] border p-8 lg:p-10"
                style={{
                  backgroundColor: brandColors.surface,
                  borderColor: brandColors.border,
                }}
              >
                <div>
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: brandColors.primaryLight }}
                  >
                    <MapPin
                      className="h-6 w-6"
                      style={{ color: brandColors.primary }}
                    />
                  </div>

                  <h2
                    className="text-3xl font-bold md:text-4xl"
                    style={{ color: brandColors.textDark }}
                  >
                    Our Location
                  </h2>

                  <p
                    className="mt-4 text-lg font-semibold"
                    style={{ color: brandColors.textDark }}
                  >
                    Currently serving Iraq
                  </p>

                  <p
                    className="mt-3 max-w-xl text-base leading-relaxed md:text-lg"
                    style={{ color: brandColors.textMuted }}
                  >
                    We are building from Iraq today, with plans to expand our
                    engineering reach across the wider region.
                  </p>
                </div>

                <div
                  className="mt-8 rounded-2xl px-5 py-4"
                  style={{ backgroundColor: brandColors.primaryLight }}
                >
                  <p
                    className="text-sm font-semibold uppercase tracking-[0.16em]"
                    style={{ color: brandColors.primaryHover }}
                  >
                    Next step
                  </p>

                  <p
                    className="mt-2 text-base leading-relaxed"
                    style={{ color: brandColors.textMuted }}
                  >
                    Growing into a regional robotics and PCB manufacturing
                    operation.
                  </p>
                </div>
              </motion.div>
            </div>
          </PageContainer>

          <PageContainer as="section">
            <div
              className="rounded-[32px] border px-6 py-10 sm:px-8 lg:px-10 lg:py-12"
              style={{
                backgroundColor: brandColors.surface,
                borderColor: brandColors.border,
              }}
            >
              <SectionTitle
                title="Meet Our Team"
                subtitle="The engineers and builders behind RoboNest."
              />

              <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    {...reveal}
                    transition={{ delay: index * 0.1, duration: 0.45 }}
                    className="rounded-3xl border p-8 text-center"
                    style={{
                      backgroundColor: brandColors.bgLight,
                      borderColor: brandColors.border,
                    }}
                  >
                    <div
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.primaryHover})`,
                      }}
                    >
                      {member.name.charAt(0)}
                    </div>

                    <h3
                      className="mt-5 text-xl font-bold"
                      style={{ color: brandColors.textDark }}
                    >
                      {member.name}
                    </h3>

                    <p
                      className="mt-1 font-semibold"
                      style={{ color: brandColors.primary }}
                    >
                      {member.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </PageContainer>

          <PageContainer as="section">
            <motion.div
              {...reveal}
              transition={{ duration: 0.45 }}
              className="mx-auto max-w-5xl rounded-[32px] border px-8 py-12 text-center md:px-12"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(240,239,254,0.88) 100%)",
                borderColor: brandColors.border,
              }}
            >
              <h2
                className="text-3xl font-bold md:text-4xl"
                style={{ color: brandColors.textDark }}
              >
                Ready to Build Your Next Project?
              </h2>

              <p
                className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg"
                style={{ color: brandColors.textMuted }}
              >
                Talk to our team about component sourcing, custom robotics
                builds, or engineering services.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5 md:text-lg"
                style={{
                  backgroundColor: brandColors.primary,
                }}
              >
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </PageContainer>
        </div>
      </main>
      <Footer />
    </>
  );
}
