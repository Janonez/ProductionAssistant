import assert from 'node:assert/strict'
import { documentText } from './report-serializer.js'

const paragraph = text => ({ type: 'paragraph', content: text ? [{ type: 'text', text }] : undefined })

assert.equal(documentText({ type: 'doc', content: [paragraph('塔筒产线'), paragraph(), paragraph('第一项')] }),
  '塔筒产线\n\n第一项')
assert.equal(documentText({ type: 'doc', content: [paragraph('塔筒产线'), paragraph('第一项')] }),
  '塔筒产线\n第一项')
assert.equal(documentText({ type: 'doc', content: [paragraph('塔筒产线\r\r'), paragraph('第一项')] }),
  '塔筒产线\n第一项')
console.log('Report editor serialization checks passed.')
