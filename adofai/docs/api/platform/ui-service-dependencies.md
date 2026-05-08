# UI、服务辅助类与依赖接入

## 基本信息

本页收束阶段 6 中较分散的 UI 辅助类、服务调试类、CLS 导入组件和第三方依赖接入点。它们大多不独立构成大型系统，但会连接平台判断、Steam 状态、Workshop、通知、本地化、Rewired 输入和运行时状态机。

| 类或类族 | 源码路径 | 主要职责 |
| --- | --- | --- |
| `RDDisableOnPlatform` | `7thRhythmSource/ADOFAi/RDDisableOnPlatform.cs` | 根据 `ADOBase.isMobile` 与 `disableIfPlatformIs` 在 `Awake()` 禁用当前对象。 |
| `scrDisableIfSteamworksDisabled` | `7thRhythmSource/ADOFAi/scrDisableIfSteamworksDisabled.cs` | 在 `Start()` 检查 `SteamIntegration.initialized`，Steam 未初始化时禁用当前对象。 |
| `AnalyticsShowScene` | `7thRhythmSource/ADOFAi/AnalyticsShowScene.cs` | Steam 统计调试场景组件，读取个人统计、请求全局统计并绘制折线数据。 |
| `Notification` | `7thRhythmSource/ADOFAi/Notification.cs` | 全局通知条单例，显示校准、音频缓冲、空间不足、云存档、服务超时和 entitlement 结果提示。 |
| `RDStringToUIText` | `7thRhythmSource/ADOFAi/RDStringToUIText.cs` | 把 `RDString` 本地化文本与字体应用到 `Text` 或 `TextMesh`。 |
| `ChineseDLCLogo` | `7thRhythmSource/ADOFAi/ChineseDLCLogo.cs` | 根据 `RDString.isChinese` 切换 DLC logo sprite 状态。 |
| `IntroCLS` | `7thRhythmSource/ADOFAi/IntroCLS.cs` | CLS 首次进入提示面板，允许继续进入 CLS 或打开 Workshop。 |
| `scrCLSPortalChanger` | `7thRhythmSource/ADOFAi/scrCLSPortalChanger.cs` | 轮换 Classic、Tech 或 Workshop portal 预览图。 |
| `ImportLevelsCLS` | `7thRhythmSource/ADOFAi/ImportLevelsCLS.cs` | CLS 关卡导入面板，支持本地包、URL 包、拖放、解压、校验和安装。 |
| `SettingsMenu` | `7thRhythmSource/ADOFAi/SettingsMenu.cs` | 暂停菜单设置面板，根据资源 JSON 生成分类和设置项，并读写 `Persistence`、平台服务和运行时控制器。 |
| `Rewired` | `7thRhythmSource/ADOFAi/Rewired*` | 输入中间层；ADOFAI 通过 `ADOStartup` 实例化 `InputManager`，再交给 `RDInput`。 |
| `MonsterLove.StateMachine` | `7thRhythmSource/ADOFAi/MonsterLove.StateMachine/*.cs` | 状态机基础库；`scrController` 继承 `StateBehaviour`。 |
| `ByteSheep.Events` | `7thRhythmSource/ADOFAi/ByteSheep.Events/*.cs` | Unity 事件封装库；`ffxCallFunction` 与 `ffxCallFunctionPlus` 持有 `QuickEvent`。 |
| `BlendModes` | `7thRhythmSource/ADOFAi/BlendModes/*.cs` | 混合模式渲染扩展；`ADOStartup` 设置装饰管理器的 blend shader。 |
| `TMPro.Examples` | `7thRhythmSource/ADOFAi/TMPro.Examples/*.cs` | TextMeshPro 示例脚本目录；主工程大量使用 TMP 组件，但示例脚本不作为 ADOFAI 主流程入口。 |

## 平台条件开关

### `RDDisableOnPlatform`

`RDDisableOnPlatform` 继承 `ADOBase`，内部枚举 `RDPlatform` 只有 `Mobile` 与 `Desktop` 两个值。

