# 高风险系统索引

本页把跨模块影响最大的系统集中成一个阅读入口。这里的“高风险”指源码阅读、改动或调用时会牵动多个管理器、场景状态、数据模型和 Unity 生命周期；本页不讲解外部修改工具链，只回链到已经整理过的源码页面。

## 总览

| 系统 | 主要类型 | 高风险原因 | 详情页 |
| --- | --- | --- | --- |
| 输入与玩家动作 | `RDInput`、`RDInputType`、`RDInputCaller`、`scrPlayerbox` | 输入状态按帧聚合，P1/P2、模拟按键、触摸、手柄和窗口键盘输入共用同一组静态字段 | [输入系统](/api/runtime/input-system.md)、[节拍与判定](/api/runtime/beats-judgement.md) |
| Beat 与判定 | `Beat`、`BeatClassic`、`BeatOneshot`、`scrPlayerbox`、`HitStripManager` | 判定结果同时影响命中统计、错误权重、角色表现、标签事件、hold 释放和结算 | [节拍与判定](/api/runtime/beats-judgement.md)、[scnGame](/api/core/scnGame.md) |
| 音频与时间轴 | `scrConductor`、`AudioManager`、`SoundData`、`RDGameSounds` | 音频调度依赖 DSP 时间、BPM、offset、外部音频缓存和 mixer group | [音频运行时](/api/runtime/audio-runtime.md)、[scrConductor](/api/core/scrConductor.md) |
| 窗口舞蹈 | `WindowChoreographer`、`WindowDancer`、`Window`、`scnGame` | 真实窗口、虚拟窗口、render texture、输入捕获、暂停和失败清理绑定在同一流程里 | [窗口系统](/api/runtime/windows.md)、[窗口控制事件](/api/editor-events/WindowControlEvents.md) |
| 场景流程、暂停与结算 | `scnGame`、`PauseMenu`、`PauseMenuMode`、`Rankscreen` | `Time.timeScale`、`RDTime.speed`、音频暂停、窗口状态、重开、退出、失败和 rank 保存共用场景状态 | [场景流程与暂停流程](/api/runtime/scene-flow.md)、[scnGame](/api/core/scnGame.md) |
| 事件运行路径与 Scrub | `LevelEvent_Base`、`LevelBase`、`scrExecuteOnCertainBeat` | 事件执行有 OnPrebar、OnBar、标签、条件和 scrub 追赶路径，同一事件会影响编辑器预览和正式运行 | [事件运行路径](/api/editor-events/runtime-flow.md)、[LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) |
| 编辑器保存与关卡数据 | `scnEditor`、`RDLevelData`、`RDLevelSettings`、`LevelState` | `.rdlevel` 文本、事件控件、Inspector、撤销重做和预览场景围绕同一份数据互相同步 | [scnEditor](/api/core/scnEditor.md)、[关卡数据模型](/api/data-models/level-data.md) |
| 存档、关卡选择与校验 | `Persistence`、`CustomLevelData`、`LevelValidation`、`Rankscreen` | 内部关卡 rank、自定义关卡 hash、设置校验、错误列表和结算保存存在多条入口 | [自定义关卡与错误模型](/api/data-models/custom-levels-errors.md)、[场景流程与暂停流程](/api/runtime/scene-flow.md) |

## 输入与玩家动作

`scnBase.Update()` 每帧调用 `RDInput.Update()`，`RDInputCaller.LateUpdate()` 在帧末推进模拟按键。`RDInput` 把 P1、P2、默认键盘、手柄、触摸、自定义按钮和真实自定义窗口键盘事件聚合成静态字段，运行时系统直接读取这些字段。

