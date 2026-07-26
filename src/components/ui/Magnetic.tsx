"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface MagneticProps {
  children: ReactNode
  strength?: number
  axis?: "both" | "x" | "y"
}

export default function Magnetic({ children, strength = 0.3, axis = "both" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      setPos({ x: x * strength, y: y * strength })
    }

    const handleLeave = () => setPos({ x: 0, y: 0 })

    el.addEventListener("mousemove", handleMove)
    el.addEventListener("mouseleave", handleLeave)
    return () => { el.removeEventListener("mousemove", handleMove); el.removeEventListener("mouseleave", handleLeave) }
  }, [strength])

  return (
    <div ref={ref} className="inline-block">
      <motion.div
        style={{
          transform: `translate(${axis === "y" ? 0 : pos.x}px, ${axis === "x" ? 0 : pos.y}px)`,
          transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}