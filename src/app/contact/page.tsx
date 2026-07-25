"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MapPin, Phone, Mail, Clock, Send, MessageSquare,
  Globe, Camera, ExternalLink, Music2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    details: ["Mbeya, Tanzania"],
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/20"
  },
  {
    icon: Phone,
    title: "Phone",
    details: [
      "Arch. ILLELA: +255 629 849 802",
      "Eng. ORRESY: +255 618 017 434",
      "Eng. GODWIN: +255 718 297 342"
    ],
    color: "text-[#0B1F4D]",
    bg: "bg-blue-100 dark:bg-blue-900/20"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@chugazstationery.com"],
    color: "text-[#F4B400]",
    bg: "bg-yellow-100 dark:bg-yellow-900/20"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: [
      "Monday - Friday: 8:00 AM - 6:00 PM",
      "Saturday: 9:00 AM - 4:00 PM",
      "Sunday: Closed"
    ],
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/20"
  }
]

const socialLinks = [
  { icon: Globe, label: "Facebook", href: "#", color: "hover:text-blue-600" },
  { icon: Camera, label: "Instagram", href: "#", color: "hover:text-pink-600" },
  { icon: Music2, label: "TikTok", href: "#", color: "hover:text-black dark:hover:text-white" },
  { icon: ExternalLink, label: "LinkedIn", href: "#", color: "hover:text-blue-700" },
  { icon: Music2, label: "YouTube", href: "#", color: "hover:text-red-600" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post("/contact", formData)
      setSent(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch {}
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0B1F4D] to-[#1a3a7a] py-16 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <p className="text-[#F4B400] font-semibold mb-2">Get in Touch</p>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Reach out to us through any of the channels below.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16 px-4 -mt-10 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="rounded-[20px] shadow-lg border-0 h-full">
                  <CardContent className="p-4 md:p-6">
                    <div className={`w-12 h-12 ${info.bg} rounded-[20px] flex items-center justify-center mb-4`}>
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <h3 className="font-heading font-bold text-[#0B1F4D] dark:text-white mb-2">{info.title}</h3>
                    {info.details.map((detail, j) => (
                      <p key={j} className="text-gray-600 dark:text-gray-400 text-sm">{detail}</p>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="py-12 md:py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-[20px] shadow-lg border-0 overflow-hidden h-full">
                <CardContent className="p-0 h-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126916.44169418072!2d33.366666!3d-8.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19f0b1c0b6f1b2f1%3A0x1c2b3a4b5c6d7e8f!2sMbeya%2C%20Tanzania!5e0!3m2!1sen!2s!4v1"
                    width="100%"
                    height="100%"
                    style={{ minHeight: "400px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="CHUGAZ Stationery Location"
                    className="border-0"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-[20px] shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading font-extrabold text-[#0B1F4D] dark:text-white">
                    Send Us a Message
                  </CardTitle>
                  <p className="text-gray-500 dark:text-gray-400">
                    We&apos;ll get back to you within 24 hours
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Your Name</Label>
                        <Input
                          value={formData.name}
                          onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                          placeholder="John Doe"
                          className="rounded-[20px]"
                          required
                        />
                      </div>
                      <div>
                        <Label>Your Email</Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                          placeholder="chugaz@example.com"
                          className="rounded-[20px]"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Subject</Label>
                      <Input
                        value={formData.subject}
                        onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                        placeholder="How can we help?"
                        className="rounded-[20px]"
                        required
                      />
                    </div>
                    <div>
                      <Label>Message</Label>
                      <Textarea
                        value={formData.message}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        placeholder="Write your message here to Chugaz..."
                        className="rounded-[20px] min-h-[120px]"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#F4B400] hover:bg-[#e5a800] text-[#0B1F4D] rounded-[20px] font-button font-semibold text-lg py-6 disabled:opacity-50"
                    >
                      {sent ? (
                        <span className="flex items-center gap-2">Message Sent! <Send className="w-4 h-4" /></span>
                      ) : (
                        <span className="flex items-center gap-2">{submitting ? "Sending..." : "Send Message"} {!submitting && <Send className="w-4 h-4" />}</span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#0B1F4D] dark:text-white mb-4">
              Follow Us on Social Media
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Stay connected with CHUGAZ Stationery for updates, tips, and success stories
            </p>
            <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-[20px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-all hover:scale-110 hover:shadow-lg`}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/255718297342?text=Hello%20CHUGAZ%20Stationery!%20I%20would%20like%20to%20inquire%20about%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-all hover:scale-110 z-50"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-8 h-8 text-white" />
      </a>
    </div>
  )
}
