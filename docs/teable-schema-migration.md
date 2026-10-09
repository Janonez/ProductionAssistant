# Notion → Teable：生产库结构迁移

本文的空表验收是 2026-10-06 历史状态。2026-10-09 已完成字段数据及关联迁移，见 [数据迁移记录](teable-data-migration.md)。有数据后不要重新运行结构 Apply；当前映射及验收以数据迁移归档为准。

## 本分支交付

`codex/teable-schema` 基于已经合并的 API 基建，通过真实 Notion 元数据建立生产业务库的 Teable 空表结构。只迁移用户确认的焊接、下料、原材料入库、塔筒产线、机加工和发运，不迁移工具箱、任务跟踪器、共享文档。

新增 `scripts/teable-schema.ps1`（盘点、计划、执行、验证）、纯转换 `teable-schema-plan.ps1` 和无需凭据的 `test-teable-schema.ps1`。转换检查已接入 `scripts/verify.ps1`。本分支没有替换软件的 Notion 业务调用，也没有部署应用。

## 2026-10-06 实际结果

目标为现有本机实例 `http://127.0.0.1:3000`、Base `bseP4L13CHZZyCtTMZS`。9 张表全部回读验证为空，未复制或插入任何业务记录。现有 Projects、People 的字段元数据与迁移前快照完全一致。

| 来源数据库 | 原字段数 | 日期结束字段 | Teable 表 ID |
|---|---:|---:|---|
| 焊接数据库 | 4 | 1 | tblig7BifOxRHZWJQ4A |
| 焊接月计划数据库 | 4 | 1 | tblSGBIOBXrGAfHyao4 |
| 下料每月计划数据库 | 5 | 1 | tblciIWUOTJQ8K0EVlw |
| 下料数据库 | 5 | 1 | tblXDCvRKaT11I8KOxq |
| 原材料入库数据库 | 5 | 1 | tblNWjLwOAHsd89bPis |
| 塔筒产线数据库 | 8 | 1 | tblbPTnApiVuqNcVnEr |
| 塔筒产线月计划数据库 | 1 | 0 | tblIrcqntbIA9dHg7nI |
| 机加工数据库 | 12 | 2 | tbl5DbpWiE8NeALALJk |
| 发运量数据库 | 1 | 0 | tbly9l6Y0C9hr6K8rOF |
| 合计 | 45 | 8 | 53 个目标字段 |

塔筒月计划及发运量库在 Notion 实时结构中只有标题字段，按实际结构迁移，不猜测后续字段。月计划标题中的前导空格也保留，后续接线必须按映射 ID，不能靠名称猜测。

## 类型及计算规则

- 标题 → Teable 主文本字段；富文本 → 多行文本；普通数值 → 数字字段。数值显示两位小数，不对存储值做业务取整。
- 日期：原字段保存 Notion `start`，另加 `原名（结束）` 保存 `end`；单日 `end` 留空。显示格式 YYYY-MM-DD，时区 Asia/Shanghai。日期显示不等于禁止保存时间；后续数据迁移需保留原时间及时区语义。
- Select/Status → 单选，保留全部选项名称和顺序；颜色映射到 Teable 对应色系。Notion Status 的三段分组没有等价原生类型，原分组保存在字段说明及本地映射，不声称迁移了状态分组交互。
- 焊接日库「所属月份」↔ 月计划「包含日期」；下料月计划「每日数据分解」↔ 日库「所属月份」。使用真正双向关联，同一组两端互相指向。Notion 元数据未给出关系基数限制，保守采用 manyMany，不额外强制一日只能关联一月。
- 下料月计划「模拟下料」：通过真实关联汇总日库「下料（吨）」，表达式 `sum({values})`。
- 原材料「去年同期」：日期非空、年份等于去年且日期不晚于去年今日；使用 Teable `DATE_ADD`、`YEAR`、`TODAY`，时区固定 Asia/Shanghai。原始 Notion 公式保留在说明与映射。
- 机加工「实际加工」「上报」：结束与开始相差天数加一；结束为空时取开始（单日为一天），开始为空返回空值。空日期的显示处理显式采用空值，后续数据验收需一并核对。

数据迁移时发现本机引擎对日期型 IF 分支结果重复换算时区，旧表达式会多出 8 小时。已改为数值层 IF：`IF(start=BLANK(),BLANK(),IF(end=BLANK(),1,DATETIME_DIFF(end,start,'days')+1))`，并逐条对照 Notion 计算值验证通过。

服务器已接受三个公式，字段回读无 `hasError`；表达式与依赖 ID 已核对。本轮没有插入用于验证计算结果的样例记录，不能把结构验收表述为真实业务数据计算验收。

## 执行与恢复

需要 PowerShell 7，以及保存 DPAPI 凭据的同一 Windows 用户。默认只读 Production 的 Notion 配置、使用 Development 的 Teable 配置；不复制或覆盖生产凭据。

```powershell
pwsh -NoProfile -File scripts/teable-schema.ps1 -Mode Inspect
pwsh -NoProfile -File scripts/teable-schema.ps1 -Mode Plan
pwsh -NoProfile -File scripts/teable-schema.ps1 -Mode Apply
pwsh -NoProfile -File scripts/teable-schema.ps1 -Mode Verify
pwsh -NoProfile -File scripts/test-teable-schema.ps1
```

本次已经执行完成，不需要重新建表。以上默认目录为 `artifacts/teable-schema`，实际快照及字段映射不加入 Git；独立归档位于 `%LOCALAPPDATA%/ProductionAssistant/Development/teable-schema-20261006`。对归档核对可传 `-OutputDirectory` 指向该目录。

Inspect 只读生产板块元数据和目标表字段，不读取 Notion 业务行；已有执行状态时拒绝覆盖快照。Plan 是离线转换，遇到范围变化、未知类型、未知公式直接停止。Apply 只新建带源数据库标记的表，拒绝接管普通同名表；显式传入空 records 数组，防止产生默认示例行。只修改本次新建的双向关联字段名称，不删除表或字段。

中断时保留状态，再次 Apply 依据计划哈希、实例地址、源表标记与稳定字段 ID 恢复；不自动重试 POST，不重复创建已经确认的对象。已填入记录的迁移表会停止执行，避免后续用户数据被结构脚本影响。不要删除执行状态后盲目重跑。

`migration-state.json` 保存 Notion source/property ID → Teable table/field ID 的精确映射（包含反向字段和日期结束字段），后续业务接线必须复用。`notion-schema.json`、`teable-before.json`、`plan.json` 和 `verification.json` 分别记录来源、原状、计划及验收。迁移失败时的 `last-error.json` 仅供诊断，不代表最终验收状态。

## 后续边界

Notion 的视图筛选、排序、布局、页面正文、权限和自动化未迁移；每表仅创建「全部记录」Grid 视图。数据迁移还需处理记录 ID、关联回填、日期范围及富文本内容。软件的查询适配器、生产消息及其他写入仍走 Notion，不能据此宣称软件已脱离代理依赖。

契约依据：[Teable 建表](https://help.teable.io/en/api-reference/table/create-table)、[建字段](https://help.teable.ai/en/api-reference/field/create-field)、[公式函数源码](https://github.com/teableio/teable/blob/develop/packages/core/src/formula/functions/common.ts)。具体可用性以本机实例回读结果为准。
