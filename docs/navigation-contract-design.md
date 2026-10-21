# 导航契约设计

日期：2026-10-15。状态：设计已评审；兼容段已实施（#43–#49）；切换段已实现并通过真实桌面验收（分支 codex/nav-switch，待合并，见 5.2.1）；删除段未实施。更新于 2026-10-20。

源码基线：`285476f`。本轮在用户预建的 `codex/nav-contract-design` 分支抽查，HEAD 与基线一致；开始时工作区干净。本文路径均相对仓库根目录，行号对应该基线，不是后续重构后的永久定位。现有文档的本地行号另列于第 8 节。兼容段完成后 main 为 `7b4ad16`；第 3 节事实依据与行号仍对应设计基线 `285476f`，其中新增的兼容段状态说明另行标注。兼容段涉及的前端文件已变化，切换段开工前必须重新核对。

本文仅记录设计与后续改动边界。本轮只新增本文档，不修改现有文档、代码、测试、依赖或构建产物，不提交或发布。下文“必须”指后续实现的验收约束，不表示已经获得执行后续 PR 的授权。2026-10-20 更新：切换段实现后同步状态、协议说明与验收结论，新增 5.2.1，设计正文其余部分保持不变。

## 实施进度（兼容段截至 7b4ad16；切换段截至分支 codex/nav-switch，基于 673b441）

下表前端文件路径均相对 `src/ProductionAssistant.App/Assets/Prototype/src`；现状按 `7b4ad16` 核对，不替换下文设计基线的行号引用。切换段行按分支 codex/nav-switch 核对。

| 阶段/项目 | 状态 | 对应 PR 与文件/现状 |
|---|---|---|
| 兼容段：路由表集中 | 已完成 | #43；`routes/routeTable.ts` 集中七标签、默认值和侧栏元数据，`routes/index.ts` 使用集中规则 |
| 兼容段：导航入口集中 | 已完成 | #44；`routes/navigation.ts` 提供统一入口，`app/App.tsx` 委托该入口，仍调用 app.navigateNative |
| 兼容段：测试契约拆分与补测 | 已完成 | #45–#48；`app/App.navigation.test.tsx`、`routes/hostRoute.contract.test.ts`、`components/layout/OperationSidebar.test.tsx`、`bridge/webview.test.ts`、`bridge/index.test.ts`、`bridge/mock.test.tsx`、`app/App.database-preview.business.test.tsx` 分担导航、解析、侧栏、transport、mock 与集成契约；#48 补测旧前缀宿主契约 |
| 兼容段：旧前缀归一 | 已完成 | #49；`routes/index.ts` 返回 `{ route, navigation, displayRoute }`，`app/App.tsx` 保留原始 route/navigation 握手并按 displayRoute 展示；已移除前端原生占位分支与 settings-over-native 逻辑；仅有自动化测试验证，真实桌面未验证 |
| 切换段 | 已实现并通过测试版桌面验收，待合并（分支 codex/nav-switch，基于 673b441） | 前端 `routes/navigation.ts` 导出 `subscribeRoute` 与 `navigateInDocument`，`resolveHostRoute` 只返回 `{ route, navigation }`，ready 在 `bridge/index.ts` 幂等；协议白名单 83 变 82，新增 `IsCurrentLoad` 与 `BuildDocumentUrl`；`PrototypePage` 改为整文档加载与代次校验，`MainWindow` 去掉 `_currentTag` 与 `NavigateTo`；dist 已重建；详见 5.2.1 |
| 删除段 | 未开始 | #49 已先移除前端占位逻辑；CSS 残留及 `app/App.tsx` 的 settings.close 调用仍在；`src/ProductionAssistant.App/MainWindow.xaml.cs` 的层级切换、`src/ProductionAssistant.App/PrototypeBridge.Settings.cs` 的设置层级操作、C# settings.close 操作，以及 `src/ProductionAssistant.App/Pages/ProductionMessagePage.xaml.cs` 的 AutoMap/MappingAliases 仍在 |

兼容段各行描述的是 #43–#49 合并时的状态，其中 app.navigateNative 委托与 displayRoute 已由切换段取消（见切换段行与 5.2.1）。删除段行中，MainWindow.xaml.cs 的 NavigateTo 及其对 ContentFrame、PlanPdfExportPage 的引用已在切换段删除；MainWindow.xaml 中的 ContentFrame 与 PlanPdfExportPage 文件本身仍在，留给删除段。

登记项：

