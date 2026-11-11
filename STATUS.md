# ProductionAssistant 交接状态

## T1 / T1-A / T2.1 第一阶段 Git 交付入口（2026-11-11）

- Git 交付起点为 `codex/tencent-session-vertical-slice`，HEAD `ed3f8e19e7992acd3ca970d435f1d2533f0df815`。用户已确认第一阶段真实 Electron 人工验收通过，并授权将全部 T1/T1-A/T2.1 修改作为一次逻辑提交推送、创建 PR，CI 与仓库保护规则通过后 Squash Merge 到 main；保留功能分支，不更新稳定版、版本号或 Release。
- 闪现根因是 Group 页面单独 lazy 加载时，Suspense 按 `daily-report` 选择了旧 AutomationSkeleton，用户看到的文案与该占位逐字一致，并非额外的旧页面保持状态。App 改为直接导入 GroupSubmissionPage，连接列表/配置异步读取期间用已有 shadcn Skeleton 组成四指标占位；其他 lazy 页面和通用任务清单保持。
- 水平偏移已用显示真实滚动条的 localhost 浏览器复现：1600px 下短页 `left=412`，长设置页滚动条占 10px 后 `left=407`。仅集团填报的 `.pa-page-scroll` 设置 `scrollbar-gutter: stable`，修复后两者均为 `407`，卡片/Tab 左边缘和容器宽度也相同；未发现 Tab 内容位移动画，不固定卡片宽度或补偿 margin。
- 本轮修改文件：`src/.../Prototype/src/app/{App.tsx,App.startup.test.tsx}`、`components/layout/{AppLayout.tsx,AppLayout.test.tsx}`、`features/group-submission/{GroupSubmissionPage.tsx,SubmissionWorkbench.tsx}`、`tests/tencent-sheet/check-ui.cjs`、`docs/tencent-sheet-development.md`、本 STATUS 和随源码重生成的 dist。旧 dist 现场保存在 `artifacts/t2-1-validation-20261111/dist-before-stability`。
- 新增覆盖：从生产消息进入集团时，列表/配置分别等待的全过程不出现旧自动化占位；三标签与四指标 Skeleton；仅集团滚动容器保留 gutter；浏览器从任务清单冷进入，监听瞬时旧正文；在 1600/960px 下以空/60 条历史及长设置执行历史→设置→填报循环，等待字体与有限动画结束后核对页面、卡片、Tab 左边缘及宽度；原任务清单完整回归保留。
- 本轮命令均退出 0（日志在 `artifacts/t2-1-validation-20261111/`）：React 专项 `npm.cmd --prefix src/ProductionAssistant.App/Assets/Prototype test -- src/app/App.startup.test.tsx src/components/layout/AppLayout.test.tsx src/components/layout/LoadingSkeleton.test.tsx src/features/group-submission/GroupSubmissionPage.test.tsx src/features/daily-report/AutomationPage.categories.test.tsx`，39/39（`ui-stability-react.log`）；`npm.cmd --prefix src/ProductionAssistant.App/Assets/Prototype run build`（`ui-stability-build.log`）；`node tests/tencent-sheet/check-ui.cjs`（临时 NODE_PATH，结束恢复，`ui-stability-browser.log`）；React 全量 362 通过/1 既有跳过（`ui-stability-react-full.log`）。修复前的布局实测保留在 `ui-layout-before.log`。
- 完整 `pwsh -NoProfile -File .\scripts\verify.ps1` 不带 SkipRestore / SyncRelease，退出 0（`ui-stability-verify.log`）：React 362 通过/1 项既有符号链接 EPERM 跳过、TypeScript/Vite、浏览器稳定性与旧任务回归、Electron 91/91、.NET 370/370、Release 构建和 Development 发布通过。npm 32 项审计、Vite 大块、PRI249 既有警告保持，不自动升级或弱化检查。
- 发布后读取文件集合与 SHA256 核对退出 0：源码 dist 和 `deployments/development/Assets/Prototype` 的 119 个文件全部一致，6 个 Worker 脚本一致。使用包自带 `node src/ProductionAssistant.Desktop/node_modules/electron/install.js` 恢复锁定的官方 Electron 45.0.0，退出 0（`ui-stability-electron-runtime.log`），已核对 version 与 exe，供用户手动启动；本轮不操控或启动桌面。
- 用户已确认 Development 更新后的第一阶段真实 Electron 人工验收通过，包括集团入口旧内容闪现及三标签水平偏移、抖动修复；自动验证和 Development 发布也已完成，现进入 Git 交付阶段。该确认不等于生产填报、云端保存或调度能力验收。本轮无生产单元格写入、Profile 删除/重置或稳定版更新，`--no-sandbox` 保持独立安全待办，仍需评估 Sandbox 与扫码兼容性。