| 关注点 | 源码行为 |
| --- | --- |
| 按下、保持、释放 | `p1Press` / `p2Press`、`p1IsPressed` / `p2IsPressed`、`p1Release` / `p2Release` 分别表示当前帧按下、当前帧保持和当前帧释放。 |
| 任意玩家输入 | `anyPlayerPress`、`anyPlayerIsPressed`、`anyPlayerRelease` 合并 P1 和 P2 主输入。 |
| 系统动作 | `skipPressed`、`restartPressed`、`quitPressed`、`cancelPress`、方向键和选择动作在 `GetState()` 中遍历 `allInputs` 聚合。 |
| 模拟按键 | `PlayerEmuState` 用 `preCache`、`status` 和 `lastFrameUpdated` 在帧边界转换 `Down`、`IsDown`、`Up`、`IsUp`。 |
| `tapsOnly` | `scnGame.tapsOnly` 开启时，按下和释放都会触发短按状态，并用 `p1HoldTime` / `p2HoldTime` 保持 `0.25` 秒。 |
| 玩家交换 | `SwapP1AndP2Controls()` 交换 P1/P2 后端 scheme、音频声像、玩家显示和持久化设置。 |
| 窗口输入 | 真实自定义窗口的键盘事件由 `CustomWindow.UpdateWindowInputs()` 收集，再被 `RDInput.CheckForStateInKey()` 合并。 |

阅读或改动输入相关代码时，先确认读取的是按下、保持还是释放；再确认当前场景是否为编辑器、游戏、暂停菜单或窗口舞蹈状态。

## Beat 与判定

编辑器节拍事件创建 `BeatClassic` 或 `BeatOneshot`，运行时由 `scrPlayerbox.SpaceBarEvent()` 处理玩家按下，`Beat.Update()` 处理漏拍。命中结果会写入 `scnGame` 的 offset 统计，并回调 `LevelBase` 和标签事件。

| 关注点 | 源码行为 |
| --- | --- |
| 命中窗口 | `scrPlayerbox.HitCheckBeat()` 对普通 beat、bomb beat、宽松判定和玩家驱动第 7 拍使用不同条件。 |
| 智能判定 | `noSmartJudgment` 关闭时，按下判定会检查后续更接近输入时间的 beat。 |
| 结果映射 | `OffsetType.Perfect` 对应 `HitType.Hit`；轻微提前或滞后对应 `JustMiss`；严重提前、严重滞后和 bomb 失败对应 `BigMiss`。 |
| 完全漏拍 | `Beat.Update()` 在超过输入时间后处理 `OffsetType.Missed`、错误反馈、标签和关卡回调。 |
| 错误权重 | `Beat.RefreshMistakeWeight()` 把关卡 `mistakeWeight` 与行 `mistakeWeight` 相乘写入 `weight`。 |
| Hold 释放 | `SpaceBarReleased()` 独立计算 release offset，并运行 hold release 标签和 `LevelBase.OnHit()`。 |
| 标签事件 | `[onHit]`、`[onMiss]`、`[onHeldPressHit]`、`[onHeldReleaseMiss]` 等标签由判定路径触发。 |

判定链路与音频校准、行归属、错误权重、标签和 hold 状态绑定，单独阅读 `Beat` 时要同时回看 `scrPlayerbox` 和 `scnGame`。

## 音频与时间轴

`scrConductor` 负责把关卡节拍换算成 Unity DSP 调度时间；`AudioManager` 创建和缓存 `AudioSource` / `AudioClip`；`SoundData` 与 `SoundDataStruct` 把事件字段转成运行时音频数据。

| 关注点 | 源码行为 |
| --- | --- |
| 歌曲播放 | `PlaySong()` 设置 `currentSongString`、loop destination、song header、prebar、`startOfSong` 和 `startOfNextBar`。 |
| Beat sound | `PlayBeat()` 按 `startOfNextBar + timeFSAB - offset` 调度音源，并受 `RDBase.debugSettings.BeatSounds` 控制。 |
| 即时音频 | `PlayImmediately()` 用于预览、反馈和非 beat 调度路径。 |
| 外部音频 | 外部 clip 使用 `filename + "*external"` 作为 key，`SoundData.Prepare()` 写入 `preparedAudioClips` 和 `externalSoundData`。 |
| 游戏音效 | `RDGameSounds.Set()` 修改后续通过 `GameSoundType` 播放的 clap、mistake、heart explosion、hold、freeze、burn 等声音。 |
| 清理 | `AudioManager.StopAllSounds()` 清 live source，`FlushData()` 清音频缓存、MP3 stream 和子音源。 |

