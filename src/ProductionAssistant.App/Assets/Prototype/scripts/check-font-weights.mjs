import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const source = new URL('../src/', import.meta.url)
const excluded = new Set(['production-message.css', 'styles.css'])
const allowed = new Set(['400', '500', '600', '700'])
const errors = []
const tokens = readFileSync(new URL('typography.css', source), 'utf8')
const expectedTokens = {
  '--fw-regular': '400',
  '--fw-medium': '500',
  '--fw-semibold': '600',
  '--fw-bold': '700',
}

for (const [name, value] of Object.entries(expectedTokens)) {
  if (!new RegExp(`${name}\\s*:\\s*${value}(?:\\s*;|\\s*$)`, 'm').test(tokens)) {
    errors.push(`src/typography.css must define ${name}: ${value}`)
  }
}

for (const file of readdirSync(source).filter(name => name.endsWith('.css') && !excluded.has(name))) {
  const css = readFileSync(new URL(file, source), 'utf8')
  for (const match of css.matchAll(/font-weight\s*:\s*(\d+)/g)) {
    if (!allowed.has(match[1])) {
      const line = css.slice(0, match.index).split('\n').length
      errors.push(`${join('src', file)}:${line} uses font-weight ${match[1]}`)
    }
  }
}

// New UI must use the shared font token rather than a page-specific system font.
for (const file of readdirSync(source).filter(name => /\.(css|tsx)$/.test(name) && name !== 'production-message.css')) {
  const text = readFileSync(new URL(file, source), 'utf8')
  for (const match of text.matchAll(/font-family\s*:\s*([^;}]+)/g)) {
    if (file !== 'typography.css' && !/^(?:inherit|var\(--font-ui\))$/.test(match[1].trim()))
      errors.push(`${file}: font-family must inherit or use var(--font-ui)`)
  }
  if (/fontFamily\s*:/.test(text)) errors.push(`${file}: use the shared CSS font token instead of inline fontFamily`)
}

if (errors.length) {
  console.error(`Static UI font weights must be 400, 500, 600, or 700.\n${errors.join('\n')}`)
  process.exitCode = 1
}
