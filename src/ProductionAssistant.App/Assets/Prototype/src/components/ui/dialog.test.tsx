import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from '../layout/ThemeProvider'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog'

describe('official shadcn Dialog integration', () => {
  let container: HTMLDivElement
  let root: ReturnType<typeof createRoot>
  let savedPreference: string | null
  const storageKey = 'production-assistant-ui-theme-v1'
  const dialog = () => document.querySelector<HTMLElement>('[role="dialog"]')!
  const settleFocus = async () => { await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)) }) }
  const open = async () => {
    await act(async () => root.render(<ThemeProvider><Dialog>
      <DialogTrigger asChild><button>打开对话框</button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>测试对话框</DialogTitle><DialogDescription>无障碍说明</DialogDescription></DialogHeader>
        <input aria-label="测试输入" />
        <button>测试操作</button>
      </DialogContent>
    </Dialog><button data-outside="">外部操作</button></ThemeProvider>))
    const trigger = container.querySelector<HTMLButtonElement>('[data-slot="dialog-trigger"]')!
    await act(async () => { trigger.focus(); trigger.click() })
    return trigger
  }
  beforeEach(() => {
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
    savedPreference = localStorage.getItem(storageKey)
    localStorage.removeItem(storageKey)
    const media = Object.assign(new EventTarget(), { matches: false })
    vi.stubGlobal('matchMedia', vi.fn(() => media))
    container = document.createElement('div')
    document.body.append(container)
    root = createRoot(container)
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
  it('keeps Radix naming, modal semantics, themed portal and trigger restoration', async () => {
    localStorage.setItem(storageKey, 'dark')
    const trigger = await open()
    expect(container.contains(dialog())).toBe(false)
    expect(container.getAttribute('aria-hidden')).toBe('true')
    expect(dialog().closest('[aria-hidden="true"]')).toBeNull()
    expect(dialog().contains(document.activeElement)).toBe(true)
    expect(document.getElementById(dialog().getAttribute('aria-labelledby')!)?.textContent).toBe('测试对话框')
    expect(document.getElementById(dialog().getAttribute('aria-describedby')!)?.textContent).toBe('无障碍说明')
    expect(dialog().closest('[data-shadcn-surface]')?.classList.contains('dark')).toBe(true)
    await act(async () => dialog().querySelector<HTMLButtonElement>('[data-slot="dialog-close"]')!.click())
    await settleFocus()
    expect(dialog()).toBeNull()
    expect(document.activeElement).toBe(trigger)
    expect(container.hasAttribute('aria-hidden')).toBe(false)
  })
  it('delegates Tab loops, focus containment and Escape to the real Radix primitives', async () => {
    const trigger = await open()
    const first = dialog().querySelector<HTMLInputElement>('input')!
    const last = dialog().querySelector<HTMLButtonElement>('[data-slot="dialog-close"]')!
    expect(document.activeElement).toBe(first)
    await act(async () => {
      last.focus()
      last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }))
    })
    expect(document.activeElement).toBe(first)
    await act(async () => first.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true })))
    expect(document.activeElement).toBe(last)
    await act(async () => container.querySelector<HTMLButtonElement>('[data-outside]')!.focus())
    expect(dialog().contains(document.activeElement)).toBe(true)
    await act(async () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })))
    await settleFocus()
    expect(dialog()).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })
})
