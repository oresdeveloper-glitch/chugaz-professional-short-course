"use client"

import { forwardRef, useEffect, useId, useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface PremiumInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  floatingLabel?: boolean
}

export const PremiumInput = forwardRef<HTMLInputElement, PremiumInputProps>(
  ({ className = "", label, error, hint, iconLeft, iconRight, floatingLabel = true, id: providedId, ...props }, ref) => {
    const generatedId = useId()
    const id = providedId || generatedId
    const [focused, setFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    return (
      <div className={cn("relative w-full", className)}>
{iconLeft && (
          <div className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10 transition-colors duration-200",
            focused || hasValue ? "text-[#F4B400]" : "text-gray-400 dark:text-gray-500"
          )}>
            {iconLeft}
          </div>
        )}
        <label
          htmlFor={id}
          className={cn(
            "mb-2 block text-sm font-medium transition-colors duration-200",
            focused || hasValue ? "text-[#F4B400]" : "text-gray-300 dark:text-gray-400"
          )}
        >
          {label}
          {props.required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
"w-full bg-white/5 dark:bg-white/10 backdrop-blur-sm border-2 rounded-[16px]",
            "text-foreground placeholder:text-gray-400/70 dark:placeholder:text-gray-500/80",
            "focus:outline-none focus:ring-0",
            iconLeft ? "pl-12" : "pl-5",
            iconRight ? "pr-12" : "pr-5",
            "py-3.5",
            focused
              ? "border-[#F4B400] shadow-[0_0_0_4px_rgba(244,180,0,0.15)] bg-white/10"
              : error
                ? "border-red-500/50 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]"
                : "border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/50 dark:hover:border-gray-600/50"
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => { setHasValue(e.target.value.length > 0); props.onChange?.(e) }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
        {iconRight && (
          <div className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200",
            focused || hasValue ? "text-[#F4B400]" : "text-gray-400 dark:text-gray-500"
          )}>
            {iconRight}
          </div>
        )}
        {error && (
          <p id={`${id}-error`} className="mt-2 text-sm text-red-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${id}-hint`} className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

PremiumInput.displayName = "PremiumInput"

interface PremiumTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
  floatingLabel?: boolean
}

export const PremiumTextarea = forwardRef<HTMLTextAreaElement, PremiumTextareaProps>(
  ({ className = "", label, error, hint, floatingLabel = true, id: providedId, ...props }, ref) => {
    const generatedId = useId()
    const id = providedId || generatedId
    const [focused, setFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    return (
      <div className={cn("relative w-full", className)}>
        <label
          htmlFor={id}
          className={cn(
            "mb-2 block text-sm font-medium transition-colors duration-200",
            focused || hasValue ? "text-[#F4B400]" : "text-gray-300 dark:text-gray-400"
          )}
        >
          {label}
          {props.required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
        </label>
        <textarea
          ref={ref}
          id={id}
          className={cn(
"w-full bg-white/5 dark:bg-white/10 backdrop-blur-sm border-2 rounded-[16px] resize-y min-h-[100px]",
            "text-foreground placeholder:text-gray-400/70 dark:placeholder:text-gray-500/80",
            "focus:outline-none focus:ring-0 p-5",
            focused
              ? "border-[#F4B400] shadow-[0_0_0_4px_rgba(244,180,0,0.15)] bg-white/10"
              : error
                ? "border-red-500/50 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]"
                : "border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/50 dark:hover:border-gray-600/50"
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => { setHasValue(e.target.value.length > 0); props.onChange?.(e) }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="mt-2 text-sm text-red-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${id}-hint`} className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

PremiumTextarea.displayName = "PremiumTextarea"