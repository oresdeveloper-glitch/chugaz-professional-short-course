"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface PremiumButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"> {
  variant?: "gradient-primary" | "gradient-gold" | "gradient-green" | "glass" | "glass-gold" | "outline-3d"
  size?: "sm" | "md" | "lg" | "xl"
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
  asChild?: boolean
}

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  (
    {
      className = "",
      variant = "gradient-primary",
      size = "md",
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-button font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none select-none touch-manipulation"

    const variants = {
      "gradient-primary": "bg-gradient-to-r from-[#0B1F4D] to-[#1a3a7a] text-white shadow-[0_10px_30px_rgba(11,31,77,0.35)] hover:shadow-[0_16px_40px_rgba(11,31,77,0.45)] hover:from-[#1a3a7a] hover:to-[#0B1F4D]",
      "gradient-gold": "bg-gradient-to-r from-[#F4B400] to-[#ffc933] text-[#0B1F4D] shadow-[0_10px_30px_rgba(244,180,0,0.3)] hover:shadow-[0_16px_40px_rgba(244,180,0,0.4)] hover:from-[#ffc933] hover:to-[#F4B400]",
      "gradient-green": "bg-gradient-to-r from-[#198754] to-[#20a064] text-white shadow-[0_10px_30px_rgba(25,135,84,0.3)] hover:shadow-[0_16px_40px_rgba(25,135,84,0.4)]",
      "glass": "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/30",
      "glass-gold": "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-[#F4B400]/30 text-[#F4B400] shadow-[0_8px_26px_rgba(244,180,0,0.16)] hover:border-[#F4B400]/60 hover:bg-[#F4B400]/10 hover:shadow-[0_14px_35px_rgba(244,180,0,0.25)]",
      "outline-3d": "bg-transparent border-2 border-[#0B1F4D] text-[#0B1F4D] dark:border-[#F4B400] dark:text-[#F4B400] shadow-[0_4px_0_0_#0B1F4D] dark:shadow-[0_4px_0_0_#F4B400] hover:shadow-[0_0_0_0_#0B1F4D] dark:hover:shadow-[0_0_0_0_#F4B400] hover:bg-[#0B1F4D] hover:text-white dark:hover:bg-[#F4B400] dark:hover:text-[#0B1F4D]",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm min-h-[40px] gap-1.5 rounded-[14px]",
      md: "px-6 py-3 text-base min-h-[48px] gap-2 rounded-[16px]",
      lg: "px-8 py-4 text-lg min-h-[56px] gap-2.5 rounded-[20px]",
      xl: "px-10 py-5 text-xl min-h-[64px] gap-3 rounded-[24px]",
    }

const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        className={cn(baseStyles, variants[variant], sizes[size], fullWidth && "w-full", className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        <span className="relative flex items-center gap-2 z-10">
          {!loading && iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
          {loading && (
            <svg className="w-5 h-5 text-current" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          <span>{children}</span>
          {!loading && iconRight && <span className="flex-shrink-0">{iconRight}</span>}
        </span>
      </Comp>
    )
  }
)

PremiumButton.displayName = "PremiumButton"