import type { DatabaseState, DatabaseSchema, DatabaseInspectResult } from '../features/database-viewer/types'

// DEV-only fixtures. No network, filesystem, credentials, or business data.
const responses: {
  'database.getState': DatabaseState
  'database.getSchema': DatabaseSchema
  'database.inspect': DatabaseInspectResult
} = {
  'database.getState': {
    provider: 'MOCK_BROWSER_PREVIEW_1_2', usesBusinessSections: false, businessSections: [],
    sources: [{ id: 'mock-source', name: 'Mock table', path: 'Mock catalog / Mock table', businessSection: '' }]
  },
  'database.getSchema': {
    datasets: [{ id: 'mock-view', name: 'Mock view' }],
    fields: [
      { id: 'date', name: 'Mock date', type: 'date' },
      { id: 'value', name: 'Mock value', type: 'number' },
      { id: 'label', name: 'Mock label', type: 'text' }
    ]
  },
  'database.inspect': {
    providerName: 'MOCK_BROWSER_PREVIEW_1_2', sourceName: 'Mock table', datasetName: 'Mock view',
    startDate: '2000-01-01', endDate: '2000-01-02', recordCount: 2, total: 30, truncated: false,
    records: [
      { id: 'mock-row-a', values: { date: '2000-01-01', value: 10, label: 'MOCK_ROW_ALPHA_1_2' } },
      { id: 'mock-row-b', values: { date: '2000-01-02', value: 20, label: 'MOCK_ROW_BETA_1_2' } }
    ]
  }
}

export async function invoke<T>(operation: string, _payload?: unknown): Promise<T> {
  if (!Object.hasOwn(responses, operation)) throw new Error(`mock 未实现: ${operation}`)
  return structuredClone(responses[operation as keyof typeof responses]) as T
}

// A browser has no native host to notify; consume the same readiness message.
export function ready(route: string, loadId: string) {
  return { type: 'app.ready', route, loadId,
    moduleEntryMs: Math.round(performance.getEntriesByName('module-entry')[0]?.startTime || 0),
    readyMs: Math.round(performance.now()) }
}
