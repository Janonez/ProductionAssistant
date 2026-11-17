import { useEffect, useRef, useState } from 'react'
import { invoke } from '../../bridge/index'
import { Button } from '../../components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Spinner } from '../../components/ui/spinner'
import type { DocumentSessionEvidence } from './DocumentConnectionItem'

type Snapshot = DocumentSessionEvidence
export function TencentLoginDialog({ open, documentUrl, id, configRevision, onOpenChange, onVerified }: {
  open: boolean; documentUrl: string; id?: string; configRevision?: number
  onOpenChange: (open: boolean) => void; onVerified: (result: Snapshot) => void
}) {
  const [snapshot, setSnapshot] = useState<Snapshot>(), [busy, setBusy] = useState(false), [error, setError] = useState(''), [agreementError, setAgreementError] = useState('')
  const generation = useRef(0), operationId = useRef<string | undefined>(undefined), refresh = useRef<() => void>(() => {})
  useEffect(() => {
    if (!open) return
    const current = ++generation.current
    let timer: number | undefined, inFlight = false, waitUntil = Date.now() + 180000, currentState: Snapshot['loginState']
    setAgreementError('')
    const payload = () => ({ documentUrl, ...(id ? { id } : {}), ...(configRevision !== undefined ? { configRevision } : {}), ...(operationId.current ? { loginOperationId: operationId.current } : {}) })
    const cancel = (loginOperationId?: string) => {
      if (loginOperationId) void invoke('tencentSheet.sessionLoginCancel', { ...payload(), loginOperationId }, 15000).catch(() => {})
    }
    const expire = () => { setSnapshot(undefined); setError('本地等待已超时，请重新开始。'); cancel(operationId.current); operationId.current = undefined; currentState = undefined }
    const call = async (action: 'Begin' | 'Refresh' | 'Status' | 'Consent') => {
      if (inFlight || generation.current !== current) return
      inFlight = true
      if (action !== 'Status') { window.clearTimeout(timer); setBusy(true); setSnapshot(undefined); setError('') }
      try {
        const result = await invoke<Snapshot>(`tencentSheet.sessionLogin${action}`, payload(), 35000)
        if (generation.current !== current) { cancel(result?.loginOperationId ?? undefined); return }
        if (result?.targetDocumentUrl && result.targetDocumentUrl !== documentUrl) throw new Error('文档配置已变化，请重新扫码。')
        if (result?.loginOperationId) operationId.current = result.loginOperationId
        if (result?.loginState === 'authenticated' && result.authentication === 'authenticated' && result.authenticationSource === 'server') {
          setSnapshot(undefined); onVerified(result); onOpenChange(false); return
        }
        if (!result?.loginState || !['loading', 'consent', 'waiting', 'scanned', 'expired'].includes(result.loginState)) {
          setSnapshot(undefined); setError(result?.message || '扫码任务未能继续，请重新开始。'); cancel(operationId.current); operationId.current = undefined; currentState = undefined; return
        }
        if (action !== 'Status' && result.loginState === 'waiting' && (!result.qrImage || !/^data:image\/png;base64,[A-Za-z0-9+/]+=*$/.test(result.qrImage) || result.qrImage.length > 133360)) throw new Error('二维码图像无效，请重试。')
        if (action !== 'Status') {
          const until = Date.parse(result.loginWaitUntil ?? '')
          if (!Number.isFinite(until) || until <= Date.now() || until > Date.now() + 180000) throw new Error('扫码等待期限无效，请重试。')
          waitUntil = until
        }
        currentState = result.loginState
        setSnapshot(value => ({ ...result, qrImage: action === 'Status' ? value?.qrImage : result.qrImage }))
        if (Date.now() >= waitUntil) { expire(); return }
        if (result.loginState === 'consent' || result.loginState === 'expired') { timer = window.setTimeout(expire, waitUntil - Date.now()); return }
        timer = window.setTimeout(() => { void call('Status') }, 2000)
      } catch (failure) {
        if (generation.current === current) { setSnapshot(undefined); setError(failure instanceof Error ? failure.message : '暂时无法读取扫码状态。'); cancel(operationId.current); operationId.current = undefined }
      } finally { inFlight = false; if (generation.current === current) setBusy(false) }
    }
    operationId.current = undefined
    refresh.current = () => { void call(currentState === 'consent' ? 'Consent' : operationId.current ? 'Refresh' : 'Begin') }
    queueMicrotask(() => { if (generation.current === current) void call('Begin') })
    return () => { generation.current++; window.clearTimeout(timer); cancel(operationId.current); operationId.current = undefined; setSnapshot(undefined); setBusy(false) }
  }, [open, documentUrl, id, configRevision, onOpenChange, onVerified])
  async function openAgreement(kind: 'service' | 'privacy') {
    setAgreementError('')
    try { await invoke('tencentSheet.sessionLoginAgreement', { kind }) }
    catch { setAgreementError('暂时无法打开腾讯官方协议，请稍后重试。') }
  }
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="sm:max-w-sm"><DialogHeader><DialogTitle>扫码登录腾讯文档</DialogTitle><DialogDescription>使用企业微信扫码并在手机确认。登录会用于当前环境共用会话的腾讯文档。</DialogDescription></DialogHeader>
    <div className="flex min-h-56 flex-col items-center justify-center gap-3" aria-live="polite">
      {busy || snapshot?.loginState === 'loading' ? <Spinner className="size-6" aria-label="正在加载二维码" /> : snapshot?.loginState === 'waiting' && snapshot.qrImage ? <img src={snapshot.qrImage} alt="企业微信登录二维码" className="size-52 bg-white p-1" /> : null}
      <p className="text-sm text-muted-foreground">{error || (busy ? '正在加载二维码…' : snapshot?.message || '正在准备扫码登录…')}</p>
    </div>{snapshot?.loginState === 'consent' && <div className="flex items-center justify-center gap-2 text-sm"><Button type="button" variant="link" size="sm" onClick={() => void openAgreement('service')}>服务协议</Button><Button type="button" variant="link" size="sm" onClick={() => void openAgreement('privacy')}>隐私政策</Button></div>}
    {agreementError && <p role="alert" className="text-sm text-destructive">{agreementError}</p>}
    <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>取消</Button><Button disabled={busy} onClick={() => refresh.current()}>{snapshot?.loginState === 'consent' ? '同意协议并继续' : error ? '重新开始' : '刷新二维码'}</Button></DialogFooter>
  </DialogContent></Dialog>
}
