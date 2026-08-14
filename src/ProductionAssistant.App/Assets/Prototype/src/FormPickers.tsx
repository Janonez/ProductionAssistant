import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { formatDate, monthGrid, parseDate, yearGrid } from "./calendar";

export function ChoicePicker({ value, options, placeholder, disabled, onChange }: { value: string; options: { value: string; label: string }[]; placeholder: string; disabled?: boolean; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(option => option.value === value);
  return <div className="form-picker">
    <button type="button" className={`picker-trigger ${open ? "open" : ""}`} disabled={disabled} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}><span className={selected ? "" : "picker-placeholder"}>{selected?.label || placeholder}</span><ChevronDown /></button>
    {open && <><button type="button" className="picker-backdrop" aria-label="关闭选项" onClick={() => setOpen(false)} /><motion.div className="picker-popover choice-popover" role="listbox" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .12 }}>
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
    {open && <><button type="button" className="picker-backdrop" aria-label="关闭时间选择" onClick={() => setOpen(false)} /><motion.div ref={popover} className="picker-popover time-popover" role="dialog" aria-label="选择发送时间" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .12 }}>
      {[{ title: "时", values: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")), selected: hour, change: (item: string) => choose(item, minute) }, { title: "分", values: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")), selected: minute, change: (item: string) => choose(hour, item) }].map(column => <div className="time-column" key={column.title}><strong>{column.title}</strong><div>{column.values.map(item => <button type="button" className={item === column.selected ? "selected" : ""} key={item} onClick={() => column.change(item)}>{item}</button>)}</div></div>)}
      <button type="button" className="time-done" onClick={() => setOpen(false)}>完成</button>
    </motion.div></>}
  </div>;
}

export function ReportDatePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const selected = parseDate(value);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"days" | "months" | "years">("days");
  const [visible, setVisible] = useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1));
  const days = monthGrid(visible.getFullYear(), visible.getMonth());
  const years = yearGrid(visible.getFullYear());
  const today = formatDate(new Date());
  const choose = (date: string) => { onChange(date); setOpen(false); const chosen = parseDate(date); setVisible(new Date(chosen.getFullYear(), chosen.getMonth(), 1)) };
  const toggle = () => { const next = !open; setOpen(next); setView("days"); if (next) setVisible(new Date(selected.getFullYear(), selected.getMonth(), 1)) };
  const move = (amount: number) => setVisible(view === "days" ? new Date(visible.getFullYear(), visible.getMonth() + amount, 1) : new Date(visible.getFullYear() + amount * (view === "years" ? 12 : 1), visible.getMonth(), 1));
  return <div className="date-picker">
    <button type="button" className={`date-trigger ${open ? "open" : ""}`} aria-haspopup="dialog" aria-expanded={open} onClick={toggle}><span>{value ? value.replaceAll("-", "/") : "选择日期"}</span><CalendarDays /></button>
    {open && <><button type="button" className="date-backdrop" aria-label="关闭日期选择器" onClick={() => setOpen(false)} /><motion.div className="calendar-popover" role="dialog" aria-label="选择日期" initial={{ opacity: 0, y: -6, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .14 }}>
      <div className="calendar-head"><button type="button" aria-label="上一页" onClick={() => move(-1)}><ChevronLeft /></button><button type="button" className="calendar-title" onClick={() => setView(current => current === "days" ? "months" : "years")}>{view === "years" ? `${years[0]}–${years[11]} 年` : `${visible.getFullYear()} 年${view === "days" ? ` ${visible.getMonth() + 1} 月` : ""}`}</button><button type="button" aria-label="下一页" onClick={() => move(1)}><ChevronRight /></button></div>
      {view === "days" ? <><div className="weekdays">{["日", "一", "二", "三", "四", "五", "六"].map(day => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{days.map(day => <button type="button" key={day.date} className={`${day.currentMonth ? "" : "outside"} ${day.date === value ? "selected" : ""} ${day.date === today ? "today" : ""}`} onClick={() => choose(day.date)}>{day.day}</button>)}</div></> : view === "months" ? <div className="month-grid">{Array.from({ length: 12 }, (_, month) => <button type="button" key={month} className={selected.getFullYear() === visible.getFullYear() && selected.getMonth() === month ? "selected" : ""} onClick={() => { setVisible(new Date(visible.getFullYear(), month, 1)); setView("days") }}>{month + 1} 月</button>)}</div> : <div className="month-grid year-grid">{years.map(year => <button type="button" key={year} className={selected.getFullYear() === year ? "selected" : ""} onClick={() => { setVisible(new Date(year, visible.getMonth(), 1)); setView("months") }}>{year}</button>)}</div>}
      <div className="calendar-footer"><button type="button" onClick={() => choose(today)}>今天</button></div>
    </motion.div></>}
  </div>;
}
