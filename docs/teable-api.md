# Teable API 联调

当前阶段只提供 Infrastructure API 客户端和命令行联调入口。生产消息、焊接、日报和腾讯文档取数仍连接 Notion；API 验证通过不代表业务已完成迁移。不创建数据库结构，不改变线上配置。

## 配置和读取

在仓库根目录运行（.NET 8 / Windows）：

```powershell
dotnet run --project tools/TeableProbe -- configure
dotnet run --project tools/TeableProbe -- check
```

configure 交互输入实例 HTTPS 地址（可带 `/api`）、测试表 ID `tbl...`、API Token。Token 隐藏输入，复用 Windows DPAPI 加密，仅当前 Windows 用户可解密。配置保存在 Development 数据目录的 `teable-settings.json`，不返回前端，不打印令牌。若使用 `PRODUCTIONASSISTANT_DATA_DIR`，配置位于该根目录下的 Development 子目录。

也可用 `configure <实例地址> <表ID>` 预填非敏感参数，此时仅交互输入 Token。本机实例地址使用 `http://127.0.0.1:3000`，不要传整个浏览器表链接。

Token 至少需要测试表的读取权限及对应 Base 资源授权；写入还需要创建记录权限。空表也能验证读取。工具只打印抽样条数和耗时，不打印业务内容。

客户端使用直连（`UseProxy=false`），禁用 HTTP 重定向，超时 30 秒。系统代理关闭不等于绕过 VPN/TUN 路由；应在实际部署网络下验证。仅本机回环地址允许 HTTP。远端自建实例请使用 HTTPS。

## 指定测试写入

先在测试表准备可写字段。创建本机 JSON 文件，以实际字段 ID 为键，例如：

```json
{ "fld实际文本字段ID": "API联调测试" }
```

```powershell
dotnet run --project tools/TeableProbe -- write C:\Temp\teable-fields.json
```

此命令先检查读取，再真实创建一条记录，打印记录 ID，然后按该 ID 回读并逐个比对输入字段。仅使用普通文本或数字字段进行初次联调，日期、关联等类型可能有服务端规范化，需要后续业务映射处理。工具不自动删除记录，按打印的 ID 在测试表手动清理。

写入不自动重试：超时、网络中断或响应异常时可能已经写入，必须先检查测试表。401 检查 Token，403 检查权限和资源授权，404 检查实例 API 路径与表 ID。HTTP 错误响应体不输出，避免泄露业务数据。

## 验证边界

### 2026-10-06 本机实测

- 实例 `http://127.0.0.1:3000`，表 `tblewKYmzUB8ystJ4uc`；健康检查 HTTP 200，未鉴权记录 API HTTP 401。
- 用户安全配置 Token 后，直连鉴权读取成功：首次 148 ms，写入前读取 74 ms（单次观测，不是性能基准）。字段元数据 API HTTP 200。
- 使用现有 Work Order、Customer、Product 文本字段及 Quantity 数字字段创建一条测试记录，随后按记录 ID 回读，四个输入值全部相同。
- 测试记录 `recfRMSxfgiEOdfRsMU` 保留供核对，Customer 标记为 `API联调测试（可删除）`。没有改动现有记录、表结构、关联或 Notion 业务路由。
- DPAPI 配置必须由保存它的同一 Windows 用户解密；隔离执行账号无法读取时，应在原用户上下文运行工具，不要重新保存或复制明文 Token。

离线测试覆盖 API 路径、Bearer 鉴权、分页、写入负载、不重试、错误脱敏及令牌不序列化。真实连通需提供实例、测试表与本机配置的 Token 后运行 check / write；未经真实请求不能标记“API 已跑通”。

后续按业务优先级接字段映射、查询适配器和入库服务，再完善关联与汇总。当前没有切换业务数据库的开关，因为还没有接入任何业务执行路径。

官方契约：[读取记录](https://help.teable.io/en/api-reference/record/list-records)、[创建记录](https://help.teable.io/en/api-reference/record/create-records)、[回读记录](https://help.teable.io/en/api-reference/record/get-record)。
