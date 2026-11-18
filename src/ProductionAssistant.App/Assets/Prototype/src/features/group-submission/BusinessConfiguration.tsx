import { useRef, useState } from 'react'
import { MoreHorizontal, Plus } from 'lucide-react'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog'
import { BusinessConfigDialog } from './BusinessConfigDialog'
import type { BusinessDataOption, BusinessListItem, ConfigurationSaveResult, SaveConfiguration, SubmissionConfiguration, SubmissionPositionAdapter } from './business-configuration.types'

export function BusinessConfiguration({ items, dataOptions, adapter, save, refresh, canPick = false, connected = canPick }: {
  items: readonly BusinessListItem[]
  dataOptions: readonly BusinessDataOption[]
  adapter: SubmissionPositionAdapter
  save: SaveConfiguration
  refresh: () => Promise<SubmissionConfiguration | undefined>
  canPick?: boolean
  connected?: boolean
}) {
  const [editor, setEditor] = useState<{ business?: BusinessListItem } | null>(null)
  const [removal, setRemoval] = useState<BusinessListItem | null>(null)
  const [removalError, setRemovalError] = useState<ConfigurationSaveResult>()
  const [removing, setRemoving] = useState(false)
  const newButton = useRef<HTMLButtonElement>(null), returnFocus = useRef<HTMLElement | null>(null), openingDialog = useRef(false)

  async function remove() {
    if (!removal || removing) return
    setRemoving(true)
    setRemovalError(undefined)
    const result = await save({ deleteBusinessId: removal.id })
    if (result.configuration) setRemoval(null)
    else setRemovalError(result)
    setRemoving(false)
  }
  function restoreFocus(event: Event) {
    event.preventDefault(); openingDialog.current = false
    if (returnFocus.current?.isConnected) returnFocus.current.focus()
    else newButton.current?.focus()
  }
  function create(target: HTMLElement) { returnFocus.current = target; setEditor({}) }
  return <section aria-labelledby="business-configuration-title" className="min-w-0 space-y-3">
    <header className="flex items-center justify-between gap-3"><h2 id="business-configuration-title" className="text-base font-semibold">业务配置</h2>
      <Button ref={newButton} size="sm" variant={items.length ? 'outline' : 'default'} disabled={!connected} onClick={event => create(event.currentTarget)}><Plus aria-hidden="true" />新建业务</Button>
    </header>
    {items.length ? <div className="overflow-hidden rounded-md border"><Table aria-label="业务列表" className="table-fixed">
      <TableHeader><TableRow><TableHead>业务名称</TableHead><TableHead className="w-14 text-center">操作</TableHead></TableRow></TableHeader>
      <TableBody>{items.map(item => <TableRow key={item.id} tabIndex={0} aria-label={'编辑业务：' + item.name} className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={event => { returnFocus.current = event.currentTarget; setEditor({ business: item }) }}
        onKeyDown={event => { if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); returnFocus.current = event.currentTarget; setEditor({ business: item }) } }}>
        <TableCell className="whitespace-normal font-medium break-words"><div className="flex flex-wrap items-center gap-2">
          <span className="min-w-0">{item.name}</span>
          {item.position.status !== 'configured' && <Badge variant="secondary">{item.position.status === 'invalid' ? '需要重新设置位置' : '未设置位置'}</Badge>}
        </div></TableCell>
        <TableCell className="text-center" onClick={event => event.stopPropagation()}>
          <DropdownMenu modal={false}><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label={'更多操作：' + item.name}
            onFocus={event => { returnFocus.current = event.currentTarget }} onPointerDown={event => { returnFocus.current = event.currentTarget }}><MoreHorizontal aria-hidden="true" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" onCloseAutoFocus={event => { if (openingDialog.current) event.preventDefault() }}>
              <DropdownMenuItem onSelect={() => { openingDialog.current = true; setEditor({ business: item }) }}>编辑</DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onSelect={() => { openingDialog.current = true; setRemovalError(undefined); setRemoval(item) }}>删除</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>)}</TableBody>
    </Table></div> : connected
      ? <button type="button" className="w-full rounded-md border border-dashed px-4 py-2 text-left text-sm hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-ring" onClick={event => create(event.currentTarget)}>
        <span className="block font-medium">尚无业务</span>
        <span className="block text-muted-foreground">业务由数据来源与文档中的填报位置构成，例如：设备运行时长，位于 AA9。</span>
      </button>
      : <p className="rounded-md border border-dashed bg-muted/40 px-4 py-3 text-sm text-muted-foreground">连接文档后方可新建业务</p>}
    {editor && <BusinessConfigDialog business={editor.business} dataOptions={dataOptions} adapter={adapter} canPick={canPick} refresh={refresh}
      otherNames={items.filter(item => item.id !== editor.business?.id).map(item => item.name)} onSave={business => save({ business })}
      onCancel={() => setEditor(null)} onCloseAutoFocus={restoreFocus} />}
    <AlertDialog open={!!removal} onOpenChange={open => { if (!open && !removing) setRemoval(null) }}>
      <AlertDialogContent onCloseAutoFocus={restoreFocus}><AlertDialogHeader><AlertDialogTitle>删除业务</AlertDialogTitle><AlertDialogDescription>确定删除“{removal?.name}”吗？删除后无法恢复。</AlertDialogDescription></AlertDialogHeader>
        {removalError && <Alert variant="destructive"><AlertDescription>{removalError.fieldErrors?.deleteBusinessId ?? removalError.error ?? '删除失败。'}
          {removalError.conflict && <Button variant="outline" size="sm" onClick={async () => { if (await refresh()) setRemovalError(undefined) }}>刷新配置</Button>}
        </AlertDescription></Alert>}
        <AlertDialogFooter><AlertDialogCancel disabled={removing}>取消</AlertDialogCancel><Button variant="destructive" disabled={removing || removalError?.conflict} onClick={() => void remove()}>{removing ? '删除中…' : '删除业务'}</Button></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </section>
}
