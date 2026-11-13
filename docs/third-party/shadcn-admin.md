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

## Metis 全局 Breadcrumb

- `components/ui/breadcrumb.tsx` 来自 shadcn/ui 固定提交 `8ab27715521cbd4f87ae6886cd989cbb678f6de7` 的 [apps/v4/registry/new-york-v4/ui/breadcrumb.tsx](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/ui/breadcrumb.tsx)。沿用 MIT 许可及 [shadcn-ui-LICENSE.txt](shadcn-ui-LICENSE.txt)。提交、签名及本地 ZIP / 解压文件 / 官方内容在实施前已完成认证，不将本组件标记为旧 Dialog 的提交版本。
- 保留全部七个官方导出、Props、语义结构、ARIA、data-slot 和 Tailwind 类；仅将 `cn` 改为现有 `../layout/utils`，将聚合包 `radix-ui` 的 `Slot.Root` 改为项目已有 `@radix-ui/react-slot` 的 `Slot`，并加入来源声明。继续使用现有 Lucide，不新增依赖或改锁文件。
- 全局 Shell 直接使用 `navigationModule(route, taskType)` 的 `category` / `name`，与侧栏共享唯一导航配置。当前分组没有页面目标，只渲染弱化文字和官方默认分隔符，不伪装成 BreadcrumbLink；当前页使用 BreadcrumbPage。无分组时只显示当前页，未知 Shell 路由显示状态文案“未知页面”，无效任务分类保留既有反馈；默认与旧路由前缀继续由现有宿主路由解析处理。
- 单行、收缩与截断仅在 AppLayout 的组合处通过 Tailwind 类约束，不改官方组件默认样式。删除被替代的标题 span，保留其 `data-current-page-title` 检测属性到 BreadcrumbPage，以兼容 T2.1 的冷进入闪现回归。AppHeader、侧栏、主题、窗口拖动区与页面内部标题保持；页内详情和 Tab 不增加路由层级。自动验证及人工验收进度见 STATUS。

## Metis 业务配置 UI

- 新增 `components/ui/{item,badge,label,alert-dialog}.tsx`，来源为 shadcn/ui 固定提交 `8ab27715521cbd4f87ae6886cd989cbb678f6de7` 的 `apps/v4/registry/new-york-v4/ui/` 同名文件（例如 [Item 源码](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/ui/item.tsx)）。本轮读取项目已有的该版本参考源码后集成，保留全部导出、官方结构、样式及 MIT 声明，完整许可见 [shadcn-ui-LICENSE.txt](shadcn-ui-LICENSE.txt)。网页读取工具的固定源码 URL 返回 Cache miss；本轮没有把该请求记作在线核对通过。
- 适配仅为相对 `cn` / 组件导入、聚合 `radix-ui` 到独立 Radix 包的等价导入，以及 AlertDialog Portal 内的既有 `PortalSurface`，保证主题和 reset 边界一致。ItemSeparator 继续复用现有 Separator，不复制实现；不覆盖原有 Button、Dialog、Input 或 DropdownMenu。
- 新增直接依赖 `@radix-ui/react-alert-dialog` 固定 `1.1.15`、`@radix-ui/react-label` 固定 `2.1.7`，沿用 React 19、Tailwind 4、Vite 6 和既有锁文件。业务区域组合 ItemGroup / Item / Badge / Dialog / AlertDialog，设置容器仅增加本地导航，网页连接及执行规则内部组件保持原样。
- `business-configuration.mock.ts` 仅提供隔离的展示样例，业务名称、摘要及本地增删改不映射现有配置模型、不调用 Bridge、不写存储。位置配置仅展示相邻本地日期及待选择状态，不伪造选区、坐标或保存结果；实际验证状态见 STATUS。
- 行菜单使用 Radix 支持的 `modal={false}`（沿用 ThemeSwitch 的组合方式），避免项目现有不同版本 Menu / Dialog 焦点模块在菜单选择时同时约束焦点。确认与编辑弹窗仍为模态，菜单关闭不抢回弹窗焦点，弹窗关闭回到原入口；删除入口消失时回到新建按钮。不改共享菜单组件或整个依赖体系。

## Metis 第三轮统一业务配置

