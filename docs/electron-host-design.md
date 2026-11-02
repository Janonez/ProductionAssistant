# Electron 宿主设计

本文记录 Electron 宿主的设计决策与实测依据。导航契约见 `navigation-contract-design.md`，本文只记录 Electron 阶段的决定，不授权任何实现、删除或发布；每项决定实施前仍须各自授权。

决策编号用 EHD-，与导航契约文档的 ADR- 互不重叠。待决项按字母分为 A 至 F：A 文档来源（本文已决）、B 能力通道（本文已决）、C 业务会话是否长驻（本文已决）、D localStorage 迁移（本文已决）、E ReportEditor 独立协议（本文已决）、F navigation 参数改名（本文已决）。A 至 F 均已决定；第 2 节另外记录与 A 相关的待定事项。

## 1. 决策记录（待决项 A：文档来源）

| 编号 | 已定决策 | 理由 | 被否决的替代方案 |
|---|---|---|---|
| EHD-01 | 前端文档通过自定义协议 pa 提供，内容来自应用目录内打包的前端文件；不开监听端口，不使用 file:// | 来源固定，可严格比较；不暴露端口；Electron 官方安全文档建议避免 file:// 并优先自定义协议；原型验证通过，见第 3 节 | 本机回环 HTTP 服务（需开监听端口，且容易诱使能力通道共用该端口）；file://（来源不确定，Web Storage 归属不确定） |
| EHD-02 | 协议权限只开 standard、secure、supportFetchAPI；其余保持默认关闭，新增权限须逐项记录理由 | 原型验证中这三项足够加载页面、模块脚本、样式和字体；权限越少，页面能做的事越少 | 一次性开启全部权限项 |
| EHD-03 | 来源检查：IPC 事件的 senderFrame 为 null 一律拒绝；页面地址的协议、主机、路径必须与目标页面严格相等才接受，查询串忽略；另要求发送者为顶层框架，所用属性实现时按所选版本文档核对，未核对前不得声称已校验 | 沿用现有 WebView2 来源检查的严格度；官方安全文档建议校验所有 IPC 消息的发送者；senderFrame 在框架已跳转或销毁后可能为 null | 只校验主机；senderFrame 为 null 时放行；把校验放在页面一侧 |
| EHD-04 | 页面只能通过预加载暴露的窄接口通信：仅 postMessage 与 addEventListener 两个方法；全局名不得使用 chrome；contextIsolation 与 sandbox 显式开启，不依赖默认值；不暴露 ipcRenderer | 页面里已存在 window.chrome，绑定同名对象会失败（原型日志已出现）；官方安全文档建议不要把 IPC 整体暴露给页面；前端只在 bridge/webview.ts 一处依赖宿主对象，适配点集中 | 沿用 chrome.webview 名字；暴露 ipcRenderer；关闭上下文隔离 |
| EHD-05 | 文件服务：请求路径解析为绝对路径后必须位于对应根目录之内，再用真实路径复查符号链接；越界返回 403，文件不存在返回 404 | 防止页面读取应用目录之外的文件；原型已实现，越界请求未做运行测试，见第 3 节未覆盖部分 | 只做字符串前缀检查 |

## 2. 与待决项 A 相关的待定事项

- 内容安全策略：现有 dist/index.html 没有内容安全策略，Electron 控制台警告指出没有策略或策略不安全。宿主可在协议响应中补充，具体策略待设计，须用真实页面验证，不能凭推测写。
- 应用菜单：原型没有设置菜单。原型未设置菜单时，本机观察到 Ctrl+R 可重新加载、F5 不能（默认菜单的定义未核对）；是否保留重新加载、是否绑定 F5 待定。
- 存储位置：Electron 与 WebView2 的存储目录是两个独立位置，现有 localStorage 内容不会自动带到新宿主；是否迁移属待决项 D。现有生产代码只有两处使用 localStorage：日报字段缓存和消息模板的最近使用与自定义字段；sessionStorage 与 indexedDB 没有使用（2026-10-26 只读检索）。
- 能力通道：原型只证明消息能从真实页面送达主进程并通过校验，没有证明真实前端能通信。真实前端目前只识别 window.chrome.webview，须在前端 bridge 增加 Electron 传输实现；属待决项 B。
- 打包与分发：Electron 自 42 起不再在安装脚本中下载二进制，首次运行或手动执行 install-electron 才下载。打包与发布流程须明确二进制来源，不能依赖安装时自动带上。

