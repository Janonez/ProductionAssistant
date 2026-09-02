import { describe, expect, it } from 'vitest'
import { dateTokenPlaceholder, migrateTemplateDocument, templateDocumentText } from './ReportTemplateEditor'

describe('daily report template document', () => {
  it('keeps real empty paragraphs and removes bare carriage returns', () => {
    const migrated = migrateTemplateDocument({ type: 'doc', content: [
      { type: 'paragraph', content: [{ type: 'text', text: '标题\r' }] },
      { type: 'paragraph' },
      { type: 'paragraph', content: [{ type: 'text', text: '\r正文' }] }
    ] })
    expect(templateDocumentText(migrated)).toBe('标题\n\n正文')
  })

  it('restores current field labels without changing placeholders', () => {
    const migrated = migrateTemplateDocument({ type: 'doc', content: [{ type: 'paragraph', content: [
      { type: 'fieldToken', attrs: { placeholder: 'prop("产量")', label: '旧标签' } }
    ] }] }, [{ placeholder: 'prop("产量")', label: '日 · 产量', tooltip: '日报 · 产量' }])
    expect(migrated.content[0].content[0].attrs.label).toBe('日 · 产量')
    expect(templateDocumentText(migrated)).toBe('prop("产量")')
  })

  it('creates separate year month day and full-date placeholders', () => {
    expect((['year', 'month', 'day', 'date'] as const).map(dateTokenPlaceholder)).toEqual([
      'today("yyyy年")', 'today("M月")', 'today("d日")', 'today("yyyy年M月d日")'
    ])
  })
})