## T2.1 第一阶段此前验证记录（2026-11-11，历史）

- 继续 `codex/tencent-session-vertical-slice`，HEAD `ed3f8e19e7992acd3ca970d435f1d2533f0df815`，保留全部 T1/T1-A/T2.1 未提交与未跟踪文件；不提交、推送、创建 PR、合并或更新稳定版。
- 正式集团填报已由 App 直接加载独立 `GroupSubmissionPage`，三标签为填报/历史记录/设置；旧任务详情、录制和自定义能力由任务清单保留，不嵌入新工作台。
- 链接、会话、历史复用已有 Bridge/Sidecar 允许操作；新页面不调用未开放的取数、写入或调度，不编造成功。补上文档配置响应身份校验与回归，避免切换连接时显示旧配置。
- 上轮文档补丁上下文错误已按当前原文修复；当前三标签规范、旧五 Tab 消费者、迁移边界、组件来源及人工验收步骤见 [腾讯文档开发说明](docs/tencent-sheet-development.md) 和 [组件来源](docs/third-party/shadcn-admin.md)。
- 本轮 `git diff --check` 退出 0。React 专项 `npm.cmd --prefix src/ProductionAssistant.App/Assets/Prototype test -- src/features/group-submission/GroupSubmissionPage.test.tsx src/features/daily-report/AutomationPage.categories.test.tsx src/features/daily-report/tencent-sheet/TencentSessionPanel.test.tsx src/app/App.navigation.test.tsx src/routes` 退出 0，7 文件 / 135 项通过。
- AppLayout 两项失败已关闭，仅修改 `AppLayout.test.tsx`：集团填报正式入口按设计使用 shadcn 表面，其余页面保留 `.pa-legacy-content`；`data-business-page` 只由本测试的旧页面替身生成，没有运行时消费者。改为核对真实集团页面三标签和主题边界，并增加 URL 直达、返回任务清单和侧栏实例保留回归；生产布局和路由未改。原失败日志 `react-full.log` 保留。
- 本轮命令与结果（均保存到 `artifacts/t2-1-validation-20261111/`）：`npm.cmd --prefix src/ProductionAssistant.App/Assets/Prototype test -- src/components/layout/AppLayout.test.tsx src/components/layout/AppLayout.electron.test.tsx src/components/layout/Sidebar.interactions.test.tsx` 退出 0，16/16（`applayout-fixed.log`）；上述 T2.1 专项重跑退出 0，135/135（`react-targeted-fixed.log`）；`npm.cmd --prefix src/ProductionAssistant.App/Assets/Prototype test` 退出 0，361 通过 / 1 项既有符号链接 EPERM 跳过（`react-full-fixed.log`）。
- TypeScript 命令 `& 'src/ProductionAssistant.App/Assets/Prototype/node_modules/.bin/tsc.cmd' --noEmit --project 'src/ProductionAssistant.App/Assets/Prototype/tsconfig.json'` 退出 0（`typescript.log`）；`npm.cmd --prefix src/ProductionAssistant.App/Assets/Prototype run build` 退出 0（`vite-build.log`）；`npm.cmd --prefix src/ProductionAssistant.Desktop test` 退出 0，91/91（`electron-tests.log`）；`dotnet test tests/ProductionAssistant.Tests/ProductionAssistant.Tests.csproj -c Release -p:Platform=x64 --filter 'FullyQualifiedName~Tencent|FullyQualifiedName~SidecarLocalConfigurationTests|FullyQualifiedName~ArchitectureTests'` 退出 0，103/103（`dotnet-related.log`）。
- 旧任务清单浏览器失败已修复，仅改 `tests/tencent-sheet/check-ui.cjs`：无 taskType 的任务清单先展示类型选择器，旧脚本漏选“腾讯文档填报”；现断言选类型前无链接字段，选中后等待真实配置区域，再填写链接。未改生产组件、加超时、删断言或跳过旧流程。原失败日志 `verify-full.log` 保留。
- 专项命令 `node tests/tencent-sheet/check-ui.cjs`（按开发说明临时设置 NODE_PATH，结束恢复）退出 0，完整保留新工作台和旧录制/自定义/示范/前后台模拟执行检查，日志 `ui-browser-fixed.log`。随后完整 `pwsh -NoProfile -File .\scripts\verify.ps1` 不带 SkipRestore / SyncRelease，退出 0，日志 `verify-after-ui-fix.log`：Teable、Node 会话/保存/Frame、字体 lint、React 361 通过 / 1 项既有符号链接权限跳过、TypeScript/Vite、新旧 UI 浏览器回归、Electron 91/91、.NET 370/370、Release 构建及 Development 发布均通过。
- Development 已由完整 verify 发布，无需重复发布。源码 `Assets/Prototype/dist` 与 `deployments/development/Assets/Prototype` 的 122 个文件路径集合和 SHA256 全部一致，6 个 Worker 脚本也一致，核对命令退出 0。dist 是本轮前端真实构建差异，不还原或提交；原始副本 `dist-before` 保留。npm 既有 32 项审计、Vite 大块及 PRI249 警告保留，不自动升级。
- 已执行用户指定 `npm.cmd --prefix src/ProductionAssistant.Desktop start -- --environment Development`，官方包原生安装器恢复 Electron 运行时，启动会话保持运行。用户明确要求自行手动验收，已停止电脑控制；窗口检查请求未获准，未执行点击或输入。附加读取 Development 启动日志遭沙箱 Access denied，已停止读取，不影响上述自动验证结果。
- 当前停在用户人工验收节点：检查正式导航三标签、链接保存/放弃/刷新恢复、真实打开/重新检查/关闭、状态与恢复建议和任务清单旧入口。真实扫码/冷启动会话仍待验收；自动检查使用 localhost / 模拟 Bridge，不代表生产填报成功。本轮未写生产单元格、删除或重置 Profile，Edge `--no-sandbox` 保持独立待办；不提交、推送、PR、合并或更新稳定版。