【2026-11-02：存储位置已决定（EHD-13 与 EHD-19）；应用菜单已决定（EHD-19）；内容安全策略与打包尚未决定，见第 16 节。】

## 3. 原型验证记录（2026-10-26）

原型位于本机仓库内被 .gitignore 排除的目录，不随仓库提交；本节为结论摘要。验证环境：Electron 45.0.0，Node v24.19.0，npm 12.0.2，一台机器。被加载的前端是提交 aa4d203 的 Assets/Prototype/dist 的拷贝，共 123 个文件，index.html 的 SHA256 为 30CCA028AA0CB8B1A2CC228F4E8DFB7020E1F4965276A6DE562CDDD9B9ADCABE。

通过与放弃标准在运行前先写下，再按标准验证。结果如下。

| 项 | 结果 | 依据 |
|---|---|---|
| A1 加载 | 通过 | 页面、样式、模块脚本、字体以及六个模块的按需加载块均返回 200，无失败请求记录；权限仅 standard、secure、supportFetchAPI |
| A2 iframe.srcdoc 与存储 | 通过，有一处未解释 | 探针连续两次运行，第二次读到第一次写入的值，父页面读到 iframe 写入的值；iframe 内 location.origin 显示为 null，原因未解释；真实模板页把父页面的 localStorage 作为参数传入脚本，预计影响很小，未实测真实模板页 |
| A4 无监听端口 | 通过 | 启动前后监听端口列表均为 45 行，逐行对比无差异 |
| A5 发送者校验 | 三种情形通过 | pa://app/index.html 被接受；pa://test/other.html 因来源不符被拒绝；pa://app/__probe.html 因路径不符被拒绝 |
| A3 F5 与焦点 | 见第 4 节 | 人工观察，只记录，不影响选型 |

未覆盖的部分：

- 被接受的 app.ready 由自测脚本在真实页面内注入，不是真实前端发出，真实前端与宿主的通信未验证。
- senderFrame 为 null 的拒绝分支在代码中存在，但没有被触发过。
- 子框架冒充顶层页面的情形没有检查，也没有测试。
- 文件服务的越界请求（路径穿越、符号链接）没有做运行测试。
- 只在一台机器上运行了一轮，没有打包，打包后的行为未测试。

## 4. F5 与焦点现象的对照

WebView2 桌面验收中观察到的现象，在 Electron 原型中做了人工对照。原型未设置菜单，重新加载用 Ctrl+R；F5 在原型中不可用，与默认菜单把重新加载绑在 Ctrl+R 的推测一致，但未核对官方定义。

| WebView2 现象 | Electron 原型 | 判断 |
|---|---|---|
| 启动后直接重新加载不生效，点一下页面才生效 | 同样出现 | 不是 WebView2 特有；推断为页面没有获得初始键盘焦点，未验证 |
| 切换模块后焦点环停在侧栏按钮 | 同样出现，点一下空白处消失 | 推断为浏览器的正常焦点行为，未验证 |
| 重新加载首次较慢，之后变快 | 未出现，始终很快 | 只在 WebView2 出现 |
| 默认模块重新加载没有骨架，只有进度圆圈序号变化 | 同样没有骨架 | 前端自身行为，换宿主不会消失 |

结论：第 1、2、4 行预计在换宿主后仍然存在，登记为 Electron 阶段的验收项，由前端处理；第 3 行预计随宿主消失，须在真实宿主上确认。以上基于一台机器上的人工观察，不是系统测试。

