# Git 工作流程

`main` 始终保持可发布。开发版是本机 `publish\Debug`，正式版只来自 GitHub Release。

## 日常开发

```powershell
git switch main
git pull --ff-only
git switch -c feat/简短名称   # 修复使用 fix/，文档使用 docs/，维护使用 chore/
```

开发过程中可以小步提交；不要提交 `publish/`、`artifacts/`、`bin/obj`、`node_modules`、密钥或真实业务样例。

提交前执行：

```powershell
.\scripts\verify.ps1
```

然后运行 `publish\Debug\ProductionAssistant.exe`，检查程序启动和受影响模块。未实际测试的外部系统或桌面行为在 PR 中写入“未验收”。

```powershell
git push -u origin HEAD
gh pr create --fill
```

CI 通过后使用 **Squash and merge**。最终提交使用 `feat:`、`fix:`、`refactor:`、`docs:`、`test:` 或 `chore:` 前缀。合并后删除短分支，并从最新 `main` 开始下一项工作。

## 正式发布

- 修复升级补丁号，例如 `1.4.1`。
- 兼容的新功能升级次版本，例如 `1.5.0`。
- 破坏性变化才升级主版本。

按 [运维手册](OPERATIONS.md) 完成验证和人工验收后推送 `vX.Y.Z` 标签。标签版本必须与 App 项目版本一致；Release workflow 会拒绝不一致的标签。

## 回滚

不改写 `main` 历史。代码问题使用 `git revert` 创建反向提交；已发布问题修复后发布新的补丁版本，不移动或覆盖旧标签。
