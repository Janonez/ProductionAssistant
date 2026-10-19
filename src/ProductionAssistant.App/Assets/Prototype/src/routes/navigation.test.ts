import { beforeEach, describe, expect, it, vi } from 'vitest'
import { afterEach } from 'vitest'
import { navigateInDocument, subscribeRoute } from './navigation'

describe('navigateInDocument', () => {
  let originalUrl: string
  let originalState: unknown
  const unsubscribes: Array<() => void> = []

  beforeEach(() => {
    originalUrl = window.location.href
    originalState = window.history.state
  })

  afterEach(() => {
    for (const unsubscribe of unsubscribes.splice(0)) unsubscribe()
    vi.restoreAllMocks()
    window.history.replaceState(originalState, '', originalUrl)
  })

  it('replaces only route while preserving query values and pathname', () => {
    window.history.replaceState(null, '', '/document.html?route=production-message&navigation=abc&foo=a%20b')
    const pathname = window.location.pathname
    const replaceState = vi.spyOn(window.history, 'replaceState')

    expect(navigateInDocument('daily-weld')).toBe(true)

    const params = new URLSearchParams(window.location.search)
    expect(params.get('route')).toBe('daily-weld')
    expect(params.get('navigation')).toBe('abc')
    expect(params.get('foo')).toBe('a b')
    expect(window.location.pathname).toBe(pathname)
    expect(replaceState).toHaveBeenCalledOnce()
    expect(replaceState).toHaveBeenCalledWith(null, '', '?route=daily-weld&navigation=abc&foo=a+b')
  })

  it('adds a missing route while retaining the navigation parameter', () => {
    window.history.replaceState(null, '', '?navigation=abc')

    expect(navigateInDocument('daily-weld')).toBe(true)

    const params = new URLSearchParams(window.location.search)
    expect(params.get('route')).toBe('daily-weld')
    expect(params.get('navigation')).toBe('abc')
  })

  it('leaves URL and listeners untouched when the display route already matches', () => {
    window.history.replaceState(null, '', '?route=daily-weld&navigation=abc')
    const replaceState = vi.spyOn(window.history, 'replaceState')
    const listener = vi.fn()
    unsubscribes.push(subscribeRoute(listener))

    expect(navigateInDocument('daily-weld')).toBe(false)

    expect(replaceState).not.toHaveBeenCalled()
    expect(listener).not.toHaveBeenCalled()
  })

  it('compares legacy display routes before replacing route and retaining navigation', () => {
    window.history.replaceState(null, '', '?route=navigation:daily-weld&navigation=n1')
    const replaceState = vi.spyOn(window.history, 'replaceState')
    const listener = vi.fn()
    unsubscribes.push(subscribeRoute(listener))

    expect(navigateInDocument('daily-weld')).toBe(false)
    expect(replaceState).not.toHaveBeenCalled()
    expect(listener).not.toHaveBeenCalled()

    expect(navigateInDocument('plan-pdf')).toBe(true)

    const params = new URLSearchParams(window.location.search)
    expect(params.get('route')).toBe('plan-pdf')
    expect(params.get('navigation')).toBe('n1')
    expect(replaceState).toHaveBeenCalledOnce()
    expect(listener).toHaveBeenCalledOnce()
  })

  it.each([
    'settings',
    '',
    'PRODUCTION-MESSAGE',
    'navigation:plan-pdf',
    'filesystem',
  ])('rejects document route %j without writing URL or notifying listeners', tag => {
    window.history.replaceState(null, '', '?route=daily-weld&navigation=abc')
    const replaceState = vi.spyOn(window.history, 'replaceState')
    const listener = vi.fn()
    unsubscribes.push(subscribeRoute(listener))

    expect(navigateInDocument(tag)).toBe(false)

    expect(replaceState).not.toHaveBeenCalled()
    expect(listener).not.toHaveBeenCalled()
  })

  it('notifies subscribers in order after the URL changes and respects unsubscribe', () => {
    window.history.replaceState(null, '', '?route=production-message')
    const notifications: string[] = []
    const firstListener = vi.fn(() => { notifications.push('first:' + window.location.search) })
    const secondListener = vi.fn(() => { notifications.push('second:' + window.location.search) })
    const unsubscribeFirst = subscribeRoute(firstListener)
    unsubscribes.push(unsubscribeFirst, subscribeRoute(secondListener))

    expect(navigateInDocument('daily-weld')).toBe(true)

    expect(firstListener).toHaveBeenCalledOnce()
    expect(secondListener).toHaveBeenCalledOnce()
    expect(notifications).toEqual(['first:?route=daily-weld', 'second:?route=daily-weld'])

    unsubscribeFirst()
    expect(navigateInDocument('plan-pdf')).toBe(true)

    expect(firstListener).toHaveBeenCalledOnce()
    expect(secondListener).toHaveBeenCalledTimes(2)
    expect(notifications).toEqual([
      'first:?route=daily-weld',
      'second:?route=daily-weld',
      'second:?route=plan-pdf',
    ])
  })

  it('[nav-switch] updates the document without dispatching popstate', () => {
    window.history.replaceState(null, '', '?route=production-message')
    const dispatchEvent = vi.spyOn(window, 'dispatchEvent')

    expect(navigateInDocument('daily-weld')).toBe(true)

    expect(dispatchEvent.mock.calls.some(([event]) => event.type === 'popstate')).toBe(false)
  })
})