## 5. 依据

- Electron 安全文档：https://electronjs.org/docs/latest/tutorial/security （发送者校验、避免 file://、不直接暴露 IPC 等建议）。该页为 latest，内容可能变化，实现时按所选版本核对。
- Electron v45.0.0 文档：protocol（registerSchemesAsPrivileged 须在应用就绪前调用且只能调用一次，handle 在就绪后注册）https://github.com/electron/electron/blob/v45.0.0/docs/api/protocol.md ；IpcMainEvent 的 senderFrame（可能为 null）https://github.com/electron/electron/blob/v45.0.0/docs/api/structures/ipc-main-event.md ；WebFrameMain 的 url https://github.com/electron/electron/blob/v45.0.0/docs/api/web-frame-main.md
- Electron 42 发布说明：https://electronjs.org/zh/blog/electron-42-0 （二进制不再由安装脚本下载）。
- 本仓库事实：来源检查见 `src/ProductionAssistant.Core/Models/PrototypeBridgeProtocol.cs`，页面加载见 `src/ProductionAssistant.App/Pages/PrototypePage.xaml.cs`，前端传输见 `src/ProductionAssistant.App/Assets/Prototype/src/bridge/webview.ts`；行号以代码为准。

## 6. 决策记录（待决项 B：能力通道）

| 编号 | 已定决策 | 理由 | 被否决的替代方案 |
|---|---|---|---|
| EHD-06 | 业务能力由独立的能力进程提供，Electron 主进程通过该进程的标准输入输出通信：一行一个 JSON；请求为 id、operation、payload，响应为 id、ok、data 或 error，进度为 id、type 取 progress、data；取消按请求 id 发送，只取消目标请求；不开监听端口 | 与现有桥接的消息形状一致，前端只需增加一种传输实现；腾讯填报 worker 已使用同类做法；原型验证通过，见第 7 节；按 id 取消克服现有只有一个取消令牌、取消的是最后登记请求的限制 | 本机回环 HTTP 或命名管道（多出通道和访问控制）；沿用单一取消令牌 |
| EHD-07 | 能力进程必须显式指定运行环境和数据根目录，缺少时拒绝启动，不使用默认值；原型另要求数据目录位于系统临时目录之下，仅用于验证 | 现有运行环境在没有任何参数时默认为 Production，数据目录即正式版真实数据；覆盖数据目录的环境变量也不能隔离全部写入位置，计划与生产会输出、报表目录、系统临时目录、Windows 任务计划等独立于它，见第 7 节 | 沿用默认值；只靠环境变量隔离 |
| EHD-08 | 第一阶段由无窗口的 C# 进程承载 Infrastructure 中的业务服务，行为不变，前端协议不变；路由表中每个操作任何时刻只有一个提供方；之后可按操作组把提供方换成别的语言，每组迁移前录制真实请求与响应作为对照夹具，迁完删除原路由 | 迁宿主与换语言不叠加，出错时能分清来源；Infrastructure 不引用 WinUI，已读到的服务类型均为 public；回滚即修改路由 | 迁宿主的同时重写业务；两个提供方同时处理同一个操作 |
| EHD-09 | 文件夹与 Excel 选择：第一阶段保留 C# 选择器，由 Electron 传入原生窗口句柄；第二阶段评估改由 Electron 对话框提供，只改路由。网络驱动器不可达时系统对话框加载慢，登记为环境问题，不作为选型依据 | 第一阶段不改行为；两种方式在原型中都能弹出，Electron 对话框没有异常；系统自带的打开对话框在同一环境下同样慢，且该机器存在断开的映射网络驱动器，见第 8 节 | 第一阶段直接改用 Electron 对话框 |

