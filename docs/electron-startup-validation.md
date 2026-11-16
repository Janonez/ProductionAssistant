# Electron Development 启动架构整改交付报告

历史阶段报告：以下保留首次实现后的验证记录；人工验收随后指出的四项问题及修复结果见 [验收修复报告](electron-startup-acceptance-fixes.md)，当前 Git 交付状态以 STATUS.md 为准。

日期：2026-11-16。分支：`codex/electron-startup-lifecycle`，基线：`11461dc`。本轮实现及本地完整 verify 已完成，保留全部未提交改动，等待用户审阅。没有提交、推送、PR、合并、版本更新、Production 更新、标签或 Release。

## 1. 架构整改结果

| 模块 | 结果 |
| --- | --- |
| Electron Runtime | `npm ci --ignore-scripts` 后显式执行 `prepare:electron-runtime`。使用原样的官方 install.js / ZIP 校验 / 缓存。正常 start 只检查版本、path.txt 和必需文件，然后直接启动已检查的二进制；缺失时退出并显示恢复命令。 |
| Main 生命周期 | 启动 ID、Electron / Sidecar PID、运行环境、Build ID 和资源来源可关联；保持窗口立即显示和原安全选项。单实例持锁后才创建 Sidecar。 |
| Sidecar | 明确 Starting、Initializing、Ready、Failed、Stopping、Stopped 状态；后端环境、串行迁移和 StdioHost 构造完成后发送协议版本 1 的 Ready，首条任意输出不再代表 Ready。 |
| 迁移 | 环境、启动摘要、锁等待、日报迁移、报表中心迁移、StdioHost 分别使用单调时钟计时。交互式 Sidecar 锁超时 / 迁移失败时拒绝 Ready；原计划任务入口保留既有迁移语义。 |
| Bridge | 请求按 ID 关联，Ready 前有界排队（最多 256 项），超时从接收时计。启动超时 20 秒；退出、通信失败和关闭超时产生结构化错误。在途超时明确结果未知，不自动重发或重启。 |
| 集团填报 | `automation.list` 新增可选 `taskType`；省略保持原行为及类型列表。指定腾讯类型只读取该 Handler。保留 list → 任务 ID → get 顺序；历史只依赖已取得的 ID，不受配置读取等待阻塞。 |
| React | 外壳独立呈现，区分本地服务初始化、业务读取和失败；复用 Skeleton / Alert / Button，失败可明确发起应用重启。设置保持 lazy、局部 Skeleton；历史、来源和登录状态保持各自读取边界。 |
| 资源代次 | 每次 Vite 构建生成 UUID Build ID，入口和 build-info.json 一致。完整清单及 SHA256 校验后发布到不可变目录，原子切换 current.json。一个 Electron 进程固定使用一个根目录，含重载及延迟 Chunk。 |
| 实例识别 | 同 Build ID 二次启动聚焦；不同 Build ID 提示旧构建，用户选择后才关闭，随后重新启动。早期宿主缺少可确认身份时，新启动明确说明本次没有加载新构建。 |

状态权威是 SidecarClient，React 订阅其快照。Renderer 身份不匹配单独拒绝业务访问并显示明确错误，不伪造 Sidecar 状态。架构设计、方案 A/B 对比及官方机制依据见 [启动架构](electron-startup-architecture.md)。没有新增框架或依赖。

## 2. 实际性能

下表取五次成功正式样本的中位数，单位 ms。括号为整改后范围。整改前于 11 月 13 日采集，最终发布后于 11 月 16 日采集；样本和系统缓存条件有限，不能据此宣称因果性、整体提速或冷机性能已改善。

| 指标 | 整改前 | 整改后 |
| --- | ---: | ---: |
| Electron 窗口可见 | 未测量 | 331（320–358） |
| React 首次绘制（FCP） | 未形成五次基线；仅 1 条有效值 1204 | 324（296–436） |
| Sidecar 正式 Ready | 未测量 | 469（463–502） |
| 集团填报首次内容呈现 | 179 | 136（134–151） |
| 设置首次打开 | 400 | 399（384–416） |
| 窗口创建（可比较的旧指标） | 283 | 331（320–358） |
| React Ready（不同于绘制） | 500 | 536（526–628） |
| 集团填报再次进入 | 103 | 101（91–110） |
| 设置再次打开 | 58 | 72（55–73） |

