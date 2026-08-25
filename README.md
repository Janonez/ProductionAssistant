# 生产助手

面向生产业务的 Windows x64 WinUI 3 桌面工具，包含每日焊接模拟、挂网计划 PDF、生产会资料拆分、生产消息入库、日报推送和报表中心。

## 环境

- Windows 10 1809 或更高版本
- .NET 8 SDK（版本由 `global.json` 固定）
- Node.js 22（用于前端构建及报表中心 Playwright 运行）
- Microsoft Excel（仅 Excel/PDF 相关功能运行时需要）

## 开始开发

```powershell
dotnet restore ProductionAssistant.sln -p:Platform=x64
dotnet build ProductionAssistant.sln -c Debug -p:Platform=x64 --no-restore
dotnet test tests\ProductionAssistant.Tests\ProductionAssistant.Tests.csproj -c Debug -p:Platform=x64 --no-build
```

完整本地验证：

```powershell
.\scripts\verify.ps1
```

脚本依次验证前端 bundle、Release build 和 xUnit 测试，默认只生成 Windows x64 自包含测试版 `publish\Debug`。只有明确需要同步正式版时才传入 `-SyncRelease`，生成或覆盖 `publish\Release`。桌面人工验收先运行 `publish\Debug\ProductionAssistant.exe`。

## React 新版界面

桌面外壳、左侧操作栏、“生产消息 Notion 入库”、“日报推送”和“报表中心”直接使用同一个 React + TypeScript DOM，由单一 WebView2 承载。应用不再提供首页模块；左侧入口按文件处理、数据同步和自动化任务直接打开业务页面。尚未迁移的原生模块只覆盖右侧内容区，不替换 React 操作栏；配置文件与 Windows 后台能力保持不变。

生产消息使用“录入消息 → 解析确认 → 完成”三步页面：目标 Notion Schema 与消息解析并行准备，字段列表始终以目标库映射为准，解析值只填入对应字段；编辑值只更新本地状态，写入前由服务端复查。冲突按字段选择保留原值或使用新值，全部字段一致时返回“无需写入”，不执行 Notion 更新。塔筒消息只把“当日”值写入日报库，当月和全年累计不回填日报或新增月、年记录。

当前唯一视觉规范是暖中性 React 外壳、白色工作面、棕橙色主操作和 squircle 控件。前端统一使用 Inter Variable + Noto Sans SC Variable，字号按页面标题 26px、正文/区域标题 16px、控件/说明 15px、标签/状态/辅助信息 14px 分级，字重只允许 400、500、600、700。报表中心和生产消息已使用同一套 token；后续模块不得复制旧原生页面、旧绿色主题或历史 CSS 规则。

日报推送仍遵循“列表启停 → 基本信息 → 机器人 → 模板与数据源 → 预览测试 → 运行记录”，报表中心继续独立管理 FineReport 采集与汇总。`scripts\verify.ps1` 会执行字体字重检查、前端测试、类型检查、离线生产构建、Release 编译、xUnit 测试和 Debug 发布。

## 项目结构

- `ProductionAssistant.App`：WinUI 壳与页面、React/WebView2 前端资源、导航、程序入口和依赖组装。
- `ProductionAssistant.Core`：模型、解析与纯业务计算，不依赖 UI 或外部系统。
- `ProductionAssistant.Infrastructure`：Notion、钉钉、Excel、PDF、DPAPI、本地文件和任务计划程序。
- `ProductionAssistant.Tests`：引用真实生产程序集的自动化测试。

各版本已经发布的用户可见变化见 [变更记录](CHANGELOG.md)。

## 报表中心

报表中心首个业务是“机加工实开台时汇总”。用户配置原始日报根目录、汇总输出目录、FineReport 网页及本机加密账号密码，验证登录后手动选择开始和结束日期；汇总月份自动取结束日期所在月份。

