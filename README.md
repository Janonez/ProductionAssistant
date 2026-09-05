# 生产助手

面向生产业务的 Windows x64 WinUI 3 桌面工具，包含每日焊接模拟、数据库查看、挂网计划 PDF、生产会资料拆分、生产消息入库、日报推送和报表中心。

## 环境

- Windows 10 1809 或更高版本
- .NET 8 SDK（版本由 `global.json` 固定）
- Node.js 22（用于前端构建及报表中心 Playwright 运行）
- Microsoft Excel（仅 Excel/PDF 相关功能运行时需要）

## 开始开发

```powershell
dotnet restore ProductionAssistant.sln -p:Platform=x64
dotnet build ProductionAssistant.sln -c Debug -p:Platform=x64 --no-restore
dotnet test tests\ProductionAssistant.Tests\ProductionAssistant.Tests.csproj -c Debug -p:Platform=x64 --no-build
```

完整本地验证：

```powershell
.\scripts\verify.ps1
```

脚本依次验证前端 bundle、Release build 和 xUnit 测试，默认只生成 Windows x64 自包含测试版 `deployments\development`。只有明确需要同步正式版时才传入 `-SyncRelease`，生成或覆盖 `deployments\production`。桌面人工验收先运行 `deployments\development\ProductionAssistant.exe`。

## 运行环境

运行环境与 Debug/Release 编译配置相互独立。程序按以下优先级识别环境：`--environment Development|Production`、`DOTNET_ENVIRONMENT`、发布目录中的 `runtime-environment.json`，均未设置时安全回退为 `Production`。因此 Release 构建也可以使用 Development 环境：

```powershell
dotnet publish src\ProductionAssistant.App\ProductionAssistant.csproj -c Release -p:Platform=x64 -p:RuntimeEnvironment=Development --self-contained true --no-restore -o deployments\development
```

Production 继续使用现有 `%LOCALAPPDATA%\ProductionAssistant`，Development 使用 `%LOCALAPPDATA%\ProductionAssistant\Development`。任务、执行记录、Notion 配置、Webhook、FineReport 凭据、日志、缓存和默认导出目录均随该根目录隔离。Development 不会复制 Production Secret，需要在 Development 界面中单独填写测试 Notion/消息配置。

Scheduler 由 [appsettings.Development.json](src/ProductionAssistant.App/appsettings.Development.json) 和 [appsettings.Production.json](src/ProductionAssistant.App/appsettings.Production.json) 控制；Development 默认关闭，Production 保持开启。当前项目没有 PostgreSQL、连接字符串或 migration，数据库功能实际连接 Notion，因此没有需要创建的 Development PostgreSQL 数据库。

## React 新版界面

桌面外壳、左侧操作栏、“每日焊接数据模拟”、“生产消息 Notion 入库”、“日报推送”和“报表中心”直接使用同一个 React + TypeScript DOM，由单一 WebView2 承载。应用不再提供首页模块；左侧入口按文件处理、数据同步和自动化任务直接打开业务页面。尚未迁移的原生模块只覆盖右侧内容区，不替换 React 操作栏；配置文件与 Windows 后台能力保持不变。

每日焊接使用“录入计划 → 拆分预览 → 完成”的正式 React 页面，并与生产消息复用同一个三步进度组件。计划量和逐日量统一以吨为单位；前端通过 `weld.*` 桥接调用 Core 焊接模拟和既有 Notion 月/周/日层级写入服务，写入前校验整月日期、非负整数与总量配平，已有产量必须明确确认覆盖。旧原生焊接页面已删除。

生产消息使用“录入消息 → 解析确认 → 完成”三步页面：目标 Notion Schema 与消息解析并行准备，字段列表始终以目标库映射为准，解析值只填入对应字段；编辑值只更新本地状态，写入前由服务端复查。冲突按字段选择保留原值或使用新值，全部字段一致时返回“无需写入”，不执行 Notion 更新。数据库更换后可从页面右上角重新绑定下料和塔筒主库。塔筒消息只把“当日”值写入主库，当月和全年累计由查询层计算；下料月计划库通过主库 Relation 动态识别，与每日数据保持独立。

当前唯一视觉规范是暖中性 React 外壳、白色工作面、棕橙色主操作和 squircle 控件。前端统一使用 Inter Variable + Noto Sans SC Variable，字号按页面标题 26px、正文/区域标题 16px、控件/说明 15px、标签/状态/辅助信息 14px 分级，字重只允许 400、500、600、700。每日焊接、报表中心和生产消息已使用同一套 token；后续模块不得复制旧原生页面、过时主题或历史 CSS 规则。

