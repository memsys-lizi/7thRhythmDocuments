# 场景主题与房间组件

本页补充阶段 7 中仍未命中的根目录场景主题、房间装饰、转场和启动场景脚本。它们多数不是通用系统入口，而是特定主题房间、关卡选择、启动流程或视觉转场的组件。

## 源码范围

| 类型 | 路径 | 主要职责 |
| --- | --- | --- |
| `RDAbandonedWard` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDAbandonedWard.cs` | Abandoned Ward 主题环境，控制电梯和门动画。 |
| `RDBoyWard` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDBoyWard.cs` | Boy Ward 窗口女孩跑动动画。 |
| `SVTWard` | `RDFucked/Assets/Scripts/Assembly-CSharp/SVTWard.cs` | SVT ward 昼夜、灯光、万圣节对象和闪烁灯光。 |
| `RDAirport` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDAirport.cs` | Airport 背景云循环移动。 |
| `RDGarden` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDGarden.cs` | Garden 昼夜容器切换。 |
| `RDRooftop` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDRooftop.cs` | Rooftop 主题变体和三层背景移动。 |
| `RDRooftopClouds` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDRooftopClouds.cs` | Rooftop 云层平移循环。 |
| `RDRollerDisco` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDRollerDisco.cs` | Roller Disco 横向滚动背景和昼夜切换。 |
| `RDMuseDash` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDMuseDash.cs` | 继承 `RDEnvironment` 的 Muse Dash 环境占位类。 |
| `RDRecordsRoom` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDRecordsRoom.cs` | Records Room 背景和前景 sprite 引用容器。 |
| `RDAlphaLevelSelect` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDAlphaLevelSelect.cs` | Alpha 关卡选择场景，按枚举轮换官方关卡。 |
| `RDGameTransition` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDGameTransition.cs` | 关卡选择转场格子矩阵和从选中实体扩散的动画。 |
| `RDTransitionPiece` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDTransitionPiece.cs` | 单个转场格子的 tk2d sprite 序列播放。 |
| `RDLightStrip` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLightStrip.cs` | 竖向光条显示、定位和隐藏。 |
| `RDRotatingVoxel` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDRotatingVoxel.cs` | 旋转 voxel 视觉对象、模式切换和 kaleido camera 同步。 |
| `WallClock` | `RDFucked/Assets/Scripts/Assembly-CSharp/WallClock.cs` | 根据真实时间或手动秒数切换钟表指针 sprite。 |
| `SevSegLight` | `RDFucked/Assets/Scripts/Assembly-CSharp/SevSegLight.cs` | 七段灯字符显示。 |
| `SpotlightMesh` | `RDFucked/Assets/Scripts/Assembly-CSharp/SpotlightMesh.cs` | 启动时生成三角形聚光灯 mesh。 |
| `TimeDisplay` | `RDFucked/Assets/Scripts/Assembly-CSharp/TimeDisplay.cs` | UI 文本时间显示和冒号闪烁。 |
| `ShowOttoHeart` | `RDFucked/Assets/Scripts/Assembly-CSharp/ShowOttoHeart.cs` | 调用编辑器里的 Otto 心脏显示方法。 |
| `BarTransition` | `RDFucked/Assets/Scripts/Assembly-CSharp/BarTransition.cs` | 多条 UI bar 的横向展开与收起转场。 |
| `RainYScroll` | `RDFucked/Assets/Scripts/Assembly-CSharp/RainYScroll.cs` | 暴露滚动参数，`Update()` 当前为空。 |
| `SpaceShipTrail` | `RDFucked/Assets/Scripts/Assembly-CSharp/SpaceShipTrail.cs` | 空 `MonoBehaviour` 组件。 |
| `SparklineBalloons` | `RDFucked/Assets/Scripts/Assembly-CSharp/SparklineBalloons.cs` | 生成、移动、爆破和 stutter 控制气球。 |
| `scnLogo` | `RDFucked/Assets/Scripts/Assembly-CSharp/scnLogo.cs` | Logo 场景、首次设置、启动警告、协议参数和主菜单跳转。 |
| `scnSplash` | `RDFucked/Assets/Scripts/Assembly-CSharp/scnSplash.cs` | Splash logo 淡入淡出后进入 `scnLogo`。 |
| `WarningScene` | `RDFucked/Assets/Scripts/Assembly-CSharp/WarningScene.cs` | 警告场景剧情、音乐、Ink 对话和返回关卡选择。 |

## 主题环境组件

