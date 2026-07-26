"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, Sparkles, Target } from "lucide-react"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { PremiumButton } from "@/components/ui/PremiumButton"

const highlights = [
  "Industry-experienced instructors",
  "Hands-on practical training",
  "Modern computer labs & equipment",
  "Flexible class schedules",
  "Internationally recognized certificates",
  "Job placement assistance",
]

export default function AboutSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D]/5 via-transparent to-[#F4B400]/5" />
      <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#F4B400]/10 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-[#F4B400]/10 border border-[#F4B400]/30 text-[#F4B400] text-sm font-button font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" /> About CHUGAZ
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6">
            Empowering <span className="bg-gradient-to-r from-[#F4B400] to-[#ffc933] bg-clip-text text-transparent">Futures</span> Through Skills
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-lg leading-relaxed">
            Premier ICT and Engineering training center in Mbeya, Tanzania — bridging the skills gap with practical, job-ready programs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] lg:aspect-[5/4]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D] to-[#1a3a7a] rounded-[36px] shadow-3d" />
              <div className="absolute inset-4 bg-gradient-to-br from-[#0B1F4D] via-[#1a3a7a] to-[#060f27] rounded-[32px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
                  alt="CHUGAZ Training Center"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F4D]/60 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none" />
            </div>

            <motion.div
              className="absolute -bottom-8 -right-8 lg:-bottom-10 lg:-right-10"
              whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.3 } }}
            >
              <div className="relative bg-gradient-to-br from-[#F4B400] to-[#ffc933] rounded-[24px] p-6 lg:p-8 shadow-[0_20px_50px_rgba(244,180,0,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffc933] to-[#F4B400] rounded-[24px] opacity-20 blur-xl" />
                <div className="relative text-center">
                  <motion.p className="text-4xl lg:text-5xl font-heading font-extrabold text-[#0B1F4D]" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    10+
                  </motion.p>
                  <p className="text-[#0B1F4D]/80 text-sm lg:text-base font-medium mt-1">Years of Excellence</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -left-6 lg:-top-8 lg:-left-8 flex items-center gap-3"
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-[20px] bg-gradient-to-br from-[#198754] to-[#20a064] flex items-center justify-center shadow-[0_10px_30px_rgba(25,135,84,0.3)]">
                <CheckCircle2 className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-[16px] px-4 py-2">
                <p className="text-white font-heading font-bold text-sm lg:text-base">98%</p>
                <p className="text-white/60 text-xs lg:text-sm">Satisfaction Rate</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          >
            <div className="section-shell rounded-[32px] p-8 lg:p-10 space-y-4 text-white/70 leading-relaxed">
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
                CHUGAZ Stationery is a premier ICT and Engineering training center based in Mbeya, Tanzania. We are dedicated to bridging the skills gap by providing high-quality, affordable professional courses that prepare students for the modern workforce.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                Our programs are designed with input from industry experts to ensure that every student gains practical, job-ready skills. From computer basics to advanced programming and engineering design, we offer a comprehensive range of courses tailored to meet the demands of today's employers.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 grid gap-3 sm:grid-cols-2"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 group rounded-[20px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <motion.div
                    className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#198754]/20 to-[#20a064]/20 border border-[#198754]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#198754]" />
                  </motion.div>
                  <span className="text-white/80 pt-1">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <PremiumButton variant="gradient-primary" size="lg" iconRight={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}>
                Explore Our Story
              </PremiumButton>
              <PremiumButton variant="glass-gold" size="lg" iconLeft={<Target className="w-4 h-4" />}>
                View Courses
              </PremiumButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}