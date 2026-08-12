import { Editor, Extension, Node, mergeAttributes } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { documentText } from './report-serializer.js'

const bridge = window.chrome?.webview
const todayPlaceholder = 'today("yyyy年M月d日")'
const todayPattern = /today\("[^"]+"\)/g

const FieldToken = Node.create({
  name: 'fieldToken',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,
  addAttributes() {
    return {
      placeholder: { default: '' },
      label: { default: '' },
      tooltip: { default: '' },
    }
  },
  parseHTML() { return [{ tag: 'span[data-field-token]' }] },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, {
      'data-field-token': '',
      class: 'field-token',
      contenteditable: 'false',
      title: HTMLAttributes.tooltip,
    }), ['span', { class: 'field-icon' }, '▣'], ['span', { class: 'field-label' }, HTMLAttributes.label]]
  },
})

const DateToken = Node.create({
  name: 'dateToken',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,
  addAttributes() {
    return { placeholder: { default: todayPlaceholder } }
  },
  parseHTML() { return [{ tag: 'span[data-date-token]' }] },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, {
      'data-date-token': '',
      class: 'field-token date-token',
      contenteditable: 'false',
    }), ['span', { class: 'field-icon' }, '▣'], ['span', { class: 'field-label' }, '业务日期']]
  },
})

const PlainLineBreak = Extension.create({
  name: 'plainLineBreak',
  addKeyboardShortcuts() {
    return { 'Shift-Enter': () => this.editor.commands.splitBlock() }
  },
})

let editor
let fields = []

function plainText() {
  return documentText(editor.getJSON())
}

function postState(type = 'update', requestId) {
  bridge?.postMessage({ type, requestId, text: plainText(), document: JSON.stringify(editor.getJSON()) })
}

function textContent(text) {
  const normalizedText = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const dateTokens = [...new Set(normalizedText.match(todayPattern) || [])]
    .map(placeholder => ({ placeholder, type: 'dateToken' }))
  const tokens = fields
    .filter(field => field.placeholder)
    .map(field => ({ ...field, type: 'fieldToken' }))
    .concat(dateTokens)
    .sort((left, right) => right.placeholder.length - left.placeholder.length)
  return {
    type: 'doc',
    content: normalizedText.split('\n').map(line => {
      const content = []
      let offset = 0
      while (offset < line.length) {
        const match = tokens
          .map(field => ({ field, index: line.indexOf(field.placeholder, offset) }))
          .filter(item => item.index >= 0)
          .sort((left, right) => left.index - right.index)[0]
        if (!match) {
          content.push({ type: 'text', text: line.slice(offset) })
          break
        }
        if (match.index > offset)
          content.push({ type: 'text', text: line.slice(offset, match.index) })
        content.push({ type: match.field.type, attrs: match.field })
        offset = match.index + match.field.placeholder.length
      }
      return { type: 'paragraph', content: content.length ? content : undefined }
    }),
  }
}

function migrateTokens(node) {
  if (node.type === 'fieldToken') {
    const field = fields.find(item => item.placeholder === node.attrs?.placeholder)
    if (field) node.attrs = field
  }
  if (node.type === 'text' && node.text) {
    node.text = node.text.replace(/\r/g, '')
    if (!node.text) return []
    const content = []
    let offset = 0
    for (const match of node.text.matchAll(todayPattern)) {
      if (match.index > offset) content.push({ ...node, text: node.text.slice(offset, match.index) })
      content.push({ type: 'dateToken', attrs: { placeholder: match[0] } })
      offset = match.index + match[0].length
    }
    if (content.length) {
      if (offset < node.text.length) content.push({ ...node, text: node.text.slice(offset) })
      return content
    }
  }
  if (node.content) node.content = node.content.flatMap(migrateTokens)
  if (node.type === 'paragraph' && node.content?.some(child => child.type === 'hardBreak')) {
    const lines = [[]]
    for (const child of node.content) {
      if (child.type === 'hardBreak') lines.push([])
      else lines.at(-1).push(child)
    }
    return lines.map(content => ({
      ...node,
      content: content.length ? content : undefined,
    }))
  }
  return [node]
}

function initialize(message) {
  fields = message.fields || []
  let content
  try { content = message.document ? migrateTokens(JSON.parse(message.document))[0] : textContent(message.text) }
  catch { content = textContent(message.text) }
  editor?.destroy()
  editor = new Editor({
    element: document.querySelector('#editor'),
    extensions: [StarterKit.configure({
      heading: false, blockquote: false, codeBlock: false, hardBreak: false,
    }), FieldToken, DateToken, PlainLineBreak],
    content,
    autofocus: false,
    onUpdate: () => postState(),
    onCreate: () => postState(),
  })
}

bridge?.addEventListener('message', event => {
  const message = event.data
  if (message.type === 'init') initialize(message)
  else if (message.type === 'getState') postState('state', message.requestId)
  else if (message.type === 'insertField') {
    fields = fields.filter(field => field.placeholder !== message.field.placeholder).concat(message.field)
    editor?.chain().focus().insertContent({ type: 'fieldToken', attrs: message.field }).insertContent(' ').run()
  } else if (message.type === 'insertToday') {
    editor?.chain().focus().insertContent({
      type: 'dateToken', attrs: { placeholder: todayPlaceholder },
    }).insertContent(' ').run()
  }
})

bridge?.postMessage({ type: 'ready' })