| 成员 | 类型 | 行为 |
| --- | --- | --- |
| `disableIfPlatformIs` | `RDPlatform` | 指定禁用条件。 |
| `Awake()` | `void` | 当 `ADOBase.isMobile` 且目标为 `Mobile`，或非移动端且目标为 `Desktop` 时，调用 `gameObject.SetActive(false)`。 |

这个类只负责对象层面的显隐开关，不读取具体平台枚举，也不处理子对象之外的状态。

### `scrDisableIfSteamworksDisabled`

`scrDisableIfSteamworksDisabled.Start()` 只检查 `SteamIntegration.initialized`。如果 Steamworks 未初始化，它会禁用挂载对象。该类常用于把 Steam 专属按钮、面板或调试入口从非 Steam 环境中隐藏。

## Steam 统计调试场景

`AnalyticsShowScene` 是一个 `ADOBase` 组件，直接引用 Steamworks API。

| 成员 | 类型 | 行为 |
| --- | --- | --- |
| `textHolderPersonal` / `textHolderGlobal` | `TextMeshProUGUI` | 显示个人统计和全局统计文本。 |
| `field` | `TMP_InputField` | 输入全局统计查询天数。 |
| `grid` | `UIGridRenderer` | 根据天数和最大值设置网格尺寸。 |
| `lineRenderer` | `UILineRenderer` | 用全局统计历史值生成折线点。 |
| `DrawButtonsPanel` | `GameObject` | 成功开始全局统计请求后显示绘图按钮面板。 |
| `DebugPanel` | `GameObject` | `Update()` 中按 Tab 切换显示状态。 |
| `globalStats` | `List<StatsData>` | 存放要查询的 Steam 全局统计字段和返回值数组。 |

| 方法 | 行为 |
| --- | --- |
| `Awake()` | 调用 `SteamUserStats.RequestCurrentStats()`。 |
| `Start()` | 读取个人统计，并隐藏绘图按钮面板。 |
| `UploadValues()` | 调用 `Analytics.UploadStatsToSteam()` 上传四类游玩时长。 |
| `GetGlobalStats()` | Steam 初始化且输入天数可解析时，调用 `RetrieveGlobalStats()` 并显示绘图按钮。 |
| `AnalyticsValueUp()` / `AnalyticsValueDown()` | 调整 `hoursOfficialLevels`，然后刷新个人统计文本。 |
| `GetPersonalStats()` | 读取 Steam 名称、进入 CLS 次数、进入编辑器次数、四类时长和进入选关次数。 |
| `RetrieveGlobalStats(int)` | 请求指定天数的全局统计，并在 callback 中用 `GetGlobalStatHistory()` 写入 `globalStats[i].value`。 |
| `DrawButton(int)` / `DrawGraph(int, int)` | 根据某个统计字段的历史值设置网格、折线点和文本。 |
| `Update()` | Steam 初始化时运行 Steam callbacks，并用 Tab 切换 `DebugPanel`。 |

`OnGlobalStatsReceived()` 在源码中是空方法；实际全局统计处理逻辑位于 `RetrieveGlobalStats()` 内部创建的 `CallResult<GlobalStatsReceived_t>` callback。

## 通知条

`Notification.instance` 是懒加载单例。首次访问时，它会实例化 `RDConstants.data.prefab_notification` 并获取 `Notification` 组件。

| 成员 | 类型 | 行为 |
| --- | --- | --- |
| `_instance` | `static Notification` | 全局通知实例缓存。 |
| `bar` | `RectTransform` | 通知条主体，`SetupNotification()` 通过 DOTween 移入和移出。 |
| `button` | `Button` | 每次显示通知前会清空 listener，再按提示类型添加点击行为。 |
| `icon` | `Image` | 显示校准、警告或完成图标。 |
| `text` | `Text` | 通知文本，`Awake()` 调用 `SetLocalizedFont()`。 |
| `showCalibrationOnTap` | `bool` | 控制校准提示点击后进入校准还是打开暂停设置。 |

