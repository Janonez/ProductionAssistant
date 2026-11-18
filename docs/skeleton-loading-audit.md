# 加载状态与 Skeleton 盘点

范围：React 业务页面、iframe 适配器、共享样式、WinUI 启动层。先盘点后修改；本轮不改变业务写入、认证或权限判定。

## 逐项判断

下列路径均相对 `src/ProductionAssistant.App`。

| 原位置 | 原用途 | 数据或操作性质 | 处理 |
| --- | --- | --- | --- |
| `Assets/Prototype/src/app/App.tsx` | Suspense 的 RouteSkeleton | 本地 JS 模块 | 删除整页骨架，保留 Suspense、错误边界、Ready 握手和简短 Spinner 提示 |
| `Assets/Prototype/src/components/layout/LocalServiceBoundary.tsx` | 标题和面板骨架 | 本地服务初始化 | 原状态提示加 Spinner，保留失败/重启入口 |
| `Pages/PrototypePage.xaml` | 侧栏、标题、步骤、按钮、面板骨架 | WinUI 的本地 WebView 启动 | 改为启动提示和 ProgressRing，保留 LoadingLayer、错误层及握手 |
| `Assets/Prototype/src/features/group-submission/SubmissionSettingsLoading.tsx` | 设置模块及配置骨架 | 本地模块、文档配置 | 删除骨架，保留固定分区标题、加载提示和错误反馈 |
| `Assets/Prototype/src/features/group-submission/SubmissionWorkbench.tsx` | 填报日期骨架 | 本地配置 | 始终使用日期 Input，读取期间禁用 |
| `Assets/Prototype/src/features/group-submission/SubmissionExecutionRules.tsx` | 最近执行记录的独立读取 | 与记录标签相同的本地数据 | 接入同一缓存，启动、执行规则、记录标签共用一次读取 |
| `Assets/Prototype/src/features/daily-report/AutomationPage.tsx` | 任务列表整页骨架 | 本地任务清单 | 内存复用，保留标题/新建按钮；首次读取结束前不显示 Empty |
| 同上 | 运行记录 SkeletonLines | 本地运行记录 | Spinner；切换标签保留已有记录，明确刷新才重读 |
| `Assets/Prototype/src/features/daily-weld/DailyWeldPage.tsx` | 配置 RouteSkeleton | 本地焊接配置 | 启动预读、内存复用，直接保留页面和控件 |
| `Assets/Prototype/src/features/database-viewer/DatabaseViewerPage.tsx` | 目录 RouteSkeleton | 本地数据库目录 | 启动预读、保留查询条件控件 |
| 同上 | 查询结果 SkeletonLines | 远程内容读取 | 仅首次查询的表格内容可显示局部骨架；已有结果时保留旧表格 |
| `Assets/Prototype/src/features/report-center/ReportCenterPage.tsx` | 配置 RouteSkeleton | 本地报表配置 | 启动预读，保留固定页面和控件 |
| 同上 | 汇总结果 SkeletonLines | 用户触发的导出/汇总 | Spinner 和原有进度，删除骨架 |
| `Assets/Prototype/src/features/production-message/ProductionMessagePage.tsx` | 解析结果 SkeletonLines | 解析及检查操作 | Spinner，保留操作按钮及结果区 |
| `Assets/Prototype/src/features/plan-pdf/PlanPdfPage.tsx` | 检查结果、PDF 导出骨架 | 用户触发的文件操作 | Spinner，保留原有进度 |
| `Assets/Prototype/src/features/production-meeting/ProductionMeetingPage.tsx` | 拆分结果骨架 | 用户触发的文件操作 | 按钮和原位结果状态使用 Spinner |
| `Assets/Prototype/src/features/daily-report/MessageTemplatePage.tsx` | iframe 配置 TaskSkeleton | 本地任务配置、字体/HTML | 删除整块骨架，配置在内存复用 |
| 同上 | 预览区 skeletonRegion | 生成预览操作 | 原位 Spinner；保留已有预览和编辑 DOM |
| 同上 | 运行记录 skeletonRegion | 本地运行记录 | Spinner、读取去重，展开/收起不重复读取 |
| `Assets/Prototype/src/features/daily-report/notion-fill/NotionFillPage.tsx` | iframe 配置 TaskSkeleton | 本地任务配置 | 删除整块骨架，配置在内存复用 |
| 同上 | 来源/目标检查 skeletonRegion | 来源测试及预览操作 | Spinner，更新期间保留旧内容；失败时旧内容不作为新的写入资格 |
| 同上 | 运行记录 skeletonRegion | 本地运行记录 | 首次读入内存；折叠/展开复用；执行后明确刷新 |
| `Assets/Prototype/src/features/daily-report/tencent-sheet/TencentSheetPage.tsx` | 填报配置 TaskSkeleton | 本地任务配置 | 内存复用、Spinner，删除标题和 Tabs 骨架 |
| 同上 | Teable 业务数据 SkeletonLines | 远程业务表格 | 仅首次远程读取内容可用表格骨架；重新取数保留旧值，取得新结果前禁用后续检查 |
| 同上 | 运行记录 SkeletonLines | 本地运行记录 | Spinner、内存复用 |
| `Assets/Prototype/src/components/ui/FormPickers.tsx` + `skeleton.css` | 用 CSS 遮住选择器文字 | 固定控件 | 删除文字遮罩，保留当前值/加载文字，箭头原位改为 Spinner |
| `Assets/Prototype/src/features/group-submission/DocumentConnectionItem.tsx` | 检测中文档状态 | 远程连接/权限检查 | 已是原位 Badge＋Spinner，保留，不改成骨架 |
| `Assets/Prototype/src/components/layout/LoadingSkeleton.tsx` | 各类整页、标题、按钮骨架模板 | 共享实现 | 收敛为远程表格单元格骨架 |
| `Assets/Prototype/src/lib/skeletonRegion.ts` | iframe 内容隐藏覆盖层 | 共享实现 | 改为不隐藏旧内容的 Spinner 状态行；保留原文件路径以避免无关迁移 |
| `Assets/Prototype/src/components/ui/sidebar.tsx` / `ui/skeleton.tsx` | 上游 SidebarMenuSkeleton、Skeleton | 当前无业务调用的上游组件 | 保留上游定义；应用侧栏没有调用 |
| `Controls/SkeletonShape.cs` | WinUI 骨架形状组件 | 移除启动骨架后无调用 | 保留文件，未删除用户文件 |
| `Assets/TencentSheet/login.cjs` 中的 skeleton 字样 | 历史注释 | 不渲染 UI | 不改认证 Worker |

