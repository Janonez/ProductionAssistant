export type DatabaseSource = { id: string; name: string; path: string; businessSection: string }
export type DatabaseDataset = { id: string; name: string }
export type DatabaseField = { id: string; name: string; type: string }
export type DatabaseInspectResult = { providerName: string; sourceName: string; datasetName: string; startDate: string; endDate: string; recordCount: number; total?: number; truncated: boolean; records: Array<{ id: string; values: Record<string, unknown> }> }
export type DatabaseState = { provider: string; usesBusinessSections: boolean; businessSections: string[]; sources: DatabaseSource[] }
export type DatabaseSchema = { fields: DatabaseField[]; datasets: DatabaseDataset[] }
