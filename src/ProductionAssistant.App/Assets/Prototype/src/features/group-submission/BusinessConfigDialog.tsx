import { useRef, useState, type FormEvent } from 'react'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '../../components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/dialog'
import { BusinessPositionField } from './BusinessPositionField'
import type { BusinessDataOption, BusinessListItem, ConfigurationSaveResult, ConfiguredPosition, SubmissionConfiguration, SubmissionPositionAdapter } from './business-configuration.types'

export function BusinessConfigDialog({ business, dataOptions, adapter, canPick, otherNames, refresh, onSave, onCancel, onCloseAutoFocus }: {
  business?: BusinessListItem
  dataOptions: readonly BusinessDataOption[]
  adapter: SubmissionPositionAdapter
  canPick: boolean
  otherNames: string[]
  refresh: () => Promise<SubmissionConfiguration | undefined>
  onSave: (business: BusinessListItem) => Promise<ConfigurationSaveResult>
  onCancel: () => void
  onCloseAutoFocus: (event: Event) => void
}) {
  const [step, setStep] = useState<1 | 2>(1)
  const [positionOpened, setPositionOpened] = useState(false)
  const [id] = useState(() => business?.id ?? crypto.randomUUID())
  const [source, setSource] = useState(business?.dataSource?.value ?? '')
  const [name, setName] = useState(business?.name ?? '')
  const manualName = useRef(!!business)
  const [failure, setFailure] = useState<ConfigurationSaveResult>()
  const [waiting, setWaiting] = useState(false), [saving, setSaving] = useState(false)
  const [candidate, setCandidate] = useState<ConfiguredPosition | undefined>(business?.position.status === 'configured' ? business.position : undefined)
  const sourceOption = dataOptions.find(option => option.value === source)
  const fields = failure?.fieldErrors ?? {}
  const positionError = Object.entries(fields).find(([key]) => key.startsWith('business.position'))?.[1]
  function clearField(key: string) {
    setFailure(previous => previous?.conflict ? previous : previous && { ...previous, error: undefined, fieldErrors: { ...previous.fieldErrors, [key]: '' } })
  }
  function next(event: FormEvent) {
    event.preventDefault()
    const fieldErrors: Record<string, string> = {}
    if (!sourceOption) fieldErrors['business.dataSource'] = '请选择数据来源'
    if (!name.trim()) fieldErrors['business.name'] = '请输入业务名称'
    else if (otherNames.some(other => other.toLowerCase() === name.trim().toLowerCase())) fieldErrors['business.name'] = '业务名称已存在'
    if (Object.keys(fieldErrors).length) { setFailure({ ...failure, fieldErrors }); return }
    setPositionOpened(true)
    setStep(2)
  }
  async function confirm() {
    if (!candidate || !sourceOption || saving || failure?.conflict) return
    setSaving(true)
    setFailure(undefined)
    const result = await onSave({ id, name: name.trim(), dataSource: sourceOption, position: candidate })
    if (result.configuration) onCancel()
    else {
      setFailure(result)
      if (result.fieldErrors?.['business.name'] || result.fieldErrors?.['business.dataSource']) setStep(1)
    }
    setSaving(false)
  }
  return <Dialog open onOpenChange={open => { if (!open && !waiting && !saving) onCancel() }}>
    <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-[420px]" showCloseButton={!waiting && !saving}
      onEscapeKeyDown={event => { if (waiting || saving) event.preventDefault() }} onInteractOutside={event => { if (waiting || saving) event.preventDefault() }} onCloseAutoFocus={onCloseAutoFocus}>
      <DialogHeader className="pr-6">
        <div className="flex items-center justify-between gap-3"><DialogTitle>{step === 2 ? '设置填报位置' : business ? '编辑业务' : '新建业务'}</DialogTitle><span className="shrink-0 text-sm text-muted-foreground" aria-label="当前步骤">{step} / 2</span></div>
        <DialogDescription className={step === 1 ? 'sr-only' : undefined}>{step === 2 ? '在文档里，点出这两天的数据该填的格子，其余日期自动推算。' : '选择数据来源并设置业务名称。'}</DialogDescription>
      </DialogHeader>
      {failure?.error && <Alert variant="destructive"><AlertDescription>{failure.error}
        {failure.conflict && <Button variant="outline" size="sm" onClick={async () => { if (await refresh()) setFailure(undefined) }}>刷新配置</Button>}
      </AlertDescription></Alert>}
      {step === 1 && <form onSubmit={next} className="space-y-6" noValidate>
        <FieldGroup className="gap-5">
          <Field data-invalid={!!fields['business.dataSource']}>
            <FieldLabel htmlFor="business-data-source">数据来源（必填）</FieldLabel>
            <FieldContent>
              <Select required value={source} onValueChange={value => { setSource(value); clearField('business.dataSource'); if (!manualName.current) setName(dataOptions.find(option => option.value === value)?.label ?? '') }}>
                <SelectTrigger id="business-data-source" className="w-full" aria-invalid={!!fields['business.dataSource']} aria-describedby={fields['business.dataSource'] ? 'business-source-error' : undefined}><SelectValue placeholder="请选择需要填报的数据" /></SelectTrigger>
                <SelectContent position="popper">
                  {business?.dataSource && !dataOptions.some(option => option.value === business.dataSource?.value) && <SelectItem disabled value={business.dataSource.value}>{business.dataSource.label}（不可用）</SelectItem>}
                  {dataOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                  {dataOptions.length === 0 && <p role="status" className="px-3 py-4 text-center text-sm text-muted-foreground">暂无可填报数据</p>}
                </SelectContent>
              </Select>
              <FieldError id="business-source-error">{fields['business.dataSource']}</FieldError>
            </FieldContent>
          </Field>
          <Field data-invalid={!!fields['business.name']}><FieldLabel htmlFor="business-name">业务名称</FieldLabel><Input id="business-name" value={name} aria-invalid={!!fields['business.name']} aria-describedby={fields['business.name'] ? 'business-name-error' : undefined} onChange={event => { manualName.current = true; setName(event.target.value); clearField('business.name') }} />
            <FieldError id="business-name-error">{fields['business.name']}</FieldError></Field>
        </FieldGroup>
        <DialogFooter><Button type="button" variant="outline" onClick={onCancel}>取消</Button><Button type="submit" disabled={!sourceOption}>下一步</Button></DialogFooter>
      </form>}
      {positionOpened && <div hidden={step !== 2}>
        <fieldset disabled={saving} className="space-y-4">
          <BusinessPositionField businessId={id} position={business?.position ?? { status: 'unconfigured' }} adapter={adapter} canPick={canPick && !saving} onCandidate={setCandidate} onWaiting={setWaiting} />
          <FieldError>{positionError}</FieldError>
          <DialogFooter><Button type="button" variant="outline" disabled={waiting || saving} onClick={() => setStep(1)}>上一步</Button><Button type="button" disabled={waiting || saving || !candidate || failure?.conflict} onClick={() => void confirm()}>{saving ? '保存中…' : '保存'}</Button></DialogFooter>
        </fieldset>
      </div>}
    </DialogContent>
  </Dialog>
}
