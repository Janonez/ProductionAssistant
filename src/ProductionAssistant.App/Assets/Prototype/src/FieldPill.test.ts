import { describe,it,expect } from 'vitest'
import { squirclePath } from './squircle'
import { labelFor } from './dateRangeSpec'
import { migrateTemplateDocument } from './ReportTemplateEditor'
describe('field reference spec and shape',()=>{
 it('keeps straight edges and radius fixed when width changes',()=>{
  expect(squirclePath(100)).toContain('M 8 0 L 92 0')
  expect(squirclePath(200)).toContain('M 8 0 L 192 0')
  expect(squirclePath(100)).toContain('L 100 20')
  expect(squirclePath(100)).not.toMatch(/NaN|Infinity/)
 })
 it('persists a relative spec on the atomic node',()=>{
  const spec={granularity:'mtd' as const,yearOffset:-1}
  const node=migrateTemplateDocument({type:'doc',content:[{type:'paragraph',content:[{type:'fieldToken',attrs:{placeholder:'{x}'}}]}]},[{placeholder:'{x}',label:labelFor(spec)+' · 产量',tooltip:'',businessId:'metric',databaseId:'source',fieldId:'value',dateRangeSpec:spec}])
  const json=JSON.parse(JSON.stringify(node))
  expect(json.content[0].content[0].attrs.dateRangeSpec).toEqual(spec)
  expect(json.content[0].content[0].attrs.fieldId).toBe('value')
  expect(json.content[0].content[0].attrs.databaseId).toBe('source')
  expect(labelFor({granularity:'fullyear',yearOffset:-1})).toBe('去年全年')
 })
})
