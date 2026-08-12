# 安全说明

请勿在公开 Issue、Discussion、PR 或日志中提交 Notion token、钉钉 Secret、Webhook、真实数据库 ID、业务文件或个人信息。

发现安全问题时，请使用仓库 **Security → Report a vulnerability** 私密报告，不要创建公开 Issue。

本项目的用户配置保存在 `%LOCALAPPDATA%\ProductionAssistant`，Notion 令牌和各日报任务的钉钉凭据由当前 Windows 用户的 DPAPI 保护。配置、日志和真实业务样例不得提交到仓库。
