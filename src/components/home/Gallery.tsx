"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { galleryImages } from "@/data/gallery";
import type { GalleryItem } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft")
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
        );
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % galleryImages.length : null
        );
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

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
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-button font-semibold mb-4 border border-primary/10">
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary mb-4">
            Our Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a look inside our training center and see our learning
            environment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {galleryImages.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={cn(
                "relative rounded-[20px] overflow-hidden cursor-pointer group",
                index === 0 && "col-span-2 row-span-2",
                index === 7 && "col-span-2"
              )}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative w-full h-48 md:h-56 lg:h-64">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                  <Camera className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-white font-heading font-bold text-sm">
                    {item.caption}
                  </p>
                  <p className="text-white/70 text-xs mt-1">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(
                  (prev) =>
                    prev !== null
                      ? (prev - 1 + galleryImages.length) % galleryImages.length
                      : null
                );
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full rounded-[20px] overflow-hidden">
                <Image
                  src={galleryImages[selectedIndex].image}
                  alt={galleryImages[selectedIndex].caption}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-heading font-bold text-lg">
                  {galleryImages[selectedIndex].caption}
                </p>
                <p className="text-white/70 text-sm">
                  {galleryImages[selectedIndex].category}
                </p>
              </div>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(
                  (prev) =>
                    prev !== null
                      ? (prev + 1) % galleryImages.length
                      : null
                );
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(i);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    i === selectedIndex
                      ? "bg-gold w-6"
                      : "bg-white/40 hover:bg-white/60"
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
