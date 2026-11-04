// Adapted from satnaing/shadcn-admin @ e16c87f213a5ba5e45964e9b67c792105ec74d26.
// Copyright (c) 2024 Sat Naing. MIT; see docs/third-party/shadcn-admin-LICENSE.txt.
import { cn } from '../layout/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn('animate-pulse rounded-md bg-accent', className)}
      {...props}
    />
  )
}

export { Skeleton }
