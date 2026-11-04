# shadcn-admin 外壳移植来源

上游：[satnaing/shadcn-admin](https://github.com/satnaing/shadcn-admin)。固定提交：`e16c87f213a5ba5e45964e9b67c792105ec74d26`。MIT 原文见 [shadcn-admin-LICENSE.txt](shadcn-admin-LICENSE.txt)。复制与派生文件保留作者和提交声明。

## 源码对应

本项目目标目录为 `src/ProductionAssistant.App/Assets/Prototype/src/`。

| 固定提交中的来源 | 本项目文件 | 适配 |
|---|---|---|
| `src/components/ui/{sidebar,button,separator,tooltip,dropdown-menu,sheet,input,skeleton}.tsx` | `components/ui/` 同名文件 | 保留实际 JSX、Tailwind 类和 Radix 交互；改相对导入；Sidebar 使用会话内状态替代 cookie；触发器中文与 ARIA；新 portal 加主题/reset 边界 |
| `src/components/layout/app-sidebar.tsx`、`app-title.tsx` | `components/layout/OperationSidebar.tsx` | 保留 Header/Content/Footer/Rail 和菜单结构；使用生产助手品牌、七个入口和设置，移除团队与账号 |
| `src/components/layout/nav-group.tsx` 的 `NavGroup` / `SidebarMenuLink` | `components/layout/NavGroup.tsx` | 使用平级业务组；TanStack Link/位置判断替换为现有 query 导航回调和 route；没有复制无业务需求的子菜单、徽标 |
| `src/components/layout/header.tsx` | `components/layout/AppHeader.tsx` | 保留上游布局、64px 高度、SidebarTrigger 和 Separator；加入当前业务名称、真实设置入口及上游 ThemeSwitch |
| `src/components/layout/main.tsx` | `components/layout/PageContainer.tsx` | 保留 16px 横向、24px 纵向间距及 fluid 选项；外层改用 div，避免和现有业务页面的 main 地标嵌套 |
| `src/components/layout/authenticated-layout.tsx` | `components/layout/AppLayout.tsx` | 保留 SidebarProvider → Sidebar → SidebarInset；不引入认证、搜索和路由 Provider；接入现有页面与 Suspense 边界 |
| `src/components/theme-switch.tsx`、`src/context/theme-provider.tsx` | `components/layout/ThemeSwitch.tsx`、`ThemeProvider.tsx` | 真实浅色/深色/系统切换；主题限于新外壳及 portal；暂不持久化或统一旧页面主题 |
| `src/hooks/use-mobile.tsx`、`src/lib/utils.ts` 的 `cn` | `components/layout/use-mobile.tsx`、`utils.ts` | 保留 768px 断点和 clsx/tailwind-merge；测试无 matchMedia 时按桌面处理 |
| `src/styles/theme.css`、`src/styles/index.css` | `styles/shadcn-theme.css`、`styles/shadcn-shell.css` | 原始 OKLCH 颜色、圆角与 Tailwind 主题映射；变量从全局迁到 `.pa-shell-theme`；仅移植外壳所需 base 样式 |

## 隔离与必要偏离

- `vite.config.ts` 的 PostCSS 边界把现有平级业务 CSS 包在 `@scope (body) to ([data-shadcn-surface])` 中，将原 `:root` 定义保留为作用域根变量；旧规则（包括 `!important` 和 `all: revert`）无法进入新 Sidebar、Header 或新 portal。
- Tailwind 实际 preflight/base 限于 `@scope ([data-shadcn-surface])`，不对旧业务输入、表格、设置和 iframe 施加新 reset。不是仅给 utilities 加前缀。
- 新主题沿用上游颜色；旧内容根局部恢复原 `--primary`、`--border` 等值，避免同名变量串用。旧 portal 继续使用旧 body 变量；新 Radix portal 的 `PortalSurface` 携带同一套主题与 reset。
- `operation-sidebar.css` 已移除原 222px 导航视觉，仅保留宿主几何与旧内容适配：WinUI 可信 HTTPS 来源预留原生 48px 标题栏，Electron 的 `pa:` 文档不留此空白。该判断不读取宿主对象或发送 IPC。
- 保留上游 16rem 侧栏、3rem 图标宽度变量、inset 间距/边框/阴影/圆角、导航 14px 与分组 12px 字号。中文使用现有离线 Inter Variable / Noto Sans SC Variable 字体。
- 保留上游 Ctrl+B 侧栏快捷键，但编辑器、输入框和已处理的事件不拦截，避免破坏现有文本编辑功能。
- 收起状态的透明分组标题禁用指针命中，防止负 margin 的标题框拦截前一组图标点击；不改变其尺寸、间距、动画或颜色。
- 旧页面重复的一级标题改为仅辅助技术可读，业务配置按钮、状态与表单保留；旧外层宽度和背景不覆盖新 inset。内容变窄时生产消息两栏纵向重排，防止旧固定列挤出窗口。这些是宿主/旧业务兼容适配，不改数据逻辑。
- 旧业务内部、iframe 和旧设置弹窗仍保持浅色；完整主题统一、持久化与业务控件替换留给 UI-1b 及后续阶段。浏览器布局检查不代表 Electron、WinUI 或 Sidecar 真实业务验收。

## 依赖与验证边界

Tailwind CSS / Vite 插件锁定 `4.2.2`；插件声明支持 Vite `^5.2.0 || ^6 || ^7 || ^8`。保留现有 React 19、Vite 6、TypeScript 5 和 Vitest 2；仅增加实际组件使用的 Radix、CVA、clsx、tailwind-merge、tw-animate-css 及 PostCSS。完整锁定结果以 `package-lock.json` 为准。

没有复制 Clerk、TanStack Router/Query、Zustand、Axios、演示 Dashboard 或业务数据。没有修改 Electron、preload、Bridge、Sidecar 白名单或 .NET 代码。验证结果、下一步及人工验收状态见根目录 `STATUS.md`。