运行时 Playwright 在后台启动一个 Chromium，从 `https://fr.tz.com.cn:8443/webroot/decision` 进入加工日报并在同一页面逐日查询、分页导出。原始文件按日期归档并在测试阶段覆盖同名文件；随后由 ClosedXML 动态识别“设备名称”和“实开台时”，校验日期与设备集合并生成 `机加工汇总_开始日期_结束日期.xlsx`。页面显示准备、导出、解析、生成汇总和完成五个真实阶段；任一日期重试三次后仍失败时继续采集其余日期，但本次不生成不完整汇总。

账号密码使用 Windows DPAPI 保存，浏览器登录状态和脱敏运行摘要保存在 `%LOCALAPPDATA%\ProductionAssistant`。真实 FineReport 登录、页面控件和最终 Excel 仍需在目标环境人工验收。

## 日报自动推送

日报自动推送支持创建多个独立任务，组合 Notion 日、月、年数据生成消息，并按各自计划发送到钉钉群。每个任务统一管理消息模板、推送配置、定时设置和最近运行记录。

配置自动保存；生成真实预览后才可测试发送，测试成功的配置进入“可启用”状态，再由用户从任务列表手动启用。敏感凭据使用 Windows DPAPI 加密。旧版单一日报配置会自动迁移，迁移后需重新启用任务以安装新版定时计划。
日报选择控件沿用 React 页面统一视觉；钉钉文本按模板结果原样发送，不会自动添加 `@所有人`。任务详情可使用已验证模板手动“发送今日消息”；Release 启用任务时若已过计划时间且当天没有成功记录会立即补发。只有 Release 可以安装和操作 Windows 定时任务，Debug 用于界面与手动流程测试，不显示 Release 的开启状态。

任务详情采用顶部四步流程，一次只显示当前需要完成的操作：基本信息保存后进入机器人配置，机器人参数保存并通过无消息网络连通检查后进入消息编辑，生成真实预览后进入最终测试。连通检查不会向群里发送消息，Webhook 和 Secret 只在最终测试发送时验证。模板与字段面板按 7:3 左右布局，字段按“业务数据页 → 具体数据库 → 数据字段”逐级选择，并可从多个数据库连续插入同一条消息。测试成功只进入“可启用”，仍需返回任务列表手动启用。应用窗口最小尺寸为 1100×700。

任务列表负责新建、启停和删除，并区分配置未完成、待测试、可启用、已启用和计划异常。整张任务卡可进入编辑；删除位于任务卡右键菜单并保留二次确认。任务必须停用后才能删除，从未安装 Windows 任务计划的新任务也可直接删除；新建任务与启停操作互不锁定。发送时间自动保存，已启用任务修改时间会立即更新计划；修改模板、字段或凭据会自动停用并要求重新测试。运行记录默认显示最近 5 条并可查看最多 100 条。

## 公共流程模板

应用按“文件处理、数据同步、自动化任务”组织入口，每个业务模块从侧边栏一级入口直接打开；这些名称是产品分类，不是统一执行引擎。当前挂网计划 PDF 与生产会资料拆分复用文件处理外壳，仅统一输入、按钮状态、进度、提示和输出入口；各自的检查、修复、拆分与导出规则仍由原业务服务负责。生产消息在三步页面内完成录入、自动检查、逐字段确认和写入，日报推送独立管理定时任务。

## 发布

`publish/` 不进入 Git。源码通过 Git 同步到 GitHub；本机保留 `publish\Debug` 测试版和 `publish\Release` 正式版。版本发布时从正式版生成 Windows x64 自包含 ZIP，并附加到对应 GitHub Release，ZIP 不提交 Git。

## 安全与许可

请勿提交真实 Token、Webhook、数据库 ID、业务文件或个人信息；安全问题请按 [安全说明](SECURITY.md) 私密报告。本项目采用 [MIT License](LICENSE)。

## 已知限制与后续优化

当前 React 桌面外壳由 WinUI 3 内的单一 WebView2 承载。冷启动只显示中性底色与加载指示，不再先渲染旧导航或模块文案；操作栏、生产消息、日报推送与报表中心复用同一 React 宿主，切换时不重新初始化 WebView2。应用保留环境预热、React 就绪握手、15 秒超时重试和启动阶段计时。实际冷启动耗时、内存与目标设备体验仍需按手工验收步骤测量，当前构建与测试结果不能视为性能已经验收。
