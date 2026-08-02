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
  stagger = 0,
  className = "",
}: ScrollRevealProps) {
  return (
    <div className={className}>
      {typeof children === "function" ? children({ stagger }) : children}
    </div>
  )
}