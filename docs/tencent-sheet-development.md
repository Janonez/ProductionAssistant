# 腾讯文档填报

当前 T2.1 开发入口：数据报送 → 集团填报，直接打开正式 React 业务工作台，只有“填报 / 历史记录 / 设置”三个标签。旧录制和高级配置仍通过工作管理 → 任务清单进入已有任务。仅生成 Development，不更新 Production；任务、浏览器登录资料和记录继续按运行环境隔离。T1/T1-A 真实扫码与会话验收尚未关闭。

## T2.1 第一阶段：当前正式业务页面

- 正式地址仍为 `?route=daily-report&taskType=tencent_sheet_fill`，由 `App` 直接导入并渲染 `GroupSubmissionPage`，不经过 `AutomationPage` 或通用任务详情，不增加 Demo 或第二个集团填报路由。集团页面不再单独懒加载，避免沿用 daily-report 的自动化任务 Skeleton；异步读取连接列表和配置时使用共享 shadcn Skeleton 组成的四指标业务占位。其他页面的 lazy / Suspense 保留。
- 页面拆为 `GroupSubmissionPage`、`SubmissionWorkbench`（含 `SubmissionDataTable`）、`SubmissionHistory`、`SubmissionSettings`、`SubmissionConnection`；会话复用原 `TencentSessionPanel`。Tabs / Card / Table / Alert 采用项目固定的 shadcn-admin 来源，Button / Input / Dialog / DropdownMenu 复用已有组件。主题继承实际入口 `src/styles/shadcn-shell.css`、其导入的 `shadcn-theme.css` 和共享字体，无新增主题或业务 CSS。
- “填报”显示后端计算的业务日期、下料量、焊接量、板材入库量、型材入库量。尚未取数使用“—”，不补零。取数 → 检查目标 → 确认填报目前只说明流程；当前可操作的下一步进入文档设置，不提供无行为的执行按钮。
- “设置”按 `automation.list` 中真实 `taskType` 读取已有文档。无配置时可保存连接；已有多个配置可选择，也可添加连接。复用 `tencentSheet.create/save/get`；保存携带 `configRevision`，只传文档链接，由原服务保留字段、定位和执行配置。草稿跨标签保留，可显式放弃；未保存时禁用目标检查和文档切换，已启用任务不能修改链接。
- 会话链路为 `SubmissionConnection → TencentSessionPanel → invoke → Electron IPC → Sidecar 白名单 → OperationDispatcher → TencentSessionService → TencentSheetService / JSONL Worker → Edge 持久化 Context`。复用 `sessionStatus/Open/Verify/Close`，不改会话核心、不清 Profile、不试写；链接保存复用 `TencentSheetAsync → Worker validate → TencentSheetTaskHandler.Save` 的本地存储与修订保护。
- “历史记录”调用已有 `tencentSheet.runs`，读取原任务 JSON 内的记录，无新数据库。保留后端原始执行结果、阶段、错误和实际存在的取数快照。持久化 `data` 由 `SerializeToNode(TencentDataRow)` 产生，按 `Id/Name/Value/Unit/Source` 原始大小写读取。旧契约不包含逐字段保存结果，取数快照不能作为文档保存成功证据。
- 加载和失败状态直接呈现，可重新读取；新页面不调用 Sidecar 尚未开放的取数、目标检查、正式写入或调度操作，不编造成功状态。代码完成、自动验证和真实 Electron 人工验收分别记录在 [STATUS.md](../STATUS.md)。
- 集团填报的实际滚动容器为 AppLayout 的 `.pa-page-scroll`，仅该入口设置 `scrollbar-gutter: stable`。三标签沿用 Radix Tabs，无内容位移动画；不固定卡片宽度、不补偿 margin、不禁用全局动画，其他页面滚动设置保持原样。浏览器回归启用实际滚动条，等待字体与有限动画结束，核对空/长历史及设置页的左边缘和宽度。

### 新旧消费者与后续边界

