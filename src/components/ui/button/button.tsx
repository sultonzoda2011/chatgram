import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/utils/shadcn'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/30 aria-invalid:border-destructive relative overflow-hidden",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:shadow-md',
        destructive: 'bg-destructive text-white focus-visible:ring-destructive/30 shadow-sm',
        outline:
          'border border-input bg-background/50 shadow-xs hover:bg-accent hover:text-accent-foreground backdrop-blur-sm',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 rounded-lg px-8 has-[>svg]:px-4 text-base',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
      isPending?: boolean
    }
>(({ className, variant = 'default', size = 'default', asChild = false, isPending = false, disabled, children, ...props }, ref) => {
  const Comp = asChild ? Slot : motion.button

  return (
    <Comp
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isPending}
      whileHover={{ scale: disabled || isPending ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isPending ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {isPending && <Loader2 className="animate-spin" />}
        {children}
      </span>
    </Comp>
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
