"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, DollarSign, ArrowRight } from "lucide-react";
import { getFeaturedCourses } from "@/data/courses";
import type { Course } from "@/types";

const featuredCourses = getFeaturedCourses();

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white rounded-[20px] overflow-hidden card-shadow-lg hover:card-shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gold/90 text-primary text-xs font-button font-bold">
          {course.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-gold transition-colors duration-300">
          {course.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gold" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-gold" />
            {course.currency} {course.fee.toLocaleString()}
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-5">
          {course.description}
        </p>
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-2 text-primary font-button font-semibold text-sm group/link transition-colors hover:text-gold"
        >
          View Details
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function CoursesSection() {
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
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary mb-4">
            Popular Courses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our industry-aligned courses designed to equip you with
            practical skills for the modern workplace.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
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
            href="/courses"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-[20px] border-2 border-primary text-primary font-button font-bold text-sm transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5"
          >
            View All Courses
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
