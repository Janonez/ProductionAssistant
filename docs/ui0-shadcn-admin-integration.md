# UI-0：shadcn-admin 接入核查与方案

核查日期：2026-11-04。项目基线：`afd5abe`（含已合并的 SD-8c / PR #77）；本轮先更新路线与交接，再执行 UI-0。本文是源码核查与后续接入建议，没有实施新界面、安装依赖或验证真实桌面业务。

完整阶段顺序见 [PLAN.md](../PLAN.md)，当前交接见 [STATUS.md](../STATUS.md)。宿主协议继续遵守 [Electron 宿主设计](electron-host-design.md) 和 [导航契约](navigation-contract-design.md)。

## 1. 核对结论

现有前端已经是 React + TypeScript + Vite，Electron 已加载同一份前端构建产物。采用现有工程渐进接入 shadcn-admin 布局和组件，无需再建一套前端，也无需为换视觉同时更换路由、状态管理和业务通道。

目标仍是 Electron 桌面外壳承载 React 界面；业务请求通过现有统一桥接、preload、Electron IPC、Sidecar 标准输入输出进入共享 Bridge。业务规则、配置与凭据继续由现有 .NET 服务负责。

UI-1a 先在现有 React 应用内交付 shadcn-admin 风格导航、顶栏、整体外壳和必要的隔离样式，在真实 Electron Development 窗口中验收；不承担完整业务页面重写。UI-1b 再完善主题、基础组件、CSS 兼容、响应式和交互，之后进入 UI-2 → SD-8d → UI-3，后续业务迁移顺序不变。旧页面继续作为内容区组件使用，保留七个业务入口、query 路由、统一 Bridge 与原有错误反馈，不创建第二套长期渲染工程。Electron 尚未开放的业务仍由现有 WinUI 版本提供，不承诺仅更换外壳即可让这些操作在 Electron 中成功。

## 2. 当前工程事实

下表链接指向本轮核查的实际源码；依赖版本为 package.json 声明范围，不代表本轮安装或升级过。

