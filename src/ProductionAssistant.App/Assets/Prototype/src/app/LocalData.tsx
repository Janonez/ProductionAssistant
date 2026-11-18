import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
import { getServiceState, invoke, subscribeServiceState } from '../bridge/index'

type Entry = { value?: unknown; pending: Promise<unknown> }
export type LocalData = {
  read<T>(operation: string, payload?: unknown, refresh?: boolean): Promise<T>
  peek<T>(operation: string, payload?: unknown): T | undefined
  set(operation: string, value: unknown, payload?: unknown): void
  clear(): void
}
const keyOf = (operation: string, payload?: unknown) => JSON.stringify([operation, payload ?? null])
const Context = createContext<LocalData>({ read: (operation, payload) => payload === undefined ? invoke(operation) : invoke(operation, payload), peek: () => undefined, set() {}, clear() {} })

export function LocalDataProvider({ children }: { children: ReactNode }) {
  const [data] = useState<LocalData>(() => {
    const entries = new Map<string, Entry>()
    return {
      read<T>(operation: string, payload?: unknown, refresh = false) {
        const key = keyOf(operation, payload)
        let entry = refresh ? undefined : entries.get(key)
        if (!entry) {
          const previous = entries.get(key)
          const next: Entry = { value: previous?.value, pending: Promise.resolve() }
          next.pending = (payload === undefined ? invoke(operation) : invoke(operation, payload)).then(value => {
            next.value = structuredClone(value)
            return next.value
          }).catch(error => { if (entries.get(key) === next) { if (previous?.value !== undefined) entries.set(key, previous); else entries.delete(key) } throw error })
          entries.set(key, next)
          entry = next
        }
        return entry.pending.then(value => structuredClone(value) as T)
      },
      peek<T>(operation: string, payload?: unknown) { return structuredClone(entries.get(keyOf(operation, payload))?.value) as T | undefined },
      set(operation, value, payload) { const saved = structuredClone(value); entries.set(keyOf(operation, payload), { value: saved, pending: Promise.resolve(saved) }) },
      clear() { entries.clear() },
    }
  })
  return <Context.Provider value={data}>{children}</Context.Provider>
}

export function LocalDataBootstrap({ enabled = true }: { enabled?: boolean }) {
  const data = useLocalData()
  const service = useSyncExternalStore(subscribeServiceState, getServiceState)
  useEffect(() => {
    if (!enabled || service.state !== 'Ready') return
    // Independent local reads start together. No remote checks, authentication or writes here.
    for (const operation of ['settings.open', 'production.getBindings', 'weld.getState', 'database.getState', 'report.getState']) void data.read(operation).catch(() => {})
    void data.read<{ tasks: { id: string; taskType: string }[] }>('automation.list').then(({ tasks }) => {
      for (const task of tasks ?? []) {
        const prefix = ({ daily_report: 'daily', notion_fill: 'notionFill', tencent_sheet_fill: 'tencentSheet' } as Record<string, string>)[task.taskType]
        if (prefix) {
          void data.read(`${prefix}.get`, { id: task.id }).catch(() => {})
          void data.read(`${prefix}.runs`, { id: task.id }).catch(() => {})
        }
      }
    }).catch(() => {})
  }, [data, enabled, service.state])
  return null
}

export const useLocalData = () => useContext(Context)
