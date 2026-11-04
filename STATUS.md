# ProductionAssistant 交接状态

## 当前状态

- 项目包含 WinUI / WebView2 应用、React 前端、共享 Bridge、Sidecar 和 Electron 开发外壳；后者尚未替代 WinUI。结构和运行方式见 [README.md](README.md)。
- SD-8c 已完成：日报本地配置迁移通过 [PR #77](https://github.com/Janonez/ProductionAssistant/pull/77) 合并，提交 `fe4c08c`。这是后端迁移，不代表新 UI 已实现。
- UI-0 接入方案已通过 [PR #79](https://github.com/Janonez/ProductionAssistant/pull/79) 合并，提交 `90b8406636ea1057fe6d532a212d95163f572ffe`。
- 用户已决定前端设计迁移与后端功能迁移交替推进；当前后续顺序为 UI-1a 合并 → DX-1 → UI-1b，其余阶段范围见 [PLAN.md](PLAN.md)。
- UI-1a 已在现有 React 工程中移植 shadcn-admin 固定提交 `e16c87f213a5ba5e45964e9b67c792105ec74d26` 的真实 Sidebar、Header、页面容器、基础组件和主题；不是独立 Demo。代码已完成、完整 verify 已通过，目前等待提交和 PR。来源、MIT 许可与逐项适配见 [移植说明](docs/third-party/shadcn-admin.md)。
- 七个路由、query/loadId、Suspense、RouteReady、LoadBoundary、设置与原业务组件保持；没有修改业务页面内部、Bridge、Electron、Sidecar 或 .NET 源码。
- 前端新增 Tailwind 4.2.2 与必要的 Radix/CVA/clsx 等依赖；React、ReactDOM、Vite、TypeScript、Vitest 和其他原有依赖的解析版本未改变。旧 CSS、reset、同名变量及新 portal 已建立边界；旧内容与旧设置暂保持浅色，完整统一留给 UI-1b。
- 本机 UI 技能及专用配置清理已完成，接入方案不再要求额外 Demo 审批。本轮保持 `codex/ui1a-shadcn-shell`、HEAD `90b8406636ea1057fe6d532a212d95163f572ffe`，不提交、不推送、不创建分支，不更新稳定版。
- 字体试验保留原版 Inter Variable → Noto Sans SC Variable → sans-serif，将新外壳内 Tailwind 默认字体变量统一到现有 `--font-ui`；没有改变上游布局、字号、字重、平滑或旧页面。长期组件复用规则见 [前端规范](docs/frontend-ui-standards.md)，AGENTS.md 已强制引用；字体继续作为试验方案记录，尚未正式定稿。
- 核查结论：保留现有 React/Vite、查询参数路由和统一桥接，渐进接入 shadcn-admin；日报完整工作流仍有 Sidecar 接口缺口。详细事实、能力表和验收边界只在 UI-0 文档维护。

## 下次入口

1. 只读检查 `git status -sb`、`git worktree list`、分支和最近提交，按实际状态更新判断。
2. Electron Development 已完成基本视觉验收，用户反馈整体基本符合预期；UI-1a 代码已完成、完整 verify 已通过，目前等待提交和 PR。WinUI Development 共享前端产物的真实窗口验收仍待完成，不重复要求已完成的 Electron 基本视觉验收。
3. Electron 45.0.0 二进制已由用户手动恢复，开发版可以启动；完整 verify 中的 Desktop `npm ci --ignore-scripts` 会清除该二进制，重复下载问题留待 DX-1 独立修复。启动命令为 `npm.cmd --prefix src\ProductionAssistant.Desktop start -- --environment Development`。共享 dist 与默认路径下的 Release Sidecar 已就绪；Development 发布目录是 WinUI 测试版，不是 Electron 启动入口。
4. UI-2 实施前确认日报能力范围；不能把 SD-8c 开放创建/保存模板视为预览、发送、启停等完整链路已迁移。

## 待决策

- Electron Development 基本视觉验收已完成；WinUI Development 共享前端产物的真实窗口验收仍待完成。F5/Ctrl+R 的宿主 loadId 行为及业务操作尚无专项验收记录；字体仅为试验，尚未确认为正式规范。UI-1a 合并后先进入 DX-1，再进入 UI-1b；各阶段仍分别授权。
- UI-2 按已开放接口分批交付，或先另行授权补齐接口后完整验收，见 UI-0 第 5 节。

## 本轮验证（2026-11-04）

- 字体试验后重新运行 `pwsh -NoProfile -File .\scripts\verify.ps1`，退出 0：前端 274 通过 / 1 跳过（符号链接权限），Desktop 81 通过，xUnit 355 通过；字体检查、TypeScript、Vite、Release 构建及 Development 发布通过。本次未改动测试，保留 UI-1a 原有新增 6 个外壳测试、Sidebar 测试及全部既有路由/桥接/业务断言。
- Release 构建与 Development 发布各出现 `PRI249: Invalid qualifier: PACKAGE-LOCK` 警告，均无错误；Vite 提示入口块大于 500kB；npm 审计报告 32 项（26 moderate、4 high、2 critical），未自动升级修复。
- 实际 dist 的浏览器检查：960×600、1100×700 七页没有文档/内容水平溢出；展开宽 256px，图标模式容器宽 66px / 布局占位 64px，Header 高 64px；七个图标入口鼠标点击、设置入口、明暗主题及非默认路由刷新已核对。透明分组标题的指针遮挡已修正。浏览器没有桌面宿主，保留真实未连接错误，不能视为 Electron 或 Sidecar 业务验收。
- 修改前后对实际 dist 运行无头 Chromium 字体诊断：11 个 WOFF2 资源实际加载，CDP 字形来源确认英文 Inter、中文 Noto Sans SC；加载字重范围 100–900。Sidebar、Header、shadcn Button 和旧页标题/正文/按钮共 7 个采样节点的字体、字重、平滑、缩放及尺寸均未变化；侧栏 256px、Header 64px。仅新外壳的 Tailwind 默认字体变量由系统字体链改为原版字体链。
- 字体加载正常的证据仅来自实际 dist 的无头 Chromium（DPR 1、页面缩放 1），不能据此确认用户 Electron 的字体渲染、Windows DPI 或缩放状态；清晰度问题的 Electron 端原因尚未定位，不宣称已修复。
- Development 发布目录与共享 dist 的 120 个文件 SHA-256 一致。与本轮开始时 127 份前端源码/配置的哈希对比，仅 `styles/shadcn-shell.css` 改变，原 UI-1a 未提交实现保留；本次无依赖变动。新增前端规范文档已单独暂存纳入 Git 跟踪，其余 UI-1a 修改未暂存，未提交。

## 归档

历史实现和验证证据以 git log、对应 PR 和专题文档为准。