【2026-11-02 实施注记：EHD-07 中“显式指定数据根目录”在实现中改为只显式指定环境名，不设置数据目录变量，理由见 EHD-17；EHD-09 的第二阶段提前：外壳路径上的文件夹与 Excel 选择已由 Electron 对话框承担，Sidecar 不使用 C# 选择器与窗口句柄；WinUI 宿主在退役前仍使用 C# 选择器。】

## 7. 原型验证记录（能力通道，2026-10-27）

原型位于本机仓库内被 .gitignore 排除的目录，不随仓库提交；本节为结论摘要。验证环境：Electron 45.0.0，.NET SDK 8.0.423，Node v24.19.0，仓库提交 511c66f，一台机器。原型直接引用 Core 与 Infrastructure，不引用 WinUI，数据目录指向系统临时目录；只运行三个只读真实操作（settings.open、database.getState、automation.list）和仅原型使用的机制测试操作。

| 项 | 结果 | 依据 |
|---|---|---|
| B1 无窗口承载 | 通过 | 三个只读操作成功；输出目录没有 Microsoft.UI 程序集；正式版数据目录的文件总数与最大修改时间前后一致；所需类型均为 public，没有需要改 Infrastructure 才能引用的类型 |
| B2 协议机制 | 通过 | 短请求先于长请求完成，进度按序先于结果；按 id 取消不影响并发请求；白名单外操作被拒；中文与一百万字符单行往返一致；非法 JSON 与缺少 id 的请求得到错误响应后进程继续工作 |
| B4 生命周期 | 通过 | 不带进程树参数强杀父进程后，子进程在 5 秒内退出；子进程自行退出时，等待中的请求收到带退出码的错误；Electron 原型四次运行中，窗口关闭到子进程退出均约 20 至 30 毫秒 |
| B5 启动耗时 | 只记录 | 从启动到首个成功响应分别为 159.0、125.1、99.7 毫秒 |
| B6 无监听端口 | 通过 | 运行期间监听端口列表相对启动前没有新增行 |
| B3 窗口句柄 | 部分 | 三种选择方式都能弹出并返回结果；传入句柄后对话框是否附着在窗口前面、打开期间主窗口是否不可操作、关闭后键盘焦点是否回到窗口，未逐项确认，列为第一阶段在真实应用中的验收项 |

未覆盖的部分：

- 临时数据目录为空，返回的是默认数据；带真实加密配置的读取（Windows 凭据保护解密）没有测。
- 能力进程自己的子进程（Node worker、Excel）在父进程被强杀后是否残留，没有测。
- 真实业务操作的并发与忙碌语义没有测；挂网计划与生产会的忙碌标志、结果标识目前保存在桥接实例的字段中。
- 现有分发层与会话状态位于 App 项目且为 internal，原型没有承载它，需要在路线第 5 步抽取。
- 业务文件所在位置（本地盘、映射盘或网络路径）与进程权限对盘符可见性的影响未核实。
- 只在一台机器上运行了一轮，没有打包。

## 8. 已登记的环境问题

开发机连接手机热点时，存在处于断开状态的映射网络驱动器，系统文件对话框的内容加载很慢，系统自带记事本的打开对话框在同一环境下同样慢，因此不是我们的选择器或宿主造成的。正式版日志中的选择器跟踪只记录对话框窗口出现的时间（约 410 至 614 毫秒），量不到出现之后的内容加载，不能用来排除该问题。在公司内网中该问题是否消失，没有验证。设计文档不据此改变选型，只在第一阶段验收时在内网环境下复核。

【2026-11-02：本节“因此不是我们的选择器或宿主造成的”一句不再作为定论。开发者此后称在本机实测：系统对话框内容加载慢，而 Electron 自带对话框在同一环境下不慢；既有日志显示 WinUI 选择器在 2026-10-15、10-20、10-22 已出现从对话框露面到关闭耗时 24 至 29 秒，这些日期早于抽取分发层的改动。原因未查明；选择对话框已按 EHD-19 改由 Electron 提供。】

