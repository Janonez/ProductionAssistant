# 工作流程规则（必须遵守）

## 总原则
- 遇到不确定的情况先停下报告，不要自行决定。先只读检查，再动手。
- 删除、合并、推送、打稳定版、发布 Release 之前，先列出将执行的完整命令和影响范围，等我回复"确认"后才执行。
- 任何一步失败立即停止并报告原始输出，不要自行使用强制手段。

## 分支与 PR（PR + squash）
- 主目录是唯一的工作目录，不使用 git worktree，不创建额外的工作树文件夹。平时停在 main，不在 main 上直接改代码。
- 每个需求开始前：确认 `git status -sb` 干净 → `git switch main` → `git pull --ff-only` → `git switch -c codex/简述`，在这个分支上开发。切换分支前工作区必须干净；有未提交的改动时先告诉我，不要自行 stash、丢弃或带着改动切换。
- 推送前必须运行 `.\scripts\verify.ps1`，不通过不得推送。
- 前端源码有改动时，随应用提交的前端产物（Assets/Prototype/dist）按现有做法一并更新。
- 通过 GitHub PR 合并，合并方式只用 squash。PR 标题写成一句中文的用户可见变化；纯重构、清理、文档分别以"重构："、"清理："、"文档："开头。PR 正文写明：改了什么、验证结果、是否涉及版本号或发布。
- 合并前确认 CI 通过（`gh pr checks`），并经我确认。
- 合并后：在主目录 `git switch main`，`git pull --ff-only`，再运行 verify。稳定版必须从合并后的 main 打，不得从需求分支打。
- 提交前只按路径暂存本次需求要改的文件（`git add <路径>`），不要使用 `git add -A` 或 `git add .`。verify.ps1 会重新生成已跟踪的前端产物（Assets/Prototype/dist、Assets/ReportEditor/editor.js）；如果本次需求没有改前端源码，这些改动必须先查明原因，确认是纯构建差异后再还原，不得原样提交。

## 清理分支
- 远程分支在 PR 合并后由 GitHub 自动删除。
- squash 合并后 `git branch -d` 会拒绝。删除本地分支前，必须先确认对应 PR 为 MERGED，且分支顶端提交等于该 PR 的 headRefOid；确认后允许对该分支使用 `git branch -D`，但要先向我列出分支名和 PR 编号。
- 删除前，把"完整提交哈希 分支名"追加到仓库外的存档文件 D:\zhang\工作\ChatGPT\branch-backup-20261012.txt。
- 严禁通配符或管道批量删除分支，必须逐个写明分支名。
- 本流程不使用工作树；如果 `git worktree list` 里出现除主目录以外的条目，先报告，不要自行处理。

## 禁止的操作
- `push --force`、`reset --hard`、`clean -fd`、改写已推送的历史、直接向 main 推送。

## 两个运行环境
- 同一份代码，靠运行环境区分：deployments\development 是测试版，deployments\production 是稳定版。
- 测试版与稳定版连接同一个 Teable 库；测试写入类功能前必须先提醒我。
- verify.ps1 默认只生成测试版，加 -SyncRelease 才会生成稳定版。

## 更新本机稳定版（-SyncRelease）
- 只能在主目录、当前分支为 main、已 pull 到最新、工作区干净时执行，并且先问我。
- 执行前：确认软件已关闭；把现有 deployments\production 备份为 deployments\production-backup-before-<提交短哈希>-<时间戳>；另把 %LOCALAPPDATA%\ProductionAssistant 目录压缩备份到 deployments 下，文件名含时间戳。
- 备份保留：新稳定版验证正常后，只保留最近一份 production 备份；更早的 production 备份删除前先列清单问我。测试版（development）不做备份，直接覆盖。deployments 下常规只保留 development、production 两个文件夹。
- 回滚：关闭软件，用最近一份 production-backup-before-* 替换 production。

## 对外发布（GitHub Release）
- 版本号只在 src/ProductionAssistant.App/ProductionAssistant.csproj 的 `<Version>` 修改，并同步 AssemblyVersion、FileVersion、InformationalVersion。
- 只修 bug 升第三位，新增功能升第二位。
- 同步更新 CHANGELOG.md，只写用户可见变化，遵循文件开头的规则；整理时参考 `git log 上一个版本标签..main`。
- 顺序：改版本与变更记录 → verify → 推送并经 PR 合并 → 确认 CI 通过 → 打标签 v版本号 → 打稳定版 → 生成 ZIP → 发布 Release。每一步先问我。

## 安全
- 不提交 Token、Webhook、数据库 ID、业务文件、个人信息；提交前检查暂存区。
- deployments 目录和各类备份不进 Git。

## 每次完成后输出
- `git status -sb`、`git worktree list`、`git --no-pager branch` 的结果。
