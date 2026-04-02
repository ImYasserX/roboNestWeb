"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import Navbar from "@/src/components/Navbar"
import Footer from "@/src/components/Footer"
import PageContainer from "@/src/components/PageContainer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/lib/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "robo.nestt@gmail.com",
    href: "mailto:robo.nestt@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+9647503958385",
    href: "tel:+9647503958385",
  },
  { icon: MapPin, label: "Location", value: "Zakho", href: null },
  { icon: Clock, label: "Working Hours", value: "9 AM - 9 PM", href: null },
]

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
}

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
      setErrorMessage("Failed to send message. Please try again.")
      setStatus("error")
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 66, minHeight: "100vh", background: "#FBFCFF" }}>
        <section className="w-full py-16 md:py-20 lg:py-24">
          <PageContainer>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <MessageCircle className="h-4 w-4" />
                Contact RoboNest
              </div>
              <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
                Let&apos;s Build Something Great
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Use the form to send your message, or choose one of our direct
                contact channels. We are available every day from 9 AM to 9 PM
                in Zakho.
              </p>
            </motion.div>
          </PageContainer>
        </section>

        <section className="w-full pb-16 md:pb-20 lg:pb-24">
          <PageContainer>
            <motion.div
              {...reveal}
              transition={{ duration: 0.45 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Contact Methods
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Pick the channel that works best for your request.
              </p>
            </motion.div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 xl:auto-rows-fr xl:grid-cols-4">
              {contactMethods.map((item, index) => {
                const Icon = item.icon
                const content = (
                  <motion.div
                    {...reveal}
                    transition={{ delay: index * 0.07, duration: 0.4 }}
                    className="flex h-full min-h-[168px] flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    <p className="text-base font-semibold leading-relaxed text-foreground">
                      {item.value}
                    </p>
                  </motion.div>
                )

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>
          </PageContainer>
        </section>

        <section className="w-full border-y border-border bg-white py-20 md:py-24 lg:py-28">
          <PageContainer>
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                {...reveal}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-border bg-white p-6 sm:p-8"
              >
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Send a Message
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Share your project details and we will get back to you soon.
                </p>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-emerald-800"
                  >
                    Message sent successfully. We&apos;ll get back to you soon.
                  </motion.div>
                )}

                {status === "error" && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 rounded-lg border border-rose-300 bg-rose-50 px-4 py-3 text-rose-800"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="space-y-3">
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

                  <div className="space-y-3">
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

                  <div className="space-y-3">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      required
                      className="min-h-[150px] resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </motion.div>

              <motion.aside
                {...reveal}
                transition={{ delay: 0.1, duration: 0.45 }}
                className="rounded-2xl border border-border bg-[#F8FAFF] p-6 sm:p-8"
              >
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Quick Contact
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  For urgent inquiries, start with WhatsApp for the fastest
                  response.
                </p>

                <div className="mt-8 space-y-4">
                  <a
                    href="https://wa.me/9647503958385"
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-emerald-200 bg-emerald-50 p-4 transition hover:-translate-y-0.5"
                  >
                    <p className="mb-1 font-semibold text-emerald-900">WhatsApp (Primary)</p>
                    <p className="text-sm text-emerald-800">+9647503958385</p>
                    <p className="mt-2 text-xs text-emerald-700">Best for fast responses</p>
                  </a>
                  <a
                    href="tel:+9647503958385"
                    className="block rounded-xl border border-border bg-white p-4 transition hover:-translate-y-0.5"
                  >
                    <p className="mb-1 font-semibold text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">+9647503958385</p>
                    <p className="text-sm text-muted-foreground">+9647503866153</p>
                  </a>
                  <a
                    href="mailto:robo.nestt@gmail.com"
                    className="block rounded-xl border border-border bg-white p-4 transition hover:-translate-y-0.5"
                  >
                    <p className="mb-1 font-semibold text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">robo.nestt@gmail.com</p>
                  </a>
                  <div className="rounded-xl border border-border bg-white p-4">
                    <p className="mb-1 font-semibold text-foreground">Hours</p>
                    <p className="text-sm text-muted-foreground">9 AM - 9 PM daily</p>
                  </div>
                </div>
              </motion.aside>
            </div>
          </PageContainer>
        </section>

        <Footer />
      </main>
    </>
  )
}
