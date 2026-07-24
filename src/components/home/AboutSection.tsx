"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const highlights = [
  "Industry-experienced instructors",
  "Hands-on practical training",
  "Modern computer labs & equipment",
  "Flexible class schedules",
  "Internationally recognized certificates",
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="relative"
          >
            <div className="relative rounded-[20px] overflow-hidden card-shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
                alt="CHUGAZ Training Center"
                width={800}
                height={600}
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold rounded-[20px] p-6 shadow-xl hidden sm:block">
              <p className="text-primary font-heading font-bold text-2xl">10+</p>
              <p className="text-primary/80 text-sm font-medium">Years of Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-button font-semibold mb-4 border border-primary/10">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary mb-6 leading-tight">
              About CHUGAZ Stationery
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                CHUGAZ Stationery is a premier ICT and Engineering training
                center based in Mbeya, Tanzania. We are dedicated to bridging
                the skills gap by providing high-quality, affordable
                professional courses that prepare students for the modern
                workforce.
              </p>
              <p>
                Our programs are designed with input from industry experts to
                ensure that every student gains practical, job-ready skills.
                From computer basics to advanced programming and engineering
                design, we offer a comprehensive range of courses tailored to
                meet the demands of today&apos;s employers.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-[20px] bg-primary text-white font-button font-semibold text-sm transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:-translate-y-0.5"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