窗口 / React Ready / Sidecar 时刻相对 Electron 进程单调时钟；FCP 相对 Renderer 导航；业务和设置相对自动化点击开始，包含自动化往返及两帧呈现确认。窗口可见取原生 isVisible / show 观察，不等同于业务已经绘制。整改前缺失指标不以首条输出或窗口创建冒充。

结论：正式样本中集团填报首次进入更短，设置首次基本不变；窗口创建和 React Ready 中位数没有优于本轮基线，不能宣称整体启动已经更快。主要完成的是显式 Runtime 准备、可靠就绪边界、可诊断阶段和资源代次隔离。

### 发布后的异常与诊断样本

- 第一次正式测量尝试出现 Playwright `TimeoutError: Timeout 30000ms exceeded`，在驱动控制层终止，没有产生完整样本；未确认是应用启动还是调试连接原因，没有提高超时或改环境绕过。
- 同一发布资源开启 `pw:browser` 的单样本诊断重试成功：窗口可见 1842ms、React Ready 3976ms、Sidecar 首条输出 3783ms、Ready 4005ms。迁移 200.86ms、锁等待 0.11ms；不能将这一慢样本归因于迁移锁，也不能拿它与没有正式 Ready 的历史 8.258 秒首条输出直接比较。
- 随后关闭调试日志的五次正式测量全部成功。该成功不抹去前一次失败；首次连接超时原因仍未确定。
- 五次正式样本均启动了不同 Sidecar PID；首次进程启动与连续启动已标注。相同进程内再次进入业务作为热访问记录。没有清空操作系统缓存或冒称已控制真正冷机条件，也没有实现跨 Electron 进程复用 Sidecar。

### 五次正式样本的初始化阶段

| 阶段 | 中位数 ms |
| --- | ---: |
| 环境初始化 | 5.45 |
| 启动摘要 | 6.71 |
| 迁移锁等待 | 0.10 |
| 日报迁移 | 36.57 |
| 报表中心迁移 | 12.63 |
| 整体迁移 | 52.58 |
| StdioHost 构造 | 0.47 |

原始证据保存在本机忽略目录：

- [整改前五次](../artifacts/startup/before.json)、[最终 Development 五次](../artifacts/startup/after.json)。
- [无预取五次](../artifacts/startup/without-prefetch.json)、[预取实验五次](../artifacts/startup/with-prefetch.json)：首次设置中位数 383 → 400ms，未见收益，已移除预取。
- [诊断重试样本](../artifacts/startup/diagnostic.json)、[最终页面截图](../artifacts/startup/after-group.png)。

## 3. 验证结果

| 检查 | 最终结果 |
| --- | --- |
| Runtime fixture | 5 项通过，包含缺失、完整、版本不匹配、安装器失败、幂等及安全路径；计入 Electron 总数。 |
| 官方 Runtime 实际恢复 | 隔离目录恢复、重复准备、与真实 Runtime 逐文件 SHA256 对比 3 项通过；未删除真实 Runtime。 |
| Electron / Node 全量 | 106/106 通过。包括生命周期、延迟 Ready、失败、协议版本、并发、排队过期、在途超时、关闭期限、资源发布和原安全边界。 |
| React 全量 | 45 文件，444 通过 / 1 既有符号链接权限跳过 / 0 失败。 |
| TypeScript / 字体 lint / Vite | 通过。 |
| 浏览器回归 | 集团填报、历史、设置、响应式、原录制 / 教学 / 填报契约均通过；使用本地 fixture，不代表真实写入验收。 |
| .NET 全量 | 372/372 通过。涵盖迁移竞争 / 失败恢复、类型过滤、Sidecar 及日报原有业务断言。 |
| 真实 Electron 资源生命周期 | 5 项通过：正常启动入口的同版本聚焦、异版本提示、旧实例运行中重建、旧设置 Chunk 延迟加载、重启到新代次。 |
| 完整 verify | `pwsh -NoProfile -File .\scripts\verify.ps1` 最终退出 0，不带 SkipRestore / SyncRelease，包含完整依赖还原及 Development 发布。 |
| 发布资源 | 源码 dist、源码不可变快照、Development 兼容目录及不可变快照的 125 文件全部 SHA256 一致；缺失 / 差异 / 多余均 0。Runtime 45.0.0 预检通过。 |
| 新增日志 | 只记录阶段、状态、ID、操作、耗时、错误代码 / 类型和资源文件名；不记录请求 payload、业务响应、URL、凭据或 Cookie。常见密钥格式扫描未命中。 |

