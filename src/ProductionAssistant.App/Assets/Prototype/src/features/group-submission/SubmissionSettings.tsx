import type { ComponentProps } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card'
import { SubmissionConnection } from './SubmissionConnection'

export function SubmissionSettings(props: ComponentProps<typeof SubmissionConnection>) {
  const fields = props.job?.config.fields ?? []
  return <div className="space-y-5">
    <SubmissionConnection {...props} />
    <Card><CardHeader><CardTitle><h2>字段映射</h2></CardTitle><CardDescription>新页面的引导式配置与目标只读检查将在下一阶段接入。</CardDescription></CardHeader>
      <CardContent className="text-sm text-muted-foreground">{fields.length ? <ul className="space-y-2">{fields.map(field => <li key={field.id}>{field.name}{field.unit ? `（${field.unit}）` : ''} · {field.notion?.sourceName ?? '数据来源待配置'} · {props.job?.config.rules?.[field.id] ? '已有位置规则' : '位置待配置'}</li>)}</ul> : '尚无业务字段映射。已有配置不会被文档链接保存覆盖。'}</CardContent>
    </Card>
    <Card><CardHeader><CardTitle><h2>自动执行</h2></CardTitle><CardDescription>{!props.job ? '尚未配置文档连接。' : props.job.enabled ? '当前已启用，沿用已有执行设置。' : '当前未启用。'}</CardDescription></CardHeader>
      <CardContent className="text-sm text-muted-foreground">本阶段未接入执行时间和启停操作，现有设置仍由任务清单中的原配置管理。</CardContent>
    </Card>
    <details className="rounded-lg border p-4 text-sm"><summary className="cursor-pointer font-medium">高级设置</summary>
      <p className="mt-3 text-muted-foreground">控件录制、自定义数据绑定、位置示范和高级定位尚未迁移，仍保留在“工作管理 → 任务清单”的原任务中。后续逐项接入，不删除已有配置。</p>
    </details>
  </div>
}
