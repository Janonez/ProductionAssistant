// @vitest-environment-options {"url":"pa://app/index.html"}
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { AppLayout } from './AppLayout'
import { ThemeProvider, useTheme } from './ThemeProvider'
import hostStyles from '../../operation-sidebar.css?raw'

let container: HTMLDivElement, root: Root, media: MediaQueryList
const openSettings = vi.fn(), navigate = vi.fn()

// Real Radix menu interactions stay covered in AppLayout.test.tsx. This probe
// isolates the Electron strip's inheritance from the same provider.
function ThemeControls() {
  const { setTheme } = useTheme()
  return <>{(['light', 'dark', 'system'] as const).map(theme => <button key={theme} data-test-theme={theme} onClick={() => setTheme(theme)}>{theme}</button>)}</>
}

beforeEach(async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  vi.stubGlobal('chrome', undefined)
  vi.stubGlobal('paHost', { postMessage: vi.fn() })
  media = Object.assign(new EventTarget(), { matches: false }) as MediaQueryList
  const desktop = Object.assign(new EventTarget(), { matches: false }) as MediaQueryList
  vi.stubGlobal('matchMedia', vi.fn((query: string) => query === '(prefers-color-scheme: dark)' ? media : desktop))
  openSettings.mockClear()
  navigate.mockClear()
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
  await act(async () => root.render(<ThemeProvider><AppLayout route="production-message" navigate={navigate} openSettings={openSettings}><div data-business-slot=""><ThemeControls /></div></AppLayout></ThemeProvider>))
})
afterEach(async () => {
  await act(async () => root.unmount())
  container.remove()
  vi.unstubAllGlobals()
})

it('reserves one Electron drag strip outside all existing React controls', async () => {
  const shell = container.querySelector('[data-electron="true"][data-winui="false"]')!
  const titleBar = shell.querySelector('.pa-electron-titlebar')!
  expect(titleBar.parentElement).toBe(shell)
  expect(titleBar.querySelector('button, input, a')).toBeNull()
  expect(titleBar.contains(shell.querySelector('[aria-label="页面工具栏"]'))).toBe(false)
  expect(titleBar.contains(shell.querySelector('[data-slot="sidebar"]'))).toBe(false)
  await act(async () => container.querySelector<HTMLButtonElement>('[aria-label="打开设置"]')!.click())
  expect(openSettings).toHaveBeenCalledTimes(1)
  const trigger = container.querySelector<HTMLButtonElement>('[data-slot="sidebar-trigger"]')!
  await act(async () => trigger.click())
  expect(trigger.getAttribute('aria-expanded')).toBe('false')
  await act(async () => container.querySelector<HTMLButtonElement>('[aria-label="数据库查看"]')!.click())
  expect(navigate).toHaveBeenCalledWith('database-viewer')
})

it('shares the shell theme with its drag strip for manual and system changes', async () => {
  const shell = container.querySelector('.pa-shell-theme')!
  const titleBar = shell.querySelector('.pa-electron-titlebar')!
  for (const [theme, dark] of [['dark', true], ['light', false], ['system', false]] as const) {
    const target = container.querySelector<HTMLButtonElement>(`[data-test-theme="${theme}"]`)
    expect(target).not.toBeNull()
    await act(async () => target!.click())
    expect(shell.classList.contains('dark')).toBe(dark)
    expect(titleBar.closest('.pa-shell-theme')).toBe(shell)
  }
  await act(async () => { Reflect.set(media, 'matches', true); media.dispatchEvent(new Event('change')) })
  expect(shell.classList.contains('dark')).toBe(true)
})

it('limits dragging to the reserved strip and uses overlay geometry and shared color tokens', () => {
  expect(hostStyles).toContain(".pa-shell-theme[data-electron='true'] { --host-titlebar: env(titlebar-area-height, 32px); }")
  const strip = hostStyles.match(/\.pa-shell-theme\[data-electron='true'\] \.pa-electron-titlebar\s*\{([^}]+)\}/)![1]
  expect(strip).toContain('width: env(titlebar-area-width, 100%)')
  expect(strip).toContain('background: var(--background)')
  expect(strip).toContain('color: var(--foreground)')
  expect(strip).toContain('-webkit-app-region: drag')
  expect(hostStyles.match(/-webkit-app-region:/g)).toHaveLength(1)
})
