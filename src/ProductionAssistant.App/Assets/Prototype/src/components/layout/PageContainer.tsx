// Adapted from satnaing/shadcn-admin @ e16c87f213a5ba5e45964e9b67c792105ec74d26.
// Copyright (c) 2024 Sat Naing. MIT; see docs/third-party/shadcn-admin-LICENSE.txt.
import { cn } from './utils'

type MainProps = React.ComponentProps<'div'> & {
  fixed?: boolean
  fluid?: boolean
}

export function PageContainer({ fixed, className, fluid, ...props }: MainProps) {
  return (
    <div
      data-layout={fixed ? 'fixed' : 'auto'}
      className={cn(
        'px-4 py-6',

        // If layout is fixed, make the main container flex and grow
        fixed && 'flex grow flex-col overflow-hidden',

        // If layout is not fluid, set the max-width
        !fluid &&
          '@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl',
        className
      )}
      {...props}
    />
  )
}
