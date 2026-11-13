// Adapted from shadcn/ui @ 8ab27715521cbd4f87ae6886cd989cbb678f6de7.
// Copyright (c) 2023 shadcn. MIT; see docs/third-party/shadcn-ui-LICENSE.txt.
import { cn } from "../layout/utils"
import { Loader2Icon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="加载中"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