## 加载约束

- `useDelayedSkeleton` 是唯一控制骨架时序的 hook：等待 200ms，显示后至少保留 300ms；组件卸载清理计时器；已有数据的刷新不启动骨架。
- 远程骨架沿用正式表格的表头、列数及单元格间距；腾讯表格按配置字段数占行。数据库结果共用固定 420px 的可滚动表格视口，表头字段类型和计数区保持同样高度。
- `LocalDataProvider` 在当前应用文档内缓存本地读取及进行中的 Promise，返回副本隔离未保存草稿。`LocalDataBootstrap` 在本地服务 Ready 后并行读取设置、绑定、目录、报表状态、任务清单；清单返回后，各任务配置/记录并行预读。未知任务 ID 的读取依赖清单，不能提前发起。
- 远程数据、登录状态、权限证据不进入该本地缓存。不会为了预加载自动检测文档、登录或填报。
- 访问过的路由、集团填报概览/记录/设置、已打开的任务详情保留挂载；仅隐藏非当前内容。未访问的业务页面仍按现有 lazy/Suspense 加载。
- 设置对话框关闭仍清除未保存的明文输入；本地设置数据在内存复用。成功设置操作更新缓存，原有设置更新事件保留。

## 验证

自动化验证与实际 Electron 人工验收分别记录在 `STATUS.md`。浏览器或 mock 验证不等于真实腾讯文档、写入、保存或调度验收。
