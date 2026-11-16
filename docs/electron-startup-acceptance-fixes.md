# Electron 启动验收四项修复报告

2026-11-16。分支 `codex/electron-startup-lifecycle`，基线 `11461dc`。本报告是上一轮人工验收未通过后的修复结果；原架构报告和性能证据保留为历史记录。

四项修复及本地自动验证完成，Development 已生成。用户随后明确授权提交、推送、创建 PR 和合并，现进入 Git 交付；合并仍以对应提交的 CI verify pass 为前提。下文记录修复完成时的验证与边界，不将授权改写为历史异常或现场恢复均已验收。修复阶段未切分支、提交或发布；Production、版本和用户数据未修改，既存 hotfix 工作树未操作。

## 1. 根因与关键修改

| 问题 | 根因 | 修复 |
| --- | --- | --- |
| 普通入口可能隐藏窗口 | `scripts/start.js` 把 GUI Electron 进程也以 `windowsHide: true` 启动；既有实际检查通过 Playwright 直接启动 Electron，未覆盖这条普通入口。 | 第 11 行改为 `windowsHide: false`；普通与诊断参数原样传递，移除 `ELECTRON_RUN_AS_NODE` 的机制保留。 |
| Ready 后发送过期请求 | 只依赖 `setTimeout` 从 Map 移除；Ready 与超时回调在同一事件循环边界时，截止时间可能已过而回调尚未执行。 | 每项请求记录 `performance.now()` 截止时间；`write` 第 176–179 行在发送前复核对象身份和截止时间。`expire` 第 122 行统一结算，先清定时器和 Map，再回报；接收响应也核对截止时间，防止迟到响应冒充按时成功。 |
| 概览和设置错误等待 | `ready` 控制整个概览及设置挂载；共享的概览 Skeleton 出现在非历史标签外层。lazy fallback 只是三个固定高度块，没有配置区语义。 | 固定概览始终挂载，只有日期及连接状态等待；错误与重试留在当前内容区域。设置首次打开即按需加载模块，模块加载和配置读取共用 `SubmissionSettingsLoading`，保留网页配置 / 业务配置 / 执行规则三个区；失败呈现局部 Alert 和重试。 |
| 测量接受空结果或混用历史日志 | 只保存启动前字节偏移，日志轮转或截断后偏移失效；没有运行身份筛选、必需指标校验或成功标识。 | 从实际启动进程读取 PID，对照实例身份文件与预期 Build ID；以 PID + startupId 读取当前及 `.1` 日志，识别轮转、截断、缺失、无效 JSON。逐项校验必需事件、初始化阶段、FCP、交互耗时及 Sidecar PID；失败记为 `valid: false` 并停止本次测量，错误含阶段 / 缺失指标。中位数只接纳已验证样本。 |

### 窗口和启动参数

`main.js` 的 BrowserWindow 没有设置 `show: false`，沿用 Electron 默认立即显示；没有增加任何延时显示、Ready 后显示或新的隐藏模式。Sidecar 是无窗口能力进程，仍可独立使用 `windowsHide: true`。诊断入口仅追加诊断参数，测试不再依赖隐藏 GUI；本轮无需新增测试专用隐藏开关。单实例、Build ID、不可变资源和启动状态实现没有改动。

### 请求时效与结果未知

计时从 SidecarClient 接收请求开始，Ready 等待占用同一总期限，Ready 后不重置。队列仍以 Map 保持最多 256 项。发送前超过期限的请求不写入 stdin，返回原有 `SIDECAR_NOT_READY` / `retryable: true`；已发送后的超时保留 `SIDECAR_REQUEST_TIMEOUT`、结果未知及 `retryable: false`。取消 / 完成而从 pending 移除的项，以及同 ID 的旧对象，均不能再发送或结算。退出和关闭清空队列与定时器；不重启、不重放未知写入。

### UI 等待边界