## T1-A 自动验证记录（2026-11-10，非 T2.1 验证结果）

- 当前分支 `codex/tencent-session-vertical-slice`，HEAD `ed3f8e19e7992acd3ca970d435f1d2533f0df815`；全部 T1 / T1-A 修改未提交。本轮不提交、推送、创建 PR、合并、更新稳定版或实施 T2—T6。
- 导航已按 Metis 分类组织，集团填报位于数据报送；七个既有路由保留，任务分类使用 `daily-report` 的 `taskType` 参数。任务清单仍展示全部类型，规划入口隐藏，Teable、自定义录制、执行和定时消费者保留。
- 文档链接使用任务已有 `config.documentUrl` 和本地存储；显式保存／放弃草稿，未保存时阻止检查新目标，无效链接不能覆盖原配置。真实 Sidecar 进程重启后配置与三类任务身份恢复测试通过。
- 会话页自动读取状态，提供“打开并检查”“重新检查”“关闭浏览器”，继续复用原四个 Bridge 操作及持久化 Context。当前状态、历史检查时间、身份与文档访问分别表达，关闭浏览器不清除登录资料。
- 类型边界统一为 `AutomationTaskFilter`；外部 URL 无效或重复分类明确报错，不回退到其他业务列表。Sidecar 精确集合为协议 81 / 允许 29 / 未迁移 52；T1-A 仅增加本地配置 `tencentSheet.create/save`，退役及未知接口仍在分发前拒绝。
- 本轮完整 `pwsh -NoProfile -File .\scripts\verify.ps1`（不带跳过还原或稳定版参数）退出 0：Teable 三组转换、Node Frame／保存／会话、字体 lint、React 349 通过／1 项既有符号链接 EPERM 跳过、TypeScript / Vite、完整 UI 浏览器回归、Electron 91/91、.NET 370/370、Release 构建和 Development 发布均通过。
- UI 严格模式修复只改测试：状态提示限定到会话 region / status / paragraph，详情以 definition 单独核对，保留关闭、登录、访问、未知和恢复断言；未使用 first/nth、固定 sleep 或扩大超时。
- verify 后源码 dist 与 Development 的 120 个文件路径及 SHA256 全部一致，六个 Worker 脚本也一致。Electron 45.0.0 官方运行时已在依赖重装后恢复，未启动应用。191 个运行源码文件的退役登录接口扫描无消费者。
- 保留既有 npm 审计 32 项、弃用提示、Vite 大块提示及 PRI249 构建警告，未自动升级依赖。Edge Sandbox 启动参数未改，`--no-sandbox` 提示与独立测试 Profile 的 Sandbox／扫码兼容性评估仍待完成；不得据本轮自动验证宣称已解决。
- 详细行为与人工验收步骤见[腾讯文档开发说明](docs/tencent-sheet-development.md)，导航契约见[导航设计](docs/navigation-contract-design.md)。下列旧模块状态及历史记录不替代当前 T1-A 入口。

