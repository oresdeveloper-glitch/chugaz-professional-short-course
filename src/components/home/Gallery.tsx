"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Camera, Expand } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { galleryImages } from "@/data/gallery"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { PremiumButton } from "@/components/ui/PremiumButton"

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (selectedIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null)
      if (e.key === "ArrowLeft")
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
        )
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % galleryImages.length : null
        )
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedIndex])

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D]/3 via-transparent to-[#F4B400]/3" />
      <div className="absolute left-[4%] top-[6%] h-60 w-60 rounded-full bg-[#0B1F4D]/20 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4B400]/10 border border-[#F4B400]/30 text-[#F4B400] text-sm font-button font-semibold mb-6">
            Gallery
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6">
            Our <span className="bg-gradient-to-r from-[#F4B400] to-[#ffc933] bg-clip-text text-transparent">Campus</span>
          </h2>
          <p className="text-white/90 max-w-3xl mx-auto text-lg leading-relaxed">
            Take a look inside our training center and see our modern learning environment.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {galleryImages.map((item, index) => (
            <div
              key={item.id}
            >
              <GlassCard variant="outlined" hover padding="none" borderRadius="xl" className="group relative cursor-pointer overflow-hidden aspect-[4/3] md:aspect-[5/4] lg:aspect-[4/3]" onClick={() => setSelectedIndex(index)}>
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F4D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className="text-center p-4"
                    >
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#F4B400]/30 to-[#ffc933]/30 flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white font-heading font-bold text-sm">{item.caption}</p>
                      <p className="text-white/70 text-xs mt-1">{item.category}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        <div
          className="text-center mt-12 lg:mt-16"
        >
          <PremiumButton variant="glass-gold" size="lg" asChild iconRight={<Expand className="w-4 h-4" />}>
            <Link href="/about">View Full Gallery</Link>
          </PremiumButton>
        </div>
      </div>

      {selectedIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-7 h-7" />
            </button>

            <PremiumButton
              variant="glass"
              size="sm"
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 p-0"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex((prev) => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null) }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </PremiumButton>

            <div
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full rounded-[24px] overflow-hidden bg-gradient-to-br from-[#0B1F4D] to-[#060f27]">
                <Image
                  src={galleryImages[selectedIndex].image}
                  alt={galleryImages[selectedIndex].caption}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F4D]/60 via-transparent to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0B1F4D]/90 via-transparent to-transparent">
                <h3 className="text-xl lg:text-2xl font-heading font-bold text-white mb-1">{galleryImages[selectedIndex].caption}</h3>
                <p className="text-white/70">{galleryImages[selectedIndex].category}</p>
              </div>
            </div>

            <PremiumButton
              variant="glass"
              size="sm"
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 p-0"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex((prev) => prev !== null ? (prev + 1) % galleryImages.length : null) }}
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </PremiumButton>
          </div>
        )}
    </section>
  )
}