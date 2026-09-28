import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown, Clock3 } from "lucide-react";

export function ChoicePicker({ value, options, placeholder, disabled, loading, ariaLabel, onChange }: { value: string; options: { value: string; label: string }[]; placeholder: string; disabled?: boolean; loading?: boolean; ariaLabel?: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const selected = options.find(option => option.value === value);
  return <div className="form-picker">
    <button type="button" className={`picker-trigger ${open ? "open" : ""}`} disabled={disabled || loading} aria-busy={loading || undefined} aria-label={loading ? `${ariaLabel || placeholder}，正在加载` : ariaLabel} aria-haspopup="listbox" aria-expanded={open && !loading} onClick={() => setOpen(!open)}><span className={selected ? "" : "picker-placeholder"}>{selected?.label || placeholder}</span><ChevronDown /></button>
    {open && !loading && <><button type="button" className="picker-backdrop" aria-label="关闭选项" onClick={() => setOpen(false)} /><motion.div className="picker-popover choice-popover" role="listbox" initial={reduceMotion ? false : { opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0, transitionEnd: { transform: "none" } }} transition={{ duration: reduceMotion ? 0 : .12 }}>
      {options.map(option => <button type="button" role="option" aria-selected={option.value === value} className={option.value === value ? "selected" : ""} key={option.value} onClick={() => { onChange(option.value); setOpen(false) }}><span>{option.label}</span>{option.value === value && <Check />}</button>)}
      {!options.length && <span className="picker-empty">暂无可选项</span>}
    </motion.div></>}
  </div>;
}

export function TimePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const popover = useRef<HTMLDivElement>(null);
  const [hour = "17", minute = "30"] = value.split(":");
  const choose = (nextHour: string, nextMinute: string) => onChange(`${nextHour}:${nextMinute}`);
  useEffect(() => {
    if (!open) return;
    popover.current?.querySelectorAll<HTMLButtonElement>(".time-column button.selected")
      .forEach(button => button.scrollIntoView({ block: "center" }));
  }, [open, hour, minute]);
  return <div className="form-picker">
    <button type="button" className={`picker-trigger time-trigger ${open ? "open" : ""}`} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(!open)}><Clock3 /><span>{value}</span><ChevronDown /></button>
    {open && <><button type="button" className="picker-backdrop" aria-label="关闭时间选择" onClick={() => setOpen(false)} /><motion.div ref={popover} className="picker-popover time-popover" role="dialog" aria-label="选择发送时间" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0, transitionEnd: { transform: "none" } }} transition={{ duration: .12 }}>
      {[{ title: "时", values: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")), selected: hour, change: (item: string) => choose(item, minute) }, { title: "分", values: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")), selected: minute, change: (item: string) => choose(hour, item) }].map(column => <div className="time-column" key={column.title}><strong>{column.title}</strong><div>{column.values.map(item => <button type="button" className={item === column.selected ? "selected" : ""} key={item} onClick={() => column.change(item)}>{item}</button>)}</div></div>)}
      <button type="button" className="time-done" onClick={() => setOpen(false)}>完成</button>
    </motion.div></>}
  </div>;
}
