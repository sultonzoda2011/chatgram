import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { useState } from 'react'
import { Eye, EyeOff, type LucideIcon } from 'lucide-react'

import { Input } from './input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/shadcn'

export interface FormInputProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  icon?: LucideIcon
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  placeholder,
  icon: Icon,
}: FormInputProps<T>) => {
  const [eyeOpen, setEyeOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Label
            htmlFor={name}
            className={cn(
              'text-sm font-medium transition-colors duration-300',
              isFocused ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            {label}
          </Label>

          <div className="relative group">
            {Icon && (
              <div
                className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10',
                  isFocused ? 'text-primary' : 'text-muted-foreground/60',
                  fieldState.error && 'text-destructive',
                )}
              >
                <Icon size={20} strokeWidth={2} />
              </div>
            )}

            <Input
              {...field}
              type={type === 'password' && eyeOpen ? 'text' : type}
              value={field.value ?? ''}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                field.onBlur()
                setIsFocused(false)
              }}
              className={cn(
                'transition-all duration-300',
                type === 'password' && 'pr-12',
                Icon && 'pl-12',
                fieldState.error &&
                  'border-destructive focus:border-destructive focus:ring-destructive/10',
              )}
            />

            {type === 'password' && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className={cn(
                  'absolute right-2 top-1/2 -translate-y-1/2 shadow-none transition-colors duration-300',
                  isFocused ? 'text-primary' : 'text-muted-foreground/60',
                )}
                onClick={() => setEyeOpen((prev) => !prev)}
              >
                {eyeOpen ? <Eye size={20} /> : <EyeOff size={20} />}
              </Button>
            )}

            <div
              className={cn(
                'absolute inset-0 rounded-xl bg-primary/5 -z-10 transition-all duration-300',
                isFocused ? 'opacity-100 scale-[1.02]' : 'opacity-0 scale-95',
              )}
            />
          </div>

          {fieldState.error && (
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-destructive" />
              <p className="text-sm text-destructive font-medium">{fieldState.error.message}</p>
            </div>
          )}
        </div>
      )}
    />
  )
}

export default FormInput
