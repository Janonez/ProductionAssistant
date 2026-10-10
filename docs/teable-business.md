# Teable 业务接入：查询、视图与当前模块读写

`codex/teable-business` 从迁移合并提交 `9db3d5d` 开始。数据库查询、日报取数、腾讯表格取数以及日报自动任务共用 `IDatabaseQueryProvider`。当前进一步接通生产消息、焊接月/日层级导入、原材料入库和原材料自动任务的原生 Teable 读写，复用既有业务校验与字段冲突交互。v1.7.0 起这些入口固定使用 Teable，合并后更新本机标准 `deployments/production`；本次不创建 ZIP 或 GitHub Release。

用户已确认读取可用，随后要求先跑通当前模块。塔筒月报、年报不使用，不迁移其旧绑定；机加工的后续正文、附件及业务完善暂缓。已迁移的九表字段数据与 21 个视图保留。正文/附件、权限、评论和其他 Notion 工作区功能不属于本轮交付，不能表述为整个工作区已全面迁移。

## 视图迁移

```powershell
pwsh -File scripts/teable-views.ps1 -Mode Inspect
pwsh -File scripts/teable-views.ps1 -Mode Plan
pwsh -File scripts/teable-views.ps1 -Mode Apply
pwsh -File scripts/teable-views.ps1 -Mode Verify
```

默认从本机 Development 的 `teable-data-20261009` 读取表结构及记录 ID 映射，可以用 `-SchemaStatePath`、`-DataStatePath` 指定其他迁移批次。脚本需要 PowerShell 7.5+，由保存凭据的 Windows 用户执行。

只迁移九张生产表的视图，不修改 Notion 和业务记录。不覆盖或删除用户已有 Teable 视图；新视图带 `NotionView:<来源ID>` 描述标记。用户已有同名视图时，保留 Teable 自动追加的编号，并记录实际名称，业务继续展示原 Notion 名称。创建前保存 pending，响应中断后只能按唯一标记回读恢复，禁止直接重新 POST。快照、计划、执行状态及验证结果放在 Git 忽略的 artifacts 目录，另需归档到本机数据目录。

当前 21 个视图均为 Notion table → Teable grid：迁移嵌套 and/or、选项 equals/does_not_equal、动态日期、排序、列顺序、显隐、宽度和冻结列。未知筛选/排序或引用未迁移业务字段时停止，不静默丢弃条件。Notion 已删除字段残留的 40 项显示配置记录在 `omittedColumns`，不创建假字段。拆分的日期结束列默认隐藏；全局换行映射为 tall 行高，逐列换行及 Notion 子任务展示选项没有等价转换。

**本年口径修复：**三个“本年截止今日”视图的 API 元数据只返回 `on_or_before: today`，但实际 Notion 查询只包含当年记录。基于实际结果补充动态 `isOnOrAfter/currentYear`，保留 `isOnOrBefore/today`，时区固定 `Asia/Shanghai`。不固化年份，也不依据标题修正其他视图。每个视图创建后回读请求指定的配置值，并通过数据迁移 ID 映射比较两边完整记录集合；任何差异立即停止。

