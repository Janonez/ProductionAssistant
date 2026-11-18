import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'
import { LocalDataProvider, useLocalData, type LocalData } from './LocalData'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../bridge/index', () => ({ invoke }))

it('deduplicates pending reads, isolates drafts, and replaces cached data on explicit refresh', async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  const container = document.createElement('div'), root = createRoot(container)
  let data!: LocalData, finish!: (value: unknown) => void
  function Probe() { data = useLocalData(); return null }
  invoke.mockImplementation(() => new Promise(resolve => { finish = resolve }))
  try {
    await act(async () => root.render(<LocalDataProvider><Probe /></LocalDataProvider>))
    const first = data.read<{ name: string }>('settings.open'), second = data.read('settings.open')
    expect(invoke).toHaveBeenCalledTimes(1)
    finish({ name: 'saved' })
    const draft = await first
    draft.name = 'unsaved'
    expect(await second).toEqual({ name: 'saved' })
    expect(data.peek('settings.open')).toEqual({ name: 'saved' })
    invoke.mockResolvedValue({ name: 'updated' })
    expect(await data.read('settings.open', undefined, true)).toEqual({ name: 'updated' })
    expect(await data.read('settings.open')).toEqual({ name: 'updated' })
    expect(invoke).toHaveBeenCalledTimes(2)
    invoke.mockRejectedValueOnce(new Error('refresh failed'))
    await expect(data.read('settings.open', undefined, true)).rejects.toThrow('refresh failed')
    expect(data.peek('settings.open')).toEqual({ name: 'updated' })
    invoke.mockRejectedValueOnce(new Error('unavailable'))
    await expect(data.read('weld.getState')).rejects.toThrow('unavailable')
    invoke.mockResolvedValue({ configured: true })
    expect(await data.read('weld.getState')).toEqual({ configured: true })
  } finally { await act(async () => root.unmount()); vi.unstubAllGlobals() }
})
