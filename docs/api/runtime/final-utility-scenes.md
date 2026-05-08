# 收口辅助类与场景脚本

本页补齐阶段 7 覆盖清单中剩余的根目录脚本。它们不是同一个系统的核心主干，而是分散在编辑器工具、展示菜单、SleevePaint、叙事访问、校准、窗口伪 UI 和小型视觉组件中的辅助类。为了便于查找，本页按使用场景分组，而不是把它们并入某个已经很满的主页面。

## 编辑器工具

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `CharacterTemplateGenerator` | `RDFucked/Assets/Scripts/Assembly-CSharp/CharacterTemplateGenerator.cs` | 角色模板导出器，负责生成或复制自定义角色资源文件 |
| `InspectorPanel_CharacterTemplateGenerator` | `RDFucked/Assets/Scripts/Assembly-CSharp/InspectorPanel_CharacterTemplateGenerator.cs` | 角色模板导出 Inspector 面板，负责把 UI 输入写入导出器并触发生成 |

`CharacterTemplateGenerator` 保存角色、名称、目标行、分辨率、帧数、运行状态、写入标记和待写入文件字典。`ValidateValues()` 会阻止空名称，并把分辨率和帧数限制到至少为 `1`。`Generate(destination, callback)` 是主入口：当角色不是 `Character.Custom` 时，它会从内部资源复制对应 JSON、PNG、发光、冻结、描边和语音资源；当角色是 `Character.Custom` 时，它会创建模板贴图和模板 JSON。生成前会检查目标路径是否已有同名文件，必要时弹出覆盖确认框；确认后由 `SaveToDisk()` 异步写入文件，再执行回调。

`MakeSpritesheet()` 根据 `frameCount` 计算网格尺寸，生成带棋盘底和数字标记的模板 spritesheet，并从 `Resources/Characters/Template` 读取 JSON 模板替换尺寸占位符。`GetDimensions(int n)` 会在接近平方的因子组合里选择帧网格，`GetDigits(Texture2D source)` 从数字贴图中切出单个数字贴图。`CreateCustomTexture()` 在源码中只抛出 `NotImplementedException`，没有实际生成逻辑。

`InspectorPanel_CharacterTemplateGenerator` 在 `Awake()` 中创建 `CharacterTemplateGenerator`，把角色选择器、名称输入、分辨率输入、帧数输入和生成按钮接到面板方法上，并限制可选角色集合。`Save()` 把当前 UI 值写回导出器并调用 `ValidateValues()`。`UpdateUI()` 根据角色类型显示或隐藏分辨率与帧数输入：只有 `Character.Custom` 会显示这些模板生成参数。`DoGenerate()` 会保存面板状态，选择当前关卡目录或自定义角色目录作为输出位置，并启动导出协程；成功后会打开 `InspectorPanel_MakeRow`，选中目标行并加载刚生成的自定义角色 JSON。

## 展示菜单与关卡选择

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `BoothTimer` | `RDFucked/Assets/Scripts/Assembly-CSharp/BoothTimer.cs` | 展示模式无操作重启计时器 |
| `LevelSelectRobot` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelSelectRobot.cs` | Demo 关卡选择界面的机器人装饰角色 |
| `RDBGWalkingChar` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDBGWalkingChar.cs` | 关卡选择背景中横向移动的角色 |
| `scnDemoLevels` | `RDFucked/Assets/Scripts/Assembly-CSharp/scnDemoLevels.cs` | 展示版关卡选择场景 |
| `scnIanDesktop` | `RDFucked/Assets/Scripts/Assembly-CSharp/scnIanDesktop.cs` | Ian 桌面场景，管理登录、桌面和内置小程序 |

`BoothTimer` 继承 `RDBase`，通过静态 `instance` 创建名为 `BOOTH TIMER` 的常驻对象。`Run()` 会读取 `StreamingAssets/BoothInactivityMinutes.txt`，把文件中的数字作为分钟阈值；读取失败时保留默认值。`Update()` 在检测到任意按键时重置目标时间，若时间到达目标且允许重启，就调用 `RestartDemo()`。`RestartDemo()` 会把当前存档槽切到 `0`、锁定关卡状态、销毁音频源，并载入 `scnExpoMenu`。

