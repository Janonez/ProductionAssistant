import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider, useTheme } from './ThemeProvider'

const storageKey = 'production-assistant-ui-theme-v1'

function ThemeProbe() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  return <>
    <output data-theme={theme} data-resolved-theme={resolvedTheme} />
    {(['light', 'dark', 'system'] as const).map(value => <button key={value} onClick={() => setTheme(value)}>{value}</button>)}
  </>
}

describe('theme preference', () => {
  let container: HTMLDivElement
  let root: Root | undefined
  let media: MediaQueryList
  let savedPreference: string | null
  const postMessage = vi.fn()
  const state = () => {
    const output = container.querySelector('output')!
    return [output.dataset.theme, output.dataset.resolvedTheme]
  }
  const render = async () => { await act(async () => root!.render(<ThemeProvider><ThemeProbe /></ThemeProvider>)) }
  const select = async (value: string) => {
    await act(async () => [...container.querySelectorAll('button')].find(button => button.textContent === value)!.click())
  }
  const systemDark = async (value: boolean) => {
    await act(async () => {
      Reflect.set(media, 'matches', value)
      media.dispatchEvent(new Event('change'))
    })
  }

  beforeEach(() => {
    postMessage.mockReset()
    vi.stubGlobal('chrome', undefined)
    vi.stubGlobal('paHost', { postMessage })
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
    savedPreference = localStorage.getItem(storageKey)
    localStorage.removeItem(storageKey)
    media = Object.assign(new EventTarget(), { matches: false, media: '(prefers-color-scheme: dark)' }) as MediaQueryList
    vi.stubGlobal('matchMedia', vi.fn(() => media))
    container = document.createElement('div')
    document.body.append(container)
    root = createRoot(container)
  })
  afterEach(async () => {
    if (root) await act(async () => root!.unmount())
    container.remove()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    if (savedPreference === null) localStorage.removeItem(storageKey)
    else localStorage.setItem(storageKey, savedPreference)
  })

  it('defaults to system without writing a preference on first use', async () => {
    await render()
    expect(state()).toEqual(['system', 'light'])
    expect(localStorage.getItem(storageKey)).toBeNull()
    expect(postMessage.mock.calls).toEqual([[{ type: 'app.theme', theme: 'system' }]])
  })
  it.each(['light', 'dark', 'system'])('restores saved %s', async value => {
    localStorage.setItem(storageKey, value)
    Reflect.set(media, 'matches', true)
    await render()
    expect(state()).toEqual([value, value === 'light' ? 'light' : 'dark'])
    expect(postMessage.mock.calls).toEqual([[{ type: 'app.theme', theme: value }]])
  })
  it.each(['', 'invalid', 'DARK', 'null'])('falls back to system for invalid value %j', async value => {
    localStorage.setItem(storageKey, value)
    await render()
    expect(state()).toEqual(['system', 'light'])
  })
  it('keeps running when reading storage fails', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('Storage unavailable', 'SecurityError') })
    await render()
    expect(state()).toEqual(['system', 'light'])
    await select('dark')
    expect(state()).toEqual(['dark', 'dark'])
  })
  it('keeps switching in memory when writing storage fails', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('Storage full', 'QuotaExceededError') })
    await render()
    await select('dark')
    expect(state()).toEqual(['dark', 'dark'])
    await select('light')
    expect(state()).toEqual(['light', 'light'])
    await select('system')
    await systemDark(true)
    expect(state()).toEqual(['system', 'dark'])
  })
  it.each(['light', 'dark', 'system'])('persists the selected %s', async value => {
    await render()
    await select(value)
    expect(localStorage.getItem(storageKey)).toBe(value)
  })
  it('tracks system changes while system is selected', async () => {
    await render()
    await systemDark(true)
    expect(state()).toEqual(['system', 'dark'])
    await systemDark(false)
    expect(state()).toEqual(['system', 'light'])
    expect(postMessage.mock.calls).toEqual([[{ type: 'app.theme', theme: 'system' }]])
  })
  it('synchronizes light to dark to light without resending an unchanged selection', async () => {
    localStorage.setItem(storageKey, 'light')
    await render()
    await select('dark')
    await select('light')
    await select('light')
    expect(postMessage.mock.calls).toEqual(['light', 'dark', 'light'].map(theme => [{ type: 'app.theme', theme }]))
  })
  it('sends system unchanged when leaving a forced dark theme and responds to media changes', async () => {
    localStorage.setItem(storageKey, 'dark')
    Reflect.set(media, 'matches', true)
    await render()
    await select('system')
    await systemDark(false)
    expect(state()).toEqual(['system', 'light'])
    expect(postMessage.mock.calls).toEqual(['dark', 'system'].map(theme => [{ type: 'app.theme', theme }]))
  })
  it.each(['light', 'dark'])('keeps explicit %s despite system changes', async value => {
    await render()
    await select(value)
    await systemDark(true)
    expect(state()).toEqual([value, value])
    await systemDark(false)
    expect(state()).toEqual([value, value])
  })
  it('removes its system listener when unmounted', async () => {
    const add = vi.spyOn(media, 'addEventListener')
    const remove = vi.spyOn(media, 'removeEventListener')
    await render()
    expect(add).toHaveBeenCalledTimes(1)
    expect(add.mock.calls[0][0]).toBe('change')
    await act(async () => root!.unmount())
    root = undefined
    expect(remove).toHaveBeenCalledTimes(1)
    expect(remove).toHaveBeenCalledWith('change', add.mock.calls[0][1])
  })
  it('restores the last selection after remounting the document', async () => {
    await render()
    await select('dark')
    await act(async () => root!.unmount())
    root = createRoot(container)
    await render()
    expect(state()).toEqual(['dark', 'dark'])
    expect(postMessage.mock.calls).toEqual(['system', 'dark', 'dark'].map(theme => [{ type: 'app.theme', theme }]))
  })
})
