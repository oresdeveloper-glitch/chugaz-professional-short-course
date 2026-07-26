"use client"

import { forwardRef, useState, useRef, type ButtonHTMLAttributes, type MouseEvent as ReactMouseEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface PremiumButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"> {
  variant?: "gradient-primary" | "gradient-gold" | "gradient-green" | "glass" | "glass-gold" | "outline-3d"
  size?: "sm" | "md" | "lg" | "xl"
  ripple?: boolean
  magnetic?: boolean
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
  asChild?: boolean
  whileHover?: Record<string, any>
  whileTap?: Record<string, any>
}

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  (
    {
      className = "",
      variant = "gradient-primary",
      size = "md",
      ripple = true,
      magnetic = true,
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      disabled,
      children,
      onClick,
      onMouseLeave,
      whileHover,
      whileTap,
      ...props
    },
    ref
  ) => {
    const [ripplePos, setRipplePos] = useState<{ x: number; y: number } | null>(null)
    const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 })
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
      if (ripple && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setRipplePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        setTimeout(() => setRipplePos(null), 600)
      }
      onClick?.(e)
    }

    const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      setMagnetPos({ x: x * 0.15, y: y * 0.15 })
    }

    const handleMouseLeave = () => {
      setMagnetPos({ x: 0, y: 0 })
      onMouseLeave?.(undefined as unknown as ReactMouseEvent<HTMLButtonElement>)
    }

    const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-button font-semibold transition-all duration-300 transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none select-none"

    const variants = {
      "gradient-primary": "bg-gradient-to-r from-[#0B1F4D] to-[#1a3a7a] text-white shadow-[0_10px_30px_rgba(11,31,77,0.35)] hover:shadow-[0_16px_40px_rgba(11,31,77,0.45)] hover:from-[#1a3a7a] hover:to-[#0B1F4D] hover:-translate-y-1 active:scale-[0.98]",
      "gradient-gold": "bg-gradient-to-r from-[#F4B400] to-[#ffc933] text-[#0B1F4D] shadow-[0_10px_30px_rgba(244,180,0,0.3)] hover:shadow-[0_16px_40px_rgba(244,180,0,0.4)] hover:from-[#ffc933] hover:to-[#F4B400] hover:-translate-y-1 active:scale-[0.98]",
      "gradient-green": "bg-gradient-to-r from-[#198754] to-[#20a064] text-white shadow-[0_10px_30px_rgba(25,135,84,0.3)] hover:shadow-[0_16px_40px_rgba(25,135,84,0.4)] hover:-translate-y-1 active:scale-[0.98]",
      "glass": "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 active:scale-[0.98]",
      "glass-gold": "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-[#F4B400]/30 text-[#F4B400] shadow-[0_8px_26px_rgba(244,180,0,0.16)] hover:border-[#F4B400]/60 hover:bg-[#F4B400]/10 hover:shadow-[0_14px_35px_rgba(244,180,0,0.25)] hover:-translate-y-1 active:scale-[0.98]",
      "outline-3d": "bg-transparent border-2 border-[#0B1F4D] text-[#0B1F4D] dark:border-[#F4B400] dark:text-[#F4B400] shadow-[0_4px_0_0_#0B1F4D] dark:shadow-[0_4px_0_0_#F4B400] hover:shadow-[0_0_0_0_#0B1F4D] dark:hover:shadow-[0_0_0_0_#F4B400] hover:bg-[#0B1F4D] hover:text-white dark:hover:bg-[#F4B400] dark:hover:text-[#0B1F4D] active:translate-y-[2px] active:shadow-[0_2px_0_0_#0B1F4D] dark:active:shadow-[0_2px_0_0_#F4B400]",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm min-h-[40px] gap-1.5 rounded-[14px]",
      md: "px-6 py-3 text-base min-h-[48px] gap-2 rounded-[16px]",
      lg: "px-8 py-4 text-lg min-h-[56px] gap-2.5 rounded-[20px]",
      xl: "px-10 py-5 text-xl min-h-[64px] gap-3 rounded-[24px]",
    }

    const content = (
      <>
        <AnimatePresence>
          {ripplePos && (
            <motion.span
              key="ripple"
              className="absolute rounded-full bg-white/30 pointer-events-none"
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: 300, height: 300, opacity: 0 }}
              style={{ left: ripplePos.x - 150, top: ripplePos.y - 150 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {loading && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg className="w-5 h-5 animate-spin text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.span>
        )}

        <span className="relative flex items-center gap-2 z-10" style={{ transform: magnetic ? `translate(${-magnetPos.x * 0.5}px, ${-magnetPos.y * 0.5}px)` : undefined }}>
          {!loading && iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
          <span>{children}</span>
          {!loading && iconRight && <span className="flex-shrink-0">{iconRight}</span>}
        </span>

        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </>
    )

    return (
      <motion.button
        ref={(el) => { buttonRef.current = el; if (typeof ref === "function") ref(el); else if (ref) ref.current = el }}
        className={cn(baseStyles, variants[variant], sizes[size], fullWidth && "w-full", className)}
        style={{
          transform: magnetic ? `translate(${magnetPos.x}px, ${magnetPos.y}px)` : undefined,
          transition: magnetic ? "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)" : undefined,
        }}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        disabled={disabled || loading}
        aria-busy={loading}
        whileHover={whileHover}
        whileTap={whileTap}
        {...(props as any)}
      >
        {content}
      </motion.button>
    )
  }
)

PremiumButton.displayName = "PremiumButton"