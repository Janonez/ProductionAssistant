# ProductionAssistant 计划

## 目标

维护面向生产业务的 Windows 桌面工具。项目功能和运行方式以 [README.md](README.md) 为准，开发、合并和发布流程以 [AGENTS.md](AGENTS.md) 为准。

## 方案

- Core 承载纯业务，Infrastructure 处理外部系统，Bridge 提供请求分发和会话管理。
- WinUI 应用和 Sidecar 复用 Bridge；Electron 开发外壳通过标准输入输出连接 Sidecar。
- React 前端通过统一桥接与宿主通信。宿主迁移依据见 [Electron 宿主设计](docs/electron-host-design.md)。

## 阶段范围

- 已实现能力和当前工作入口记录在 [STATUS.md](STATUS.md)，实现历史查 git log。
- 后续开发按用户下达的单项需求推进，每项需求先确认仓库状态，再按项目流程实施和验证。
- 设计文档中的决定不自动授权后续实现、删除、部署、版本标签或发布。

## 决策记录

架构决策集中维护在对应设计文档，不在此复制。待用户决定的当前问题写入 `STATUS.md`。
