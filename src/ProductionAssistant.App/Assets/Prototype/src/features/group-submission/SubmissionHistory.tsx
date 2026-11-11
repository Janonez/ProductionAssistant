import { useCallback, useEffect, useRef, useState } from 'react'
import { invoke } from '../../bridge/index'
import { Button } from '../../components/ui/button'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '../../components/ui/table'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../../components/ui/dialog'
import type { SubmissionRun } from './types'

const sources: Record<string, string> = { manual: '手动填报', 'background-test': '后台测试', automatic: '定时填报' }
export function SubmissionHistory({ id }: { id?: string }) {
  const [runs, setRuns] = useState<SubmissionRun[]>([]), [error, setError] = useState(''), [loading, setLoading] = useState(false)
  const generation = useRef(0), inFlight = useRef(false)
  const load = useCallback(async () => {
    if (!id || inFlight.current) return
    const current = ++generation.current
    inFlight.current = true; setLoading(true); setError('')
    try {
      const result = await invoke<{ runs: SubmissionRun[] }>('tencentSheet.runs', { id })
      if (!Array.isArray(result.runs)) throw new Error('历史记录响应无效，请重新读取。')
      if (current === generation.current) setRuns(result.runs)
    } catch (failure) {
      if (current === generation.current) setError(failure instanceof Error ? failure.message : String(failure))
    } finally {
      if (current === generation.current) { inFlight.current = false; setLoading(false) }
    }
  }, [id])
  useEffect(() => {
    inFlight.current = false; setRuns([]); void load()
    return () => { generation.current++; inFlight.current = false }
  }, [load])
  return <Card><CardHeader className="flex flex-row items-center justify-between gap-3"><CardTitle><h2>历史记录</h2></CardTitle><Button variant="outline" disabled={!id || loading} onClick={load}>刷新记录</Button></CardHeader>
    <CardContent className="space-y-4">
      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      {loading && <p role="status" className="text-sm text-muted-foreground">正在读取历史记录…</p>}
      <Table aria-label="集团填报历史"><TableHeader><TableRow>{['填报日期', '执行时间', '执行方式', '执行结果', '详情'].map(label => <TableHead key={label}>{label}</TableHead>)}</TableRow></TableHeader>
        <TableBody>{runs.map(run => <TableRow key={run.id}>
          <TableCell>{run.businessDate ?? '未记录'}</TableCell><TableCell>{run.time}</TableCell><TableCell>{sources[run.source ?? ''] ?? run.source ?? '未记录'}</TableCell><TableCell>{run.status}</TableCell>
          <TableCell><Dialog><DialogTrigger asChild><Button variant="ghost" size="sm" aria-label={`查看 ${run.time} 的填报详情`}>查看详情</Button></DialogTrigger>
            <DialogContent className="max-h-[80svh] overflow-y-auto"><DialogTitle>填报详情</DialogTitle><DialogDescription>{run.businessDate ?? '日期未记录'} · {run.time} · {run.status}</DialogDescription>
              {run.phase && <p className="text-sm">执行阶段：{run.phase}</p>}{run.message && <p className="text-sm break-words">{run.message}</p>}{run.error && <p className="text-sm break-words text-destructive">{run.error}</p>}
              {run.data?.length ? <Table aria-label="历史取数快照"><TableHeader><TableRow><TableHead>字段</TableHead><TableHead>取数值</TableHead><TableHead>来源</TableHead></TableRow></TableHeader><TableBody>{run.data.map(row => <TableRow key={row.Id}><TableCell>{row.Name}</TableCell><TableCell>{row.Value} {row.Unit}</TableCell><TableCell>{row.Source}</TableCell></TableRow>)}</TableBody></Table> : <p className="text-sm text-muted-foreground">此记录未保存字段取数快照。</p>}
              <p className="text-sm text-muted-foreground">旧记录不包含逐字段保存结果，取数快照不代表文档已保存。结果待确认时请先核对原记录。</p>
            </DialogContent>
          </Dialog></TableCell>
        </TableRow>)}{!runs.length && !loading && !error && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">{id ? '暂无执行记录。' : '请先配置文档连接。'}</TableCell></TableRow>}</TableBody>
      </Table>
    </CardContent>
  </Card>
}
