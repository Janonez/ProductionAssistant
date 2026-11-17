import { useEffect, useRef, useState } from 'react'
import { invoke } from '../../bridge/index'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import { Spinner } from '../../components/ui/spinner'
import type { DocumentSessionEvidence } from './DocumentConnectionItem'

const reasons: Record<string, string> = {
  'authentication-required': '请先登录后检查。', 'authentication-unconfirmed': '登录状态尚未确认，请重新检查。',
  'document-read-only': '当前账号只有文档查看权限。', 'document-permission-unconfirmed': '文档编辑权限尚未确认。',
  'document-access-denied': '当前账号无法访问此文档。',
  'protected-read-only': '此位置受保护，当前账号无法编辑。', 'range-privilege-missing': '此位置受保护，暂未取得有效的区域权限，请重新检查。',
  'range-privilege-unvalidated': '此位置受保护，当前区域权限尚不能确认允许填写。',
  'sheet-unavailable': '指定工作表不存在或尚未加载，请核对名称后重试。',
  'coordinate-out-of-bounds': '指定位置超出工作表范围。', 'other-restrictions-unconfirmed': '尚未排除该位置的其他编辑限制。',
  'verified-prerequisites': '已满足当前检查的填写前置条件，实际保存仍需填报时确认。',
}

export function DocumentPermissionCheck({ documentUrl, id, configRevision, disabled, onActive, onVerified }: {
  documentUrl: string; id?: string; configRevision: number; disabled: boolean
  onActive: (value: boolean) => void; onVerified: (result: DocumentSessionEvidence) => void
}) {
  const [sheet, setSheet] = useState(''), [address, setAddress] = useState(''), [result, setResult] = useState<DocumentSessionEvidence>()
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [expired, setExpired] = useState(false)
  const active = useRef(false), mounted = useRef(false)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; onActive(false) } }, [onActive])
  useEffect(() => {
    const expires = result?.permissionCheck?.expiresAt
    if (!expires) return
    const timer = window.setTimeout(() => setExpired(true), Math.max(0, Date.parse(expires) - Date.now()))
    return () => window.clearTimeout(timer)
  }, [result])
  const clear = () => { setResult(undefined); setError(''); setExpired(false) }
  async function check() {
    if (active.current || disabled || !sheet.trim() || !address.trim()) return
    active.current = true; setBusy(true); onActive(true); clear()
    try {
      const evidence = await invoke<DocumentSessionEvidence>('tencentSheet.sessionVerify', {
        documentUrl, ...(id ? { id, configRevision } : {}),
        permissionTargets: [{ sheetName: sheet.trim(), address: address.trim().toUpperCase() }], refreshPermissions: true,
      }, 60000)
      if (!mounted.current) return
      if (evidence.targetDocumentUrl !== documentUrl || (id && evidence.configRevision !== configRevision)) throw new Error('文档配置已变化，请重新检查。')
      if (!evidence.permissionCheck && evidence.authentication === 'authenticated') throw new Error(evidence.message || '权限检查结果无效，请重试。')
      setResult(evidence); onVerified(evidence)
    } catch (failure) { if (mounted.current) setError(failure instanceof Error ? failure.message : '权限检查失败，请重试。') }
    finally { active.current = false; if (mounted.current) { setBusy(false); onActive(false) } }
  }
  const target = result?.permissionCheck?.targets[0]
  return <details className="rounded-lg border p-3" aria-label="填写位置权限检查">
    <summary className="cursor-pointer text-sm font-medium">检查填写位置权限</summary>
    <div className="mt-3 space-y-3">
      <p className="text-xs text-muted-foreground">仅后台读取指定位置，不填写数据。请使用文档中的完整工作表名称。</p>
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-40 flex-1 space-y-1"><Label htmlFor="permission-sheet">工作表名称</Label><Input id="permission-sheet" value={sheet} disabled={disabled || busy} onChange={e => { setSheet(e.target.value); clear() }} /></div>
        <div className="w-28 space-y-1"><Label htmlFor="permission-address">单元格</Label><Input id="permission-address" placeholder="例如 A1" value={address} disabled={disabled || busy} onChange={e => { setAddress(e.target.value); clear() }} /></div>
        <Button type="button" variant="outline" disabled={disabled || busy || !sheet.trim() || !/^[A-Za-z]{1,3}[1-9][0-9]{0,6}$/.test(address.trim())} onClick={() => void check()}>{busy && <Spinner />} {busy ? '权限核验中' : '检查位置'}</Button>
      </div>
      <div role="status" aria-live="polite" className="space-y-2 text-sm">
        {result && <div className="flex flex-wrap gap-2"><Badge variant="outline">登录：{expired ? '需重新核验' : result.authentication === 'authenticated' ? '已确认' : result.authentication === 'required' ? '需要登录' : '未知'}</Badge><Badge variant="outline">文档：{expired ? '需重新核验' : result.editPermission === 'editable' ? '可编辑' : result.editPermission === 'read-only' ? '只有查看权限' : '权限未知'}</Badge></div>}
        {target && <p>{target.sheetName} · {target.address}：{expired ? '检查已过期，请重新检查。' : `${target.protection === 'protected' ? '受保护' : target.protection === 'unprotected' ? '未匹配保护区域' : '保护状态未知'}；${target.eligibility === 'eligible' ? '满足填写前置条件' : target.eligibility === 'denied' ? '无法填写' : '填写资格未知'}。${reasons[target.reason] || '区域模型或权限尚未确认，请重新检查。'}`}</p>}
        {result && !target && <p>{result.message}</p>}
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  </details>
}
