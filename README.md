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

Production 继续使用现有 `%LOCALAPPDATA%\ProductionAssistant`，Development 使用 `%LOCALAPPDATA%\ProductionAssistant\Development`。任务、执行记录、Notion 配置、Webhook、FineReport 凭据、日志、缓存和默认导出目录均随该根目录隔离。Development 不会复制 Production Secret，需要在 Development 界面中单独填写测试 Teable/消息配置。

Scheduler 由 [appsettings.Development.json](src/ProductionAssistant.App/appsettings.Development.json) 和 [appsettings.Production.json](src/ProductionAssistant.App/appsettings.Production.json) 控制；Development 默认关闭，Production 保持开启。当前项目没有 PostgreSQL、连接字符串或 migration，当前业务通过 API 直连 Teable，本软件不直接连接 Teable 底层 PostgreSQL。

## Teable API 与迁移

独立命令行入口 `tools/TeableProbe` 支持安全配置 Token、直连读取、映射和业务绑定导入、独立环境检查及读写验收。API 基建历史与凭据配置见 [Teable API 联调](docs/teable-api.md)，当前业务状态见 [Teable 业务接入](docs/teable-business.md)。

生产业务库第一阶段创建了 9 张空表、45 个原字段及 8 个日期区间结束字段，包含关联、汇总与公式。该阶段的可恢复脚本、字段映射及验证记录见 [Teable 结构迁移](docs/teable-schema-migration.md)。

2026-10-09 已完成上述九个生产库的字段数据与关联迁移，共 2,624 条记录；修复用户先行导入的精度/日期差异并核对计算结果。数据迁移范围、平台文本规范化及恢复方法见 [Teable 数据迁移](docs/teable-data-migration.md)。v1.7.0 的 Development 和 Production 当前业务入口统一使用 Teable。

## React 新版界面

桌面外壳、左侧操作栏、“每日焊接数据模拟”、“生产消息 Teable 入库”、“日报推送”和“报表中心”直接使用同一个 React + TypeScript DOM，由单一 WebView2 承载。启动默认进入“生产消息 Teable 入库”，该入口排在导航首位；左侧分组依次为数据同步、数据文件处理和自动化。没有独立的概览首页。尚未迁移的原生模块只覆盖右侧内容区，不替换 React 操作栏；配置文件与 Windows 后台能力保持不变。

每日焊接使用“录入计划 → 拆分预览 → 完成”的正式 React 页面，并与生产消息复用同一个三步进度组件。计划量和逐日量统一以吨为单位；前端通过 `weld.*` 桥接调用 Core 焊接模拟和Teable 月/日层级写入服务，写入前校验整月日期、非负整数与总量配平，已有产量必须明确确认覆盖。旧原生焊接页面已删除。

生产消息使用“录入消息 → 解析确认 → 完成”三步页面：目标 Teable Schema 与消息解析并行准备，字段列表始终以目标库映射为准，解析值只填入对应字段；编辑值只更新本地状态，写入前由服务端复查。冲突按字段选择保留原值或使用新值，全部字段一致时返回“无需写入”，不执行数据库更新。数据库更换后可从页面右上角重新绑定下料和塔筒主库。塔筒消息只把“当日”值写入主库，当月和全年累计由查询层计算；下料月计划库通过主库 Relation 动态识别，与每日数据保持独立。

当前唯一视觉规范是暖中性 React 外壳、白色工作面、棕橙色主操作和 squircle 控件。前端统一使用 Inter Variable + Noto Sans SC Variable，字号按页面标题 26px、正文/区域标题 16px、控件/说明 15px、标签/状态/辅助信息 14px 分级，字重只允许 400、500、600、700。每日焊接、报表中心和生产消息已使用同一套 token；后续模块不得复制旧原生页面、过时主题或历史 CSS 规则。

左侧原“设置”入口打开由 `App.tsx` 控制的全局 React 弹窗，不再切换到独立页面；关闭后仍停留在原业务页面。弹窗集中管理 Teable 连接、数据源缓存、系统通知渠道和关于信息。已保存的令牌、Webhook 与 Secret 只显示密码掩码，明文不返回前端。

日报详情采用正文 `/` 插入、并列预览、设置弹窗与折叠记录；文件统计汇总继续独立管理 FineReport 采集与汇总。`scripts\verify.ps1` 会执行字体字重检查、前端测试、类型检查、离线生产构建、Release 编译、xUnit 测试和 Debug 发布。