`LevelSelectRobot` 在 `Awake()` 中缓存 `scrChar`。如果 `faceTowardCamera` 为真，`Update()` 会根据 `scnLevelSelect` 的箭头位置翻转 X 轴朝向。`SpawnTween()` 使用 DOTween 序列让角色横向移动，期间播放右看和左看的表情动画，并循环执行。

`RDBGWalkingChar` 根据 `dontAppear` 和 `unlockLevel` 判断角色是否能出现。`StartRunning(Action onComplete)` 会随机选择移动方向、表情动画和 Y 坐标，把角色放到屏幕一侧，再用 `DOLocalMoveX()` 移动到另一侧。`bird` 为真时会把 Y 轴范围整体抬高。

`scnDemoLevels` 维护展示版关卡数组、说明文本、场景根节点、转场、心率监视器、当前选择项和隐藏关卡条件。`Start()` 会设置 Discord 状态、读取完成和全连状态决定隐藏关卡是否出现、设置场景根节点、播放背景音乐并恢复从 SleevePaint 或 IanDesktop 返回时的选择。`Update()` 处理左右移动、确认、取消、玩家交换、调试快捷键和特殊跳转。`GoToLevelTrigger()` 根据当前选择进入关卡、SleevePaint 或 IanDesktop，并处理部分关卡在单人和双人模式下的替换。

`scnIanDesktop` 使用 `State` 管理 `Login`、`Desktop`、`InAnimation`、`InGame` 和 `Quit`。登录状态下按键会启动欢迎动画；桌面状态下左右移动选择程序，确认后打开 tempres、stacker 或外部商店页面。`OpenProgram()` 会启用目标程序屏幕并进入 `InGame`，`CloseProgram()` 会退出当前程序回到桌面，`ExitToHospital()` 通过 `RDSceneManager` 回到医院场景。

## SleevePaint 绘制场景

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `scnSleevePaint` | `RDFucked/Assets/Scripts/Assembly-CSharp/scnSleevePaint.cs` | 袖套绘制场景，管理画布、工具、调色板、保存和退出 |
| `SleevePaintCrosshair` | `RDFucked/Assets/Scripts/Assembly-CSharp/SleevePaintCrosshair.cs` | SleevePaint 的键鼠和手柄光标 |
| `SleevePreview` | `RDFucked/Assets/Scripts/Assembly-CSharp/SleevePreview.cs` | 袖套、手部、指甲和手掌预览组件 |

`scnSleevePaint` 的 `ToolPreset` 包含 `Brush`、`Eraser`、`Hand`、`Sleeve` 和 `Nails`。场景使用固定画布尺寸、缩放系数、调色板按钮、亮度滑条、撤销按钮、退出按钮和两个玩家的 `ArmSkin` 数据。`Awake()` 初始化透明色与滑条拖拽区域，`Start()` 设置 BPM、播放环境音、读取皮肤、注册按钮监听和特殊输入序列，并启动旁白。`ShowCo()` 根据玩家进入绘制界面，加载纹理、设置预览、初始化工具与按钮、创建材质实例并标记文件已载入。

`Load(ArmSkin)` 会读取玩家绘图纹理，遇到旧尺寸贴图时按源码中的偏移值转换到新尺寸，并把贴图过滤模式设为 `Point`。绘制过程集中在 `Update()`：根据当前工具、光标位置、画笔大小、拖拽状态和当前颜色修改纹理像素，随后更新预览。撤销、清空、保存、切换玩家和退出都由场景方法直接操作当前 `ArmSkin` 和 UI 状态。

