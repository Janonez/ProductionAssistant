import { invoke } from '../../bridge/index'
import type { DocumentConnectionState } from './DocumentConnectionItem'

type Summary = {
  configRevision: number
  state: keyof typeof displayState
  confirmedAt?: string | null
  documentName?: string | null
}
const displayState = {
  NotConnected: 'notConnected',
  Connected: 'connected',
  NeedsLogin: 'notLoggedIn',
  AccessDenied: 'accessDenied',
  ReadOnly: 'readOnly',
} as const
const oldPrefix = 'pa.submission.last-connection.'

// Legacy storage only held successful checks. Leave all keys in place until Sidecar acknowledges the import.
export async function migrateLegacyConnections(storage: Storage) {
  const keys = Array.from({ length: storage.length }, (_, index) => storage.key(index))
    .filter((key): key is string => !!key?.startsWith(oldPrefix))
  const entries = keys.flatMap(key => {
    try {
      const value = JSON.parse(storage.getItem(key) ?? 'null')
      if (!Number.isInteger(value?.revision) || typeof value.checkedAt !== 'string' || !Number.isFinite(Date.parse(value.checkedAt))) return []
      return [{ taskId: key.slice(oldPrefix.length), configRevision: value.revision, checkedAt: value.checkedAt,
        documentName: typeof value.documentName === 'string' ? value.documentName : undefined }]
    } catch { return [] }
  })
  if (keys.length === 0) return
  const result = await invoke<{ acknowledged: boolean }>('tencentSheet.importConnectionSummaries', { entries })
  if (result?.acknowledged !== true) throw new Error('旧连接摘要尚未确认迁移。')
  keys.forEach(key => storage.removeItem(key))
}

let migration: Promise<void> | undefined
export function startConnectionMigration(): Promise<void> {
  migration ??= Promise.resolve().then(() => migrateLegacyConnections(window.localStorage)).catch(error => {
    migration = undefined
    throw error
  })
  return migration
}

export async function readConnectionSummary(id: string, configRevision: number): Promise<DocumentConnectionState> {
  await startConnectionMigration().catch(() => {})
  const summary = await invoke<Summary>('tencentSheet.getConnectionSummary', { id })
  if (summary?.configRevision !== configRevision || !Object.hasOwn(displayState, summary.state)) throw new Error('连接摘要响应无效。')
  return { state: displayState[summary.state], documentName: summary.documentName ?? undefined, checkedAt: summary.confirmedAt ?? undefined }
}