最终 Build ID：`46ccdac2-86af-49a6-b209-f83079a2fc20`。Runtime 在完整 verify 的 npm ci 之后由显式准备步骤恢复，发布后实际窗口测量已完成。

第一轮完整 verify 在日报测试夹具遇到 Ready 消息无 id 后重复超时，记录到三项失败并用正常中断结束；已修正内存 / 子进程两种测试消费者，保留原业务断言，独立 .NET 372 项及第二轮完整 verify 均通过。不将第一轮记作通过。

## 4. 旧 UI 来源核对

| 来源 | 证据与边界 |
| --- | --- |
| 旧 Electron 实例 | 实际同 / 异 Build ID 二次启动验证；不会静默把旧窗口称作新构建。 |
| 旧任务详情 | 任务清单 / 旧详情与集团填报是不同路由消费者，保留兼容。React 进入集团填报的闪现检测和浏览器新旧契约回归通过，不把不同页面当作自动切换。 |
| spikes 原型 | 正式 main 默认解析源码构建，不含 spikes 回退；未启动独立 spikes 原型。 |
| 环境覆盖 | 记录资源来源类别；任意显式 dist 也必须准备独立快照。跨目录隔离专项通过，最终用实际 Development 发布目录测量。 |
| 运行中重建 | 真实 Electron 旧窗口在新构建发布后仍能首次打开旧代次设置 Chunk，入口和后续资源固定根目录。 |

没有把这些现象归因于浏览器缓存。二次启动测试出现 Chromium 缓存占用警告，断言仍通过；未更改 ACL、用户配置或关闭沙箱以处理警告。

## 5. 文件变更

| 分类 | 文件 / 内容 |
| --- | --- |
| Electron | `src/ProductionAssistant.Desktop/main.js`；`lib/sidecar-client.js`、`router.js`、新增 `electron-runtime.js` / `renderer-build.js`；新增 `scripts/start.js`、`prepare-electron-runtime.js`、`prepare-renderer.js`；Desktop package.json。 |
| Sidecar / 迁移 | Sidecar `Program.cs`、`StdioHost.cs`、新增 `StartupTrace.cs`；Bridge `StartupMigration.cs`。 |
| Bridge / 数据读取 | Bridge `OperationDispatcher.cs` / `.Automation.cs`；Infrastructure `AutomationTaskHandlerRegistry.cs`；前端 `bridge/index.ts` / `webview.ts`。 |
| React | `App.tsx`、新增 `LocalServiceBoundary.tsx`、`GroupSubmissionPage.tsx`。按既有组件组合，不新增通用视觉体系。 |
| 构建 / 文档 | `vite.config.ts`、Prototype package.json、App csproj、`verify.ps1`、`.gitignore`、README、STATUS、两份启动文档；dist 本轮生成的 Build ID 和资源。 |
| Electron 测试 | runtime / renderer-build 新专项、sidecar-client / main-theme / router 及 fake-sidecar 夹具。 |
| React 测试 | 新服务边界专项；集团填报 / Bridge 测试；App / 导航 / 分类 / 外壳的服务状态夹具兼容。 |
| .NET 测试 | `AutomationTaskShellTests.cs`、`StartupMigrationTests.cs`、`SidecarLocalConfigurationTests.cs`、`DailyReportLocalConfigurationTests.cs`。 |
| 实际检查脚本 | `check-electron-runtime-install.cjs`、`check-electron-resource-lifecycle.cjs`、`measure-electron-startup.cjs`、`check-electron-published-resources.cjs`。 |

