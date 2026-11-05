# ProductionAssistant 交接状态

## 当前状态

- 项目包含 WinUI / WebView2 应用、React 前端、共享 Bridge、Sidecar 和 Electron 开发外壳；后者尚未替代 WinUI。结构和运行方式见 [README.md](README.md)。
- SD-8c 已完成：日报本地配置迁移通过 [PR #77](https://github.com/Janonez/ProductionAssistant/pull/77) 合并，提交 `fe4c08c`。这是后端迁移，不代表新 UI 已实现。
- UI-0 接入方案已通过 [PR #79](https://github.com/Janonez/ProductionAssistant/pull/79) 合并，提交 `90b8406636ea1057fe6d532a212d95163f572ffe`。
- 用户已决定前端设计迁移与后端功能迁移交替推进；UI-1a 之后当前实施 DX-1，下一阶段为 UI-1b，其余阶段范围见 [PLAN.md](PLAN.md)。
- UI-1a 已通过 [PR #81](https://github.com/Janonez/ProductionAssistant/pull/81) 合并，main 合并提交为 `21af67f652700ca43517a93dd397fc99f159ff8b`；Electron 和 WinUI Development 均已完成基本视觉人工验收。移植来源固定为 shadcn-admin 提交 `e16c87f213a5ba5e45964e9b67c792105ec74d26`，来源、MIT 许可与逐项适配见 [移植说明](docs/third-party/shadcn-admin.md)。
- 七个路由、query/loadId、Suspense、RouteReady、LoadBoundary、设置与原业务组件保持；没有修改业务页面内部、Bridge、Electron、Sidecar 或 .NET 源码。
- 前端新增 Tailwind 4.2.2 与必要的 Radix/CVA/clsx 等依赖；React、ReactDOM、Vite、TypeScript、Vitest 和其他原有依赖的解析版本未改变。旧 CSS、reset、同名变量及新 portal 已建立边界；旧内容与旧设置暂保持浅色，完整统一留给 UI-1b。
- DX-1 在 `codex/electron-runtime-cache` 分支实施，基于 `21af67f`。用户已决定采用官方 `@electron/get` ZIP 缓存；自定义启动器、运行时校验清单、导入脚本及专用测试已按明确路径撤销，Desktop package.json 恢复原生 `electron .`。最终 Git 变更仅保留 README.md 和 STATUS.md，现有 npm ci、verify、宿主和业务代码保持基线。
- 字体试验保留原版 Inter Variable → Noto Sans SC Variable → sans-serif，将新外壳内 Tailwind 默认字体变量统一到现有 `--font-ui`；没有改变上游布局、字号、字重、平滑或旧页面。长期组件复用规则见 [前端规范](docs/frontend-ui-standards.md)，AGENTS.md 已强制引用；字体继续作为试验方案记录，尚未正式定稿。
- 核查结论：保留现有 React/Vite、查询参数路由和统一桥接，渐进接入 shadcn-admin；日报完整工作流仍有 Sidecar 接口缺口。详细事实、能力表和验收边界只在 UI-0 文档维护。

## 下次入口

1. 只读检查 `git status -sb`、`git worktree list`、分支和最近提交，按实际状态更新判断。
2. DX-1 官方缓存准备、原样完整 verify、进程内禁用联网后的真实安装器恢复，以及两次 Development 窗口启动/正常退出已完成，证据见下方。当前等待用户对 GUI 外观与交互作最终人工验收，不把技术核查写成用户已回复通过。
3. DX-1 官方缓存说明见 [README](README.md#electron-开发运行时)。原启动命令为 `npm.cmd --prefix src\ProductionAssistant.Desktop start -- --environment Development`；Development 发布目录是 WinUI 测试版，不是 Electron 启动入口。当前暂不提交或推送，完成真实验证后交用户审查；下一阶段 UI-1b 仍须单独授权。
4. UI-2 实施前确认日报能力范围；不能把 SD-8c 开放创建/保存模板视为预览、发送、启停等完整链路已迁移。

## 待决策

- UI-1a 两个宿主的基本视觉验收已完成；DX-1 的技术验证已完成，GUI 最终人工验收与本轮报告审查待用户确认。官方缓存缺失或损坏时原生安装器可能尝试重新下载，不再以自定义管理器阻断该行为。
- UI-2 按已开放接口分批交付，或先另行授权补齐接口后完整验收，见 UI-0 第 5 节。

## DX-1 验证（2026-11-05）

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
