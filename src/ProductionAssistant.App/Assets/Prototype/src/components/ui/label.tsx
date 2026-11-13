// Adapted from shadcn/ui @ 8ab27715521cbd4f87ae6886cd989cbb678f6de7.
// Copyright (c) 2023 shadcn. MIT; see docs/third-party/shadcn-ui-LICENSE.txt.
"use client"

import * as React from "react"
import { cn } from "../layout/utils"
import * as LabelPrimitive from "@radix-ui/react-label"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
