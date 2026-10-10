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

桌面验收需确认选择目录、选择 Excel、取消、重复打开后页面仍响应，并能继续检查或拆分。编译和模拟桥接测试不能证明系统对话框已在用户电脑上恢复。