音频问题通常需要同时检查事件 `Prepare()`、`SoundData.Prepare()`、`scrConductor` 调度和 `AudioManager` 缓存状态。

## 窗口舞蹈

`scnGame` 根据 `RDC.windowDance`、`RDLevelData.current.usesWindowDance` 和 `windowCount` 创建窗口编舞器。`WindowMovement.Simulate` 使用 `VirtualWindowChoreographer`，其他窗口舞蹈模式使用真实窗口编舞器。

| 关注点 | 源码行为 |
| --- | --- |
| 编舞器状态 | `WindowChoreographer.state` 在 `Setup`、`Preparing`、`Ready` 之间切换，`setup` 表示初始化完成。 |
| dancer | `WindowDancer` 持有 preset、位置、振幅、pivot、scale、time shift、visible 和绑定窗口。 |
| 真实窗口 | `RealWindowChoreographer` 使用 MultiWindow，处理 fullscreen、z order、焦点和 custom window 输入。 |
| 虚拟窗口 | `VirtualWindowChoreographer` 使用 `SimulateWDController`、`VirtualWindowView`、RawImage 和 render texture。 |
| 渲染链路 | `TopCamera`、`RoomCamera`、`WindowCamera` 和 `BlitterCamera` 把 top 或 room 内容写入窗口 render texture。 |
| 暂停和失败 | `OnPauseChanged()` 分发暂停状态；`scnGame.FailLevel()` 按关卡设置调用 `windowChoreographer.Cancel()`。 |

窗口系统同时碰到平台窗口、Unity UI、相机 blit、输入捕获和场景流程，是阶段 7 复核时需要优先回读的系统。

## 场景流程、暂停与结算

`scnGame` 负责从关卡文本加载到结算退出的主流程。`PauseMenu` 和 `PauseMenuMode` 只负责暂停菜单 UI 与按钮动作分发，真正的时间、音频、窗口和场景状态仍由 `scnGame` 切换。

| 关注点 | 源码行为 |
| --- | --- |
| 加载 | `Start()` 确定关卡来源、创建 `LevelBase`、行、房间、窗口舞蹈和 top render texture，再启动 `LoadingRoutine()`。 |
| 开始 | `StartTheGame()` 设置速度、状态、手部显示、窗口舞蹈、自定义开始提示和 prebar 回调。 |
| 暂停 | `TogglePauseGame()` 同步 `paused`、`base.audioPaused`、`Time.timeScale`、暂停菜单、相机和窗口舞蹈。 |
| 重开 | `Restart()` 清行、关闭 blades，并通过 `RestartTimer()` 重载 `scnGame`。checkpoint 重开依赖 `lastBarDiedAt` 和 `barToScrubTo`。 |
| 失败 | `FailLevel()` 清执行器、音量 tracker、窗口舞蹈、VFX、beat、歌曲和关卡回调，再进入失败演出。 |
| 胜利 | `WinLevel()` 对教程、cutscene、intro 走跳过路径；常规关卡进入 `Rankscreen.AdvanceGameover()`。 |
| 退出 | `QuitTimer()` 恢复 `Time.timeScale`、`RDTime.speed` 和 `LevelMasterVolume`，停止声音后回到关卡选择或主菜单。 |

暂停、重开、失败和退出都会改动时间缩放、音频、窗口和全局状态，阅读任一分支时都要检查对应恢复路径。

## 事件运行路径与 Scrub

`LevelEvent_Base` 是事件公共基类，`LevelBase` 负责把事件按执行时机分发，`scrExecuteOnCertainBeat` 负责按音频或视觉时间执行延迟动作。编辑器预览 scrub 会复用同一套执行器。