| 项目 | 源码事实 | 依据 |
|---|---|---|
| 前端技术栈 | React / ReactDOM `^19.0.0`、TypeScript `^5.7.2`、Vite `^6.0.5`；不是 Vue 或 Next.js | [前端依赖](../src/ProductionAssistant.App/Assets/Prototype/package.json) |
| 构建入口 | `main.tsx` 挂载 `App`，统一导入字体及多个 CSS；Vite `base: './'`，输出 `dist` | [main.tsx](../src/ProductionAssistant.App/Assets/Prototype/src/main.tsx)、[Vite 配置](../src/ProductionAssistant.App/Assets/Prototype/vite.config.ts) |
| 页面与导航 | 七个业务路由由 `App.tsx` 选择 React 组件，多数页面懒加载；默认生产消息，无概览首页；设置是全局弹窗 | [App.tsx](../src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx)、[路由表](../src/ProductionAssistant.App/Assets/Prototype/src/routes/routeTable.ts)、[侧栏](../src/ProductionAssistant.App/Assets/Prototype/src/components/layout/OperationSidebar.tsx) |
| 路由机制 | `?route=...&loadId=...`；文档内切页用 `history.replaceState` 并通知订阅者，没有 TanStack Router | [路由解析](../src/ProductionAssistant.App/Assets/Prototype/src/routes/index.ts)、[导航](../src/ProductionAssistant.App/Assets/Prototype/src/routes/navigation.ts)、[订阅](../src/ProductionAssistant.App/Assets/Prototype/src/hooks/useHostRoute.ts) |
| 状态管理 | 核查的外壳、设置、任务页面使用 React hooks；依赖中没有 Zustand / TanStack Query；日报指标另有内存和 localStorage 缓存 | [前端依赖](../src/ProductionAssistant.App/Assets/Prototype/package.json)、[App](../src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx)、[指标缓存](../src/ProductionAssistant.App/Assets/Prototype/src/features/daily-report/dailyFieldCache.ts) |
| 组件基础 | 已有 Radix Dialog、Lucide、共享 DatePicker 等；未引入 Tailwind 或 shadcn 工程配置 | [前端依赖](../src/ProductionAssistant.App/Assets/Prototype/package.json)、[共享控件](../src/ProductionAssistant.App/Assets/Prototype/src/components/ui/) |
| 样式 | 全局 CSS 与旧 Demo 作用域并存；`styles.css` 定义 `--primary` 等变量，`production-message.css` 有 `all: revert` 与固定颜色 | [主样式](../src/ProductionAssistant.App/Assets/Prototype/src/styles.css)、[Demo 样式](../src/ProductionAssistant.App/Assets/Prototype/src/production-message.css)、[外壳样式](../src/ProductionAssistant.App/Assets/Prototype/src/operation-sidebar.css) |
| 日报编辑器 | React 宿主页把 HTML 放进 `iframe.srcdoc`，通过 runtime 调用统一桥接，并使用 iframe 内独立样式 | [宿主页](../src/ProductionAssistant.App/Assets/Prototype/src/features/daily-report/MessageTemplatePage.tsx)、[HTML](../src/ProductionAssistant.App/Assets/Prototype/src/features/daily-report/message-template.html) |
| Electron 主进程 | CommonJS；固定 Electron `45.0.0`；从现有 dist 提供 `pa://app/index.html`，启动长驻 Sidecar、处理选择器和窗口生命周期 | [Desktop 依赖](../src/ProductionAssistant.Desktop/package.json)、[主进程](../src/ProductionAssistant.Desktop/main.js)、[路径/环境](../src/ProductionAssistant.Desktop/lib/environment.js) |
| preload | 只暴露 `paHost.postMessage` / `addEventListener`；不向渲染层开放 Node 或 ipcRenderer | [preload.js](../src/ProductionAssistant.Desktop/preload.js) |
| 前端桥接 | 页面调用 `bridge/index.ts`；底层优先选择 `chrome.webview`，其次 `paHost`；仅无宿主的 Vite 开发模式使用 mock | [公共入口](../src/ProductionAssistant.App/Assets/Prototype/src/bridge/index.ts)、[传输层](../src/ProductionAssistant.App/Assets/Prototype/src/bridge/webview.ts) |
| WinUI | MainWindow 加载 PrototypePage，WebView2 映射打包前端资源；当前七个一级入口均由 App.tsx 渲染 React 页面 | [MainWindow](../src/ProductionAssistant.App/MainWindow.xaml.cs)、[PrototypePage](../src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs)、[App](../src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx) |
| 自动化测试 | 前端 Vitest + jsdom，包含桥接、导航和业务页面测试；Desktop 使用 `node --test`；CI verify 运行完整验证脚本 | [Vitest 配置](../src/ProductionAssistant.App/Assets/Prototype/vitest.config.ts)、[桥接边界检查](../src/ProductionAssistant.App/Assets/Prototype/src/bridge/architecture.test.ts)、[导航检查](../src/ProductionAssistant.App/Assets/Prototype/src/app/App.navigation.test.tsx)、[Desktop 测试](../src/ProductionAssistant.Desktop/test/)、[CI](../.github/workflows/ci.yml)、[verify](../scripts/verify.ps1) |

已有 README / DESIGN 对历史原生页面覆盖层、Sidecar 只读子集的描述不能替代当前 `App.tsx` 和 `StdioHost.cs`。

## 3. shadcn-admin 参考范围