依赖版本及版本号未修改。dist 的旧哈希文件被本轮 Vite 构建替换属于预期前端产物更新；保留全部旧不可变构建目录，不清理其他工作树、分支或用户材料。

## 6. 剩余问题与审阅入口

- 首次发布后 Playwright 连接超时原因未定；诊断重试与后续五次均成功。保留为真实限制，后续需在复现时关联启动 ID 和各阶段调查。
- 历史 8.258 秒样本没有新阶段日志，未证明其根因；不能宣称整体冷启动已经改善。设置首次打开也没有明显改善。
- 旧不可变构建本轮保留，没有自动清理；清理须先确认不再被运行实例使用，并遵守删除审批规则。
- 保留现有 npm audit（32 项）、Vite 大块及 PRI249 提示；本轮没有顺带升级依赖或修复无关告警。
- 本轮实际 Electron 检查只导航和读取，没有执行真实腾讯文档写入、调度或消息发送，也没有新增真实外站登录人工验收。自动化通过不等于用户人工视觉验收或生产写入验收。

审阅可运行：`npm.cmd --prefix src\ProductionAssistant.Desktop start -- --environment Development`。默认使用源码准备好的同一 Build ID；需要明确使用发布目录时仅给本次进程设置 `PRODUCTIONASSISTANT_DIST` 指向 `deployments/development/Assets/Prototype`。

Git 状态原始输出见本文后续附录。全部改动保持未提交，等待用户审阅后再安排 Git 交付。


## 7. Git 状态原始输出

### `git status -sb`

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
?? docs/electron-startup-architecture.md
?? docs/electron-startup-validation.md
?? scripts/check-electron-published-resources.cjs
?? scripts/check-electron-resource-lifecycle.cjs
?? scripts/check-electron-runtime-install.cjs
?? scripts/measure-electron-startup.cjs
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/AutomationPage-DkUQmNUj.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/DailyWeldPage-CZSgOyRC.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/DatabaseViewerPage-DwZ2Y-kp.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/PlanPdfPage-B_sw5R0o.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/ProductionMeetingPage-Bt8r6IXl.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/ReportCenterPage-CnxrUNhL.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/SubmissionSettings-Cr7aGHAt.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/calendar-Cf05DzCe.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/circle-alert-BurgR-nM.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/file-spreadsheet-qvqp4nAo.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/folder-open-cx3P7tCe.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/index-DHdCLb8S.css
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/index-DOfxJVZ2.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/loader-circle-Ce50RicL.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/triangle-alert-BtNcAimI.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/build-info.json
?? src/ProductionAssistant.App/Assets/Prototype/src/components/layout/LocalServiceBoundary.test.tsx
?? src/ProductionAssistant.App/Assets/Prototype/src/components/layout/LocalServiceBoundary.tsx
?? src/ProductionAssistant.Desktop/lib/electron-runtime.js
?? src/ProductionAssistant.Desktop/lib/renderer-build.js
?? src/ProductionAssistant.Desktop/scripts/
?? src/ProductionAssistant.Desktop/test/electron-runtime.test.js
?? src/ProductionAssistant.Desktop/test/renderer-build.test.js
?? src/ProductionAssistant.Sidecar/StartupTrace.cs
```

### `git worktree list`（本机路径脱敏）

```text
<repository>                       11461dc [codex/electron-startup-lifecycle]
<existing-hotfix-worktree>          ac9827c [codex/hotfix-frame-detached]
```

### `git --no-pager branch`

```text
* codex/electron-startup-lifecycle
+ codex/hotfix-frame-detached
  main
```
