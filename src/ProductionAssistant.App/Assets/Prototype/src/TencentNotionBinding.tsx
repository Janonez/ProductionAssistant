import { useEffect, useState } from "react";
import { invoke } from "./bridge";
import { ChoicePicker } from "./FormPickers";

export type NotionBinding = { sourceId: string; valueFieldId: string; queryMode: "date" | "view"; dateFieldId: string; datasetId: string; period: string; sourceName?: string; valueFieldName?: string; datasetName?: string };
export type BusinessField = { id: string; name: string; unit: string; notion?: NotionBinding };
type Option = { id: string; name: string; type?: string };

export function TencentNotionBinding({ id, field, disabled, continueToTeaching = false, onSave, onCancel }: {
  id: string; field: BusinessField; disabled: boolean; continueToTeaching?: boolean; onSave: (binding: NotionBinding) => Promise<void>; onCancel: () => void;
}) {
  const [binding, setBinding] = useState<NotionBinding>(field.notion ?? { sourceId: "", valueFieldId: "", queryMode: "date", dateFieldId: "", datasetId: "", period: "day" });
  const [sourcesBusy, setSourcesBusy] = useState(true);
  const [sources, setSources] = useState<Option[]>([]), [schema, setSchema] = useState<Option[]>([]), [views, setViews] = useState<Option[]>([]);
  const [schemaBusy, setSchemaBusy] = useState(false), [viewsBusy, setViewsBusy] = useState(false), [error, setError] = useState("");
  useEffect(() => { let current = true; setSourcesBusy(true); invoke<{ sources: Option[] }>("tencentSheet.sources", { id }).then(result => { if (current) setSources(result.sources); }).catch(error => { if (current) setError(String(error)); }).finally(() => { if (current) setSourcesBusy(false); }); return () => { current = false; }; }, [id]);
  useEffect(() => {
    let current = true; setSchema([]); setError(""); setSchemaBusy(false);
    if (!binding.sourceId) return;
    setSchemaBusy(true);
    invoke<{ fields: Option[] }>("tencentSheet.schema", { id, sourceId: binding.sourceId }).then(result => { if (current) setSchema(result.fields); }).catch(error => { if (current) setError(String(error)); }).finally(() => { if (current) setSchemaBusy(false); });
    return () => { current = false; };
  }, [id, binding.sourceId]);
  useEffect(() => {
    let current = true; setViews([]); setViewsBusy(false);
    if (binding.queryMode !== "view" || !binding.sourceId) return;
    setViewsBusy(true);
    invoke<{ views: Option[] }>("tencentSheet.views", { id, sourceId: binding.sourceId }, 120000).then(result => { if (current) setViews(result.views); }).catch(error => { if (current) setError(String(error)); }).finally(() => { if (current) setViewsBusy(false); });
    return () => { current = false; };
  }, [id, binding.sourceId, binding.queryMode]);
  const options = (items: Option[]) => items.map(item => ({ value: item.id, label: item.name }));
  const values = schema.filter(value => ["number", "formula", "rollup"].includes(value.type ?? "")), dates = schema.filter(value => value.type === "date");
  const pending = disabled || sourcesBusy || schemaBusy || (binding.queryMode === "view" && viewsBusy);
  const valid = sources.some(source => source.id === binding.sourceId) && values.some(value => value.id === binding.valueFieldId) && (binding.queryMode === "date" ? dates.some(value => value.id === binding.dateFieldId) : views.some(value => value.id === binding.datasetId));
  return <fieldset className="tencent-sheet-panel" disabled={disabled}>
    <legend>绑定 Notion：{field.name}</legend>
    <p className="tencent-sheet-help">选择这个业务字段的数据来源，默认获取本次业务日期当天的数据；例如补填 8 月 31 日，就查询 8 月 31 日。保存后接着录制网页位置。</p>
    <label>Notion 数据库<ChoicePicker loading={sourcesBusy} value={binding.sourceId} options={options(sources)} placeholder="选择已有数据库" ariaLabel="Notion 数据库" disabled={pending} onChange={sourceId => setBinding({ ...binding, sourceId, valueFieldId: "", dateFieldId: "", datasetId: "" })} /></label>
    <label>取数方式<ChoicePicker value={binding.queryMode} options={[{ value: "date", label: "按业务日期筛选后汇总" }, { value: "view", label: "汇总指定 View 的筛选结果" }]} placeholder="选择取数方式" disabled={pending} onChange={queryMode => { setError(""); setBinding({ ...binding, queryMode: queryMode as "date" | "view" }); }} /></label>
    <div className="tencent-sheet-grid"><label>数值字段<ChoicePicker loading={schemaBusy} value={binding.valueFieldId} options={options(values)} placeholder="选择要汇总的数值字段" disabled={pending} onChange={valueFieldId => setBinding({ ...binding, valueFieldId })} /></label>
      {binding.queryMode === "date" ? <label>日期字段<ChoicePicker loading={schemaBusy} value={binding.dateFieldId} options={options(dates)} placeholder="选择用于筛选的日期字段" disabled={pending} onChange={dateFieldId => setBinding({ ...binding, dateFieldId })} /></label> : <label>Notion View<ChoicePicker loading={viewsBusy} value={binding.datasetId} options={options(views)} placeholder="选择真实 View" disabled={pending} onChange={datasetId => setBinding({ ...binding, datasetId })} /></label>}
    </div>
    {binding.queryMode === "date" ? <label>统计范围<ChoicePicker value={binding.period} options={[{ value: "day", label: "业务日期当天" }, { value: "month", label: "业务日期所在月月初至该日" }, { value: "year", label: "业务日期所在年年初至该日" }]} placeholder="选择统计范围" disabled={pending} onChange={period => setBinding({ ...binding, period })} /></label> : <p className="tencent-sheet-help">使用该 View 在 Notion 中的真实筛选结果，不额外添加日期条件。需要业务日期当天的数据，请使用按业务日期筛选。</p>}

    {error && <p role="alert">{error}</p>}
    <div className="tencent-sheet-actions"><button className="primary" disabled={pending || !valid} onClick={() => onSave({ ...binding, sourceName: sources.find(source => source.id === binding.sourceId)?.name, valueFieldName: values.find(value => value.id === binding.valueFieldId)?.name, datasetName: views.find(value => value.id === binding.datasetId)?.name })}>{continueToTeaching ? "下一步 · 录制位置" : "保存数据绑定"}</button><button className="secondary" disabled={disabled} onClick={onCancel}>稍后继续</button></div>
  </fieldset>;
}
