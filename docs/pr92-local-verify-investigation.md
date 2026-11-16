# PR #92 本机 verify 失败调查与修复

日期：2026-11-16。基线 main / origin/main 为 `16e5141ecdf58d736cd9e1dd93161f7f7c46fab4`，本轮在 `codex/fix-react-test-lifecycle` 工作。完整验证通过后进入 Git 交付，合并以 CI verify 通过为前提；没有修改 Production、版本或稳定版，没有操作既存 hotfix 工作树。

## 1. 结论与证据边界

已定位并修复能产生原 18 项失败组合的测试生命周期缺口，修复后完整 verify 退出 0。结论来自原始日志、依赖与版本对比、受控失败对照及正常全量验证，不能用单独重跑通过替代。原现场没有逐阶段计时；模块等待触发路径获得精确同名组合对照的支持，不能把对照记录冒充原现场遥测。

原始 18 项是 **2 个首项超时，加 16 个后续状态错误**，并非 18 个独立超时。每个文件各自的初始化超时后，Vitest 2.1.9 仅让 Promise.race 返回失败，不取消原测试函数；迟到的模块导入和 async act 因而继续跨越测试边界。集团文件的旧 afterEach 在未退出的 act 内层返回，后续 root.render 并未提交；App 文件的迟到测试体在下一测试启动后继续创建及清理 root、使用已经变化的模块 mock，产生相同的 overlapping act 和未渲染断言错误。

受控实验分别复现了集团文件的全部 16 个失败名称、App 文件的原有 2 个失败名称及第二项通过的组合；合起来与原日志 **18/18 名称一致**。实验操纵的是模块交付时机，不是操作业务数据或真实进程环境。

**尚未唯一确定的部分：**原始现场为什么恰好在第一次合并后运行发生模块初始化延迟。原日志没有分阶段 CPU、内存、磁盘、文件句柄或导入开始/结束遥测；一次全新 npm ci、默认并发的自然诊断仍通过。不能据此声称当时一定是 CPU、分页、Windows 扫描、Playwright、Sidecar 或应用业务回归。本轮修复消除了已证实的测试作用域泄漏及其传播路径，不冒称还原了未记录的系统事件。

## 2. 原始 18 项与完整堆栈

原日志已全文读取并保留：[post-merge-92-verify.log](../artifacts/startup/post-merge-92-verify.log)。逐项提取见 [original-failures.json](../artifacts/startup/pr92-verify-investigation/original-failures.json)，包括每项测试名称、原日志行号和**原报告实际打印的完整错误、堆栈及代码框**。

A = `src/app/App.startup.test.tsx`；G = `src/features/group-submission/GroupSubmissionPage.test.tsx`，均位于 Prototype 下。原报告把两个首项超时放在同一个错误块，未打印这两项的调用栈；JSON 如实标记 `sourceStackPrinted: false`。不能把受控实验新产生的 Node 栈冒充原始现场栈。

