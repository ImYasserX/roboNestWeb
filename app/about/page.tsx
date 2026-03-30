"use client"

import { motion } from "framer-motion"
import { Bot, Cpu, Zap, Users, Target, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Navbar from "@/src/components/Navbar"
import Footer from "@/src/components/Footer"
import { Button } from "@/components/ui/button"

const stats = [
  { label: "Products Sold", value: "50K+" },
  { label: "Happy Customers", value: "25K+" },
  { label: "Countries Served", value: "45+" },
  { label: "Team Members", value: "100+" },
]

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description: "We constantly push the boundaries of what's possible in robotics and electronics.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "Every decision we make starts with how it will benefit our customers.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "We only stock products that meet our rigorous quality standards.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Quick shipping and reliable support when you need it most.",
  },
]

const team = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former robotics engineer with a passion for making technology accessible.",
  },
  {
    name: "Sarah Miller",
    role: "Head of Product",
    bio: "10+ years curating the best electronics and robotics products.",
  },
  {
    name: "James Wilson",
    role: "Tech Lead",
    bio: "Building the future of e-commerce with cutting-edge technology.",
  },
  {
    name: "Emily Rodriguez",
    role: "Customer Success",
    bio: "Ensuring every customer has an amazing experience with RoboNest.",
  },
]

const timeline = [
  { year: "2018", event: "RoboNest founded in a small garage" },
  { year: "2019", event: "Launched online store with 100 products" },
  { year: "2020", event: "Expanded to international shipping" },
  { year: "2021", event: "Reached 10,000 customers milestone" },
  { year: "2022", event: "Opened first physical showroom" },
  { year: "2023", event: "Launched AI-powered product recommendations" },
  { year: "2024", event: "Expanded product catalog to 5,000+ items" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Building the Future of{" "}
              <span className="text-primary">Robotics</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              RoboNest started with a simple mission: make cutting-edge robotics and electronics 
              accessible to everyone. From hobbyists to professionals, we&apos;re here to fuel your 
              passion for innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At RoboNest, we believe that robotics and electronics are the building blocks of 
                tomorrow. Our mission is to democratize access to these technologies, providing 
                enthusiasts, educators, and professionals with the tools they need to innovate.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We carefully curate our product selection, partnering with leading manufacturers 
                and emerging innovators to bring you the best in robotics, microcontrollers, 
                sensors, and more.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="bg-background rounded-2xl p-6 shadow-lg flex flex-col items-center gap-3">
                    <Bot className="w-12 h-12 text-primary" />
                    <span className="font-medium text-foreground">Robotics</span>
                  </div>
                  <div className="bg-background rounded-2xl p-6 shadow-lg flex flex-col items-center gap-3">
                    <Cpu className="w-12 h-12 text-primary" />
                    <span className="font-medium text-foreground">Electronics</span>
                  </div>
                  <div className="bg-background rounded-2xl p-6 shadow-lg flex flex-col items-center gap-3">
                    <Zap className="w-12 h-12 text-primary" />
                    <span className="font-medium text-foreground">Innovation</span>
                  </div>
                  <div className="bg-background rounded-2xl p-6 shadow-lg flex flex-col items-center gap-3">
                    <Users className="w-12 h-12 text-primary" />
                    <span className="font-medium text-foreground">Community</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at RoboNest.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a small garage to a global robotics destination.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pt-4">
                  <p className="text-foreground font-medium">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet the Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind RoboNest.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-2xl p-6 shadow-sm border border-border text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 lg:p-16 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Join thousands of innovators who trust RoboNest for their robotics and electronics needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