左侧原“设置”入口打开由 `App.tsx` 控制的全局 React 弹窗，不再切换到独立页面；关闭后仍停留在原业务页面。弹窗集中管理 Notion 连接、数据源缓存、系统通知渠道和关于信息。已保存的令牌、Webhook 与 Secret 只显示密码掩码，明文不返回前端。

日报推送遵循“列表启停 → 基本信息 → 模板与数据源 → 预览测试 → 运行记录”，报表中心继续独立管理 FineReport 采集与汇总。`scripts\verify.ps1` 会执行字体字重检查、前端测试、类型检查、离线生产构建、Release 编译、xUnit 测试和 Debug 发布。

“数据库查看”是只读调试入口。数据库目录由当前适配器统一提供：Notion 以数据库总页面为根，先列业务页面形成的“业务板块”，再列页面内的具体数据库；不提供业务分组的本地数据库适配器会自动退化为单层数据库选择。View 下拉框只显示所选数据库自身真实存在的 View。普通 View（包括独立月计划数据库的 View）读取完整结果；仅精确名称“本年截止今日”显示日期字段、数值字段和日期查询口径。

## 项目结构

- `ProductionAssistant.App`：WinUI 壳与页面、React/WebView2 前端资源、导航、程序入口和依赖组装。
- `ProductionAssistant.Core`：模型、解析与纯业务计算，不依赖 UI 或外部系统。
- `ProductionAssistant.Infrastructure`：Notion、钉钉、Excel、PDF、DPAPI、本地文件和任务计划程序。
- `ProductionAssistant.Tests`：引用真实生产程序集的自动化测试。

各版本已经发布的用户可见变化见 [变更记录](CHANGELOG.md)。

## 报表中心

报表中心首个业务是“机加工实开台时汇总”。用户配置原始日报根目录、汇总输出目录、FineReport 网页及本机加密账号密码，验证登录后手动选择开始和结束日期；汇总月份自动取结束日期所在月份。

运行时 Playwright 在后台启动一个 Chromium，从 `https://fr.tz.com.cn:8443/webroot/decision` 进入加工日报并在同一页面逐日查询、分页导出。原始文件按日期归档并在测试阶段覆盖同名文件；随后由 ClosedXML 动态识别“设备名称”和“实开台时”，校验日期与设备集合并生成 `机加工汇总_开始日期_结束日期.xlsx`。页面显示准备、导出、解析、生成汇总和完成五个真实阶段；任一日期重试三次后仍失败时继续采集其余日期，但本次不生成不完整汇总。

账号密码使用 Windows DPAPI 保存，浏览器登录状态和脱敏运行摘要保存在 `%LOCALAPPDATA%\ProductionAssistant`。真实 FineReport 登录、页面控件和最终 Excel 仍需在目标环境人工验收。

## 日报自动推送

自动化任务页只提供任务类型、名称、启停、状态和任务详情的公共外壳。已有任务详情使用自由切换的四个 Tab：Shell 固定提供“基本信息 / 运行记录”，各 TaskType 在前端 Registry 中提供“任务配置 / 运行与测试”的专用内容。表单与保存行为仍由专用 UI 负责；Handler 返回的缺失配置由 Registry 映射到对应 Tab，Shell 只汇总为可导航的“配置问题”清单。任务索引由各业务已有存储实时投影，不创建第二份任务表或 JSON；名称、启停和计划仍以各业务配置为唯一真相。Handler 只提供整项执行入口，日报钉钉消息等业务输出仍由各业务独立完成。为保持现有日报行为，第一阶段继续使用原 `DailyReportRunner` 的失败告警和启用后补发逻辑，Shell 不重复告警。新增任务类型实现独立 Handler 和 React 配置 UI 后注册即可，不需要把业务拆成统一 Step 或 Pipeline。

日报自动推送支持创建多个独立任务，组合数据库数据生成消息，并按各自计划发送到钉钉群。数据库、字段和 View 均实时读取；塔筒、原材料和其他来源使用同一规则，不按数据库名称特判。主数据库的“本年截止今日”按业务日期计算日、月、年累计；其他 View 在插入字段时明确选择按业务年月直接获取唯一记录或累计 View 全部记录，因此独立月计划不会被当作每日数据汇总。任务只保存名称、消息模板、定时设置和运行记录；Webhook、Secret 与事件规则统一由“设置 → 通知设置”管理。

