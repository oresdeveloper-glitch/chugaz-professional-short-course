"use client";

import { motion } from "framer-motion";
import {
  Award,
  Wrench,
  Clock,
  Wallet,
  ScrollText,
  Briefcase,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Expert Instructors",
    description:
      "Learn from certified professionals with years of industry experience in their respective fields.",
  },
  {
    icon: Wrench,
    title: "Practical Training",
    description:
      "Get hands-on experience with real-world projects and modern equipment in our labs.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description:
      "Choose from morning, afternoon, evening, and weekend classes that fit your busy lifestyle.",
  },
  {
    icon: Wallet,
    title: "Affordable Fees",
    description:
      "Quality education at competitive prices with flexible payment plans to suit your budget.",
  },
  {
    icon: ScrollText,
    title: "Certificate",
    description:
      "Receive a recognized certificate upon completion to boost your career prospects.",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description:
      "Get guidance with job placements, resume building, and interview preparation.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-button font-semibold mb-4 border border-gold/20">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary mb-4">
            Why Choose CHUGAZ Stationery?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to providing the best learning experience that
            prepares you for real-world success.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="group relative bg-white rounded-[20px] p-8 card-shadow border border-gray-100 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 hover:card-shadow-xl"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors duration-500">
                  <Icon className="w-7 h-7 text-primary group-hover:text-gold transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
