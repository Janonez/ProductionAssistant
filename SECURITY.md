# 安全说明

请勿在公开 Issue、Discussion、PR 或日志中提交 Notion token、钉钉 Secret、Webhook、FineReport 账号密码或浏览器登录状态、真实数据库 ID、业务文件或个人信息。

发现安全问题时，请使用仓库 **Security → Report a vulnerability** 私密报告，不要创建公开 Issue。

Production 配置保存在 `%LOCALAPPDATA%\ProductionAssistant`，Development 配置位于其 `Development` 子目录。Notion 令牌、全局 `notification-settings.json` 中的钉钉凭据、FineReport 凭据及 NotionFill 密码由当前 Windows 用户的 DPAPI 保护；日报任务不再各自保存钉钉凭据。FineReport storage state 仅用于本机后台采集，同样不得复制、记录或提交。配置、日志和真实业务样例不得提交到仓库。