| 能力 | 当前消费者 | 后续处理 |
|---|---|---|
| 集团填报正式入口、连接、会话、历史读取 | 新三标签业务页面 | 第一阶段人工验收 |
| 通用新建任务、旧五 Tab 详情 | 任务清单、`automationTaskTypes` 仍使用 | 自定义和执行能力迁移通过后再清理 |
| 控件录制、自定义字段绑定、位置示范、工作表识别和高级定位 | `TencentSheetPage` 及其子组件保留 | 第二阶段补齐获授权的 Bridge/Sidecar 纵向切片，再迁移和清理旧消费者 |
| 取数、写前检查、一次性确认、写入、保存确认、刷新回读、调度 | 原服务与旧配置消费者保留，新页面不调用 | 第三阶段复用原 token、非空保护和结果未知阻断，不测试生产写入 |
| 日报、原材料入库和任务清单 | 原 `AutomationPage` 保持 | 不属于本轮，不删除 |

上述录制、执行和调度操作尚未获 Sidecar 开放，不能因为旧 UI 按钮存在就宣称已在 Electron 可用。当前没有可安全整块删除的旧详情或录制组件；正式入口已迁走，任务清单与注册表消费者仍需保留。新设置中保留映射、自动执行、高级设置的独立区域及现状说明，不放置假功能按钮。

### T2.1 Electron Development 人工验收（自动验证通过后）

1. 从仓库根目录运行 `npm.cmd --prefix src/ProductionAssistant.Desktop start -- --environment Development`，进入“数据报送 → 集团填报”，确认直接出现填报 / 历史记录 / 设置，无通用任务列表和旧五 Tab。
2. 检查四项指标、日期、“—”未取数状态及当前进入设置的操作；检查浅色/深色、960px 最小宽度、滚动和 F5。当前不得出现可执行的正式填报按钮。
3. 在设置读取、编辑、保存或放弃链接；切换标签保留草稿，保存后切页、刷新、应用重启均恢复真实配置。多个连接分别核对配置隔离；无效链接或修订冲突必须报错，不能覆盖原有效配置。保存本身不打开 Edge。
4. 打开并检查浏览器，按腾讯官方页面完成真实登录，再重新检查；核对加载、登录、访问、未知权限、权限不足和恢复建议。关闭浏览器后当前身份/访问归未知，保留登录资料；重新打开使用原 Profile。扫码、冷启动复用和跨宿主独占仍须沿用下文 T1-A 的人工检查。
5. 历史记录显示真实数据，待确认不得变成成功；详情区分取数快照与保存结果。确认其他业务与任务清单旧配置入口保留。全过程不输入生产业务单元格、不启用调度、不重置 Profile。

本阶段自动验证结果和停止位置见 STATUS；完成后等待用户验收，不提交、推送、创建 PR、合并或更新稳定版。Edge `--no-sandbox` 提示仍是独立待办，本轮不调整或隐藏。

## 原配置层级（任务清单中的保留消费者）

