import { useLayoutEffect, type RefObject } from 'react'

export const PILL_HEIGHT = 28
const RADIUS = 8
// Only the corner squares change: all four straight edges retain their length.
export function squirclePath(width: number, height = PILL_HEIGHT): string {
  const r = Math.min(RADIUS, width / 2, height / 2)
  if (width <= 0) return ''
  const corners = [[width-r,r,-Math.PI/2], [width-r,height-r,0], [r,height-r,Math.PI/2], [r,r,Math.PI]]
  let path = `M ${r} 0 L ${width-r} 0`
  corners.forEach(([cx,cy,start], corner) => {
    if (corner === 1) path += ` L ${width} ${height-r}`
    if (corner === 2) path += ` L ${r} ${height}`
    if (corner === 3) path += ` L 0 ${r}`
    for (let i=1;i<=24;i++) {
      const a=start+i*Math.PI/48, c=Math.cos(a), s=Math.sin(a)
      path += ` L ${(cx+r*Math.sign(c)*Math.sqrt(Math.abs(c))).toFixed(3)} ${(cy+r*Math.sign(s)*Math.sqrt(Math.abs(s))).toFixed(3)}`
    }
  })
  return path+' Z'
}
export function observeSquircle(element: HTMLElement) {
  const update = () => { element.style.clipPath = `path("${squirclePath(element.getBoundingClientRect().width)}")` }
  update()
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : undefined
  observer?.observe(element)
  void document.fonts?.ready.then(update)
  return () => observer?.disconnect()
}
export function useSquircle(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => ref.current ? observeSquircle(ref.current) : undefined, [ref])
}
