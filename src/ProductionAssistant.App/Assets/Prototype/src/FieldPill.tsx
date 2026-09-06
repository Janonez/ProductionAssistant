import { useRef } from 'react'
import { observeSquircle, useSquircle } from './squircle'
export type FieldPillProps = { category?: string; name: string; emphasize?: 'name' | 'category'; invalid?: boolean; title?: string }
export function FieldPill({ category, name, emphasize = 'name', invalid, title }: FieldPillProps) {
  const ref = useRef<HTMLSpanElement>(null)
  useSquircle(ref)
  return <span ref={ref} className={`field-pill emphasize-${emphasize}${invalid ? ' is-invalid' : ''}`} title={title}>{category && <><span className="field-pill-category">{category}</span><span className="field-pill-separator">·</span></>}<span className="field-pill-name">{name}</span></span>
}
// Tiptap uses a DOM node view; share the same geometry and semantic classes.
export function createFieldPill(props: FieldPillProps) {
  const dom = document.createElement('span')
  dom.className = `field-pill field-token emphasize-${props.emphasize || 'name'}${props.invalid ? ' is-invalid' : ''}`
  dom.contentEditable = 'false'
  dom.title = props.title || ''
  for (const [className, text] of [['field-pill-category', props.category], ['field-pill-separator', props.category ? '·' : ''], ['field-pill-name', props.name]]) {
    if (!text) continue
    const span = document.createElement('span'); span.className = className!; span.textContent = text; dom.append(span)
  }
  const disconnect = observeSquircle(dom)
  return { dom, destroy: disconnect }
}
