import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'
import { useDelayedSkeleton } from './useDelayedSkeleton'

it('delays 200ms, holds for 300ms, suppresses fast loads and keeps stale content', async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  vi.useFakeTimers()
  const container = document.createElement('div'), root = createRoot(container)
  function Probe({ loading, hasData = false }: { loading: boolean; hasData?: boolean }) {
    return <span>{useDelayedSkeleton(loading, hasData) ? 'skeleton' : 'content'}</span>
  }
  const render = (loading: boolean, hasData = false) => act(async () => root.render(<Probe loading={loading} hasData={hasData} />))
  const tick = (ms: number) => act(async () => { vi.advanceTimersByTime(ms) })
  try {
    await render(true); await tick(199)
    expect(container.textContent).toBe('content')
    await render(false, true); await tick(500)
    expect(container.textContent).toBe('content')
    await render(true); await tick(200)
    expect(container.textContent).toBe('skeleton')
    await tick(50); await render(false, true); await tick(249)
    expect(container.textContent).toBe('skeleton')
    await tick(1)
    expect(container.textContent).toBe('content')
    await render(true, true); await tick(1000)
    expect(container.textContent).toBe('content')
    await render(false); await render(true); await tick(100)
    await act(async () => root.unmount()); await tick(1000)
    expect(container.textContent).toBe('')
  } finally { vi.useRealTimers(); vi.unstubAllGlobals() }
})
