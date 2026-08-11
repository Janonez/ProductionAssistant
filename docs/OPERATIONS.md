# 构建、发布与验收

## 本地验证

关闭正在运行的 Debug 应用，然后执行：

```powershell
.\scripts\verify.ps1
```

若依赖已还原，可使用 `-SkipRestore`。成功标准为 ReportEditor bundle 无差异、Release build 成功、全部 xUnit 测试通过、Debug publish 成功。

## 手工验收

运行 `publish\Debug\ProductionAssistant.exe`，按改动范围检查：

- 首页导航、窗口缩放、原生 InfoBar 和各页面状态切换。
- 生产消息日期拆分、预览、存在记录检查及红色“覆盖写入”状态。
- 日报模板编辑、空白与显式零、预览、测试发送和定时任务。
- 使用测试 Notion 页面验证发现、Schema、检查和写入。
- 使用测试钉钉群验证签名和消息格式。
- 使用脱敏 Excel/PDF 样例验证输入未被覆盖、输出格式和分页。

未实际执行的项目必须记录为“未验收”，不能由 build、test 或 publish 替代。

## 发布

1. 更新 App 项目版本、`CHANGELOG.md`、PRD 和 HANDOFF 当前状态。
2. 完成本地验证与所需人工验收。
3. 通过短分支提交 PR，确认 CI 通过后使用 Squash and merge 合并到 `main`。
4. 拉取最新 `main`，创建并推送与 App 项目版本一致的 `vX.Y.Z` 标签。
5. 确认 GitHub Release 存在且包含 `ProductionAssistant-<tag>-win-x64.zip`。

## 回滚

- 源码回滚使用正常的反向提交，不改写 main 历史。
- 发布回滚重新发布最后一个已验收标签的 ZIP，并在 Release 说明中标记替代关系。
- 用户配置位于 `%LOCALAPPDATA%\ProductionAssistant`；升级前涉及配置迁移时先备份该目录。

## 密钥

Notion token 与钉钉密钥只保存在本机受保护配置中。不得写入源码、测试样例、Actions 日志或仓库变量明文。
