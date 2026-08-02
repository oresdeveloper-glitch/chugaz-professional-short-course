"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { testimonials } from "@/data/testimonials"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { PremiumButton } from "@/components/ui/PremiumButton"

const itemsPerPage = { desktop: 3, tablet: 2, mobile: 1 }

function useWindowSize() {
  const [size, setSize] = useState({ width: 1200, height: 800 })
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return size
}

function getItemsPerPage(width: number) {
  if (width >= 1024) return itemsPerPage.desktop
  if (width >= 640) return itemsPerPage.tablet
  return itemsPerPage.mobile
}

export default function Testimonials() {
  const { width } = useWindowSize()
  const perPage = getItemsPerPage(width)
  const totalPages = Math.ceil(testimonials.length / perPage)
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [paused, setPaused] = useState(false)

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }, [totalPages])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }, [totalPages])

  useEffect(() => {
    if (paused) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return
    const interval = setInterval(goNext, 6000)
    return () => clearInterval(interval)
  }, [goNext, paused])

  const visibleItems = testimonials.slice(currentPage * perPage, currentPage * perPage + perPage)

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D]/3 via-transparent to-[#F4B400]/3" />
      <div className="absolute right-[5%] top-[10%] h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4B400]/10 border border-[#F4B400]/30 text-[#F4B400] text-sm font-button font-semibold mb-6">
            Student Voices
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6">
            What Our <span className="bg-gradient-to-r from-[#F4B400] to-[#ffc933] bg-clip-text text-transparent">Graduates</span> Say
          </h2>
          <p className="text-white/90 max-w-3xl mx-auto text-lg leading-relaxed">
            Hear from our graduates about how CHUGAZ has transformed their careers and lives.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Student testimonials"
        >
          <div
              className={cn(
                "grid gap-6 lg:gap-8",
                perPage === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                perPage === 2 && "grid-cols-1 sm:grid-cols-2",
                perPage === 1 && "grid-cols-1"
              )}
              aria-live="polite"
            >
              {visibleItems.map((testimonial) => (
                <GlassCard key={testimonial.id} variant="elevated" hover padding="lg" borderRadius="2xl" className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F4B400]/3 via-transparent to-[#0B1F4D]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <GlassCardContent className="relative z-10">
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-[#F4B400]/10 group-hover:text-[#F4B400]/20 transition-colors duration-500" />
                    
                    <div
                      className="flex items-center gap-1.5 mb-5"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-5 h-5",
                            i < testimonial.rating
                              ? "text-[#F4B400] fill-[#F4B400] drop-shadow-[0_0_8px_rgba(244,180,0,0.5)]"
                              : "text-white/10"
                          )}
                        />
                      ))}
                    </div>
                    
                    <p
                      className="text-white/80 text-base lg:text-lg leading-relaxed mb-7 italic"
                    >
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    
                    <div
                      className="flex items-center gap-4 pt-4 border-t border-white/10"
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#F4B400]/30">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-sm">{testimonial.name}</p>
                        <p className="text-white/70 text-xs">{testimonial.title}</p>
                      </div>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              ))}
            </div>

          {totalPages > 1 && (
            <>
              <PremiumButton
                variant="glass"
                size="sm"
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 p-0"
                onClick={goPrev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </PremiumButton>
              <PremiumButton
                variant="glass"
                size="sm"
                className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 p-0"
                onClick={goNext}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </PremiumButton>
            </>
          )}

          <div
            className="flex items-center justify-center gap-2 mt-12"
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentPage ? 1 : -1); setCurrentPage(i) }}
                className="group flex items-center justify-center py-3 px-1"
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === currentPage ? "true" : undefined}
              >
                <span
                  className={cn(
                    "block h-2.5 w-2.5 rounded-full transition-all duration-300",
                    i === currentPage
                      ? "w-8 bg-[#F4B400] shadow-[0_0_12px_rgba(244,180,0,0.6)]"
                      : "bg-white/20 group-hover:bg-white/40"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}