"use client"

import { useEffect, useRef, useState } from "react"

interface ParticleProps {
  className?: string
  count?: number
  color?: string
  connectDistance?: number
  speed?: number
}

export default function ParticleField({
  className = "",
  count = 60,
  color = "#F4B400",
  connectDistance = 140,
  speed = 0.3,
}: ParticleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const [particles, setParticles] = useState<Array<{
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    opacity: number
  }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx?.scale(dpr, dpr)
    }

    const initParticles = () => {
      if (!canvas) return
      const newParticles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: 1 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.4,
      }))
      setParticles(newParticles)
    }

    resize()
    initParticles()
    window.addEventListener("resize", () => { resize(); initParticles() })

    const animate = () => {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${hexToRgb(color)}, ${p.opacity})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectDistance) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${hexToRgb(color)}, ${0.05 * (1 - dist / connectDistance)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationRef.current!)
    }
  }, [particles, count, color, connectDistance, speed])

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 ${className}`} aria-hidden="true" />
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "")
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `${r}, ${g}, ${b}`
}