`SleevePaintCrosshair` 在 `Start()` 中缓存 `RectTransform`、`Image`、鼠标位置和画布边界。`Update()` 会用鼠标、方向键或 RDInput 轴更新光标位置，把坐标限制在画布边界内，并通过 UI raycast 找到当前按钮或事件触发器。按下输入时，它会触发按钮点击或 `PointerDown`，松开时触发 `PointerUp`，离开对象时清理当前选择和 sprite 状态。

`SleevePreview` 在 `Awake()` 中复制袖套材质，避免直接改共享材质。`SetArmSkin()` 会把 `ArmSkin` 中的绘图纹理、手部颜色、指甲颜色和手掌颜色写入预览。`SetTexture()` 同时设置贴图过滤模式，并把纹理和 tint 写入材质参数。

## 旁白与访问性

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `NarrationHandler` | `RDFucked/Assets/Scripts/Assembly-CSharp/NarrationHandler.cs` | 旁白处理抽象基类 |
| `NarrationHandler_Default` | `RDFucked/Assets/Scripts/Assembly-CSharp/NarrationHandler_Default.cs` | 默认旁白实现，桥接 UAP 与 Windows TTS |
| `HeartMonitorGuest` | `RDFucked/Assets/Scripts/Assembly-CSharp/HeartMonitorGuest.cs` | 心率监视器访客条目 |
| `RDChoiceControl` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDChoiceControl.cs` | Ink 选项控件数据容器 |

`NarrationHandler` 定义 `IsEnabled`、`IsSpeaking`、`InternalSay()`、`InternalStop()`、`InternalEnableAccessability()`、`InternalToggleSAPI()`、`InternalSetSpeed()` 和 `InternalSetVolume()`。公开方法都会先检查 `Narration.IsAvailable`，再调用内部实现；`Say()` 会先移除富文本颜色标签，避免把颜色标记交给语音系统。

`NarrationHandler_Default` 使用 `UAP_AccessibilityManager` 实现读屏、停止、启用、语速和音量设置。`InternalEnableAccessability()` 在桌面且非移动平台会调用 `PauseAccessibility(true)`。`InternalToggleSAPI()` 只在第一次调用时切换 Windows SAPI，并根据是否桌面平台设置 Magic Gestures。

`HeartMonitorGuest` 根据 `GuestData` 填充姓名、类型与链接图标。`Set()` 会从 `Resources/CLS/MediaIcons/<linkType>` 加载图标，失败时使用 `Other`；如果访客名称使用 CJK 或 reduced pixel font，则把字号降到 `6`。存在链接时，它会把按钮监听接到 `Application.OpenURL()`，并根据姓名文本的生成顶点移动图标位置；无链接时隐藏图标。

`RDChoiceControl` 只保存箭头对象、文本控件和 `Ink.Runtime.Choice`，供对话选项 UI 持有选项数据。

## 校准、叙事与测试场景

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `scnCalibrationOld` | `RDFucked/Assets/Scripts/Assembly-CSharp/scnCalibrationOld.cs` | 旧版校准场景 |
| `RDLyricsRecorder` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLyricsRecorder.cs` | 歌词时间记录工具 |
| `scrWrldWarning` | `RDFucked/Assets/Scripts/Assembly-CSharp/scrWrldWarning.cs` | warning 场景空脚本 |
| `FizzdOffsetAccuracy` | `RDFucked/Assets/Scripts/Assembly-CSharp/FizzdOffsetAccuracy.cs` | 偏移准确度枚举 |

`scnCalibrationOld` 继承 `scnBase`，保存麦克风音源、计时文本、结果文本、按钮和对话状态。`Start()` 淡入并调用 `StartCalibration()`。`Update()` 管理对话推进、录制启动和校准计算；`OnGUI()` 用 `Event.current` 捕获第一次空格按下的 DSP 时间。`CalculateInputCalibration()` 读取麦克风 clip 采样并调用 `ProcessSpectrum()`，随后把输入和视觉偏移写到结果文本；失败路径会显示错误文本。`ProcessSpectrum()` 把采样转为绝对值，分段寻找峰值，并用固定延迟常量换算偏移。

