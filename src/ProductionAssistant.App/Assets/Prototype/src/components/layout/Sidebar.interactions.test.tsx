import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { AppLayout } from './AppLayout'
import { ThemeProvider } from './ThemeProvider'

vi.mock('../../bridge/index', () => ({ notifyTheme: vi.fn() }))
let container: HTMLDivElement, root: Root, savedPreference: string | null
const storageKey = 'production-assistant-ui-theme-v1'
const navigate = vi.fn()
const trigger = () => container.querySelector<HTMLButtonElement>('[data-slot="sidebar-trigger"]')!
const sheet = () => document.querySelector<HTMLElement>('[role="dialog"][data-mobile="true"]')
const settleFocus = async () => { await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)) }) }
const open = async () => {
  await act(async () => { trigger().focus(); trigger().click() })
  expect(sheet()).not.toBeNull()
}

beforeEach(async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  savedPreference = localStorage.getItem(storageKey)
  localStorage.setItem(storageKey, 'dark')
  const media = Object.assign(new EventTarget(), { matches: true })
  vi.stubGlobal('matchMedia', vi.fn(() => media))
  navigate.mockClear()
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
  await act(async () => root.render(<ThemeProvider><AppLayout route="production-message" navigate={navigate} openSettings={() => {}}><textarea aria-label="业务编辑器" /></AppLayout></ThemeProvider>))
})
afterEach(async () => {
  await act(async () => root.unmount())
  await settleFocus()
  container.remove()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  if (savedPreference === null) localStorage.removeItem(storageKey)
  else localStorage.setItem(storageKey, savedPreference)
})

it('keeps the mobile Sheet themed, traps focus, and restores its Header trigger after Escape', async () => {
  await open()
  expect(container.contains(sheet())).toBe(false)
  expect(sheet()!.closest('.pa-shell-theme')?.classList.contains('dark')).toBe(true)
  expect(sheet()!.closest('[data-shadcn-surface]')).not.toBeNull()
  expect(container.getAttribute('aria-hidden')).toBe('true')
  expect(sheet()!.contains(document.activeElement)).toBe(true)
  await act(async () => container.querySelector<HTMLTextAreaElement>('textarea')!.focus())
  expect(sheet()!.contains(document.activeElement)).toBe(true)
  await act(async () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })))
  await settleFocus()
  expect(sheet()).toBeNull()
  expect(document.activeElement).toBe(trigger())
  expect(trigger().getAttribute('aria-expanded')).toBe('false')
  expect(container.hasAttribute('aria-hidden')).toBe(false)
})

it('closes after selecting a module and returns focus without replacing the business slot', async () => {
  const editor = container.querySelector('textarea')
  await open()
  await act(async () => sheet()!.querySelector<HTMLButtonElement>('[aria-label="数据浏览"]')!.click())
  await settleFocus()
  expect(navigate.mock.calls).toEqual([['database-viewer']])
  expect(sheet()).toBeNull()
  expect(document.activeElement).toBe(trigger())
  expect(container.querySelector('textarea')).toBe(editor)
})

it('returns focus after a completed click on the Sheet overlay', async () => {
  await open()
  await settleFocus()
  const overlay = document.querySelector('[data-slot="sheet-overlay"]')!
  const pointer = (type: string) => overlay.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, button: 0 }))
  await act(async () => { pointer('pointerdown'); pointer('mousedown') })
  expect(sheet()).not.toBeNull()
  await act(async () => { pointer('pointerup'); pointer('mouseup'); pointer('click') })
  await settleFocus()
  expect(sheet()).toBeNull()
  expect(document.activeElement).toBe(trigger())
})

it('keeps Ctrl+B available outside forms and returns focus when it closes the Sheet', async () => {
  const editor = container.querySelector<HTMLTextAreaElement>('textarea')!
  const editorShortcut = new KeyboardEvent('keydown', { key: 'b', ctrlKey: true, bubbles: true, cancelable: true })
  await act(async () => { editor.focus(); editor.dispatchEvent(editorShortcut) })
  expect(editorShortcut.defaultPrevented).toBe(false)
  expect(sheet()).toBeNull()
  await act(async () => { trigger().focus(); trigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true, bubbles: true, cancelable: true })) })
  expect(sheet()).not.toBeNull()
  await act(async () => document.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true, bubbles: true, cancelable: true })))
  await settleFocus()
  expect(sheet()).toBeNull()
  expect(document.activeElement).toBe(trigger())
})