- 概览标题、固定说明、四行指标结构和配置入口不受列表或配置读取阻塞。尚未接入的业务取数仍显示破折号，不把文档配置就绪当作业务数值就绪。
- 设置模块加载：三分区加载结构，状态“正在加载设置界面”。
- 设置模块已加载但配置未就绪：相同三分区结构，状态“正在读取设置配置”。不实例化可保存的连接表单，避免把未读取的任务当作新任务。
- 就绪：现有 SubmissionConnection / BusinessConfiguration / SubmissionExecutionRules，保留既有来源和历史的局部读取。
- 读取失败：保留配置区标题，在当前内容显示错误和明确重试；不显示概览骨架，也不显示可误创建的表单。

复用现有 Skeleton、Separator、Alert、Button、Card 和 Table，没有新增视觉体系、预取、缓存或状态管理依赖。

## 2. 本轮实际文件范围

产品与采集代码：

- `src/ProductionAssistant.Desktop/scripts/start.js`
- `src/ProductionAssistant.Desktop/lib/sidecar-client.js`
- `src/ProductionAssistant.App/Assets/Prototype/src/features/group-submission/GroupSubmissionPage.tsx`
- 同目录 `SubmissionWorkbench.tsx`、`SubmissionSettings.tsx`、新增 `SubmissionSettingsLoading.tsx`
- `scripts/measure-electron-startup.cjs`

必要测试和证据：

- 修改 `src/ProductionAssistant.Desktop/test/sidecar-client.test.js`
- 新增同目录 `start.test.js`、`startup-measurement.test.js`
- 修改 `src/ProductionAssistant.App/Assets/Prototype/src/app/App.startup.test.tsx`
- 新增 `src/ProductionAssistant.App/Assets/Prototype/src/features/group-submission/GroupSubmissionPage.loading.test.tsx`
- 新增 `scripts/check-electron-startup-window.ps1`、`scripts/check-electron-group-loading.cjs`
- 更新本报告、`STATUS.md` 和本轮生成的 `Assets/Prototype/dist`；没有改动其他前序源码。

修改前现有 70 个待交付文件的 SHA256 和非 dist 原件在本机忽略目录 `artifacts/startup/acceptance-fix-baseline`。生成的 dist 已按实际源码重建；原不可变构建快照保留，未清理旧代次。该快照不进入 Git。

## 3. 验证结果

按要求先专项，再相关回归 / 构建、完整 verify、资源核对和实际运行。

| 检查 | 结果 |
| --- | --- |
| 两项 P1 单元专项 | 29/29；包括普通 / 诊断启动参数、256 项边界、延迟 Ready、截止已到但回调未运行、并发混合队列、发送前取消 / 完成、旧对象与 ID 复用、截止前发送 / 截止后响应、退出 / 关闭竞争及重复结算。 |
| 集团填报 UI 专项 | 7 文件 83/83；新增一个完整状态转移用例，验证模块等待、配置等待、错误、重试和就绪；原有创建、防重复、草稿、配置保护及历史断言保留。 |
| 测量专项 | 9/9；轮转、空 / 缺失日志、截断后增长、轮转历史丢失、JSON 截断、PID 复用、跨实例缺指标、各必需指标 / 阶段、Build ID / Sidecar PID / 时钟次序、无效样本中位数排除。 |
| React 全量 | 46 文件，445 通过 / 1 既有符号链接权限跳过 / 0 失败。 |
| Electron / Node 全量 | 122/122。 |
| .NET 回归 | 独立执行及完整 verify 内均 372/372。 |
| TypeScript / Vite | 独立及完整 verify 内均通过。 |
| 完整 verify | 无 SkipRestore / SyncRelease，退出 0；包括完整依赖还原、Teable 转换检查、session / frame / save、字体 lint、React、TypeScript / Vite、浏览器回归、Electron、Release 构建、.NET 和 Development 发布。 |
| Development 一致性 | 源码 dist、源码不可变快照、Development 兼容目录和不可变快照：125 文件清单 / SHA256 一致；缺失 0、变化 0、多余 0；Runtime 45.0.0。 |
| 普通启动入口原生窗口 | 直接运行 `start.js --environment Development`；Windows EnumWindows + IsWindowVisible + IsIconic 验证可见、未最小化，正常关闭。Electron PID 5172，startupId `efbe9363-79b6-4720-ae8c-ebe9d71034a9`。 |
| 真实 Development UI | 进程内暂缓只读 IPC 时固定概览立即可见，配置入口可用；首次设置为对应的三分区加载结构；一次模拟只读列表失败局部展示，明确重试后读取真实设置恢复；无 pageerror，窗口可见。未修改持久化配置。 |
| 五次独立启动测量 | 5/5 为 `valid: true`，各有独立 Electron / Sidecar PID 和 startupId，同一已发布 Build ID；没有使用历史实例日志填补指标，没有无效样本参与中位数。 |