- 新增 `components/ui/{field,select}.tsx`，沿用 shadcn/ui 固定提交 `8ab27715521cbd4f87ae6886cd989cbb678f6de7` 中 `apps/v4/registry/new-york-v4/ui/` 的同名本地参考源码，保留全部导出、结构、默认类和 MIT 声明。官网 [Field](https://ui.shadcn.com/docs/components/field)、[Radix Select](https://ui.shadcn.com/docs/components/radix/select) 和 [Radix Item](https://ui.shadcn.com/docs/components/radix/item) 已读取；完整许可仍见 [shadcn-ui-LICENSE.txt](shadcn-ui-LICENSE.txt)。
- 适配只涉及既有相对导入、Select 从聚合 Radix 改为独立包，以及 Select Portal 内复用 `PortalSurface`。新增直接依赖 `@radix-ui/react-select` 固定 `2.3.7`；已核对 npm 元数据：该版本与现有 Dialog 共用 FocusScope `1.1.16`、DismissableLayer `1.1.19`，支持 React 19，未升级整个框架或 Radix 体系。
- 列表采用官方 Item 的 `asChild` 组合原生 button，外层保留 listitem 语义，增加轻微 hover；复用 ItemContent / ItemTitle / ItemSeparator。可见内容仅状态图标、名称和箭头，取消业务行菜单、Badge、摘要和操作按钮。原生按钮负责 Enter / Space 与焦点交互。
- 创建与编辑共用 `BusinessConfigDialog`，以 FieldGroup / Field / FieldLabel / FieldContent / FieldError 组织名称、数据来源及内联 `BusinessPositionField`。删除只在编辑模式提供；确认时暂停主 Dialog，取消确认回到原草稿，避免旧 AlertDialog 与现有 Dialog 的不同焦点模块同时约束焦点。
- `business-configuration.types.ts` 仅定义可替换的本地展示状态和 Select 选项，不能作为未来后端 DTO。现有数据源消费者需要 Bridge / schema，不直接当成业务数据项；本次默认选项为空，不调用 API 或编造业务数据。来源及既有位置均完整才显示完成；等待 / 错误状态可由外部展示输入传入，UI 不产生虚假的捕获或标定成功。上一节的行菜单和独立位置弹窗描述为此前实现，由本节替代。
- 标定日期按用户指定的 [Date Picker](https://ui.shadcn.com/docs/components/base/date-picker) 使用官方 Calendar + Popover 组合；新增 `components/ui/{calendar,popover}.tsx`，仍取自相同固定提交及源码目录。保留官方结构、完整导出和样式，只适配现有导入与 Popover PortalSurface。新增 `@radix-ui/react-popover` 固定 `1.1.23`、`react-day-picker` 固定 `9.11.1`，与现有 Dialog / React 19 兼容；未引入另一套 Base UI 运行时。
- `BusinessDatePicker` 仅组合这些官方组件，采用中文日历、日历键盘导航和选择后关闭；复用既有本地日期格式化函数，按钮始终显示 `yyyy-MM-dd`（例如 `2026-11-12`），不依赖系统本地化日期展示。只应用于本轮两个标定日期，其他页面原 DatePicker 保持。
- 中文 locale 直接从 `date-fns/locale/zh-CN` 导入，避免 `react-day-picker/locale` 重新导出全部语言。`date-fns` 将原本间接安装的同一版本 `4.4.0` 声明为直接依赖，没有升级其版本；原测试超时和断言不作调整。
- Calendar 模块只在日期 Popover 打开时以 React lazy / Suspense 加载，显示简短日历加载状态；未打开日期时不让 DayPicker 的模块图进入 App 启动加载链。集团页面保持原有直接加载和导航 / Skeleton 契约，不改启动测试或增加超时。

## Metis 填报位置 Collapsible

- 新增 `components/ui/collapsible.tsx`，取自 shadcn/ui 固定提交 [`8ab27715521cbd4f87ae6886cd989cbb678f6de7`](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/ui/collapsible.tsx)，保留官方三个导出、结构与 data-slot；仅显式导入 React 类型，并将聚合 Radix 导入替换为项目惯用的独立包。MIT 许可仍见 [shadcn-ui-LICENSE.txt](shadcn-ui-LICENSE.txt)。
- 用户已明确放宽本轮“不新增依赖”限制，仅增加 `@radix-ui/react-collapsible`，固定 `1.1.20`。npm 元数据已核对：其内部依赖版本与现有 Dialog 一致，复用现有 context / presence / primitive 等运行时，安装只新增一个包，没有升级其他框架。
- 业务 `BusinessPositionField` 组合官方 Collapsible / Item / Field / Badge。外层统一圆角边框，Item 自身移除边框，内容只加顶部分隔线；未配置默认展开、已有位置默认收起，原选区状态与重新选取草稿逻辑保持。
- 原官方 Collapsible 包装不附加动画样式；业务调用处复用现有 `tw-animate-css@1.4.0` 的 `animate-collapsible-down / animate-collapsible-up`，由 Radix 的测量高度变量和 data-state 驱动，尊重减少动画偏好，没有新增 keyframes 或手动测量 / 展开实现。官网 [Collapsible](https://ui.shadcn.com/docs/components/base/collapsible)、[Item](https://ui.shadcn.com/docs/components/base/item) 和 [Accordion](https://ui.shadcn.com/docs/components/base/accordion) 已核对，未采用 Accordion 或新增 Base UI 运行时。

## Metis 单列设置页与两步业务配置

- 新增 `components/ui/{switch,sonner,empty,spinner}.tsx`，均来自 shadcn/ui 固定提交 `8ab27715521cbd4f87ae6886cd989cbb678f6de7` 的 `apps/v4/registry/new-york-v4/ui/` 同名文件，已通过 GitHub 连接器读取核对。保留完整导出、结构和默认样式，遵循现有 [MIT 许可](shadcn-ui-LICENSE.txt)。官网 [Switch](https://ui.shadcn.com/docs/components/radix/switch)、[Sonner](https://ui.shadcn.com/docs/components/radix/sonner)、[Empty](https://ui.shadcn.com/docs/components/radix/empty) 和 [Spinner](https://ui.shadcn.com/docs/components/radix/spinner) 已核对。
- 本地适配仅为 `cn` 相对路径、Switch 改用独立 Radix 包、Sonner 改用已有 ThemeProvider 的 resolvedTheme、Spinner 的默认无障碍文字改为中文。Toast 使用既有主题 token，并将容器标签设为中文；没有引入 next-themes、第二套主题或手写同类控件。
- 本轮新增直接依赖 `@radix-ui/react-switch@1.2.6` 与 `sonner@2.0.8`，按 npm 元数据及实际类型检查确认兼容；安装共新增 11 个包（含间接依赖），没有升级 React / Vite / TypeScript 或其他既有框架。保留已有审计提示，不自动执行 audit fix。
- 业务区域本轮按用户最新方案改用现有官方 Table / Badge / Switch / DropdownMenu / AlertDialog；创建与编辑共用一个两步 Dialog，Field / Input / Select 和原 Date Picker 保留。空状态组合官方 Empty / EmptyContent，内容仅新建按钮。执行规则使用 Switch / Input 和 Sonner，分区之间复用 Separator，不引入独立 Card。
- `SubmissionSettingsAdapter` 是前端视图边界。`submission-settings.mock.ts` 隔离示例可填报项、文档名称 / 备注回退、可取消选区事件和规律 / 三天预览；所有示例选区明确标注为本地预览，不会操作真实文档。页面适配器还持有业务 / 规则草稿和备注，以便首次创建文档导致设置重挂载时恢复；离开集团页面即重置，不当作正式 DTO、持久化、调度或真实标定能力。
- 文档 URL 保存继续使用已有 `tencentSheet.save / create` 与 revision；登录继续使用已有 sessionStatus / sessionOpen，保留关闭浏览器不声称已登录、区分登录与文档访问、已启用任务不可改 URL 的约束。不增加 Bridge 操作或后端接口。
- 设置内容仅在第一次打开设置标签时 lazy 加载，并在之后保持挂载保留草稿；集团页面本身仍直接加载，不改变 route、侧栏、Breadcrumb、RouteReady 或启动测试超时。这样新增 Switch / Sonner 模块不再进入默认启动加载链，设置加载占位采用官方 Spinner。

## 依赖与验证边界

### 集团填报设置页网页配置与列表微调

- 新增 `components/ui/input-group.tsx`，来自既有 shadcn/ui 固定提交 [`8ab27715521cbd4f87ae6886cd989cbb678f6de7`](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/ui/input-group.tsx)，已通过 GitHub 连接器读取固定源码。沿用 [MIT 许可](shadcn-ui-LICENSE.txt)；保留 InputGroup / Addon / Button / Text / Input 的官方结构、类、变体及点击聚焦行为，仅适配本地导入和排版。不引入本轮未使用的 Textarea 导出及其组件，无新增依赖或锁文件变更。
- 已核对官方 [Input Group](https://ui.shadcn.com/docs/components/base/input-group)、[Field](https://ui.shadcn.com/docs/components/base/field)、[Alert](https://ui.shadcn.com/docs/components/base/alert) 与 [Table](https://ui.shadcn.com/docs/components/base/table) 文档；实际复用项目现有 Radix / shadcn-admin 栈，未安装另一套 Base UI。网页配置通过一个 InputGroup 组合只读名称、URL 和打开按钮，通过一个现有 Alert 切换七态，不改变共享 Alert 的默认样式。
- 打开文档复用 `tencentSheet.sessionOpen`；不从打开操作推断连接成功，不自动调用会话检测或轮询，不接入真实扫码登录。页面适配器默认返回未检测与未知文档名，带文档名和检测时间的成功态仅消费显式输入；本地测试样例不能作为真实检测证据。原 URL save / create、revision 和已启用任务的 URL 保护保持。
- 业务表格外层统一 border / rounded-md，移除业务项的 Switch 和 enabled 状态；执行规则 Switch 与既有任务启用状态不属于该业务项开关。位置 Badge 内仅放 Lucide Check，独立读取视图数据的可选 `range` 字段，缺少范围时显示破折号，不从两点或预览在列表中自行推算。业务 Dialog、两点标定、来源选择和增删改流程保持。
- 设置页移除自身 800px 限制，沿用顶层三个 Tabs 已共用的 max-w-5xl 内容容器；不修改另外两个 Tab 或全局外壳。验证及 Electron 验收状态统一见 STATUS.md。

### 文档链接组合控件视觉优化

- 新增 `components/ui/button-group.tsx`，来自既有 shadcn/ui 固定提交 [`8ab27715521cbd4f87ae6886cd989cbb678f6de7`](https://github.com/shadcn-ui/ui/blob/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/ui/button-group.tsx)，已通过 GitHub 连接器读取核对。保留官方全部导出、结构、默认类与变体；仅显式导入 React 类型、将 Slot 改为已有独立 Radix 包、适配本地 cn / Separator 路径及排版。遵循现有 [MIT 许可](shadcn-ui-LICENSE.txt)，不新增依赖。
- 核对官方 [Input Group](https://ui.shadcn.com/docs/components/base/input-group) 和 [Button Group](https://ui.shadcn.com/docs/components/base/button-group) 组合文档。网页链接复用现有 InputGroup / InputGroupInput / InputGroupAddon / InputGroupButton，以官方 ButtonGroupSeparator 在两侧 Addon 内分隔；输入先于 Addon，沿用点击聚焦行为。高度、内圆角、间距和截断仅在业务组件调整，保持一圈 InputGroup 外边框及现有主题变量；缺少可靠文档名时显示“共享文档”，不从 URL 推断。

### 执行规则紧凑设置列表

- 新增 `components/ui/{radio-group,toggle-group,toggle}.tsx`，从 shadcn/ui 既有固定提交 [`8ab27715521cbd4f87ae6886cd989cbb678f6de7`](https://github.com/shadcn-ui/ui/tree/8ab27715521cbd4f87ae6886cd989cbb678f6de7/apps/v4/registry/new-york-v4/ui) 的同名文件读取核对，保留官方结构、全部导出、变体、键盘交互和样式。仅将聚合 Radix 导入替换为独立包、调整 cn / toggle 路径并补充已有 MIT 声明；许可见 [shadcn-ui-LICENSE.txt](shadcn-ui-LICENSE.txt)。
- 经用户明确允许补齐这两类官方组件的必要依赖，锁定 `@radix-ui/react-radio-group@1.5.1`、`@radix-ui/react-toggle-group@1.2.1`、`@radix-ui/react-toggle@1.2.1`，不升级 React / Vite / TypeScript。复用现有 Card、Collapsible、ItemGroup / ItemSeparator、FieldError、Select、Input、Switch、Alert 与 Sonner。
- 已核对官方 [Collapsible](https://ui.shadcn.com/docs/components/base/collapsible)、[Item](https://ui.shadcn.com/docs/components/base/item) 和 [Card](https://ui.shadcn.com/docs/components/base/card)。执行规则只保留 Card 的外边框，内部 Item 去除透明边框及独立圆角；受控 Collapsible 直接读取自动填报 Switch 的同一值，无额外 Trigger / 展开状态，动画复用已有 tw-animate-css 的 collapsible-up / down，不自定义关键帧或高度测量。
- 新执行规则字段属于前端视图草稿，不改后端调度格式。Mock 回执仅提示“仅保留在当前页面，尚未保存到后端”；真实适配器确认才提示“已保存”。执行记录和登录只读取现有 runs / sessionStatus，缺失的下次执行不自行计算，未知登录不判为未登录。业务联动通过适配器已有草稿边界新增订阅，按有效来源及已配置位置判断，不修改业务组件或恢复业务 enabled 字段。

Tailwind CSS / Vite 插件锁定 `4.2.2`；插件声明支持 Vite `^5.2.0 || ^6 || ^7 || ^8`。保留现有 React 19、Vite 6、TypeScript 5 和 Vitest 2；仅增加实际组件使用的 Radix、CVA、clsx、tailwind-merge、tw-animate-css 及 PostCSS。完整锁定结果以 `package-lock.json` 为准。

没有复制 Clerk、TanStack Router/Query、Zustand、Axios、演示 Dashboard 或业务数据。没有修改 Electron、preload、Bridge、Sidecar 白名单或 .NET 代码。验证结果、下一步及人工验收状态见根目录 `STATUS.md`。
