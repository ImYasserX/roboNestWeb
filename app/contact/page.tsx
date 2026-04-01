"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react"
import Navbar from "@/src/components/Navbar"
import Footer from "@/src/components/Footer"
import PageContainer from "@/src/components/PageContainer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const contactMethods = [
  { icon: Mail, label: "Email", value: "robo.nestt@gmail.com", href: "mailto:robo.nestt@gmail.com" },
  { icon: Phone, label: "Phone", value: "+9647503958385", href: "tel:+9647503958385" },
  { icon: MapPin, label: "Location", value: "Zakho", href: null },
  { icon: Clock, label: "Working Hours", value: "9 AM – 9 PM", href: null },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all fields.")
      setStatus("error")
      return
    }

    setStatus("submitting")
    setErrorMessage("")

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
      })
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch (error) {
      console.error(error)
      setErrorMessage("Failed to send message. Please try again.")
      setStatus("error")
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 66, minHeight: "100vh", background: "#FBFCFF" }}>
        {/* Hero Section */}
        <section className="w-full py-16 lg:py-20">
          <PageContainer>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Contact RoboNest</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Use this form to send a message, or choose one of the direct contact methods below. We're available 9 AM – 9 PM in Zakho.
              </p>
            </motion.div>
          </PageContainer>
        </section>

        {/* Contact Methods Section */}
        <section className="w-full py-16 lg:py-20">
          <PageContainer>
            <h2 className="text-3xl font-bold text-foreground mb-6">Contact Methods</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((item) => {
                const Icon = item.icon
                const content = (
                  <div className="border border-border rounded-xl p-6 h-full flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground leading-relaxed">{item.value}</p>
                  </div>
                )

                return item.href ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="block hover:shadow-md transition-shadow">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>
          </PageContainer>
        </section>

        {/* Form & Priority Section */}
        <section className="w-full py-16 lg:py-20 bg-white border-t border-b border-border">
          <PageContainer>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Send a Message</h2>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border border-emerald-300 bg-emerald-50 text-emerald-800 rounded-lg px-4 py-3 mb-4"
                  >
                    Message sent successfully. We'll get back to you soon.
                  </motion.div>
                )}

                {status === "error" && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border border-rose-300 bg-rose-50 text-rose-800 rounded-lg px-4 py-3 mb-4"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      required
                      className="min-h-[140px] resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Quick Contact</h2>
                <div className="space-y-3 flex flex-col h-fit">
                  <div className="border border-border rounded-lg p-4 bg-emerald-50/50">
                    <p className="font-semibold text-emerald-900 mb-1">WhatsApp (Primary)</p>
                    <p className="text-emerald-800 text-sm">+9647503958385</p>
                    <p className="text-emerald-700 text-xs mt-2">Best for fast responses</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-foreground mb-1">Phone</p>
                    <p className="text-muted-foreground text-sm">+9647503958385</p>
                    <p className="text-muted-foreground text-sm">+9647503866153</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-foreground mb-1">Email</p>
                    <p className="text-muted-foreground text-sm">robo.nestt@gmail.com</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-foreground mb-1">Hours</p>
                    <p className="text-muted-foreground text-sm">9 AM – 9 PM daily</p>
                  </div>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        <Footer />
      </main>
    </>
  )
}