`RDLyricsRecorder` 是一个用于手动记录歌词时间的场景工具。`Start()` 填充歌词文件下拉框、设置音乐滑条范围、加载第一份歌词并绑定 UI 监听。`Update()` 在玩家按键时把当前音乐时间加入临时记录数组，按时间和偏移显示歌词快照，并在未拖动滑条时同步播放位置。`LoadLyrics()` 把文本按 `-Times-` 分成歌词和时间两部分，歌词段落按 `/` 累积为快照，时间行解析为双精度数组。

`scrWrldWarning` 只继承 `scnBase`，源码中没有字段或方法。`FizzdOffsetAccuracy` 定义 `No`、`Yes` 和 `TotalConfidence` 三个值，用于表示 Fizzd 偏移结果的准确状态。

## UI、文本与窗口辅助

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `PauseModeCategorySelector` | `RDFucked/Assets/Scripts/Assembly-CSharp/PauseModeCategorySelector.cs` | 暂停菜单分类选择条 |
| `scrCareLessAlert` | `RDFucked/Assets/Scripts/Assembly-CSharp/scrCareLessAlert.cs` | Care Less 风格弹窗皮肤切换 |
| `scrCareLessFile` | `RDFucked/Assets/Scripts/Assembly-CSharp/scrCareLessFile.cs` | Care Less 文件条目数据容器 |
| `scrCareLessWindow` | `RDFucked/Assets/Scripts/Assembly-CSharp/scrCareLessWindow.cs` | Care Less 文件窗口生成与滚动 |
| `scrTextBehind` | `RDFucked/Assets/Scripts/Assembly-CSharp/scrTextBehind.cs` | 跟随另一个文本控件内容 |
| `ImageColorSameAsSelectedTab` | `RDFucked/Assets/Scripts/Assembly-CSharp/ImageColorSameAsSelectedTab.cs` | 空实现占位组件 |

`PauseModeCategorySelector.Initialize(width, height, mode)` 会缓存自身和布局的 `RectTransform`，保存 `PauseMenuMode`，按分类数量计算选择条宽度，并设置选择条和自身尺寸。`UpdateSelector()` 根据 `mode.currentCategoryIndex` 计算 X 位置，用 DOTween 在 `0.2` 秒内移动选择条，动画使用独立时间更新。

`scrCareLessAlert.SetButtons(mode, type)` 根据按钮模式和类型切换按钮 sprite 与文字颜色。`SetBox(type)` 切换弹窗外框 sprite，并控制 OK 与 Cancel 文本对象是否显示。`scrCareLessFile` 只保存文件条目的 RectTransform、图标 Image 和文字 Text。

`scrCareLessWindow.Awake()` 根据语言选择歌词资源，把普通歌词和本地化歌词交给 `AddLines()` 生成文件条目，并设置内容高度。`AddLines()` 逐行解析文本，去掉行尾逗号，从预制体实例化文件条目，随机选择图标和扩展名，按索引设置锚点位置。`SetScrollPos()` 和 `TweenScrollPos()` 分别直接设置和缓动设置滚动位置。`RemoveRandomFileFromLast(lastFiles)` 会在最后一段文件里随机隐藏一个尚未移除的条目。

`scrTextBehind.Update()` 每帧把自己的文本设置为 `textToFollow.text`。`ImageColorSameAsSelectedTab` 只有空的 `Start()` 和 `Update()`，源码没有实际逻辑。

