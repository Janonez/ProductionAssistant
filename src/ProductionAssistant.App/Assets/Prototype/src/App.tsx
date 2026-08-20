import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { BarChart3, ChevronRight, Database, FileText, MessageSquareText, Sparkles, WandSparkles } from 'lucide-react'
import { invoke, notifyReady } from './bridge'
import type { Overview, Route } from './types'
import { DailyReportPage } from './DailyReportPage'
import { ProductionMessagePage } from './ProductionMessagePage'
import { ReportCenterPage } from './ReportCenterPage'

const modules = [
  { title: '挂网计划 PDF', text: '审查计划并导出候选文件', icon: FileText, native: 'plan-pdf' },
  { title: '生产会资料拆分', text: '按项目整理生产会 Excel', icon: Sparkles, native: 'production-meeting' },
  { title: '每日焊接模拟', text: '生成并同步每日焊接数据', icon: WandSparkles, native: 'daily-weld' },
  { title: '生产消息入库', text: '解析消息、核对并写入 Notion', icon: MessageSquareText, native: 'production-message' },
  { title: '日报推送', text: '组合 Notion 数据并定时推送', icon: Database, native: 'daily-report' }
  ,{ title: '报表中心', text: '自动采集并汇总加工日报', icon: BarChart3, native: 'report-center' }
]

export function App() {
  const [location, setLocation] = useState(() => window.location.search)
  useEffect(() => {
    const changed = () => setLocation(window.location.search)
    window.addEventListener('popstate', changed)
    return () => window.removeEventListener('popstate', changed)
  }, [])
  const search = new URLSearchParams(location)
  const requested = search.get('route')
  const route = (requested === 'production-message' || requested === 'daily-report' || requested === 'report-center' ? requested : 'home') as Route
  const navigation = search.get('navigation') || ''
  const [overview, setOverview] = useState<Overview>()
  const reduced = useReducedMotion()
  useEffect(() => { invoke<Overview>('app.getOverview').then(setOverview).catch(() => undefined) }, [])
  useEffect(() => { notifyReady(route, navigation) }, [route, navigation])
  const goNative = (tag: string) => invoke('app.navigateNative', { tag }).catch(() => undefined)
  return <div className="app-shell"><main>
      <AnimatePresence mode="wait">
        <motion.div key={route} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -6 }} transition={{ duration: .2 }}>
          {route === 'home' ? <HomePage overview={overview} native={goNative} /> : route === 'daily-report' ? <DailyReportPage /> : route === 'report-center' ? <ReportCenterPage /> : <ProductionMessagePage />}
        </motion.div>
      </AnimatePresence>
    </main></div>
}
function HomePage({ overview, native }: { overview?: Overview; native: (tag: string) => void }) {
  return <div className="page home-page">
    <header><div><span className="eyebrow">工作台</span><h1>今天要处理什么？</h1><p>常用生产流程集中在一个清爽、可预期的工作区。</p></div><div className={`readiness ${overview?.notionConfigured ? 'ready' : ''}`}><span />{overview?.notionConfigured ? 'Notion 已连接' : 'Notion 待配置'}</div></header>
    <section className="hero"><div><span className="hero-chip"><Sparkles />生产工作台</span><h2>更轻盈的生产工作流</h2><p>常用模块集中呈现，生产消息入库已接入现有业务能力。</p></div><button onClick={() => native('production-message')}>打开生产消息 <ChevronRight /></button></section>
    <div className="section-heading"><div><h2>业务模块</h2><p>保持原有模块边界，仅更新使用体验。</p></div></div>
    <section className="module-grid">{modules.map(({ title, text, icon: Icon, native: nativeTag }) =>
      <motion.button whileHover={{ y: -3 }} whileTap={{ scale: .99 }} key={title} onClick={() => native(nativeTag!)}>
        <span className="module-icon"><Icon /></span><span><strong>{title}</strong><small>{text}</small></span><ChevronRight className="chevron" />
      </motion.button>)}</section>
  </div>
}
