import { describe, expect, it } from 'vitest'
import { resolveHostRoute } from './index'
import { isRouteKey } from './routeTable'

describe('host route compatibility', () => {
  // 原先同时返回 route/displayRoute；nav-switch 合并为唯一 route 字段。
  it.each([
    'production-message', 'daily-weld', 'database-viewer', 'plan-pdf',
    'production-meeting', 'report-center', 'daily-report',
  ])('[nav-switch] resolves the exact host tag %s', value => {
    expect(resolveHostRoute(`?route=${value}`)).toEqual({ route: value, navigation: '' })
  })

  it.each([
    'production-message', 'daily-weld', 'database-viewer', 'plan-pdf',
    'production-meeting', 'report-center', 'daily-report',
  ])('accepts the exact host tag %s as a route key', value => {
    expect(isRouteKey(value)).toBe(true)
  })

  // 原先默认页也返回 displayRoute；nav-switch 只保留 route 与 navigation。
  it.each([
    '', '?', '?route', '?route=', '?route=unknown',
    '?route=PRODUCTION-MESSAGE', '?route=Navigation:plan-pdf',
    '?route=%20plan-pdf%20', '?route=%20navigation:plan-pdf',
  ])('[nav-switch] keeps the query fallback for %s', query => {
    expect(resolveHostRoute(query)).toEqual({ route: 'production-message', navigation: '' })
  })

  // 原‘route 原样保留’契约在 nav-switch 中被有意取消；归一行为由下面的 normalizes/falls back 两组覆盖。

  it.each([
    'navigation:plan-pdf', 'navigation:unknown', 'navigation:', 'navigation: ',
    'navigation:PRODUCTION-MESSAGE',
  ])('rejects the legacy route %s as a route key', value => {
    expect(isRouteKey(value)).toBe(false)
  })

  it.each([null, undefined, '', 'unknown', 'PRODUCTION-MESSAGE', 'Navigation:plan-pdf', ' plan-pdf '])('rejects the non-key %s', value => {
    expect(isRouteKey(value)).toBe(false)
  })

  // 原先令牌断言包含 displayRoute；nav-switch 移除该字段，令牌仍原样保留。
  it('[nav-switch] preserves navigation tokens without trimming', () => {
    expect(resolveHostRoute('?route=plan-pdf&navigation=%20token%20')).toEqual({ route: 'plan-pdf', navigation: ' token ' })
    expect(resolveHostRoute('?route=plan-pdf&navigation=')).toEqual({ route: 'plan-pdf', navigation: '' })
  })

  // 原先 route 保留旧前缀并由 displayRoute 展示；nav-switch 将归一结果直接放入 route。
  it.each([
    'production-message', 'daily-weld', 'database-viewer', 'plan-pdf',
    'production-meeting', 'report-center', 'daily-report',
  ])('[nav-switch] normalizes the known legacy suffix %s to a plain route', value => {
    const route = `navigation:${value}`
    const result = resolveHostRoute(`?route=${encodeURIComponent(route)}&navigation=%20token%20`)
    expect(result.route).toBe(value)
    expect(result.navigation).toBe(' token ')
  })

  // 原先未知旧路由保留原值并由 displayRoute 回退；nav-switch 由 route 直接回退默认页。
  it.each([
    'navigation:unknown', 'navigation:', 'navigation: ', 'navigation:PRODUCTION-MESSAGE',
  ])('[nav-switch] falls back to the default route for %s', value => {
    const result = resolveHostRoute(`?route=${encodeURIComponent(value)}&navigation=%20token%20`)
    expect(result.route).toBe('production-message')
    expect(result.navigation).toBe(' token ')
  })

  // 防止重新引入第二个路由字段（永久双路由）。
  it('[nav-switch] returns only route and navigation', () => {
    const result = resolveHostRoute('?route=navigation:plan-pdf&navigation=n1')
    expect(Object.keys(result).sort()).toEqual(['navigation', 'route'])
    expect(result).toEqual({ route: 'plan-pdf', navigation: 'n1' })
  })
})
