// Preserve existing content and DOM identity during iframe actions and local reads.
export function setRegionLoading(element: HTMLElement | null | undefined, loading: boolean) {
  if (!element) return
  const status = element.querySelector(':scope > [data-loading-status]')
  if (loading) {
    element.setAttribute('aria-busy', 'true')
    if (!status) {
      const row = element.ownerDocument.createElement('span')
      row.className = 'region-loading-status'
      row.dataset.loadingStatus = ''
      row.setAttribute('role', 'status')
      const spinner = element.ownerDocument.createElement('span')
      spinner.className = 'status-loader'
      spinner.setAttribute('aria-hidden', 'true')
      row.append(spinner, element.ownerDocument.createTextNode('正在读取…'))
      element.append(row)
    }
  } else {
    element.removeAttribute('aria-busy')
    status?.remove()
  }
}
