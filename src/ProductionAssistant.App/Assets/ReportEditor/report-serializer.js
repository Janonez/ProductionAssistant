export function serializeNode(node) {
  if (!node) return ''
  if (node.type === 'text') return (node.text || '').replace(/\r/g, '')
  if (node.type === 'fieldToken' || node.type === 'dateToken') return node.attrs?.placeholder || ''
  if (node.type === 'hardBreak') return '\n'
  const text = (node.content || []).map(serializeNode).join('')
  return node.type === 'paragraph' ? `${text}\n` : text
}

export function documentText(document) {
  return serializeNode(document).replace(/\n$/, '')
}
