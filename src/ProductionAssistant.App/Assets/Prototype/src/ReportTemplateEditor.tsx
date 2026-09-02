import { useEffect, useRef } from 'react'
import { Editor, Extension, Node, mergeAttributes } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import type { DailyField } from './types'

export type DateInsertKind = 'date' | 'year' | 'month' | 'day'
const datePlaceholders: Record<DateInsertKind, string> = {
  date: 'today("yyyy年M月d日")', year: 'today("yyyy年")', month: 'today("M月")', day: 'today("d日")'
}
const todayPattern = /today\("[^"]+"\)/g
export const dateTokenPlaceholder = (kind: DateInsertKind) => datePlaceholders[kind]
const dateTokenLabel = (placeholder: string) => placeholder === datePlaceholders.year
  ? '业务年份'
  : placeholder === datePlaceholders.month
    ? '业务月份'
    : placeholder === datePlaceholders.day
      ? '业务日'
      : '业务日期'

const FieldToken = Node.create({
  name: 'fieldToken', group: 'inline', inline: true, atom: true, selectable: true,
  addAttributes: () => ({ placeholder: { default: '' }, label: { default: '' }, tooltip: { default: '' } }),
  parseHTML: () => [{ tag: 'span[data-field-token]' }],
  renderHTML: ({ HTMLAttributes }) => ['span', mergeAttributes(HTMLAttributes, { 'data-field-token': '', class: 'field-token', contenteditable: 'false', title: HTMLAttributes.tooltip }), ['span', { class: 'field-icon' }, '◆'], ['span', { class: 'field-label' }, HTMLAttributes.label]]
})
const DateToken = Node.create({
  name: 'dateToken', group: 'inline', inline: true, atom: true, selectable: true,
  addAttributes: () => ({ placeholder: { default: datePlaceholders.date } }),
  parseHTML: () => [{ tag: 'span[data-date-token]' }],
  renderHTML: ({ HTMLAttributes }) => ['span', mergeAttributes(HTMLAttributes, { 'data-date-token': '', class: 'field-token date-token', contenteditable: 'false' }), ['span', { class: 'field-icon' }, '◆'], ['span', { class: 'field-label' }, dateTokenLabel(HTMLAttributes.placeholder)]]
})
const PlainLineBreak = Extension.create({ name: 'plainLineBreak', addKeyboardShortcuts() { return { 'Shift-Enter': () => this.editor.commands.splitBlock() } } })

function documentText(node: any): string {
  if (node.type === 'text') return (node.text || '').replace(/\r/g, '')
  if (node.type === 'fieldToken' || node.type === 'dateToken') return node.attrs?.placeholder || ''
  if (node.type === 'doc') return (node.content || []).map(documentText).join('\n')
  return (node.content || []).map(documentText).join('')
}
function migrateNode(node: any, fields: DailyField[]): any[] {
  if (node.type === 'fieldToken') {
    const field = fields.find(value => value.placeholder === node.attrs?.placeholder)
    return [{ ...node, attrs: field || node.attrs }]
  }
  if (node.type === 'text') {
    const text = String(node.text || '').replace(/\r/g, '')
    return text ? [{ ...node, text }] : []
  }
  const content = node.content?.flatMap((child: any) => migrateNode(child, fields))
  if (node.type === 'paragraph' && content?.some((child: any) => child.type === 'hardBreak')) {
    const lines: any[][] = [[]]
    for (const child of content) child.type === 'hardBreak' ? lines.push([]) : lines.at(-1)!.push(child)
    return lines.map(line => ({ ...node, content: line.length ? line : undefined }))
  }
  return [{ ...node, content }]
}

export function templateDocumentText(document: any) { return documentText(document) }
export function migrateTemplateDocument(document: any, fields: DailyField[] = []) { return migrateNode(document, fields)[0] }
function textContent(text: string, fields: DailyField[]) {
  const normalized = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const tokens = fields.map(field => ({ ...field, type: 'fieldToken' })).concat([...new Set(normalized.match(todayPattern) || [])].map(placeholder => ({ placeholder, label: '', tooltip: '', type: 'dateToken' }))).sort((a, b) => b.placeholder.length - a.placeholder.length)
  return { type: 'doc', content: normalized.split('\n').map(line => {
    const content: any[] = []; let offset = 0
    while (offset < line.length) {
      const match = tokens.map(field => ({ field, index: line.indexOf(field.placeholder, offset) })).filter(item => item.index >= 0).sort((a, b) => a.index - b.index)[0]
      if (!match) { content.push({ type: 'text', text: line.slice(offset) }); break }
      if (match.index > offset) content.push({ type: 'text', text: line.slice(offset, match.index) })
      content.push({ type: match.field.type, attrs: match.field }); offset = match.index + match.field.placeholder.length
    }
    return { type: 'paragraph', content: content.length ? content : undefined }
  }) }
}

export function ReportTemplateEditor({ text, document, fields, insert, onChange, onInsertHandled }: { text: string; document: string; fields: DailyField[]; insert?: { value: DailyField | DateInsertKind; key: number }; onChange: (text: string, document: string) => void; onInsertHandled: () => void }) {
  const host = useRef<HTMLDivElement>(null); const editor = useRef<Editor | undefined>(undefined); const initialized = useRef(false)
  useEffect(() => {
    let content
    try { content = document ? migrateNode(JSON.parse(document), fields)[0] : textContent(text, fields) } catch { content = textContent(text, fields) }
    editor.current = new Editor({ element: host.current!, extensions: [StarterKit.configure({ heading: false, blockquote: false, codeBlock: false, hardBreak: false }), FieldToken, DateToken, PlainLineBreak], content, onUpdate: ({ editor: value }) => { const json = value.getJSON(); onChange(documentText(json), JSON.stringify(json)) } })
    initialized.current = true
    return () => { editor.current?.destroy(); initialized.current = false }
  }, [])
  useEffect(() => {
    if (!initialized.current || !insert) return
    const activeEditor = editor.current
    if (!activeEditor) return
    activeEditor.chain().focus().insertContent(typeof insert.value === 'string' ? { type: 'dateToken', attrs: { placeholder: dateTokenPlaceholder(insert.value) } } : { type: 'fieldToken', attrs: insert.value }).insertContent(' ').run()
    const json = activeEditor.getJSON()
    onChange(documentText(json), JSON.stringify(json))
    onInsertHandled()
  }, [insert?.key])
  return <div className="report-editor" ref={host} />
}