## 9. 决策记录（待决项 C：业务会话）

| 编号 | 已定决策 | 理由 | 被否决的替代方案 |
|---|---|---|---|
| EHD-10 | 能力进程在 Electron 应用运行期间长驻，由主进程启动，随应用退出；不做每请求一个进程；第一阶段能力进程崩溃时不自动重启，前端收到错误并提示重启应用 | 现有会话状态保存在内存字段中，每请求一个进程会使其消失，必须先改业务设计，违反第一阶段不改行为的原则；原型中启动到首个成功响应为 99.7 至 159.0 毫秒，仅一台机器一轮；强杀父进程后子进程在 5 秒内退出，见第 7 节；自动重启会让会话状态悄悄丢失，而前端可能仍显示重启前的结果 | 每请求一个进程；崩溃后自动重启 |
| EHD-11 | 业务会话状态留在能力进程内存中，生命周期等于进程生命周期，不随窗口重载清空，不落盘；第一阶段保留现有字段与语义，包括会议结果标识不清空、只有计划与会议操作有忙碌标志，不改行为 | 现状如此：桥接对象只构造一次，重载只重新加载文档，业务字段保留；前端重载后结果状态为空，没有恢复旧结果的入口（代码推断，未做桌面重载测试）；落盘会引入新的数据位置与清理问题，而结果可通过重新检查或导出得到 | 落盘保存；窗口重载时清空 |

## 10. 已登记事项（待决项 C，第一阶段不处理）

- 按操作互斥与取消令牌：现有分发没有按操作的互斥，取消只有一个当前请求字段，production.cancel 取消最后登记的请求，计划、会议、自动任务的分发没有传取消令牌，进度只有三个操作发送。EHD-06 规定的按请求编号取消，在第一阶段只保证协议中有该字段，没有传取消令牌的操作仍取消不了，语义在抽取共享分发层时落实。
- 能力进程重启后会话状态丢失，前端可能仍显示旧结果：会议打开结果时会检查结果标识与文件是否存在；计划打开输出目录时检查哪些条件，尚未确认，抽取分发层时读代码核实。
- 对已释放的取消令牌源再次取消的行为未读到，抽取分发层时检查。
- 能力进程自身子进程（Node worker、Excel）在强杀后是否残留，见第 7 节未覆盖部分。

## 11. 决策记录（待决项 D：localStorage 迁移）

| 编号 | 已定决策 | 理由 | 被否决的替代方案 |
|---|---|---|---|
| EHD-12 | 不做 localStorage 迁移：日报指标目录缓存与消息模板最近使用列表在换宿主后重新积累，不写搬运旧存储的代码，前端不改 | 生产代码中只有这两类数据使用 localStorage；指标目录缓存缺失时回退为实时请求，设置中刷新数据库成功后本来就会清除全部持久缓存；最近使用缺失只影响搜索排序；源码中没有读到凭据类数据（只读源码，未读真实存储内容）；迁移需要读取旧宿主的内部存储，复杂度高于收益 | 读取旧宿主存储并搬运到新宿主 |
| EHD-13 | Electron 应用的存储位置按运行环境区分，与 EHD-07 的显式环境一致；第一阶段验收时确认关闭应用后重新打开，localStorage 内容仍然保留 | 缓存 key 只含任务与数据库标识，不含运行环境，共用存储位置时测试环境可能读到正式环境的缓存（推断）；自定义协议下 localStorage 能否跨启动保留，原型没有验证；验证不过的影响只是每次启动多一次实时请求 | 不区分环境，共用一个存储位置 |

## 12. 已登记事项（待决项 D，第一阶段不处理）

