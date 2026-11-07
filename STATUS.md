# ProductionAssistant 交接状态

## 当前状态

- 腾讯文档填报：**未解决，暂缓修复，后续重新梳理**。用户授权合并 [PR #87](https://github.com/Janonez/ProductionAssistant/pull/87) 的防御性修改，不代表 Development 真实填报验收通过；稳定版、版本号和 Release 不更新。修改包括只读登录预检遇到 Frame detached 后重新获取 frames（最多三次）、明确保存前不刷新、刷新后名称框试点击及剩余超时预算、本地回读与云端保存状态分开；不增加导航、输入或提交重试。
- 未解决证据：用户人工确认应填零值的目标单元格和公式栏均为空白；测试版扫码窗口曾提示登录成功，只读冷启动诊断在 3/10/30 秒仍检测到登录按钮，未检测到账户标记，页面呈未登录状态。登录成功判定与会话复用、保存状态录制与零值保存均需重新梳理，尚未证实完整原因。保留不确定写入记录，不重跑整批、不自动补写、不弱化登录阻断。现有本地 iframe、遮罩、保存确认及 localhost 表格回归通过；完整 verify 退出 0（前端 330 通过/1 跳过、Desktop 90、xUnit 356，Release 0 警告/0 错误），Development 已生成；这些结果不替代真实网页验收。本机测试副本已按授权恢复，调度关闭。
- 项目包含 WinUI / WebView2 应用、React 前端、共享 Bridge、Sidecar 和 Electron Desktop；长期方向明确为 Electron 优先，WinUI 仅作业务迁移期过渡，维护边界见 [PLAN.md](PLAN.md)。现阶段不删除 WinUI，不改变构建与发布流程；结构和运行方式见 [README.md](README.md)。
- SD-8c 已完成：日报本地配置迁移通过 [PR #77](https://github.com/Janonez/ProductionAssistant/pull/77) 合并，提交 `fe4c08c`。这是后端迁移，不代表新 UI 已实现。
- UI-0 接入方案已通过 [PR #79](https://github.com/Janonez/ProductionAssistant/pull/79) 合并，提交 `90b8406636ea1057fe6d532a212d95163f572ffe`。
- UI-1a、DX-1、UI-1b-1 已完成；UI-1b-2 已通过 [PR #84](https://github.com/Janonez/ProductionAssistant/pull/84) 合并。UI-1b-3 第一批标题栏及主题交互已获用户明确人工验收通过，经 [PR #85](https://github.com/Janonez/ProductionAssistant/pull/85) squash 合并，main 提交 `1ade3076b563be6c63814c55d83b7f638cbd682d`；合并后完整 verify 退出 0（前端 326 通过/1 跳过、Desktop 90、xUnit 355，Release 0 警告/0 错误）。第二批仅修复有证据的移动 Sheet 关闭焦点问题，自动验证通过，等待本批 PR 与人工验收。
- UI-1a 已通过 [PR #81](https://github.com/Janonez/ProductionAssistant/pull/81) 合并，main 合并提交为 `21af67f652700ca43517a93dd397fc99f159ff8b`；Electron 和 WinUI Development 均已完成基本视觉人工验收。移植来源固定为 shadcn-admin 提交 `e16c87f213a5ba5e45964e9b67c792105ec74d26`，来源、MIT 许可与逐项适配见 [移植说明](docs/third-party/shadcn-admin.md)。
- 七个路由、query/loadId、Suspense、RouteReady、LoadBoundary、设置与原业务组件保持；UI-1b-3 第一批仅增加主题同步、Electron 官方窗口覆盖层及必要外壳顶部留位，没有修改业务页面内部、Sidecar 或 .NET 源码。
- 前端沿用 Tailwind 4.2.2 与现有 Radix/CVA/clsx 等依赖；UI-1b-2 未修改依赖或锁文件。旧业务 CSS、reset、同名变量及新 portal 保持隔离；全局设置已接入共享主题，七个业务页面内部及 iframe 仍保留原样。
- DX-1 已通过 [PR #82](https://github.com/Janonez/ProductionAssistant/pull/82) 合并，提交 `2aae55af22321c4915cae73e7090dd9de31828af`，完成状态按用户最新确认记录。采用官方 `@electron/get` ZIP 缓存和原生 `electron .`；没有保留自定义运行时管理器，npm ci、verify、宿主与业务代码保持原有流程。
- UI-1b-3 第二批位于 `codex/ui1b3-shell-interactions`，基线为 `1ade3076b563be6c63814c55d83b7f638cbd682d`；运行代码仅修改 Sidebar 的移动 Sheet 关闭焦点回调，不改业务逻辑、Bridge、Sidecar、Electron 标题栏、WinUI 专属 UI、稳定版或版本号。
- 字体试验保留原版 Inter Variable → Noto Sans SC Variable → sans-serif，将新外壳内 Tailwind 默认字体变量统一到现有 `--font-ui`；没有改变上游布局、字号、字重、平滑或旧页面。长期组件复用规则见 [前端规范](docs/frontend-ui-standards.md)，AGENTS.md 已强制引用；字体继续作为试验方案记录，尚未正式定稿。
- 核查结论：保留现有 React/Vite、查询参数路由和统一桥接，渐进接入 shadcn-admin；日报完整工作流仍有 Sidecar 接口缺口。详细事实、能力表和验收边界只在 UI-0 文档维护。

## 下次入口

1. 只读检查 `git status -sb`、`git worktree list`、分支和最近提交，按实际状态更新判断。
   - 腾讯填报保持“未解决／暂缓修复”；本次仅按用户授权合并 PR #87。后续从登录成功判据、专用浏览器冷启动会话复用、控件录制、零值写入与云端保存确认的完整流程重新梳理，先只读取证并制定方案；未经重新授权，不继续真实填报、补写或清除防重记录。
2. 从 UI-1b-3 第二批的 PR / CI 和移动 Sheet 人工验收接续，等用户明确回复“通过”及 CI verify pass 才可 squash 合并。第一批已经通过并合并，不重复验收；用户要求人工验收，不自动操控电脑。
3. Electron Development 入口为 `npm.cmd --prefix src\ProductionAssistant.Desktop start -- --environment Development`；Development 发布目录是 WinUI 测试版。人工检查项目见下文。本批以外的 UI-1b-3 内容需另行授权；WinUI 仅保留必要兼容与基础回归。
4. 第二批结束后优先进入 UI-2，实施前确认日报能力范围；不能把 SD-8c 开放创建/保存模板视为预览、发送、启停等完整链路已迁移。独立 DX-2 冷启动调查不阻碍 UI-1b-3 或 UI-2。

## 待决策

- UI-1b-3 第二批待用户人工检查窄屏 Sheet 的 Escape、遮罩、选导航项、Ctrl+B 关闭后焦点，以及必要的 WinUI 业务兼容。无宿主浏览器检查不代表真实 Electron/Sidecar 工作流验收。
- 按用户最新反馈，首次交互掉帧已不再稳定复现，已有 Performance 记录未显示明显持续的严重长任务，不声称彻底修复。约 3392ms 的窗口创建前间隔列为独立 DX-2，范围与非阻塞关系见 [PLAN.md](PLAN.md)，本批不加无证据优化。
- UI-1b-2 的辅助 DOM 检查与固定上游源码逐行对照限制仍见其归档，不表述为检查通过。官方缓存缺失或损坏时原生 Electron 安装器仍可能尝试下载，DX-1 没有引入阻断机制。
- UI-2 按已开放接口分批交付，或先另行授权补齐接口后完整验收，见 UI-0 第 5 节。

## UI-1b-3 第二批检查与验证（2026-11-06）

- 已检查 Sidebar 桌面折叠/导航及移动 Sheet、Header 窄宽布局、Dialog/Sheet/Tooltip/DropdownMenu 的 Portal、主题、焦点和关闭路径，主滚动及旧 iframe 的外壳边界。既有实现可满足的部分保持：没有改 Header、Sheet/Dialog/Tooltip/菜单基础组件、业务组件、宿主接口或状态管理。
- 唯一确认缺陷：移动 Sidebar 是受控 Sheet，而 Header 的 SidebarTrigger 不在 Sheet Root 内，没有 Radix triggerRef。基线无头浏览器实测 Escape 后焦点落到 body；修复使用官方 onCloseAutoFocus 回调定位现有 aria-controls=business-navigation 的 Header 按钮，无新状态/定时器/焦点框架。更新 dist 后同一检查返回 focusReturned=true。
- 新增 4 项移动 Sheet 回归：Escape、遮罩完成点击、选择模块、Ctrl+B 的关闭返回焦点，并覆盖暗色 Portal、焦点约束、编辑器快捷键和业务槽 DOM 保留。连同现有导航、主题、Electron 布局、Dialog 与设置定向测试 61/61 通过。
- 完整 pwsh -NoProfile -File .\scripts\verify.ps1（不带 SkipRestore / SyncRelease）退出 0：前端 330 通过/1 跳过，Desktop 90/90，xUnit 355/355；TypeScript/Vite、字体检查、Release 构建及 Development 发布通过。Release 1 个既有 PRI249 PACKAGE-LOCK 警告、0 错误；保留既有 npm 审计 32 项与安装脚本/Vite 提示，不升级依赖。
- 无宿主、拦截外部请求的本地 dist 无头 Edge 检查：1100×700、960×600、720×600 无文档或内容横向溢出，Header 高 64px、全部控制按钮在窗口内；960×600 七个路由外层内容宽和 scrollWidth 均为 696px。Tooltip 在收起侧栏之外正常显示并继承暗色，主题菜单及设置关闭焦点恢复，运行时未捕获 pageerror。只验证外壳与无宿主状态，不作为真实业务数据工作流验收。
- 480×640 下 Header 和文档不溢出，旧生产消息内容有 24px 内部横向溢出；低于 Electron 原生最小宽度 960px，本批不改业务内部 CSS。真实 iframe 编辑器、Windows 缩放与 WinUI 基础运行仍由人工按适用环境检查，不将 jsdom 或无宿主检查表述为这些项目通过。
- 第一批原生窗口、32px 安全区域及 WinUI 48px 兼容保持，不开展 DX-2 或其他外壳扩展；验收后优先进入 UI-2。

## UI-1b-3 第一批归档（2026-11-06，已验收合并）

- 实际版本为 Electron 45.0.0。按后续明确授权，BrowserWindow 改用 titleBarStyle: hidden 与官方 titleBarOverlay，保留原生最小化/最大化/关闭按钮；没有自绘按钮或第三方窗口依赖。Overlay 高度维持 32px，未改变首次显示流程或添加启动等待、轮询、超时管理器。
- 唯一 ThemeProvider 在初始化和 theme 选择变化时，通过公开 Bridge 的 notifyTheme、Electron 专属 paHost.postMessage 和已有 bridge:message 发送 app.theme；system 原样传递。resolvedTheme 的变化不触发重复发送；不增加持久化配置。WinUI/WebView2 不接收该消息。
- 主进程保留原 checkSender 和三种主题值校验；nativeTheme.updated 按实际明暗更新 overlay 配色，采用 shadcn-theme.css 背景/前景 token 的 sRGB 对应色。React 仅在 pa://app 中渲染顶部拖拽区，使用 titlebar-area-* 安全区域及已有 --host-titlebar 留位，让 Sidebar、Header 和内容位于原生按钮下方；WinUI 保留原 48px 行为。窗口关闭时移除 IPC 和主题监听，安全配置与 preload 不变。
- 菜单采用 autoHideMenuBar 与 setMenuBarVisibility(false)，保留应用菜单和 F5、Ctrl+R 刷新；非 Production 保留 Ctrl+Shift+I 调试。Alt 可临时唤出原生菜单，不删除菜单或全局注册快捷键。
- 原 44 项缺失 notifyTheme mock 的失败已修复。新增布局测试的重复 Radix 开闭循环未检查菜单项就直接点击，现收敛为 Electron 区域/主题继承检查；现有 AppLayout.test.tsx 的真实 Radix 菜单及 Portal 断言保留。CSS 使用 ?raw，仅在 Vitest 放行该 CSS 原文，避免默认空 CSS 替身和 pa:// 模块 URL 的文件读取错误。单文件及现有布局 11/11、前端定向 89/89、Desktop 定向 53/53 通过。
- 最新完整 pwsh -NoProfile -File .\scripts\verify.ps1（不带 SkipRestore / SyncRelease）退出 0：前端 326 通过 / 1 跳过，Desktop 90/90，xUnit 355/355；TypeScript/Vite、字体检查、Release 构建及 Development 发布通过。保留 Release 构建 1 个 PRI249 PACKAGE-LOCK 警告、0 错误，以及已有 npm 审计 32 项、安装脚本提示和 Vite 大块提示。
- 构建前默认 dist 缺少新拖拽区，存在新主进程配旧前端的条件，不能追溯截图对应进程。已用标准 build 更新；默认加载 src/ProductionAssistant.App/Assets/Prototype/dist，进程/用户/机器均无 PRODUCTIONASSISTANT_DIST 覆盖。实际启动前已确认 JS/CSS 标记；最新 verify 后 dist 与 Development 的 120 个文件路径及全部 SHA256 一致，入口 index-BEC-LjZI.js / index-Cvbxincv.css。未修改 C#、csproj、sln、业务数据、稳定版、版本号或系统安全设置。
- 2026-11-06 11:18 的独立进程启动日志（t 为 process.uptime 毫秒）：app-ready 56、window-created 3448、load-start 3449、dom-ready 3721、react-ready 3742、sidecar-first-output 3521、首个 production.getBindings 完成 3877。主要延迟为 app-ready→window-created 3392ms，页面到 React ready 293ms；Sidecar 首次输出回调也可能受主线程阻塞影响，不能当成独立 Sidecar 初始化耗时。npm/OS 启动前延迟、首帧及首次可交互没有独立标记。
- 历史独立启动 React ready 有 240/249ms，也有 3049/5049ms；缓存、产物及代码版本条件不受控，不构成变更前后基线。主题监听器和 React 布局都在窗口创建后生效，不能解释创建前停顿；overlay 构造是否额外变慢未获证明。不清缓存、不操控电脑自动验收、不添加性能框架或无证据补丁。
- 用户后续已明确回复“通过”，授权并完成 PR #85 合并。此前 settings.open 首次 70ms、随后 3/2/2ms 不足以解释设置/侧栏动画，最新反馈也不能稳定复现，不声称彻底修复；冷启动问题独立转入 DX-2，不阻碍后续 UI 批次。

## UI-1b-2 实现与验证归档（2026-11-06）

- 唯一 ThemeProvider 从 AppLayout 内上移到 App，覆盖 AppLayout 与 SettingsModal；保留 UI-1b-1 的 localStorage 持久化、light / dark / system 和系统主题监听，不向 html / body 添加全局 dark。
- 全局设置使用 shadcn/ui Dialog 与 Radix primitives；PortalSurface 仅把同一主题变量和 reset 边界带到 body 下的 Portal，不另建 Portal、焦点管理或状态系统。旧设置 overlay、独立关闭按钮及手写 Escape 监听已移除，设置加载错误边界也使用同一 Dialog 组件。
- 原设置加载、保存、凭据遮罩与空值保留语义、异常提示、操作名称、payload 和数据结构保留；未修改七个业务页面、query/loadId 路由实现、Bridge、IPC、Sidecar、Electron 标题栏或 .NET 源码，未执行正式业务数据写入。
- settings-modal.css 自行限定在设置 Dialog 作用域内，Vite 仅将该文件排除出旧业务 CSS 包装层。Vitest 通过 test-setup.ts 补齐 jsdom 缺失的 ResizeObserver 最小 API，无新增依赖；该替身不提供尺寸回调，不进入生产构建，尺寸变化断言需另用可触发回调的替身。
- 定向测试 175/175 通过，覆盖真实 Dialog、设置行为、Portal 主题、主题持久化、焦点约束及恢复、Escape、遮罩点击、七个入口和 query/loadId；受影响测试另有 73/73、AppLayout 8/8 通过记录。git diff --check、TypeScript 与 Vite 构建通过。
- 完整 `pwsh -NoProfile -File .\scripts\verify.ps1`（不带 SkipRestore / SyncRelease）退出 0：全量前端 317 通过 / 1 跳过（符号链接权限），Desktop 81/81，xUnit 355/355；字体检查、Release 构建与 Development 发布成功。保留 Release 构建 1 个 PRI249 警告、0 错误，以及 npm 审计 32 项、esbuild 安装脚本提示和 Vite 大块提示，未自动升级依赖。
- dist 已同步：基线和当前均为 120 个文件，11 组哈希资源替换及入口更新；与 Development 的 120 个文件路径集合及全部 SHA256 一致。9 个业务 / 图标 JS chunk 在规范化资源名引用后与基线一致，无缺失文本资源引用，未混入测试初始化代码。
- Electron Development 已成功启动并显示首页；verify 后使用包内官方 install.js 从既有缓存恢复 Electron 45.0.0，日志为 Cache hit、退出 0，没有新增运行时管理器。用户已明确确认本阶段 Electron 人工验收通过；该结论来自用户确认，不以 jsdom 或启动截图代替。
- 辅助自动化 DOM 检查未完整执行：Node 会话加载现有 ws 包时报 `The requested module './lib/permessage-deflate.js' does not provide an export named 'default'`。这是辅助工具异常，尚未证明是应用问题；本阶段不继续开发或修复该工具，不声称该项检查通过。
- 本轮官方 Dialog 上游源码逐行对照未完成：固定提交源码链接获取发生网络 `Cache miss`。本地组件结构及 MIT 许可证已检查；来源与适配见 [组件移植说明](docs/third-party/shadcn-admin.md)，不将本地检查表述为上游逐行对照通过。
- 实现、自动化验证与用户人工验收已通过，后续已通过 PR #84 合并并关闭，main 提交为 `28d35397771df2dff15badb69bc566eeb2ec049f`；稳定版、版本号与 Release 未修改。上面的辅助检查限制继续保留。

## UI-1b-1 验证归档（2026-11-05，授权描述仅指当时阶段）

- main 干净并执行 `git pull --ff-only` 确认已同步后建立本批分支；仅使用主工作目录。当前获准提交、推送和创建 PR；未更新稳定版或修改业务数据。
- ThemeProvider 保留原接口与 matchMedia 监听；唯一 localStorage 键为 `production-assistant-ui-theme-v1`，惰性恢复并校验三种选择，读写异常均不阻断当前会话。新表面分别声明 light / dark color-scheme，旧内容仍直接声明 light；不向 html / body 添加 dark。
- 定向测试退出 0：ThemeProvider 18 项、AppLayout 8 项、导航 40 项、设置 2 项、Sidebar 1 项，共 69 项通过。存储和 matchMedia 测试隔离并清理；AppLayout 使用真实主题菜单 portal，覆盖解析后系统主题、七页切换、query/loadId、旧容器边界与设置入口。此结果不代表 CSS 实际视觉验收。
- 上一轮已单次授权执行完整 `pwsh -NoProfile -File .\scripts\verify.ps1`，不带 SkipRestore / SyncRelease，退出 0：前端 294 通过 / 1 跳过（符号链接权限），Desktop 81 通过，xUnit 355 通过；字体检查、TypeScript / Vite、Release 构建及 Development 发布通过。Release 构建 1 个 PRI249 警告、0 错误；另保留 npm 审计 32 项、esbuild 安装脚本提示及 Vite 大块提示，未自动升级或修复依赖。
- dist 已通过 Git 元数据和文本引用核验：基线与当前均为 120 个文件，11 组旧哈希资源一一替换；入口引用 `index-Cqe1G6EX.js` / `index-CXai2rwv.css` 均存在，文本资源无缺失引用及旧文件名残留。9 个业务 / 图标 JS chunk 在更新资源名引用后与基线一致；CSS 与基线相比恰好只新增两条 color-scheme 声明；入口 JS 包含与当前 ThemeProvider 对应的存储校验、异常处理和系统监听代码。业务源码、宿主和依赖无额外变化。
- Development 前端产物与当前 dist 的文本内容及全部 120 个文件大小一致；未全文读取或比较大型字体等二进制文件，不将该结果表述为全部文件 SHA-256 核对。
- Electron npm 包实际目录为 `src/ProductionAssistant.Desktop/node_modules/electron`，版本 45.0.0，官方 ZIP 缓存已确认存在且与包内 SHA-256 一致。本轮执行实际存在的官方 `install.js`，日志为 Checking the cache / Cache hit，退出 0；确认 `dist/electron.exe`、`path.txt` 存在，`path.txt=electron.exe`、`dist/version=45.0.0`。没有新增安装器、依赖或缓存机制，也未重跑 npm ci / verify。
- Electron Development 已通过原命令 `npm.cmd --prefix src\ProductionAssistant.Desktop start -- --environment Development` 启动；实际捕获 npm 包内 electron.exe 对应窗口，确认 Sidebar、Header 和默认生产消息页面已渲染。首次捕获提示窗口最小化，按现有工具流程激活后成功捕获，没有另建 GUI 自动化机制。
- WinUI Development 已通过 `& .\deployments\development\ProductionAssistant.exe` 启动；实际捕获对应部署目录进程窗口，标题为“生产助手 [Development]”，显示测试环境标识及共享前端。仅记录必要启动兼容，不记录 WinUI 完整视觉验收通过，也不再要求双宿主视觉一致性验收。Codex 启动检查没有点击业务查询、解析、写入或发送按钮。
- 用户已明确确认 Electron Development 的 UI-1b-1 主题持久化人工验收通过，并授权进入 Git 提交及 PR 阶段；该结论来自用户确认，不将 Codex 启动截图或 jsdom 断言当成人工视觉验收。Codex 未单独完成浏览器 computed color-scheme 检查，不把本批验收扩大为七个业务页面已迁移或完整业务链路验收。

| 资源 | 旧哈希 | 新哈希 |
|---|---|---|
| AutomationPage.js | XTlFNvAR | Db_mRSkQ |
| DailyWeldPage.js | CtMA_qVx | C_iQoX2Q |
| DatabaseViewerPage.js | V4YWjaVV | RFKMjTxb |
| PlanPdfPage.js | CPW6RuHB | CFMgyPzL |
| ProductionMeetingPage.js | BOhJrywr | D6n0MZ_n |
| ReportCenterPage.js | DB03VoAs | CwEXnAfA |
| file-spreadsheet.js | CGAkVFAR | kn1swJmP |
| folder-open.js | BJUVJGyQ | BdMvHxCB |
| loader-circle.js | 6HZd8iMx | ozG7Aex0 |
| index.js | CdFFcFYv | Cqe1G6EX |
| index.css | Dn-XXNFu | CXai2rwv |

## DX-1 验证归档（2026-11-05，验收状态以后续用户确认为准）

- 已核对七个文件差异均来自 DX-1，按用户授权恢复 package.json 并删除四个未跟踪的自定义实现/测试文件；当前仅 README.md、STATUS.md 有 Git 差异。没有删除外部失败临时目录，没有修改系统 ACL。
- 已完成的只读模拟验证：Electron 45.0.0、@electron/get 5.1.0 的官方函数体在 7 组内存探测中验证了有效 ZIP 缓存与内置校验和的零下载器调用、模拟 npm ci 后的安装器缓存恢复分支，以及缓存缺失/损坏或远程校验和触发下载的行为。文件写入、下载器、校验器和原生解压均以替身记录，不能代替真实安装验收。
- 本轮重新确认 Electron 45.0.0、@electron/get 5.1.0、win32-x64；检查到的进程环境和 npmrc 均无镜像/缓存覆盖。官方缓存为 `%LOCALAPPDATA%\electron\Cache\f22ed746d6afe4413723c1ec95408e33d6635bf7d817a70edb1df9220a236ab0\electron-v45.0.0-win32-x64.zip`。原 ZIP、复制到临时文件后的 ZIP、最终缓存及 verify 后缓存的 SHA-256 均与包内 checksums.json 一致：`ae53887a23bb640369c93dbd38c408a2af5c0deb86f2fa76c6c244cb444b7f47`。Downloads 原 ZIP 保留；没有自定义解压或生成运行时清单。
- 已单次授权执行 `pwsh -NoProfile -File .\scripts\verify.ps1`，不带 SkipRestore/SyncRelease，退出 0：前端 274 通过/1 跳过（符号链接权限），Desktop 81 通过，xUnit 355 通过；字体检查、TypeScript/Vite、Release 构建和 Development 发布通过。Release 构建 0 警告/0 错误。保留 npm 审计 32 项、esbuild 安装脚本阻止提示及 Vite 大块提示，未自动修复或升级依赖。
- verify 后确认 npm ci 已移除包内 dist 和 path.txt，官方缓存 ZIP 仍在且哈希未变。随后在一次性 Node 进程内拒绝 fetch、HTTP/HTTPS、TCP、TLS、UDP 联网入口，以 DEBUG=@electron/get* 执行未修改的官方 install.js；文件系统、SHA 校验器和原生解压均真实执行，日志记录 Checking the cache 与 Cache hit，各联网入口调用均为 0。恢复得到 45.0.0 x64 和 path.txt=electron.exe，校验与恢复约 5030 ms。此为进程联网限制下的真实恢复，不是物理断网；没有更改系统防火墙、代理、hosts、安全策略或 ACL。
- 原命令启动 Development 两次，均通过实际窗口捕获和日志确认共享前端已渲染、did-finish-load/react-ready、Release Sidecar 首次输出及 production.getBindings 成功；没有启动失败事件。两次均正常关闭，npm 命令和 Sidecar 退出码均为 0。两次启动无安装器调用提示，path.txt、electron.exe、version 的大小和修改时间未变化，确认正常重启未重复安装。开发版窗口已关闭，原先打开的稳定版窗口仍保留；没有执行业务写入。
- verify 未产生前端 dist 差异，package.json、锁文件及 verify.ps1 与 HEAD 一致；最终仅 README.md、STATUS.md 修改，未提交或推送，未创建 PR、Release 或更新稳定版。GUI 外观与交互仍待用户最终人工确认；后续阶段为 UI-1b。
- 旧自定义方案已放弃，其 35 项测试及 116 项 Desktop 测试通过记录不作为现方案验收。旧导入在目录改名时 Access denied，遗留 `%LOCALAPPDATA%\ProductionAssistant-DevRuntime\electron\45.0.0\.import-004e0513e55241689284a9a5aa02dbef`，按用户要求保留，不自动清理。

## UI-1a 验证归档（2026-11-04，非 DX-1 验收）

- 字体试验后重新运行 `pwsh -NoProfile -File .\scripts\verify.ps1`，退出 0：前端 274 通过 / 1 跳过（符号链接权限），Desktop 81 通过，xUnit 355 通过；字体检查、TypeScript、Vite、Release 构建及 Development 发布通过。本次未改动测试，保留 UI-1a 原有新增 6 个外壳测试、Sidebar 测试及全部既有路由/桥接/业务断言。
- Release 构建与 Development 发布各出现 `PRI249: Invalid qualifier: PACKAGE-LOCK` 警告，均无错误；Vite 提示入口块大于 500kB；npm 审计报告 32 项（26 moderate、4 high、2 critical），未自动升级修复。
- 实际 dist 的浏览器检查：960×600、1100×700 七页没有文档/内容水平溢出；展开宽 256px，图标模式容器宽 66px / 布局占位 64px，Header 高 64px；七个图标入口鼠标点击、设置入口、明暗主题及非默认路由刷新已核对。透明分组标题的指针遮挡已修正。浏览器没有桌面宿主，保留真实未连接错误，不能视为 Electron 或 Sidecar 业务验收。
- UI-1a 修改前后对实际 dist 运行无头 Chromium 字体诊断：11 个 WOFF2 资源实际加载，CDP 字形来源确认英文 Inter、中文 Noto Sans SC；加载字重范围 100–900。Sidebar、Header、shadcn Button 和旧页标题/正文/按钮共 7 个采样节点的字体、字重、平滑、缩放及尺寸均未变化；侧栏 256px、Header 64px。仅新外壳的 Tailwind 默认字体变量由系统字体链改为原版字体链。
- 字体加载正常的证据仅来自实际 dist 的无头 Chromium（DPR 1、页面缩放 1），不能据此确认用户 Electron 的字体渲染、Windows DPI 或缩放状态；清晰度问题的 Electron 端原因尚未定位，不宣称已修复。
- UI-1a 当时的 Development 发布目录与共享 dist 的 120 个文件 SHA-256 一致。与该轮开始时 127 份前端源码/配置的哈希对比，仅 `styles/shadcn-shell.css` 改变；没有依赖变动。相关实现现已随 PR #81 合并。

## 归档

历史实现和验证证据以 git log、对应 PR 和专题文档为准。
