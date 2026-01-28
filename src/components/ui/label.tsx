import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { motion } from "motion/react"

import { cn } from "@/lib/utils/shadcn"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      asChild
      data-slot="label"
    >
      <motion.label
        className={cn(
          "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className
        )}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        {...(props as any)}
      />
    </LabelPrimitive.Root>
  )
}

export { Label }
