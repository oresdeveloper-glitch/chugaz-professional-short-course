"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { newsItems } from "@/data/news";
import type { NewsItem } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const date = new Date(item.date);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const categoryColors: Record<string, string> = {
    Courses: "bg-blue-100 text-blue-700",
    Announcements: "bg-purple-100 text-purple-700",
    "Success Stories": "bg-green-100 text-green-700",
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white rounded-[20px] overflow-hidden card-shadow-lg hover:card-shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span
          className={cn(
            "absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-button font-bold",
            categoryColors[item.category] || "bg-gray-100 text-gray-700"
          )}
        >
          {item.category}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <Calendar className="w-3.5 h-3.5" />
          {formatted}
        </div>
        <h3 className="text-lg font-heading font-bold text-primary mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {item.excerpt}
        </p>
        <Link
          href={`/news/${item.id}`}
          className="inline-flex items-center gap-1.5 text-gold font-button font-semibold text-sm group/link"
        >
          Read More
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function News() {
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-button font-semibold mb-4 border border-primary/10">
            News & Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary mb-4">
            Latest News & Updates
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest happenings, course offerings, and
            success stories from CHUGAZ.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {newsItems.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-[20px] bg-primary text-white font-button font-bold text-sm transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:-translate-y-0.5"
          >
            View All News
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
