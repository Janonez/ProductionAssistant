import ts from 'typescript'
import { expect, it } from 'vitest'

const sources = import.meta.glob<string>([
  '../**/*.ts', '../**/*.tsx',
  '!../bridge/**', '!../**/*.test.ts', '!../**/*.test.tsx'
], { query: '?raw', import: 'default', eager: true })

it('keeps page and module code behind the public bridge entry', () => {
  const files = Object.keys(sources)
  expect(files.length).toBeGreaterThan(0)
  expect(files).toContain('../features/database-viewer/DatabaseViewerPage.tsx')
  const violations: string[] = []

  function unwrap(node: ts.Node): ts.Node {
    while (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node)) node = node.expression
    return node
  }

  for (const [file, text] of Object.entries(sources)) {
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
    function visit(node: ts.Node) {
      if (ts.isStringLiteral(node) && (node.text.startsWith('.') || node.text.startsWith('/src/'))) {
        const target = new URL(node.text, `https://source.invalid/src/${file.slice(3)}`).pathname
        if (target === '/src/bridge.ts' || target.startsWith('/src/bridge/') && !['/src/bridge/index', '/src/bridge/index.ts'].includes(target))
          violations.push(`${file}: private bridge import ${node.text}`)
      }
      if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
        const property = ts.isPropertyAccessExpression(node) ? node.name.text : ts.isStringLiteral(node.argumentExpression) ? node.argumentExpression.text : ''
        const owner = unwrap(node.expression)
        if (property === 'chrome' && ts.isIdentifier(owner) && ['window', 'globalThis'].includes(owner.text))
          violations.push(`${file}: direct desktop host access`)
      }
      ts.forEachChild(node, visit)
    }
    visit(source)
  }

  expect(violations).toEqual([])
  console.info(`Bridge boundary scan: ${files.length} source files; database viewer included.`)
})
