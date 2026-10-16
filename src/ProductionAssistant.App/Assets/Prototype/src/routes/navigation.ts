import { invoke } from '../bridge/index'

export function navigate(tag: string) {
  return invoke('app.navigateNative', { tag }).catch(() => undefined)
}
