import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Skeleton } from '../../components/ui/skeleton'
import { Card, CardContent } from '../../components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '../../components/ui/table'

const metrics = ['下料量', '焊接量', '板材入库量', '型材入库量']

export function SubmissionWorkbenchSkeleton() {
  return <Card role="status" aria-label="正在读取集团填报配置" aria-busy="true"><CardContent className="space-y-5">
    <div aria-hidden="true" className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-9 w-44" /></div>
    <Table aria-hidden="true"><TableHeader><TableRow><TableHead>生产指标</TableHead><TableHead className="text-right">数值</TableHead><TableHead className="w-20 text-right">单位</TableHead></TableRow></TableHeader>
      <TableBody>{metrics.map(name => <TableRow key={name}><TableCell className="font-medium">{name}</TableCell><TableCell><Skeleton className="ml-auto h-4 w-24" /></TableCell><TableCell className="text-right text-muted-foreground">吨</TableCell></TableRow>)}</TableBody>
    </Table>
    <Skeleton aria-hidden="true" className="h-9 w-28" />
  </CardContent></Card>
}

export function SubmissionDataTable() {
  return <Table aria-label="本次填报数据">
    <TableHeader><TableRow><TableHead>生产指标</TableHead><TableHead className="text-right">数值</TableHead><TableHead className="w-20 text-right">单位</TableHead></TableRow></TableHeader>
    <TableBody>{metrics.map(name => <TableRow key={name}>
      <TableCell className="font-medium">{name}</TableCell><TableCell className="text-right text-muted-foreground" aria-label={`${name}尚未取数`}>—</TableCell><TableCell className="text-right text-muted-foreground">吨</TableCell>
    </TableRow>)}</TableBody>
  </Table>
}

export function SubmissionWorkbench({ businessDate, connected, configure }: { businessDate?: string; connected: boolean; configure: () => void }) {
  const [date, setDate] = useState(businessDate ?? '')
  return <Card><CardContent className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="space-y-2"><label htmlFor="submission-date" className="text-sm font-medium">填报日期</label>
        <Input id="submission-date" className="w-44" type="date" value={date} disabled={!connected} onChange={event => setDate(event.target.value)} /></div>
      <p className="text-sm text-muted-foreground">获取数据 → 检查目标 → 确认填报</p>
    </div>
    <SubmissionDataTable />
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground" role="status">{connected ? '取数、目标检查与填报尚未接入。当前可在设置中检查文档连接。' : '请先在设置中连接目标文档。'}</p>
      <Button onClick={configure}>{connected ? '检查文档连接' : '配置文档连接'}</Button>
    </div>
  </CardContent></Card>
}
