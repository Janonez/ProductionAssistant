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
| `src/components/theme-switch.tsx`、`src/context/theme-provider.tsx` | `components/layout/ThemeSwitch.tsx`、`ThemeProvider.tsx` | 保留浅色/深色/系统切换和系统主题监听；用 localStorage 持久化选择；主题仍限于新外壳及 portal，不统一旧页面主题 |
| `src/hooks/use-mobile.tsx`、`src/lib/utils.ts` 的 `cn` | `components/layout/use-mobile.tsx`、`utils.ts` | 保留 768px 断点和 clsx/tailwind-merge；测试无 matchMedia 时按桌面处理 |
| `src/styles/theme.css`、`src/styles/index.css` | `styles/shadcn-theme.css`、`styles/shadcn-shell.css` | 原始 OKLCH 颜色、圆角与 Tailwind 主题映射；变量从全局迁到 `.pa-shell-theme`；仅移植外壳所需 base 样式 |

## 隔离与必要偏离

- `vite.config.ts` 的 PostCSS 边界把现有平级业务 CSS 包在 `@scope (body) to ([data-shadcn-surface])` 中，将原 `:root` 定义保留为作用域根变量；旧规则（包括 `!important` 和 `all: revert`）无法进入新 Sidebar、Header 或新 portal。
- Tailwind 实际 preflight/base 限于 `@scope ([data-shadcn-surface])`，不对旧业务输入、表格和 iframe 施加新 reset；UI-1b-2 的全局设置 Dialog 位于新主题表面内。不是仅给 utilities 加前缀。
- 新主题沿用上游颜色；旧内容根局部恢复原 `--primary`、`--border` 等值，避免同名变量串用。旧 portal 继续使用旧 body 变量；新 Radix portal 的 `PortalSurface` 携带同一套主题与 reset。
- `operation-sidebar.css` 已移除原 222px 导航视觉，仅保留宿主几何与旧内容适配：WinUI 可信 HTTPS 来源预留原生 48px 标题栏；Electron `pa://app` 沿用 UI-1b-3 第一批的 32px Window Controls Overlay 安全区域留位。该布局判断不读取宿主对象或发送 IPC。
- 保留上游 16rem 侧栏、3rem 图标宽度变量、inset 间距/边框/阴影/圆角、导航 14px 与分组 12px 字号。中文使用现有离线 Inter Variable / Noto Sans SC Variable 字体。
- 保留上游 Ctrl+B 侧栏快捷键，但编辑器、输入框和已处理的事件不拦截，避免破坏现有文本编辑功能。
- UI-1b-3 第二批只为受控移动 Sidebar Sheet 补充 Radix 官方 onCloseAutoFocus 回调：Header 的 SidebarTrigger 位于 Sheet Root 外，默认 triggerRef 为空；关闭时回到现有 aria-controls=business-navigation 的 Header 按钮。焦点约束、Escape、外部点击等机制继续由 Radix 承担，不新建焦点或状态系统；对应回归覆盖四种关闭入口。
- 收起状态的透明分组标题禁用指针命中，防止负 margin 的标题框拦截前一组图标点击；不改变其尺寸、间距、动画或颜色。
- 旧页面重复的一级标题改为仅辅助技术可读，业务配置按钮、状态与表单保留；旧外层宽度和背景不覆盖新 inset。内容变窄时生产消息两栏纵向重排，防止旧固定列挤出窗口。这些是宿主/旧业务兼容适配，不改数据逻辑。
- UI-1b-1 使用唯一 localStorage 键 `production-assistant-ui-theme-v1` 保存 `light`、`dark` 或 `system`。React 状态惰性初始化读取并校验，无记录、非法值或读取异常均回退 `system`；写入异常时仍更新当前会话状态。系统主题继续通过 matchMedia 监听，卸载时移除监听，不经过 Bridge / IPC，也不新增依赖。
- 不直接复制上游 cookie 和 html 全局主题方案：尚未迁移的页面有固定浅色色值、独立 iframe 和旧 portal；给 html / body 添加全局 dark 会突破现有兼容边界。保留唯一 ThemeProvider、`.pa-shell-theme` 与 `.pa-shell-theme.dark`，仅在新主题表面声明对应 `color-scheme`；旧 `.pa-legacy-content` 的直接浅色声明继续优先于祖先继承值。
- Electron 与 WinUI 复用主题代码，但 localStorage 受来源及浏览器 profile 隔离，主题偏好在各自宿主与运行环境独立保存，不自动同步。后续以 Electron 实际界面验收为主，WinUI 只保留过渡期必要兼容及基础回归，不要求长期视觉一致性；存储失败时当前会话有效不代表重启后能够保留。
- 旧业务内部与 iframe 仍保持浅色；UI-1b-2 已将全局设置接入共享主题，其他业务弹窗保留原样。Electron 宿主兼容性及 UI 收尾（UI-1b-3）与后续业务控件替换另行授权，具体边界见 [PLAN.md](../../PLAN.md)。ThemeSwitch 的 theme-color meta effect 保持原样。浏览器布局检查不代表 Electron 或 Sidecar 真实业务验收。

