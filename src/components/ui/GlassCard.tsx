"use client"

import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "gold" | "dark"
  hover?: boolean
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  borderRadius?: "md" | "lg" | "xl" | "2xl" | "full"
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
}

const radii = {
  md: "rounded-[16px]",
  lg: "rounded-[20px]",
  xl: "rounded-[24px]",
  "2xl": "rounded-[32px]",
  full: "rounded-full",
}

const variants = {
  default: "bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/15 dark:border-white/10 shadow-[0_18px_50px_rgba(2,6,23,0.16),inset_0_1px_0_rgba(255,255,255,0.16)]",
  elevated: "bg-white/15 dark:bg-white/8 backdrop-blur-[24px] border border-white/20 dark:border-white/10 shadow-[0_25px_70px_rgba(2,6,23,0.22),_0_10px_25px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.15)]",
  outlined: "bg-transparent border-2 border-white/20 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
  gold: "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-[#F4B400]/30 shadow-[0_10px_35px_rgba(244,180,0,0.16),_0_0_0_1px_rgba(244,180,0,0.12)]",
  dark: "bg-[#060f27]/80 dark:bg-[#060f27]/90 backdrop-blur-2xl border border-[#1a3a7a]/50 shadow-[0_18px_50px_rgba(0,0,0,0.3)]",
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className = "", variant = "default", hover = true, padding = "md", borderRadius = "lg", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          variants[variant],
          paddings[padding],
          radii[borderRadius],
          hover && "hover:shadow-[0_30px_80px_rgba(2,6,23,0.24)] hover:border-white/25 dark:hover:border-white/10 hover:-translate-y-2",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
)

GlassCard.displayName = "GlassCard"

interface GlassCardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const GlassCardHeader = forwardRef<HTMLDivElement, GlassCardHeaderProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props}>{children}</div>
  )
)

GlassCardHeader.displayName = "GlassCardHeader"

interface GlassCardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export const GlassCardTitle = forwardRef<HTMLHeadingElement, GlassCardTitleProps>(
  ({ className = "", as: Component = "h3", children, ...props }, ref) => (
    <Component ref={ref} className={cn("font-heading font-bold text-[#0B1F4D] dark:text-white", className)} {...props}>{children}</Component>
  )
)

GlassCardTitle.displayName = "GlassCardTitle"

interface GlassCardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const GlassCardContent = forwardRef<HTMLDivElement, GlassCardContentProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={cn("relative z-10", className)} {...props}>{children}</div>
  )
)

GlassCardContent.displayName = "GlassCardContent"

interface GlassCardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const GlassCardFooter = forwardRef<HTMLDivElement, GlassCardFooterProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={cn("mt-4 pt-4 border-t border-white/10 dark:border-white/5 flex items-center gap-3", className)} {...props}>{children}</div>
  )
)

GlassCardFooter.displayName = "GlassCardFooter"