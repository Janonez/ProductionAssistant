export type WorkflowStepTransition = {
  from: number
  target: number
  direction: 1 | -1
  phase: 'node' | 'rail' | 'arrive'
}

export function WorkflowProgress({
  label,
  steps,
  currentStep,
  direction,
  transition,
  busy = false,
}: {
  label: string
  steps: string[]
  currentStep: number
  direction: 1 | -1
  transition?: WorkflowStepTransition
  busy?: boolean
}) {
  const progressStep = transition?.phase === 'rail' || transition?.phase === 'arrive'
    ? transition.target
    : currentStep
  const filledSegments = Math.min(progressStep, steps.length - 1)

  return <nav className="daily-progress" aria-label={label}>
    <div className="progress-meta"><span>当前步骤</span><strong>{Math.min(currentStep + 1, steps.length)} / {steps.length}</strong></div>
    <div className="progress-rail">
      <div className="progress-segments" aria-hidden="true">
        {steps.slice(1).map((_, index) => <span key={index}><i style={{ width: index < filledSegments ? '100%' : '0%' }} /></span>)}
      </div>
      <ol className={direction < 0 ? 'backward' : 'forward'} style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {steps.map((title, index) => {
          const transitionFromNode = transition ? Math.min(transition.from, steps.length - 1) : -1
          const baseDone = index < currentStep || currentStep === steps.length
          const leavingForward = transition?.direction === 1 && transition.phase !== 'arrive' && index === transitionFromNode
          const leavingBackward = transition?.direction === -1 && transition.phase !== 'arrive' && index === transitionFromNode
          const done = !leavingBackward && (baseDone || leavingForward)
          const stateClass = leavingBackward ? 'idle' : done ? 'done' : index === currentStep ? `active${busy ? ' working' : ''}` : 'idle'
          const transitionClass = transition?.phase === 'node' && index === transitionFromNode
            ? transition.direction > 0 ? ' just-completed' : ' just-back-leave'
            : transition?.phase === 'arrive' && index === transition.target
              ? transition.direction > 0 ? ' just-active' : ' just-back-active'
              : ''
          return <li key={title} className={`${stateClass}${transitionClass}`} aria-current={index === currentStep ? 'step' : undefined} aria-label={`${title}，${done ? '已完成' : index === currentStep ? '当前步骤' : '未开始'}`}>
            <span>{done ? '✓' : index + 1}</span>
            <strong>{title}</strong>
          </li>
        })}
      </ol>
    </div>
  </nav>
}
