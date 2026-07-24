import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-sm hover:bg-primary-light",
        primary:
          "bg-primary text-white shadow-sm hover:bg-primary-light",
        secondary:
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        outline:
          "border border-gray-300 bg-transparent shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800",
        ghost:
          "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
        danger:
          "bg-red-600 text-white shadow-sm hover:bg-red-700",
        gold:
          "bg-gold text-white shadow-sm hover:bg-gold-light",
        green:
          "bg-green text-white shadow-sm hover:bg-green-light",
        "gradient-primary":
          "bg-gradient-to-r from-primary to-primary-light text-white shadow-sm hover:from-primary-light hover:to-primary",
        "gradient-gold":
          "bg-gradient-to-r from-gold to-gold-light text-white shadow-sm hover:from-gold-light hover:to-gold",
        "gradient-green":
          "bg-gradient-to-r from-green to-green-light text-white shadow-sm hover:from-green-light hover:to-green",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