| 类型 | 继承 | 字段 | 方法行为 |
| --- | --- | --- | --- |
| `RDAbandonedWard` | `RDEnvironment` | `voidItems`、`light`、`foreground`、`elevator`、`door` | `SetElevatorOpened(open, speed)` 播放 `AbandonedWard_Elevator_Open` 或 `AbandonedWard_Elevator_Close`；`SetDoorOpened(open, speed)` 播放 `AbandonedWard_Door_Open` 或 `AbandonedWard_Door_Close`。 |
| `RDBoyWard` | `RDBase` | `windowGirl`、`windowGirlAnim` | `GirlRun()` 播放 `BoyWard_Girl_Run`，并用 DOTween 把 `windowGirl` 的本地 X 移到 `150f`，时长 `2f`，线性 easing。 |
| `SVTWard` | `RDEnvironment` | sprite、灯光、曲线、clock、windowMan、halloweenObjects | `SetNightMode(night)` 改变全组 sprite 和 clock tint；`halloweenMode` setter 按 `scnLevelSelect.instance != null` 决定对象是否显示，并更新灯光颜色；`Start()` 后循环淡出 `blueLights` 和 `vendingMachineLights`。 |
| `RDAirport` | `RDEnvironment` | `scrollingClouds`、`landingPlane` | `Start()` 后按数组反向顺序给云层创建 X 轴循环 tween，目标 X 为 `-600f`，时长随层级递增。 |
| `RDGarden` | `RDEnvironment` | `dayContainer`、`nightContainer` | `SetNightMode(nightMode)` 在 day 和 night 容器之间切换 active 状态。 |
| `RDMuseDash` | `RDEnvironment` | 无 | 类体为空，用作 Muse Dash 环境类型标记。 |
| `RDRecordsRoom` | `RDEnvironment` | `background`、`foreground` | 保存 Records Room 背景和前景 sprite 引用。 |

`SVTWard.AnimateSpriteAlpha()` 使用 DOTween 把 sprite 颜色 alpha 变到 `0f`，使用传入曲线并无限 restart 循环。`SetNightMode()` 中的夜间 tint 是 `(0.392, 0.392, 0.51, 1)`。

## Rooftop 与横向背景

| 类型 | 字段或属性 | 行为 |
| --- | --- | --- |
| `RDRooftop.RooftopMode` | `Regular`、`Summer`、`Autumn` | Rooftop 三种主题变体。 |
| `RDRooftop` | 三套 parent、sky、skyscrapers、roof，以及 `mode` 和 tween 字段 | `SetMode()` 开关三套 parent 后重置；`TweenSky()`、`TweenSkyscraper()`、`TweenRoof()` 先 kill 旧 tween，`dur != 0` 时用 DOTween，`dur == 0` 时直接设置本地 Y；`ModeFromTheme()` 把 `RDTheme.Rooftop`、`RooftopSummer`、`RooftopAutumn` 映射到对应 mode。 |
| `RDRooftopClouds` | `speed`、`width`、`startPosition`、`targetPosition` | `Start()` 从 `tk2dTiledSprite.dimensions.x` 取宽度，目标点为向左半个宽度；`Update()` MoveTowards 到目标点后回到起点。 |
| `RDRollerDisco` | `scrollSpeed`、`xOffset`、`bgContainer`、day/night 容器 | `UpdatePosition()` 每帧递减 `realX`，使用 `(realX + 489f - xOffset) % 1000f` 设置背景 X；`SetNightMode()` 切换昼夜容器。 |

## 转场与装饰组件

| 类型 | 字段 | 方法行为 |
| --- | --- | --- |
| `RDGameTransition` | `transitionPiecePrefab`、`transitionPieceArray`、`layerTimeDelay`、`pieceTransitionDuration`、`isReversed`、核心格子坐标、屏幕宽高、`transitionDuration` | `Start()` 根据父 Camera 正交尺寸和 aspect 创建 16 像素网格；`CalculateTransitionPieces()` 实例化缺失格子；`PlayTransition()` 以选中 `SelectableEntity` 在屏幕上的位置为核心格，逐圈调用 `RDTransitionPiece.AnimateLineal()`，并计算总转场时长。 |
| `RDTransitionPiece` | `sprite`、`sheetStartPos`、`sheetEndPos`、`animateLinealCoroutine` | `SetSpriteSheet()` 从当前 tk2d sprite 所在 sheet 找到连续 sprite 范围；`AnimateLineal()` 停掉旧协程后启动内部协程；内部协程按时长逐帧切换 sprite，可正放或反放。 |
| `RDLightStrip` | `LeftBar`、`RightBar` | `Show(x, sliceWidth)` 激活对象，移动自身 X，并把左右 bar 放在切片两侧；`Hide()` 禁用对象。 |
| `RDRotatingVoxel` | `speed`、`angle`、`voxelMode`、`room`、`kaleidoCam`、`bloomComp`、各模式对象和 pivot | `Update()` 同步背景色并按模式旋转 `pivot`、`zenPivot` 或 `baseballPivot`；`LateUpdate()` 把 kaleido camera enabled 状态同步到 room camera；`SetVoxelMode()` 重置旋转、切换对象 active、控制 bloom；`SetCubeMode()` 和 `SetFallingBaseballs()` 控制附加对象。 |
| `BarTransition` | `bars`、`ease`、`duration`、`delayPerBar` | `Show()` 从宽度 `0` 展开到 `352`；`Hide()` 从 `352` 收回到 `0`；最后一个 bar 可触发完成回调。 |
| `SparklineBalloons` | 生成参数、prefab、生成范围、方向点、容器、balloons 列表和 stutter 时间 | `Update()` 按 `spawnDelay` 生成气球；`SpawnBalloon()` 保证和上次生成点至少相距 `minSpawnDistance`，随机 prefab 和灰度，创建移动 tween；`PopBalloons(percentage)` 按比例播放 pop 动画；`Clear()` kill tween 并销毁所有气球；`SetStutterPoint()`、`Stutter()`、`Resume()` 调整已有 tween 进度。 |