最终 Build ID：`88520091-85e5-45bc-af15-b7af4f372e82`。完整 verify 日志：[acceptance-verify.log](../artifacts/startup/acceptance-verify.log)。新测量：[acceptance-after.json](../artifacts/startup/acceptance-after.json)。

实际截图：[概览读取中](../artifacts/startup/acceptance-overview-loading.png)、[设置读取中](../artifacts/startup/acceptance-settings-loading.png)、[设置读取失败](../artifacts/startup/acceptance-settings-read-error.png)、[重试后的设置](../artifacts/startup/acceptance-settings-ready.png)。截图含本机业务显示，仅留在忽略的 artifacts 目录。

### 过程中出现的失败

- 新 UI 测试首次切换标签只 click 未 focus，定位失败；按现有 Tabs 测试方式聚焦后点击，专项通过。React 首轮全量中的旧启动测试仍要求整个概览 Skeleton，按本轮目标改为验证固定表格与局部日期加载，保留旧界面不闪现和 Ready 契约，随后全量和完整 verify 通过。
- 首次原生窗口检查使用隐藏的 Start-Process Node 启动器，发生 `Normal startup did not produce a visible native window within 30000ms.`。之后确认该检查创建的 Electron PID 33656、父 Node PID 28900，实际原生窗口 `visible=True`；只向已证明属于本次测试的窗口发送普通 WM_CLOSE，正常退出，未强杀。
- 检查脚本改用无控制台、参数独立传递且能捕获 stdout / stderr 的 Process 启动器，30 秒门槛不变；随后直接普通入口原生检查通过。第一次观察超时的实际原因没有确定，不归因为应用、Playwright 或 Sidecar，也不把第一次记录为成功。期间一次重跑因已存在 Development 实例被安全预检拦截，没有启动第二实例或操作用户窗口。
- 快照保存和日志只读曾被沙箱拒绝，均只对具体命令申请单次沙箱外执行；没有修改权限、ACL、配置或绕过执行限制。

## 4. 性能与时钟口径

下表为本轮五次有效独立启动中位数，单位 ms。与上一轮五次成功样本的对照只说明这批观测；未控制操作系统冷缓存，不能推导因果。

| 指标 | 上一轮 | 本轮 |
| --- | ---: | ---: |
| 原生窗口可见（Electron uptime） | 331 | 318 |
| React Ready（Electron uptime） | 536 | 536 |
| Sidecar Ready（Electron uptime） | 469 | 482 |
| FCP（Renderer 导航基准） | 324 | 388 |
| 设置首次打开（采集进程单调耗时） | 399 | 400 |
| 设置再次打开（采集进程单调耗时） | 72 | 72 |

本轮窗口可见范围 309–345，Sidecar Ready 475–532，FCP 328–392，设置首次 398–418。没有证据证明设置性能改善，亦不能把小样本波动认定为整体性能回退；首次原生检查的观察超时单独保留，未并入成功性能样本。

集团填报首次 / 再次为 151 / 101。本轮静态表格先出现，采集脚本额外等待配置相关的日期控件可见后才结束首次计时，因此首次值与旧“只等待表格”的 136ms 不完全同口径，不能宣称退化或提速。

