// Keep iframe DOM identities and dimensions intact while data is being read.
export function setRegionLoading(element: HTMLElement | null | undefined, loading: boolean) {
  if (!element) return
  if (loading) element.style.minHeight = `${Math.max(element.getBoundingClientRect().height, 100)}px`
  element.classList.toggle('skeleton-region', loading)
  const placeholder = element.querySelector(':scope > .skeleton-region-placeholder')
  if (loading) {
    element.setAttribute('aria-busy', 'true')
    if (!placeholder) {
      const overlay = element.ownerDocument.createElement('span')
      overlay.className = 'skeleton-region-placeholder'
      overlay.setAttribute('aria-hidden', 'true')
      for (let i = 0; i < 3; i++) {
        const line = element.ownerDocument.createElement('span')
        line.className = 'skeleton-block'
        overlay.append(line)
      }
      element.append(overlay)
    }
  } else {
    element.removeAttribute('aria-busy')
    placeholder?.remove()
  }
}
