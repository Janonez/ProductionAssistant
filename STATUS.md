# ProductionAssistant 交接状态

## 当前状态

- 项目包含 WinUI / WebView2 应用、React 前端、共享 Bridge、Sidecar 和 Electron 开发外壳；后者尚未替代 WinUI。结构和运行方式见 [README.md](README.md)。
- SD-8c 已完成：日报本地配置迁移通过 [PR #77](https://github.com/Janonez/ProductionAssistant/pull/77) 合并，提交 `fe4c08c`。这是后端迁移，不代表新 UI 已实现。
- [PR #78](https://github.com/Janonez/ProductionAssistant/pull/78) 已合并，内容是 AI 工作区交接文档，不是 UI-0 的 PR；当前 HEAD 为 `afd5abe90617b6260a2791699546d11714467bf7`。
- 用户已决定前端设计迁移与后端功能迁移交替推进，顺序以 [PLAN.md](PLAN.md) 为准；SD-8c 之后依次为 UI-0 → UI-1a → UI-1b → UI-2 → SD-8d → UI-3。
- UI-0 只读架构调查与 [接入方案](docs/ui0-shadcn-admin-integration.md) 已完成；三个文档 `PLAN.md`、`STATUS.md`、`docs/ui0-shadcn-admin-integration.md` 已暂存，尚未提交或创建本次文档 PR。没有实施 UI-1a / UI-1b、修改运行代码或更新稳定版。
- 核查结论：保留现有 React/Vite、查询参数路由和统一桥接，渐进接入 shadcn-admin；日报完整工作流仍有 Sidecar 接口缺口。详细事实、能力表和验收边界只在 UI-0 文档维护。

## 下次入口

1. 只读检查 `git status -sb`、`git worktree list`、分支和最近提交，按实际状态更新判断。
2. 当前仅完成三个文档的最小修正与重新暂存，不 commit、push 或创建 PR。后续获授权后完成 UI-0 文档 PR；CI 未完成时只报告状态，不反复轮询，纯文档在 CI verify 通过后按项目规则 squash 合并。
3. 完成文档 PR 后申请 UI-1a 授权；UI-1a 在 Electron Development 验收新外壳后进入 UI-1b，再进入 UI-2，不直接进入 SD-8d。
4. UI-2 实施前确认日报能力范围；不能把 SD-8c 开放创建/保存模板视为预览、发送、启停等完整链路已迁移。

## 待决策

- UI-1a 的视觉预览与实施范围待授权；UI-1b 及后续阶段分别授权，路线决定不自动授权后续代码修改。
- UI-2 按已开放接口分批交付，或先另行授权补齐接口后完整验收，见 UI-0 第 5 节。

## 归档

历史实现和验证证据以 git log、对应 PR 和专题文档为准。