| 方法 | 行为 |
| --- | --- |
| `SetupNotification(float delay, float scale, bool reset)` | 设置条高、清空按钮监听、停止旧 tween，并按 `reset` 决定从屏幕外滑入后延迟滑出，或直接延迟滑出。 |
| `ShowCalibration()` | 读取 `scrConductor.currentPreset`，根据 `confident` 设置文本与点击行为。 |
| `MoreInfoCalibration()` | 不可靠校准预设进入校准场景；可靠预设打开暂停菜单设置页。 |
| `ShowAudioBufferChange(int)` | 显示音频缓冲变化警告。 |
| `ShowNoSpace()` | 显示磁盘空间不足警告。 |
| `ShowIncompatibleCloud()` | 显示云存档版本不兼容提示。 |
| `ShowGameServicesTimeOut()` / `MoreInforServicesTimeOut()` | 显示平台服务超时提示，点击后扩展显示更多说明。 |
| `ShowGameServicesComplete()` | 显示服务完成提示，点击跳转关卡选择。 |
| `ShowEntitlementMessage(bool, string)` | 显示 entitlement 成功或失败提示；成功时点击扩展说明。 |

## 本地化 UI 辅助

### `RDStringToUIText`

`RDStringToUIText.Start()` 先尝试读取同一对象上的 `UnityEngine.UI.Text`，再尝试读取 `TextMesh`。如果 `key` 非空，它会用 `RDString.Get(key)` 写入文本，然后调用对应的 `Apply()`。

| 成员 | 类型 | 行为 |
| --- | --- | --- |
| `key` | `string` | 本地化 key。 |
| `cjkScale` | `float` | 非 0 时作为字体大小缩放系数。 |
| `enlargeForMobile` | `bool` | 方法签名保留该参数，但当前源码中的 `Apply()` 没有基于它改变行为。 |
| `changeFontForLanguage` | `bool` | 控制是否用 `RDString.fontData` 替换字体和行距。 |

| 方法 | 行为 |
| --- | --- |
| `Apply(Text, bool, bool, float)` | `changeFontForLanguage` 为 true 时，把 `Text.font` 与 `lineSpacing` 设为 `RDString.fontData`，并按 scale 调整 `fontSize`。 |
| `Apply(TextMesh, bool, bool, float)` | 替换 `TextMesh.font`、`lineSpacing` 和 renderer material，并按 CJK scale 调整 `fontSize`。 |

如果同一对象没有 `Text` 或 `TextMesh`，`Start()` 会输出错误日志，日志中包含 key 和对象名。

### `ChineseDLCLogo`

`ChineseDLCLogo.Start()` 只做一个分支：如果 `RDString.isChinese` 为 true，则 `spr.SetState(1)`；否则 `spr.SetState(0)`。

## CLS 首次进入和 portal 预览

### `IntroCLS`

`IntroCLS` 控制 CLS 首次进入提示面板。

| 成员 | 类型 | 行为 |
| --- | --- | --- |
| `panel` | `RectTransform` | `Start()` 中从隐藏位置移动到 `visibleY`。 |
| `backgroundImage` | `Image` | 确认继续后淡出背景。 |
| `leftOption` / `rightOption` | `Image` | `SelectOption()` 根据当前选择切换高亮颜色。 |
| `rightSelected` | `bool` | 当前是否选择右侧选项。 |
| `unhighlightedColor` / `highlightedColor` | `Color` | 选项未高亮和高亮颜色。 |

| 方法 | 行为 |
| --- | --- |
| `Start()` | 设置 `ADOBase.controller.isCutscene = true`，默认选择右侧选项，并播放面板进入 tween。 |
| `Update()` | 左右输入切换选项；确认输入且没有鼠标/触摸按下时调用 `TriggerAction(rightSelected)`。 |
| `TriggerAction(bool)` | 右侧且仍处于 cutscene 时关闭面板、写入 `Persistence.displayedCLSIntro = true`；否则调用 `SteamWorkshop.OpenWorkshop()`。 |

### `scrCLSPortalChanger`