- 消息模板中的 slash-demo-custom 只在没有 runtime 的 Demo 模式读写，生产模式的自定义字段走后端 daily.addField，不使用 localStorage；此前把它算作生产使用是错误的，以本条为准。
- 最近使用列表在读取与写入时没有异常捕获，存储中的值损坏时脚本初始化可能中断（推断，未做桌面验证）；Electron 使用全新存储，预计不会遇到，只登记。
- 模板页在 iframe.srcdoc 中运行，测试把 localStorage 作为参数传入模板脚本；在 Electron 下这套机制是否照常工作，没有验证。
- 自定义协议 pa 下 localStorage 跨启动保留的情况，A 的原型没有测，列为第一阶段验收项（见 EHD-13）。
- 以上结论只来自读源码与测试，没有读取真实浏览器存储中的内容。

## 13. 决策记录（待决项 E、F）

| 编号 | 已定决策 | 理由 | 被否决的替代方案 |
|---|---|---|---|
| EHD-14 | （待决项 F）URL 参数与 app.ready 消息中的加载编号字段统一由 navigation 改名为 loadId，前端与宿主一次改完，不保留旧名字的兼容；实际改名放在 Electron 外壳之前，作为单独的实施 PR，改前先做逐行清单，C# 文件逐个授权 | 前端与宿主同包发布，可以同时改；等到 Electron 外壳阶段再改，并行期间两个宿主要说同一套协议，要么前端同时认两个名字，要么旧宿主也得改，前者就是兼容分支长期共存；C# 内部变量早已叫 loadId，前端没有占用该名字（src 内搜索，前端 0 命中）；Electron 宿主从一开始就使用新名字 | 保持 navigation 不改；前端同时认新旧两个名字 |
| EHD-15 | （待决项 F）Electron 宿主沿用现有的加载编号语义：编号为非空字符串，页面发出的 app.ready 中的值与当前编号完全相等（逐字符比较，不裁剪）才接受，不相等直接丢弃；route 只用于诊断日志，不参与比较；每次重试加载生成新编号 | 现有宿主就是这样比对的（读自 PrototypeBridgeProtocol 与 PrototypePage）；写进文档可避免 Electron 实现时遗漏；这是保持现有行为，不是新设计 | 不校验编号；用 route 参与比较 |
| EHD-16 | （待决项 E）ReportEditor 退役：Electron 阶段不迁移、不适配；真正删除另开清理 PR，不在本文授权 | 在 C# 与前端代码中搜索没有发现加载它的位置，对它的引用只出现在 csproj、verify.ps1、AGENTS.md、文档及它自己的目录里；仓库中含 WebView2 的 C# 文件只有 PrototypePage 相关的三个，加载的都是 Prototype 的构建产物；它自初始提交就存在，最近一次改动是 1.5.4 的编辑器重构；它使用旧 chrome.webview 协议，Electron 中没有对应通道；消息模板由 Prototype 中的 message-template 承担（推断，未逐项对照功能） | 为它在 Electron 中另设计一套通信协议；暂不决定 |

## 14. 已登记事项（待决项 E、F，第一阶段不处理）

- ReportEditor 清理 PR 的前置核对：找出加载它的页面是在哪个提交被删除的（git log -S ReportEditor 共 10 条候选，内容未读）；读 verify.ps1 对它做了什么；读 AGENTS.md 中提到它的位置；处理 csproj 中两个 Content 项、编辑器目录下的 package.json 与 report-serializer.test.mjs。涉及 csproj 与 verify.ps1 的改动必须逐文件授权，且会改变 verify 的行为。
- ReportEditor 页面使用旧的 chrome.webview 协议（页面发出 ready、update、state，接收 init、getState、insertField、insertToday），退役后不需要为它设计 Electron 通道。
- loadId 改名的范围（读自代码）：生产代码中把 navigation 当作加载编号使用的有 9 个文件，C# 三个（PrototypeBridgeProtocol、PrototypeBridge、PrototypePage），前端六个（routes 下的 index 与 RouteReady，app 下的 App，bridge 下的 index、webview、mock）。另有四处只是名字巧合，不能改：operation-sidebar.css 的样式类名、routes 下 routeTable 中的旧路由前缀 navigation:、hooks 下 useHostRoute 的模块路径、腾讯 site-adapter 的注释。旧的 navigation: 前缀地址的归一处理不在改名范围内。
- 测试文件中有 9 个文件、162 行包含 navigation，其中多少属于加载编号、多少属于路由导航，没有逐行核对，改名前须先做逐行清单。
- 普通浏览器重新加载时是否重新生成加载编号，没有验证（源码中只在字段初始化与点击重试时生成）。
- 改名是协议改动，前端与宿主必须同一个 PR 完成，不保留旧名字。
- 【2026-11-02：ReportEditor 已在 #68 清理，上面“清理 PR 的前置核对”一条所述事项已完成；loadId 改名已在 #66、#67 合并。】

