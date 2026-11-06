// jsdom has no layout. Interaction tests need the API, not resize delivery.
// Tests asserting size changes must supply a callback-capable observer instead.
globalThis.ResizeObserver ??= class implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(_target: Element, _options?: ResizeObserverOptions) {}
  unobserve(_target: Element) {}
  disconnect() {}
}
