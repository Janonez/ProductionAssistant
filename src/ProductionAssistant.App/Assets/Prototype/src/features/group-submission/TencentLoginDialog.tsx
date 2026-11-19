import { useEffect, useRef, useState } from 'react'
import { CircleAlert, CircleCheck } from 'lucide-react'
import { invoke } from '../../bridge/index'
import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Label } from '../../components/ui/label'
import { Skeleton } from '../../components/ui/skeleton'
import type { DocumentSessionEvidence } from './DocumentConnectionItem'

type Snapshot = DocumentSessionEvidence
type Action = 'Begin' | 'Refresh' | 'Status' | 'Consent'
type Phase = NonNullable<Snapshot['loginState']>
const terminal = new Set<Phase>(['expired', 'rejected', 'timeout', 'failed', 'cancelled'])
const preparing = (state: Phase) => state === 'starting-browser' || state === 'getting-qr'
const successDisplayMs = 900
const agreements = [
  { kind: 'service', title: '《用户协议》', url: 'https://docs.qq.com/doc/p/41c65c813fe78d2f262bf35b825c214f0f459bfe' },
  { kind: 'privacy', title: '《隐私政策》', url: 'https://docs.qq.com/doc/p/79d8f25f4f022ccca80949ea89b3fe8a137d8940' },
] as const

