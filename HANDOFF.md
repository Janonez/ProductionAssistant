# 生产助手当前交接

更新时间：2026-08-11

## 当前状态

- 当前版本：1.4.0。
- 解决方案已拆为 App、Core、Infrastructure、Tests 四项目。
- 页面通过 App 组合根取得外部服务，不再直接实例化 Notion、PDF 或 Excel 服务。
- 原 Smoke 回归已迁移至 xUnit，并直接引用 Core 与 Infrastructure。
- CI 在 main push 和 PR 上验证；`v*` 标签生成 GitHub Release ZIP。
- 发布产物和嵌套 `node_modules` 不再进入版本库。

## 接手顺序

1. 阅读 `README.md` 和 `docs/ARCHITECTURE.md`。
2. 运行 `scripts\verify.ps1`。
3. 根据改动范围执行 `docs/OPERATIONS.md` 中的人工验收。
4. 功能行为以 `PRD.md` 为准，版本变化以 `CHANGELOG.md` 为准。

## 已知限制

- CI 不连接真实 Notion 或钉钉账户，也不验证 Windows 任务计划程序。
- WinUI 视觉和原生控件状态必须在 `publish\Debug\ProductionAssistant.exe` 中人工检查。
- Excel COM 与真实业务模板仍需在装有 Excel 的 Windows 机器上验收。
- Infrastructure 内的部分历史服务仍较大；只有在修改对应业务时按能力继续拆分，避免无行为收益的机械分割。

## 下一步

- 为钉钉签名、超时和取消补充更多无网络契约测试。
- 为脱敏 Excel/PDF 样例建立稳定的本地集成测试集。
- 每次发布前完成 `docs/OPERATIONS.md` 的人工验收清单。