Notion 自动填报首个任务为“原材料入库自动填报”。每天 00:00 使用 93 系统已验证的 HTTP 接口读取前一天入库记录，按“钢板为板材、其他类型为型材”汇总 `inweight`，再向 Notion“原材料入库数据库”新增业务、日期、板材和型材，其中业务字段固定为 `yyyy-MM-dd 入库`。写入前按日期查重，已有记录只记为跳过，不覆盖也不重复新增；只读测试通过后可在 NotionFill 页面二次确认并手动执行选定历史日期，用于验收新增与重复跳过。93 系统地址和账号保存在任务本机配置中，密码使用 Windows DPAPI 加密；任务配置和运行记录分别保存在 `notion-fill-jobs.json` 与 `notion-fill-runs.json`。

配置自动保存；生成真实预览后才可测试发送，测试成功的配置进入“可启用”状态，再由用户从任务列表手动启用。敏感凭据使用 Windows DPAPI 加密。旧版单一日报配置会自动迁移，迁移后需重新启用任务以安装新版定时计划。
日报选择控件沿用 React 页面统一视觉；钉钉文本按模板结果原样发送，不会自动添加 `@所有人`。任务详情可使用已验证模板手动“发送今日消息”；Release 启用任务时若已过计划时间且当天没有成功记录会立即补发。只有 Release 可以安装和操作 Windows 定时任务；Debug 仍可编辑模板、插入字段、生成预览和测试发送，配置变化只将任务标记为停用，不操作计划任务。

日报已有任务详情采用可自由切换的“基本信息 / 任务配置 / 运行与测试 / 运行记录”Tab，其中“任务配置”承载原消息内容编辑，“运行与测试”承载预览、测试发送和手动发送。Notion 字段按“业务板块 → 具体数据库 → 数据字段 → 统计 View → 取数方式”逐级选择；本地等无业务分组的适配器直接从“数据库”开始。生产消息绑定、焊接模拟、日报和数据库查看复用同一个数据库目录模型。选择“本年截止今日”时取数方式为日、月、年累计；选择其他真实 View 时为“对应业务月份直接获取”或“累计 View 全部记录”。

任务列表负责新建、启停和删除，并区分配置未完成、待测试、可启用、已启用和计划异常。新建任务使用轻量向导：Shell 只负责选择 TaskType，后续“基本信息 / 必要配置”由对应 TaskType 的专用 UI 提供，最终确认后才一次性创建，取消不会留下空任务。整张任务卡可进入编辑；删除位于任务卡右键菜单并保留二次确认。任务必须停用后才能删除，从未安装 Windows 任务计划的新任务也可直接删除。已创建任务的保存行为仍由各业务 Tab 明确负责；修改日报模板或字段会自动停用并要求重新测试。运行记录默认显示最近 5 条并可查看最多 100 条。

## 公共流程模板

应用按“文件处理、数据同步、自动化任务”组织入口，每个业务模块从侧边栏一级入口直接打开；这些名称是产品分类，不是统一执行引擎。当前挂网计划 PDF 与生产会资料拆分复用文件处理外壳，仅统一输入、按钮状态、进度、提示和输出入口；各自的检查、修复、拆分与导出规则仍由原业务服务负责。生产消息在三步页面内完成录入、自动检查、逐字段确认和写入，日报推送独立管理定时任务。

## 发布

`deployments/` 不进入 Git。源码通过 Git 同步到 GitHub；本机保留 `deployments\development` 测试版和 `deployments\production` 正式版。版本发布时从正式版生成 Windows x64 自包含 ZIP，并附加到对应 GitHub Release，ZIP 不提交 Git。

## 安全与许可

请勿提交真实 Token、Webhook、数据库 ID、业务文件或个人信息；安全问题请按 [安全说明](SECURITY.md) 私密报告。本项目采用 [MIT License](LICENSE)。

## 已知限制与后续优化

当前 React 桌面外壳由 WinUI 3 内的单一 WebView2 承载。冷启动只显示中性底色与加载指示，不再先渲染旧导航或模块文案；操作栏、每日焊接、生产消息、日报推送与报表中心复用同一 React 宿主，切换时不重新初始化 WebView2。应用保留环境预热、React 就绪握手、15 秒超时重试和启动阶段计时。实际冷启动耗时、内存与目标设备体验仍需按手工验收步骤测量，当前构建与测试结果不能视为性能已经验收。
