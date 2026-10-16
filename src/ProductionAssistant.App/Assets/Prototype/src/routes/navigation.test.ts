import { beforeEach, describe, expect, it, vi } from 'vitest'
import { navigate } from './navigation'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../bridge/index', () => ({ invoke }))

beforeEach(() => { invoke.mockReset().mockResolvedValue(undefined) })

describe('host navigation entry', () => {
  it('sends daily-report once with the unchanged payload', async () => {
    await navigate('daily-report')

    expect(invoke.mock.calls).toEqual([['app.navigateNative', { tag: 'daily-report' }]])
  })

  it.each([
    ['production-message', { tag: 'production-message' }],
    ['daily-weld', { tag: 'daily-weld' }],
    ['database-viewer', { tag: 'database-viewer' }],
    ['plan-pdf', { tag: 'plan-pdf' }],
    ['production-meeting', { tag: 'production-meeting' }],
    ['report-center', { tag: 'report-center' }],
    ['daily-report', { tag: 'daily-report' }],
  ] as const)('forwards the exact tag %s', async (tag, payload) => {
    await navigate(tag)

    expect(invoke.mock.calls).toEqual([['app.navigateNative', payload]])
  })

  it('forwards arbitrary strings without validation or normalization', async () => {
    await navigate(' navigation:DAILY-REPORT ')

    expect(invoke.mock.calls).toEqual([['app.navigateNative', { tag: ' navigation:DAILY-REPORT ' }]])
  })

  it('resolves to undefined when the bridge rejects', async () => {
    invoke.mockRejectedValueOnce(new Error('navigation failed'))

    await expect(navigate('daily-report')).resolves.toBeUndefined()
  })

  it('passes the successful bridge result through unchanged', async () => {
    const result = { accepted: true }
    invoke.mockResolvedValueOnce(result)

    await expect(navigate('daily-report')).resolves.toBe(result)
  })
})
