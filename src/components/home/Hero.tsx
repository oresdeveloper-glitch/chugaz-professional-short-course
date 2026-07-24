"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const phrases = [
  "Build Your Skills",
  "Boost Your Career",
  "Learn from Industry Experts",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div variants={itemVariants}>
          <span className="inline-block px-6 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold text-sm font-button font-semibold tracking-wide mb-6">
            Empowering Minds, Building Futures
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight mb-4"
        >
          Professional
          <br />
          Short Courses
        </motion.h1>

        <motion.div variants={itemVariants} className="h-12 sm:h-14 mb-6">
          <span
            key={index}
            className="inline-block text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gradient transition-all duration-500"
          >
            {phrases[index]}
          </span>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Unlock your potential with industry-leading ICT and Engineering
          courses. Hands-on training, expert instructors, and certification to
          accelerate your career.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-[20px] gradient-gold text-primary font-button font-bold text-base transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5"
          >
            Register Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-[20px] border-2 border-white/30 text-white font-button font-bold text-base transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5"
          >
            Explore Courses
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 flex items-center justify-center gap-8 text-white/60"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm">Enrolling Now</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-sm">Limited Seats</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
