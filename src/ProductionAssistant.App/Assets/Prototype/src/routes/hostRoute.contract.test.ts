import { describe, expect, it } from 'vitest'
import { resolveHostRoute } from './index'
import { isRouteKey } from './routeTable'

describe('host route compatibility', () => {
  it.each([
    'production-message', 'daily-weld', 'database-viewer', 'plan-pdf',
    'production-meeting', 'report-center', 'daily-report',
  ])('resolves the exact host tag %s', value => {
    expect(resolveHostRoute(`?route=${value}`)).toEqual({ route: value, navigation: '', displayRoute: value })
  })

  it.each([
    'production-message', 'daily-weld', 'database-viewer', 'plan-pdf',
    'production-meeting', 'report-center', 'daily-report',
  ])('accepts the exact host tag %s as a route key', value => {
    expect(isRouteKey(value)).toBe(true)
  })

  it.each([
    '', '?', '?route', '?route=', '?route=unknown',
    '?route=PRODUCTION-MESSAGE', '?route=Navigation:plan-pdf',
    '?route=%20plan-pdf%20', '?route=%20navigation:plan-pdf',
  ])('keeps the query fallback for %s', query => {
    expect(resolveHostRoute(query)).toEqual({ route: 'production-message', navigation: '', displayRoute: 'production-message' })
  })

  it.each([
    'navigation:plan-pdf', 'navigation:unknown', 'navigation:', 'navigation: ',
    'navigation:PRODUCTION-MESSAGE',
  ])('preserves the legacy route %s verbatim', value => {
    expect(resolveHostRoute(`?route=${encodeURIComponent(value)}`)).toEqual({ route: value, navigation: '', displayRoute: value === 'navigation:plan-pdf' ? 'plan-pdf' : 'production-message' })
  })

  it.each([
    'navigation:plan-pdf', 'navigation:unknown', 'navigation:', 'navigation: ',
    'navigation:PRODUCTION-MESSAGE',
  ])('rejects the legacy route %s as a route key', value => {
    expect(isRouteKey(value)).toBe(false)
  })

  it.each([null, undefined, '', 'unknown', 'PRODUCTION-MESSAGE', 'Navigation:plan-pdf', ' plan-pdf '])('rejects the non-key %s', value => {
    expect(isRouteKey(value)).toBe(false)
  })

  it('preserves navigation tokens without trimming', () => {
    expect(resolveHostRoute('?route=plan-pdf&navigation=%20token%20')).toEqual({ route: 'plan-pdf', navigation: ' token ', displayRoute: 'plan-pdf' })
    expect(resolveHostRoute('?route=plan-pdf&navigation=')).toEqual({ route: 'plan-pdf', navigation: '', displayRoute: 'plan-pdf' })
  })

  it.each([
    'production-message', 'daily-weld', 'database-viewer', 'plan-pdf',
    'production-meeting', 'report-center', 'daily-report',
  ])('maps the known legacy suffix %s to its display route', value => {
    const route = `navigation:${value}`
    const result = resolveHostRoute(`?route=${encodeURIComponent(route)}&navigation=%20token%20`)
    expect(result.displayRoute).toBe(value)
    expect(result.route).toBe(route)
    expect(result.navigation).toBe(' token ')
  })

  it.each([
    'navigation:unknown', 'navigation:', 'navigation: ', 'navigation:PRODUCTION-MESSAGE',
  ])('falls back to the default display route for %s', value => {
    const result = resolveHostRoute(`?route=${encodeURIComponent(value)}&navigation=%20token%20`)
    expect(result.displayRoute).toBe('production-message')
    expect(result.route).toBe(value)
    expect(result.navigation).toBe(' token ')
  })
})
