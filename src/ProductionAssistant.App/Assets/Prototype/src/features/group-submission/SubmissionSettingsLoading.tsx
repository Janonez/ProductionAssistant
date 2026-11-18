import type { ReactNode } from 'react'
import { Spinner } from '../../components/ui/spinner'

export function SubmissionSettingsLoading({ error }: { error?: ReactNode }) {
  return <section className="space-y-3" aria-label="网页配置加载" aria-busy={!error}>
    <h2 className="text-base font-semibold">网页配置</h2>
    {error || <Spinner aria-label="正在读取网页配置" />}
  </section>
}