“数据库查看”是只读调试入口。数据库目录由当前适配器统一提供：Teable 按迁移映射保留原业务板块与数据库目录；不提供业务分组的本地数据库适配器会自动退化为单层数据库选择。View 下拉框只显示所选数据库自身真实存在的 View。普通 View（包括独立月计划数据库的 View）读取完整结果；仅精确名称“本年截止今日”显示日期字段、数值字段和日期查询口径。

## 项目结构

- `ProductionAssistant.App`：WinUI 壳与页面、React/WebView2 前端资源、导航、程序入口和依赖组装。
- `ProductionAssistant.Core`：模型、解析与纯业务计算，不依赖 UI 或外部系统。
- `ProductionAssistant.Infrastructure`：Teable、Notion 迁移兼容、钉钉、Excel、PDF、DPAPI、本地文件和任务计划程序。
- `ProductionAssistant.Tests`：引用真实生产程序集的自动化测试。

各版本已经发布的用户可见变化见 [变更记录](CHANGELOG.md)。

## 文件统计汇总

“文件统计汇总”的首个业务是“机加工实开台时汇总”。用户配置原始日报根目录、汇总输出目录、FineReport 网页及本机加密账号密码，验证登录后手动选择开始和结束日期；汇总月份自动取结束日期所在月份。

运行时 Playwright 在后台启动一个 Chromium，从用户配置的 FineReport 地址进入加工日报并在同一页面逐日查询、分页导出。原始文件按日期归档并在测试阶段覆盖同名文件；随后由 ClosedXML 动态识别“设备名称”和“实开台时”，校验日期与设备集合并生成 `机加工汇总_开始日期_结束日期.xlsx`。页面显示准备、导出、解析、生成汇总和完成五个真实阶段；任一日期重试三次后仍失败时继续采集其余日期，但本次不生成不完整汇总。

账号密码使用 Windows DPAPI 保存，浏览器登录状态和脱敏运行摘要保存在 `%LOCALAPPDATA%\ProductionAssistant`。真实 FineReport 登录、页面控件和最终 Excel 仍需在目标环境人工验收。

## 自动化任务

自动化任务列表统一展示任务类型、名称、启停、状态和最近运行。各类型分别提供业务配置、校验、执行与历史记录。新建先选择类型，再由专用表单完成配置，确认创建前不留下空任务。

日报详情直接进入消息编辑页：左侧正文、右侧真实预览，输入 `/` 搜索指标与时间口径，字段作为整体 Token 插入。任务名称、发送时间和指标范围放在右上角设置，运行记录在下方折叠。普通插入不再逐级选择数据库、View 和查询方式。已有字段继续保留原 View、精确月份和历史日期意图；新指标按业务日期计算日、月累计、年累计或全年。

配置自动保存，预览、测试发送与启用相互独立。系统通知渠道已启用且 Webhook、Secret 已配置后，可从列表启用日报任务；启用不会立即补发。修改模板或字段不会自动停用任务。任务详情可手动发送今日消息；同任务、日期和模板版本已有成功记录时不重复发送。

Teable 自动填报首个业务为原材料入库：每天按任务设置的时间读取 93 系统前一天记录（默认 00:00），钢板汇总为板材，其他类型为型材，按日期查重后仅新增 Teable 记录。任务详情沿用日报布局：无 Tab，右上角任务设置，左侧入库汇总与右侧 Teable 写入预览，下方折叠运行记录。预览需手动触发；改日期、名称或连接配置后旧预览失效；仅修改执行时间不影响已有验证与启用状态。只读测试不写 Teable；手动写入需在该业务页面明确确认。配置和历史分别存入 `notion-fill-jobs.json` 与 `notion-fill-runs.json`，密码以 DPAPI 加密。

调度能力取决于运行环境配置中的 `Scheduler.Enabled`，与 Debug/Release 编译配置独立。Development 默认关闭调度，但仍可使用测试连接编辑、预览和测试发送。旧日报任务集合、字段与 `--send-daily-report --job-id <id>` 计划继续兼容；旧单一配置首次迁移出的任务默认停用，不等于已有多任务配置必须重新启用。

## 公共流程模板

