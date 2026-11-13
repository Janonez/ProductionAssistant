import { useEffect, useRef, useState } from 'react'
import { Check, MoreHorizontal, Plus } from 'lucide-react'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Empty, EmptyContent } from '../../components/ui/empty'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog'
import { BusinessConfigDialog } from './BusinessConfigDialog'
import { createSubmissionSettingsMock } from './submission-settings.mock'
import type { BusinessDataOption, BusinessListItem, SubmissionSettingsAdapter } from './business-configuration.types'

export function BusinessConfiguration({ initialItems, dataOptions = [], adapter: suppliedAdapter, canPick = false }: {
  initialItems?: readonly BusinessListItem[]
  dataOptions?: readonly BusinessDataOption[]
  adapter?: SubmissionSettingsAdapter
  canPick?: boolean
}) {
  const [adapter] = useState(() => suppliedAdapter ?? createSubmissionSettingsMock())
  const [items, setItems] = useState<readonly BusinessListItem[]>(() => structuredClone(initialItems ?? adapter.readBusinessDrafts()))
  useEffect(() => { adapter.writeBusinessDrafts(items) }, [adapter, items])
  const [editor, setEditor] = useState<{ business?: BusinessListItem; step?: 1 | 2; reselect?: boolean } | null>(null)
  const [removal, setRemoval] = useState<BusinessListItem | null>(null)
  const newButton = useRef<HTMLButtonElement>(null), returnFocus = useRef<HTMLElement | null>(null), openingDialog = useRef(false)
  function restoreFocus(event: Event) {
    event.preventDefault(); openingDialog.current = false
    if (returnFocus.current?.isConnected) returnFocus.current.focus()
    else newButton.current?.focus()
  }
  function create(target: HTMLElement) { returnFocus.current = target; setEditor({}) }
  return <section aria-labelledby="business-configuration-title" className="min-w-0 space-y-3">
    <header className="flex items-center justify-between gap-3"><h2 id="business-configuration-title" className="text-base font-semibold">业务配置</h2>
      {items.length > 0 && <Button ref={newButton} size="sm" onClick={event => create(event.currentTarget)}><Plus />新建业务</Button>}
    </header>
    {items.length ? <div className="overflow-hidden rounded-md border"><Table aria-label="业务列表" className="table-fixed">
      <TableHeader><TableRow><TableHead>业务</TableHead><TableHead>数据来源</TableHead><TableHead>填报位置</TableHead><TableHead className="w-14 text-center">操作</TableHead></TableRow></TableHeader>
      <TableBody>{items.map(item => <TableRow key={item.id} tabIndex={0} aria-label={'编辑业务：' + item.name} className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={event => { returnFocus.current = event.currentTarget; setEditor({ business: item }) }}
        onKeyDown={event => { if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); returnFocus.current = event.currentTarget; setEditor({ business: item }) } }}>
        <TableCell className="whitespace-normal font-medium break-words">{item.name}</TableCell>
        <TableCell className="whitespace-normal break-words">{item.dataSource?.label ?? '未关联数据'}</TableCell>
        <TableCell>{item.position.status === 'configured' ? <span className="flex min-w-0 flex-wrap items-center gap-1.5">
          <Badge variant="outline" aria-label="位置已配置" className="border-emerald-600/30 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400"><Check aria-hidden="true" /></Badge>
          <span className="min-w-0 truncate font-mono text-xs" title={item.position.range}>{item.position.range ?? '—'}</span>
        </span> : <Badge variant="secondary">未设置位置</Badge>}</TableCell>
        <TableCell className="text-center" onClick={event => event.stopPropagation()}>
          <DropdownMenu modal={false}><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label={'业务操作：' + item.name} onClick={event => { returnFocus.current = event.currentTarget }}><MoreHorizontal /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" onCloseAutoFocus={event => { if (openingDialog.current) event.preventDefault() }}>
              <DropdownMenuItem onSelect={() => { openingDialog.current = true; setEditor({ business: item }) }}>编辑</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => { openingDialog.current = true; setEditor({ business: item, step: 2, reselect: true }) }}>重新选取位置</DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onSelect={() => { openingDialog.current = true; setRemoval(item) }}>删除</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>)}</TableBody>
    </Table></div> : <Empty><EmptyContent><Button ref={newButton} size="sm" onClick={event => create(event.currentTarget)}><Plus />新建业务</Button></EmptyContent></Empty>}
    {editor && <BusinessConfigDialog business={editor.business} dataOptions={dataOptions} adapter={adapter} canPick={canPick} initialStep={editor.step} reselect={editor.reselect}
      onSaveMetadata={value => {
        const existing = items.find(item => item.id === value.id)
        const item: BusinessListItem = { ...value, id: value.id ?? crypto.randomUUID(), position: existing?.position ?? { status: 'unconfigured' } }
        setItems(current => existing ? current.map(entry => entry.id === item.id ? item : entry) : [...current, item])
        return item
      }}
      onSavePosition={(id, position) => setItems(current => current.map(item => item.id === id ? { ...item, position } : item))}
      onCancel={() => setEditor(null)} onCloseAutoFocus={restoreFocus} />}
    <AlertDialog open={!!removal} onOpenChange={open => { if (!open) setRemoval(null) }}>
      <AlertDialogContent onCloseAutoFocus={restoreFocus}><AlertDialogHeader><AlertDialogTitle>删除业务</AlertDialogTitle><AlertDialogDescription>确定删除“{removal?.name}”吗？删除后无法恢复。</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter><AlertDialogCancel>取消</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={() => { setItems(current => current.filter(item => item.id !== removal?.id)); setRemoval(null) }}>删除业务</AlertDialogAction></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </section>
}
