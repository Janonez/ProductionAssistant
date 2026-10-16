// @vitest-environment node
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { afterEach, beforeEach, expect, it } from 'vitest'

const checker = fileURLToPath(new URL('./check-font-weights.mjs', import.meta.url))
const weights = [['--fw-regular', '400'], ['--fw-medium', '500'], ['--fw-semibold', '600'], ['--fw-bold', '700']]
const tokens = weights.map(([name, value]) => name + ': ' + value + ';').join('\n')
const header = 'Static UI font weights must be 400, 500, 600, or 700.'
let fixture

function write(file, text) {
  const path = join(fixture, 'src', file)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, text)
}

beforeEach(() => {
  fixture = mkdtempSync(join(tmpdir(), 'pa-font-weights-'))
  mkdirSync(join(fixture, 'scripts'))
  copyFileSync(checker, join(fixture, 'scripts', 'check-font-weights.mjs'))
  write('typography.css', tokens)
})

afterEach(() => {
  if (dirname(fixture) !== resolve(tmpdir()) || !basename(fixture).startsWith('pa-font-weights-'))
    throw new Error('Refusing to remove an unexpected fixture path')
  rmSync(fixture, { recursive: true })
})

function run() {
  const result = spawnSync(process.execPath, [join(fixture, 'scripts', 'check-font-weights.mjs')], { encoding: 'utf8' })
  if (result.error) throw result.error
  expect(result.signal).toBeNull()
  expect(result.stdout).toBe('')
  return result
}

function passes() {
  const result = run()
  expect(result.status).toBe(0)
  expect(result.stderr).toBe('')
}

function fails(lines) {
  const result = run()
  expect(result.status).toBe(1)
  expect(result.stderr).toBe(header + '\n' + lines.join('\n') + '\n')
}

it('accepts all four standard weights and exits silently', () => {
  write('controls.css', weights.map(([, value]) => '.control { font-weight: ' + value + ' !important; }').join('\n'))
  passes()
})

it('finds a nonstandard CSS weight two directories deep and reports its line', () => {
  write('features/deep/controls.css', '.control {\n  font-weight: 650;\n}\n')
  fails([join('src', 'features/deep/controls.css') + ':2 uses font-weight 650'])
})

it('finds a forbidden font family in a nested TSX file', () => {
  write('features/deep/Page.tsx', 'const css = "body { font-family: Arial; }"')
  fails(['features/deep/Page.tsx: font-family must inherit or use var(--font-ui)'])
})

it('ignores unsupported TS, HTML and JS files in subdirectories', () => {
  for (const extension of ['ts', 'html', 'js'])
    write('features/deep/ignored.' + extension, 'font-weight: 650; font-family: Arial; fontFamily: "Arial"')
  passes()
})

it('keeps numeric weight checks limited to CSS', () => {
  write('features/Page.tsx', 'const css = "font-weight: 650;"; const style = { fontWeight: 650 }')
  passes()
})

it.each(weights)('rejects a missing %s token', (name, value) => {
  write('typography.css', weights.filter(([key]) => key !== name).map(([key, value]) => key + ': ' + value + ';').join('\n'))
  fails(['src/typography.css must define ' + name + ': ' + value])
})

it.each(weights)('rejects an incorrect %s token', (name, value) => {
  write('typography.css', tokens.replace(name + ': ' + value, name + ': 650'))
  fails(['src/typography.css must define ' + name + ': ' + value])
})

it.each(['css', 'tsx'])('accepts inherit and the shared family token in %s', (extension) => {
  write('features/allowed.' + extension, '.a { font-family: inherit; } .b { font-family: var(--font-ui); }')
  passes()
})

it.each(['css', 'tsx'])('rejects other font families in %s', (extension) => {
  write('features/rejected.' + extension, '.a { font-family: Arial; }')
  fails(['features/rejected.' + extension + ': font-family must inherit or use var(--font-ui)'])
})

it.each(['css', 'tsx'])('reports inline fontFamily only once per %s file', (extension) => {
  write('features/inline.' + extension, 'const a = { fontFamily: "Arial" }; const b = { fontFamily: "serif" }')
  fails(['features/inline.' + extension + ': use the shared CSS font token instead of inline fontFamily'])
})

it('preserves both rule exclusions for the root production-message.css', () => {
  write('production-message.css', 'font-weight: 650; font-family: Arial; fontFamily: "Arial"')
  passes()
})

it('preserves the numeric weight exclusion for root styles.css', () => {
  write('styles.css', '.a { font-weight: 650; font-family: inherit; }')
  passes()
})

it('still checks both font family forms in root styles.css', () => {
  write('styles.css', 'font-weight: 650; font-family: Arial; fontFamily: "Arial"')
  fails([
    'styles.css: font-family must inherit or use var(--font-ui)',
    'styles.css: use the shared CSS font token instead of inline fontFamily',
  ])
})

it('preserves the font family definition exception for root typography.css', () => {
  write('typography.css', tokens + '\n:root { font-family: Arial; }')
  passes()
})

it.each(['production-message.css', 'styles.css'])('does not exempt a nested %s', (name) => {
  const file = 'features/deep/' + name
  write(file, 'font-weight: 650; font-family: Arial; fontFamily: "Arial"')
  fails([
    join('src', file) + ':1 uses font-weight 650',
    file + ': font-family must inherit or use var(--font-ui)',
    file + ': use the shared CSS font token instead of inline fontFamily',
  ])
})

it('does not exempt font family definitions in a nested typography.css', () => {
  write('features/typography.css', '.a { font-family: Arial; }')
  fails(['features/typography.css: font-family must inherit or use var(--font-ui)'])
})

it('uses sorted relative paths in both rule passes', () => {
  for (const file of ['z/last.css', 'a/first.css']) write(file, 'font-weight: 650; font-family: Arial;')
  fails([
    join('src', 'a/first.css') + ':1 uses font-weight 650',
    join('src', 'z/last.css') + ':1 uses font-weight 650',
    'a/first.css: font-family must inherit or use var(--font-ui)',
    'z/last.css: font-family must inherit or use var(--font-ui)',
  ])
})

it.for(['file', 'directory'])('does not follow a %s symbolic link', (kind, context) => {
  const target = join(fixture, kind === 'file' ? 'outside.css' : 'outside')
  if (kind === 'file') writeFileSync(target, 'font-weight: 650; font-family: Arial;')
  else {
    mkdirSync(target)
    writeFileSync(join(target, 'outside.css'), 'font-weight: 650; font-family: Arial;')
  }
  try {
    symlinkSync(target, join(fixture, 'src', kind === 'file' ? 'linked.css' : 'linked'), kind === 'file' ? 'file' : process.platform === 'win32' ? 'junction' : 'dir')
  } catch (error) {
    if (process.platform !== 'win32' || !['EPERM', 'EACCES', 'ENOSYS'].includes(error.code)) throw error
    console.warn('Skipping symbolic link test due to ' + error.code)
    context.skip()
    return
  }
  passes()
})
