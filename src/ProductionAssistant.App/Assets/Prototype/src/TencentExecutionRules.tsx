import { useState } from "react";
import DatePicker from "./DatePicker";

export type BusinessDateRule = { kind: "relative"; offsetDays: number } | { kind: "fixed"; date: string };
export type ExecutionSchedule = { weekdays: number[]; times: string[] };
export const defaultSchedule: ExecutionSchedule = { weekdays: [1, 2, 3, 4, 5, 6, 0], times: ["08:00"] };
const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export function TencentExecutionRules({ rule, schedule, disabled, onChange }: {
  rule: BusinessDateRule; schedule: ExecutionSchedule; disabled: boolean;
  onChange: (rule: BusinessDateRule, schedule: ExecutionSchedule) => void;
}) {
  const [customOffset, setCustomOffset] = useState(rule.kind === "relative" && ![-1, 0].includes(rule.offsetDays));
  const mode = rule.kind === "fixed" ? "fixed" : customOffset ? "offset" : rule.offsetDays === 0 ? "today" : "previous";
  return <fieldset className="card tencent-sheet-panel" disabled={disabled}>
    <h2>执行频率与业务日期</h2>
    <p className="tencent-sheet-help">执行时间决定什么时候开始；业务日期决定取哪天的数据、选择哪个月份的工作表、填写哪个位置。以下规则可独立组合。</p>
    <div className="tencent-sheet-grid">
      <label>执行频率<select value={schedule.weekdays.length === 7 ? "daily" : "weekly"} disabled={disabled} onChange={event => onChange(rule, { ...schedule, weekdays: event.target.value === "daily" ? [...defaultSchedule.weekdays] : [1, 2, 3, 4, 5] })}><option value="daily">每天</option><option value="weekly">指定星期</option></select></label>
      <label>业务日期<select value={mode} disabled={disabled} onChange={event => { const mode = event.target.value; setCustomOffset(mode === "offset"); onChange(mode === "fixed" ? { kind: "fixed", date: "" } : { kind: "relative", offsetDays: mode === "today" ? 0 : rule.kind === "relative" && mode === "offset" ? rule.offsetDays : -1 }, schedule); }}><option value="previous">执行当天的前一天</option><option value="today">执行当天</option><option value="offset">相对执行当天偏移 N 天</option><option value="fixed">指定固定日期</option></select></label>
    </div>
    {schedule.weekdays.length !== 7 && <div className="tencent-sheet-actions" role="group" aria-label="执行星期">{[1, 2, 3, 4, 5, 6, 0].map(day => <label className="tencent-sheet-date-mode" key={day}><input type="checkbox" checked={schedule.weekdays.includes(day)} onChange={event => onChange(rule, { ...schedule, weekdays: event.target.checked ? [...schedule.weekdays, day] : schedule.weekdays.filter(value => value !== day) })} />{weekdays[day]}</label>)}</div>}
    {mode === "offset" && rule.kind === "relative" && <label>偏移天数（负数向前，正数向后）<input type="number" min="-3660" max="3660" step="1" value={Number.isFinite(rule.offsetDays) ? rule.offsetDays : ""} onChange={event => onChange({ kind: "relative", offsetDays: event.target.value === "" ? NaN : Number(event.target.value) }, schedule)} /></label>}
    {rule.kind === "fixed" && <DatePicker label="固定业务日期" value={rule.date} onChange={date => onChange({ kind: "fixed", date }, schedule)} disabled={disabled} />}
    <div className="divider" /><div className="tencent-sheet-grid">{schedule.times.map((time, index) => <div key={index}><label>执行时刻 {index + 1}（北京时间）</label><div className="tencent-sheet-actions"><input type="time" aria-label={`执行时刻 ${index + 1}（北京时间）`} value={time} onChange={event => onChange(rule, { ...schedule, times: schedule.times.map((value, position) => position === index ? event.target.value : value) })} /><button className="ghost" disabled={schedule.times.length === 1} onClick={() => onChange(rule, { ...schedule, times: schedule.times.filter((_, position) => position !== index) })}>移除时刻 {index + 1}</button></div></div>)}</div>
    <button className="secondary" disabled={schedule.times.length >= 24} onClick={() => { const next = Array.from({ length: 24 }, (_, hour) => `${String(hour).padStart(2, "0")}:00`).find(time => !schedule.times.includes(time)); if (next) onChange(rule, { ...schedule, times: [...schedule.times, next] }); }}>添加执行时刻</button>
    <p className="tencent-sheet-help">保存规则不会自动启用定时。先完成前台或后台测试；当前配置后台测试通过后，可在任务列表启用定时。临时补填日期只影响本次测试。</p>
  </fieldset>;
}