## 15. 决策记录（实施：无窗口进程与 Electron 外壳最小版本）

本节记录 2026-11-02 之前已合并的实现所固化的决定，其中 EHD-17 实施路线第 5 步，EHD-19 对应路线第 6 步的第一个任务；实施代码见 src/ProductionAssistant.Bridge、src/ProductionAssistant.Sidecar、src/ProductionAssistant.Desktop。

| 编号 | 已定决策 | 理由 | 被否决的替代方案 |
|---|---|---|---|
| EHD-17 | 无窗口进程 ProductionAssistant.Sidecar（控制台项目，只引用 Bridge）承载分发层。协议沿用 EHD-06，并以前端现有消息为准：一行一个 JSON；取消使用 production.cancel，在 payload 中带 targetId（不带则取消最近一个在途请求），不另设取消消息；必须显式传 --environment，缺失或非法以退出码 2 退出；不设置 PRODUCTIONASSISTANT_DATA_DIR；标准输出只输出协议行，意外的控制台输出改道到标准错误；标准输入关闭后取消所有在途请求并最多等 10 秒；同一程序带 --send-daily-report 或 --run-automation-task 时作为计划任务入口，语义与 WinUI 一致，退出码规则不变，本步不重新注册计划任务。 | PRODUCTIONASSISTANT_DATA_DIR 一旦设置，实际数据目录一定再追加环境名（读自 RuntimeEnvironment），表达不了与现有 WinUI 共用的 Production 数据目录，所以只显式指定环境名；协议与前端一致，外壳只需转发；计划任务入口与协议循环在同一程序里，不再多一个可执行文件；按请求登记取消与同名写入类操作独占已在 Bridge 层实现，Sidecar 直接受益。 | 沿用原型的单独取消消息；每个请求一个进程；设置数据目录变量。 |
| EHD-18 | 只把整条调用链只读的操作开放给第二个宿主；读取时会条件性保存或迁移本地文件的操作暂不开放，待归属决定后再迁。当前开放 production.cancel 与 12 项：production.getBindings、weld.getState、weld.generate、database.getState、database.getSchema、database.inspect、tencentSheet.get、tencentSheet.runs、tencentSheet.sources、tencentSheet.schema、tencentSheet.views、notionFill.runs。其余一律返回“该操作尚未迁移到新宿主。”。 | EHD-08 规定每个操作任何时刻只有一个提供方，不得让两个宿主改同一份本地文件；automation.list、daily.list、daily.get、daily.runs 经日报任务目录的读取方法（DailyReportSettingsStore.LoadCatalog）在旧配置迁移时会保存任务目录文件；report.getState 经 ReportCenterConfigStore.Load 在配置缺失时创建默认配置文件；这些保存分支只在特定数据条件下触发（读源码，未用真实数据验证）；settings.open 因设置页版本号的来源在新宿主中尚未确定，暂不开放。 | 把这些操作一并开放，由第二个宿主触发条件性写入。 |
| EHD-19 | Electron 外壳（src/ProductionAssistant.Desktop，CommonJS，electron 固定 45.0.0，纯逻辑放 lib 并用 node --test 验证）。（1）pa://app 提供 Prototype 构建产物，权限仅 standard、secure、supportFetchAPI，请求路径解析后复查真实路径，越界 403、不存在 404；（2）预加载只暴露 postMessage 与 addEventListener，全局名 paHost；前端 bridge 同时支持 chrome.webview 与 paHost，两者并存时优先 chrome.webview；（3）IPC 校验发送者非空、属于本窗口的主框架、页面地址严格等于 pa://app/index.html（忽略查询串）；导航、新窗口、webview 附加与权限请求一律拒绝；（4）加载地址带 loadId，app.ready 的 loadId 逐字符相等才接受；重新加载（F5、Ctrl+R）生成新 loadId，并保留当前地址中的其他参数，与 C# 的 BuildDocumentUrl 一致；（5）app.ready、plan.pickFolder、meeting.pickFile 由外壳处理，文件夹与 Excel 选择用 Electron 自带对话框，第一版不传默认目录，其余请求转给 Sidecar；（6）Sidecar 崩溃不自动重启，等待中的请求收到错误；退出时先关输入并最多等 12 秒，再杀进程树；（7）存储位置 `%LOCALAPPDATA%\ProductionAssistant\Electron\<环境>`，单实例锁；环境默认 Development，Production 必须显式指定；（8）菜单只保留重新加载，以及非 Production 下的开发者工具；（9）日志写入 userData 下 logs\desktop.log，不记录请求数据、响应内容、选中路径、地址查询串，也不记录控制台与 Sidecar 标准错误的文字内容。 | 来源比对与现有 WebView2 一样严格；纯逻辑模块可在 CI 里验证而不必下载 Electron 二进制；重新加载若丢失当前地址中的 route，会回到默认模块（读开发机日志与代码得出，已修正）；日志只保留诊断所需的最少信息。 | 沿用旧的令牌握手；重新加载沿用旧 loadId；给选择对话框传默认目录（可能触碰映射网络盘）；崩溃后自动重启（会话状态会悄悄丢失，见 EHD-10）。 |