## UI-1b-2 官方 Dialog

- 组件来源为 shadcn/ui，源码声明固定提交 `c257f688cf4de7ec10cc1be84cad29cd4631182c`，对应 [apps/v4/registry/new-york-v4/ui/dialog.tsx](https://github.com/shadcn-ui/ui/blob/c257f688cf4de7ec10cc1be84cad29cd4631182c/apps/v4/registry/new-york-v4/ui/dialog.tsx)，本地文件为 `components/ui/dialog.tsx`。适用 MIT 许可；版权声明保留，完整文本见 [shadcn-ui-LICENSE.txt](shadcn-ui-LICENSE.txt)。
- 本地适配：使用现有 `@radix-ui/react-dialog` 包及相对导入；在 Radix Portal 内复用现有 PortalSurface 承载主题与 reset；关闭文案中文化并提供 closeLabel。Root、Overlay、Content、Title、Description、Close 仍委托 Radix，焦点约束、Escape 和外部点击关闭沿用其机制。
- 唯一 ThemeProvider 移至 App，外壳和设置共享主题。SettingsModal 仅通过官方 onCloseAutoFocus 回调恢复到实际打开入口；内部滚动和业务布局由限定作用域的 settings-modal.css 保留，按钮、输入框复用现有官方组件。设置错误边界同样使用此 Dialog，不保留第二套全局弹窗基础设施。
- 无新增依赖或锁文件变更；现有 `@radix-ui/react-dialog` 声明为 `^1.1.15`、锁定安装版本为 `1.1.23`，相关 DismissableLayer 为 `1.1.19`，沿用 React 19 / Vite 6 / Vitest 2。
- 本地组件结构和许可证已检查；本轮固定提交的官方源码逐行对照因网络 Cache miss 未完成，不声称已通过。自动化、Electron 人工验收和辅助 DOM 检查的实际状态只在根目录 STATUS.md 记录。

## Metis T2.1 业务页面组件

- 新增 `components/ui/{tabs,card,table,alert}.tsx`，沿用同一固定提交 `e16c87f213a5ba5e45964e9b67c792105ec74d26` 的 `src/components/ui/` 同名源码，来自 shadcn-admin 的 shadcn/ui 组件。保留 JSX、data-slot、Tailwind 类和 Radix 交互；只改为现有 `../layout/utils` 相对导入并压缩排版，保留版权声明和既有 MIT 许可证。上轮已读取上述四个固定提交源文件和官方组件文档。
- 没有覆盖已有 Button / Input / Dialog / DropdownMenu / Sheet 或 Portal 适配。项目没有 `components.json`，沿用固定源码集成方式，不重新初始化。唯一新增直接依赖是 `@radix-ui/react-tabs` 固定 `1.1.13`，peer 范围包含 React 19；Card / Table 无额外依赖，Alert 使用已有 CVA，未升级框架和工具链。锁文件包含 Tabs 的固定依赖与 npm 重写的可选平台元数据。
- 正式集团填报使用实际 Tailwind 入口 `styles/shadcn-shell.css`、其导入的 `styles/shadcn-theme.css` 及 `typography.css`；App 为该入口设置 `data-shadcn-surface` 并移除旧 `pa-legacy-content`，继承外壳主题。不新增主题或业务 CSS，不使用旧 Demo 样式。自动与人工验收结果统一见 STATUS。

## 依赖与验证边界

Tailwind CSS / Vite 插件锁定 `4.2.2`；插件声明支持 Vite `^5.2.0 || ^6 || ^7 || ^8`。保留现有 React 19、Vite 6、TypeScript 5 和 Vitest 2；仅增加实际组件使用的 Radix、CVA、clsx、tailwind-merge、tw-animate-css 及 PostCSS。完整锁定结果以 `package-lock.json` 为准。

没有复制 Clerk、TanStack Router/Query、Zustand、Axios、演示 Dashboard 或业务数据。没有修改 Electron、preload、Bridge、Sidecar 白名单或 .NET 代码。验证结果、下一步及人工验收状态见根目录 `STATUS.md`。
