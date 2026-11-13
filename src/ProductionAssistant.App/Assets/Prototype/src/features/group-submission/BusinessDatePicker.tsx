import { lazy, Suspense, useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { zhCN } from 'date-fns/locale/zh-CN'
import { Button } from '../../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { formatDate } from '../../lib/calendar'

const Calendar = lazy(() => import('../../components/ui/calendar').then(module => ({ default: module.Calendar })))

// Official shadcn Date Picker composition; local dates always display yyyy-MM-dd.
export function BusinessDatePicker({ id, value, label, invalid, disabled = false, describedBy, onChange }: {
  id: string
  value: string
  label: string
  invalid: boolean
  disabled?: boolean
  describedBy?: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const parsed = value ? new Date(`${value}T12:00:00`) : undefined
  const selected = parsed && formatDate(parsed) === value ? parsed : undefined
  return <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button id={id} type="button" variant="outline" disabled={disabled} className="w-60 max-w-full shrink-0 justify-start text-left font-normal" aria-label={label} aria-invalid={invalid} aria-describedby={describedBy}>
        <CalendarIcon />{selected ? formatDate(selected) : '选择日期'}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-w-[calc(100vw-2rem)] p-0" align="start" aria-label={`选择${label}`}>
      <Suspense fallback={<div role="status" className="flex h-72 w-full items-center justify-center text-sm text-muted-foreground">正在加载日历…</div>}>
        <Calendar mode="single" required selected={selected} defaultMonth={selected} autoFocus locale={zhCN} disabled={disabled}
          className="w-full p-2 [--cell-size:calc((var(--radix-popover-trigger-width)_-_1rem_-_2px)/7)]" classNames={{ root: 'w-full' }}
          labels={{ labelDayButton: date => formatDate(date), labelNext: () => '下一月', labelPrevious: () => '上一月' }}
          onSelect={date => { onChange(formatDate(date)); setOpen(false) }} />
      </Suspense>
    </PopoverContent>
  </Popover>
}
