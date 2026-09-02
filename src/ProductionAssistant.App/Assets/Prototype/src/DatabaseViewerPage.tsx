import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, Database, LoaderCircle, Play, Rows3, Sigma } from 'lucide-react'
import { invoke } from './bridge'
import { ChoicePicker, ReportDatePicker } from './FormPickers'

type Source = { id: string; name: string; path: string; businessSection: string }
type Dataset = { id: string; name: string }
type Field = { id: string; name: string; type: string }
type Result = { providerName: string; sourceName: string; datasetName: string; startDate: string; endDate: string; recordCount: number; total?: number; truncated: boolean; records: Array<{ id: string; values: Record<string, unknown> }> }
const today = new Date().toISOString().slice(0, 10)

export function DatabaseViewerPage() {
  const [provider, setProvider] = useState('')
  const [usesBusinessSections, setUsesBusinessSections] = useState(false)
  const [businessSections, setBusinessSections] = useState<string[]>([])
  const [businessSection, setBusinessSection] = useState('')
  const [sources, setSources] = useState<Source[]>([])
  const [sourceId, setSourceId] = useState('')
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [datasetId, setDatasetId] = useState('')
  const [fields, setFields] = useState<Field[]>([])
  const [dateFieldId, setDateFieldId] = useState('')
  const [valueFieldId, setValueFieldId] = useState('')
  const [rangeKind, setRangeKind] = useState('day')
  const [businessDate, setBusinessDate] = useState(today)
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(today)
  const [busy, setBusy] = useState('load')
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result>()

  useEffect(() => {
    invoke<{ provider: string; usesBusinessSections: boolean; businessSections: string[]; sources: Source[] }>('database.getState')
      .then(value => { setProvider(value.provider); setUsesBusinessSections(value.usesBusinessSections); setBusinessSections(value.businessSections); setSources(value.sources) })
      .catch(reason => setError(reason instanceof Error ? reason.message : String(reason)))
      .finally(() => setBusy(''))
  }, [])

  const chooseSource = async (value: string) => {
    setSourceId(value); setDatasetId(''); setDateFieldId(''); setValueFieldId('')
    setDatasets([]); setFields([]); setResult(undefined); setError('')
    if (!value) return
    setBusy('schema')
    try {
      const data = await invoke<{ fields: Field[]; datasets: Dataset[] }>('database.getSchema', { sourceId: value })
      setFields(data.fields); setDatasets(data.datasets)
      setDateFieldId(data.fields.find(field => field.type === 'date')?.id || '')
      setValueFieldId(data.fields.find(field => field.type === 'number')?.id || '')
      setDatasetId(data.datasets.find(dataset => dataset.name === '本年截止今日')?.id || data.datasets[0]?.id || '')
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)) }
    finally { setBusy('') }
  }

  const inspect = async () => {
    setBusy('query'); setError(''); setResult(undefined)
    try {
      setResult(await invoke<Result>('database.inspect', { sourceId, datasetId, dateFieldId: supportsDateRanges ? dateFieldId : '', valueFieldId: supportsDateRanges ? valueFieldId : '', rangeKind: supportsDateRanges ? rangeKind : 'all', businessDate, startDate, endDate }, 120000))
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)) }
    finally { setBusy('') }
  }

  const dateFields = fields.filter(field => field.type === 'date')
  const businessSources = usesBusinessSections ? sources.filter(source => source.businessSection === businessSection) : sources
  const valueFields = fields.filter(field => field.type === 'number')
  const selectedValue = fields.find(field => field.id === valueFieldId)
  const selectedDataset = datasets.find(dataset => dataset.id === datasetId)
  const supportsDateRanges = selectedDataset?.name.trim() === '本年截止今日'
  const visibleFields = useMemo(() => {
    const chosen = new Set([dateFieldId, valueFieldId])
    return [...fields.filter(field => chosen.has(field.id)), ...fields.filter(field => !chosen.has(field.id))]
  }, [fields, dateFieldId, valueFieldId])
  const needsCustomRange = rangeKind === 'week' || rangeKind === 'custom'
  const canQuery = sourceId && datasetId && (!supportsDateRanges || dateFieldId && (!needsCustomRange || startDate && endDate))

  return <div className="page database-viewer-page">
    <header><div><h1>数据库查看</h1><p>按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。</p></div><span className="database-provider"><Database />当前适配器：{provider || '读取中'}</span></header>
    <section className="database-query-panel">
      <div className="database-query-heading"><h2>查询条件</h2><p>普通 View 读取其完整结果；只有“本年截止今日”可在返回记录内计算日期口径。</p></div>
      <div className="database-query-grid">
        {usesBusinessSections && <label>业务板块<ChoicePicker value={businessSection} placeholder={busy === 'load' ? '正在读取业务板块…' : '请选择业务板块'} disabled={!!busy} options={businessSections.map(section => ({ value: section, label: section }))} onChange={value => { setBusinessSection(value); chooseSource('') }} /></label>}
        <label>数据库<ChoicePicker value={sourceId} placeholder="请选择具体数据库" disabled={(usesBusinessSections && !businessSection) || !!busy} options={businessSources.map(source => ({ value: source.id, label: source.name }))} onChange={chooseSource} /></label>
        <label>View<ChoicePicker value={datasetId} placeholder={busy === 'schema' ? '正在读取 View…' : '请选择 View'} disabled={!sourceId || !!busy} options={datasets.map(dataset => ({ value: dataset.id, label: dataset.name }))} onChange={value => { setDatasetId(value); setResult(undefined) }} /></label>
        {supportsDateRanges && <><label>日期字段<ChoicePicker value={dateFieldId} placeholder="请选择日期字段" disabled={!fields.length || !!busy} options={dateFields.map(field => ({ value: field.id, label: field.name }))} onChange={setDateFieldId} /></label>
        <label>累计字段<ChoicePicker value={valueFieldId} placeholder="可选择数值字段" disabled={!fields.length || !!busy} options={valueFields.map(field => ({ value: field.id, label: field.name }))} onChange={setValueFieldId} /></label>
        <label>软件查询口径<ChoicePicker value={rangeKind} placeholder="请选择日期口径" disabled={!!busy} options={[{ value: 'day', label: '指定日期' }, { value: 'week', label: '指定日期范围' }, { value: 'month', label: '月初至指定日期' }, { value: 'year', label: '年初至指定日期' }]} onChange={value => { setRangeKind(value); setResult(undefined) }} /></label>
        {!needsCustomRange && <label>指定日期<ReportDatePicker value={businessDate} onChange={setBusinessDate} /></label>}
        {needsCustomRange && <><label>开始日期<ReportDatePicker value={startDate} onChange={setStartDate} /></label><label>结束日期<ReportDatePicker value={endDate} onChange={setEndDate} /></label></>}</>}
      </div>
      <div className="database-query-actions"><button className="primary" disabled={!canQuery || !!busy} onClick={inspect}>{busy === 'query' ? <LoaderCircle className="spin" /> : <Play />}{busy === 'query' ? '正在查询…' : '执行查询'}</button></div>
    </section>
    {error && <div className="notice error" role="alert"><AlertCircle /><div><strong>查询失败</strong><span>{error}</span></div></div>}
    {result ? <section className="database-result">
      <div className="database-result-head"><div><h2>{result.sourceName} · {result.datasetName}</h2><p>{supportsDateRanges ? `${result.startDate} ～ ${result.endDate}` : '完整 View 结果'}</p></div><dl><div><dt><Rows3 />命中记录</dt><dd>{result.recordCount}</dd></div>{supportsDateRanges && <div><dt><Sigma />{selectedValue?.name || '累计值'}</dt><dd>{result.total ?? '—'}</dd></div>}</dl></div>
      <div className="database-table-wrap"><table><thead><tr>{visibleFields.map(field => <th key={field.id}>{field.name}<small>{field.type}</small></th>)}</tr></thead><tbody>{result.records.map(record => <tr key={record.id}>{visibleFields.map(field => <td key={field.id}>{formatValue(record.values[field.id])}</td>)}</tr>)}</tbody></table></div>
      {result.truncated && <p className="database-truncated">结果仅展示前 200 条，命中数量和累计值按全部记录计算。</p>}
    </section> : !busy && !error && <section className="database-empty"><Database /><h2>{usesBusinessSections ? '选择业务板块、数据库和 View 后执行查询' : '选择数据库和 View 后执行查询'}</h2><p>普通 View 显示完整结果；“本年截止今日”可进一步选择日期口径。所有操作均为只读。</p></section>}
  </div>
}

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'boolean') return value ? '是' : '否'
  if (typeof value === 'number') return value.toLocaleString('zh-CN', { maximumFractionDigits: 2 })
  return String(value)
}
