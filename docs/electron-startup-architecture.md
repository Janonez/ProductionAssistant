# Electron Development 启动架构

本轮范围：Runtime 准备、Sidecar 生命周期、Bridge 启动请求、集团填报读取和 Renderer 资源代次。保留现有宿主安全边界和业务数据所有权，不改 Production、版本或发布流程。

## 审查结论

整改前流程：npm start → Electron 官方 CLI（缺失 Runtime 时同步安装）→ main → spawn Sidecar / 创建窗口 → React → Bridge 请求写入 stdin；Sidecar 串行完成环境初始化、迁移后开始读取 stdin。当时没有协议 Ready；首条 stderr/stdout 仅证明进程产生过输出。

确定的等待包括 Runtime 恢复、迁移锁和串行任务读取。历史 8.258 秒首条输出不能归因于某个初始化阶段；本轮增加阶段计时后再判断。集团填报当前读全部 Handler 后过滤；设置、历史、登录读取各有独立边界。默认 dist 与发布 dist 均可由环境变量选择，单实例锁只聚焦旧窗口；固定资源目录被覆盖会破坏延迟 Chunk 的代次一致性。

## 目标与职责

1. 安装依赖 → 显式 prepare:electron-runtime → 官方安装器及校验缓存 → 快速预检 → 直接启动已检查的二进制。快速预检不导入 electron/index.js，不下载；缺失或版本不匹配时打印恢复命令。正常启动仅检查版本、path.txt 和必需文件。专项脚本在临时目录经官方安装器恢复，再逐文件 SHA256 比较真实 Runtime；不把快速检查当作全量内容校验。
2. main 选取已完整发布的不可变构建目录并固定到本次进程，创建窗口与 Sidecar 初始化独立推进。SidecarClient 是生命周期唯一权威，React 只订阅其快照。
3. 后端环境初始化 → 必要迁移（锁等待和每项迁移分别计时）→ StdioHost 构造 → 版本化 Ready 事件 → 主进程放行业务请求。迁移保持串行；失败或锁超时不能被 Ready 掩盖。
4. Bridge 启动期间请求按 ID 有限排队，超时从接收时计算；失败、退出时结束排队和在途请求。不自动重放，不自动重启，不把写操作超时描述为安全重试。
5. automation.list 的可选 taskType 仅调用对应 Handler；省略时保持全量行为和 availableTaskTypes。集团填报仍按 list → ID → get 读取，历史、登录及设置来源加载保持局部状态。
6. React 外壳先显示；服务初始化和业务读取分别呈现，复用 Skeleton / Alert / Button。设置保留 lazy，预取须有实际测量依据。

## 协议

stdout 仅传 JSON 行；stderr 为脱敏诊断。生命周期消息包括 type、protocolVersion、startupId、state、phase、pid。初始化阶段与 Ready 由后端显式发送，版本或启动 ID 不匹配视为启动失败。状态为 NotStarted、Starting、Initializing、Ready、Failed、Stopping、Stopped。

保留请求 id/operation/payload 与响应 id/ok/data/error；启动错误追加 errorCode、retryable、state，error 字符串兼容旧消费者。请求超时不自动重发。关联日志记录启动 ID、Electron/Sidecar PID、环境、请求 ID/操作和单调时钟耗时；不记录 payload、路径、Cookie、Token 或业务响应。

## 资源方案比较

| 项目 | 固定 dist + Build ID | 不可变构建目录 + 指针（采用） |
| --- | --- | --- |
| 自定义 pa 协议 | 请求时仍可能读新代次 | 进程固定根目录，全部资源同代次 |
| Vite / WinUI | 继续覆盖 dist，旧 Chunk 会丢失 | 保留 dist；另发布完整快照供 Electron |
| Development 发布 | 覆盖期间存在混合窗口 | 快照完成校验后原子切换指针 |
| 懒加载 / 旧实例 | Build ID 本身无法保住旧文件 | 旧实例继续读旧目录 |
| Windows 文件占用 | 覆盖风险高 | 新构建写新目录，不覆盖在用文件 |
| 清理 | 构建即删除旧文件 | 本轮保留旧代次，不自动清理；后续确认无在用实例后按项目规则清理 |

Vite 根据写入标识前的产物文件清单和 SHA-256 生成 UUID Build ID。`index.html` 的元数据与 `build-info.json` 使用同一 ID。重复构建产物内容相同时复用同一快照。资源发布工具重新校验标记后的文件清单，禁止同 ID 不同内容。新快照经临时目录、完整校验和重命名后更新 `current.json`。main 启动时读取一次指针，协议从选定的快照提供资源。显式指定 dist 时也须先准备快照。

单实例锁携带 Build ID；同 ID 聚焦，不同 ID 显示旧实例提示，只有用户选择后才能重启。日志记录所选资源类型及 Build ID，区分正式页、旧任务详情和 spikes，不推测为缓存问题。

主进程持锁后写入带启动 ID 的实例身份文件，正常退出时只清理自己这一代的记录。第二次启动遇到无法确认身份的早期宿主时会明确提示“本次没有加载新构建”，避免依赖早期宿主不支持的版本事件。

设置空闲预取已做实际对照：无预取五次首次打开中位数 383ms，实验预取五次中位数 400ms，没有证据支持保留。最终维持 React.lazy，仅将局部 Loading 改为 Skeleton；不以消除动画宣称性能改善。

## 验证

分阶段运行：隔离 Runtime fixture 的缺失/完整/版本不匹配/失败/幂等；Sidecar 真子进程 fixture 的延迟 Ready、噪声、协议不匹配、初始化失败、退出、排队、超时和并发；.NET 迁移锁、失败恢复和协议握手；React 初始化/失败/空任务/配置读取与局部历史/登录；资源旧实例重建及延迟 Chunk、跨目录、同/异 ID 单实例。最后执行 React 全量、类型检查、Vite、Electron、.NET 和完整 verify，校验 Development 发布资源及敏感日志。

实际性能使用 Electron Development 至少五次独立进程启动，区分首轮与连续启动、首次/再次进入集团填报和设置。每次 Sidecar 都是新进程；连续启动仅可称为系统缓存较热，不能冒称复用 Sidecar 热进程。已有基线没有正式 Ready 或窗口实际显示日志，对这些指标明确未测量。测试工具只导航和读取，不触发腾讯文档写入。

机制依据：[Electron 单实例锁与附加数据](https://www.electronjs.org/docs/latest/api/app#apprequestsingleinstancelockadditionaldata)、[Electron 自定义协议](https://www.electronjs.org/docs/latest/api/protocol)、[React lazy](https://react.dev/reference/react/lazy)。Runtime 安装实现另按本机锁定 electron 45.0.0 的 install.js / index.js 核对；未修改这些上游文件。
