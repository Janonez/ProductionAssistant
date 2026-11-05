# ProductionAssistant 交接状态

## 当前状态

- 项目包含 WinUI / WebView2 应用、React 前端、共享 Bridge、Sidecar 和 Electron Desktop；长期方向明确为 Electron 优先，WinUI 仅作业务迁移期过渡，维护边界见 [PLAN.md](PLAN.md)。现阶段不删除 WinUI，不改变构建与发布流程；结构和运行方式见 [README.md](README.md)。
- SD-8c 已完成：日报本地配置迁移通过 [PR #77](https://github.com/Janonez/ProductionAssistant/pull/77) 合并，提交 `fe4c08c`。这是后端迁移，不代表新 UI 已实现。
- UI-0 接入方案已通过 [PR #79](https://github.com/Janonez/ProductionAssistant/pull/79) 合并，提交 `90b8406636ea1057fe6d532a212d95163f572ffe`。
- 用户已决定前端设计迁移与后端功能迁移交替推进；UI-1a、DX-1 均已完成并合并，UI-1b-1 已完成实现及 Electron 人工验收，本轮进入提交和 PR 阶段。下一阶段 UI-1b-2 尚未授权实施，其余阶段范围见 [PLAN.md](PLAN.md)。
- UI-1a 已通过 [PR #81](https://github.com/Janonez/ProductionAssistant/pull/81) 合并，main 合并提交为 `21af67f652700ca43517a93dd397fc99f159ff8b`；Electron 和 WinUI Development 均已完成基本视觉人工验收。移植来源固定为 shadcn-admin 提交 `e16c87f213a5ba5e45964e9b67c792105ec74d26`，来源、MIT 许可与逐项适配见 [移植说明](docs/third-party/shadcn-admin.md)。
- 七个路由、query/loadId、Suspense、RouteReady、LoadBoundary、设置与原业务组件保持；没有修改业务页面内部、Bridge、Electron、Sidecar 或 .NET 源码。
- 前端新增 Tailwind 4.2.2 与必要的 Radix/CVA/clsx 等依赖；React、ReactDOM、Vite、TypeScript、Vitest 和其他原有依赖的解析版本未改变。旧 CSS、reset、同名变量及新 portal 已建立边界；旧内容与旧设置暂保持浅色，完整统一留给 UI-1b。
- DX-1 已通过 [PR #82](https://github.com/Janonez/ProductionAssistant/pull/82) 合并，提交 `2aae55af22321c4915cae73e7090dd9de31828af`，完成状态按用户最新确认记录。采用官方 `@electron/get` ZIP 缓存和原生 `electron .`；没有保留自定义运行时管理器，npm ci、verify、宿主与业务代码保持原有流程。
- UI-1b-1 在 `codex/ui1b-theme-persistence` 分支实施，基于 `2aae55af`；仅补齐当前主题的 localStorage 持久化与新表面的 color-scheme，不改整体视觉、布局、ThemeSwitch、旧业务或设置。完整 verify 与 dist 核验通过，Electron Development 运行正常，用户已明确确认主题持久化人工验收通过并授权提交、推送及创建 PR；本轮禁止合并。
- 字体试验保留原版 Inter Variable → Noto Sans SC Variable → sans-serif，将新外壳内 Tailwind 默认字体变量统一到现有 `--font-ui`；没有改变上游布局、字号、字重、平滑或旧页面。长期组件复用规则见 [前端规范](docs/frontend-ui-standards.md)，AGENTS.md 已强制引用；字体继续作为试验方案记录，尚未正式定稿。
- 核查结论：保留现有 React/Vite、查询参数路由和统一桥接，渐进接入 shadcn-admin；日报完整工作流仍有 Sidecar 接口缺口。详细事实、能力表和验收边界只在 UI-0 文档维护。

## 下次入口

1. 只读检查 `git status -sb`、`git worktree list`、分支和最近提交，按实际状态更新判断。
2. 完成 UI-1b-1 提交与 PR 交付后停止，等待 ChatGPT 审查及用户后续授权；不得自行合并。自动测试、实际窗口技术检查与用户验收分别记录，提交和 PR 状态以 Git / GitHub 为准。
3. Electron Development 入口为 `npm.cmd --prefix src\ProductionAssistant.Desktop start -- --environment Development`；Development 发布目录是 WinUI 测试版。下一阶段 UI-1b-2 主要面向 Electron 迁移全局设置 Dialog，尚未授权实施；UI-1b-3 调整为 Electron 宿主兼容性及 UI 收尾。详细边界只在 [PLAN.md](PLAN.md) 维护，WinUI 仅保留必要兼容与基础回归。
4. UI-2 实施前确认日报能力范围；不能把 SD-8c 开放创建/保存模板视为预览、发送、启停等完整链路已迁移。

## 待决策

- UI-1b-1 用户人工验收已通过，当前等待提交后的 PR 审查；本轮禁止合并。官方缓存缺失或损坏时原生 Electron 安装器仍可能尝试下载，DX-1 没有引入阻断机制。
- 已知 Electron 深色标题栏窗口控制按钮对比度不足，按用户反馈列入 UI-1b-3，尚未修复。不处理 WinUI 白色标题栏及“视图”菜单视觉问题，不再要求双宿主视觉一致性验收。
- UI-2 按已开放接口分批交付，或先另行授权补齐接口后完整验收，见 UI-0 第 5 节。

## UI-1b-1 验证（2026-11-05）

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
