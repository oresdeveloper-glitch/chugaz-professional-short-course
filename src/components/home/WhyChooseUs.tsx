"use client"

import {
  Award, Wrench, Clock, Wallet, ScrollText, Briefcase,
  GraduationCap, Monitor, Users, Shield, Zap, Globe, ArrowRight
} from "lucide-react"
import Link from "next/link"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import ScrollReveal from "@/components/ui/ScrollReveal"
import { PremiumButton } from "@/components/ui/PremiumButton"

const features = [
  {
    icon: Award,
    title: "Expert Instructors",
    desc: "Learn from certified professionals with years of industry experience in their respective fields.",
  },
  {
    icon: Wrench,
    title: "Practical Training",
    desc: "Get hands-on experience with real-world projects and modern equipment in our state-of-the-art labs.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    desc: "Choose from morning, afternoon, evening, and weekend classes that fit your busy lifestyle.",
  },
  {
    icon: Wallet,
    title: "Affordable Fees",
    desc: "Quality education at competitive prices with flexible payment plans to suit your budget.",
  },
  {
    icon: ScrollText,
    title: "Recognized Certificate",
    desc: "Receive an internationally recognized certificate upon completion to boost your career.",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    desc: "Get guidance with job placements, resume building, and interview preparation.",
  },
]

const stats = [
  { value: "5000+", label: "Graduates" },
  { value: "15+", label: "Courses" },
  { value: "98%", label: "Satisfaction" },
  { value: "100%", label: "Practical" },
]

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0B1F4D]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D]/3 via-transparent to-[#F4B400]/3" />
      <div className="absolute left-[-6%] bottom-[-6%] h-64 w-64 rounded-full bg-[#0B1F4D]/25 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4B400]/10 border border-[#F4B400]/30 text-[#F4B400] text-sm font-button font-semibold mb-6">
            Why CHUGAZ
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6">
            Choose <span className="bg-gradient-to-r from-[#F4B400] to-[#ffc933] bg-clip-text text-transparent">Excellence</span>
          </h2>
          <p className="text-white/90 max-w-3xl mx-auto text-lg leading-relaxed">
            We are committed to providing the best learning experience that prepares you for real-world success.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} direction="up" distance={40} delay={index * 0.08}>
              <GlassCard variant="elevated" hover padding="lg" borderRadius="2xl" className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4B400]/3 via-transparent to-[#0B1F4D]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F4B400]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                
                <GlassCardContent className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-[#F4B400]/20 to-[#0B1F4D]/20 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-[#F4B400]/40 group-hover:to-[#0B1F4D]/40 group-hover:border-[#F4B400]/40 transition-all duration-500 border border-white/10"
                  >
                    <feature.icon className="w-8 h-8 text-[#F4B400] drop-shadow-[0_4px_12px_rgba(244,180,0,0.4)]" />
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-heading font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-[#F4B400] leading-relaxed">
                    {feature.desc}
                  </p>
                </GlassCardContent>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} direction="up" distance={30} delay={0.2 + index * 0.06}>
              <GlassCard variant="outlined" hover padding="md" borderRadius="xl" className="text-center group">
                <GlassCardContent className="py-2">
                  <div
                    className="text-4xl lg:text-5xl font-heading font-extrabold bg-gradient-to-r from-[#F4B400] to-[#ffc933] bg-clip-text text-transparent"
                  >
                    {stat.value}
                  </div>
                  <p className="text-white/75 text-sm font-medium mt-1">{stat.label}</p>
                </GlassCardContent>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <div
          className="text-center mt-12 lg:mt-16"
        >
          <PremiumButton variant="gradient-primary" size="lg" asChild iconRight={<ArrowRight className="w-4 h-4" />}>
            <Link href="/courses">Explore All Programs</Link>
          </PremiumButton>
        </div>
      </div>
    </section>
  )
}