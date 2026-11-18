import type { ReactNode } from 'react'
import { Separator } from '../../components/ui/separator'
import { Spinner } from '../../components/ui/spinner'

export function SubmissionSettingsLoading({ stage, error }: { stage: 'module' | 'configuration'; error?: ReactNode }) {
  return <div aria-label="集团填报设置加载" aria-busy={!error} className="min-w-0 space-y-6">
    <p role="status" className="text-sm text-muted-foreground">{error ? '配置读取失败' : stage === 'module' ? '正在加载设置界面…' : '正在读取设置配置…'}</p>
    {error}
    <section className="space-y-3" aria-label="网页配置加载">
      <h2 className="text-base font-semibold">网页配置</h2>
      {!error && <Spinner aria-label="正在读取网页配置" />}
    </section>
    <Separator />
    <section className="space-y-3" aria-label="业务配置加载"><h2 className="text-base font-semibold">业务配置</h2></section>
    <Separator />
    <section className="space-y-3" aria-label="执行规则加载"><h2 className="text-base font-semibold">执行规则</h2></section>
  </div>
}
