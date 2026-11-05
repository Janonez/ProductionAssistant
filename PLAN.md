# ProductionAssistant 计划

## 目标

维护面向生产业务的 Windows 桌面工具。项目功能和运行方式以 [README.md](README.md) 为准，开发、合并和发布流程以 [AGENTS.md](AGENTS.md) 为准。

## 方案

- Core 承载纯业务，Infrastructure 处理外部系统，Bridge 提供请求分发和会话管理。
- 唯一长期方向是 Electron Desktop、React + TypeScript、shadcn-admin UI 体系、shadcn/ui 官方基础组件、统一 Bridge、.NET Sidecar 和现有业务服务。Electron 通过标准输入输出连接 Sidecar，React 前端通过统一桥接与宿主通信；宿主迁移依据见 [Electron 宿主设计](docs/electron-host-design.md)。
- WinUI / WebView2 只作为业务迁移完成前的过渡宿主，不是长期维护的 UI 目标，不把两个宿主定义为需要长期保持视觉一致的两个产品。
- WinUI 保留当前正常运行所需的必要兼容；只有现有业务受到实际影响时，才考虑最小范围修复。不再投入标题栏美化、原生“视图”菜单样式、双宿主视觉一致性、WinUI 专属交互或主题完善，以及非必要的 WinUI 界面重构；过渡兼容不得阻碍 Electron 的正常架构演进。
- 在现有 React 工程上逐步采用 shadcn-admin 的布局与整体设计，基础组件复用官方 shadcn/ui；上游使用 Vite + React，不是 Next.js，不整仓覆盖现有前端。
- 保留现有 React/Vite 工程、七个业务入口、query 路由和统一 Bridge，不创建第二套长期渲染工程；UI-1a 只替换整体外壳，不承担完整业务页面重写。

## 后端与 UI 交替推进

2026-11-04 决定：不再等 Sidecar 全部迁移完才开始 UI。每批业务能力迁移后，尽可能交付一批可见、可用的新界面，并在 Electron 开发版中验收。

| 顺序 | 阶段 | 范围与交付 |
|---|---|---|
| 1 | SD-8c | 日报本地配置迁移；不产生 UI 变化 |
| 2 | UI-0 | 只读核对现有前端、宿主与接口，形成 shadcn-admin 接入方案；不修改界面 |
| 3 | UI-1a | shadcn-admin 风格导航、顶栏、整体外壳及必要隔离样式；首次在 Electron Development 验收真实 UI |
| 4 | UI-1b | 依次实施主题持久化（UI-1b-1）、全局设置 Dialog（UI-1b-2）、Electron 宿主兼容性及 UI 收尾（UI-1b-3）；批次边界见下文 |
| 5 | UI-2 | 日报任务列表、详情与模板编辑；接入已开放的真实接口 |
| 6 | SD-8d | 自动填报任务创建迁移 |
| 7 | UI-3 | 自动填报任务列表、创建与相关设置 |
| 8 | SD-9 | Schema 配置、Windows 计划任务操作 |
| 9 | UI-4 | 自动化配置、调度、通知界面 |
| 10 | SD-10 | Excel、PDF、远程数据操作 |
| 11 | UI-5 | 报表中心、数据管理及对应操作 |
| 12 | SD-11 | 腾讯文档 worker、Playwright、浏览器自动化 |
| 13 | UI-6 | 自动填报执行、日志、运行状态 |
| 14 | UI-7 | 其余页面、组件与交互统一 |
| 15 | SD-12 | Electron 打包、升级、正式计划任务入口与完整回归 |
| 16 | SD-13 | Electron / Sidecar 达到正式业务所需覆盖及稳定性后，单独规划 WinUI 退出与正式发布 |

阶段编号是本轮路线规划，不表示已实现。当前进度只在 [STATUS.md](STATUS.md) 维护。每个 UI 阶段开始前核对实际 Sidecar 白名单；界面样式完成不等于业务链路已迁移。接口缺口先列清单，再按阶段授权处理。

UI-1b 沿用上述路线，按以下批次边界逐项授权：

- UI-1b-1：补齐现有 light / dark / system 主题持久化与样式边界验证，不重写业务页面。
- UI-1b-2：主要面向 Electron 迁移全局设置 Dialog，复用 shadcn/ui Dialog，延续 shadcn-admin 设计体系；保留设置业务逻辑、凭据处理语义和必要旧宿主兼容，不为 WinUI 单独开发视觉适配，不建立第二套设置页面。
- UI-1b-3：Electron 宿主兼容性及 UI 收尾。处理深色标题栏窗口控制按钮对比度不足、原生窗口区域与应用主题协调，以及 Sidebar、Header、Sheet、Portal、Tooltip / Dialog 浮层、滚动、响应式、主题切换与持久化回归、iframe 和旧业务页面的必要兼容。WinUI 仅做必要启动与基础功能回归，不修复其白色标题栏和“视图”菜单问题，不提前迁移七个业务页面。

UI 阶段交付修改清单、验证结果、实际查看入口，以及截图或本机验收说明；编译通过不能代替窗口、交互和真实业务验收。尚未迁移的页面与业务入口继续保留，不带入上游演示数据、登录和无关页面。

## 阶段范围

- 已实现能力和当前工作入口记录在 [STATUS.md](STATUS.md)，实现历史查 git log。
- 后续开发按用户下达的单项需求推进，每项需求先确认仓库状态，再按项目流程实施和验证。
- 设计文档中的决定不自动授权后续实现、删除、部署、版本标签或发布。
- UI-0 调查与文档修正不授权后续实现；UI-1a、UI-1b 及后续实施逐阶段授权，C#、csproj、sln 修改仍需逐文件授权。
- 当前迁移保持既有业务逻辑与配置所有权，不更新本机稳定版 1.8.1；项目管理甘特图、焊接数据调整等新业务另行立项。
- Electron 优先与 WinUI 过渡策略是计划调整，不授权删除 WinUI 代码，也不改变现有构建和发布流程。WinUI 退出需在功能覆盖和稳定性条件满足后另行规划、授权实施。

## 决策记录

架构决策集中维护在对应设计文档，不在此复制。待用户决定的当前问题写入 `STATUS.md`。

前端工程核查、shadcn-admin 接入建议、UI-1a / UI-1b 验收与 UI-2 接口边界见 [UI-0 接入方案](docs/ui0-shadcn-admin-integration.md)。
