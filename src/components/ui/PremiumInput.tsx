"use client"

import { forwardRef, useId, useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none transition-colors duration-200 group-focus-within:text-[#F4B400] z-10">
            {iconLeft}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full bg-white/5 dark:bg-white/10 backdrop-blur-sm border-2 rounded-[16px] transition-all duration-300",
            "text-white dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-600",
            "focus:outline-none focus:ring-0",
            iconLeft ? "pl-12" : "pl-5",
            iconRight ? "pr-12" : "pr-5",
            floatingLabel ? "pt-6 pb-2" : "py-3.5",
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
        {floatingLabel && (
          <motion.label
            htmlFor={id}
            className={cn(
              "absolute left-5 transition-all duration-200 pointer-events-none text-gray-400 dark:text-gray-500",
              focused || hasValue
                ? "top-1.5 text-xs text-[#F4B400] font-medium"
                : "top-1/2 -translate-y-1/2 text-base"
            )}
          >
            {label}
            {props.required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
          </motion.label>
        )}
        {iconRight && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {iconRight}
          </div>
        )}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden"
          animate={{ width: focused ? "100%" : "0%", backgroundColor: error ? "#ef4444" : "#F4B400" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${id}-error`}
              className="mt-2 text-sm text-red-400 flex items-center gap-1"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {error}
            </motion.p>
          )}
          {hint && !error && (
            <motion.p
              id={`${id}-hint`}
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
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
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full bg-white/5 dark:bg-white/10 backdrop-blur-sm border-2 rounded-[16px] transition-all duration-300 resize-y min-h-[100px]",
            "text-white dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-600",
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
        {floatingLabel && (
          <motion.label
            htmlFor={id}
            className={cn(
              "absolute left-5 transition-all duration-200 pointer-events-none text-gray-400 dark:text-gray-500",
              focused || hasValue
                ? "top-2 text-xs text-[#F4B400] font-medium"
                : "top-1/2 -translate-y-1/2 text-base"
            )}
          >
            {label}
            {props.required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
          </motion.label>
        )}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden"
          animate={{ width: focused ? "100%" : "0%", backgroundColor: error ? "#ef4444" : "#F4B400" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${id}-error`}
              className="mt-2 text-sm text-red-400 flex items-center gap-1"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {error}
            </motion.p>
          )}
          {hint && !error && (
            <motion.p
              id={`${id}-hint`}
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

PremiumTextarea.displayName = "PremiumTextarea"