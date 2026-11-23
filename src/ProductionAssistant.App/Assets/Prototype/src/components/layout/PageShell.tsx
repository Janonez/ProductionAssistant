import type { ReactNode } from 'react'
import { PageContainer } from './PageContainer'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main>
      <PageContainer fluid className="mx-auto w-full min-w-0 max-w-7xl space-y-6 bg-background px-4 py-6 sm:px-6">
        {children}
      </PageContainer>
    </main>
  )
}

export function PageHeader({ title, description, actions }: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <header data-shadcn-surface="" className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="ms-auto flex flex-wrap items-center justify-end gap-2">{actions}</div>}
    </header>
  )
}