API 依据：[Notion 视图对象](https://developers.notion.com/reference/view)、[Teable 创建视图](https://help.teable.ai/en/api-reference/view/post-table-view)、[Teable 记录查询](https://help.teable.ai/en/api-reference/record/list-records)。动态日期模式还核对了 Teable 官方 `packages/core/src/models/view/filter/operator.ts` 及日期筛选测试。

## 映射与环境检查

```powershell
dotnet run --project tools/TeableProbe -- import-query-map <schema-state.json> <视图state.json>
dotnet run --project tools/TeableProbe -- query-check
```

工具默认使用 Development。正式环境只读检查使用 `dotnet run --project tools/TeableProbe -- --environment Production query-check` 和 `business-check`。凭据从独立 DPAPI 配置读取，映射不包含 Token。`Enabled`、`WritesEnabled` 仅保留旧配置兼容，不再决定运行时提供方；disable 命令被拒绝，配置缺失或连接失败也不会回退 Notion。

适配器输出原 Notion 数据源、属性和 View ID，使现有绑定继续有效；视图取数显式使用对应 Teable viewId。未知视图绑定停止，不降级成全部记录。无视图的日期查询忽略默认视图筛选，完整分页读取后按北京时间筛选，当前规模上限十万条；规模增长时应改为服务端日期过滤。显式投影全部绑定字段，隐藏日期仍参与统计；保留 null/0 和数值精度。分页重复、字段 ID/名称/类型漂移或读取失败均不能作为零记录成功。启用后不自动回退 Notion，避免混用两份数据。

自动化测试覆盖北京时间午夜边界、null/0、数值精度、视图及隐藏日期投影、跨千条分页、重复记录和字段漂移。构建、CLI 实例读取不等于 WinUI/WebView2、定时任务或腾讯外部写入验收；需由用户在 Development 中验证数据库查询和日报预览。

## 当前模块读写

```powershell
dotnet run --project tools/TeableProbe -- import-business-bindings <原notion-settings.json>
dotnet run --project tools/TeableProbe -- business-check
```

正式应用读写统一使用 Teable。业务绑定单独保存为 `teable-business-bindings.json`：仅迁移已映射的数据源、标题/日期/数值绑定和模块映射，不解密、复制或伪造 Notion Token。Notion 原配置保留。内部兼容模型、桥接操作及任务类型沿用原名称，Teable 模式不调用 Notion 网络；设置界面显示 Teable 实例地址和令牌，并在验证新连接后才替换凭据。

`TeableBusinessStore` 使用实际字段 ID、显式投影、完整分页、北京时间日期转换和真实关联记录 ID。每次写入前核对字段 ID/名称/类型及关联目标；未知筛选即使在空表也拒绝执行。生产消息保留查重、空字段补写、字段 keep/use 和冲突确认；下料先校验日输入再创建月计划。焊接沿用同月/重复日期校验及月日关联维护。原材料入库保留 93 系统读取与预览确认规则，写入目标改为 Teable。

新增按表及业务日期加进程内和文件锁，写入前复查同日期记录；在 `当前环境数据目录的 `teable-write-journal`` 先保存 pending。POST 无自动重试，失败或回读不一致保持 pending，阻止同日期重发。应先核对日志和实际表内记录，再人工处理，不能直接删除日志重新整批执行。成功日志保留字段、记录 ID 和时间。更新前按本次查询快照复查拟写字段，PATCH 后回读；这不是服务端事务或与其他客户端之间的原子比较更新。月/日多记录操作也不是事务，中断后须按结果和日志核对已写部分。

实际使用的三个绑定为焊接、下料、塔筒日库。原材料任务沿用原数据源 ID 映射，无需另造目标表。Production 使用 `%LOCALAPPDATA%/ProductionAssistant` 中的独立凭据、映射和业务绑定；仅导入 Production 原绑定中已迁移的三个目标。原 Notion 文件、正式任务、93 凭据与通知设置保留。升级后须重启软件；定时任务原有启用状态保持不变。

## 当前模块验收与测试包

2026-10-10：完整验证通过，后端 147 项、前端 104 项；Production 连接配置、九表、21 个视图和全部业务字段/关联只读检查通过，现有正式任务五个来源/字段/视图绑定均已映射。正式九表当前共 2626 条（原材料已增加至 647 条），未向正式表写入测试记录。用户将“天桥铣 2”改回“天桥铣”，对应 ID 保持一致，Production 仅校准本机名称映射。

旧版本软件和配置备份可用于恢复；已在 Teable 新增的数据不会自动同步回 Notion，恢复前必须先核对期间写入。当前模块的 Development 桌面测试由用户确认；正式环境定时任务、93 系统读取、钉钉及腾讯外部填报仍按实际运行结果验收。

后端增加默认入口测试，确认映射缺失或旧开关关闭时仍只使用 Teable，且不读写原 Notion 配置。此前后端 145 项、前端 104 项测试通过，Release 编译及 Debug + Development self-contained publish 通过。新增测试覆盖原生 Teable 生产消息、焊接层级、原材料入库、无效日输入零写入、null/0/精度、重复日期、字段冲突、关联漂移、过期检查快照和不确定 POST 防重；测试中的 Notion HTTP 客户端拒绝所有请求。

六张带唯一运行标记的临时表完成真实 API 检查、新增、重复执行、冲突确认、更新、下料月计划关联、焊接月日层级和原材料写入回读。临时表保存证据后已清理，没有向正式业务表插入测试数据。正式九表只读回检仍为 2624 条。证据在 `artifacts/business-smoke/run-57356c68ecbb4aef86b19759e49b5b6a`，另归档至 Development 数据目录。

标准测试包位于主检出目录 `deployments/development`，使用 Debug 构建和 Development 环境；不再采用独立 `teable-test-*` 文件夹。用户已确认 Development 测试正常。本次更新本机 Production；构建及 API 检查不替代正式环境桌面验收。升级后手动检查设置连接及当前模块；本轮临时表验证没有运行 93 系统、实际计划任务、钉钉通知或腾讯外部填报。

## 2026-10-09 历史验证结果

21 个视图全部新建，配置回读及实际记录集合均与 Notion 一致。三个本年视图记录数为焊接 282、下料 282、塔筒 62。机加工九个设备视图分别为 51、57、59、51、51、37、35、26、39 条，汇总为 406 条。既有“天桥铣”未修改，迁移视图为“天桥铣 2”。

C# 实际适配器完成九张表（总计 2624 条）和全部 21 个视图读取。后端 137 项测试通过，完整 verify 的前端测试、Release 构建和 Development publish 通过；最后名称映射调整后又验证后端及 Development 编译。证据归档至 `%LOCALAPPDATA%/ProductionAssistant/Development/teable-views-20261009`。Development 查询映射已导入；Production 开关与运行中的部署未修改。
