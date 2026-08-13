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

脚本依次验证前端 bundle、Release build 和 xUnit 测试，并生成两个 Windows x64 自包含目录：`publish\Debug` 是测试版，`publish\Release` 是正式版。桌面人工验收先运行 `publish\Debug\ProductionAssistant.exe`。

## 项目结构

- `ProductionAssistant.App`：WinUI 页面、导航、程序入口和依赖组装。
- `ProductionAssistant.Core`：模型、解析与纯业务计算，不依赖 UI 或外部系统。
- `ProductionAssistant.Infrastructure`：Notion、钉钉、Excel、PDF、DPAPI、本地文件和任务计划程序。
- `ProductionAssistant.Tests`：引用真实生产程序集的自动化测试。

各版本已经发布的用户可见变化见 [变更记录](CHANGELOG.md)。

## 日报自动推送

日报自动推送支持创建多个独立任务，组合 Notion 日、月、年数据生成消息，并按各自计划发送到钉钉群。每个任务统一管理消息内容、推送配置、定时设置和最近运行记录。

模板采用草稿、实际预览、测试发送、发布流程；敏感凭据使用 Windows DPAPI 加密。旧版单一日报配置会自动迁移，迁移后需重新启用任务以安装新版定时计划。

任务列表顶部汇总正常与异常数量：只有已启用任务计为正常，草稿和已停用任务均计为异常。任务必须停用后才能删除；从未安装 Windows 任务计划的新任务也可直接删除。任务详情中的操作结果跟随任务概览、消息内容、Notion 字段、推送配置和定时设置分区显示，删除成功使用一次性确认提示。

## 公共流程模板

应用按“文件处理、数据同步、自动化任务”组织入口，每个业务模块从侧边栏一级入口直接打开；这些名称是产品分类，不是统一执行引擎。当前挂网计划 PDF 与生产会资料拆分复用文件处理外壳，仅统一输入、按钮状态、进度、提示和输出入口；各自的检查、修复、拆分与导出规则仍由原业务服务负责。每日焊接和生产消息在各自页面连续显示操作区与配置区，并保留各自的预览、校验和写入流程；日报推送独立管理定时任务。

## 发布

`publish/` 不进入 Git。源码通过短分支和 PR 同步到 GitHub；本机只保留 `publish\Debug` 测试版和 `publish\Release` 正式版，不生成或提交 ZIP、artifacts 及其他发布产物。

## 安全与许可

请勿提交真实 Token、Webhook、数据库 ID、业务文件或个人信息；安全问题请按 [安全说明](SECURITY.md) 私密报告。本项目采用 [MIT License](LICENSE)。
