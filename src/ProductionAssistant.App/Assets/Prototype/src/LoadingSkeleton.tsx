import type { ReactNode } from 'react'
import { ThreeStepProgress } from './ThreeStepProgress'

const Text = ({ children }: { children: ReactNode }) => <span className="skeleton-text">{children}</span>
export const SkeletonBlock = ({ className = '' }: { className?: string }) => <span className={`skeleton-block ${className}`} aria-hidden="true" />

export function SkeletonLines({ rows = 3, label = '正在加载数据' }: { rows?: number; label?: string }) {
  return <div className="skeleton-lines" role="status" aria-label={label} aria-busy="true">{Array.from({ length: rows }, (_, i) => <SkeletonBlock key={i} />)}</div>
}

export function AutomationSkeleton() {
  return <div className="page daily-page automation-list-page skeleton-page" role="status" aria-label="正在加载自动化任务" aria-busy="true">
    <header aria-hidden="true"><div><h1><Text>自动化任务</Text></h1><p><Text>管理定时推送与自动填报，查看任务配置和运行情况。</Text></p></div><SkeletonBlock className="skeleton-button" /></header>
    <section className="daily-job-list" aria-hidden="true">{[0, 1, 2].map(i => <article className="daily-job-card" key={i}>
      <div className="job-copy"><h2><span className="automation-task-name"><Text>自动化任务名称</Text></span></h2><p><Text>任务类型 · 每天执行时间 · 连接状态</Text></p></div>
      <div className="job-actions"><SkeletonBlock className="skeleton-short" /><SkeletonBlock className="skeleton-toggle" /></div>
      <div className="automation-card-footer"><Text>最近运行：日期与执行结果</Text></div>
    </article>)}</section>
  </div>
}

export function TaskSkeleton({ kind = 'message' }: { kind?: 'message' | 'notion' | 'tencent' }) {
  if (kind === 'tencent') return <div className="tencent-demo" role="status" aria-label="正在加载填报配置" aria-busy="true"><div className="page tencent-sheet-workbench" aria-hidden="true">
    <button className="crumb" disabled tabIndex={-1}><Text>← 返回任务列表</Text></button>
    <div className="titlebar"><div><h1><Text>腾讯文档填报</Text></h1><div className="subtitle"><Text>腾讯文档填报 · 业务日期</Text></div></div></div>
    <div className="status-strip">{['文档连接待检查','网页控件待录制','业务字段待绑定','定时未启用'].map(title => <span className="status-chip" key={title}><Text>{title}</Text></span>)}</div>
    <div className="tabs">{['文档与账号','网页控件','业务字段','执行规则','测试与上线'].map(title => <button className="tab" disabled tabIndex={-1} key={title}><Text>{title}</Text></button>)}</div>
    <div className="card tencent-sheet-panel"><h2><Text>目标文档</Text></h2><p className="hint"><Text>填报的目标腾讯共享表格。</Text></p><SkeletonBlock className="skeleton-input" /><SkeletonLines rows={2} /></div>
  </div></div>
  return <div className={`skeleton-task skeleton-task-${kind}`} role="status" aria-label="正在加载任务配置" aria-busy="true">
    <div className="skeleton-task-header" aria-hidden="true"><SkeletonBlock className="skeleton-title" /><SkeletonBlock className="skeleton-button" /></div>
    <div className="skeleton-workspace" aria-hidden="true"><div><SkeletonBlock className="skeleton-title" /><SkeletonLines rows={5} /></div><div><SkeletonBlock className="skeleton-title" /><SkeletonLines rows={5} /></div></div>
  </div>
}