## 16. 已登记事项（实施后，第一批不处理）

- 外壳没有内容安全策略、没有加载中与加载失败遮罩、没有打包配置；Electron 二进制的获取方式仍未定。
- Sidecar 的标准错误内容与前端控制台内容不进日志，只有 production.getBindings 与 automation.list 两个操作带内部计时。
- 设置页的版本号来源：WinUI 读 App 程序集的 InformationalVersion，Sidecar 没有同一来源，settings.open 暂不开放。
- 腾讯填报与报表采集的 node 脚本及其依赖按应用基目录定位，在 App 项目里配置复制，Sidecar 的输出目录不会自动带上；appsettings 与 runtime-environment.json 同理。
- 计划任务注册取自当前进程路径：由 Sidecar 注册的任务会指向 Sidecar，已存在的任务仍指向 WinUI 程序；迁移时必须重新保存；控制台程序被计划任务启动时可能出现黑窗口（推断，未验证）。
- 开发版可能与正式版共用 Teable 库，写入类操作的验收需要独立的测试库，目前没有。
- plan.* 与 meeting.* 共 8 个操作不接收取消令牌，取消对它们仍无效。
- 前端控制台、Sidecar 标准错误的文字内容为保守起见不写日志，若日后需要，应逐项评估隐私。
- 开发机上文件选择对话框的问题：见第 8 节注记。

本轮只写入决定，不修改代码；原型代码不进仓库。【2026-10-27：本文新增待决项 B 的决定（第 6 至 8 节）、待决项 C 的决定（第 9、10 节）与待决项 D 的决定（第 11、12 节）；E、F 仍待决。】【2026-10-28：本文新增待决项 E、F 的决定（第 13、14 节）；A 至 F 均已决定。】【2026-11-02：新增第 15、16 节（无窗口进程与 Electron 外壳最小版本的决定与已登记事项）。】
