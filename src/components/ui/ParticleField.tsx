"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

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
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const initParticles = () => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: 1 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.4,
      }))
    }

    resize()
    initParticles()
    window.addEventListener("resize", () => { resize(); initParticles() })

    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const p = particlesRef.current
      for (let i = 0; i < p.length; i++) {
        p[i].x += p[i].vx
        p[i].y += p[i].vy

        if (p[i].x < 0 || p[i].x > canvas.offsetWidth) p[i].vx *= -1
        if (p[i].y < 0 || p[i].y > canvas.offsetHeight) p[i].vy *= -1

        ctx.beginPath()
        ctx.arc(p[i].x, p[i].y, p[i].radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${hexToRgb(color)}, ${p[i].opacity})`
        ctx.fill()

        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x
          const dy = p[i].y - p[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectDistance) {
            ctx.beginPath()
            ctx.moveTo(p[i].x, p[i].y)
            ctx.lineTo(p[j].x, p[j].y)
            ctx.strokeStyle = `rgba(${hexToRgb(color)}, ${0.05 * (1 - dist / connectDistance)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [count, color, connectDistance, speed])

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 ${className}`} aria-hidden="true" />
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "")
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `${r}, ${g}, ${b}`
}