| 序号 | 文件 | 测试名称 | 原错误 | 原日志行 |
| --- | --- | --- | --- | --- |
| 1 | A | enters group submission without an automation fallback while its list and configuration are pending | 5000ms 超时 | 182–185 |
| 2 | G | opens the business workbench with four empty metrics, backend date, and no runnable write actions | 5000ms 超时 | 182–185 |
| 3 | A | [nav-switch] keeps readiness stable while a delayed route module loads | h1 为 undefined | 188–204 |
| 4 | G | omits the document chooser with multiple connections and retains the original connection load | get 调用次数为 0 | 207–223 |
| 5 | G | loads history independently while configuration is pending | 按钮不存在，focus 抛错 | 226–238 |
| 6 | G | shows all settings sections without secondary navigation and retains the overview shortcut | 按钮不存在，focus 抛错 | 241–253 |
| 7 | G | saves the real document link with the revision and retains existing fields and position rules | 按钮不存在，focus 抛错 | 256–268 |
| 8 | G | keeps the saved notice after the parent URL update and clears it when the URL is edited again | 按钮不存在，focus 抛错 | 271–283 |
| 9 | G | keeps a draft across tabs without persisting or checking the unsaved target | 按钮不存在，focus 抛错 | 286–298 |
| 10 | G | does not overwrite the saved target on a rejected save and blocks duplicate submissions | 按钮不存在，focus 抛错 | 301–313 |
| 11 | G | creates one persisted connection without a generic task wizard and restores it on remount | 按钮不存在，focus 抛错 | 316–328 |
| 12 | G | retains a business created before the first document connection is saved | 按钮不存在，focus 抛错 | 331–343 |
| 13 | G | keeps the created identity when its first read fails, so retry cannot create another record | 按钮不存在，focus 抛错 | 346–358 |
| 14 | G | reads existing history and preserves uncertain outcomes and PascalCase stored snapshots | 按钮不存在，focus 抛错 | 361–373 |
| 15 | G | shows a history transport error without reporting an empty successful result and allows retry | 按钮不存在，focus 抛错 | 376–388 |
| 16 | G | blocks configuration changes on an enabled task and does not expose unsupported scheduler actions | 按钮不存在，focus 抛错 | 391–403 |
| 17 | G | rejects a mismatched configuration identity without starting its session and can retry | Alert 未渲染 | 406–415 |
| 18 | G | shows a list failure before offering creation and can reload without selecting another task type | Alert 未渲染 | 418–427 |

其余错误共 12 个 missing-button / focus、1 个零调用、2 个缺失 Alert 和 1 个缺失 h1。后续多数失败只耗时 1–8ms，和首项超过 5000ms 的情形不同。原日志同时保留 overlapping act 警告。

## 3. setup、异步资源与传播链

### 集团文件

- beforeEach 创建新 container / root，重置 invoke、任务、配置和历史，设置 IS_REACT_ACT_ENVIRONMENT；列表、get、runs 的普通 mock 立即返回 Promise。
- 首项先完成概览断言，再点击设置，触发真实 SubmissionSettings 懒加载，然后在 async act 中等待 vi.dynamicImportSettled。
- 原 afterEach 同样调用 act(root.unmount)，但没有等待上一项外层 act 结束，也没有 finally 保护全局变量恢复。Vitest 超时后，旧的导入 Promise 仍未结束，这个清理落在旧 act 的内层，返回并不代表提交了卸载。
- 受控记录：首项卸载返回时 actQueue 仍存在，长度为 3；第二项 mount 返回时队列为 5，第十六项达到 61。因此第二项 get 未调用，后续按钮 / Alert 不存在。
- 模拟配置等待是测试自身 Promise，不是 Sidecar Ready、Teable 或腾讯请求。原代码已有 useEffect 的 active 清理；本轮没有发现业务轮询或真实浏览器进程参与这两个首项。

### App 文件

- 原先每个测试在计时体内 resetModules、注册 mock 并 await import('./App')，之后才建立 root 和 finally。
- 首项在导入阶段超时后，导入和测试函数没有被取消；第二项已重新注册 mock 时，旧体仍可开始渲染、监听和卸载。
- 对照精确复现：首项超时，第二项通过，第三项 h1 为 undefined，并出现原样 overlapping act 警告。状态污染发生在同一文件的 React 实例内。
- 初始配置 Promise 和模拟 DailyWeld 模块都是测试持有的异步资源。修复在 finally 结算测试持有的延迟交付，确保 root、MutationObserver、宿主属性和全局标志能够收尾。
- 两个文件默认运行在隔离 fork；没有证据说明它们共享同一个初始化 Promise。共同失败条件是相同的“计时测试体内装载模块 + 超时不取消 + 异步作用域未退出”模式。

Vitest 的 withTimeout 实现位于已安装 @vitest/runner/dist/index.js:32–46，使用 Promise.race；后续 runTest 继续 afterEach。React 的 act / popActScope 实现说明未退出的外层队列仍被内层作用域复用。探针仅用这些私有状态做诊断，修复与新增回归不依赖 React 私有 API。

