"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface GradientMeshProps {
  className?: string
  colors?: string[]
  blur?: number
  speed?: number
}

export default function GradientMesh({
  className = "",
  colors = ["#0B1F4D", "#1a3a7a", "#F4B400", "#ffc933", "#060f27"],
  blur = 120,
  speed = 20,
}: GradientMeshProps) {
  const [blobs, setBlobs] = useState<Array<{ x: number; y: number; size: number; color: string }>>([])

  useEffect(() => {
    const newBlobs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 30 + Math.random() * 40,
      color: colors[i % colors.length],
    }))
    setBlobs(newBlobs)
  }, [colors])

  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ filter: `blur(${blur}px)` }}
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-40"
          style={{
            width: `${blob.size}vw`,
            height: `${blob.size}vw`,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            background: blob.color,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [`${blob.x}%`, `${blob.x + (Math.random() - 0.5) * 15}%`, `${blob.x}%`],
            y: [`${blob.y}%`, `${blob.y + (Math.random() - 0.5) * 15}%`, `${blob.y}%`],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: speed + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D]/50 via-transparent to-[#F4B400]/10" />
    </div>
  )
}