| 关注点 | 源码行为 |
| --- | --- |
| 准备阶段 | `LevelEvent_Base.Prepare()` 默认设置 `prepared = true`；子类在这里预载音频、资源、动画或缓存对象。 |
| OnPrebar | `LevelBase` 直接调用 `RunPrebar()`，用于小节前准备事件。 |
| OnBar | `LevelBase` 调用 `scrExecuteOnCertainBeat.Add()` 创建执行器，到点后运行事件动作。 |
| 标签 | 标签路径先调用 `TaggedActionVariant()`，再按事件逻辑运行。 |
| 条件 | 本地条件、全局条件和 timed conditionals 会影响动作是否执行以及持续时间。 |
| Scrub | `MoveBackBy()` 会回退剩余执行器和 DOTween 动画；到点的执行器会在回退过程中运行。 |

事件页面要同时看数据字段、Inspector 写入、`Prepare()`、`Run()` 和标签变体，避免只按编辑器字段理解运行时行为。

## 编辑器保存与关卡数据

`scnEditor` 是内置关卡编辑器场景入口。它集中管理 `.rdlevel` 文本、事件控件、Inspector、预览场景、撤销重做、行、精灵、条件和文件路径。

| 关注点 | 源码行为 |
| --- | --- |
| 文本入口 | `rdlevelText` 保存当前关卡文本，`openedFilePath` 保存当前打开路径。 |
| 解析 | `DecodeData()` 把文本解析成关卡数据、事件、控件、行、精灵和编辑器状态。 |
| 保存 | `SaveFile()`、`ForceSave()`、`SaveFileAs()` 围绕当前关卡数据和路径写回 `.rdlevel`。 |
| 撤销重做 | `LevelState` 保存关卡文本、选中 ID、标签页、行或精灵选中项和时间线滚动位置。 |
| Inspector | `InspectorPanel` 和各类 `InspectorPanel_*` 把控件值写回 `LevelEvent_Base` 派生对象。 |
| 预览 | `scnEditor.gameInstance` 保存编辑器预览用的 `scnGame` 实例。 |

编辑器保存链路的核心是文本、数据对象和控件之间的同步。阶段 7 复核时需要对照 `scnEditor`、`RDLevelData`、`BasePropertyInfo` 和 Inspector 页面。

## 存档、关卡选择与校验

存档和关卡选择横跨关卡数据模型、运行时结算和错误校验。内部关卡与外部关卡的保存路径不同，自定义关卡还依赖文件路径、hash、设置解析和错误列表。

| 关注点 | 源码行为 |
| --- | --- |
| 内部关卡 rank | `Rankscreen.ShowAndSaveRank()` 对内部关卡调用 `Persistence.SetLevelRank()`、`SetLastPlayedLevel()` 和 Boss 关卡保存分支。 |
| 外部关卡 rank | 自定义关卡按关卡 hash 和 `levelSpeed` 保存 rank。 |
| 自定义关卡数据 | `CustomLevelData` 保存路径、hash、设置、错误状态和选择界面所需信息。 |
| 设置校验 | `LevelValidation` 和相关错误模型把关卡设置、音频、事件和文件问题整理成错误项。 |
| 关卡来源 | `LevelSource` 区分外部路径、内部路径和 cutscene 路径，`scnGame.Start()` 按来源读取文本或实例化关卡类。 |

这一组系统用于阶段 7 检查数据模型页面、运行时结算页面和关卡选择相关源码是否已经互相回链。

## 阶段 7 回读顺序

| 顺序 | 回读页面 | 复核目标 |
| --- | --- | --- |
| 1 | [未分类源码覆盖清单](/modding/source-coverage.md) | 从 347 个未命中文件开始拆分阶段 7 补文档队列。 |
| 2 | [运行时系统总览](/api/runtime/overview.md) | 检查运行时系统之间的交叉链接是否完整。 |
| 3 | [编辑器事件系统](/modules/editor-events.md) | 检查事件分组、Inspector、控件和运行路径是否互相连通。 |
| 4 | [数据模型与枚举](/modules/data-models.md) | 检查 `.rdlevel`、settings、条件、音频和枚举页面是否覆盖源码模型。 |
| 5 | [官方关卡覆盖清单](/api/levels/coverage.md) | 对 75 个 `Level_*.cs` 文件做页面归属复核。 |
| 6 | [源码 API 索引](/api/index.md) | 检查侧边栏、API 索引和模块页链接是否一致。 |



