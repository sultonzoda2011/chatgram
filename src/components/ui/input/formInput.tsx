import { Eye, EyeOff, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { motion, AnimatePresence } from 'motion/react'

import { Button } from '@/components/ui/button/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/shadcn'
import { Input } from '@/components/ui/input/input'

export interface FormInputProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  label?: string
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  icon?: LucideIcon
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  placeholder,
  icon: Icon,
  onKeyDown,
}: FormInputProps<T>) => {
  const [eyeOpen, setEyeOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <motion.div
          className="flex flex-col gap-2 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {label && (
            <Label
              htmlFor={name}
              className={cn(
                'transition-colors duration-200 text-sm font-medium',
                isFocused ? 'text-primary' : 'text-foreground',
              )}
            >
              {label}
            </Label>
          )}

          <div className="relative group w-full">
            {Icon && (
              <motion.div
                className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none',
                  isFocused ? 'text-primary' : 'text-muted-foreground',
                  fieldState.error && 'text-destructive',
                )}
                animate={{
                  scale: isFocused ? 1.15 : 1,
                  color: isFocused ? 'var(--primary)' : 'var(--muted-foreground)',
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={20} strokeWidth={2.5} />
              </motion.div>
            )}

            <Input
              {...field}
              type={type === 'password' && eyeOpen ? 'text' : type}
              value={field.value ?? ''}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              onKeyDown={onKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                field.onBlur()
                setIsFocused(false)
              }}
              className={cn(
                'w-full h-10 bg-gradient-to-br from-card/80 to-card/60 hover:from-card/90 hover:to-card/70 transition-all duration-200',
                'border border-border hover:border-border/80 focus-visible:border-primary',
                'focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0',
                'text-foreground placeholder:text-muted-foreground/60',
                'shadow-sm hover:shadow-md focus-visible:shadow-lg',
                type === 'password' && 'pr-12',
                Icon && 'pl-12',
                fieldState.error &&
                  'border-destructive/50 hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
              )}
            />

            {type === 'password' && (
              <motion.div
                className="absolute right-2 top-1/2 -translate-y-1/2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className={cn(
                    'shadow-none transition-colors duration-200 hover:bg-primary/10',
                    isFocused ? 'text-primary' : 'text-muted-foreground',
                  )}
                  onClick={() => setEyeOpen((prev) => !prev)}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={eyeOpen ? 'eye' : 'eye-off'}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      {eyeOpen ? <Eye size={20} /> : <EyeOff size={20} />}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </motion.div>
            )}

            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-primary/0 -z-10 blur-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: isFocused ? 1 : 0,
                scale: isFocused ? 1.02 : 0.95,
              }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <AnimatePresence>
            {fieldState.error && (
              <motion.div
                className="flex items-center gap-2 mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-xs text-destructive font-medium">{fieldState.error.message}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    />
  )
}

export default FormInput
