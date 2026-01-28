import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils/shadcn'
import { Button } from './button/button'

const errorVariants = cva(
  'inline-flex flex-col items-center justify-center gap-3 text-center',
  {
    variants: {
      variant: {
        default: 'text-destructive',
        warning: 'text-amber-600 dark:text-amber-500',
        info: 'text-blue-600 dark:text-blue-500',
      },
      size: {
        sm: 'text-sm gap-2',
        md: 'text-base gap-3',
        lg: 'text-lg gap-4',
      },
      fullscreen: {
        true: 'fixed inset-0 bg-background/40 backdrop-blur-xl z-[100]',
        false: 'p-8 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullscreen: false,
    },
  }
)

const iconVariants = cva('', {
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface ErrorProps extends VariantProps<typeof errorVariants> {
  className?: string
  title?: string
  message?: string
  error?: Error | string
  onRetry?: () => void
  retryText?: string
  showIcon?: boolean
  icon?: 'circle' | 'x' | 'triangle'
}

export function ErrorDisplay({
  className,
  variant,
  size,
  fullscreen,
  title = 'Произошла ошибка',
  message,
  error,
  onRetry,
  retryText = 'Повторить',
  showIcon = true,
  icon = 'circle',
}: ErrorProps) {
  const IconComponent = {
    circle: AlertCircle,
    x: XCircle,
    triangle: AlertTriangle,
  }[icon]

  const errorMessage = message || (error instanceof Error ? error.message : typeof error === 'string' ? error : undefined)

  return (
    <div className={cn(errorVariants({ variant, size, fullscreen, className }))}>
      {showIcon && (
        <IconComponent
          className={cn(
            iconVariants({ size }),
            variant === 'default' && 'text-destructive',
            variant === 'warning' && 'text-amber-600 dark:text-amber-500',
            variant === 'info' && 'text-blue-600 dark:text-blue-500'
          )}
        />
      )}

      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        {errorMessage && (
          <p className="text-muted-foreground max-w-md">{errorMessage}</p>
        )}
      </div>

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="default"
          size={size === 'md' ? 'default' : (size )}
          className="mt-4 bg-linear-to-br from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-xl px-8"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {retryText}
        </Button>
      )}
    </div>
  )
}

export function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary?: () => void
}) {
  return (
    <ErrorDisplay
      fullscreen
      title="Что-то пошло не так"
      message={error.message}
      onRetry={resetErrorBoundary}
      retryText="Перезагрузить"
      icon="x"
    />
  )
}

export function ErrorInline({
  message,
  className,
}: {
  message: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-destructive', className)}>
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  )
}
