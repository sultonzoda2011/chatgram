import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/shadcn'

const loadingVariants = cva(
  'inline-flex items-center justify-center gap-3',
  {
    variants: {
      variant: {
        default: 'text-primary',
        secondary: 'text-muted-foreground',
        destructive: 'text-destructive',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      fullscreen: {
        true: 'fixed inset-0 bg-background/40 backdrop-blur-xl z-[100] flex-col',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullscreen: false,
    },
  }
)

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface LoadingProps extends VariantProps<typeof loadingVariants> {
  className?: string
  text?: string
  showText?: boolean
}

export function Loading({
  className,
  variant,
  size,
  fullscreen,
  text = 'Загрузка...',
  showText = true,
}: LoadingProps) {
  return (
    <div className={cn(loadingVariants({ variant, size, fullscreen, className }))}>
      <Loader2 className={cn(spinnerVariants({ size }))} />
      {showText && <span className="font-medium">{text}</span>}
    </div>
  )
}

export function LoadingDots({
  className,
  variant,
  size,
}: Pick<LoadingProps, 'className' | 'variant' | 'size'>) {
  const dotSize = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
    xl: 'h-3 w-3',
  }[size || 'md']

  const variantColor = {
    default: 'bg-primary',
    secondary: 'bg-muted-foreground',
    destructive: 'bg-destructive',
  }[variant || 'default']

  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <span
        className={cn(
          'rounded-full animate-bounce',
          dotSize,
          variantColor
        )}
        style={{ animationDelay: '0ms' }}
      />
      <span
        className={cn(
          'rounded-full animate-bounce',
          dotSize,
          variantColor
        )}
        style={{ animationDelay: '150ms' }}
      />
      <span
        className={cn(
          'rounded-full animate-bounce',
          dotSize,
          variantColor
        )}
        style={{ animationDelay: '300ms' }}
      />
    </div>
  )
}

export function LoadingSpinner({
  className,
  size,
}: Pick<LoadingProps, 'className' | 'size'>) {
  return <Loader2 className={cn(spinnerVariants({ size }), 'animate-spin', className)} />
}