后续配置与录制器重构遵循[自动化配置设计原则](frontend-ui-standards.md#自动化配置设计原则)。以下章节描述现有配置和录制实现，不作为冻结旧交互或预先删除自定义能力的依据；能力保留与交互替换须先评估，并按对应阶段授权实施。

一个填报任务拥有以下并列配置：

- 文档：分享链接、工作表名称与月份匹配规则。
- 网页控件：`config.webControls`，包括 Sheet 标签集合、单元格名称框、内容编辑区及可选保存状态位置。通过 `TencentWebControls` 录制、测试后保存；保存时核对测试凭据和位置，不重新要求当时的文字或可编辑状态。
- 业务字段与填写位置：`config.fields` 保存名称、单位、Teable 绑定；`config.rules` 以稳定字段 id 保存位置规则、日期锚点和文字锚点。
- 执行规则：`config.businessDateRule` 决定数据日期；`config.executionSchedule` 决定执行星期和时刻。

页面按提供的 `production-assistant-redesign.html` 源码拆为五个互斥 Tab：文档与账号、网页控件、业务字段、执行规则、测试与上线。顶部常驻真实状态条和启用时的停用横幅；前台／后台测试通过分段控件切换，运行记录收在测试页。录制、扫码、绑定及运行中禁止切换 Tab，未保存配置保存在页面状态中。样式直接取自 Demo 并限定在 `.tencent-demo`，按最新要求继承应用共享字体（Inter Variable / Noto Sans SC Variable），固定页面背景为 `rgb(250, 250, 249)`（`#FAFAF9`）并使用浅色控件，保留 520px 断点；业务子组件仅增加必要适配。新建时只填写链接，控件录制不再是创建任务的前置流程。不再建立、选择、重命名或更新跨任务共享适配。网页控件不包含具体业务位置，业务位置示范需要先有可用的网页控件。

## 原配置界面的使用（任务清单入口）

1. 从“工作管理 → 任务清单”新建或进入原腾讯文档任务。旧界面修改链接后点击“保存文档配置”，未保存值只作草稿，离开任务会丢弃。保存不启动浏览器；打开并检查、重新检查仍复用同一会话实现。以下录制和执行步骤描述旧能力，未向 Sidecar 开放的操作不能据此视为 Electron 可用，本轮不执行真实填报。
2. 在“网页控件”板块录制三个必需控件，可另外录制保存状态控件的位置，无需等待特定提示文字。已有三个控件可保留，只补录保存状态，重新测试后保存到当前任务。保存会废弃旧取数/位置预览；不会修改其他任务。
3. “识别并检查”只检查已保存的定位并读取 Sheet 名称，不猜测 DOM 序号或自动生成候选定位。选择工作表后保存文档配置。
4. 在“业务字段与填写位置”中新增业务名称及单位，选择现有 Teable 数据库、数值字段、日期范围或真实 View，然后示范业务位置。
5. 配置执行规则并保存。保存规则不会自动启用定时。
6. 前台测试：取数 → 核对来源/日期/数值 → 检查位置 → 一次性确认写入。后台自动测试：一次触发重新取数、检查、真实写入及保存确认。

业务位置示范：选择同月两个日期，分别记录目标格，再记录第一个日期的日期表头和固定文字标志。程序验证第二、第三个日期，并选中第三个预测位置；用户确认当前选区正确后保存。示范只推断位置关系并只读核对表头，受保护、只读或已有数据的格子均可使用，不要求业务格可编辑，不聚焦编辑区或输入测试值。每个字段可独立横向或纵向排列，同一任务仍只面向一个按名称匹配的工作表。

## 数据与日期

v1.7.0 起由 Teable 提供正式数据库查询，沿用原来源、字段和视图 ID；内部 `TencentSheetNotionService` 和配置键 `notion` 保留兼容，不调用 Notion 网络。数据库配置与验证见 [Teable 业务接入](teable-business.md)。


- 新任务字段为空，不注入下料、装焊、公司、园区、行列或月份名称默认值。
- `TencentSheetNotionService` 复用现有 `IDatabaseQueryProvider` 与全局凭据，字段只保存引用。日期范围或 View 相同的查询在一次取数中复用；View 沿用数据库原筛选。
- 空记录、空值和非数字结果报错，不自动补 0；真实数值 0 可写。支持 number 及实际数字结果的 formula/rollup。
- 业务日期可为相对执行当天的整数偏移或固定日期。执行当天按北京时间计算；临时补填日期仅影响当前操作。
- 一次取数后日期固定，后续月份匹配、位置计算、检查、写入沿用同一天，不跨午夜重算。
- 取数快照绑定任务、完整配置及业务日期，5 分钟有效；写入预览另外绑定任务、配置、位置、数值，2 分钟有效且一次消费。切换任务、修改配置或重录控件会清空页面旧预览。

## 网页操作与安全边界

- 保存的是唯一、可复用的名称框与编辑区定位，不是某个业务单元格。Sheet 通过后，用户先在该表选择任意一个可编辑的空白格，再录制名称框；录制后读取当前地址作为临时测试格，然后录制编辑区。名称框无有效单格地址时仍保留录制信息，选择空白格后通过“读取当前测试格”重试。保存状态控件可无文字、显示保存中或任意提示，示例文字仅用于展示。实际执行仍检查业务目标地址、可编辑性、保存失败或离线，并通过刷新回读确认数据；状态未知不会自动判为成功。“上次修改是某人在若干小时前进行的”识别为空闲提示，不作为本次保存成功的单独证据。

- 只有 `site-adapter.cjs` 的录制器产生新控件规则：悬停高亮，点击记录而不执行原动作。支持稳定 CSS、role/name、placeholder 及唯一 iframe 路径，不按坐标或 DOM 序号兜底。
- 名称框、编辑区录制将点击元素归一到真正的 input、textarea、contenteditable 或 textbox：优先自身/包含关系，再检查点击区域和最多两层邻近容器中的唯一输入元素。多个候选时要求精确点选，不跨整页猜测；录制时的 role 不代替检验和正式写入时的可编辑性检查。
- Sheet 点选后立即调用 `tencentSite.testSheet` 独立检验，不要求先录制名称框或编辑区。展示标签数量、可展开的全部名称、本月匹配和选中状态；通过后才继续录制其他控件。已有录制可直接“重新检验 Sheet”，失败时保留集合结果和录制信息供重试。按北京时间今天推算目标月份，禁止为了学习选中状态往返点击历史月份。复用已录制且唯一的选中规则，也识别标签自身或子元素上明确的 selected/active/current、ARIA 选中标记；目标月份已选中时不再次点击，否则仅点击目标标签并确认唯一状态转移。无法确认或目标不存在时停止，不定位单元格。
- 选中状态确认使用任务配置的超时时间；超时停止，不继续定位单元格。正式填写等待 Sheet 时也会反复重新解析当前选中标签，覆盖异步切换及纯样式定位。
- `tencentSite.captureCell` 读取当前单格地址，临时测试格只保存在本次 worker 会话与界面草稿中，不写入任务配置。更换测试格不需要重新录制两个控件，但会使旧保存凭据失效。重开文档、重录名称框/Sheet、重新检验 Sheet、任务配置或日期变化后须重新读取；临时测试格绑定任务、文档、Sheet 与名称框定位，10 分钟有效。
- “检验单元格控件”复用独立 Sheet 检验凭据，先复核本月仍选中，再通过名称框跳转到已读取的临时格。不按今天的业务规则选测试位置，`controlTestTarget` 只决定测试 Sheet，不计算单元格地址。检验单格地址、编辑区可编辑且空白、聚焦后地址/内容不变，全程不输入测试值。非空或受保护时提示选择另一空白格并重新读取，不清空或强行写入。单元格检验失败保留 Sheet 结果。全部通过后统一保存；保存凭据绑定任务、配置签名、URL、控件、测试日期和临时格，10 分钟且一次消费。正式执行继续通过 `core.plan` 与 `TencentSheetClient` 定位和写入业务目标，不读取临时测试格。
- 后台打开页面后，先等待录制的标签集合与目标名称出现；即使尚无选中标识也可按唯一名称点击一次，再等待目标的选中标识。确认目标 Sheet 后才等待名称框/编辑区并读取业务位置。标签容器、集合、目标名称和选中标识均有独立超时原因；保存控件、识别页面和位置示范共用就绪检查。
- 名称框与编辑区在后台新开页面、切换 Sheet 和回读时按配置超时等待就绪：要求唯一、可见、可编辑，名称框还须显示有效单元格地址。控件等待只重试读取，不重试业务数值输入或提交；超时分别说明未出现、重复、不可编辑或地址未就绪，登录失效立即停止。
- 正式业务定位在名称框回车并失焦后，每约 100ms 核对一次地址，目标地址持续稳定至少 200ms 才继续；每次最多等待 3 秒（不超过配置超时），地址未稳定时仅重新获取名称框并重新定位一次。解析编辑区后再次核对地址；两次均失败则停止，并在错误中记录定位前地址、返回地址变化和耗时。不会因此重跑整批写入，日期/项目锚点、空值及写前检查继续保留。
- `TencentSheetClient` 同时服务前台和后台。写入前校验日期/项目标志及所有目标空值，输入前再核对地址和空值，输入后 Enter 提交并离开回读。任何非空值（包括 0 和相同数字）都阻止覆盖。
- 位置示范的开始、切表、四次捕获、预测验证及保存确认使用只读路径。捕获直接读取当前地址和内容，不重新激活编辑；预测仍可通过名称框导航，但读取表头及预测格时不要求内容编辑区可编辑。只读选项仅由示范调用显式传入，正式检查/写入仍使用默认的可编辑性校验；示范通过不代表目标可写。
- 最终保存确认沿用状态观察、延迟刷新和回读。刷新后在 30 秒期限内等待名称框、编辑区、选中 Sheet 恢复；只重试控件发现，不重复输入。保存结果不确定时保留错误和已提交地址。
- 后台关闭同一 worker 的前台浏览器，以专用 profile 打开无头 Edge，结束后关闭；保留登录状态。其他进程占用 profile 时失败，不复制凭据或抢占浏览器。
- 页面关闭、登录失效、模板/权限/非空冲突均停止。仅对明确的读取网络瞬断重试两次；不重跑整个写入。

## T1-A 文档配置与会话管理

- `TencentSessionPanel` 只接收任务已保存的 `config.documentUrl`，不再提供脱离任务、只存 React state 的链接输入。任务内文档输入、保存与放弃操作复用现有 shadcn-admin / shadcn/ui 组件和主题边界；不增加数据库、配置框架或依赖。
- `tencentSheet.create/save` 继续使用既有 Bridge 分发、Worker 配置校验和 `TencentSheetTaskHandler` 本地存储。链接仅接受指定腾讯文档 HTTPS 域名、默认端口和无用户信息的 URL；保存校验任务及 `configRevision`，只接收文档、工作表引用、业务日期和执行规则字段，并拒绝修改已启用任务的配置。失败不覆盖原有效配置，保存不打开浏览器。
- 会话调用链：React `invoke` → Bridge（Electron 经可信主 Frame IPC 与 Sidecar 白名单）→ `TencentSessionService` → 同一个任务服务与 JSONL Worker → `TencentSession` / `TencentDocsBrowser` → Edge。继续使用 `tencentSheet.sessionStatus`、`sessionOpen`、`sessionVerify`、`sessionClose`，没有新增重复接口。
- 进入文档页、已保存目标变更及窗口重新获得焦点时读取后端状态；浏览器运行时每 5 秒读取状态，不要求用户点击“读取当前状态”。“打开并检查”打开或复用可见 Edge 并检查；“重新检查”等待当前 SPA 身份和文档访问证据并直接展示新响应；“关闭浏览器”可中断在途检查，但保留登录资料。
- 状态字段为 `state`、`browserOpen`、`authentication`、`documentAccess`、`editPermission`、`verifiedAt`、`message`、`code`、`recoveryHint`。综合状态包含 closed / login-required / authenticated / access-denied / loading / unverified / unavailable / profile-busy；浏览器、登录、文档访问和检查时间分别表达，编辑权限只确认明确只读或保持未知，不试写。
- 只有目标地址、可见账号区、表格标签及无登录提示的当前证据才能确认身份与访问；二维码消失、匿名可读或手机确认不算成功。每次观察原子读取顶层页面，不持有跨导航 Frame / ElementHandle；未知或失败保留原因及恢复建议。检查中禁用重复操作，目标变化、卸载或关闭后的旧响应不能发布成功。
- `sessionStatus` 不启动或导航浏览器；无 Worker 返回 closed，不表示账号过期。Context 关闭后 UI 的身份与访问回到未知；保留的最近检查时间明确标为历史，不能当作当前已登录。正常关闭或应用重启后“重新检查”可复用原 Profile 打开可见浏览器并重新取证。
- 沿用环境专用 Profile、Worker 生命周期租约和 Edge 原生独占。关闭浏览器及应用退出经原有 EOF / Context 关闭链路等待资料落盘，异常不重放请求；前端卸载仅丢弃过期响应，不清除登录资料。
- Sidecar 协议 81 项中允许 29 项、未迁移 52 项；T1 四个会话操作之外，T1-A 仅开放 `tencentSheet.create/save` 两个本地配置操作。独立预期集合精确核对全部成员，退役登录接口及未知操作仍在分发前拒绝。录制、取数、写入、任务启停等其他既有消费者保留，但不能据此宣称已迁移到 Electron；不扩大 T2—T6。

## 定时与记录

- 前台手动、后台自动测试、Windows 定时共用 Handler 和写入路径。所有执行均要求每个字段都有完整 Teable 绑定及位置示范，数值仅来自本次取数快照。
- Windows 任务名含当前运行环境（Development 或 Production），命令显式传环境、任务类型和任务 id。采用当前用户 InteractiveToken、有限权限、IgnoreNew；须电脑开机且 Windows 用户已登录。不开机补跑、不设置自动重试。
- 注册用 XML 以带 BOM 的 UTF-16 编码写入，避免 `schtasks /XML` 将中文程序路径读成乱码。若旧任务已启用却没有定时运行记录，且 Windows 返回 `0x80070002`，请核对任务的程序路径和工作目录；升级后停用再启用可重建正确路径，单独替换程序不会修复已注册的旧任务。
- 每个执行时刻使用一个每周 CalendarTrigger，星期与时间可组合。默认 Development 的 `Scheduler.Enabled=false`；只有环境开放且当前配置后台测试成功后，任务开关才允许启用，启用不会立即执行。
- 后台取数前保存 `phase=fetch` 记录；任何实际文档填写前保存 `phase=write` 记录。已写入或可能已写入的同一业务日期阻止定时再次执行；仅取数/检查失败允许下一个正常时刻重试。没有阶段信息的旧失败记录保守视作待确认。
- 运行记录保留最近 100 条，记录来源、日期、实际取数和错误。非空保护始终生效，历史截断不允许覆盖已有值。
- 跨进程执行锁避免并行填报，浏览器操作有独立锁。存储写入使用互斥与原子替换，保留运行记录；`configRevision` 阻止旧异步操作覆盖新配置。前端保存携带读取时的修订号。
- 已启用时先停用再修改配置。停用先保存禁用状态再移除系统任务；移除失败仍阻止后续实际执行。

## 配置重置（2026-09-14）

按用户要求，删除旧设计及全部兼容路径。仅支持任务内 `webControls`、自定义 `fields/rules` 和 `businessDateRule`；不迁移共享适配库，不读取旧选择器、固定四项业务、行列默认值或 `dateMode`，不提供手动数值输入。

Development 的腾讯文档任务配置及其中的运行记录清空，旧共享控件库删除；重新创建任务、录制控件并配置业务。专用浏览器登录状态保留，其他模块数据不受影响。

## 验证

- .NET：配置隔离、修订保护、日期边界、数据库查询/汇总、定时 XML、失败阶段与去重判定。
- 前端：同级板块、任务内录制、测试后保存、切换任务清空旧状态、前台/后台入口。
- `tests/tencent-sheet/check-rules.cjs`：规则推导、年月边界、空白新任务、必需的位置规则。
- `check-protocol.cjs`、`check-site-protocol.cjs`、`check-background.cjs`：任务绑定、一次性凭据、后台冲突/失败不重复写。
- `check-site-adapter.cjs`、`check-browser.cjs`：localhost 无头表格验证真实 DOM 录制、定位、输入与刷新确认。
- `check-cell-recording.cjs`：外层/邻近元素归一到唯一输入控件、临时格读取与更换、非空/锁定/多格拒绝，以及检验零业务输入；请求白名单测试包含 `tencentSite.testSheet` 和 `tencentSite.captureCell`。
- `check-protected-teaching.cjs`：真实示范 dispatcher/client 在 readonly input 与 contenteditable=false 的本地表格上完成开始、四次捕获、预测与确认保存；错误日期或选区仍拒绝，编辑区零输入/零聚焦，普通写入路径仍拒绝受保护目标。
- `check-save-status.cjs`：保存状态的文字/title/ARIA 录制、状态变化、点击拦截、缺失不回退及失败停止；`check-browser.cjs` 另外覆盖已保存提示存在但服务端未持久化时的刷新回读失败。
- `check-save-confirmation.cjs`：旧修改时间、未知状态和保存中不触发刷新；延迟保存、零值回读及空白零值拒绝。`--browser` 使用本地遮罩检查刷新后的名称框试点击，确保仅在可交互后回读，且不真正点击或输入业务值。
- `check-startup.cjs`：完整无头冷启动，延迟容器、目标标签、嵌套选中 class 及编辑控件，直到真实日期/文字锚点和空白格检查；不输入业务内容。
- `check-control-readiness.cjs`：延迟渲染、空地址、暂时只读的恢复，以及永久缺失、重复匹配、登录/关闭时的停止与零业务输入。
- `check-cell-location.cjs`：延迟跳转、第二次定位恢复、目标地址短暂出现后回退、持续地址不一致的有界停止与诊断信息、登录失效不重试；全程零业务输入。
- `check-selection.cjs`：当前 9 月录制未加载的 8 月，首次延迟切换、后续缓存切换、过渡期无选中标识、纯样式定位及超时停止，不输入业务数值。
- `check-ui.cjs`：正式 React 页面配模拟桥接验证会话、录制、规则、绑定、示范、前台与后台提交及 1100px 布局。后台操作前建立成功状态等待，同时断言一次请求、实际送达的成功响应、按钮恢复可用及无错误提示；通过 `role="status"` 匹配带关闭按钮的临时通知。测试自行创建截图目录，不依赖本机已有目录；模拟提交不访问生产业务单元格。
- `check-session.cjs`：默认离线状态/URL/启动关闭竞态检查，纳入 verify，保留原有所有验证步骤；`--browser` 另外使用临时 Profile 与 localhost HTTP 设置的持久 HttpOnly Cookie，验证正常关闭、独立进程复用、失效、无权限和只读，不访问真实文档。React 测试覆盖真实操作名称、未知初态、重复点击、取消后迟到响应、错误及恢复建议；.NET 测试覆盖实际 Node 子进程、跨进程锁、EOF、取消、异常退出和 Sidecar 协议。

### T1-A 自动验证与交付边界（2026-11-10）

- 完整 verify 已通过，当前数量、警告和 Development 产物核对结果统一记录在 [STATUS.md](../STATUS.md)。真实 Sidecar 子进程验证任务创建／保存、无效保存保护、进程重启恢复及三类任务身份；测试使用隔离数据目录，不访问用户 Profile。
- `check-ui.cjs` 使用真实 React DOM 和模拟 Bridge，覆盖集团填报入口、会话、录制、自定义字段及模拟提交。会话状态提示限定到 region / status / paragraph，三项 definition 单独验证，避免全页文本命中详情容器；不使用 first/nth、固定 sleep 或扩大超时。
- 窗口实际导航、扫码、腾讯身份选择器、失效／权限恢复与应用冷启动仍须下节人工验收。Edge `--no-sandbox` 提示和启用 `chromiumSandbox` 的独立测试 Profile／扫码兼容性评估尚未完成，本轮未更改启动参数或隐藏警告。

### T1 实现与验证边界（2026-11-10）

- 直接使用 `chromium.launchPersistentContext(userDataDir, options)`，固定 `channel: 'msedge'`；登录显式 `headless: false`，后台模式显式 `true`，单次模式优先于默认值。仅持有一个持久化 Context，正常关闭使用 `context.close()`，不删除现有 Profile 数据。
- Worker 是生产会话的执行者；.NET 租约防止多个宿主同时派发同一 Profile 的操作，Edge 原生锁保护浏览器目录。没有另建 Browser/Profile 管理层、Node Profile 锁、MCP 服务或通用诊断回调。独立环境探针已废弃；实际版本只在原有测试中通过 `context.browser()?.version()` 输出。
- 已通过 `node tests/tencent-sheet/check-session.cjs`、同文件 `--browser` 和 `git diff --check`。真实运行版本为 Edge `157.0.4341.46`，登录有头模式、原 `:has()` 和 `login-required` 断言、持久化复用及真实启动/导航关闭竞态通过。
- 自动验证已收尾通过，测试数量、警告、dist / Worker 产物一致性与下一步集中记录在 [STATUS.md](../STATUS.md)。UI 浏览器与 React 测试使用模拟 Bridge；.NET 生命周期测试使用本地 Node Worker 替身，另有真实 Sidecar 子进程测试四个会话操作的 closed / InvalidDocumentUrl 状态及禁止写入的权限边界。分层测试不等于真实腾讯扫码或完整宿主交互验收通过。
- `scripts/verify.ps1` 保留原有验证范围，增加会话契约与 UI 浏览器回归。先通过各包锁文件还原依赖，再将本次进程的 `NODE_PATH` 指向腾讯文档包的 `node_modules`；UI 回归在前端构建后执行，脚本结束恢复原变量。运行完整 verify 不带 `-SkipRestore` 或 `-SyncRelease`，只生成 Development。
- 原生 API 依据：[Playwright 持久化 Context](https://github.com/microsoft/playwright/blob/main/docs/src/api/class-browsertype.md#async-method-browsertype-launchpersistentcontext)、[Playwright MCP 持久化启动实现](https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/tools/mcp/browserFactory.ts)。只参考管理思路，不引入 MCP 依赖。

### T1-A 人工验收（自动测试通过后执行）

1. 在仓库根目录运行 `npm.cmd --prefix src/ProductionAssistant.Desktop start -- --environment Development`，进入“数据报送 → 集团填报”。核对其他 Metis 分类、任务清单和数据浏览入口，规划菜单应隐藏；刷新当前文档后分类参数和高亮应一致。
2. 新建任务或进入现有任务，在“文档与账号”保存获准只读检查的文档分享链接。核对保存／未保存状态、放弃修改、切页恢复和应用重启后重新进入任务的配置恢复；保存本身不应启动 Edge。
3. 输入无效链接并保存，应有清晰反馈；重新进入任务仍为原有效链接。未保存修改时检查按钮应禁用，不应检查其他目标。
4. 页面自动读取当前浏览器状态，不应把历史成功当作当前已登录。点击“打开并检查”，在可见 Edge 中按腾讯官方页面完成扫码／协议，再返回“重新检查”；核对浏览器、身份、文档访问、编辑权限未知及最近检查时间。全过程不输入业务单元格。
5. 在 Edge 手动退出账号后重新检查，应提示需要登录；无文档权限或证据不足时应分别显示拒绝或未知及恢复建议。多次点击、加载和检查失败后不应出现重复浏览器或迟到成功。
6. 点击“关闭浏览器”或手动关闭 Edge，返回应用后应自动更新为已关闭、身份／访问未知，历史检查不冒充实时结果。重新检查可复用原登录资料；正常退出并重启应用后重新进入任务验证冷启动复用，不清空或重置 Profile。
7. 跨进程独占使用相同 Development 环境的 Electron 与 WinUI 过渡宿主。另一个宿主应提示占用，原宿主关闭浏览器后可重试；仅再次启动同一 Electron 不能证明 Profile 独占。启动或检查中点击“关闭浏览器”不应迟到弹出旧浏览器。
8. 检查主题、键盘焦点、窄宽布局和错误恢复。WinUI 保留基础兼容验收；T1-A 不执行真实填报、云端保存或定时填报验收。

本地 Cookie、协议和组件替身不能证明腾讯实际选择器、身份策略、Edge 账户策略及外部登录期限适用；真实扫码、应用冷启动复用和宿主 UI 体验须按上述步骤人工验收。T1 不验证写入、云端保存或定时填报。

运行需要 Node.js（可从 PATH 调用）和 Microsoft Edge。Playwright 版本锁定在 `Assets/TencentSheet/package-lock.json`，验证脚本还原依赖，两个环境的发布包均包含该组件；不依赖实验目录。真实文档扫码、无头登录复用、在线保存及 Windows 注册/准点执行仍由用户在 Development 验收；本地替身通过不代表外部服务验收完成。

独立运行 Node 浏览器检查时，在仓库根目录按以下方式使用同一份依赖。首次检出先执行 `npm.cmd --prefix src/ProductionAssistant.App/Assets/TencentSheet ci --ignore-scripts`；UI 回归还须已有前端构建产物。CommonJS 根据测试脚本所在位置查找模块，单纯切换当前目录不会把资产包的依赖加入查找范围。

```powershell
$previousNodePath = $env:NODE_PATH
try {
    $env:NODE_PATH = (Resolve-Path 'src/ProductionAssistant.App/Assets/TencentSheet/node_modules').Path
    node tests/tencent-sheet/check-ui.cjs
    if ($LASTEXITCODE -ne 0) { throw "TencentSheet UI checks failed with exit code $LASTEXITCODE." }
} finally {
    $env:NODE_PATH = $previousNodePath
}
```

正式填报的读取与编辑检查分离：日期、公司表头和保存后的回读允许受保护单元格；只有目标格写前检查要求内容编辑区可编辑。进入工作表允许控件只读，刷新恢复还要求名称框可交互；名称框导航前不要求已有 A1 地址，导航后仍核对选中地址。表头读取失败会标明字段和地址。

保存确认只接受明确的已保存状态；“上次修改”时间、未知提示和保存中均不能作为云端保存完成的依据。超过等待期限仍未确认时，保留结果待确认，不主动刷新或重放输入。刷新后的名称框还须通过无点击的可交互检查；错误中的地址列表只表示已输入并本地回读，全部刷新回读一致后才报告成功。保存状态控件应录制实际保存提示，不能仅选历史修改时间。
