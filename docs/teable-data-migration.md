# Notion → Teable：生产库数据迁移

## 范围与结果（2026-10-09）

用户确认以 Notion 为准，并明确批准清理下料月计划中 25 条业务字段全空的记录。本轮只迁移此前确认的九个生产业务库，Notion 全程只读，Projects/People 不在写入范围。

| 数据库 | Notion / Teable 记录数 |
|---|---:|
| 焊接数据库 | 730 |
| 焊接月计划数据库 | 25 |
| 下料每月计划数据库 | 25 |
| 下料数据库 | 731 |
| 原材料入库数据库 | 645 |
| 塔筒产线数据库 | 62 |
| 塔筒产线月计划数据库 | 0 |
| 机加工数据库 | 406 |
| 发运量数据库 | 0 |
| **合计** | **2,624** |

本次新增 1,844 条，修正已有记录 51 条，更新 25 条下料月计划的关联字段（服务端同步反向关系），删除用户批准的 25 条空记录。复用已有焊接 755 条和下料月计划 25 条，不重复导入。

焊接修复包括：2025-01-18 的吨数从 48.5 恢复为 Notion 的 48.501；25 条月计划日期补齐。下料月计划的 25 条已有记录也按 Notion 对齐。数值不按 UI 显示精度舍入。

## 验证与平台差异

- 源记录 ID 到目标记录 ID 一一映射，分页读取全部记录，逐字段验证标题、文本、数值、日期起止和选项；严格区分 null 与 0，日期比较 UTC 时刻，不只比年月日。
- 两组关联从一端写入，回读两端全量集合；Notion 返回截断的 Relation 时继续分页获取全部关联。
- 逐条对照 Notion 的公式与汇总结果。机加工 744 个初始计算差异来自原日期型 IF 表达式，本机引擎重复换算时区使结果多出 8 小时；两条公式改用数值层 IF 后，全部计算值通过。
- 两条机加工「用户名称」原文有尾空格。Teable 的多行文本转换会 trim 首尾空白，目标省略了尾空格；校验仅对该已知类型允许此平台规范化，原文仍完整保存在源快照，`verification.json/textNormalizations` 单列这两条。文本内部空格不忽略。
- 用户此前删除了焊接日库和下料月计划的结束日期列。其源数据没有结束值，因此没有恢复无数据的列；如未来源记录出现结束日期而目标缺列，脚本会停止，不能静默丢弃。

验证针对数据库属性值及关联，不等于复制 Notion 页面正文、富文本标注/内嵌对象、页面权限、视图布局或自动化。多行文本迁移 plain_text；原始 Notion 属性 JSON 在本地备份。软件业务路由仍连接 Notion，尚未切换到 Teable。

结束时再次查询九个源库，记录集合与 `last_edited_time` 均未变化，未发现迁移窗口内的漏增或更新。更严格的 null/false 区分复验也已通过。

## 脚本和恢复

`codex/teable-data-migration` 在结构迁移分支基础上增加：

- `teable-data.ps1`：源/目标快照、修复、分批迁移、关联回填、回读与源端复查。
- `teable-data-functions.ps1`：值转换、比较和分页；`test-teable-data.ps1` 验证精度、空值、日期、文本及范围保护，接入 verify。
- `teable-api.ps1`：从结构脚本提取的共用 DPAPI/HTTP/原子文件操作。
- `teable-schema-plan.ps1`：修正日期差公式；对应回归检查阻止恢复旧日期 IF 写法。

要求 PowerShell 7.5+，在保存 DPAPI 凭据的原 Windows 用户上下文运行。源凭据取 Production Notion 配置，目标取 Development Teable 配置；明文 Token 不输出或落盘。

```powershell
# 首次只读快照；已有 state.json 时拒绝覆盖
pwsh -NoProfile -File scripts/teable-data.ps1 -Mode Snapshot
# 用户先行导入的焊接记录按标题唯一匹配，修正后逐值核对
pwsh -NoProfile -File scripts/teable-data.ps1 -Mode RepairWeld
# 仅在获得空记录清理授权后执行
pwsh -NoProfile -File scripts/teable-data.ps1 -Mode CleanEmpty
pwsh -NoProfile -File scripts/teable-data.ps1 -Mode Apply
pwsh -NoProfile -File scripts/teable-data.ps1 -Mode FixFormulas
pwsh -NoProfile -File scripts/teable-data.ps1 -Mode Verify
pwsh -NoProfile -File scripts/teable-data.ps1 -Mode CheckSource
```

默认输出位于 `artifacts/teable-data-migration`（Git 忽略）。源快照、修改前备份、源页/目标记录映射、修改后的公式映射及验证结果另归档到 `%LOCALAPPDATA%/ProductionAssistant/Development/teable-data-20261009`。归档副本包含 `schema-state.json`，脱离当前工作树核对时同时指定 `-OutputDirectory` 和 `-SchemaState`。

每次最多创建 100 条，POST 前原子写入 pending，收到响应后验证字段再持久化映射；不自动重试创建。若响应不确定，脚本停止，再用 `ReconcilePending` 只读核对已落库的未登记记录。仅当全部字段能唯一匹配、数量和 ID 均无歧义时恢复映射；否则保持停止。本轮机加工一批因尾空格规范化暂停，已按此流程恢复 100 条映射，没有重复写入。

`state.json` 绑定实例、Base 和每个源快照的 SHA-256，源快照变动后拒绝沿用。Apply 只更新有映射的记录，不接管未知目标记录；CleanEmpty 仅删除已记录且重新检查仍为空的批准记录。保留源快照和 state，不能删除检查点后重新整批导入。

所有实际业务快照与差异均留在本机归档，不加入 Git。CheckSource 比较迁移前后源 ID 集合和 last_edited_time，用于发现迁移窗口内的源端变化；它不是持续同步任务。