`RDGameTransition.PlayTransition()` 中核心格坐标来自选中实体位置和 `scnLevelSelect.mainCamera` 的相对偏移。随后用逐圈扩张的方式处理四条边，`isReversed` 会反向调整每层 delay。

## 灯光、时钟和小型视觉件

| 类型 | 字段 | 方法行为 |
| --- | --- | --- |
| `WallClock` | 表盘、分针、时针、边框 renderer，指针 sprite 数组，`settingManually` | `Awake()` 记录初始颜色；`Update()` 在非手动模式下用当前真实时间调用 `SetTime()`；`SetTime(seconds)` 按分钟和 12 小时制选 sprite；`Tint(color)` 把初始颜色乘以 tint，并同步 frame。 |
| `SevSegLight` | `lights` 和静态 `charTo7Seg` 字典 | `SetLight(flags)` 按 bit 激活 7 个段；`ClearLight()` 全关；`SetLightWithChar(char)` 查字典，有映射就显示，没有就清空。 |
| `SpotlightMesh` | `radio`、`angle` | `Start()` 生成一个三角形 mesh，顶点是原点和正负角度两条边。 |
| `TimeDisplay` | `text`、`prevSecond` | `Awake()` 应用本地化字体；`Update()` 每秒刷新一次时间文本，用 `computer.timeAM/PM` 本地化模板，并在偶数秒把冒号变透明。 |
| `ShowOttoHeart` | 无公开数据 | `Show()` 调用 `scnEditor.instance.ShowOttoHeart()`。 |
| `RainYScroll` | `t0 = 198f`、`t1 = -150f`、`speed` | `Update()` 当前为空。 |
| `SpaceShipTrail` | 无 | 空 `MonoBehaviour` 组件。 |

`SevSegLight.charTo7Seg` 覆盖数字、部分大小写字母和若干符号。字典值是七段灯 bitmask，`SetLight()` 逐 bit 设置 `lights[0..6]`。

## 启动与警告场景

| 类型 | 继承 | 行为 |
| --- | --- | --- |
| `RDAlphaLevelSelect` | `MonoBehaviour` | `Start()` 把 `scnBase.currentLevelSelect` 设为 `scnAlphaLevelSelect`，遍历 `Level` 枚举，只保留名称以 `Level_` 开头的项，并同步 autoplay toggle；`GoToPreviousLevel()` 和 `GoToNextLevel()` 循环选择；`PlayLevel()` 保存 autoplay 设置后用 `scnBase.GoToLevelWithEnum()` 进入关卡。 |
| `scnLogo` | `scnBase` | `Awake()` 设置 `scnBase._instance`；`Start()` 根据校准状态和 force first time setup 显示首次设置菜单或播放初始旁白；必要时设置默认分辨率；没有启动警告时直接退出到主菜单或自定义关卡选择；`Update()` 在输入后播放按钮音效、淡黑并退出。 |
| `scnSplash` | `MonoBehaviour` | `Awake()` 初始化 logo 透明度；`Start()` 启动 `PlayLoading()`；协程等待、淡入 logo、等待启动完成或超时、淡出后进入 `scnLogo`。 |
| `WarningScene` | `RDBase` | `Start()` 恢复 `Time.timeScale = 1`；`Update()` 处理 Esc 回关卡选择、按键提示显示和首次启动协程；`PlaySequence()` 设置 BPM、播放教程音乐、淡入、运行 `diaWarning` 的 `Slam` 与 `Tap`，最后淡出并回到关卡选择。 |

`scnLogo.Exit()` 会先读取 `UrlProtocolHandler.GetArgument()`。如果有参数，它把参数放入 `scnCLS.urlProtocolArg` 并进入自定义关卡选择；否则进入主菜单。

## 关系入口

| 相关页面 | 关系 |
| --- | --- |
| [房间与 VFX 系统](/api/runtime/rooms-vfx.md) | `RDEnvironment`、`RDRoom`、主题切换和 VFX 控制的主干说明。 |
| [视觉与动画辅助类](/api/runtime/visual-animation-helpers.md) | DOTween、后处理、动画和视觉小组件的通用辅助页。 |
| [场景流程与暂停流程](/api/runtime/scene-flow.md) | `scnLogo`、`scnSplash`、`WarningScene` 和关卡选择跳转属于场景流程补充。 |
| [枚举与轻量模型补充](/api/data-models/enums-lightweight-models.md) | `RotatingVoxelMode`、`SelectableEntity` 等类型在本页组件中被使用。 |


