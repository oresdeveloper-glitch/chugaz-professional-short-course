"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone, GraduationCap, Sparkles, Shield, Users, Calendar } from "lucide-react"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D]/60 via-transparent to-[#F4B400]/10" />
      <div className="absolute inset-0 grid-overlay opacity-20" />
      
      <div className="absolute -top-1/2 -left-1/2 w-screen h-screen bg-gradient-to-br from-[#F4B400]/5 via-transparent to-[#0B1F4D]/5 blur-3xl" />
      <div className="absolute -bottom-1/2 -right-1/2 w-screen h-screen bg-gradient-to-tl from-[#0B1F4D]/5 via-transparent to-[#F4B400]/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-[#F4B400]/10 border border-[#F4B400]/30 text-[#F4B400] text-sm font-button font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" /> Ready to Start
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6">
            Take the <span className="bg-gradient-to-r from-[#F4B400] to-[#ffc933] bg-clip-text text-transparent">Next Step</span>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
            Your future starts today. Whether you&apos;re ready to enroll or want to learn more, we&apos;re here to help.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Users, label: "5000+", desc: "Graduates" },
            { icon: Shield, label: "98%", desc: "Satisfaction" },
            { icon: Calendar, label: "15+", desc: "Courses" },
            { icon: GraduationCap, label: "100%", desc: "Practical" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="relative"
            >
              <GlassCard variant="outlined" hover padding="md" borderRadius="xl" className="text-center group">
                <GlassCardContent className="py-2">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#F4B400] drop-shadow-[0_4px_12px_rgba(244,180,0,0.4)] group-hover:scale-110 transition-transform" />
                  <div className="text-3xl lg:text-4xl font-heading font-extrabold bg-gradient-to-r from-[#F4B400] to-[#ffc933] bg-clip-text text-transparent mb-1">{stat.label}</div>
                  <div className="text-white/60 text-sm">{stat.desc}</div>
                </GlassCardContent>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PremiumButton variant="gradient-gold" size="xl" iconRight={<ArrowRight className="w-5 h-5" />}>
            Register Now
          </PremiumButton>
          <PremiumButton variant="glass" size="xl" iconLeft={<Phone className="w-5 h-5" />}>
            Contact Us
          </PremiumButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/50"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Phone className="w-4 h-4 text-[#F4B400]" />
            <span className="text-sm font-medium">+255 629 849 802</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <GraduationCap className="w-4 h-4 text-[#F4B400]" />
            <span className="text-sm font-medium">Mbeya, Tanzania</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}