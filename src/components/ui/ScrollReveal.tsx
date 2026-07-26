"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Fragment } from "react"
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
  triggerOnce = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(!triggerOnce)

  useEffect(() => {
    if (once && isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [once, isVisible])

  const variants = {
    up: { initial: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } },
  }

  const variant = variants[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={variant.initial}
      animate={isVisible ? variant.visible : variant.initial}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay }}
      style={{ willChange: "transform, opacity" }}
    >
      {typeof children === "function" ? children({ stagger }) : (
        Array.isArray(children)
          ? children.map((child, i) => (
              <Fragment key={i}>
                {React.isValidElement(child) && React.cloneElement(child as React.ReactElement<any>, {
                  initial: variant.initial,
                  animate: isVisible ? variant.visible : variant.initial,
                  transition: { ...(child.props as any).transition, duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: delay + i * stagger },
                })}
              </Fragment>
            ))
          : React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<any>, {
                initial: variant.initial,
                animate: isVisible ? variant.visible : variant.initial,
                transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay },
              })
            : children
      )}
    </motion.div>
  )
}