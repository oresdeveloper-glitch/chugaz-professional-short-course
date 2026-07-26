"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronRight, Sparkles, Award, Users, BookOpen } from "lucide-react"
import GradientMesh from "@/components/ui/GradientMesh"
import ParticleField from "@/components/ui/ParticleField"
import { PremiumButton } from "@/components/ui/PremiumButton"

const phrases = [
  "Build Your Skills",
  "Boost Your Career", 
  "Learn from Industry Experts",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

export default function Hero() {
  const [activePhrase, setActivePhrase] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActivePhrase((prev) => (prev + 1) % phrases.length)
    }, 2600)

    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientMesh colors={["#0B1F4D", "#1a3a7a", "#F4B400", "#ffc933", "#060f27"]} blur={100} speed={25} />
      <ParticleField count={80} color="#F4B400" connectDistance={150} speed={0.4} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-[#F4B400]/20" />
        <div className="floating-orb absolute bottom-[14%] right-[8%] h-80 w-80 rounded-full bg-[#1a3a7a]/40" />
      </div>
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0B1F4D]/60 via-transparent to-[#F4B400]/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F4D]/80 via-transparent to-[#0B1F4D]/90" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/5">
            <Sparkles className="w-4 h-4 text-[#F4B400]" />
            <span className="text-sm font-button font-semibold tracking-wide text-white/90">Empowering Minds, Building Futures</span>
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
          Professional
          <br />
          <span className="bg-gradient-to-r from-white via-[#F4B400] to-white bg-clip-text text-transparent">Short Courses</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="h-16 sm:h-20 mb-8">
          <div className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={phrases[activePhrase]}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="text-xl sm:text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r from-[#F4B400] via-[#ffc933] to-[#F4B400] bg-clip-text text-transparent"
              >
                {phrases[activePhrase]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          Unlock your potential with industry-leading <span className="font-medium text-white">ICT & Engineering courses</span>. Hands-on training, expert instructors, and certification to accelerate your career.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <PremiumButton 
            variant="gradient-gold" 
            size="xl" 
            magnetic 
            ripple
            iconRight={<ArrowRight className="w-5 h-5" />}
          >
            <Link href="/register">Register Now</Link>
          </PremiumButton>
          <PremiumButton 
            variant="glass" 
            size="xl" 
            magnetic 
            ripple
            iconRight={<ChevronRight className="w-5 h-5" />}
          >
            <Link href="/courses">Explore Courses</Link>
          </PremiumButton>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12 flex justify-center">
          <div className="section-shell rounded-[28px] px-6 py-5 sm:px-8 sm:py-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                <Sparkles className="h-6 w-6 text-[#F4B400]" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Why learners choose us</p>
                <p className="text-base text-white/80">Hands-on training, elite mentors, and career-ready outcomes in one premium experience.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/50">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium">Enrolling Now</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Award className="w-4 h-4 text-[#F4B400]" />
            <span className="text-sm font-medium">Certified Programs</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Users className="w-4 h-4 text-[#F4B400]" />
            <span className="text-sm font-medium">5000+ Graduates</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <BookOpen className="w-4 h-4 text-[#F4B400]" />
            <span className="text-sm font-medium">15+ Courses</span>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="mt-20 flex items-center justify-center gap-4"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll to explore</span>
          <motion.div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B1F4D] via-transparent to-transparent" />
    </section>
  )
}