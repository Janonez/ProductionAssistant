# 架构说明

## 依赖方向

```text
ProductionAssistant.App ──────────────> ProductionAssistant.Core
        │                                      ▲
        └──> ProductionAssistant.Infrastructure┘

ProductionAssistant.Tests ──> Core + Infrastructure
```

Core 不得引用 App、Infrastructure、WinUI、Windows App SDK、HTTP 或 Office COM。该约束由项目引用方向和 `ArchitectureTests` 共同检查。

## 项目职责

### App

包含 XAML、页面 code-behind、导航、桌面生命周期和 `AppServices` 组合根。页面负责显示状态和接收用户操作；外部服务实例只能在组合根创建。

### Core

包含生产消息模型与解析、日报数据模型、焊接模拟和计划审查结果等纯业务类型。Core 代码应能在无网络、无 Excel、无 WinUI 的测试进程中运行。

### Infrastructure

包含 Notion API、钉钉推送、设置持久化与 DPAPI、Excel COM、PDF 输出、日志和 Windows 任务计划程序。外部失败在此层转换为应用可展示的结果。

### Tests

xUnit 项目直接引用真实 Core 和 Infrastructure 程序集。测试分为纯业务回归、外部协议契约、本地文件集成和架构边界；真实账户与桌面视觉不属于 CI 证明范围。

## 模块映射

| 功能 | App 页面 | 核心/基础设施 |
| --- | --- | --- |
| 每日焊接 | `DailyWeldSimulationPage` | `WeldSimulationService`、Notion 适配 |
| 挂网计划 | `PlanPdfExportPage` | `PlanPdfService` |
| 生产会资料 | `ProductionMeetingExportPage` | `ProductionMeetingExportService` |
| 生产消息 | `ProductionMessagePage` | `ProductionMessageParser`、Notion 适配 |
| 日报推送 | `DailyReportPage` | `DailyReportService`、Runner、Scheduler |

## 设计约束

- 保持单一 Windows x64 可执行入口，包括 `--send-daily-report`。
- 不因只有一个实现而创建接口；只有外部边界或测试替换需要时才抽象。
- 缺失值和显式 `0` 是不同业务状态，跨层传递时不得合并。
- 保留原生 WinUI 控件及现有配置文件兼容性。
