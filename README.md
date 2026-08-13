# 生产助手

面向生产业务的 Windows x64 WinUI 3 桌面工具，包含每日焊接模拟、挂网计划 PDF、生产会资料拆分、生产消息入库和自动化任务。

## 环境

- Windows 10 1809 或更高版本
- .NET 8 SDK（版本由 `global.json` 固定）
- Node.js 22（仅用于 ReportEditor 构建）
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

脚本依次验证前端 bundle、Release build 和 xUnit 测试，默认只生成 Windows x64 自包含测试版 `publish\Debug`。只有明确需要同步正式版时才传入 `-SyncRelease`，生成或覆盖 `publish\Release`。桌面人工验收先运行 `publish\Debug\ProductionAssistant.exe`。

## 新版首页与生产消息界面

首页和“生产消息 Notion 入库”现直接使用 React + TypeScript 新版界面，并复用 WinUI 壳的唯一侧栏，不在页面内嵌套第二套导航。原生页面代码继续保留用于回退，配置文件与 Windows 后台能力保持不变。生产消息遵循“解析 → 核对 → 检查数据库 → 写入”：解析不联网，编辑结果会使已有检查失效，写入时后端仍会复查。日期控件支持日期、月份、12 年网格三级选择；数据源区按下料消息和塔筒消息显示实际数据库去向。`scripts\verify.ps1` 会同时执行前端测试、类型检查和离线生产构建。

## 项目结构

- `ProductionAssistant.App`：WinUI 壳与页面、React/WebView2 前端资源、导航、程序入口和依赖组装。
- `ProductionAssistant.Core`：模型、解析与纯业务计算，不依赖 UI 或外部系统。
- `ProductionAssistant.Infrastructure`：Notion、钉钉、Excel、PDF、DPAPI、本地文件和任务计划程序。
- `ProductionAssistant.Tests`：引用真实生产程序集的自动化测试。

各版本已经发布的用户可见变化见 [变更记录](CHANGELOG.md)。

## 日报自动推送

日报自动推送支持创建多个独立任务，组合 Notion 日、月、年数据生成消息，并按各自计划发送到钉钉群。每个任务统一管理消息模板、推送配置、定时设置和最近运行记录。

模板采用草稿、实际预览、测试发送、发布流程；敏感凭据使用 Windows DPAPI 加密。旧版单一日报配置会自动迁移，迁移后需重新启用任务以安装新版定时计划。

任务详情将消息模板与数据源面板固定按 7:3 左右显示，编辑框右上角使用单一开关切换编辑/实时预览。字段按“完整数据页 → 原始数据库 → 数据字段”逐级选择，业务日期胶囊也从数据源面板插入；任务启停和测试发送位于任务概览。应用窗口最小尺寸为 1100×700。

任务列表顶部汇总正常与异常数量：只有已启用任务计为正常，草稿和已停用任务均计为异常。任务必须停用后才能删除；从未安装 Windows 任务计划的新任务也可直接删除。发送时间和启停操作位于任务概览，运行记录默认显示最近 5 条并可查看最多 100 条；删除成功使用一次性确认提示。

## 公共流程模板

应用按“文件处理、数据同步、自动化任务”组织入口，每个业务模块从侧边栏一级入口直接打开；这些名称是产品分类，不是统一执行引擎。当前挂网计划 PDF 与生产会资料拆分复用文件处理外壳，仅统一输入、按钮状态、进度、提示和输出入口；各自的检查、修复、拆分与导出规则仍由原业务服务负责。每日焊接和生产消息在各自页面连续显示操作区与配置区，并保留各自的预览、校验和写入流程；日报推送独立管理定时任务。

## 发布

`publish/` 不进入 Git。源码通过 Git 同步到 GitHub；本机保留 `publish\Debug` 测试版和 `publish\Release` 正式版。版本发布时从正式版生成 Windows x64 自包含 ZIP，并附加到对应 GitHub Release，ZIP 不提交 Git。

## 安全与许可

请勿提交真实 Token、Webhook、数据库 ID、业务文件或个人信息；安全问题请按 [安全说明](SECURITY.md) 私密报告。本项目采用 [MIT License](LICENSE)。