- CSS 死样式清理另开小 PR：`settings-modal.css` 第 1–7 行是完整的旧原生覆盖/透明背景规则（第 1–5 行为选择器，第 6 行为透明背景声明，第 7 行闭合）；第 9 行开始的 `.settings-overlay` 规则仍在使用。`operation-sidebar.css:72,76,83` 确为旧选择器，其中第 76 行仅移除旧选择器，保留第 77–81 行的共享规则；`app/App.test.tsx:437` 仍断言 native-content-slot 不存在。
- `bridge/mock.test.tsx` 尚未改名，登记后续改名为 `bridge/mock.test.ts`。
- `useHostRoute` / `resolveHostRoute` 的命名仍体现旧宿主所有权，切换段合并后单独做纯改名小 PR。
- `navigateInDocument` 用相对地址 `?…` 写 `replaceState`，会丢 `#` 片段；宿主地址从无片段，目前不影响。
- `PrototypeBridgeProtocol` 里 `DocumentUrl` 常量与 `IsTrustedPrototypeSource` 的 host、路径字面量是两份，目前由测试钉住，删除段之后收敛。
- URL 参数名 `navigation`（现在标识文档加载代次）改名登记到 Electron 阶段。
- 前端“Vite 内存构建与 mock 标记检查”没有持久脚本（package.json、前端 scripts 目录与 scripts/verify.ps1 中均无对应入口），建议做成正式脚本并纳入 verify。
- `favicon.ico` 的 ERR_FILE_NOT_FOUND 控制台报错无害，低优先级。
- 切换段之前提交信息中 (#49) 出现两次，仅外观，不处理。

## 1. 目标与非目标

### 1.1 目标

- 切换段之后，前端独占业务路由，前端路由状态是唯一真相来源；URL 是该状态的可重载表示，由同一前端导航入口维护。
- 宿主当前为 C# WinUI + WebView2，将来为 Electron；宿主只装载文档、确认文档启动并提供受控原生能力，不保存第二份当前业务路由，不按业务标签选择页面。
- 迁移按“兼容 → 切换 → 删除”推进。每个 PR 只完成一个可独立验收、回退的目的；前端接管 URL 和宿主退出每页握手属于同一个不可拆开的切换目的。
- 七个现有路由标签继续有效，特别是 `daily-report`；目录改名不改变路由身份。
- 同一个交付包中的前端、宿主和协议必须匹配，完整重载与重试能恢复当时 URL 所表示的业务路由。

这些是用户已定目标。当前双端导航实现及七标签依据见第 3 节；目标不代表当前代码已经满足前端独占。

### 1.2 非目标

- 本文不实现 Electron、不选择 Electron 的文档来源、不迁移 localStorage 或原生能力 transport。
- 不更换 UI 样式体系，不重写 iframe 编辑器或 ReportEditor，不调整业务数据规则、凭据、计划任务和持久化格式。
- 不增加返回/前进历史、页面状态恢复、统一状态管理库、忙碌切页守卫或窗口关闭守卫。
- 不把导航迁移变成业务会话重构；不顺带重写 `_activeOperation` 的并发/取消机制。
- 不删除旧页面或修改 C#；AutoMap 迁出及其他后续实现必须另获相应授权。

## 2. 术语与四种 ID

“文档加载”指创建或完整重载前端文档；“业务切页”指同一文档内切换模块；“业务操作”指查询、写入、文件处理或登录等原生能力请求。三者不能共用生命周期。

| ID 类别 | 当前用途与依据 | 目标归属与失效边界 |
|---|---|---|
| 导航 ID → 文档加载 ID | 旧 `_navigationId` 每次宿主切页和重试生成；ready 要求它与 route 同时匹配。`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:47,119,160,173`；`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:89-96` | 兼容段保持旧语义；切换段后只标识宿主本次文档加载，完整重载/重试生成新代次，业务切页不生成；旧文档确认不能显示新文档。线上字段名在切换实现时明确，不把名称等同于业务路由 |
| bridge 请求 ID | 对应单次请求、响应、进度及超时。`src/ProductionAssistant.App/Assets/Prototype/src/bridge/webview.ts:1-18,31-41` | 请求层继续持有；完成、超时或明确取消时结束，不因 route 变化替换其含义 |
| auditId / resultId | 识别后端挂网检查和生产会导出结果。`src/ProductionAssistant.App/PrototypeBridge.PlanPdf.cs:33-38,80`；`src/ProductionAssistant.App/PrototypeBridge.Meeting.cs:27-33` | 业务会话层继续校验；按新检查/新导出替换和现有有效性规则失效，不按页面切换失效 |
| 腾讯登录 sessionToken | 同一登录实例的 start/poll/cancel 使用同一 token；卸载清理仍排入串行队列。`src/ProductionAssistant.App/Assets/Prototype/src/features/daily-report/tencent-sheet/TencentLoginDialog.tsx:26-33,55-64` | 登录会话持有，继续按原登录生命周期清理；不是路由 ID，也不是通用请求 ID |

## 3. 现状与事实依据

本节描述设计基线 285476f 的事实。切换段实现后，3.1、3.2 中的 app.navigateNative、_currentTag、_route、_navigationId、IsCurrentNavigation 等已不存在，当前状态见 5.2.1。

### 3.1 导航和 ready 链路

| 顺序 | 当前事实 | 文件与行号 |
|---|---|---|
| 1 | 侧栏将业务标签传给回调，App 调用 `app.navigateNative`；该回调当前吞掉导航错误 | `src/ProductionAssistant.App/Assets/Prototype/src/components/layout/OperationSidebar.tsx:18-34,42-48`；`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:33,50` |
| 2 | bridge 检查受信来源、operation 白名单，然后把导航请求分发给 Navigate，再检查标签白名单 | `src/ProductionAssistant.App/PrototypeBridge.cs:33,48-51,87,188-194` |
| 3 | MainWindow 对相同 `_currentTag` 返回；七个已知标签均为 PrototypePage，未知标签保留原生挂网页兜底 | `src/ProductionAssistant.App/MainWindow.xaml.cs:41-65` |
| 4 | PrototypePage 保存 `_route`，生成 navigation ID；首次设置文档 Source，之后注入 replaceState 与 popstate | `src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:33-49,119-127` |
| 5 | 生产前端当前只读 location.search、解析 query、监听 popstate；检查范围内未发现业务路由 URL 写入器 | `src/ProductionAssistant.App/Assets/Prototype/src/hooks/useHostRoute.ts:4-11`；`src/ProductionAssistant.App/Assets/Prototype/src/routes/index.ts:3-16`；宿主写入见上行 |
| 6 | RouteReady 位于 Suspense 内，挂载后发送 ready；transport 按 navigation 去重 | `src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:59-64`；`src/ProductionAssistant.App/Assets/Prototype/src/routes/RouteReady.tsx:4-7`；`src/ProductionAssistant.App/Assets/Prototype/src/bridge/webview.ts:23-28` |
| 7 | app.ready 是按 type 特判的单向消息，不是 AllowedOperations 中的 operation；收到后调用 `_ready` | `src/ProductionAssistant.App/PrototypeBridge.cs:38-46`；`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:5-63`；`src/ProductionAssistant.App/Assets/Prototype/src/bridge/webview.ts:26` |
| 8 | ready 必须带非空 navigation，且 route/navigation 都与宿主当前值一致，才取消超时并显示 WebView | `src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:89-96`；`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:158-168` |

每次 NavigateRouteAsync 都有 15 秒 ready 等待，新导航取消旧等待并核对等待实例。超时显示错误层、隐藏整个 WebView；没有永久废弃该 navigation ID，迟到但仍匹配的 ready 仍可重新显示。该计时在环境初始化之后开始，不覆盖环境创建本身。依据：`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:74-92,111-141,158-168,187-193`。

WebView 在 XAML 中初始隐藏；NavigationCompleted 成功只记日志，不作为显示许可。当前 RouteReady 的位置也不等待页面内部业务查询或 iframe 加载完成。依据：`src/ProductionAssistant.App/Pages/PrototypePage.xaml:7-12`；`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:101-108`；`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:59-64`。

### 3.2 当前路由、窗口和业务状态

| 状态 | 当前归属、读写与生命周期 | 文件与行号 |
|---|---|---|
| `_currentTag` | MainWindow 初始化、同标签读取、导航时写入 | `src/ProductionAssistant.App/MainWindow.xaml.cs:12,43,46` |
| `_route` | PrototypePage 默认值、NavigateToRoute 写入；用于日志、URL 和 ready 校验 | `src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:13,35-46,117,119,160,164` |
| `_navigationId` | NavigateToRoute/重试写入；URL 与 ready 校验读取 | `src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:14,47,119,160,173` |
| 加载与显示状态 | `_initialized`、`_reactVisible`、`_routeStarted`、`_readyTimeout` 控制宿主启动/切页等待 | `src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:15-18,48,91,111-141,158-193` |
| bridge 实例 | 缓存的 PrototypePage 初始化时创建；普通切页及已初始化后的完整重试不重建 bridge，未发现切页清理 hook | `src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:23,33-49,90-92,171-177` |
| 挂网/生产会结果 | bridge 实例持有，不由当前 route 清理；详细字段与更新时机见 4.4 | `src/ProductionAssistant.App/PrototypeBridge.PlanPdf.cs:10-75`；`src/ProductionAssistant.App/PrototypeBridge.Meeting.cs:9-37` |
| 前端页面状态 | 内容节点按 route 重建；Plan/Meeting 卸载递增版本号，忽略旧响应但不取消后端任务 | `src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:55-65`；`src/ProductionAssistant.App/Assets/Prototype/src/features/plan-pdf/PlanPdfPage.tsx:20-32,44-68`；`src/ProductionAssistant.App/Assets/Prototype/src/features/production-meeting/ProductionMeetingPage.tsx:9-34` |
| 标题栏/环境标记 | 从 RuntimeEnvironment 设置标题与标记，不读取业务 route；布局固定 222px 左列和 48px 顶栏 | `src/ProductionAssistant.App/MainWindow.xaml.cs:17-22`；`src/ProductionAssistant.App/MainWindow.xaml:7-20` |
| 窗口关闭 | 当前 App/MainWindow 及相关源码未发现业务关闭拦截；没有可以直接继承的忙碌关窗保证 | `src/ProductionAssistant.App/App.xaml.cs:31-66`；`src/ProductionAssistant.App/MainWindow.xaml.cs:14-70`；本轮关闭事件引用检查 |
| 命令行与计划任务 | 参数是环境、任务类型/ID；无界面任务执行后退出，不按页面路由启动窗口 | `src/ProductionAssistant.App/App.xaml.cs:34-65`；`src/ProductionAssistant.Infrastructure/Services/DailyReportTaskScheduler.cs:18`；`src/ProductionAssistant.Infrastructure/Services/NotionFill/NotionFillTaskScheduler.cs:20-23`；`src/ProductionAssistant.Infrastructure/Services/TencentSheetTaskScheduler.cs:34` |

### 3.3 原生页面与旧前缀

| 对象 | 当前入口及删除约束 | 文件与行号 |
|---|---|---|
| PrototypePage | 活跃 WebView 宿主页，不是待删的旧业务页面 | `src/ProductionAssistant.App/MainWindow.xaml.cs:37,49-55`；`src/ProductionAssistant.App/Pages/PrototypePage.xaml:7` |
| PlanPdfExportPage | NavigateTo 未知标签兜底仍在，但当前启动标签与 bridge 白名单无法进入该分支 | `src/ProductionAssistant.App/MainWindow.xaml.cs:37-38,56,65`；`src/ProductionAssistant.App/PrototypeBridge.cs:188-194`；`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:65-80` |
| ProductionMeetingExportPage | 未发现生产页面实例入口；业务标签已进入 PrototypePage | `src/ProductionAssistant.App/Pages/ProductionMeetingExportPage.xaml.cs:9-17`；`src/ProductionAssistant.App/MainWindow.xaml.cs:53`；本轮类型引用检查 |
| ProductionMessagePage | 未发现页面实例入口，但 AutoMap 和 MappingAliases 不是死代码，正式 bridge 仍使用 | `src/ProductionAssistant.App/Pages/ProductionMessagePage.xaml.cs:11-29,46-52,470-492`；`src/ProductionAssistant.App/PrototypeBridge.cs:366` |
| FileWorkflowShell | 控件而非 Page，仅发现两个旧文件页面使用 | `src/ProductionAssistant.App/Pages/PlanPdfExportPage.xaml:6-33`；`src/ProductionAssistant.App/Pages/ProductionMeetingExportPage.xaml:6-19`；`src/ProductionAssistant.App/Controls/FileWorkflowShell.xaml:2` |

`navigation:*` 唯一发现的生产生成位置是 `src/ProductionAssistant.App/MainWindow.xaml.cs:61`；PrototypePage 在 `src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:37,119-127` 接受并写入 URL。前端类型、解析、高亮及原生空占位分别位于 `src/ProductionAssistant.App/Assets/Prototype/src/lib/types.ts:1`、`routes/index.ts:7`、`app/App.tsx:34-35,52-53`（后二者同属该 src 目录）。样式位于 `src/ProductionAssistant.App/Assets/Prototype/src/operation-sidebar.css:72-84` 和 `settings-modal.css:1-7`。测试地址见 `src/ProductionAssistant.App/Assets/Prototype/src/app/App.test.tsx:349,457,492,549,559`。未确认仓库外是否仍有消费者。

“正常入口不可达”不等于整个文件可删除；原生生产消息页面的静态映射逻辑必须先迁出，PrototypePage 仍需继续承担 WinUI 过渡宿主职责。

### 3.4 设置、来源和独立协议

- settings.open 当前既返回设置数据，也抬高 ShellFrame；settings.close 仅降低层级。依据：`src/ProductionAssistant.App/PrototypeBridge.Settings.cs:12-21`；`src/ProductionAssistant.App/MainWindow.xaml.cs:68-69`。
- 前端仅在原生占位且设置打开时增加 settings-over-native；关闭时隐藏弹窗、派发 production-settings-updated，再通知 settings.close。依据：`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:34-45,48-53`；透明背景见 `src/ProductionAssistant.App/Assets/Prototype/src/settings-modal.css:1-7`。以上为 `285476f` 基线事实；兼容段状态：前端原生占位分支与 settings-over-native 逻辑已在 #49 删除，样式残留待删除段清理。
- settings.open 数据读取、Escape、焦点恢复和连接刷新后的字段缓存失效属于设置行为，不依赖原生内容覆盖。依据：`src/ProductionAssistant.App/Assets/Prototype/src/app/SettingsModal.tsx:51-68,77-85`。
- 来源检查限定 HTTPS、默认端口、指定虚拟主机及 `/index.html`；消息和顶层导航均使用检查。依据：`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:82-87`；`src/ProductionAssistant.App/PrototypeBridge.cs:33`；`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:80-84`。
- ReportEditor 有独立 WebView2 消息协议，不经 Prototype 的 bridge/index.ts。依据：`src/ProductionAssistant.App/Assets/ReportEditor/editor-source.js:5,67,156,170`。
- 原生文件选择仍需退出 WebView2 消息回调后再打开；不得因业务 XAML 页面退役误删 Task.Yield 保护。依据：`src/ProductionAssistant.App/PrototypeBridge.cs:54-56`。

## 4. 目标契约

本节是后续实现要求；现状依据为第 3 节，不表示目标已落地。

### 4.1 路由所有权

- 兼容段的唯一生产 URL 写入方仍是 C#。集中后的前端导航入口暂时委托 app.navigateNative，不同时本地切页。
- 切换段在同一 PR 中让前端接管业务 URL，并停止 C# 每页导航、route 校验与每页 ready 等待。此后 C# 不再保存 `_currentTag`、业务 `_route`，也不按业务标签维护页面类型分支。
- 前端导航入口负责校验标签、归一旧地址、更新当前路由和 URL；侧栏只请求导航并展示选中态，业务页面不绕过该入口。
- 宿主可以创建文档加载代次、装载入口、原样保留当前 URL 用于完整重试，但不能解析 route 来选择业务页或用旧默认值重写它。该装载职责不构成第二份路由状态。
- 不引入另一个全局业务 store，不因导航变化重建原生能力会话。描述性接口职责到此为止，具体模块/API 由对应实现 PR 确定。

### 4.2 URL 契约

| 项目 | 约定 |
|---|---|
| 文档路径 | 过渡期保持 `/index.html` 和 query 路由，继续满足当前受信路径约束；不引入 pathname 依赖 |
| 业务参数 | 使用 `route`；七个合法值是 `production-message`、`daily-weld`、`database-viewer`、`plan-pdf`、`production-meeting`、`report-center`、`daily-report`；区分大小写 |
| 缺省/未知值 | 归一为 `production-message`；不产生原生空占位 |
| 旧前缀 | `navigation:` 后为已知标签时映射到该 React 路由，否则回默认页；目录名称不参与解析。兼容段 #49 已由 resolveHostRoute 返回 `{ route, navigation, displayRoute }`，保留原始宿主握手字段，另用 displayRoute 展示归一结果；字段用途及切换后的处理见下文；切换段已取消 displayRoute，resolveHostRoute 现仅返回 { route, navigation }，见 5.2.1 |
| 写入与历史 | 模块切换继续使用 replaceState，不新增返回/前进历史；写入和前端订阅更新由统一入口协调，不能只改地址栏而不更新页面。前端切页写 URL 时只更新 route，必须保留 query 中的其他参数，包括承载文档加载代次的 navigation 字段，不得重建整个 query |
| 重载/重试 | 路由变化时写回 URL；切换段后 C# 不保存业务路由，宿主重试必须基于“重载当前文档”，不得用宿主自存的旧值重新设置 Source。完整重载和宿主重试从当前 URL 恢复模块；缺省入口仍由前端选择默认模块。WebView2 的 URL 保留行为未确认，见 5.2、9.2 |
| navigation 字段 | 兼容段保留旧握手意义；切换后不决定业务页。若承载文档加载代次，仅属于装载元数据，业务切页不修改其代次 |
| Electron | 文档来源、最终传输字段和 localStorage 搬迁留到 Electron 阶段，不在此选择新 scheme 或存储迁移方案 |

合法值与现状解析依据：`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:65-80`；`src/ProductionAssistant.App/Assets/Prototype/src/routes/index.ts:3-16`。当前 replaceState 来源依据：`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:119-127`。

本轮只读确认的宿主现状：`PrototypePage.xaml:98` 的“重试加载”按钮绑定 Retry_Click；`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:171-177` 先生成新 `_navigationId`，已初始化时调用 NavigateRouteSafelyAsync(initial: true)，否则重新初始化；初始化成功后也调用 NavigateRouteAsync(initial: true)（同文件 92 行）。initial 路径用宿主 `_route` 与 `_navigationId` 重建 query，再设置 PrototypeWebView.Source（同文件 119-123 行）；普通切页则注入 history.replaceState（125-127 行）。该重试路径没有读取当前文档 URL，不能视为切换后的目标实现。

本轮只读确认的前端完整重载入口：`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:16-22` 的错误边界中，“重新加载”按钮在 21 行调用 window.location.reload()。这些代码只证明现有调用；WebView2 的 Source 是否反映 history.replaceState 后的 URL，以及“重载当前文档”是否保留该 URL，均未确认，必须在真实桌面验证，作为 5.2 的验收前置项。

兼容段的“行为零变化”指正常七入口的导航模式、历史和业务动作不变；旧前缀由空占位变为 React 路由是已定的兼容修正，必须单独验收，不能声称所有旧输入的显示均不变。依据：`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:34-35,52-53`。

旧前缀归一还必须区分“展示用业务路由”和“旧宿主要求回传的握手 route”：兼容段不得单方面把后者改成归一结果，也不得放松 C# 校验。若旧地址带宿主令牌，必须证明旧 expected route/令牌仍能匹配；只有切换段才取消宿主的业务 route 比较。该约束来自 `src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:89-96`，不是给前端增加永久双路由。实际外部旧地址来源未确认。兼容段 #49 的实际实现：`src/ProductionAssistant.App/Assets/Prototype/src/routes/index.ts` 中 resolveHostRoute 返回 `{ route, navigation, displayRoute }`；route 保持宿主握手原始值，navigation 保留宿主令牌，`app/App.tsx` 的容器 key 与 RouteReady 读取 route，RouteReady 同时回传 navigation；展示、骨架和侧栏高亮读取 displayRoute。切换段取消宿主 route 比较后，再评估 route 字段的去留。

### 4.3 ready 的两种语义

| 维度 | 文档启动确认 | 业务路由就绪 |
|---|---|---|
| 所有者 | 前端通知，宿主校验本次文档加载 ID | 前端路由层 |
| 触发 | 首次完整加载及完整重载/重试；同代次处理幂等 | 当前模块懒加载、渲染或失败状态变化 |
| 完成标准 | 外壳及当前首个目标路由组件已挂载、可呈现；仍在等待该模块加载的占位不算完成；不等业务查询、iframe 或字体全部结束 | 前端控制当前路由的骨架、错误和重试，不触发宿主显隐 |
| 校验 | 受信来源和当前文档代次；旧代次拒绝；route 只用于日志 | 丢弃已离开路由的异步结果；前端维护当前路由一致性 |
| 超时 | 可保留资源导航后的启动 ready 超时与错误/完整重试；环境初始化超时缺陷另列任务 | 不存在 C# 每页 15 秒等待；失败不能隐藏整个宿主内容 |

可沿用 app.ready 名称及单向消息形状，但必须明确其新语义，不改成普通 invoke operation。当前的每 navigation 去重及 IsCurrentNavigation 不能原样保留：前者改按文档代次处理，后者不再比较业务 route。当前行为依据：`src/ProductionAssistant.App/Assets/Prototype/src/bridge/webview.ts:23-28`；`src/ProductionAssistant.App/PrototypeBridge.cs:40-46`；`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:89-96`。

启动超时后仍提供错误与重试；保持“迟到但属于当前加载代次的确认可恢复显示”，旧代次无权恢复。宿主完整重试更换加载 ID，同时保留当前业务 URL；切换段后必须基于“重载当前文档”，不得用宿主自存的旧业务路由重新设置 Source。当前重试仍按 4.2 所列路径重建 Source，目标重载流程的 URL 保留行为未确认，须按 5.2、9.2 完成真实桌面验证。初次显示和后续业务切页必须有分离的测试，不能用一次 ready 断言覆盖两者。现状显示依据：`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:158-193`。

删除 navigation 作为路由刷新信号后，前端必须另有明确的错误边界重置/重试契约，避免同路由失败后复用失败边界。当前依赖见 `src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:16-22,55-65`。

### 4.4 状态归属与清理时机

以下保持既有业务会话，不新增“切页自动清空”或“离页自动取消”。plan 行依据为 `src/ProductionAssistant.App/PrototypeBridge.PlanPdf.cs:10-85`；meeting 行依据为 `src/ProductionAssistant.App/PrototypeBridge.Meeting.cs:9-37`，具体行号随各行列出。

| 状态 | 归属 | 更新/清理时机 | 切页和重载约束 |
|---|---|---|---|
| `_planAudit` | 挂网业务会话 | 新 audit 开始置空，成功后赋值；repair 成功后复查替换（30-34、59-60 行） | 不因切页清理；源变化按现有规则阻止后续操作，不伪称已清空 |
| `_planAuditId` | 同一挂网会话 | 每次新 audit 生成，后续操作严格匹配（33、37 行） | 不是加载 ID；不得随路由或文档重载旋转 |
| `_planRepaired` | 同一挂网会话 | 新 audit、源变化、repair 开始置 false；repair/复查成功置 true（32、48、57、61 行） | 保留现有业务判断，不用前端页面存在与否代替 |
| `_planOutput` | 同一挂网会话 | 新 audit、repair 开始、export 开始清空；export 成功赋值，打开时检查目录（31、39-43、58、68-70 行） | 前端卸载不清后端输出身份 |
| `_planBusy` | 单次挂网操作 | 入口检查并置 true，finally 置 false（18-19、75 行） | 不在切页时强制释放；新页面不能绕过后端锁 |
| `_meetingOutput` | 生产会业务会话 | 新 export 开始清空，成功赋值；打开时检查 ID 与文件（27、29、32 行） | 不因切页清理 |
| `_meetingResultId` | 同一生产会会话 | 每次新 export 生成；打开结果严格匹配（28、32 行） | 不随业务路由或文档加载代次变化 |
| `_meetingBusy` | 单次生产会操作 | 入口置 true，finally 置 false（15-16、37 行） | 不在卸载时释放后端锁 |
| `_activeOperation` | bridge 请求处理层 | 当前普通 operation 会 Dispose 上个 CTS 并创建新 CTS；production.cancel 只取消最后登记的 CTS | 不改造成路由取消机制；移除导航 operation 后也不能依赖该请求替换 CTS。依据：`src/ProductionAssistant.App/PrototypeBridge.cs:58-70` |
| `_webView`、消息监听 | 当前宿主 transport | bridge 构造时绑定，绑定当前宿主能力通道 | 业务切页不重建；Electron 通道及后端进程终止/释放策略未确认。依据：`src/ProductionAssistant.App/PrototypeBridge.cs:16,21-26` |
| `_navigate`、`_ready` | 兼容宿主回调 | 兼容段保留；切换段移除导航回调，ready 改成文档启动确认 | 不继续持有业务路由控制权。依据：`src/ProductionAssistant.App/PrototypeBridge.cs:17-25,40-42,188-194`；2026-10-20：切换段已移除 `_navigate`，`_ready` 保留并改为文档启动确认 |
| 静态 DailyReports、SettingsNotifications | 业务服务层 | 保留当前服务生命周期，不由页面切换重置 | 服务内部生命周期不是本次重构范围。依据：`src/ProductionAssistant.App/PrototypeBridge.DailyReport.cs:9`；`src/ProductionAssistant.App/PrototypeBridge.Settings.cs:10` |

已知差异必须保留并明确告知验收者：前端离页重置输入、audit/result 展示与 busy 状态，后端 auditId/resultId 和进行中的任务仍存在；返回页面不做恢复。React 的忽略旧响应只防旧界面更新，不证明后端取消。依据：`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:55-65`；`src/ProductionAssistant.App/Assets/Prototype/src/features/plan-pdf/PlanPdfPage.tsx:30-32,52-68`；`src/ProductionAssistant.App/Assets/Prototype/src/features/production-meeting/ProductionMeetingPage.tsx:14-34`。

本文不承诺数据跨宿主进程退出继续存在，也不新增结果恢复接口。Electron 阶段必须确定后端业务会话是否长驻；若改为逐请求创建对象，上述 ID 将失去原结果上下文，不能直接沿用本契约的有效性假设。

### 4.5 设置弹窗、原生能力与发布边界

- 前端侧 native-content-slot 渲染与 settings-over-native 切换已移除；删除段剩余项为 CSS 死样式、App.tsx 的 settings.close 调用、C# 侧层级切换与 settings.close 操作、透明背景；仍然不删除整个设置样式文件。
- settings.open 的数据返回能力保留，去掉层级副作用；前端遮罩、Escape、焦点恢复、production-settings-updated 和字段缓存失效保持。现状依据见 3.4。
- WinUI 过渡宿主仍需维护标题栏、环境标记与当前尺寸；业务 XAML 退役不等于这些窗口能力已经由 Electron 实现。依据：`src/ProductionAssistant.App/MainWindow.xaml:7-20`；`src/ProductionAssistant.App/MainWindow.xaml.cs:17-22`。
- operation 白名单、消息来源检查、请求/响应/进度、业务结果 ID 与文件选择 Task.Yield 保护保留；切换段只撤掉导航权，不能顺带放开文件系统、凭据或任意 operation。依据：`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:5-87`；`src/ProductionAssistant.App/PrototypeBridge.cs:33,48-70`。
- 前端和宿主同包原子交付、同包回退。不支持新前端配旧宿主等混合组合，不用静默 no-op 忽略旧导航请求制造成功假象。切换之后，“新旧宿主跑同一份前端”不再成立；未来若要增加另一宿主，必须明确适配并作为一个受支持组合验收。

## 5. 三段迁移与回滚

### 5.1 兼容段：集中入口，保持旧宿主驱动

状态：已完成（#43 路由表，#44 导航入口，#45–#48 测试契约，#49 旧前缀归一）；自动化测试通过，真实桌面验收见 9.2。

建议按单一目的拆成独立 PR：路由表集中、导航入口集中、测试契约拆分、旧前缀归一。每个 PR 只承接其中一项；归一所需的旧握手适配属于同一兼容目的。

范围：

- `src/ProductionAssistant.App/Assets/Prototype/src/routes/index.ts:3-16`、`lib/types.ts:1`：集中标签、默认值和解析规则。
- `src/ProductionAssistant.App/Assets/Prototype/src/components/layout/OperationSidebar.tsx:6-34`、`app/App.tsx:29-50`、`hooks/useHostRoute.ts:4-11`：集中导航职责，生产仍委托 app.navigateNative。
- `src/ProductionAssistant.App/Assets/Prototype/src/routes/RouteReady.tsx:4-7`、`bridge/webview.test.ts:58`、`bridge/index.test.ts:66`、`app/App.startup.test.tsx:18-60`：将文档启动和业务切页的测试意图区分，兼容段仍满足旧运行协议。
- `tests/ProductionAssistant.Tests/ArchitectureTests.cs:127,150-173`、`src/ProductionAssistant.App/Assets/Prototype/src/app/App.test.tsx:434-575`、`bridge/mock.test.tsx:51,90-104`（后者同属该 src 目录）：保留旧协议断言并为切换准备明确替代验收。

不做：前端业务 URL 写入、C# 每页校验放宽、原生页面删除、状态恢复、UI 重设计、依赖更换。

验收标准：

- 七标签与大小写/默认规则一致，daily-report 不变；正常入口仍走一次宿主导航，没有第二个 URL 写入方，没有新增历史。
- 已知旧前缀进入对应 React 页面，未知回默认；兼容修正与普通入口零变化分别验收。
- 旧宿主 expected route/navigation 仍匹配；旧令牌拒绝、延迟模块未完成不提前 ready、加载中可以切走的原契约不被破坏。
- 没有新增业务读写触发，设置仍覆盖当前模块；测试 mock 不得把未实现能力伪造为成功。

失败回滚：停止该 PR，通过独立回退 PR 撤回该项集中化或归一改动，恢复上一已验收入口；协议不变，无需混配前端和宿主。不得用 force、reset 或丢弃用户改动代替回退。

### 5.2 切换段：同一 PR 原子交出业务导航权

状态：已实现并通过测试版桌面验收，待合并；实施结果与验收记录见 5.2.1。

这是一个目的：前端成为唯一业务导航来源。前端 URL 写入、C# 退出每页 route/ready 控制必须同一 PR 合入并交付，不能拆成先后可运行的半套协议。

范围：

- 前端 `src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:29-65`、`routes/index.ts:3-16`、`hooks/useHostRoute.ts:4-11`、`routes/RouteReady.tsx:4-7`：启用统一前端导航和 replaceState，保持卸载重置，分开启动与业务路由状态，保证 URL 重载恢复和错误边界重试。
- `src/ProductionAssistant.App/MainWindow.xaml.cs:12,37-65`：停止按业务标签导航和 `_currentTag` 短路；宿主只装载前端入口。
- `src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:13-18,33-49,90,111-177`：去除每页业务 route 和等待，保留文档加载 ID、首次显示、启动错误及重试；重试保留当前 URL，不重建旧业务 URL。
- `src/ProductionAssistant.App/PrototypeBridge.cs:17-25,40-46,87,188-194`、`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:7,65-96`：停止 app.navigateNative 发送/分发，移除导航回调和业务标签白名单，ready 改为文档加载校验；保留原生能力白名单及来源约束。
- `src/ProductionAssistant.App/Assets/Prototype/src/bridge/index.ts:29-38`、`bridge/webview.ts:7-8,23-28`、`bridge/mock.ts:37-40`：更新启动通知语义；相关 App、startup、bridge 与 C# 架构测试一起更新。
- 未引用的旧定义可以留待删除段清理，但不得留下仍可执行的第二条宿主业务导航通路；不为旧导航请求返回伪成功。

不做：Electron transport、业务会话重建、请求取消重构、关窗守卫、页面恢复、localStorage 迁移；不在同一 PR 搬 AutoMap 或顺带删除全部旧 UI。

验收标准：

- 点击七个模块只通过前端切页；不发送 app.navigateNative，C# 不按业务标签改 URL，不产生每页加载 ID 或 15 秒等待。
- replaceState 后页面与地址一致；完整重载、前端错误重新加载、宿主启动失败重试均恢复当前路由；缺省和旧地址符合 4.2。
- 前端切页 replaceState 后，navigation 及其他 query 参数保持不变；只更新 route，不重建整个 query，须有测试覆盖。
- 切换段验收前置项：必须在真实 WinUI/WebView2 桌面确认 Source 是否反映 history.replaceState 后的 URL，以及“重载当前文档”是否保留该 URL；两项目前均未确认。宿主重试必须基于当前文档，恢复前端当前模块并更换文档加载代次，不得用宿主自存旧路由重新设置 Source；自动化测试不能替代本项真实桌面验证。9.2 第 4 条所列的重试方式与文档加载代次更新之间的设计张力，须在切换段设计中解决后，才能定稿重试验收。【2026-10-20 已确认：Source 反映 replaceState 后的 URL，重试采用整页导航方案，见 5.2.1。】
- 首次外壳及首个路由可呈现才确认；业务查询/iframe 延迟不阻塞该确认；旧文档 ready 无效，重载有新代次，业务切页不使宿主隐藏。
- 快速 A→B→A、延迟模块切走、同路由失败重试没有重复导航或失败边界滞留。
- 后端 auditId/resultId 与操作锁跨切页保留；前端仍卸载重置，不误报旧操作已取消或已完成；设置、文件选择及后台任务入口保持。
- 前端与宿主以匹配组合整体验证，自动化测试与真实桌面验收分别记录，不能以 DOM 测试推定 WebView 显隐和系统对话框已通过。

失败回滚：停止交付，通过一个回退 PR 成对撤回本次前端导航和宿主握手变化；已交付时只按另行授权的部署回退流程恢复上一完整匹配包。不能单回退前端、单回退宿主，不能清除用户数据，也不能把已发生业务写入当作随代码回滚自动撤销。

### 5.2.1 切换段实施结果（2026-10-20，分支 codex/nav-switch，基于 673b441）

本小节记录实现后的事实，其余设计正文不改。行号不再逐项列出，以分支代码为准；状态为已实现并通过测试版桌面验收，待合并。

协议最终形状：

- 前端：`routes/navigation.ts` 只导出 `subscribeRoute(listener)` 与 `navigateInDocument(tag): boolean`。`navigateInDocument` 对非法标签和等于当前路由的标签返回 false；否则只把 query 中的 `route` 置为该标签，其余参数（包括 `navigation`）原样保留，用 `history.replaceState` 写回，通知订阅者并返回 true；不派发 popstate，不调用宿主。旧的 `navigate` 与 `app.navigateNative` 调用已从非测试代码中清除。
- 前端：`resolveHostRoute` 只返回 `{ route, navigation }`，不再有 `displayRoute`；旧 `navigation:` 前缀被剥离并归一（已知后缀取后缀，未知、空、大小写不符、带空白回默认 `production-message`）；`navigation` 取自 URL 且不裁剪。
- 前端：ready 在 `bridge/index.ts` 幂等，非空 navigation 对同一文档只通知一次，空令牌每次都发，不比较 route；`bridge/webview.ts` 只负责 postMessage；`route` 仅用于诊断日志。
- 协议：`AllowedOperations` 去掉 `app.navigateNative`（83 项变为 82 项）；删除 `AllowedNavigationTags`、`IsNavigationAllowed`、`IsCurrentNavigation`；新增 `IsCurrentLoad(loadId, expectedLoadId)`（非空白且 Ordinal 相等）与 `BuildDocumentUrl(currentSource, loadId)`。
- `BuildDocumentUrl` 规则：`loadId` 为空白抛 `ArgumentException`；来源不可信（非 https、非默认端口、host 或路径不符、为空或无法解析）时返回首次加载地址 `https://prototype.production-assistant.local/index.html?navigation=<转义后的 loadId>`；来源可信时用字符串操作取原始 query（丢弃 fragment），按 `&` 切片并跳过空片段，仅对键做解码后与 `navigation` 做 Ordinal 比较，第一个匹配片段原位替换为新令牌、后续重复项删除，没有则追加在末尾，其余片段原样保留（不解码、不重编码、顺序不变）。
- 宿主：`navigation` URL 参数现在只标识本次文档加载代次（C# 内部 `_loadId`，Guid 的 N 格式），首次加载与每次重试时生成，业务切页不改它。首次加载地址为 `BuildDocumentUrl(null, loadId)`，不带 `route`，默认页由前端选择。
- 宿主：`PrototypePage` 的 `LoadDocumentAsync(reuseCurrentSource)` 只保留“文档启动超时”（15 秒，收到匹配 ready 即取消，超时显示错误层）；业务切页没有宿主等待和加载层。`OnReactReady` 只校验来源可信与 `IsCurrentLoad`，`route` 只写日志。重试 `Retry_Click`：先换新 `_loadId`；已初始化时读取 `CoreWebView2.Source`，经 `BuildDocumentUrl` 重建地址并整页导航；未初始化则走 `InitializeAsync`。
- 宿主：`MainWindow` 不再有 `_currentTag` 与 `NavigateTo`，构造函数只导航到 `PrototypePage`；`PrototypeBridge` 构造函数变为 `(WebView2, Action<string, string> ready)`，不再有 `_navigate` 与 `Navigate()`。`settings.close`、`SetSettingsModalOpen`、`ContentFrame`（XAML）、`PlanPdfExportPage` 文件本身保留给删除段。
- 日志与文案变化：`route-start-*`、`route-ready-*`、`navigation-start` 改为 `document-load-start`、`document-ready-wait=…ms-route=…`、`load-failed-*`；宿主错误文案“页面切换失败”改为“页面加载失败。请重试加载。”。
- F5 与 ready：F5 重载文档不经过 `LoadDocumentAsync`，URL 中的 `navigation` 仍等于当前代次，因此重载后的 ready 被接受；每次 F5 产生一次 ready，不会重置启动超时。

T1/T2 实测结论（回答 9.2 第 6 条）：

- T1（真实桌面，测试版）：F12 与 F5 可用；在数据库查看页按 F5 后仍停在该页（`location.href` 保留 `route=database-viewer`，导航类型为 reload）。
- T2（一次性诊断分支，已丢弃）：前端 `replaceState` 会触发 `CoreWebView2.SourceChanged`（`isNewDocument=False`），`Source` 是含新 `navigation` 的完整地址；宿主调用 `CoreWebView2.Reload()` 后仍停在当前模块，ready 被接受（实验中宿主未换代次）。
- 推理（T2 当时未实测）：宿主若换了代次再 `Reload()`，URL 里仍是旧代次，ready 会被拒收，所以重试不能只靠 `Reload()`。这是选择整页导航方案（读取 `Source`、用 `BuildDocumentUrl` 替换代次并重新设置 `Source`）的原因，也是 9.2 第 4 条设计张力的解决方式；该方案的实测见下文第 5 项。

测试版桌面验收（2026-10-20，Development 环境，发布到临时目录；只切页，未点击任何写入按钮）：

1. 启动后默认模块显示；日志无 `route-start-`，启动时 `document-load-start` 一次、首个 ready 一次。
2. 七个模块逐一切换（日志中七个路由均出现），日志无 `bridge-start-app.navigateNative`；每次切换后按 F5 停在当前模块，页面正常。
3. 同标签连点与快速 A→B→A：人工观察无重复导航、无错误层滞留（日志不记点击，此项无日志佐证）。
4. 设置弹窗、文件选择器（日志中见文件夹选择器打开并取消）、后台任务入口保持可用。
5. 重试加载：用一次性验收分支（已丢弃，未合并）让首次 ready 被忽略并让首次加载带 `route=database-viewer`；15 秒后出现“界面准备时间过长”错误层，点“重试加载”后页面恢复并停在数据库查看页；日志有两次 `document-load-start`，第二次的 `document-ready-wait` 带 `route=database-viewer`，没有 `load-failed`。

自动化验证：前端 263 例（262 通过、0 失败、1 跳过，跳过项为符号链接权限用例），`tsc --noEmit` 0 错误，`lint:font-weights` 通过；xUnit 由 202 变为 225（改写 2 个既有测试方法，新增 12 个方法共 23 例）；dist 已重建（13 个新增、13 个删除、`index.html` 修改），重建产物中 `navigateNative` 为 0 处。

与设计文字的差异和注意事项：

- URL 参数名仍为 `navigation`，4.2 中“线上字段名在切换实现时明确”的结论是：本次不改名，改名登记到 Electron 阶段。
- 前端仍上报归一后的 `route`，宿主只写日志，不参与比较。
- 重试时来源不可信或为空，退回首次加载地址，不保留 route。
- 本次验收仅覆盖测试版；正式版未验证；开发版与正式版是否共用同一 Teable 库，源码查不出，验收时按“可能共用”处理，没有执行写入。

### 5.3 删除段：退役无入口代码与跨原生内容覆盖

每个删除 PR 只清理一个已断开的边界。执行删除前仍须按 AGENTS.md 核对清单并取得所需授权；本文不授权删除。

范围与先后：

1. AutoMap 与 MappingAliases 从旧页面迁出至 Core 或 Infrastructure，具体归属待确认；作为独立任务、独立 C# 授权，先迁出并验证调用，再删除页面；不得直接删除现存映射。依据：`src/ProductionAssistant.App/PrototypeBridge.cs:366`；`src/ProductionAssistant.App/Pages/ProductionMessagePage.xaml.cs:11-29,470-492`。
2. 删除已证实无页面入口的三个旧业务 XAML 及其 UI 代码；复核后再清理仅被旧页面使用的 FileWorkflowShell。页面清单与引用依据见 3.3。
3. 去掉 ContentFrame、未知标签原生兜底、原生占位及跨内容覆盖；同步去掉 settings.close、层级回调和透明背景，保留 settings.open 数据与前端设置行为。位置：`src/ProductionAssistant.App/MainWindow.xaml:16-18`；`MainWindow.xaml.cs:56-69`；`PrototypeBridge.Settings.cs:12-21`（后二者同属该 App 目录）；`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:34-53`、`operation-sidebar.css:72-84`、`settings-modal.css:1-7`。
4. 清理旧导航声明、无引用回调与已被替换的测试/文档说明；保留旧 URL 的前端归一能力，不因清理移除已承诺兼容。

不做：删除活跃 PrototypePage、原生文件选择能力、业务 ID 校验或设置数据接口。PrototypePage 的整个退役属于 Electron 实际接管后的独立范围。

验收标准：

- 仓库不再有退役页面生产引用，AutoMap 的映射结果不变；不把 UI 不可达误判成业务静态方法无用。
- 没有空原生占位或跨原生内容层级残留，设置仍支持加载、关闭、焦点恢复和变更通知。
- 不重新引入宿主业务导航，不修改 busy/取消规则、计划任务参数或结果 ID 生命周期。
- 文档按第 8 节的事实归属更新；本轮仅列清单，后续对应 PR 才修改。

失败回滚：通过独立回退 PR 恢复本次清理所需的文件、调用和测试；保持切换后的前端导航契约，不因恢复一个旧文件就复活 app.navigateNative。若要回到整个旧导航架构，必须按切换段的完整匹配包回退，不以局部清理回退代替。

## 6. 决策记录

| 编号 | 已定决策 | 理由 | 被否决的替代方案 |
|---|---|---|---|
| ADR-01 | 兼容段只集中路由表、导航入口、拆测试契约及归一旧前缀，仍由 app.navigateNative 驱动；正常七入口行为零变化。前端写 URL 与宿主退出每页握手在切换段同一 PR 原子完成 | 旧校验强制比较 route/navigation；半套切换会使 ready 无效并触发整页隐藏。依据：`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:89-96`；`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:131-133,187-193` | 前端先切页、C# 以后再改；双端同时写 URL；为兼容而放松旧 ready 校验。旧前缀修正的零变化边界见 4.2 |
| ADR-02 | 模块切换继续 replaceState，不新增返回/前进历史；变化及时写回 URL，完整重载/重试恢复模块 | 保持已有历史行为，同时使 URL 能承载重载状态。现状依据：`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:119-127`；现有完整重载入口：`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:21` | pushState 新增模块历史；只改内存 route；让 C# 默认模块覆盖当前 URL |
| ADR-03 | 过渡期保持 `/index.html?route=…`，navigation 不再决定业务页；Electron 来源/localStorage 留到后续 | 当前来源检查限定 /index.html，不能把装载协议变化混入导航权切换。依据：`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:82-87` | 直接改 pathname；在此选择 Electron scheme 或清空/搬迁浏览器存储 |
| ADR-04 | 保留按文档加载 ID 的启动确认，可沿用 app.ready；业务路由就绪交前端，route 仅日志；启动标准为外壳和首路由可呈现，不等业务查询/iframe | 分开宿主装载与业务切页，仍防旧文档误显示；保持当前 mounted 路由边界。依据：`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:59-64`；`routes/RouteReady.tsx:4-7`（同一 src 目录）；旧文档保护现状见 `src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:89-96` | 删除全部启动确认；只用文档加载事件；等待业务查询/iframe 才显示；继续要求 C# 当前 route 一致 |
| ADR-05 | 忙碌时切页/关窗保持现状，切页不主动取消已发操作、不新增守卫；守卫独立登记 | 当前没有统一导航/关窗业务拦截，后端忙碌锁按操作释放；不顺带改变业务执行。依据：`src/ProductionAssistant.App/MainWindow.xaml.cs:41-65`；`PrototypeBridge.PlanPdf.cs:18-19,75`、`PrototypeBridge.Meeting.cs:15-16,37`（同一 App 目录） | 本迁移中禁止切页/关窗；离页清锁或强制取消。此决策不保证关窗或进程退出后任务还能继续完成，该能力未确认 |
| ADR-06 | 页面卸载即重置，不恢复；明确记录前端重置而后端 auditId/resultId 保留；Electron 再确定业务会话长驻 | 保持现有状态边界，不扩展成恢复系统。依据：`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:55`；`src/ProductionAssistant.App/PrototypeBridge.PlanPdf.cs:10-75`；`src/ProductionAssistant.App/PrototypeBridge.Meeting.cs:9-37` | 常驻所有页面；新增恢复接口；离页把后端结果一起清空；默认后端可逐请求重建 |
| ADR-07 | 前端与宿主同包原子切换，不支持新旧混配，不静默忽略导航；切换后“新旧宿主跑同一份前端”不再成立 | 握手、URL 写入与 transport 语义必须一致，避免半套协议被伪装成成功。现有耦合依据见 3.1；WebView transport 检测见 `src/ProductionAssistant.App/Assets/Prototype/src/bridge/index.ts:3-14`、`bridge/webview.ts:31-41`（同一 src 目录） | 单独更新前端或宿主；导航 no-op 假成功；把未来另一宿主未经适配直接视为受支持组合 |

## 7. 风险清单

以下是待防范场景，不表示本轮实际复现了卡死、白屏或数据问题。

### 7.1 兼容段

- 集中化时误增第二个 URL 写入方，产生重复切页；或保留宿主 `_currentTag` 却只本地切页，导致再次点同标签被宿主短路。依据：`src/ProductionAssistant.App/MainWindow.xaml.cs:43-46`；`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:33`。
- 旧前缀归一后直接把新业务 route 用于旧 ready，宿主 expected route 不匹配。依据：`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:89-96`。必须按 4.2 区分展示与旧握手，不把未确认的旧地址来源当作已验证兼容。
- 路由集中误改 daily-report、大小写或默认回退。依据：`src/ProductionAssistant.App/Assets/Prototype/src/routes/index.ts:5-16`；`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:65-80`。
- 测试只改成断言新函数被调用，漏掉加载中切走和旧 ready 拒绝。现有回归依据：`src/ProductionAssistant.App/Assets/Prototype/src/app/App.startup.test.tsx:18-60`；`tests/ProductionAssistant.Tests/ArchitectureTests.cs:165-173`。

### 7.2 切换段

- 半套前端/宿主部署，旧 ready 校验或 15 秒等待仍运行，导致整个 WebView 隐藏。依据：`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:131-133,158-193`。
- 去掉 navigation 参数却保留非空检查，或业务切页复用旧 navigation 去重机制。依据：`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:94`；`src/ProductionAssistant.App/Assets/Prototype/src/bridge/webview.ts:23-25`。
- 宿主重试仍从旧 `_route` 构造 URL，丢失前端当前模块。现状依据：`src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:119-127,171-177`。
- 改 pathname 使受信路径不再匹配，或把 Electron 的新文档来源误当当前来源可直接替代。依据：`src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:82-87`；未来 Electron 来源未确认。
- 删除 navigation key 而没有替代错误边界重置，同路由失败后无法恢复。依据：`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:16-22,59`。
- 切页后前端结果丢失、后端仍忙，返回页面重试时遭拒；重发写入是否产生业务重复取决于对应幂等规则，不能靠导航层保证。依据：`src/ProductionAssistant.App/Assets/Prototype/src/features/plan-pdf/PlanPdfPage.tsx:30-32,52-68`；`src/ProductionAssistant.App/PrototypeBridge.PlanPdf.cs:18-19`。
- 直接换宿主但没有原生能力 transport，生产调用报未连接桌面宿主。依据：`src/ProductionAssistant.App/Assets/Prototype/src/bridge/index.ts:8-14`；`bridge/webview.ts:31-41`（同一 src 目录）。

### 7.3 删除段

- 把原生生产消息页面整体删掉，破坏仍使用的 AutoMap/MappingAliases。依据：`src/ProductionAssistant.App/PrototypeBridge.cs:366`；`src/ProductionAssistant.App/Pages/ProductionMessagePage.xaml.cs:11-29,470-492`。
- 删除 C# 侧 Frame 或 settings.close 时误删设置数据读取；清理 CSS 时误删整个设置样式文件。依据：`src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:45,52-53`；`src/ProductionAssistant.App/PrototypeBridge.Settings.cs:12-21`。
- 删除页面时顺带删文件选择 Task.Yield、业务结果 ID 或操作级锁，可能引入选择器重入、无效结果访问和并发问题。依据：`src/ProductionAssistant.App/PrototypeBridge.cs:54-56`；`PrototypeBridge.PlanPdf.cs:18-19,37-38,75`、`PrototypeBridge.Meeting.cs:15-16,32-37`（同一 App 目录）。
- 把 PrototypePage 当旧业务页删除，提前移除仍在工作的 WinUI 装载与错误层。依据：`src/ProductionAssistant.App/MainWindow.xaml.cs:37`；`src/ProductionAssistant.App/Pages/PrototypePage.xaml:7-12,90-99`。

## 8. 协议文档与 DESIGN.md 待更新清单

本轮只读跟踪检查：`git ls-files .codex` 输出为空，当前 `.codex` 下没有被跟踪文件；`git check-ignore -v .codex/docs/ARCHITECTURE.md` 返回 `.gitignore:57:/.codex/`，对应路径为 `.codex/docs/ARCHITECTURE.md`，确认该文件被根目录 `.gitignore` 第 57 行的 `/.codex/` 规则忽略。因此本节 `.codex/docs` 对应条目无法按当前跟踪状态进入 PR。用户已确认：保持本地维护，不迁入 `docs/`，不修改 `.gitignore`；相关条目按对应实现阶段在本地同步。本轮不修改 `.codex` 文件或忽略规则。

本节只列位置和应改事实；被跟踪文件留给对应实现 PR，本地 `.codex/docs` 条目保持本地维护，不作为 PR 内容交付。本轮不修改任何现有文件。根目录/公开 docs 使用现有命名；本地 `.codex/docs` 的事实归属同样列入，不能因为不在公开文档目录就遗漏。

| 现有文件与行号 | 待更新内容 | 触发阶段 |
|---|---|---|
| 独立 PrototypeBridge 协议文档：被跟踪文件中未发现 | 本轮对 git ls-files 中文件名含 protocol 或 bridge 的条目作不区分大小写检索，未发现独立协议文档；协议实现位于下文所列代码，不能将代码当作文档。命中的 tests/tencent-sheet/check-protocol.cjs、check-site-protocol.cjs 内容未核对，不据文件名认定为独立 PrototypeBridge 协议文档。若另有独立文档，取得实际路径后再更新 app.navigateNative 退役、app.ready 文档启动语义、四类 ID、来源与原子发布约束 | 实际路径与维护归属确认后随对应实现更新；本文不新增第二份协议文档 |
| `.codex/docs/ARCHITECTURE.md:113` | 白名单和设置职责补充导航 operation 退出、settings.close 退役条件；业务操作继续保留 | 切换/删除 |
| `.codex/docs/ARCHITECTURE.md:126,130,136-140` | 将原生业务覆盖、每页令牌 ready、route-start/route-ready 改为前端路由所有权、文档启动确认和分层计时；保留受信来源与能力白名单 | 切换；删除段去旧分支表述 |
| `DESIGN.md:81,109-115` | 更新逐模块原生替换/右侧覆盖假设；保留唯一外壳。222/48、环境标记属于当前 WinUI 几何与窗口职责，Electron 阶段再确定替代，不提前宣称移除 | 切换/删除；窗口规则在 Electron 阶段 |
| `DESIGN.md:180,185-200` | 说明两个 iframe 的独立文档与日期 Portal 不随顶层导航迁移；186、197 行的 HTML 路径仍是整理前位置，后续按实际 feature 路径校正，不顺带重写编辑器规则 | 对应文档维护/iframe 独立任务 |
| `.codex/docs/PRD.md:47,72,107,528,538-549` | 更新原生右侧覆盖和每页 ready 验收；538 行“不丢业务状态”与当前卸载重置、已定 ADR-06 不一致，应明确“不重建宿主”不代表“恢复页面状态” | 切换/删除 |
| `.codex/docs/OPERATIONS.md:43-47` | 替换原生右侧覆盖验收，区分启动失败/重试与前端路由失败；继续保留真实桌面验收边界 | 对应实现交付 |
| `.codex/docs/HANDOFF.md:153-157` | 删除旧业务页后补充当前入口/退役记录与 AutoMap 迁出位置；历史记录标明时态，不伪改历史验证为新验证 | 删除 |

协议代码的实现同步清单是 `src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs:5-96` 和 `src/ProductionAssistant.App/PrototypeBridge.cs:17-95,188-194`，它们不是已找到的“协议文档”。新契约落地前，现有代码仍是当前行为依据，本文是后续设计依据。

## 9. 未确认/差异与后续独立任务

### 9.1 抽查结果与差异

- 代码基线仍为 285476f，导航链路、47 行 ID 生成、119-127 行 URL 构造、15 秒等待、ready 特判/匹配、AutoMap 调用及业务结果字段等关键抽查点与提供的事实依据一致，没有发现这些关键行号漂移；依据见第 3 节逐项定位。
- 本轮对被跟踪文件名作 protocol/bridge 不区分大小写检索，未发现独立 PrototypeBridge 协议文档；已定位协议代码和 `.codex/docs/ARCHITECTURE.md:113,130-140` 的本地相关说明。`.codex` 没有被跟踪文件，架构文档被忽略，不能把这些本地说明列为已随 PR 交付的协议文档；跟踪检查结果见第 8 节。仓库外是否另有独立文档、实际路径及维护归属未确认，不能据此声称协议文档已更新。
- 现有 `.codex/docs/ARCHITECTURE.md:126,136`、`DESIGN.md:111` 仍保留原生右侧覆盖叙述；当前七入口均为 React，旧分支只是保留兜底，依据 `src/ProductionAssistant.App/MainWindow.xaml.cs:49-65`。按第 8 节列为文档差异，不修改原文。
- `.codex/docs/PRD.md:538` 的切页状态表述与当前 `src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:55` 及 ADR-06 不一致；以代码和本次已定决策为准，不承诺页面恢复。
- `.codex/docs/ARCHITECTURE.md:130` 称设置窗口 lazy 加载，但当前 `src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:14` 是静态导入；该事实在后续相关段落更新时校正，不扩展成性能修改。
- “兼容段行为零变化”的边界按 4.2 明确：正常入口不变，旧前缀归一是已授权兼容修正。带旧宿主令牌的地址来源和握手组合未确认，必须在该兼容 PR 验证，不能跳过。
- “后台继续”只确认切页不主动取消已发操作；没有窗口关闭守卫不等于关窗后进程/任务能继续完成。关窗后的任务完成保证未确认；本次不增加该能力。依据：`src/ProductionAssistant.App/MainWindow.xaml.cs:41-70`；`src/ProductionAssistant.App/PrototypeBridge.cs:58-70`；ADR-05。

### 9.2 未确认项

1. 独立协议文档的实际路径与维护归属；当前被跟踪文件中未发现独立 PrototypeBridge 协议文档，不能捏造路径或把协议代码当作文档。已有本地相关说明及跟踪状态见第 8 节。
2. 仓库外旧 navigation:* 地址的真实来源、是否携带旧宿主令牌；不能以测试构造地址推定实际外部兼容已完成。测试依据：`src/ProductionAssistant.App/Assets/Prototype/src/app/App.test.tsx:349,457,492,549`。以上仍未确认；#49 仅有自动化测试，真实桌面未验证，不得视为通过。【切换段之后宿主不再产生 navigation: 前缀地址，前端仍保留归一能力；外部来源未确认的状态不变。】
3. Electron 文档来源、能力 transport、localStorage 迁移及后端业务会话是否长驻；不能假设当前 WebView 通道直接可用。依据：`src/ProductionAssistant.App/Assets/Prototype/src/bridge/index.ts:3-14`；`bridge/webview.ts:31-41`（同一 src 目录）。
4. 文档加载 ID 的最终字段命名、启动计时边界和前端同路由重试的具体接口；语义已由 4.2-4.3 固定，实现形状在对应 PR 评审，不重新开放七项决策。未确认的设计张力：4.3 与 5.2 同时要求“宿主重试基于重载当前文档”和“重试更换文档加载代次”；若加载代次通过 URL 的 navigation 字段承载，直接重载当前文档会带回旧代次，两项要求无法同时满足。切换段实现设计需要在候选方案中二选一或另定方案，例如：代次不放在 URL、由宿主通过其他通道传递；或将重试改为受控的整文档导航，并明确当前 route 与其他参数的保留及加载代次更新规则。这里只记录张力和待决事项，不预选方案，不重新开放七条已定决策。【2026-10-20 已决：选用整页导航方案，见 5.2.1。URL 参数名仍为 navigation，C# 内部变量为 _loadId，线上参数改名留到 Electron 阶段。】
5. 实际桌面加载、超时/晚到 ready、系统对话框和关窗期间业务结果的运行表现；本轮只读抽查，没有执行构建、测试或桌面验收，不能标记通过。【2026-10-20 切换段测试版桌面验收已覆盖：启动、七模块切换、F5、设置、文件选择器打开与取消、启动超时与重试；未覆盖：关窗期间业务结果、晚到 ready 的人工复现、正式版，见 5.2.1。】
6. WebView2 的 Source 是否反映 history.replaceState 后的 URL，以及“重载当前文档”是否保留该 URL：均未确认，必须在真实桌面验证，并作为 5.2 切换段验收前置项；不能由当前重新设置 Source 的重试代码或浏览器/DOM 测试推定通过。【2026-10-20 已确认：Source 反映 replaceState 后的 URL；重载当前文档保留该 URL；结论与实测范围见 5.2.1。】

### 9.3 后续独立任务

| 任务 | 范围与边界 | 现状依据 |
|---|---|---|
| AutoMap 从旧页面迁出 | 需单独授权 C# 改动；确定迁入 Core 或 Infrastructure 的具体归属，迁出方法和 MappingAliases，更新正式 bridge 调用后才允许删旧页面 | `src/ProductionAssistant.App/Pages/ProductionMessagePage.xaml.cs:11-29,470-492`；`src/ProductionAssistant.App/PrototypeBridge.cs:366` |
| 忙碌切页/关窗守卫与取消契约 | 单独决定阻止、确认或后台继续；若增加取消，按请求/业务会话定义，不能依赖当前 route 或 `_activeOperation` 最后登记项 | `src/ProductionAssistant.App/MainWindow.xaml.cs:41-70`；`src/ProductionAssistant.App/PrototypeBridge.cs:58-70` |
| WebView 环境初始化超时 | 当前 GetEnvironmentAsync/EnsureCoreWebView2Async 不受之后的 15 秒 ready 计时保护；独立修复，不把本迁移验收写成已覆盖该缺陷 | `src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs:74-92,131` |
| daily-report 目录改名 automation | 独立纯路径整理；更新 App、SettingsModal、目录外测试引用和相关文档，保持 daily-report 路由标签及业务 operation/存储 key | `src/ProductionAssistant.App/Assets/Prototype/src/app/App.tsx:8`；`app/SettingsModal.tsx:3`（同一 src 目录）；`routes/index.ts:11` |
| iframe.srcdoc 两个工作面 | 独立评估 DOM/脚本、样式注入、字体、Portal 和异步清理；本迁移不将“启动 ready 不等 iframe”写成 iframe 已完成迁移 | `src/ProductionAssistant.App/Assets/Prototype/src/features/daily-report/MessageTemplatePage.tsx:22-36,146-174`；`src/ProductionAssistant.App/Assets/Prototype/src/features/daily-report/notion-fill/NotionFillPage.tsx:25-44,237-281` |
| ReportEditor 独立协议 | Electron 阶段单独适配或退役，先核对真实调用者；不能因为 Prototype 统一 bridge 就声称已覆盖 | `src/ProductionAssistant.App/Assets/ReportEditor/editor-source.js:5,67,156,170` |
| Electron 会话与持久状态 | 明确 C# 能力进程/业务会话生命周期及旧浏览器存储迁移，不以页面卸载重置替代后台结果生命周期设计 | bridge 状态见 4.4；localStorage 现状见 `src/ProductionAssistant.App/Assets/Prototype/src/features/daily-report/dailyFieldCache.ts:11-34`、`message-template.html:20-21,37`（后者同目录） |

本轮交付止于本文档。后续实现、删除、发布及部署回退均需在各自授权范围内执行，不由本文自动触发。
