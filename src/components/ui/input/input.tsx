import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils/shadcn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <motion.input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-1 text-base shadow-sm backdrop-blur-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/30 aria-invalid:border-destructive",
        className
      )}
      whileFocus={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    />
  )
}

export { Input }