## 下次入口

1. 第一阶段代码、完整自动验证、Development 发布及用户真实 Electron 人工验收均已完成。先核对 Git 现场，再审查全部已跟踪和未跟踪交付文件，按路径暂存，执行一次逻辑提交。
2. 推送当前功能分支，按实际 PR 模板创建到 main 的 PR；检查完整变更、CI、冲突和阻塞审查意见，满足保护规则后 Squash Merge，不绕过审批。CI 未完成时遵守 AGENTS.md 的等待规则。
3. 合并后核对 PR、合并 SHA、main 与 origin/main 及工作区；保留功能分支，不进入第二、第三阶段，不控制桌面、不写生产数据、不重置 Profile、不更新稳定版或发布 Release。Edge `--no-sandbox` 独立安全评估仍未完成。

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

## UI 阶段历史入口（非本轮接续）

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

### T1-A 前的收尾记录（历史）

- 当前分支 `codex/tencent-session-vertical-slice`，基线 `ed3f8e19e7992acd3ca970d435f1d2533f0df815`；现有 T1 修改未提交，不提交、推送、开 PR 或合并，不更新稳定版。
- 已实现：React 四个会话操作经 Bridge / Sidecar、.NET 服务和 Worker 调用 Playwright 原生持久化 Context；沿用环境专用 Profile、单一 Worker 租约和原生 Context 关闭，不增加 MCP、CDP 探针或会话框架。源码接通不代表宿主调用链已验收。
- 已验证：`node tests/tencent-sheet/check-session.cjs` 和同文件 `--browser` 均退出 0，`git diff --check` 通过。公开 API 实测 Edge `157.0.4341.46`、登录有头模式；原 `:has()` / `login-required`、持久 Cookie、关闭重开、独立进程复用、失效、无权限、只读及真实启动/导航取消通过。
- 自动验证收尾通过：完整 `pwsh -NoProfile -File .\scripts\verify.ps1`（无跳过还原、无稳定版参数）退出 0；三组 Teable 转换检查、Node 状态/保存/Frame 回归、字体 lint、React 329 通过 / 1 项既有跳过（符号链接 EPERM）、TypeScript / Vite、完整 UI 浏览器回归、Electron 90/90、.NET 368/368、Release 构建和 Development 发布均通过。此前 15 项 Node 回归保留为已有证据；未无理由重跑 Edge 生命周期。保留 npm 审计 32 项、弃用提示、Vite 大块提示及 PRI249 构建警告，未自动升级依赖。
- 依赖问题已定位：Playwright 及 playwright-core 1.62.1 原已安装于腾讯文档资产包，外部测试目录的 CommonJS 查找范围不包含该位置；上一轮直接命令缺少文档要求的 `NODE_PATH`。verify 现统一在还原依赖后设置临时路径，结束时恢复原值，并在前端构建后运行 UI 回归。后台模拟提交已验证一次请求、成功响应、可见完成提示及操作恢复；提示包含关闭按钮文本，原精确文本定位不适配。
- 产物核对通过：源码 dist 与 Development 的 120 个文件路径及 SHA256 全部一致，且与本轮前基线一致；Sidecar Release 与 Development 的 6 个 Worker 脚本均与源码一致、无额外脚本，两份 Playwright 包均为 1.62.1。官方 Electron 45.0.0 安装器恢复运行时成功（缓存未命中，官方下载并校验）；未启动应用。
- 当前下一步：按开发说明执行真实 Electron Development 人工验收，不继续实现 T2—T6。分层证据包括 UI 模拟 Bridge、实际 Sidecar 四操作协议/权限测试、Worker 生命周期测试和此前真实 Edge 本地测试，尚不代表真实腾讯扫码的完整宿主调用链已验收。独立环境探针已废弃。
- 尚待人工验收：真实 Electron Development 扫码、状态检查、正常退出、应用冷启动复用、失效恢复、无权限/未知反馈和多实例独占。全过程不输入生产业务单元格；自动测试和本地 Cookie 不替代这些验收。
- 详细设计、验证边界与操作步骤见 [腾讯文档开发说明](docs/tencent-sheet-development.md)。下列历史模块状态保留，不作为当前 T1 的接续入口。
- 自动化配置设计校准已记录于[前端规范](docs/frontend-ui-standards.md#自动化配置设计原则)，PLAN 与开发说明均已引用；后续设计与审查按该原则执行，本次文档更新不扩大 T1 收尾范围。
