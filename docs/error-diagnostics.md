# 界面错误定位

桌面桥接操作失败时，界面保留可识别的输入、目录、文件、权限和系统组件异常原因。未知异常显示类型及 HRESULT，不展示未知异常消息中的请求内容。每次失败附诊断编号和实际日志路径；取消操作不写失败日志。

诊断日志为当前运行环境下的 `logs/bridge-errors.log`：默认 Production 位于 `%LOCALAPPDATA%\ProductionAssistant\logs`，Development 位于 `%LOCALAPPDATA%\ProductionAssistant\Development\logs`。自定义数据根目录时，以错误提示给出的实际路径为准。

按诊断编号查找对应记录，可看到时间、桥接操作、异常类型、HRESULT、已允许展示的错误原因、异常链及调用栈。日志不记录桥接 payload，也不记录未知异常的原始消息。日志写入失败会明确提示，原始操作错误仍显示。

## 挂网计划检查

月份目录须直接包含一个文件名带“一二三级计划”的 `.xlsx`、`.xlsm` 或 `.xls` 文件。Excel 临时文件 `~$…` 不计入源文件。年月可以分布在父目录，例如 `2026年\10月挂网计划`。

校验源文件和年月后，自动创建缺失的“正式版”文件夹；已有文件夹和文件保留。检查仍只读打开 Excel。只有目录无法创建（权限不足、同名文件等）才报错；零个或多个源 Excel、目录不存在及无效月份会给出具体处理方法。

进入 Excel 后，失败信息包含检查、修复或导出阶段及相关工作簿、工作表或输出文件。打印设置、打印区域和边框读取失败的检查结果保留底层异常原因。修复仍先备份并复查，候选 PDF 仍输出到预览目录，不覆盖正式版。

检查结果按处理方式分类：标题年月、计划日期越界、项目逾期等时间问题，以及缺表、公式或结构问题属于“错误”，必须手动处理；行高、打印设置、打印区域、边框和可修复的序号问题属于“警告”。自动修复只调整格式和序号，不修改日期与时间。错误和警告都会阻止导出；格式警告须修复并复查消除，时间错误须在 Excel 中手动修改后重新检查。没有问题的检查结果可直接导出，无需为了启用导出而再次修改 Excel。源文件变化会使原检查结果失效；服务层和两个界面入口使用同一导出条件。

Development 和 Production 的候选 PDF 均生成在所选月度目录的 `生产助手预览/yyyyMMdd-HHmmss-fff` 内，界面显示实际目录。Development 的 Excel 修复备份仍保留在隔离的数据目录；此备份路径不同于 PDF 输出路径。

仅“产品发运”工作表中，表头下方和数据之间的纯空白行（包括只有残留序号的模板行）属于格式警告。修复在备份后从下往上删除这些空行，再调整序号、行高和打印区域；公式结果为空、跨行合并、批注和已隐藏的行不作为可删除空行。最后一条内容之后用于补齐末页的空白网格沿用原规则，不属于本次内部空行清理范围。生产计划刻意保留的间隔行、项目计划的合并标题及其他非发运工作表均不参与空行检查或删除。

命令行回归测试验证目录前置检查和错误诊断；它们不证明真实 Excel COM、打印驱动或 PDF 内容已通过桌面验收。

## 文件或目录选择器故障

若日志中的操作是 `plan.pickFolder` 或 `meeting.pickFile`，失败发生在选择器阶段，尚未开始 Excel 业务处理。2026-10-10 的 `0x800706BE` 同时对应 Windows 事件日志中的 `PickerHost.exe` 和生产助手 `AppHangB1`。

挂网和生产会的 React 桥接及保留原生页面统一通过 `DesktopFilePicker` 打开 Windows 本地 `IFileDialog`。对话框在专用 STA 线程创建、配置、显示和释放，界面线程只传主窗口 HWND 和当前路径并异步接收结果。桥接打开选择器前仍先让出 WebView2 消息回调；取消返回空路径，其他原生错误保留 HRESULT，并写诊断编号和日志，不能把原生失败当成用户取消。参考 [本地通用文件对话框](https://learn.microsoft.com/en-us/windows/win32/shell/common-file-dialog)和 [WebView2 重入限制](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/threading-model)。

选择窗口优先进入当前填写的本地目录；文件选择使用当前文件的父目录，其次使用本次进程上次成功选择的本地目录。无有效本地路径时进入实际用户主目录，避免默认打开 Home/Quick Access 或重定向库。首次配置不会探测 UNC 或映射网络盘；用户仍可在对话框中主动选择网络路径。[SetFolder](https://learn.microsoft.com/en-us/windows/win32/api/shobjidl_core/nf-shobjidl_core-ifiledialog-setfolder) 会覆盖系统最近目录，适用于本模块明确填写源目录的流程。

`startup.log` 的 `picker-…-native-create-start-STA`、`configured`、`show-start`、`dialog-visible`、`selected/cancelled` 均带本次操作累计耗时。`dialog-visible` 在 100 ms 轮询精度内检测属于当前进程、以主窗口为 owner 的可见原生对话框；未在取消前检测到则不伪造记录。它区分窗口出现前的等待与之后用户操作时间；可见不代表目录内容已全部加载。诊断不记录所选路径、不影响原生选择结果，代码不会在诊断时控制用户桌面。

此前 db5d611 改用 Windows App SDK 1.8 选择器，034550e 再增加外层 Task.Run，但 [1.8.0 实现](https://github.com/microsoft/WindowsAppSDK/blob/v1.8.0/dev/Interop/StoragePickers/FolderPicker.cpp) 内部本来就调用 resume_background 后创建本地 IFileOpenDialog，因此外层 Task.Run 没有改变最终显示线程路径。当前直接 STA 实现与明确起始目录是针对这些可控因素的修正；不是已经证明此次卡顿来自某个网络位置或 Shell 扩展。

历史上，1.5.6（2026-09-08，3485246）将挂网入口从原生按钮迁移到 React/WebView2 桥接，选择器调用没有同步调整；1.6.2 和 1.7.0 沿用这段调用。这是既存调用风险，不能仅凭迁移历史认定本次回归原因。

用户确认正常的 `development-backup-30e8f6e` 实际为 2026-10-02 的 1.6.2 / d188dd2 包：主 DLL SHA-256 为 D26CF837783D08F3CE3007261CC8AC96263981EBF01598E01B1C34C19FE89B5D，与包内 build-info 一致。文件夹名称不能作为提交依据；真正的 30e8f6e 测试包在 `development-backup-before-3acd70b-20261010-135617`。正常包与首次故障 3acd70b 包的目录选择器、主窗口及 WebView2 启动代码相同，265 个非业务 DLL 哈希相同。尚未证明是哪项运行时状态或其他变化触发了故障；首次初始化和后续缓存差异只是待验证推断。db5d611 用户反馈首次选择仍短暂无响应，不能视为已恢复。

034550e 用户反馈问题仍在。14:29:24 的阶段日志显示创建和发起目录选择请求约 2 ms 内返回，直到 14:44:04 才收到选择结果；这一间隔包含系统显示对话框和用户操作，不能据此把整个间隔认定为卡顿，也不能继续断言构造函数阻塞是根因。14:26 后查到的 Application 日志没有对应 ProductionAssistant/PickerHost 的新挂起事件；这不否定用户的实际反馈。选择器仍未验收通过。

桌面验收需确认选择目录、选择 Excel、取消、重复打开后页面仍响应，并能继续检查或拆分。编译和模拟桥接测试不能证明系统对话框已在用户电脑上恢复。
