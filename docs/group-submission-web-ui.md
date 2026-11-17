# 集团填报网页配置

网页配置采用现有 shadcn/ui Item 的 outline 变体，将连接状态统一为 56px 配置行，文档图标为 20px FileText。名称单行截断、状态 Badge 和操作区不收缩；输入框使用官方 Input，通过局部样式与外层融合。未改动基础组件、全局主题、业务配置布局或日期标定规则，无新增依赖。P3 新增的只读位置权限检查见[权限检查说明](tencent-permission-check.md)。

## 状态与操作

| 状态 | Badge | 主要按钮 |
| --- | --- | --- |
| 未配置 | 无 | 连接 |
| 未检测 | 未检测 | 检测 |
| 检测中 | 检测中和 Spinner | 无 |
| 已连接 | 已连接 | 打开文档 |
| 需要登录 / 登录失效 | 首次为需要登录，有本轮历史认证证据时为登录已失效 | 扫码登录 |
| 链接无效 | 不是表格链接 | 更换文档 |
| 只读 | 只有查看权限 | 打开文档 |
| 文档可访问但编辑权限未确认 | 权限未知 | 重新核验 |
| 无法打开 | 无法打开 | 重新检测 |

标签、颜色和主要动作由 DocumentConnectionItem 中同一份状态映射驱动。文档名称读取不到时显示“腾讯文档”，Tooltip 展示完整链接。认证未知时保留“无法打开”事实，并提供“登录”主要按钮；菜单仍保留重新检测，不把未知伪装为未登录。右侧最多一个主要按钮，更多菜单依次为重新检测、更换文档、复制链接、清除登录状态。

未配置时空白链接禁用连接，Enter 提交；同步在途锁防止重复提交。更换文档保留原链接，可取消；只有现有配置接口确认保存后才替换原配置。复制链接使用 Sonner 反馈。清除登录状态经 AlertDialog 确认共享范围及缓存影响，再发送独立后端动作；后端也必须收到明确确认参数。

## 业务边界

网页配置现已接入 React → Bridge → Sidecar → TencentSessionService → 现有 Node Worker。保存沿用 create / save 和 configRevision；创建带请求编号，结果未知先回读该编号，不自动再次创建。已有任务的链接修改仍受启用状态和配置版本保护。保存或打开网页均不表示连接成功。

结果独立保留目标链接、配置版本、会话及页面代次、共享范围、认证来源 / 原因 / 观察时间、目标表格身份、可选名称、访问 / 编辑权限和文档检查时间。仅账号认证成功不能产生“已连接”；还须确认当前目标、表格类型和双文档权限字段。P3 以真实字段的一致读数取代控件可见性推断；目标区域保护与填写资格单独检查。文档标题缺失使用“腾讯文档”，不影响其他事实。

Status 读取存活和快照，并核对现有页面修订及模型，不启动 Context、不导航、不 POST。进入设置时必要的检测由同一 Verify 入口合并协调。Verify 按需恢复当前环境的共享持久化 Context，默认 headless；缺令牌时在复用的后台 Page 加载已保存的目标文档，观察自然请求。已有人工页面时仅允许同 Context API / 无干扰读取，不切走、刷新、关闭或增加可见标签。只有主动“打开文档”使用有头会话。

认证只接受已观察到的 docs.qq.com user_info JSON 分类，动态 xsrf 必须来自当前 Context 的自然请求及可核对 Cookie，只留在 Worker 内存。HTTP / 业务码矛盾、网络、超时、解析失败和未验证的 doc.weixin.qq.com 认证均为未知。服务器观察与 DOM 检查时间分开，未收到服务器响应不填写服务器观察时间。缓存有效期 30 秒、主动请求最小间隔 5 秒、单次上限 8 秒是应用的有界策略，不代表腾讯的登录或令牌寿命；外层仍受现有 45 秒期限约束。

Cookie 集合经核验确认为空、且未观察到 xsrf 时，后端提供本地“需要登录”恢复状态，认证事实仍为 unknown，原因码 LoginCredentialsMissing。含有尚未分类的 Cookie 不等于已登录；未确认登录 Cookie 键名及作用域前，不按任意 Cookie 的有无改写服务器结论。匿名会话也可能取得 xsrf；值与 Cookie 相同只证明可核对，不能据此推断最初生成来源。

受限诊断只返回 Cookie 集合的空/存在/未检查状态、xsrf 读取位置及是否匹配、请求域名、允许列表中的脱敏路径和状态码。查询串、Cookie 键值、响应正文、账号标识及二维码资源标识均不记录。此前独立认证测试已在真实 Sidecar / Worker 中验证手动登录、关闭有头 Context、同一专属 Profile 后台恢复后仍为 server-confirmed；该次测试的编辑权限尚未知，没有仅凭认证变绿。P3 的文档和位置权限证据、真实界面链路及验收边界另见权限检查说明与 STATUS。

