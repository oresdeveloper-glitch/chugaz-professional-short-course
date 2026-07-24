"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";

const itemsPerPage = { desktop: 3, tablet: 2, mobile: 1 };

function useWindowSize() {
  const [size, setSize] = useState({ width: 1200, height: 800 });
  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

function getItemsPerPage(width: number) {
  if (width >= 1024) return itemsPerPage.desktop;
  if (width >= 640) return itemsPerPage.tablet;
  return itemsPerPage.mobile;
}

export default function Testimonials() {
  const { width } = useWindowSize();
  const perPage = getItemsPerPage(width);
  const totalPages = Math.ceil(testimonials.length / perPage);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  const visibleItems = testimonials.slice(
    currentPage * perPage,
    currentPage * perPage + perPage
  );

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
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our graduates about how CHUGAZ has transformed their
            careers.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
              transition={{ duration: 0.4, ease: "easeInOut" as const }}
              className={cn(
                "grid gap-6",
                perPage === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                perPage === 2 && "grid-cols-1 sm:grid-cols-2",
                perPage === 1 && "grid-cols-1"
              )}
            >
              {visibleItems.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-[20px] p-8 card-shadow-lg border border-gray-100 relative"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/5" />
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < testimonial.rating
                            ? "text-gold fill-gold"
                            : "text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/20">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-primary text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500 text-xs">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-primary hover:text-gold transition-colors z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-primary hover:text-gold transition-colors z-10"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentPage ? 1 : -1);
                  setCurrentPage(i);
                }}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  i === currentPage
                    ? "bg-gold w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
