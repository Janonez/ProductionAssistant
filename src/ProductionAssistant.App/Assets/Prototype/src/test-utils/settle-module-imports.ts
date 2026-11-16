import { act } from 'react'
import { onTestFinished, vi } from 'vitest'

// Module delivery must not keep React's act scope open across a test timeout.
export async function settleModuleImports() {
  let finished = false
  onTestFinished(() => { finished = true })
  await vi.dynamicImportSettled()
  if (finished) throw new Error('The test ended before its module imports settled.')
  await act(async () => {})
}
