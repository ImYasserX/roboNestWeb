"use client"

import { motion } from "framer-motion"
import { Bot, Cpu, Zap, Users, Wrench, MapPin, Code2, ArrowRight } from "lucide-react"
import Link from "next/link"
import Navbar from "@/src/components/Navbar"
import Footer from "@/src/components/Footer"
import PageContainer from "@/src/components/PageContainer"
import { Button } from "@/components/ui/button"

const coreServices = [
  {
    icon: Bot,
    title: "Electronics Components",
    description: "Arduino, ESP boards, sensors, IoT modules, and robotics kits curated for performance.",
  },
  {
    icon: Wrench,
    title: "Custom Robotics Builds",
    description: "Hands-on assembly and customization for your specific project requirements.",
  },
  {
    icon: Code2,
    title: "Engineering Services",
    description: "3D printing, CAD design, electronics prototyping, and product assembly.",
  },
  {
    icon: Zap,
    title: "Technical Support",
    description: "Direct support from engineers who understand your hardware challenges.",
  },
]

const differentiation = [
  "Highly competitive pricing on all components",
  "Engineering services bundled with products—not just reselling",
  "Support for both learning and advanced project development",
  "Quality-controlled, tested components",
  "Fast and reliable delivery within Iraq",
]

const founders = [
  {
    name: "Yasser Elyas",
    role: "Founder",
  },
  {
    name: "Anas Hussien",
    role: "Founder",
  },
  {
    name: "Ayman Ramadhan",
    role: "Co-Founder",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          paddingTop: 66,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "#F8F9FF",
        }}
      >
        {/* Hero Section */}
        <PageContainer as="section" className="py-16 bg-gradient-to-br from-[#F5F3FF] to-[#F0F0FF]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              About RoboNest
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Robotics and Electronics for{" "}
              <span className="text-primary">Builders</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-tight max-w-2xl mx-auto">
              We combine affordable components with real engineering capabilities. RoboNest is not a parts store—it's a platform built for students, engineers, and developers who need to design, prototype, and build.
            </p>
          </motion.div>
        </PageContainer>

        {/* What We Do Section */}
        <PageContainer as="section" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What We Do
            </h2>
            <p className="text-muted-foreground leading-tight mb-6">
              RoboNest operates as a unified platform combining three core competencies:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {coreServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-tight">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </PageContainer>

        {/* Why RoboNest Section */}
        <PageContainer as="section" className="py-16 bg-[#F5F3FF]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why RoboNest
            </h2>
            <p className="text-muted-foreground leading-tight mb-6">
              We differentiate ourselves through integrated services and a genuine focus on making advanced electronics and robotics accessible.
            </p>
          </motion.div>

          <ul className="space-y-4">
            {differentiation.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex gap-4 items-start"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground leading-tight">{item}</p>
              </motion.div>
            ))}
          </ul>
        </PageContainer>

        {/* Mission & Vision Section */}
        <PageContainer as="section" className="py-16">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <p className="text-foreground font-medium leading-tight">
                  To make robotics and electronics accessible by combining affordable components with real engineering capabilities.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <p className="text-foreground font-medium leading-tight">
                  To evolve into a leading robotics brand and a regional manufacturing hub for electronics and PCB production.
                </p>
              </div>
            </motion.div>
          </div>
        </PageContainer>

        {/* Target Users Section */}
        <PageContainer as="section" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Who We Serve
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Primary Audience
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Engineering students</li>
                    <li>• Robotics enthusiasts</li>
                    <li>• Developers working on hardware projects</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Secondary Audience
                  </h3>
                  <p className="text-muted-foreground text-sm leading-tight">
                    Anyone building or experimenting with electronics, from hobbyists to small businesses.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </PageContainer>

        {/* Commitment Section */}
        <PageContainer as="section" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-center">
              Our Commitment
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Quality Control", desc: "All components are tested and verified before shipping." },
              { title: "Reliable Support", desc: "Direct access to engineers who understand your challenges." },
              { title: "Fast Delivery", desc: "Efficient shipping within Iraq with reliable tracking." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-tight">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </PageContainer>

        {/* Founders Section */}
        <PageContainer as="section" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Founding Team
            </h2>
            <p className="text-muted-foreground leading-tight">
              RoboNest founded by professionals passionate about making engineering accessible.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-5 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {founder.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {founder.name}
                </h3>
                <p className="text-primary text-sm font-medium">
                  {founder.role}
                </p>
              </motion.div>
            ))}
          </div>
        </PageContainer>

        {/* Location Section */}
        <PageContainer as="section" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-sm text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Currently Operating in Iraq
              </h2>
            </div>
            <p className="text-muted-foreground leading-tight max-w-2xl mx-auto">
              We are actively serving the Iraqi market with plans to expand regionally and establish ourselves as a hub for robotics innovation and electronics manufacturing across the Middle East.
            </p>
          </motion.div>
        </PageContainer>

        {/* CTA Section */}
        <PageContainer as="section" style={{ paddingBlock: "64px", background: "#F5F3FF" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 lg:p-8 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Build Something?
            </h2>
            <p className="text-primary-foreground/90 mb-8 leading-tight max-w-2xl mx-auto">
              Explore our components, services, and engineering capabilities. Let's turn your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
                <Link href="/products">
                  Browse Components
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </motion.div>
        </PageContainer>

        <Footer />
      </main>
    </>
  )
}