官方 [仓库与 README](https://github.com/satnaing/shadcn-admin) 描述的是基于 Shadcn 与 Vite 的后台 UI 集合，并明确它不是直接可用的 starter。官方使用 MIT 许可，说明部分 UI 组件有定制，更新时需要保留这些修改。

2026-11-04 读取上游 main 的 [package.json](https://github.com/satnaing/shadcn-admin/blob/main/package.json)、[vite.config.ts](https://github.com/satnaing/shadcn-admin/blob/main/vite.config.ts)、[样式入口](https://github.com/satnaing/shadcn-admin/blob/main/src/styles/index.css) 和 [主题实现](https://github.com/satnaing/shadcn-admin/blob/main/src/context/theme-provider.tsx)，可见 React 19、Vite 8、Tailwind 4、TanStack Router / Query、Zustand 等依赖与浏览器测试配置。它们是上游当前实现，不是 ProductionAssistant 的既定依赖清单。

- 复用侧栏、顶部区域、主题切换和所需基础组件的设计及实现模式，替换为本项目七个入口与真实业务文案。
- 保留本项目 npm / package-lock、字体、现有测试和 Bridge 业务调用；不复制上游登录、账号体系、图表示例、演示数据或无关页面。
- 不为复用外壳同时升级到上游全部工具版本。UI-1a / UI-1b 按阶段所需选择与本项目工具链兼容的依赖并锁定，记录实际复制组件的上游提交和许可；本轮没有复制组件。Tailwind/Vite 依赖兼容性尚未验证，实施前必须确认，不能将拟用版本视为已验证兼容。
- 在线演示仅为视觉参考，本轮未做交互或截图验收；可用短期视觉预览评审细节，但不能替代真实 Electron Development 验收。

## 4. 接入建议与兼容边界

| 方面 | 建议 | 原因与验收边界 |
|---|---|---|
| 工程 | 在现有 Prototype 工程内新增外壳与必要组件，保留现有页面组件 | 两个宿主已共用它的产物，另建前端会增加重复集成 |
| 路由 | UI-1a / UI-1b 保留现有 query 路由，不引入 TanStack Router | 当前来源检查严格限制 `/index.html`，文件服务也没有 SPA 路径回退；迁成 pathname 路由会影响宿主契约 |
| loadId | 切页保留 loadId；完整重载生成新 loadId；RouteReady 保留在 Suspense 内 | 继续保证文档加载握手语义，主题切换也不应重载文档 |
| Vite 资源 | 保持 `base: './'` 和 dist 输出路径，验证字体与懒加载块离线可读 | Electron 使用 pa 协议，WinUI 使用虚拟 HTTPS 来源，不采用上游 Netlify 回退规则 |
| 样式 | 按需接入兼容版本的 Tailwind / shadcn 所需工具；先隔离新外壳的 utilities、reset 与语义 token，再逐页迁移 | 仅给类名加前缀不足以隔离全局 reset 和同名 CSS 变量；旧 `all: revert` 也可能使新组件失效 |
| 主题 | UI-1a 提供现有主题的最低限度兼容；UI-1b 完善统一主题状态、token 与持久化，沿用本机环境隔离存储，不直接复制上游 cookie 方案 | 旧页面固定色值与 iframe 不会自动跟随 `.dark`；UI-1a 不要求一次完成全部旧业务页面的深浅色迁移 |
| 弹窗与 portal | UI-1a 保持已有交互可用；UI-1b 完善 portal、iframe、遗留页面的主题兼容及焦点、Escape 和键盘操作 | portal 脱离外壳作用域后可能丢失新主题，不能只检查主页面 |
| 状态 | 保留 hooks 与现有业务状态；UI-1a 只增加外壳必需状态，UI-1b 完善主题与持久化 | 无需为换布局引入 Query、Zustand 或另一层业务状态 |
| 业务 | 新页面继续调用 `bridge/index.ts`，由 Sidecar 白名单决定真实能力 | 不在 React 或 Electron 主进程重写 .NET 业务；不新增 HTTP 服务或扩大 preload 接口 |
| 并行保留 | 暂未迁移的组件仍放在内容区，保持七个入口、全局设置和默认页 | 界面迁移不删除原组件、数据或原 WinUI 能力；共用产物也要求 WinUI 开发版回归 |

UI-1a / UI-1b 沿用单一 React/Vite 工程和一套业务页面、桥接。如需短期前端试用开关，应在实施清单中明确启用方式、作用域和退出条件，不长期维护两套外壳或渲染工程；本轮不添加开关或修改 Electron/C#。本机稳定版 1.8.1 继续保持现有部署，源码变化不等于稳定版已更新。

若后续确需 TanStack Router，应单独核查 hash 或内存路由与现有 query/loadId、刷新、来源检查的兼容性；本轮没有选择或实现新路由。

## 5. UI-2 日报能力核对

以下来自当前 [Sidecar 白名单](../src/ProductionAssistant.Sidecar/StdioHost.cs)，并对照 `AutomationPage.tsx`、`DailyReportCreateWizard.tsx`、`MessageTemplatePage.tsx`、`dailyFieldCache.ts` 的实际调用。Bridge 中存在某操作，不等于 Sidecar 已允许该操作。

| 页面行为 | 调用 | Sidecar 当前状态 |
|---|---|---|
| 任务列表 | `automation.list`、`daily.list` | 已开放 |
| 创建日报 | `daily.create` | SD-8c 已开放 |
| 详情、运行记录 | `daily.get`、`daily.runs` | 已开放 |
| 保存现有模板正文/文档 | `daily.saveTemplate` | SD-8c 已开放 |
| 修改名称、时间、指标范围 | `daily.saveBasics` | 未开放 |
| 获取指标目录、插入新指标 | `daily.getProperties`、`daily.addField` | 未开放 |
| 生成真实数据预览 | `daily.preview` | 未开放 |
| 测试发送、发送今日消息 | `daily.test`、`daily.sendToday` | 未开放 |
| 列表启停、删除 | `automation.setEnabled`、`automation.delete` | 未开放；日报专用 `daily.setEnabled` / `daily.delete` 也未开放 |

UI-2 可先形成“读取真实列表/详情 → 创建停用日报 → 编辑并保存模板 → 重新读取核对”的真实闭环，但这不等于完整日报管理已可用。需要保留原字段与模板存储格式、自动保存和错误反馈；新指标插入、实际预览、发送、启停不能用 mock 成功代替。

UI-2 实施前确认二选一的范围：按已开放接口分批交付并明确尚未迁移的动作；或先另列后端接口清单、逐文件授权补齐所需能力，再交付完整日报工作流。该缺口不阻碍先做 UI-1a / UI-1b，也不自动授权修改 Sidecar 白名单。不能只因为 SD-8c 已完成就承诺 UI-2 全功能验收。

本轮只读源码，没有启动 Sidecar、调用业务 API、创建任务、注册计划任务或发送通知。不能仅凭 `list/get` 名字将运行调用视为无副作用。

## 6. UI-1a / UI-1b 的建议实施范围

### UI-1a：先交付真实外壳

- 在现有 React 应用中实现 shadcn-admin 风格导航、顶栏、页面容器和整体外壳，保留七个业务入口、业务页面、query 路由和统一 Bridge。
- 优先隔离全局 reset、utilities、同名 token 与旧 CSS，提供现有主题的最低限度兼容；保持原有页面、加载和失败反馈可用，不要求一次完成旧页面的深浅色迁移。
- 只引入外壳实际需要的组件和依赖，不强制一次移植全部 shadcn/ui 组件，不重写完整业务页面，不新增概览首页、登录或业务功能。
- 在真实 Electron Development 窗口完成最终视觉验收，提供实际查看入口、截图和本机验收说明。

### UI-1b：完善主题、兼容和交互

- 完善主题系统、切换与持久化，逐步引入实际需要的 shadcn/ui 基础组件。
- 处理 portal、iframe 和遗留页面的视觉兼容及新旧 CSS 冲突，完善响应式、缩放和滚动。
- 统一交互反馈、焦点及键盘操作，分别验证主题、弹窗与业务内容区；不以主题开关存在视为全部页面已适配。

### 视觉预览与文件范围

遵守项目 [UI 技能](../.agents/skills/impeccable/SKILL.md) 实际适用的规范：已有获批 Demo 时按要求复用；新设计且无获批产物时，按技能的 HTML Demo 评审流程在生产迁移前确认视觉方案。可以制作使用本项目字体和明确标注示例内容的短期交互预览，但不建立第二个长期应用工程，也不将 Demo 验收视为 Electron 验收。

UI-1a 预计涉及现有 Prototype 的入口、App、侧栏、外壳及隔离样式，必要时调整 `package.json` / `package-lock.json`、`vite.config.ts` 和少量所需组件；UI-1b 再扩展主题、基础组件及兼容实现。两个阶段分别同步实际生效的设计文档、相关测试与前端 `dist`，按阶段列出精确文件和依赖清单，不一次批准全部组件移植。

本轮不改 C#、csproj、sln、Electron 主进程、业务接口、配置格式或发布脚本；后续若需要，先列精确文件、原因和影响再逐文件授权。UI-1a / UI-1b 分别需要实施授权，且不改变稳定版 1.8.1。

## 7. 查看入口与验收规则

UI-0 的查看入口是本文；没有新界面截图，也不需要启动应用。

UI-1a / UI-1b 真实桌面查看入口拟沿用仓库现有启动脚本，在根目录执行：

```powershell
npm.cmd --prefix src\ProductionAssistant.Desktop start -- --environment Development
```

该命令只加载已构建的 dist，需要 Electron 二进制和匹配源码的 Sidecar 构建。核查时默认依赖目录下未发现 `node_modules/electron/dist/electron.exe` 或 `path.txt`，Sidecar Release 路径存在可执行文件但未核对其构建来源；本轮没有下载或启动。UI-1a 应先解决开发启动前置条件并记录结果。默认 `verify.ps1` 生成的 `deployments/development/ProductionAssistant.exe` 是 WinUI 测试版，不能作为 Electron UI 验收入口。

浏览器 Vite 预览只用于布局与交互设计：无宿主时现有 bridge 会走 mock，因此浏览器成功不能证明 Sidecar 接入成功。

| 阶段 | 必须核验 |
|---|---|
| UI-1a | Electron Development 实际窗口中的导航、顶栏和外壳；七个入口、默认页、设置与旧业务页面可用；最低限度主题兼容、全局样式隔离、加载与失败提示；重载后保留 route 并更新 loadId；资源、字体与懒加载可读；WinUI 共用产物回归；如采用试用开关，核验回退 |
| UI-1b | Electron Development 中完善主题切换与持久化、所需基础组件、portal/iframe/遗留页面兼容、反馈与焦点/键盘操作、响应式；继续验证 WinUI 共用产物 |
| UI-1a / UI-1b 尺寸 | 现有 CSS 最小宽度 1100，Electron 最小窗口 960×600，WinUI 另有 48px 标题栏布局；至少检查 1100×700 及 Electron 可缩至的 960×600，UI-1a 避免裁切和空白偏移，UI-1b 进一步完善响应式 |
| UI-2 及后续业务页 | 对照已批准的能力清单，在 Electron + 真实 Sidecar 中逐项验证；涉及真实外部写入或通知时先提醒用户；未迁移能力不伪装为成功 |
| 自动验证 | 代码阶段按项目规则运行完整 verify（不带 `-SyncRelease`），保持前端/桥接/导航、Desktop 和 .NET 检查；不以单独 React 编译代替桌面验收 |

每次交付说明修改清单、自动验证与人工验收分别得出的结果、实际查看入口，以及尚未验证的范围。打包、升级、正式计划任务与完整回归继续留在 SD-12，退出 WinUI 与发布留在 SD-13。

## 8. 本轮交付边界与下步决定

UI-0 完成源码与官方上游资料核查，交付本文和路线/交接更新；没有安装依赖、修改前端源码/产物、运行构建、打开桌面窗口或操作业务数据。仅文档改动按项目规则不运行本地 verify，以 PR 的 CI verify 为准；具体交付状态见 STATUS.md。

下一步先完成 UI-0 文档 PR，再申请 UI-1a 授权；UI-1a 完成后进入 UI-1b，再进入 UI-2。UI-1a 需明确查看入口、最低限度主题兼容和样式隔离，UI-1b 完善主题、组件与交互；UI-2 开始前另确认第 5 节的业务能力范围。当前只做三个文档的最小修正与重新暂存，不 commit、push 或创建 PR；路线决定不等于后续代码改动已获授权。
