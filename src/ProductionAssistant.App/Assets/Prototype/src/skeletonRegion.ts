// Keep iframe DOM identities and dimensions intact while data is being read.
export function setRegionLoading(element: HTMLElement | null | undefined, loading: boolean) {
  if (!element) return
  if (loading) element.style.minHeight = `${Math.max(element.getBoundingClientRect().height, 100)}px`
  element.classList.toggle('skeleton-region', loading)
  if (loading) element.setAttribute('aria-busy', 'true')
  else element.removeAttribute('aria-busy')
}