应用按“数据文件处理、数据同步、自动化任务”组织入口，每个业务模块从侧边栏一级入口直接打开；这些名称是产品分类，不是统一执行引擎。挂网计划 PDF 和生产会资料拆分使用 React 文件处理工作台；各自的检查、修复、拆分与导出规则仍由原业务服务负责。生产消息在三步页面内完成录入、自动检查、逐字段确认和写入，日报推送独立管理定时任务。


## 1.6.2 稳定版

[下载 1.6.2 正式版](https://github.com/Janonez/ProductionAssistant/releases/tag/v1.6.2)。本机正式版位于 `deployments/production/ProductionAssistant.exe`，测试版位于 `deployments/development/ProductionAssistant.exe`。

每日焊接填写支持“日记录＋月计划”的新数据库结构，通过“所属月份”关联同步月计划，不再依赖旧周库；同时保留旧结构兼容。本版还包含冷启动与加载骨架优化、共享文档定位及调度修复。

### 腾讯文档填报

腾讯文档配置现按五个 Tab 展示，顶部保留状态与停用提示，前台／后台测试通过分段控件切换；字体与其他模块统一，背景为 `#FAFAF9`。

自动化任务现已开放腾讯文档填报：点选录制通用网页控件，独立检验并按年月匹配 Sheet，通过日期示范推断填写位置，再绑定 Teable 数据和执行规则。示范与表头读取支持受保护单元格；实际写入仍核对目标地址、原值和编辑权限，并刷新回读确认保存。详见[腾讯文档填报使用说明](docs/tencent-sheet-development.md)及[变更记录](CHANGELOG.md)。

腾讯文档填报需要 Node.js 20 或更新版本（可从 PATH 调用）及 Microsoft Edge；Playwright 已随包提供。Development 与 Production 的任务、登录状态和凭据保持隔离，升级不会自动复制测试配置到正式环境。

## 1.5.6 工作台更新

原材料自动入库采用手动预览与确认写入的双栏工作台，任务设置支持每天的执行时间，默认 00:00；仅修改时间保留已有验证及启用状态。挂网计划、生产会资料拆分和文件统计汇总采用 React 工作台并复用原业务服务。页面切换直接替换内容，不再等待退出动画或使用纵向位移；日期/月选择统一使用 DatePicker，生产消息数据库绑定复用 ChoicePicker。

## 发布

`deployments/` 不进入 Git。源码通过 Git 同步到 GitHub；本机保留 `deployments\development` 测试版和 `deployments\production` 正式版。版本发布时从正式版生成 Windows x64 自包含 ZIP，并附加到对应 GitHub Release，ZIP 不提交 Git。

## 安全与许可

请勿提交真实 Token、Webhook、数据库 ID、业务文件或个人信息；安全问题请按 [安全说明](SECURITY.md) 私密报告。本项目采用 [MIT License](LICENSE)。

## 已知限制与后续优化

当前 React 桌面外壳由 WinUI 3 内的单一 WebView2 承载。冷启动显示中性灰色结构骨架，优先加载生产消息页面与操作栏，其他业务页面按需加载；设置窗口代码直接加载，打开时显示正式表单，配置读取期间禁用操作，不使用整页骨架或入场动画；首屏读取本地数据库绑定，不自动查询数据库。普通切页保留操作栏，按目标页面的实际布局显示骨架；任务列表、数据库选择、任务详情 iframe、运行记录与数据预览均在内容所在区域占位。已有查询结果刷新时保留原布局，写入和导出保留真实执行进度。目标页面挂载后发送带导航令牌的界面就绪消息，不等同于业务数据已读取完成。应用保留共享环境预热和导航后的 15 秒就绪超时；重试重新加载前端资源。startup.log 分别记录应用构造、窗口创建/激活、Environment 创建、WebView 控件创建、导航及 React 就绪；前端入口与就绪毫秒数相对网页导航开始，不与宿主累计计时直接相减；另记录各路由等待和生产消息绑定/自动化列表读取耗时。实际冷启动耗时、内存与目标设备体验仍需人工测量，构建体积缩小不等于性能已经验收。
## Teable 业务读写

迁移后的生产库、21 个视图、生产消息、焊接层级和原材料入库接入，环境配置、旧版本回退及桌面验收方法见 [Teable 业务接入](docs/teable-business.md)。塔筒月报/年报不迁移，机加工后续完善暂缓；不宣称整个 Notion 工作区已全面迁移。
