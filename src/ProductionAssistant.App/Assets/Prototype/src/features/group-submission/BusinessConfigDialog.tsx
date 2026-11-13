import { useRef, useState, type FormEvent } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '../../components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/dialog'
import { BusinessPositionField } from './BusinessPositionField'
import type { BusinessDataOption, BusinessListItem, ConfiguredPosition, SubmissionSettingsAdapter } from './business-configuration.types'

export function BusinessConfigDialog({ business, dataOptions, adapter, canPick, initialStep = 1, reselect = false, onSaveMetadata, onSavePosition, onCancel, onCloseAutoFocus }: {
  business?: BusinessListItem
  dataOptions: readonly BusinessDataOption[]
  adapter: SubmissionSettingsAdapter
  canPick: boolean
  initialStep?: 1 | 2
  reselect?: boolean
  onSaveMetadata: (value: { id?: string; name: string; dataSource: BusinessDataOption }) => BusinessListItem
  onSavePosition: (id: string, position: ConfiguredPosition) => void
  onCancel: () => void
  onCloseAutoFocus: (event: Event) => void
}) {
  const [step, setStep] = useState<1 | 2>(initialStep)
  const [saved, setSaved] = useState(business)
  const [source, setSource] = useState(business?.dataSource?.value ?? '')
  const [name, setName] = useState(business?.name ?? '')
  const manualName = useRef(!!business), advancing = useRef(false)
  const [error, setError] = useState(''), [waiting, setWaiting] = useState(false)
  const [candidate, setCandidate] = useState<ConfiguredPosition | undefined>(business?.position.status === 'configured' && !reselect ? business.position : undefined)
  const sourceOption = dataOptions.find(option => option.value === source)
  function next(event: FormEvent) {
    event.preventDefault()
    if (advancing.current) return
    if (!sourceOption) { setError('请选择数据来源'); return }
    advancing.current = true
    const value = onSaveMetadata({ id: saved?.id, name: name.trim() || sourceOption.label, dataSource: sourceOption })
    setSaved(value); setName(value.name); setCandidate(value.position.status === 'configured' ? value.position : undefined); setStep(2)
  }
  return <Dialog open onOpenChange={open => { if (!open && !waiting) onCancel() }}>
    <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-[420px]" showCloseButton={!waiting}
      onEscapeKeyDown={event => { if (waiting) event.preventDefault() }} onInteractOutside={event => { if (waiting) event.preventDefault() }} onCloseAutoFocus={onCloseAutoFocus}>
      <DialogHeader className="pr-6">
        <div className="flex items-center justify-between gap-3"><DialogTitle>{step === 2 ? '设置填报位置' : business ? '编辑业务' : '新建业务'}</DialogTitle><span className="shrink-0 text-sm text-muted-foreground" aria-label="当前步骤">{step} / 2</span></div>
        <DialogDescription className={step === 1 ? 'sr-only' : undefined}>{step === 2 ? '在文档里，点出这两天的数据该填的格子，其余日期自动推算。' : '选择数据来源并设置业务名称。'}</DialogDescription>
      </DialogHeader>
      {step === 1 ? <form onSubmit={next} className="space-y-6" noValidate>
        <FieldGroup className="gap-5">
          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="business-data-source">数据来源（必填）</FieldLabel>
            <FieldContent>
              <Select required value={source} onValueChange={value => { setSource(value); setError(''); if (!manualName.current) setName(dataOptions.find(option => option.value === value)?.label ?? '') }}>
                <SelectTrigger id="business-data-source" className="w-full" aria-invalid={!!error}><SelectValue placeholder="请选择需要填报的数据" /></SelectTrigger>
                <SelectContent position="popper">
                  {business?.dataSource && !dataOptions.some(option => option.value === business.dataSource?.value) && <SelectItem disabled value={business.dataSource.value}>{business.dataSource.label}（不可用）</SelectItem>}
                  {dataOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                  {dataOptions.length === 0 && <p role="status" className="px-3 py-4 text-center text-sm text-muted-foreground">暂无可填报数据</p>}
                </SelectContent>
              </Select>
              {error && <FieldError>{error}</FieldError>}
            </FieldContent>
          </Field>
          <Field><FieldLabel htmlFor="business-name">业务名称</FieldLabel><Input id="business-name" value={name} onChange={event => { manualName.current = true; setName(event.target.value) }} /></Field>
        </FieldGroup>
        <DialogFooter><Button type="button" variant="outline" onClick={onCancel}>取消</Button><Button type="submit" disabled={!sourceOption}>下一步</Button></DialogFooter>
      </form> : saved && <>
        <BusinessPositionField businessId={saved.id} position={saved.position} adapter={adapter} canPick={canPick} reselect={reselect} onCandidate={setCandidate} onWaiting={setWaiting} />
        <DialogFooter><Button type="button" variant="outline" disabled={waiting} onClick={() => { advancing.current = false; setStep(1) }}>上一步</Button><Button type="button" disabled={waiting || !candidate} onClick={() => { if (candidate) { onSavePosition(saved.id, candidate); onCancel() } }}>保存</Button></DialogFooter>
      </>}
    </DialogContent>
  </Dialog>
}
