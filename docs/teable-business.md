# Teable 业务接入：读取与视图

`codex/teable-business` 从迁移合并提交 `9db3d5d` 开始。第一阶段接通 `IDatabaseQueryProvider`：数据库查询、日报取数、腾讯表格取数以及日报自动任务共用同一适配器。生产消息、焊接导入和其他写入仍使用 Notion，后续需接入字段冲突检查及重复写入保护。此分支不发布 Production 软件。

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

## Development 读取开关

```powershell
dotnet run --project tools/TeableProbe -- import-query-map <schema-state.json> <视图state.json>
dotnet run --project tools/TeableProbe -- query-check
dotnet run --project tools/TeableProbe -- enable-query
# 回退业务读取
dotnet run --project tools/TeableProbe -- disable-query
```

工具固定使用 Development；开关写入该环境的 `teable-query-settings.json`，重启应用后生效。初次导入默认关闭；启用前读取全部表和所有已映射视图。凭据继续从独立 DPAPI 配置读取，映射文件不包含 Token。Production 配置不自动修改。

适配器输出原 Notion 数据源、属性和 View ID，使现有绑定继续有效；视图取数显式使用对应 Teable viewId。未知视图绑定停止，不降级成全部记录。无视图的日期查询忽略默认视图筛选，完整分页读取后按北京时间筛选，当前规模上限十万条；规模增长时应改为服务端日期过滤。显式投影全部绑定字段，隐藏日期仍参与统计；保留 null/0 和数值精度。分页重复、字段 ID/名称/类型漂移或读取失败均不能作为零记录成功。启用后不自动回退 Notion，避免混用两份数据。

自动化测试覆盖北京时间午夜边界、null/0、数值精度、视图及隐藏日期投影、跨千条分页、重复记录和字段漂移。构建、CLI 实例读取不等于 WinUI/WebView2、定时任务或腾讯外部写入验收；需由用户在 Development 中验证数据库查询和日报预览。

## 2026-10-09 验证结果

21 个视图全部新建，配置回读及实际记录集合均与 Notion 一致。三个本年视图记录数为焊接 282、下料 282、塔筒 62。机加工九个设备视图分别为 51、57、59、51、51、37、35、26、39 条，汇总为 406 条。既有“天桥铣”未修改，迁移视图为“天桥铣 2”。

C# 实际适配器完成九张表（总计 2624 条）和全部 21 个视图读取。后端 137 项测试通过，完整 verify 的前端测试、Release 构建和 Development publish 通过；最后名称映射调整后又验证后端及 Development 编译。证据归档至 `%LOCALAPPDATA%/ProductionAssistant/Development/teable-views-20261009`。Development 查询映射已导入；Production 开关与运行中的部署未修改。
