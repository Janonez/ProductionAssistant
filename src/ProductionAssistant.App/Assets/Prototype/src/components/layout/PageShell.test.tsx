import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it } from 'vitest'
import { PageHeader, PageShell } from './PageShell'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

it('renders the title, description, actions and body in one page landmark', async () => {
  const container = document.createElement('div')
  const root = createRoot(container)
  try {
    await act(async () => {
      root.render(
        <PageShell>
          <PageHeader title="生产消息入库" description="核对数据后入库。" actions={<button>数据库绑定</button>} />
          <p>页面主体</p>
        </PageShell>,
      )
    })
    const main = container.querySelector('main')
    expect(main?.querySelector('header h1')?.textContent).toBe('生产消息入库')
    expect(main?.querySelector('header p')?.textContent).toBe('核对数据后入库。')
    expect(main?.querySelector('header button')?.textContent).toBe('数据库绑定')
    expect(main?.textContent).toContain('页面主体')
  } finally {
    await act(async () => root.unmount())
  }
})
