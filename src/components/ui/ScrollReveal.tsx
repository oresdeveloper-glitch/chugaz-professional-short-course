"use client"

import * as React from "react"

interface ScrollRevealProps {
  children: React.ReactNode | ((opts: { stagger: number }) => React.ReactNode)
  delay?: number
  stagger?: number
  direction?: "up" | "down" | "left" | "right"
  distance?: number
  once?: boolean
  className?: string
  triggerOnce?: boolean
}

export default function ScrollReveal({
  children,
  delay = 0,
  stagger = 0,
  direction = "up",
  distance = 40,
  once = true,
  className = "",
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setVisible(true)
      return
    }

    const isVertical = direction === "up" || direction === "down"
    const hiddenTransform = isVertical
      ? `translateY(${distance}px)`
      : `translateX(${direction === "left" ? -distance : distance}px)`

    el.style.opacity = "0"
    el.style.transform = hiddenTransform
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease"
    el.style.transitionDelay = `${delay + stagger}s`
    el.style.willChange = "opacity, transform"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [direction, distance, once, delay, stagger])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (visible) {
      el.style.opacity = "1"
      el.style.transform = "none"
      el.style.transitionDelay = "0s"
    } else if (!once) {
      el.style.opacity = "0"
    }
  }, [visible, once])

  return (
    <div ref={ref} className={className}>
      {typeof children === "function" ? children({ stagger }) : children}
    </div>
  )
}