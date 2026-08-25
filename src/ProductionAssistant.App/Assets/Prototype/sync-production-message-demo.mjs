import fs from 'node:fs'
import path from 'node:path'
import postcss from 'postcss'

const prototypeRoot = path.resolve(import.meta.dirname)
const repositoryRoot = path.resolve(prototypeRoot, '../../../..')
const demoRoot = path.join(repositoryRoot, 'my_tests/productio_nmessage/production-message-demo/src')
const formalSource = path.join(prototypeRoot, 'src')
const scope = '.production-message-demo'

function scopedSelector(selector) {
  return selector.split(',').map(part => {
    const value = part.trim()
    if (value.includes('.date-picker')) return `body:has(${scope}) ${value}`
    if (value === ':root') return `${scope}, body:has(${scope})`
    if (value === 'html' || value === 'body' || value === '#root') return scope
    if (value.startsWith(scope)) return value
    return `${scope} ${value}`
  }).join(', ')
}

const css = [
  fs.readFileSync(path.join(demoRoot, 'index.css'), 'utf8'),
  fs.readFileSync(path.join(demoRoot, 'App.css'), 'utf8'),
].join('\n\n')

const root = postcss.parse(css)
root.walkRules(rule => {
  let parent = rule.parent
  while (parent) {
    if (parent.type === 'atrule' && /keyframes$/i.test(parent.name)) return
    parent = parent.parent
  }
  rule.selector = scopedSelector(rule.selector)
})

const generated = `/* Generated from my_tests/productio_nmessage/production-message-demo/src/index.css and App.css.
   Do not redesign this file; run npm run sync:production-message-demo after Demo changes. */
${scope}, ${scope} :where(*:not(svg):not(svg *)) { all: revert; box-sizing: border-box; }
${scope} svg, ${scope} svg * { box-sizing: border-box; }
${scope} { line-height: normal; }
${root.toString()}
`.replace(/[ \t]+$/gm, '')
fs.writeFileSync(path.join(formalSource, 'production-message.css'), generated)

// The approved Demo remains the visual source of truth. The formal TSX owns
// the production bridge integration and must not be overwritten by Demo mocks.
