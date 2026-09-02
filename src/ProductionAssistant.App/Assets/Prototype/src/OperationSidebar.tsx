type Module = {
  category: string
  name: string
}

export const modules: Module[] = [
  { category: '文件处理', name: '挂网计划 PDF 导出' },
  { category: '文件处理', name: '生产会资料拆分' },
  { category: '数据同步', name: '每日焊接数据模拟' },
  { category: '数据同步', name: '生产消息 Notion 入库' },
  { category: '数据同步', name: '数据库查看' },
  { category: '自动化任务', name: '报表中心' },
  { category: '自动化任务', name: '日报推送' },
]

const categories = [...new Set(modules.map(module => module.category))]

function routeFor(name: string) {
  switch (name) {
    case '挂网计划 PDF 导出': return 'plan-pdf'
    case '生产会资料拆分': return 'production-meeting'
    case '每日焊接数据模拟': return 'daily-weld'
    case '生产消息 Notion 入库': return 'production-message'
    case '数据库查看': return 'database-viewer'
    case '报表中心': return 'report-center'
    case '日报推送': return 'daily-report'
    default: return 'plan-pdf'
  }
}

export function OperationSidebar({ active, navigate, openSettings }: {
  active: string
  navigate: (tag: string) => void
  openSettings: () => void
}) {
  return <aside className="sidebar">
    <div className="sidebar-top"><div className="sidebar-brand">生产助手</div></div>
    <nav className="sidebar-nav" aria-label="业务模块">
      {categories.map(category => <section className="sidebar-section" key={category}>
        <div className="sidebar-section-label">{category}</div>
        {modules.filter(module => module.category === category).map(module => {
          const route = routeFor(module.name)
          const selected = route === active
          return <button
            key={module.name}
            className={`sidebar-item ${selected ? 'sidebar-item-active' : ''}`}
            aria-current={selected ? 'page' : undefined}
            onClick={() => navigate(route)}
          >
            <NavIcon name={module.name} />
            <span>{module.name}</span>
          </button>
        })}
      </section>)}
    </nav>
    <div className="sidebar-bottom">
      <button
        className="sidebar-item"
        aria-haspopup="dialog"
        onClick={openSettings}
      >
        <NavIcon name="设置" />
        <span>设置</span>
      </button>
    </div>
  </aside>
}

function NavIcon({ name }: { name: string }) {
  if (name === '挂网计划 PDF 导出' || name === '生产会资料拆分') {
    return <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path className="folder-lid" d="M3.5 7h6l1.8 2h9.2" />
      <path d="M4.2 7h15.6l-1.3 11H5.5L4.2 7Z" />
    </svg>
  }
  if (name === '每日焊接数据模拟' || name === '日报推送') {
    return <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="4.5" width="14" height="15" rx="2" />
      <path d="M8 3v3M16 3v3M5 9h14" />
      <path className="daily-check" d="m8.5 14 2 2 4.5-4.5" />
    </svg>
  }
  if (name === '生产消息 Notion 入库') {
    return <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 14.5 6.2 6h11.6l2.2 8.5V19H4v-4.5Z" />
      <path className="inbox-tray" d="M4.3 14h4.1l1.2 2h4.8l1.2-2h4.1" />
      <path className="inbox-arrow" d="M12 5v7m-2.5-2.5L12 12l2.5-2.5" />
    </svg>
  }
  if (name === '数据库查看') {
    return <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  }
  if (name === '报表中心') {
    return <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 19h15" />
      <rect className="report-bar report-bar-one" x="6" y="12" width="2.5" height="6" rx="0.5" />
      <rect className="report-bar report-bar-two" x="10.75" y="8" width="2.5" height="10" rx="0.5" />
      <rect className="report-bar report-bar-three" x="15.5" y="5" width="2.5" height="13" rx="0.5" />
    </svg>
  }
  return <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path className="settings-ring" d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
  </svg>
}
