"use client";

import { motion } from "framer-motion";

const brandColors = {
  bgLight: "#F8F9FF",
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  primaryLight: "#dbeafe",
  textDark: "#111827",
  textMuted: "#4b5563",
};

const intro = [
  "Electronics store",
  "Robotics lab",
  "Engineering service provider",
];

const whatWeDo = [
  {
    title: "Component Store",
    description: "Arduino, ESP boards, sensors, IoT modules, robotics kits",
  },
  {
    title: "Custom Robotics",
    description: "Custom robotics builds tailored to your project needs",
  },
  {
    title: "Engineering Services",
    description: "3D printing, CAD design, prototyping, product assembly",
  },
];

const whyRoboNest = [
  { title: "Cheapest items in the market", icon: "💰" },
  { title: "Wide range of services", icon: "🔧" },
  { title: "Not just reselling — real engineering", icon: "⚙️" },
  { title: "Supports beginners and advanced users", icon: "🎓" },
];

const targetUsers = ["Students", "Engineers", "Robotics builders"];

const mission =
  "Make robotics and electronics accessible and affordable while delivering professional engineering capability for every project.";

const vision =
  "Become a leading robotics brand and evolve into a future PCB manufacturing lab serving Iraq and the wider region.";

const team = [
  { name: "Yasser Elyas", role: "Founder" },
  { name: "Anas Hussien", role: "Founder" },
  { name: "Ayman Ramadhan", role: "Co-Founder" },
];