`scrCLSPortalChanger` 按间隔轮换 portal 图片，并用两个 `PortalQuad` 交叉淡入淡出。

| 成员 | 类型 | 行为 |
| --- | --- | --- |
| `portalType` | `PortalType` | `Classic`、`Tech` 或 `Workshop`。 |
| `updateInterval` | `int` | 两次刷新之间的秒数。 |
| `animationDuration` | `float` | 两个 quad 淡入淡出的 tween 时长。 |
| `startDelay` | `float` | 非首次刷新时的延迟。 |
| `portalQuad1` / `portalQuad2` | `PortalQuad` | 交替承载旧图和新图。 |
| `workshopLevelIds` | `PublishedFileId_t[]` | Workshop 模式下缓存订阅关卡 ID，并排除精选 ID。 |

| 方法 | 行为 |
| --- | --- |
| `Start()` | Workshop 模式且 Steam 初始化时，读取订阅物品并排除 `GCNS.FeaturedLevelsIDs` 与 `GCNS.TechFeaturedLevelsIDs`。 |
| `GetTexture()` | Classic/Tech 从 `Resources/FeaturedLevels/{id}/portal` 读取；Workshop 从订阅关卡 `main.adofai` 中读取 `LevelDataCLS.previewImage`，失败时回退到默认图。 |
| `Update()` | 到达刷新间隔后取新贴图；如果贴图未变化则返回，否则切换 quad、设置新贴图、淡出旧图并释放旧资源。 |

Workshop 模式下，成功读取本地订阅目录后会调用 `TextureManager.LoadTexture()` 加载预览图；找不到文件、解码失败或贴图为空时都会回退到 `ADOBase.cls.workshopPortalTexture`。

## CLS 关卡导入面板

`ImportLevelsCLS` 管理自定义关卡选择中的导入弹窗，支持本地 `.adofaizip`、URL、拖放、解压、hash 去重和安装进 `scnCLS.localWorldsPath`。

| 区域 | 关键字段 | 行为 |
| --- | --- | --- |
| 面板容器 | `importPanel`、`occluderImage`、`closeButton`、`dragAndDrop` | 控制弹窗进入/关闭、遮罩 raycast 和拖放文件入口。 |
| 浏览页 | `browsePanel`、`browseLocalButton`、`addFromURLButton`、提示文本对象 | 本地选择包或进入 URL 输入页。 |
| URL 页 | `urlImportPanel`、`urlInput`、`addLevelsButton`、`urlGoBackButton` | 从输入文本创建 URL 导入项。 |
| 安装页 | `installPanel`、`installPanelTitle`、`installDetailsText`、`installButton`、`clearOrStopLevelsButton` | 安装、停止、清空、错误显示和安装结果显示。 |
| 结果列表 | `errorsIS`、`toInstallIS`、`installedIS` | 保存错误、待安装和已安装的 `ImportLevel` 条目。 |

| 方法 | 行为 |
| --- | --- |
| `Initialize()` | 绑定拖放回调，初始化三个信息区的 `levels` 列表。 |
| `Start()` | 绑定本地浏览、URL、关闭、安装、返回和清空/停止按钮。 |
| `ShowContent(ContentType)` | 在浏览页、URL 页和安装页之间切换；进入安装页时重设标题和安装按钮。 |
| `OnOpenImportPanel()` | 显示弹窗、启用遮罩 raycast、暂停 controller 响应，并播放进入动画。 |
| `OnCloseImportPanel()` | 隐藏弹窗、关闭遮罩 raycast、恢复 controller 响应，并清空导入信息区。 |
| `BrowseZip()` | 使用 `UnityFileDialog.FileBrowser.PickFiles()` 选择 `GCS.levelZipExtensions`，并为每个文件启动 `AddContent()`。 |
| `AddLevelsFromInputField()` | 从 URL 输入框拆分内容并作为 URL 导入项加入待安装区。 |
| `InstallContent()` / `InstallRoutine()` | 遍历待安装项；URL 项先下载，本地项解压并校验，成功后移动到本地 worlds 路径。 |
| `ProcessAdoZip()` | 解压后定位 `.adofai` 主文件，读取并解码 `LevelDataCLS`，检查同 hash 关卡，成功后移动目录。 |
| `HandleUrlDownload()` | 下载 URL 包到临时路径，支持已下载文件复用。 |
| `UnzipLevelFile()` | 调用包安装器解压关卡包。 |
| `StopInstall()` | 设置 `AdoPackageInstaller.cancelDownload = true`，停止安装流程并切换为清空按钮。 |
| `ShowClearButton()` / `ShowStopInstallButton()` | 切换同一个按钮的监听、文本和交互状态。 |

