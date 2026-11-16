# 集团填报网页配置

网页配置采用现有 shadcn/ui Item 的 outline 变体，将八种状态统一为 56px 配置行，文档图标为 20px FileText。名称单行截断、状态 Badge 和操作区不收缩；输入框使用官方 Input，通过局部样式与外层融合。未改动基础组件、全局主题、业务配置布局或日期标定规则，无新增依赖。

## 状态与操作

| 状态 | Badge | 主要按钮 |
| --- | --- | --- |
| 未配置 | 无 | 连接 |
| 未检测 | 未检测 | 检测 |
| 检测中 | 检测中和 Spinner | 无 |
| 已连接 | 已连接 | 打开文档 |
| 登录失效 | 登录已失效 | 扫码登录 |
| 链接无效 | 不是表格链接 | 更换文档 |
| 只读 | 只有查看权限 | 打开文档 |
| 无法打开 | 无法打开 | 重新检测 |

标签、颜色和主要动作由 DocumentConnectionItem 中同一份状态映射驱动。文档名称读取不到时显示“腾讯文档”，Tooltip 展示完整链接。右侧最多一个主要按钮，更多菜单依次为重新检测、更换文档、复制链接、清除登录状态。

未配置时空白链接禁用连接，Enter 提交；同步在途锁防止重复提交。更换文档保留原链接，可取消；只有现有配置接口确认保存后才替换原配置。复制链接使用 Sonner 反馈。清除登录状态显示 AlertDialog 说明当前不可用及共享会话可能受到的影响，确认按钮禁用。

## 业务边界

本批只实现 UI，未修改后端、Bridge、Sidecar 或浏览器 Worker。进入页面读取现有 sessionStatus；手动检测、登录和打开文档复用现有 sessionVerify / sessionOpen，配置保存沿用现有 create / save。保存链接或打开浏览器不表示连接成功。

现有接口不能提供可靠的实际名称、服务端认证和可编辑证据，实际页面通常显示“腾讯文档 / 未检测”，或已经能识别的登录、只读及异常状态。已连接状态的正向证据仅由隔离 UI 夹具提供，不证明真实腾讯文档可写。

真实认证、文档类型与权限检测、共享会话清除及统一刷新、填报前实时校验留到后续步骤。本批未执行真实填报、云端保存、清除登录或调度，也未修改 Production、版本号、标签或 Release。

## 代码与验证

- DocumentConnectionItem 组合官方 Item / ItemMedia / ItemContent / ItemTitle / ItemActions、Input、Button、Badge、Spinner、DropdownMenu 和 Tooltip，替代原 DocumentConnectionAlert。
- SubmissionConnection 负责草稿、取消、既有 Bridge 操作、在途锁、迟到响应保护及清除登录不可用提示。业务适配器中的未接入文档 Mock 已移除。
- SubmissionSettingsLoading 的网页占位同为 56px。SubmissionExecutionRules 仅更新公共链接工具的导入路径。
- 集团填报专项 7 文件、96 项通过。完整 verify 通过：React 459 通过 / 1 项既有跳过、Electron 122/122、.NET 372/372、TypeScript / Vite、浏览器回归、构建和 Development 发布。
- tests/tencent-sheet/check-document-connection-ui.cjs 使用正式构建页面及隔离 Bridge 夹具，覆盖八状态、两主题和 1400/960px 窗口，共 32 组；验证 56px 行、20px 图标、长名称、无溢出、键盘菜单、取消和 Enter。浏览器矩阵纳入 check-ui.cjs，另支持 --electron 在真实 Electron Development 中检查同一组模拟状态。
- 浏览器和 Electron 夹具均通过；各状态的外框边界、图标位置和操作右边缘保持一致。UI 已于 2026-11-16 通过用户人工验收，真实业务能力仍以上述边界为准。

## 查看入口

运行 `npm.cmd --prefix src/ProductionAssistant.Desktop start -- --environment Development`，进入“数据报送 → 集团填报 → 设置 → 网页配置”。

隔离截图及尺寸记录保存在本机忽略目录 artifacts/document-connection-ui；完整验证日志为 artifacts/document-connection-final-verify.log。截图中的连接状态是模拟证据，不代表真实认证或权限验证。
