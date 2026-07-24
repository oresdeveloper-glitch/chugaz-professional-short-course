"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, BookOpen, Settings, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: GraduationCap, value: 500, suffix: "+", label: "Students Trained" },
  { icon: BookOpen, value: 12, suffix: "", label: "Professional Courses" },
  { icon: Settings, value: 100, suffix: "%", label: "Practical Sessions" },
  { icon: Star, value: 95, suffix: "%", label: "Student Satisfaction" },
];

function AnimatedCounter({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }
    let start = 0;
    const duration = 2000;
    const stepTime = Math.floor(duration / target);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span className="text-4xl sm:text-5xl font-heading font-extrabold text-gradient">
      {count}
      {suffix}
    </span>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" as const }}
      className="relative group"
    >
      <div className="relative bg-white rounded-[20px] p-8 text-center card-shadow-lg hover:card-shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-gold" />
        <div className="w-16 h-16 mx-auto mb-5 rounded-full gradient-gold/10 bg-gold/10 flex items-center justify-center">
          <Icon className="w-8 h-8 text-gold" />
        </div>
        <AnimatedCounter target={stat.value} suffix={stat.suffix} isInView={isInView} />
        <p className="text-gray-600 font-medium mt-2">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary mb-4">
            CHUGAZ by the Numbers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our commitment to quality education has made us a trusted training
            center in Mbeya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
