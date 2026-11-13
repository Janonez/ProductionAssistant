import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Spinner } from '../../components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { BusinessDatePicker } from './BusinessDatePicker'
import { defaultPositionDates, directionText, positionSummary, type BusinessPosition, type ConfiguredPosition, type PickSession, type SubmissionSettingsAdapter } from './business-configuration.types'

type Point = { date: string; cell?: string; status: 'idle' | 'waiting' | 'selected' }
export function BusinessPositionField({ businessId, position, adapter, canPick, reselect = false, onCandidate, onWaiting }: {
  businessId: string
  position: BusinessPosition
  adapter: SubmissionSettingsAdapter
  canPick: boolean
  reselect?: boolean
  onCandidate: (position: ConfiguredPosition | undefined) => void
  onWaiting: (waiting: boolean) => void
}) {
  const original = position.status === 'configured' ? position : undefined
  const [review, setReview] = useState(!!original && !reselect)
  const [points, setPoints] = useState<Point[]>(() => {
    const dates = defaultPositionDates()
    return [{ date: original && !reselect ? original.first.date : dates.firstDate, status: 'idle' }, { date: original && !reselect ? original.second.date : dates.secondDate, status: 'idle' }]
  })
  const [candidate, setCandidate] = useState<ConfiguredPosition | undefined>(review ? original : undefined)
  const [message, setMessage] = useState(''), [recognizing, setRecognizing] = useState(false)
  const session = useRef<PickSession | null>(null), unsubscribe = useRef<(() => void) | undefined>(undefined)
  const waiting = points.some(point => point.status === 'waiting')
  useEffect(() => { onWaiting(waiting); return () => onWaiting(false) }, [waiting, onWaiting])
  useEffect(() => () => { unsubscribe.current?.(); session.current?.cancel() }, [])
  useEffect(() => {
    setRecognizing(false)
    if (review) { onCandidate(original); return }
    onCandidate(undefined); setCandidate(undefined)
    if (!points.every(point => point.status === 'selected' && point.cell)) return
    let active = true
    setRecognizing(true); setMessage('')
    adapter.recognizePosition({ date: points[0].date, cell: points[0].cell! }, { date: points[1].date, cell: points[1].cell! })
      .then(result => { if (active) { setCandidate(result ?? undefined); onCandidate(result ?? undefined); if (!result) setMessage('两个位置没有规律，请重新选择') } })
      .catch(error => { if (active) setMessage(error instanceof Error ? error.message : '无法识别填报位置，请重试') })
      .finally(() => { if (active) setRecognizing(false) })
    return () => { active = false }
  }, [adapter, points, review, original, onCandidate])
  function reset() {
    const dates = defaultPositionDates()
    setReview(false); setPoints([{ date: dates.firstDate, status: 'idle' }, { date: dates.secondDate, status: 'idle' }]); setMessage('')
  }
  function changeDate(index: number, date: string) {
    setPoints(current => current.map((point, i) => i === index ? { date, status: 'idle' } : index === 0 ? { date: point.date, status: 'idle' } : point))
    setMessage('')
  }
  function start(index: number) {
    if (waiting || !canPick || (index === 1 && !points[0].cell)) return
    unsubscribe.current?.(); session.current?.cancel(); setMessage('')
    setPoints(current => current.map((point, i) => i === index ? { date: point.date, status: 'waiting' } : index === 0 ? { date: point.date, status: 'idle' } : point))
    try {
      const current = adapter.startPick(businessId, points[index].date)
      session.current = current
      unsubscribe.current = current.subscribe(event => {
        if (session.current !== current) return
        if (event.type === 'waiting') return
        session.current = null; unsubscribe.current?.()
        setPoints(values => values.map((point, i) => i === index ? event.type === 'confirmed' ? { date: point.date, status: 'selected', cell: event.cell } : { date: point.date, status: 'idle' } : point))
        if (event.type === 'timeout') setMessage('等待选择超时，请重新选择单元格')
        if (event.type === 'error') setMessage(event.message || '选择单元格失败，请重试')
      })
    } catch (error) {
      setPoints(current => current.map((point, i) => i === index ? { date: point.date, status: 'idle' } : point))
      setMessage(error instanceof Error ? error.message : '无法开始选择单元格，请重试')
    }
  }
  return <div className="space-y-4" aria-label="填报位置设置">
    {adapter.isMock && <Alert role="note"><AlertDescription>当前为本地预览，所选单元格来自示例，不会操作共享文档。</AlertDescription></Alert>}
    {!canPick && <Alert><AlertDescription>请先完成网页配置并登录</AlertDescription></Alert>}
    {review && original ? <>
      <Alert><AlertDescription>{positionSummary(original)}</AlertDescription></Alert>
      <Button type="button" variant="outline" onClick={reset}>重新选取位置</Button>
    </> : <div className="space-y-4">
      {points.map((point, index) => <div key={index} role="group" aria-label={index === 0 ? '第一点' : '第二点'} className="flex min-w-0 flex-wrap items-center gap-2">
        <BusinessDatePicker id={businessId + '-date-' + index} value={point.date} label={index === 0 ? '第一点日期' : '第二点日期'} invalid={false} disabled={waiting} onChange={date => changeDate(index, date)} />
        <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div className="flex min-w-0 flex-wrap items-center gap-1" aria-live="polite">
          {point.status === 'waiting' ? <><Spinner /><span className="text-sm">等待你在文档里点击…</span><Button type="button" variant="ghost" size="sm" onClick={() => session.current?.cancel()}>取消</Button></>
            : point.status === 'selected' ? <><Badge variant="outline"><Check />{point.cell}</Badge><Button type="button" variant="ghost" size="sm" disabled={waiting || !canPick} onClick={() => start(index)}>重新选择</Button></>
              : <Button type="button" variant="outline" size="sm" disabled={waiting || !canPick || (index === 1 && !points[0].cell)} onClick={() => start(index)}>选择单元格</Button>}
        </div>
      </div>)}
      {original && <Button type="button" variant="ghost" size="sm" disabled={waiting} onClick={() => { setReview(true); setMessage('') }}>取消重新选取</Button>}
    </div>}
    {recognizing && <Spinner aria-label="正在识别位置规律" />}
    {message && <Alert variant="destructive"><AlertDescription>{message}</AlertDescription></Alert>}
    {candidate && <>
      {!review && <Alert><AlertDescription>已识别：{directionText(candidate)}</AlertDescription></Alert>}
      <Table aria-label="后续三天填报位置"><TableHeader><TableRow><TableHead>日期</TableHead><TableHead>单元格</TableHead></TableRow></TableHeader><TableBody>{candidate.preview.map(value => <TableRow key={value.date}><TableCell>{value.date}</TableCell><TableCell>{value.cell}</TableCell></TableRow>)}</TableBody></Table>
    </>}
  </div>
}