日志 `t` 使用 Electron 自身 uptime；FCP 保留 Renderer navigation performance origin；迁移各阶段使用 Sidecar Stopwatch 的 elapsedMs；交互使用采集进程 performance.now 的差值。脚本输出明确标注这些时钟，不把不同进程起点直接相减。

## 5. 剩余风险和人工验收

- 历史 Playwright 30 秒连接超时：已有原报告记载一次失败，诊断重试和后续正式样本成功；本轮五次测量未复现，仍无确定根因。
- 历史慢启动：诊断样本窗口 1842ms、React Ready 3976ms、Sidecar Ready 4005ms；历史 8.258 秒首条输出缺少阶段证据。保留原样，不能归因为迁移、Playwright、应用或 Sidecar。本轮首次原生检查的观察超时也单独保留。
- 启动失败的明确状态与结构化错误有单元 / 进程 fixture 和 React 覆盖；**真实启动失败后的重启恢复仍待现场验收**。真实 UI 的只读列表错误重试通过不等同于启动失败恢复通过。
- 上述未解决事项不抹去四项修复和本地验证证据，但限制“启动稳定性已完全验收”的结论。用户已明确授权本次 Git 交付，仍保留这些待验收事项，不宣称均已解决。
- 保留既有 npm audit 32 项、Vite 大块与 PRI249 警告；没有顺带升级依赖。未自动执行真实腾讯写入、调度或消息发送。

Git 交付已获明确授权；真实启动失败后的现场恢复仍保持待验收。**自动化通过不等于人工验收通过。**

## 6. 修复完成时的 Git 输出（本机路径脱敏）

以下状态包含用户前序未提交修改与本轮修复；没有暂存或提交。dist 中的旧哈希删除和新哈希增加是重建结果，旧不可变快照未删除。

### git status -sb

