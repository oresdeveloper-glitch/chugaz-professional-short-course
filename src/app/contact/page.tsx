"use client"

import { useState } from "react"
import {
  MapPin, Phone, Mail, Clock, Send, MessageSquare,
  Globe, Camera, ExternalLink, Music2, User, AtSign, FileText
} from "lucide-react"
import { api } from "@/lib/api"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/GlassCard"
import { PremiumInput } from "@/components/ui/PremiumInput"
import { PremiumTextarea } from "@/components/ui/PremiumInput"
import { PremiumButton } from "@/components/ui/PremiumButton"
import ScrollReveal from "@/components/ui/ScrollReveal"

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
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")
    try {
      await api.post("/contact", formData)
      setSent(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong. Please try again in a moment.")
    }
    setSubmitting(false)
  }

  const updateField = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(p => ({ ...p, [field]: e.target.value }))
    if (sent) setSent(false)
  }

  return (
    <div className="min-h-screen">


      <section className="relative bg-gradient-to-br from-[#0B1F4D]/90 to-[#1a3a7a]/90 py-16 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10"
        >
          <p className="text-[#F4B400] font-semibold mb-2">Get in Touch</p>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 -mt-10 relative z-20">
        <ScrollReveal direction="up" distance={40}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((info, i) => (
                <div key={info.title}
                  
                  
                  
                  
                >
                  <GlassCard variant="elevated" padding="md" borderRadius="lg" className="h-full">
                    <GlassCardContent>
                      <div className={`w-12 h-12 ${info.bg} rounded-[20px] flex items-center justify-center mb-4`}>
                        <info.icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <h3 className="font-heading font-bold text-[#0B1F4D] dark:text-white mb-2">{info.title}</h3>
                      {info.details.map((detail, j) => (
                        <p key={j} className="text-gray-700 dark:text-gray-400 text-sm">{detail}</p>
                      ))}
                    </GlassCardContent>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-12 md:py-16 px-4 bg-gray-50/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal direction="left" distance={40}>
              <GlassCard variant="default" padding="none" borderRadius="lg" hover={false} className="overflow-hidden h-full">
                <GlassCardContent className="p-0 h-full">
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
                </GlassCardContent>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal direction="right" distance={40}>
              <GlassCard variant="gold" padding="none" borderRadius="lg" className="overflow-hidden">
                <GlassCardHeader className="p-6 pb-0">
                  <GlassCardTitle as="h2" className="text-2xl">
                    Send Us a Message
                  </GlassCardTitle>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    We&apos;ll get back to you within 24 hours
                  </p>
                </GlassCardHeader>
                <GlassCardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div aria-live="polite">
                      {sent && (
                        <div className="flex items-start gap-3 rounded-[16px] border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 p-4">
                          <span className="text-green-600 font-medium text-sm flex items-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            Message sent successfully! We&apos;ll get back to you within 24 hours.
                          </span>
                        </div>
                      )}
                      {error && !sent && (
                        <div className="flex items-start gap-3 rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-4">
                          <span className="text-red-600 dark:text-red-300 text-sm flex items-start gap-2">
                            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                            {error}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <PremiumInput
                        label="Your Name"
                        iconLeft={<User className="w-4 h-4" />}
                        value={formData.name}
                        onChange={updateField("name")}
                        placeholder="John Doe"
                        required
                      />
                      <PremiumInput
                        label="Your Email"
                        iconLeft={<AtSign className="w-4 h-4" />}
                        type="email"
                        value={formData.email}
                        onChange={updateField("email")}
                        placeholder="chugaz@example.com"
                        required
                      />
                    </div>
                    <PremiumInput
                      label="Subject"
                      iconLeft={<FileText className="w-4 h-4" />}
                      value={formData.subject}
                      onChange={updateField("subject")}
                      placeholder="How can we help?"
                      required
                    />
                    <PremiumTextarea
                      label="Message"
                      value={formData.message}
                      onChange={updateField("message")}
                      placeholder="Write your message here to Chugaz..."
                      required
                      className="min-h-[120px]"
                    />
                    <PremiumButton
                      type="submit"
                      variant="gradient-gold"
                      size="lg"
                      fullWidth
                      loading={submitting}
                      iconRight={!submitting && !sent ? <Send className="w-4 h-4" /> : undefined}
                    >
                      {sent ? (
                        <span className="flex items-center gap-2">Message Sent!</span>
                      ) : (
                        <span className="flex items-center gap-2">{submitting ? "Sending..." : "Send Message"}</span>
                      )}
                    </PremiumButton>
                  </form>
                </GlassCardContent>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-white/80 backdrop-blur-sm">
        <ScrollReveal direction="up" distance={40}>
          <div className="max-w-4xl mx-auto text-center">
            <div >
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
            </div>
          </div>
        </ScrollReveal>
      </section>

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