## 小型视觉组件

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `Follower` | `RDFucked/Assets/Scripts/Assembly-CSharp/Follower.cs` | 位置与旋转跟随器 |
| `RDCurveFade` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDCurveFade.cs` | 按音乐小节进度驱动 HUD 覆盖层透明度 |
| `RDDonut` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDDonut.cs` | 运行时或编辑器中生成环形 Mesh |
| `RDSetSortingLayer` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDSetSortingLayer.cs` | 把 Renderer 设置到指定 sorting layer 和 order |
| `RDTutorial` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDTutorial.cs` | 教程中移动音符背景并修改颜色 |
| `scrThingShake` | `RDFucked/Assets/Scripts/Assembly-CSharp/scrThingShake.cs` | 对对象做短时间随机位移 |
| `scrVolumeTrackerFade` | `RDFucked/Assets/Scripts/Assembly-CSharp/scrVolumeTrackerFade.cs` | 读取频谱并换算淡入值的调试组件 |
| `RDThemeFXEditor` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDThemeFXEditor.cs` | 主题特效枚举 |

`Follower.LateUpdate()` 把自身位置和旋转复制为目标对象的当前值，适合跟随已经在本帧更新完成的对象。

`RDCurveFade` 保存 `RDAnimationCurves` 和当前曲线。设置 `fadingCurve` 时，它会从曲线集合中取出目标曲线。`Update()` 在音乐未暂停时计算当前视觉小节进度：以 `scrConductor.visualPos`、下一小节起点、校准值、延迟、crotchet 和每小节 crotchet 数换算归一化时间，再把曲线采样结果写入 `RDBase.Vfx.hudCameraOverlay.alpha`。

`RDDonut` 带 `ExecuteInEditMode`，在 `Start()` 中默认切到 Mini 模式并请求重建 Mesh。`GenerateMesh()` 根据内外半径和边数生成内外两圈顶点，再用三角形索引拼成环形网格，最后赋给 `MeshFilter.mesh`。

`RDSetSortingLayer` 也带 `ExecuteInEditMode`。`Awake()` 缓存 `Renderer`，运行中启用或编辑器模式下都会调用 `Update()`；`Update()` 把 `sortingLayerName` 和 `sortingOrder` 写入渲染器。

`RDTutorial.Start()` 把音符容器移动到 `(-40, -40)`，再用 DOTween 以线性循环移动到 `(40, 40)`。`SetNotesColor(Color color)` 直接设置 `tk2dTiledSprite` 的颜色。

`scrThingShake` 保存原始坐标、持续时间和抖动强度。`activateThingJitter()` 两个重载用于设置抖动参数，`Update()` 在剩余时间内给对象随机 X/Y 偏移，结束后恢复原坐标。`StopShake()` 会立即停止并恢复。

`scrVolumeTrackerFade.Start()` 从 `scrConductor` 取得音源。`Update()` 读取音频频谱，把指定频点的对数值换算到 `currentFade`。`OnGUI()` 把当前数值画到屏幕上。

`RDThemeFXEditor` 定义编辑器可选主题特效：`Embers`、`EmbersPrewarmed`、`BassDropOnHit`、`ColorSphereOnHit`、`Vignette`、`VignetteFlicker`、`ShakeOnHeartBeat` 和 `SilhouetteColoursOnHeartbeat`。

## 覆盖关系

| 分组 | 覆盖文件 |
| --- | --- |
| 编辑器工具 | `CharacterTemplateGenerator`、`InspectorPanel_CharacterTemplateGenerator` |
| 展示菜单与关卡选择 | `BoothTimer`、`LevelSelectRobot`、`RDBGWalkingChar`、`scnDemoLevels`、`scnIanDesktop` |
| SleevePaint 绘制场景 | `scnSleevePaint`、`SleevePaintCrosshair`、`SleevePreview` |
| 旁白与访问性 | `NarrationHandler`、`NarrationHandler_Default`、`HeartMonitorGuest`、`RDChoiceControl` |
| 校准、叙事与测试场景 | `scnCalibrationOld`、`RDLyricsRecorder`、`scrWrldWarning`、`FizzdOffsetAccuracy` |
| UI、文本与窗口辅助 | `PauseModeCategorySelector`、`scrCareLessAlert`、`scrCareLessFile`、`scrCareLessWindow`、`scrTextBehind`、`ImageColorSameAsSelectedTab` |
| 小型视觉组件 | `Follower`、`RDCurveFade`、`RDDonut`、`RDSetSortingLayer`、`RDTutorial`、`scrThingShake`、`scrVolumeTrackerFade`、`RDThemeFXEditor` |
