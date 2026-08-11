# 生产助手

面向生产业务的 Windows x64 WinUI 3 桌面工具，包含每日焊接模拟、挂网计划 PDF、生产会资料拆分、生产消息入库和日报自动推送。

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

脚本依次验证前端 bundle、Release build、xUnit 测试和 Debug self-contained publish。人工验收入口为 `publish\Debug\ProductionAssistant.exe`。

## 项目结构

- `ProductionAssistant.App`：WinUI 页面、导航、程序入口和依赖组装。
- `ProductionAssistant.Core`：模型、解析与纯业务计算，不依赖 UI 或外部系统。
- `ProductionAssistant.Infrastructure`：Notion、钉钉、Excel、PDF、DPAPI、本地文件和任务计划程序。
- `ProductionAssistant.Tests`：引用真实生产程序集的自动化测试。

各版本已经发布的用户可见变化见 [变更记录](CHANGELOG.md)。

## 发布

`publish/` 不进入 Git。推送 `v*` 标签后，GitHub Actions 验证项目、生成 Windows x64 ZIP 并附加到 GitHub Release。

## 安全与许可

请勿提交真实 Token、Webhook、数据库 ID、业务文件或个人信息；安全问题请按 [安全说明](SECURITY.md) 私密报告。本项目采用 [MIT License](LICENSE)。