```text
## codex/electron-startup-lifecycle
 M .gitignore
 M README.md
 M STATUS.md
 M scripts/verify.ps1
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/AutomationPage-BZuU3DtR.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/DailyWeldPage-DQkFAlte.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/DatabaseViewerPage-BQPGcAsN.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/PlanPdfPage-CubUlAk0.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/ProductionMeetingPage-DC7uzgIg.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/ReportCenterPage-2k2qxvP7.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/SubmissionSettings-7oo5TLk1.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/calendar-Cw_ISzt7.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/circle-alert-DFpMzhl6.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/file-spreadsheet-CBEUnvZK.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/folder-open-D-NnL1pw.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/index-B63HHE1C.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/index-B83awzi5.css
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/triangle-alert-D9jY5AX0.js
 M src/ProductionAssistant.App/Assets/Prototype/dist/index.html
 M src/ProductionAssistant.App/Assets/Prototype/package.json
 M src/ProductionAssistant.App/Assets/Prototype/src/app/App.navigation.test.tsx
 M src/ProductionAssistant.App/Assets/Prototype/src/app/App.startup.test.tsx
 M src/ProductionAssistant.App/Assets/Prototype/src/app/App.test.tsx
 M src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx
 M src/ProductionAssistant.App/Assets/Prototype/src/bridge/index.test.ts
 M src/ProductionAssistant.App/Assets/Prototype/src/bridge/index.ts
 M src/ProductionAssistant.App/Assets/Prototype/src/bridge/webview.test.ts
 M src/ProductionAssistant.App/Assets/Prototype/src/bridge/webview.ts
 M src/ProductionAssistant.App/Assets/Prototype/src/components/layout/AppLayout.test.tsx
 M src/ProductionAssistant.App/Assets/Prototype/src/features/daily-report/AutomationPage.categories.test.tsx
 M src/ProductionAssistant.App/Assets/Prototype/src/features/group-submission/GroupSubmissionPage.test.tsx
 M src/ProductionAssistant.App/Assets/Prototype/src/features/group-submission/GroupSubmissionPage.tsx
 M src/ProductionAssistant.App/Assets/Prototype/src/features/group-submission/SubmissionSettings.tsx
 M src/ProductionAssistant.App/Assets/Prototype/src/features/group-submission/SubmissionWorkbench.tsx
 M src/ProductionAssistant.App/Assets/Prototype/vite.config.ts
 M src/ProductionAssistant.App/ProductionAssistant.csproj
 M src/ProductionAssistant.Bridge/OperationDispatcher.Automation.cs
 M src/ProductionAssistant.Bridge/OperationDispatcher.cs
 M src/ProductionAssistant.Bridge/StartupMigration.cs
 M src/ProductionAssistant.Desktop/lib/router.js
 M src/ProductionAssistant.Desktop/lib/sidecar-client.js
 M src/ProductionAssistant.Desktop/main.js
 M src/ProductionAssistant.Desktop/package.json
 M src/ProductionAssistant.Desktop/test/fixtures/fake-sidecar.js
 M src/ProductionAssistant.Desktop/test/main-theme.test.js
 M src/ProductionAssistant.Desktop/test/router.test.js
 M src/ProductionAssistant.Desktop/test/sidecar-client.test.js
 M src/ProductionAssistant.Infrastructure/Automation/AutomationTaskHandlerRegistry.cs
 M src/ProductionAssistant.Sidecar/Program.cs
 M src/ProductionAssistant.Sidecar/StdioHost.cs
 M tests/ProductionAssistant.Tests/AutomationTaskShellTests.cs
 M tests/ProductionAssistant.Tests/DailyReportLocalConfigurationTests.cs
 M tests/ProductionAssistant.Tests/SidecarLocalConfigurationTests.cs
 M tests/ProductionAssistant.Tests/StartupMigrationTests.cs
?? docs/electron-startup-acceptance-fixes.md
?? docs/electron-startup-architecture.md
?? docs/electron-startup-validation.md
?? scripts/check-electron-group-loading.cjs
?? scripts/check-electron-published-resources.cjs
?? scripts/check-electron-resource-lifecycle.cjs
?? scripts/check-electron-runtime-install.cjs
?? scripts/check-electron-startup-window.ps1
?? scripts/measure-electron-startup.cjs
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/AutomationPage-CTF3Q37L.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/DailyWeldPage-lt1nkLYf.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/DatabaseViewerPage-pBK_t8LZ.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/PlanPdfPage-CNPcjVxW.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/ProductionMeetingPage-Dn9R2ZPx.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/ReportCenterPage-DW04_LQ8.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/SubmissionSettings-DyGNQsYy.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/calendar-MidsVQZY.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/circle-alert-ddYFqZxG.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/file-spreadsheet-DiDlOiL5.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/folder-open-D7N4mssT.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/index-BLxKQmyq.css
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/index-gRZV53Ad.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/loader-circle-CviFs7m5.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/triangle-alert-CAGlWeKf.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/build-info.json
?? src/ProductionAssistant.App/Assets/Prototype/src/components/layout/LocalServiceBoundary.test.tsx
?? src/ProductionAssistant.App/Assets/Prototype/src/components/layout/LocalServiceBoundary.tsx
?? src/ProductionAssistant.App/Assets/Prototype/src/features/group-submission/GroupSubmissionPage.loading.test.tsx
?? src/ProductionAssistant.App/Assets/Prototype/src/features/group-submission/SubmissionSettingsLoading.tsx
?? src/ProductionAssistant.Desktop/lib/electron-runtime.js
?? src/ProductionAssistant.Desktop/lib/renderer-build.js
?? src/ProductionAssistant.Desktop/scripts/
?? src/ProductionAssistant.Desktop/test/electron-runtime.test.js
?? src/ProductionAssistant.Desktop/test/renderer-build.test.js
?? src/ProductionAssistant.Desktop/test/start.test.js
?? src/ProductionAssistant.Desktop/test/startup-measurement.test.js
?? src/ProductionAssistant.Sidecar/StartupTrace.cs
```

### git worktree list

```text
<repository>                       11461dc [codex/electron-startup-lifecycle]
<existing-hotfix-worktree>          ac9827c [codex/hotfix-frame-detached]
```

### git --no-pager branch

```text
* codex/electron-startup-lifecycle
+ codex/hotfix-frame-detached
  main
```