`stoppedInstallCoroutine` 是安装协程停止标记；`HandleCoroutineStop()` 会停止单个 `ImportLevel` 的安装进度显示。

## 设置菜单

`SettingsMenu` 是暂停菜单设置页主控制器。它从 `Resources/PauseMenuSettings` 读取 JSON，按分类生成 `PauseSettingButton` 和 `SettingsTabButton`。

| 成员 | 类型 | 行为 |
| --- | --- | --- |
| `settingsTabs` | `List<List<PauseSettingButton>>` | 按分类保存设置按钮。 |
| `tabButtons` | `List<SettingsTabButton>` | 保存分类按钮。 |
| `selectedTab` / `selectedIndex` | `int` | 当前分类和当前设置项索引。 |
| `offsetButton` | `PauseSettingButton` | 音频输出变化时用于刷新 offset 相关设置。 |
| `settingsThatRequireRestart` | `int` | 记录需要重启后生效的设置数量。 |
| `isSelectingTab` | `bool` | 当前是否在分类选择状态。 |
| `selectedKeysSetting` | `KeysSetting` | 当前正在编辑的 key limiter 设置。 |

| 方法 | 行为 |
| --- | --- |
| `Awake()` | 调用 `GenerateSettings()`，隐藏 tab 容器，并把 goat 描述点击绑定到当前设置的说明动作。 |
| `Show()` | 打开设置页，重置描述、选择状态和滚动位置，并播放设置面板进入动画。 |
| `GenerateSettings()` | 解析 `PauseMenuSettings`；按 `exclude`、`excludeExpo`、`devOnly`、`platform`、`requiresDLC`、震动能力过滤设置项；实例化按钮并写入文本、范围、单位、说明和图标。 |
| `Update()` | 处理取消、方向、确认、左右调整、tab 切换和 key limiter 编辑。 |
| `StartEditingKeys(KeysSetting)` / `StopEditingKeys()` | 进入或退出键位选择编辑状态。 |
| `UpdateSetting(PauseSettingButton, Interaction)` | 按设置名和动作读写 `Persistence`、音量、显示、窗口、输入、异步输入、DLC 清理、Discord presence、移动端帧率等运行时状态。 |
| `Select(PauseSettingButton)` / `Select(int, bool)` | 选择设置项并滚动到可见区域。 |
| `SelectTab(SettingsTabButton)` / `SelectTab(int, bool)` | 切换设置分类并刷新按钮焦点。 |
| `AudioOutputWasUpdated()` | 音频输出变化时刷新 `offsetButton`。 |
| `SetDescription(string)` | 把说明文本交给 `SettingsGoat.SetDescription()`。 |

`GenerateSettings()` 中的 `platform` 字段会匹配 `iOS`、`android`、`mobile`、`switch`、`desktop`、`steamDeck` 或 `Platform` 枚举名；`requiresDLC` 当前识别 `neoCosmos` 和 `vega`。

## 第三方与通用依赖接入点

### Rewired

ADOFAI 的主输入层不直接让业务代码访问 Rewired。启动阶段由 `ADOStartup.Startup()` 实例化 `RDConstants.data.prefab_rewiredManager`，得到 `Rewired.InputManager`，随后调用 `RDInput.Setup(rewiredManager)`。

