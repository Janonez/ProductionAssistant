import { Fragment } from 'react'
import { Check } from 'lucide-react'

export function ThreeStepProgress({ current, titles, label }: {
  current: 1 | 2 | 3
  titles: readonly [string, string, string]
  label: string
}) {
  const steps = titles.map((title, index) => ({ number: index + 1, title }))
  return <div className="step-bar" aria-label={label}>{steps.map((step, index) => {
    const state = step.number < current ? 'done' : step.number === current ? 'active' : 'pending'
    return <Fragment key={step.number}>
      <div className={`step step-${state}`} aria-current={state === 'active' ? 'step' : undefined}>
        <div className={`step-circle ${state}`}>{state === 'done' ? <Check /> : step.number}</div>
        <span>{step.title}</span>
      </div>
      {index < steps.length - 1 && <div className={`step-line ${step.number < current ? 'done' : step.number === current ? 'transition' : 'pending'}`} />}
    </Fragment>
  })}</div>
}
