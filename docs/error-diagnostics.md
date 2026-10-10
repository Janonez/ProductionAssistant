# 界面错误定位

桌面桥接操作失败时，界面保留可识别的输入、目录、文件、权限和系统组件异常原因。未知异常显示类型及 HRESULT，不展示未知异常消息中的请求内容。每次失败附诊断编号和实际日志路径；取消操作不写失败日志。

诊断日志为当前运行环境下的 `logs/bridge-errors.log`：默认 Production 位于 `%LOCALAPPDATA%\ProductionAssistant\logs`，Development 位于 `%LOCALAPPDATA%\ProductionAssistant\Development\logs`。自定义数据根目录时，以错误提示给出的实际路径为准。

按诊断编号查找对应记录，可看到时间、桥接操作、异常类型、HRESULT、已允许展示的错误原因、异常链及调用栈。日志不记录桥接 payload，也不记录未知异常的原始消息。日志写入失败会明确提示，原始操作错误仍显示。

## 挂网计划检查

月份目录须直接包含一个文件名带“一二三级计划”的 `.xlsx`、`.xlsm` 或 `.xls` 文件。Excel 临时文件 `~$…` 不计入源文件。年月可以分布在父目录，例如 `2026年\10月挂网计划`。

校验源文件和年月后，自动创建缺失的“正式版”文件夹；已有文件夹和文件保留。检查仍只读打开 Excel。只有目录无法创建（权限不足、同名文件等）才报错；零个或多个源 Excel、目录不存在及无效月份会给出具体处理方法。

进入 Excel 后，失败信息包含检查、修复或导出阶段及相关工作簿、工作表或输出文件。打印设置、打印区域和边框读取失败的检查结果保留底层异常原因。修复仍先备份并复查，候选 PDF 仍输出到预览目录，不覆盖正式版。

命令行回归测试验证目录前置检查和错误诊断；它们不证明真实 Excel COM、打印驱动或 PDF 内容已通过桌面验收。

## 文件或目录选择器故障

若日志中的操作是 `plan.pickFolder` 或 `meeting.pickFile`，失败发生在选择器阶段，尚未开始 Excel 业务处理。2026-10-10 的 `0x800706BE` 同时对应 Windows 事件日志中的 `PickerHost.exe` 和生产助手 `AppHangB1`。

挂网和生产会的 React 桥接及保留原生页面均使用现有 Windows App SDK 1.8 的 `Microsoft.Windows.Storage.Pickers`，通过主窗口 `AppWindow.Id` 关联。桥接打开选择器前先让出 WebView2 消息回调，避免在回调中启动模态对话框；取消仍返回空路径。参考 [桌面选择器](https://learn.microsoft.com/en-us/windows/apps/develop/files/using-file-folder-pickers)和 [WebView2 重入限制](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/threading-model)。

选择器通过 `DesktopFilePicker` 在后台创建和调用，界面线程只读取窗口 ID 并接收返回路径。API 名称中的 `Async` 不能保证首次原生初始化不阻塞调用线程；仅 `Task.Yield` 仍会回到界面线程，不能消除这段阻塞。`startup.log` 的 `picker-…-create-start`、`show-start`、`request-returned`、`selected/cancelled` 可区分构造、原生调用和用户交互的耗时。新选择器具备 [Agile 和 ThreadingModel.Both](https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.storage.pickers.folderpicker?view=windows-app-sdk-1.8)，后台代码不访问 XAML/WebView2 对象。

历史上，1.5.6（2026-09-08，3485246）将挂网入口从原生按钮迁移到 React/WebView2 桥接，选择器调用没有同步调整；1.6.2 和 1.7.0 沿用这段调用。这是既存调用风险，不能仅凭迁移历史认定本次回归原因。

用户确认正常的 `development-backup-30e8f6e` 实际为 2026-10-02 的 1.6.2 / d188dd2 包：主 DLL SHA-256 为 D26CF837783D08F3CE3007261CC8AC96263981EBF01598E01B1C34C19FE89B5D，与包内 build-info 一致。文件夹名称不能作为提交依据；真正的 30e8f6e 测试包在 `development-backup-before-3acd70b-20261010-135617`。正常包与首次故障 3acd70b 包的目录选择器、主窗口及 WebView2 启动代码相同，265 个非业务 DLL 哈希相同。尚未证明是哪项运行时状态或其他变化触发了故障；首次初始化和后续缓存差异只是待验证推断。db5d611 用户反馈首次选择仍短暂无响应，不能视为已恢复。

桌面验收需确认选择目录、选择 Excel、取消、重复打开后页面仍响应，并能继续检查或拆分。编译和模拟桥接测试不能证明系统对话框已在用户电脑上恢复。