export default function App() {
  return (
    <div
      className="min-h-screen w-full font-sans"
      style={{ backgroundColor: brandColors.bgLight }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-[#f0f2ff] px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-4 inline-block rounded-full px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: brandColors.primaryLight,
                color: brandColors.primary,
              }}
            >
              🤖 About RoboNest
            </motion.div>

            <h1
              className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
              style={{ color: brandColors.textDark }}
            >
              Engineering Your{" "}
              <span style={{ color: brandColors.primary }}>
                Robotics Future
              </span>
            </h1>

            <p
              className="mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
              style={{ color: brandColors.textMuted }}
            >
              RoboNest combines an electronics component store, engineering lab,
              and full-service robotics builder for the Iraq market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Are */}
      <section className="bg-white px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="mb-8 text-center text-3xl font-bold md:text-4xl"
              style={{ color: brandColors.textDark }}
            >
              RoboNest is
            </h2>

Saaud, [01.04.2026 16:38]
<div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-6">
              {intro.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 rounded-xl border px-6 py-4 shadow-sm transition-shadow hover:shadow-md"
                  style={{
                    backgroundColor: brandColors.bgLight,
                    borderColor: brandColors.primaryLight,
                  }}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: brandColors.primary }}
                  />
                  <span
                    className="text-lg font-medium"
                    style={{ color: brandColors.textDark }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section
        className="px-6 py-16 lg:py-20"
        style={{ backgroundColor: brandColors.bgLight }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="mb-4 text-center text-3xl font-bold md:text-4xl"
              style={{ color: brandColors.textDark }}
            >
              What We Do
            </h2>

            <p
              className="mb-12 text-center text-lg"
              style={{ color: brandColors.textMuted }}
            >
              End-to-end solutions for your robotics and electronics projects
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {whatWeDo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: brandColors.primaryLight }}
                  >
                    <div
                      className="h-6 w-6 rounded-lg"
                      style={{ backgroundColor: brandColors.primary }}
                    />
                  </div>

                  <h3
                    className="mb-3 text-xl font-bold"
                    style={{ color: brandColors.textDark }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="leading-relaxed"
                    style={{ color: brandColors.textMuted }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why RoboNest */}
      <section className="bg-white px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="mb-4 text-center text-3xl font-bold md:text-4xl"
              style={{ color: brandColors.textDark }}
            >
              Why RoboNest
            </h2>

Saaud, [01.04.2026 16:38]
<p
              className="mb-12 text-center text-lg"
              style={{ color: brandColors.textMuted }}
            >
              What sets us apart from the competition
            </p>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {whyRoboNest.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 rounded-xl border p-6"
                  style={{
                    backgroundColor: brandColors.bgLight,
                    borderColor: brandColors.primaryLight,
                  }}
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <p
                      className="text-lg font-medium"
                      style={{ color: brandColors.textDark }}
                    >
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="px-6 py-16 text-white lg:py-20"
        style={{ backgroundColor: brandColors.primary }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div
              className="rounded-2xl border p-8"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(4px)",
                borderColor: "rgba(255,255,255,0.2)",
              }}
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
              <p className="text-lg leading-relaxed text-white/90">{mission}</p>
            </div>

            <div
              className="rounded-2xl border p-8"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(4px)",
                borderColor: "rgba(255,255,255,0.2)",
              }}
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
              <p className="text-lg leading-relaxed text-white/90">{vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-white px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="mb-4 text-3xl font-bold md:text-4xl"
              style={{ color: brandColors.textDark }}
            >
              Who We Serve
            </h2>

            <p
              className="mb-12 text-lg"
              style={{ color: brandColors.textMuted }}
            >
              Supporting the robotics community at every level
            </p>

Saaud, [01.04.2026 16:38]
<div className="flex flex-wrap justify-center gap-4">
              {targetUsers.map((user, index) => (
                <motion.div
                  key={user}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="cursor-default rounded-full border-2 px-8 py-4 text-lg font-semibold transition-all"
                  style={{
                    backgroundColor: brandColors.bgLight,
                    borderColor: brandColors.primaryLight,
                    color: brandColors.textDark,
                  }}
                >
                  {user}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section
        className="px-6 py-16 lg:py-20"
        style={{ backgroundColor: brandColors.bgLight }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="mb-4 text-center text-3xl font-bold md:text-4xl"
              style={{ color: brandColors.textDark }}
            >
              Meet Our Team
            </h2>

            <p
              className="mb-12 text-center text-lg"
              style={{ color: brandColors.textMuted }}
            >
              The engineers and innovators behind RoboNest
            </p>

            <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg transition-all hover:shadow-xl"
                >
                  <div
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${brandColors.primary}, #60a5fa)`,
                    }}
                  >
                    {member.name.charAt(0)}
                  </div>

                  <h3
                    className="mb-1 text-xl font-bold"
                    style={{ color: brandColors.textDark }}
                  >
                    {member.name}
                  </h3>

                  <p
                    className="font-medium"
                    style={{ color: brandColors.primary }}
                  >
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

Saaud, [01.04.2026 16:38]
{/* Location */}
      <section className="bg-white px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border-2 p-10 text-center md:p-12"
            style={{
              backgroundColor: brandColors.bgLight,
              borderColor: brandColors.primaryLight,
            }}
          >
            <div className="mb-4 text-5xl">📍</div>
            <h2
              className="mb-3 text-3xl font-bold"
              style={{ color: brandColors.textDark }}
            >
              Our Location
            </h2>
            <p
              className="mb-2 text-lg font-medium"
              style={{ color: brandColors.textDark }}
            >
              Currently serving Iraq
            </p>
            <p style={{ color: brandColors.textMuted }}>
              Future regional expansion planned
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="px-6 py-16 text-white lg:py-20"
        style={{
          background: `linear-gradient(135deg, ${brandColors.primary}, #60a5fa)`,
        }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Build Your Next Project?
            </h2>

            <p className="mb-10 text-lg leading-relaxed text-white/90 md:text-xl">
              Get in touch with our team for component sourcing, custom robotics
              builds, or engineering services.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-white px-10 py-4 text-lg font-bold shadow-lg transition-colors"
              style={{ color: brandColors.primary }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center"
        style={{ backgroundColor: "#111827", color: "#9ca3af" }}
      >
        <p>© 2026 RoboNest. All rights reserved.</p>
      </footer>
    </div>
  );
}
