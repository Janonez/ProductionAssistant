export type SubmissionJob = {
  id: string
  name?: string
  businessDate?: string
  configRevision?: number
  enabled?: boolean
  config: {
    documentUrl: string
    fields?: { id: string; name: string; unit?: string; notion?: { sourceName?: string; valueFieldName?: string } }[]
    rules?: Record<string, unknown>
  }
}

// These are the existing TencentSheetTaskHandler run fields, without a second store.
export type SubmissionRun = {
  id: string
  businessDate?: string
  time: string
  source?: string
  status: string
  phase?: string
  message?: string
  error?: string
  // SaveRun embeds JsonSerializer.SerializeToNode(TencentDataRow) with its original casing.
  data?: { Id: string; Name: string; Value: number; Unit: string; Source: string; Period: string; RecordCount: number }[]
}
