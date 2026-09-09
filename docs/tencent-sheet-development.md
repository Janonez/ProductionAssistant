# 腾讯文档填报（Development）

入口：自动化任务 → 新建任务 → 腾讯文档填报。此入口仅在 Development 注册，Production 的桥接调用也会拒绝访问。

## 使用

1. 创建时自动查找本仓库 `artifacts/tencent-docs-demo/config.json`，复用已有文档链接和模板设置；没有配置时粘贴分享链接。
2. 打开文档，首次使用扫码登录。点击“识别并检查”，识别不到的控件按提示去网页点选。高级设置默认折叠。
3. 输入本次下料、装焊、型材入库、板材入库四项实际数据。默认业务日期为北京时间前一天，也可用共享日期选择器指定补填日期。
4. 检查日期、公司、园区、材料表头及四个目标空格，确认预览后填报。修改数据或配置会使预览失效。

这是已验证 Demo 的正式测试版入口。当前四项数值沿用 Demo 手动输入；没有接入新的业务数据源，也未开放定时运行。默认模板为每月下料、装焊和入库表，不能把默认行列当作任意文档的自动识别结果；真正写入前仍要通过九项锚点校验。

## 边界

- `TencentSheetTaskHandler` 接入现有 `IAutomationTaskHandler`，拥有配置和记录；通用任务运行器不重试整个填报。
- `TencentSheetService` 使用持续的标准输入输出子进程通信，不开放本机 HTTP 端口。任务配置和浏览器会话位于 Development 数据目录，与 Demo、Production 分开。
- `TencentDocsBrowser` 拥有专用 Edge 会话；`TencentSheetClient` 借用页面，负责定位、读写和保存确认。关闭或取消后不会自动重新打开文档执行写入。
- 写入顺序保留已验证路径：名称框定位 → 读原内容 → 聚焦内容编辑区 → 再核对地址和空值 → 输入数字 → 核对输入 → Enter → 离开后重新读取。没有 F2、Tab、方向键探测、清空或覆盖。
- 所有非空目标（包括 0 和相同数字）均为冲突。预览确认绑定完整配置、日期和数值，有效期 2 分钟且只能消费一次。
- 入库日期按合并单元格左上角读取，型材、板材共享 `{sectionColumn}24`；不会搜索相邻非空格替代。
- 保存状态从可见状态提示读取；已存在的“已保存”不能证明本次成功。保存中时等待，保存错误立即停止；缺少状态过渡时采用延迟及刷新回读，最多三轮。任何数值输入后的错误均不重新写入，记录已提交和待确认地址。
- 读取阶段仅对明确的瞬态网络错误重试两次，间隔 1、2 秒；权限、登录、模板、配置、冲突和普通超时不重试。
- Playwright 复用已安装的版本，Development 发布时复制运行依赖；使用本机已有 Node.js 和 Edge。未新增 npm 依赖。

## 验证

- `scripts/verify.ps1 -SkipRestore`：前端测试、构建、.NET 测试和 Development 自包含发布，不同步 Production。
- `tests/tencent-sheet/check-browser.cjs`：独立的无头 localhost 表格，验证正式迁移后的定位、写入、冲突、保存失败；不访问真实文档。
- `tests/tencent-sheet/check-protocol.cjs`：文档域名、合并锚点和一次性确认绑定。
- `tests/tencent-sheet/check-ui.cjs`：正式 React 路由的本地模拟桥接及 1100×700 布局；截图不证明外部文档成功。
- 运行上述 Node 检查前，将 `NODE_PATH` 指向仓库现有 `tools/experiments/machining_summary/playwright_test/FineReportTest/node_modules`。

真实桌面扫码、共享文档权限和在线保存仍需用户在测试版验收。不要由自动检查启动用户桌面应用或访问用户文档。
