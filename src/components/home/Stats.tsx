"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, BookOpen, Settings, Star } from "lucide-react"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"

interface StatItem {
  icon: React.ElementType
  value: number
  suffix: string
  label: string
}

const stats: StatItem[] = [
  { icon: GraduationCap, value: 5000, suffix: "+", label: "Students Trained" },
  { icon: BookOpen, value: 15, suffix: "", label: "Professional Courses" },
  { icon: Settings, value: 100, suffix: "%", label: "Practical Sessions" },
  { icon: Star, value: 98, suffix: "%", label: "Student Satisfaction" },
]

function AnimatedCounter({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) { setCount(0); return }
    let start = 0
    const duration = 2000
    const stepTime = Math.max(1, Math.floor(duration / target))
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= target) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold bg-gradient-to-r from-[#0B1F4D] via-[#F4B400] to-[#0B1F4D] bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = stat.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <GlassCard variant="elevated" hover padding="lg" borderRadius="2xl" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4B400]/5 via-transparent to-[#0B1F4D]/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F4B400]/50 to-transparent" />
        
        <GlassCardContent className="relative z-10 text-center">
          <motion.div
            className="w-18 h-18 mx-auto mb-6 rounded-[24px] bg-gradient-to-br from-[#F4B400]/20 to-[#0B1F4D]/20 flex items-center justify-center border border-[#F4B400]/30"
            whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
          >
            <Icon className="w-9 h-9 text-[#F4B400] drop-shadow-[0_4px_12px_rgba(244,180,0,0.4)]" />
          </motion.div>
          
          <AnimatedCounter target={stat.value} suffix={stat.suffix} isInView={isInView} />
          
          <motion.p
            className="text-white/70 font-medium mt-3 text-base sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {stat.label}
          </motion.p>
        </GlassCardContent>

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#F4B400] to-[#0B1F4D]"
          initial={{ width: 0 }}
          whileInView={{ width: "80%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
      </GlassCard>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D]/3 via-transparent to-[#F4B400]/3 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-[#F4B400]/10 border border-[#F4B400]/30 text-[#F4B400] text-sm font-medium mb-6">
            Our Impact
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6">
            CHUGAZ <span className="bg-gradient-to-r from-[#F4B400] to-[#ffc933] bg-clip-text text-transparent">by the Numbers</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Our commitment to quality education has made us a trusted training center with thousands of successful graduates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}