export function TencentLoginDialog({ open, documentUrl, id, configRevision, onOpenChange, onVerified }: {
  open: boolean; documentUrl: string; id?: string; configRevision?: number
  onOpenChange: (open: boolean) => void; onVerified: (result: Snapshot) => void
}) {
  const [view, setView] = useState<{ phase: Phase; qrImage?: string }>({ phase: 'starting-browser' })
  const [agreementAccepted, setAgreementAccepted] = useState(false)
  const [agreementError, setAgreementError] = useState('')
  const retry = useRef<() => void>(() => {})
  const accept = useRef<() => void>(() => {})
  useEffect(() => {
    if (!open) { setView({ phase: 'starting-browser' }); setAgreementAccepted(false); return }
    let active = true, inFlight = false, timer: number | undefined, operationId: string | undefined, phase: Phase = 'starting-browser'
    let phaseDeadline = 0, consentGiven = false
    const cancel = (loginOperationId?: string) => {
      if (loginOperationId) void invoke('tencentSheet.sessionLoginCancel', { documentUrl, loginOperationId, ...(id ? { id } : {}), ...(configRevision === undefined ? {} : { configRevision }) }, 15000).catch(() => {})
    }
    const present = (next: Phase, qrImage?: string) => {
      phase = next
      setView(previous => ({
        phase: next, qrImage: next === 'waiting' ? qrImage ?? previous.qrImage : undefined,
      }))
    }
    const showLoading = (phase: Phase) => { setAgreementError(''); present(phase) }
    const call = async (action: Action) => {
      if (!active || inFlight) return
      inFlight = true
      window.clearTimeout(timer)
      if (action === 'Consent') { consentGiven = true; setAgreementAccepted(true) }
      if (action !== 'Status') showLoading(action === 'Consent' ? 'getting-qr' : 'starting-browser')
      try {
        const result = await invoke<Snapshot>('tencentSheet.sessionLogin' + action, {
          documentUrl, ...(id ? { id } : {}), ...(configRevision === undefined ? {} : { configRevision }),
          ...(operationId ? { loginOperationId: operationId } : {}),
        }, 35000)
        if (!active) { if (result?.loginState !== 'authenticated') cancel(result?.loginOperationId ?? operationId); return }
        if (action === 'Status' && result?.code === 'OperationBusy') {
          if (phaseDeadline && Date.now() >= phaseDeadline) {
            present(phase === 'waiting' ? 'expired' : 'timeout')
            return
          }
          timer = window.setTimeout(() => { void call('Status') }, 750)
          return
        }
        if (result?.targetDocumentUrl && result.targetDocumentUrl !== documentUrl) {
          present('failed'); return
        }
        const next = result?.loginState ?? (result?.code === 'SessionTimeout' ? 'timeout' : 'failed')
        if (result?.loginOperationId) operationId = result.loginOperationId
        if (result?.code === 'LoginSuperseded') {
          operationId = undefined
          if (action === 'Refresh') { timer = window.setTimeout(() => { void call('Begin') }, 0); return }
        }
        if (next === 'authenticated') {
          if (result.authentication !== 'authenticated' || result.authenticationSource !== 'server' || result.authenticationStale) {
            present('failed'); return
          }
          operationId = undefined
          setAgreementAccepted(true)
          present('authenticated')
          onVerified(result)
          timer = window.setTimeout(() => onOpenChange(false), successDisplayMs)
          return
        }
        const until = Date.parse(result?.loginWaitUntil ?? '')
        const qrImage = result?.qrImage ?? undefined
        if (next === 'waiting' && ((qrImage && (!/^data:image\/png;base64,[A-Za-z0-9+/]+=*$/.test(qrImage) || qrImage.length > 133360))
          || (!qrImage && phase !== 'waiting') || !Number.isFinite(until))) {
          present('failed'); return
        }
        phaseDeadline = Number.isFinite(until) ? until : 0
        if (next === 'consent') {
          if (consentGiven && action !== 'Consent') {
            present('getting-qr')
            timer = window.setTimeout(() => { void call('Consent') }, 0)
            return
          }
          setAgreementAccepted(false)
        }
        if ((action === 'Status' && next === 'getting-qr') || next === 'waiting' || next === 'scanned' || next === 'confirming') setAgreementAccepted(true)
        present(next, qrImage)
        if (terminal.has(next)) return
        const delay = next === 'consent' && Number.isFinite(until) ? Math.max(0, until - Date.now())
          : preparing(next) ? 0 : next === 'confirming' ? 250 : 750
        timer = window.setTimeout(() => { void call('Status') }, delay)
      } catch {
        if (active) present('failed')
        else cancel(operationId)
      } finally { inFlight = false }
    }
    retry.current = () => { void call(operationId ? 'Refresh' : 'Begin') }
    accept.current = () => {
      if (!active || consentGiven || terminal.has(phase)) return
      consentGiven = true
      setAgreementAccepted(true)
      if (phase === 'consent') void call('Consent')
    }
    setAgreementAccepted(false)
    showLoading('starting-browser')
    queueMicrotask(() => { void call('Begin') })
    return () => {
      active = false
      window.clearTimeout(timer)
      if (!inFlight) cancel(operationId)
    }
  }, [open, documentUrl, id, configRevision, onOpenChange, onVerified])

  async function openAgreement(kind: 'service' | 'privacy') {
    setAgreementError('')
    try { await invoke('tencentSheet.sessionLoginAgreement', { kind }) }
    catch { setAgreementError('暂时无法打开腾讯官方协议，请稍后重试。') }
  }

  const phase = view.phase
  const failure = terminal.has(phase)
  const done = phase === 'authenticated'
  const awaitingConsent = !agreementAccepted && (preparing(phase) || phase === 'consent')
  const scanned = phase === 'scanned' || phase === 'confirming'
  const loadingQr = !awaitingConsent && preparing(phase)
  const hasQr = phase === 'waiting' && !!view.qrImage
  const failureText = phase === 'expired' ? '二维码已过期' : phase === 'rejected' ? '手机端已拒绝登录'
    : phase === 'timeout' ? '扫码登录超时' : '获取二维码失败'
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent showCloseButton={false} aria-describedby={undefined} className="w-[360px] gap-0 overflow-hidden rounded-xl p-0 sm:max-w-[360px]">
      <div className="flex flex-col items-center px-4 pt-3 sm:px-6">
        <DialogHeader className="mb-3 w-full"><DialogTitle className="flex h-11 items-center justify-center text-center text-[15px] font-medium">企业微信扫码登录</DialogTitle></DialogHeader>
        <div className={'relative grid size-[212px] shrink-0 place-items-center rounded-[12px] border text-center ' + (hasQr ? 'border-border bg-white' : 'border-dashed border-muted-foreground/40 bg-background')}
          aria-label="二维码区域" data-phase={phase}>
          {loadingQr && <Skeleton className="pointer-events-none absolute inset-0 m-auto size-[180px] bg-muted-foreground/20 [animation-duration:1.1s] motion-reduce:animate-none" aria-hidden="true" />}
          {hasQr
            ? <img src={view.qrImage} alt="企业微信登录二维码" className="size-[180px] object-contain" />
            : <div role={failure ? 'alert' : 'status'} className="relative flex flex-col items-center gap-3 px-4 text-[15px]">
                {(awaitingConsent || loadingQr) && <span className="text-[13px] text-muted-foreground">
                  {awaitingConsent ? '同意协议后获取二维码' : '正在获取二维码…'}
                </span>}
                {(scanned || done) && <>
                  <CircleCheck className="size-9 text-emerald-700 dark:text-emerald-400" role="img" aria-label={done ? '登录成功' : '已扫码'} />
                  <span>{done ? '登录成功' : '已扫码'}</span>
                  <span className="min-h-5 text-[13px] leading-5 text-muted-foreground">
                    {phase === 'scanned' ? '请在手机上确认' : null}
                  </span>
                </>}
                {failure && <>
                  <CircleAlert className="size-9 text-amber-700 dark:text-amber-400" role="img" aria-label={failureText} />
                  <span>{failureText}</span>
                  <Button type="button" variant="link" className="h-6 p-0 text-[13px] text-blue-700 dark:text-blue-400" onClick={() => retry.current()}>
                    {phase === 'expired' ? '刷新' : '重试'}
                  </Button>
                </>}
              </div>}
        </div>
        <div className="relative mt-2 flex h-11 w-full items-center justify-center">
          <Checkbox id="tencent-login-agreement" className="mr-2 size-[15px]" checked={agreementAccepted} disabled={!awaitingConsent}
            onCheckedChange={checked => { if (checked === true) accept.current() }} />
          <Label htmlFor="tencent-login-agreement" className="block text-[13px] leading-5 font-normal text-muted-foreground">
            我已阅读并同意
            {agreements.map(({ kind, title, url }, index) => <span key={kind}>
              {index === 1 && '和'}
              <Button asChild variant="link" className="inline h-auto p-0 text-[13px] font-normal">
                <a href={url} onClick={event => { event.preventDefault(); event.stopPropagation(); void openAgreement(kind) }}>{title}</a>
              </Button>
            </span>)}
          </Label>
          {agreementError && <span role="alert" className="sr-only">{agreementError}</span>}
        </div>
      </div>
      <DialogFooter className="border-t border-border px-4 py-3 sm:px-5">
        <Button type="button" variant={done ? 'default' : 'secondary'} className="h-11 w-full rounded-[10px] text-[15px] font-normal"
          onClick={() => onOpenChange(false)}>{done ? '完成' : '取消'}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}