扫码按钮打开 Metis 内的官方 Dialog，复用历史提交 aac83de 的企业微信流程：后台目标文档 → #header-login-btn → 用户主动确认腾讯协议 → 选择“企业微信”。只从当前受管 Context 中的 open.work.weixin.qq.com / login.work.weixin.qq.com 页面或可见 iframe 提取唯一、已加载的二维码元素，只在内存截取该元素的 PNG，经本地 Bridge 展示。协议仅由明确的“同意协议并继续”触发，轮询不代为同意；服务协议和隐私政策按钮沿用历史固定官方链接，只有主动点击才打开系统浏览器。普通微信 qrconnect 不是该扫码入口。

任务绑定操作编号、目标、配置版本和会话代次；短请求读取状态，刷新先关闭本任务新增的企业微信页面，关闭 / 超时后取消旧任务并释放图像。单任务最长观察 180 秒属于本地等待期限，不冒充服务器二维码有效期。协议待确认和二维码已失效时暂停轮询，仍受本地截止时间约束；网站明确显示已扫码 / 已失效时才展示对应进度。这些 DOM 提示不证明账号登录成功，最终仍须由 user_info 确认，没有恢复旧版的 DOM 成功判定或长调用。

用户已明确允许重置应用专属 Profile，清除因此采用整个专属浏览器资料及缓存重置的方案。TencentSheetService 固定使用当前环境 DataDirectory 下的 tencent-sheet-profile，并持有原 Worker 租约；不是日常 Edge 用户目录。清除沿用同一互斥，不取消在途操作；原所有者检查占用，正常关闭 Context 后，再次核对规范化绝对目标、目录名称、父目录和符号链接边界。仅删除核验后的这个专属目录，不强制重试，不调用网站注销接口。所有共用会话的腾讯文档和旧任务均需重新登录；文档链接、业务配置、规则和历史位于目录外，保持。Development / Production 分开。

取消活动扫码任务、清除认证与权限快照并使旧代次失效属于同一清除操作。未确认、占用、目录边界不符和清除不完整分别返回准确结果；只有 LoginCleared 才显示成功。清除已用新建合成 Profile 验证，覆盖配置/其他环境保留、部分失败及外部占用，不清除本轮真实登录的测试 Profile。Close 仍只关闭会话并保留资料。

实际写入入口独立重新核验账号、目标及编辑能力；未知时在写入前停止，原确认令牌 / 配置签名 / 互斥和写入不重放保护保留。本轮未执行真实业务填报、云端保存、清除真实登录或调度；其他业务配置及执行规则仍维持既有 Mock 边界，未将整个适配器标成真实接通。未更新 Production、版本号、标签或 Release。

## 代码与验证

- DocumentConnectionItem 组合官方 Item / ItemMedia / ItemContent / ItemTitle / ItemActions、Input、Button、Badge、Spinner、DropdownMenu 和 Tooltip，替代原 DocumentConnectionAlert。
- SubmissionConnection 负责草稿、确认后的配置、回读、在途锁、配置 / 请求代次和迟到响应保护；TencentLoginDialog 负责内存图像、有界观察、刷新和取消。
- DocumentPermissionCheck 使用同一 sessionVerify，传入明确工作表和坐标，显示登录、文档编辑、目标保护及填写资格，提供检查中、失败、未知和过期状态。
- SubmissionSettingsLoading 的网页占位同为 56px。SubmissionExecutionRules 仅更新公共链接工具的导入路径。
- 新增认证、扫码生命周期、C# 并发请求与创建去重回归。真实 headless Edge 使用完全拦截的合成资源验证持久化关闭 / 恢复、权限和 Page / Context 复用；属于本地夹具，不是腾讯真实登录验收。
- tests/tencent-sheet/check-document-connection-ui.cjs 使用正式构建页面及隔离 Bridge 夹具，覆盖八状态、两主题和 1400/960px 窗口，共 32 组；验证 56px 行、20px 图标、长名称、无溢出、键盘菜单、取消和 Enter。浏览器矩阵纳入 check-ui.cjs，另支持 --electron 在真实 Electron Development 中检查同一组模拟状态。
- 浏览器和 Electron 夹具均通过；各状态的外框边界、图标位置和操作右边缘保持一致。UI 已于 2026-11-16 通过用户人工验收，真实业务能力仍以上述边界为准。

## 查看入口

运行 `npm.cmd --prefix src/ProductionAssistant.Desktop start -- --environment Development`，进入“数据报送 → 集团填报 → 设置 → 网页配置”。

隔离截图及尺寸记录保存在本机忽略目录 artifacts/document-connection-ui；截图中的连接状态是模拟证据。当前构建身份、验证结果、真实与模拟边界及下次入口以 STATUS.md 为准。
