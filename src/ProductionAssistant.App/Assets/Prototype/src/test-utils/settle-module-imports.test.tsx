import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'
import { settleModuleImports } from './settle-module-imports'

it('allows another root update while module delivery is pending, without leaking an act scope', async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  let deliver!: () => void
  const imports = new Promise<void>(resolve => { deliver = resolve })
  const loader = vi.spyOn(vi, 'dynamicImportSettled').mockReturnValueOnce(imports)
  const container = document.createElement('div'); document.body.append(container)
  const root = createRoot(container)
  let pending: Promise<void> | undefined
  try {
    await act(async () => root.render(<p>初始界面</p>))
    pending = settleModuleImports()
    await act(async () => root.render(<p>独立更新已呈现</p>))
    expect(container.textContent).toBe('独立更新已呈现')
  } finally {
    deliver()
    try { await pending; await act(async () => root.unmount()) }
    finally { container.remove(); loader.mockRestore(); vi.unstubAllGlobals() }
  }
})