export function RouteSkeleton({ route }: { route: string }) {
  if (route === 'daily-report') return <AutomationSkeleton />
  if (route === 'production-message' || route === 'daily-weld') {
    const weld = route === 'daily-weld'
    return <div className="app-shell skeleton-page" role="status" aria-label={weld ? '正在加载焊接计划' : '正在加载生产消息'} aria-busy="true"><main className="main-content">
      <header className="content-header" aria-hidden="true"><h1><Text>{weld ? '每日焊接数据模拟' : '生产消息入库'}</Text></h1><SkeletonBlock className="skeleton-icon" /></header>
      <div className={`production-message-scroll ${weld ? 'daily-weld-page' : ''}`} aria-hidden="true">
        <div className="skeleton-steps"><ThreeStepProgress current={1} titles={weld ? ['计划信息', '拆分预览', '入库完成'] : ['输入消息', '核对数据', '入库完成']} label="" /></div>
        {weld ? <section className="weld-plan-card"><div className="weld-section-heading"><h2><Text>计划信息</Text></h2></div><div className="weld-fields">{[0, 1].map(i => <div className="weld-field" key={i}><SkeletonBlock className="skeleton-short" /><SkeletonBlock className="skeleton-input" /></div>)}</div><SkeletonLines rows={2} /><div className="weld-actions"><SkeletonBlock className="skeleton-button" /></div></section>
          : <div className="workspace-panel"><section className="message-pane"><div className="pane-title"><h2><Text>原始消息</Text></h2><p><Text>输入生产消息，系统将自动解析并检查已有数据。</Text></p></div><div className="message-textarea skeleton-block" /><div className="parse-action"><SkeletonBlock className="skeleton-button" /></div></section><section className="review-pane"><div className="review-empty"><h2><Text>解析结果</Text></h2><p><Text>解析消息后，数据检查结果将在这里显示。</Text></p></div></section></div>}
      </div>
    </main></div>
  }
  if (route === 'database-viewer') return <div className="page database-viewer-page skeleton-page" role="status" aria-label="正在加载数据库" aria-busy="true">
    <header aria-hidden="true"><div><h1><Text>数据库查看</Text></h1><p><Text>按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。</Text></p></div><SkeletonBlock className="skeleton-button" /></header>
    <section className="database-query-panel" aria-hidden="true"><div className="database-query-heading"><h2><Text>查询条件</Text></h2><p><Text>选择数据库与查询范围</Text></p></div><div className="database-query-grid">{[0, 1, 2].map(i => <div className="skeleton-field" key={i}><SkeletonBlock className="skeleton-short" /><SkeletonBlock className="skeleton-input" /></div>)}</div><div className="database-query-actions"><SkeletonBlock className="skeleton-button" /></div></section>
  </div>
  const plan = route === 'plan-pdf', meeting = route === 'production-meeting'
  const prefix = plan ? 'plan' : meeting ? 'meeting' : 'report'
  return <div className={`page ${plan ? 'plan-pdf' : meeting ? 'meeting' : 'report-center'}-page skeleton-page`} role="status" aria-label="正在加载工作区" aria-busy="true">
    <header className={`${prefix}-header`} aria-hidden="true"><h1><Text>{plan ? '挂网计划导出' : meeting ? '生产会资料拆分' : '文件统计汇总'}</Text></h1><SkeletonBlock className={plan || meeting ? 'skeleton-short' : 'skeleton-icon'} /></header>
    <div className={`${prefix}-content`} aria-hidden="true">
      {plan && <section className="plan-source"><label><Text>月度目录</Text></label><div><SkeletonBlock className="skeleton-input" /><SkeletonBlock className="skeleton-button" /><SkeletonBlock className="skeleton-button" /></div></section>}
      <section className={`${prefix}-workspace`}><div className={`${prefix}-pane skeleton-pane`}><SkeletonBlock className="skeleton-title" /><SkeletonLines rows={2} /><SkeletonBlock className="skeleton-input" /><div className="skeleton-actions"><SkeletonBlock className="skeleton-button" /></div></div><div className={`${prefix}-pane skeleton-pane`}><SkeletonBlock className="skeleton-title" /><SkeletonLines rows={3} /></div></section>
    </div>
  </div>
}