没有观测到需要清理用户进程、文件或系统句柄的确定证据。正常诊断中相关 worker 只记录到标准 PipeWrap 及测试定时器，卸载后 act 队列为空。不能由此追溯证明原现场没有任何系统资源竞争。

## 4. CI 与本机对比

CI 原始出处：[verify job](https://github.com/Janonez/ProductionAssistant/actions/runs/43792810538/job/133054856354)。保存的关键原文见 [CI 环境摘录](../artifacts/startup/pr92-verify-investigation/ci-environment-excerpt.log)。

| 项目 | CI | 本机 |
| --- | --- | --- |
| 关联提交 | run head_sha = 0052017dde184b1fc983055f6d5f931fd92d9be4 | main = 16e5141ecdf58d736cd9e1dd93161f7f7c46fab4 |
| 实际检出 | PR 合并测试提交 4ea10a82759e9766fc534de71e60b2f45d6453ca，把 0052017 合到 11461dc | Squash 后 main；git diff 0052017 16e5141 退出 0 |
| Node / npm | v22.23.4 / 10.9.9 | v22.23.4 / 10.9.9 |
| Windows | Server 2025，build 26100 | build 22621，x64 |
| PowerShell | PowerShell 7 路径；日志未打印具体 patch 版本 | 7.6.10 |
| CI 变量 | true | 未设置 |
| Vitest / 配置 | 2.1.9，同一 vitest.config.ts、test-setup.ts | 2.1.9，配置文件未修改 |
| pool / 隔离 / 文件并发 | forks / true / true；CI 日志未记录实际 CPU 或 fork 数，不能追溯确认精确数量 | 12 个可用逻辑 CPU，默认上限 11 forks；未设置 worker 覆盖变量 |
| test / hook timeout | 项目没有覆盖；Vitest 默认 5000 / 10000ms | 原值 5000 / 10000ms，本轮没有修改 |
| 依赖 | 同一锁文件，npm ci，427 包；日志确认 Vitest 版本 | 实际 427 包版本及 integrity 元数据与锁文件一致，0 差异 |
| 核心依赖 | 由同一锁文件固定；CI 没有逐包清单，不能冒称有远程文件哈希核验 | React / ReactDOM 19.2.8，Vite 6.4.3，jsdom 25.0.1 |
| 结果 | 446 通过，具备符号链接创建权限 | 原始 427 通过 / 18 失败 / 1 EPERM 既有跳过 |

依赖核对见 [dependency-check.json](../artifacts/startup/pr92-verify-investigation/dependency-check.json)。CLI run 已明确禁用 watch，不能简单把 CI=true 当作本机必然改变 worker 数的原因。原 verify 只给 React 增加腾讯资产包 NODE_PATH；全新依赖诊断复用了该值，并仍通过。

原本机失败日志的 collect 合计 86.74s、environment 合计 161.73s；CI 对应 20.19s / 49.13s。这些是并发文件合计，并非单个首项耗时。它们说明两批执行条件不同，但不足以唯一证明 CPU、内存或磁盘是初始延迟来源。调查时观察到的内存和其他 Node 进程也不能冒充原始现场遥测；本轮没有结束任何应用或其他任务进程。

### 是否是 PR #92 引入的回归

Squash 前后文件树一致；11461dc 的测试已经存在 act 内等待动态导入、计时体内导入 App 和无 finally 保护的相关模式，抽取证据保存在证据目录的 pre-pr92 文件。**没有证据认定为 #92 运行逻辑回归；已证实的是此前存在、在这次本机运行暴露的测试初始化 / 生命周期缺口。**也不能证明 #92 的模块变化绝不影响载入成本；该影响没有单独测量。

## 5. 修改范围与验证

仅改测试及测试辅助代码：

1. GroupSubmissionPage.test.tsx：集成用例在收集阶段装载真实设置模块；懒加载边界仍由未修改的 loading 专项控制。动态导入等待移到 act 外；卸载验证提交完成，并用 finally 恢复全局环境。
2. App.startup.test.tsx：每项的 App、路由模块和 mock registry 初始化放入 beforeEach，保留每项独立 reset；行为测试仍使用原 5000ms。原有 hook 的 10000ms 没有修改，超过准备阶段期限仍失败。finally 释放测试拥有的延迟结果并清理 DOM / Observer / 宿主属性。
3. 新增 src/test-utils/settle-module-imports.ts：在 act 外等待模块；onTestFinished 阻止迟到结果再次进入 React 刷新或后续断言，然后只用短 act 刷新已完成的 UI 工作。
4. 新增对应回归：模块尚未交付时，另一次 root 更新必须实际呈现。finally 总会交付探针 Promise 并卸载。

没有改全局超时、并发配置、应用或 Electron 源码、依赖版本，也没有增加 sleep、固定延时、产品预取、缓存或新的状态框架。原有业务与加载断言保留。App 准备阶段并非把行为测试简单改成 10 秒；受控的初始化超过既有 hook 期限时仍会失败，但不会渲染迟到 root 或污染下一项。

[mechanism-comparison.json](../artifacts/startup/pr92-verify-investigation/mechanism-comparison.json) 包含原始与修复后的阶段、act 队列及测试结果。

| 有界执行 / 命令 | 退出码 | 结果 |
| --- | ---: | --- |
| npm test -- src/features/group-submission/GroupSubmissionPage.test.tsx | 0 | 修复前 16/16；首项 1711ms；整次 8.17s |
| npm test -- src/app/App.startup.test.tsx | 0 | 修复前 3/3；整次 2.36s |
| 两文件 -t "opens the business workbench\|enters group submission" | 0 | 修复前 2 通过、17 因筛选跳过 |
| 两文件全量组合 | 0 | 修复前 19/19 |
| npm test（修复前默认并发） | 0 | 445 通过、1 既有跳过；17.90s，不视为已解决 |
| 临时探针：旧集团设置模块门闩 | 1（预期） | 0 通过、16 失败；全部名称与原集团失败一致 |
| npm ci 后默认并发阶段探针，复用 NODE_PATH | 0 | 修复前 445 通过、1 既有跳过；记录导入及资源状态，不视为已解决 |
| 两文件组合（初步修复） | 0 | 19/19 |
| 两文件 + 原 loading 专项 + 新回归 | 0 | 21/21 |
| --negative-act：只在临时转换中换回旧等待方式 | 1（预期） | 新回归失败：初始界面不等于独立更新已呈现 |
| --hold-settings：修复版、临时去掉收集预载 | 1（预期） | 首项仍按 5000ms 失败，其余 15 项通过，卸载 actQueue 为空 |
| npm test（修复后默认并发） | 0 | 47 文件；446 通过、1 既有跳过；15.24s |
| --baseline --hold-app：仅虚拟读取 main 旧测试，延迟 App | 1（预期） | 首项超时、第二项通过、第三项缺 h1，且有 overlapping act |
| --hold-app：修复版 App 初始化门闩 | 1（预期） | 1 个准备钩子失败、其余 2 项通过，actQueue 为空 |
| 完整 pwsh -NoProfile -File scripts/verify.ps1 | 0 | 全量还原、React 446 / 1 跳过、TS / Vite / 浏览器、Electron 122/122、.NET 372/372、构建和 Development 发布通过 |

前四类 npm 命令均通过 `npm.cmd --prefix src/ProductionAssistant.App/Assets/Prototype test -- ...` 执行；探针命令为 `node <TEMP>/metis-pr92-0e6790f37b284cf0b74d3992f52f1a4c/trace-vitest.mjs <Prototype绝对路径> <所列参数>`。完整验收命令使用 Tee-Object 保存日志，不带 SkipRestore / SyncRelease。

初始门闩探针释放条件过晚，自然结束约 60 秒；随后改为按失败进度释放并加 30 / 90 秒诊断总上限。身份核对发现当时已无该进程，未执行停止。控制对照的预期失败不是正常验收失败，不计作通过，也没有通过无限重复寻找一次成功。

完整验收日志：[pr92-lifecycle-fix-verify.log](../artifacts/startup/pr92-lifecycle-fix-verify.log)。Development 源码 / 快照 / 发布目录的 125 文件一致，缺失 / 差异 / 多余均 0，Build ID 为 `e6604b40-e3c5-44cc-b9ef-35f20a845cf9`。既有 npm audit、Vite 大块和 PRI249 提示没有顺带处理。

## 6. 交接与剩余风险

- 首次模块变慢的具体 OS 诱因仍不确定；没有原现场的资源遥测，不能把这一点写成已定位。
- 模块交付真正失败或超过准备期限仍应使测试失败；本轮不隐藏这些错误。
- 运行源码和 Vitest 配置未改；verify 按既有规则生成了新 Build ID 与 JS 产物名称，dist 有实质差异，已按项目规则报告并保留，没有自行还原或删除。
- 原有 STATUS.md 未提交内容已经独立备份，原 SHA256 为 `D5C4CB559A29D41B03272E394EFDB84C9E46EF605A2B2139F98DAAC28CC11ABA`；本轮只在前面增加调查交接，不删除旧记录。
- 用户已要求继续交付并合并分支；测试修复、调查报告和已验证的构建产物一起进入 PR。CI verify 未完成时等待交接，成功后按 squash 合并并执行合并后验证。

## 7. 修复完成、进入交付前的 Git 状态快照

修复验证结束时的原始命令输出附于下方，记录交付前状态；构建差异与测试修复分开列明，不视为运行源码修改。提交及合并后的实时状态以交付报告为准。

```text
> git status -sb
## codex/fix-react-test-lifecycle
 M STATUS.md
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/AutomationPage-CTF3Q37L.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/DailyWeldPage-lt1nkLYf.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/DatabaseViewerPage-pBK_t8LZ.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/PlanPdfPage-CNPcjVxW.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/ProductionMeetingPage-Dn9R2ZPx.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/ReportCenterPage-DW04_LQ8.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/SubmissionSettings-DyGNQsYy.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/calendar-MidsVQZY.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/circle-alert-ddYFqZxG.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/file-spreadsheet-DiDlOiL5.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/folder-open-D7N4mssT.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/index-gRZV53Ad.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/loader-circle-CviFs7m5.js
 D src/ProductionAssistant.App/Assets/Prototype/dist/assets/triangle-alert-CAGlWeKf.js
 M src/ProductionAssistant.App/Assets/Prototype/dist/build-info.json
 M src/ProductionAssistant.App/Assets/Prototype/dist/index.html
 M src/ProductionAssistant.App/Assets/Prototype/src/app/App.startup.test.tsx
 M src/ProductionAssistant.App/Assets/Prototype/src/features/group-submission/GroupSubmissionPage.test.tsx
?? docs/pr92-local-verify-investigation.md
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/AutomationPage-Bz8s7vMs.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/DailyWeldPage-B61Up2Xn.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/DatabaseViewerPage-Dk8j-GeE.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/PlanPdfPage-C9PE_gVt.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/ProductionMeetingPage-DUkLEJxo.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/ReportCenterPage-BaO-AikR.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/SubmissionSettings-CRDuP4Hy.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/calendar-n5QC6TUC.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/circle-alert-C-upMpeg.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/file-spreadsheet-KVUNLQOh.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/folder-open-B8FboFlI.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/index-CdGmWer3.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/loader-circle-I0TZIXSG.js
?? src/ProductionAssistant.App/Assets/Prototype/dist/assets/triangle-alert-DDKDJ9Pr.js
?? src/ProductionAssistant.App/Assets/Prototype/src/test-utils/

> git worktree list（本机路径脱敏）
<repository>                       16e5141 [codex/fix-react-test-lifecycle]
<existing-hotfix-worktree> ac9827c [codex/hotfix-frame-detached]

> git --no-pager branch
* codex/fix-react-test-lifecycle
+ codex/hotfix-frame-detached
  main
```