| 接入点 | 源码路径 | 行为 |
| --- | --- | --- |
| `ADOStartup` | `ADOStartup.cs` | 引用 `using Rewired`，实例化 Rewired 管理器 prefab，并传入 `RDInput.Setup()`。 |
| `RDConstants.prefab_rewiredManager` | `RDConstants.cs` | 保存 Rewired 管理器 prefab 引用。 |
| `RDInput.rewiredManager` | `RDInput.cs` | 保存当前 Rewired `InputManager`。 |
| `RDInput.Setup()` | `RDInput.cs` | 初始化输入类型列表，并遍历 `ReInput.players.playerCount`。 |
| `RDInputType_Joystick` | `RDInputType_Joystick.cs` | 通过 `ReInput.players.GetPlayer(schemeIndex)` 读取摇杆玩家。 |

`Rewired.Demos`、`Rewired.UI.ControlMapper`、`Rewired.Glyphs` 等目录属于随 Rewired 导入的代码，本阶段只记录 ADOFAI 主工程的接入点。

### MonsterLove.StateMachine

`scrController` 声明 `using MonsterLove.StateMachine` 并继承 `StateBehaviour`。`StateBehaviour` 位于 `MonsterLove.StateMachine/StateBehaviour.cs`，继承 `ADOBase`，并要求同一对象上存在 `StateEngine`。因此 ADOFAI 的控制器状态机既能使用 `ADOBase` 全局访问器，也能使用 MonsterLove 的状态映射。

### ByteSheep.Events

`ffxCallFunction.cs` 和 `ffxCallFunctionPlus.cs` 都声明 `using ByteSheep.Events`，并持有字段 `public QuickEvent ue;`。这两个运行时效果的作用是通过 Unity 事件式入口调用外部绑定逻辑。`ByteSheep.Events` 目录内包含 `QuickEvent`、`AdvancedEvent`、参数缓存、persistent call group 和类型化事件类；ADOFAI 主流程文档只追踪到 `ffxCallFunction` 与 `ffxCallFunctionPlus` 的使用点。

### BlendModes

`ADOStartup.Startup()` 在启动阶段设置两个装饰 shader：

| 字段 | 设置值 |
| --- | --- |
| `scrDecorationManager.tileShader` | `Shader.Find("Sprites/Tile")` |
| `scrDecorationManager.visualDecoShader` | `Shader.Find("Hidden/BlendModes/VisualDeco/Grab")` |

`BlendModes` 目录内的 renderer extension、mask、shader resource 和 property 类型为混合模式渲染提供实现。ADOFAI 主工程当前可见接入点是启动时为 `scrDecorationManager` 设置 visual decoration shader。

### TextMeshPro 与 `TMPro.Examples`

ADOFAI 大量 UI 与关卡脚本直接使用 `TMP_Text`、`TextMeshProUGUI`、`TMP_InputField`、`TMP_FontAsset` 和 `TextMeshPro`。这些用法分布在编辑器控件、通知、成就、错误面板、关卡脚本文本演出和菜单 UI 中。

`TMPro.Examples` 是 TextMeshPro 示例脚本目录，包含 frame counter、selector、vertex animation、benchmark 等示例类。它们不作为阶段 6 的业务系统展开；后续阶段 7 文件级覆盖清单会按目录归类。

## 与已完成页面的关系

| 主题 | 相关页面 |
| --- | --- |
| 平台 helper、DLC、Steam、Workshop 和 GameServices | [平台 Helper、DLC、Steam 与服务](/api/platform/platform-dlc-steam-services.md) |
| `GCS`、`GCNS`、`Persistence` 和全局常量 | [全局状态、常量与存档](/api/platform/global-state-persistence.md) |
| CLS、关卡选择、移动菜单和 `RDString` | [CLS、关卡选择、移动菜单与本地化](/api/platform/cls-level-select-mobile-localization.md) |
| `RDInput`、异步输入和判定链路 | [运行时输入与判定](/api/runtime/input-judgement.md) |
| `scrController` 状态机 | [scrController](/api/core/scrController.md) |
| 事件到运行时效果调度 | [事件执行总览](/api/events/event-execution-overview.md) |
