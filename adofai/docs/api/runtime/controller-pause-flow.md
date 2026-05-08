# 控制器状态、暂停与练习流程

## 基本信息

| 项 | 内容 |
| --- | --- |
| 主要源码 | `7thRhythmSource/ADOFAi/scrController.cs`、`7thRhythmSource/ADOFAi/States.cs`、`7thRhythmSource/ADOFAi/PauseMenu.cs`、`7thRhythmSource/ADOFAi/PracticeTimeline.cs` |
| 相关类型 | `scrController`、`States`、`PauseMenu`、`PracticeTimeline`、`scrMistakesManager`、`scrPlayer`、`scrPlanet` |
| 所属阶段 | 阶段 4：运行时游戏系统 |
| 主要职责 | 说明运行时控制器怎样进入关卡、切换状态、暂停/恢复、处理 checkpoint、练习模式、胜利和失败。 |

`scrController` 继承的状态系统使用 `States` 枚举驱动。暂停不在 `States` 中，而是由 `paused`、`audioPaused`、`Time.timeScale`、控制器 `enabled` 状态和 `PauseMenu` 一起控制。

## States 枚举

| 状态 | 含义 |
| --- | --- |
| `None` | 空状态。 |
| `Start` | 等待玩家开始、重绕歌曲和关卡。 |
| `Countdown` | 倒计时阶段，等待 conductor beat 达到调整后的倒计时 tick。 |
| `Checkpoint` | 从 checkpoint 进入时的淡入阶段。 |
| `PlayerControl` | 玩家控制阶段，普通输入判定主循环运行于此。 |
| `Fail` | 第一次失败状态，停止歌曲和 VFX，记录失败表现。 |
| `Fail2` | 失败结果状态，保存失败结果、显示提示，并等待输入重试。 |
| `Won` | 胜利后等待离开关卡或进入 portal 的状态。 |

`scrController.deathStates` 包含 `States.Fail` 和 `States.Fail2`。源码中的 `ChangeState` 调用集中在初始化、倒计时、checkpoint、胜利和失败流程。

## 控制器初始化

| 步骤 | 源码行为 |
| --- | --- |
| 玩家与场景准备 | `playerManager.Init()`，设置关卡名、世界名、boss 标记、背景、地板尺寸、虚拟形象和 pause menu。 |
| checkpoint 处理 | 校准返回时恢复 `GCS.savedCheckpointNum`；Unity 编辑器调试 checkpoint 可写入 `RDC.customCheckpointPos`；切换场景时重置 checkpoint。 |
| 存档进度 | 当 `saveProgressConditions` 为真且保存进度属于当前 level 时，调用 `scrMistakesManager.LoadCheckpointProgress()`。 |
| 状态系统 | 调用 `Initialize<States>()`，随后在准备结束处 `ChangeState(States.Start)`。 |
| UI 与输入 | 创建暂停菜单、错误表，设置 `paused = ADOBase.isLevelEditor`，并通过 `RDInput.SetMapping` 切换输入映射。 |
| 运行参数 | 初始化 `noFail`、`forceOK`、`curCountdown`、`multipress` 相关字段、视觉质量和音量状态。 |

`paused` 属性写入时会记录 `lastTogglePauseFrame`，切换 hit error meter 显隐，并根据当前场景把 Rewired 映射切到 `Pause`、`LevelSelect`、`CLS` 或 `Gameplay`。

## Start 与 rewind

| 方法 | 行为 |
| --- | --- |
| `Start_Rewind(int _currentSeqID = -1)` | 准备从当前 checkpoint 或指定地板开始。会处理 free roam 回退、安全地板检测、编辑器 DOTween 清理、玩家 rewind、歌曲调度、BPM 列表、快速按键推荐、星体角度初始化、命中文本容器和 checkpoint 进度回退。 |
| `OnMusicScheduled()` | 音乐调度完成后，根据 `GCS.checkpointNum`、旧 conductor 标记、gameworld 和 `forceNoCountdown` 决定进入 `Checkpoint`、`Countdown` 或 `PlayerControl`。 |

`Start_Rewind` 会在 `GCS.checkpointNum != 0` 时把歌曲音量设为 0，随后由 checkpoint 阶段淡入。对于 gameworld，源码会计算 floor entry time、angle length，并根据地板 speed 变化建立 `listBPM`。

## Countdown、Checkpoint 与 PlayerControl

| 状态方法 | 行为 |
| --- | --- |
| `Countdown_Update()` | 当 `ADOBase.conductor.beatNumber >= adjustedCountdownTicks`、非 gameworld 或 `forceNoCountdown` 时进入 `PlayerControl`；相机 follow mode 下跟随 chosen planet。 |
| `Checkpoint_Enter()` | 记录 `startTime = ADOBase.conductor.songposition_minusi`。 |
| `Checkpoint_Update()` | 非严格编辑模式时，用当前歌曲位置在 `startTime` 到 checkpoint floor `entryTimeAfterExtraBeats` 之间插值歌曲音量；到达目标时间后进入 `PlayerControl`；相机 follow mode 继续跟随 chosen planet。 |
| `Checkpoint_Exit()` | 关闭相机灰度效果，恢复歌曲音量为 `startVolume`。 |
| `PlayerControl_Enter()` | gameworld 中关闭灰度效果；如果 `scrVfxPlus` 存在，恢复 paused tweens 并清空列表。 |
| `PlayerControl_Update()` | 异步输入未启用时逐个玩家执行 `Simulated_PlayerControl_Update()`；更新平均帧时间；相机 follow moving platforms 时跟随 chosen planet；调用 `UpdateLockInput()` 和 `UpdateFreeroam()`。 |

异步输入启用时，玩家更新不在 `PlayerControl_Update` 中直接执行，而是由 [运行时输入与判定](/api/runtime/input-judgement.md) 说明的 `scrController.UpdateInput()` 按 SkyHook tick 调用。

## 暂停流程

| 方法/属性 | 行为 |
| --- | --- |
| `TogglePauseGame()` | 切换暂停状态；阻止刚进自定义关卡、关卡仍加载、转场面板激活等时机；Web 或 booth 禁用相关按钮时转为回主菜单。 |
| `paused` | 写入时切换 hit error meter、记录帧号并设置输入映射。 |
| `audioPaused` | 直接读写 `AudioListener.pause`。 |
| `PauseMenu.Show()` | 截取并模糊背景，播放暂停音效，显示主菜单或指定子菜单。 |
| `PauseMenu.Unpause()` | 先调用 `practiceTimeline.SetPositions()`；如果 `requireRestart` 为真则重启，否则调用 `wrldGame.TogglePauseGame()`。 |
| `OnApplicationPauseCallback(bool pauseStatus)` | 应用暂停回调中可触发 `TogglePauseGame()`。 |

`TogglePauseGame` 暂停时会设置 `audioPaused = true`、`base.enabled = false`、`Time.timeScale = 0`，并显示暂停菜单；恢复时检查音频输出变化、隐藏暂停菜单、恢复视频背景播放。视频背景由 `scrVfxPlus.instance.videoBG` 控制。

## 练习模式

| 方法/类 | 行为 |
| --- | --- |
| `SetPracticeMode(bool practice)` | 开启时根据当前 `currentSeqID` 取前 2.5 秒到后 10 秒的 floor 范围，写入 `GCS.checkpointNum` 和 `GCS.practiceLength`，保存进入前 checkpoint 和 speed trial 状态，把当前 speed trial 设置为 0.9；关闭时恢复进入前 checkpoint 和 speed trial 设置。 |
| `PracticeTimeline.Init()` | 仅在 gameworld 或 free roam 且 `GCS.practiceMode` 为真时显示；读取 `ADOBase.lm.listFloors` entry time，设置起止地板、速度、spoiler 边界，并生成难度波形。 |
| `PracticeTimeline.SetPositions()` | 将 practice start/end 修正到非 midspin/free roam 边界，并写回 `GCS.checkpointNum`、`GCS.practiceLength`、`GCS.nextSpeedRun` 和 `GCS.currentSpeedTrial`。 |
| `PracticeTimeline.ChangeSpeed(bool increase)` | Shift 按住时步长 1，否则步长 5；范围由 `UpdateSpeed()` 限制到 20 到 1000。 |

暂停菜单中的 Practice 按钮会调用 `controller.SetPracticeMode(!GCS.practiceMode)`。如果当前已经是练习模式，按钮文本会改为 `pauseMenu.endPractice`。

## 胜利与失败

| 方法 | 行为 |
| --- | --- |
| `Won_Enter()` | 非 gameworld 且当前地板不是 free roam generated 时调用 `PortalTravelAction(portalDestination)`。 |
| `Won_Update()` | 非编辑器中，胜利 1 秒后如果有有效输入且 `canExitLevel` 为真，则执行 portal travel。 |
| `OnPlayerDied(scrPlayer deadPlayer, ...)` | 检查是否还有活着且不在复活倒计时的玩家；若没有，结束复活倒计时玩家并调用 `FailAction`。 |
| `FailAction(...)` | 保存 checkpoint 进度失败，切换 `States.Fail`，禁用 `scrVfxPlus`、暂停视频背景、停止歌曲和所有声音，显示 overload 或失败提示，触发 conditional loss effects，并统计 checkpoint 使用。 |
| `Fail2Action()` | 只在 `States.Fail` 中继续；切换 `States.Fail2`，计算总准确率，保存官方 boss 或 CLS 失败结果，更新百分比显示、死亡次数和提示文本。 |
| `Fail2_Update()` | 失败结果状态下，玩家有效输入会重置自定义关卡或重启官方关卡。 |

失败流程分两段的意义是：`FailAction` 处理即时停止和视觉音频状态，`Fail2Action` 处理结果保存、百分比、提示文本和等待重试。

## 相关页面

- [scrController](/api/core/scrController.md)
- [运行时控制器状态机](/modules/runtime-controller.md)
- [控制器、暂停与练习流程](/modules/runtime-controller-pause.md)
- [运行时输入与判定](/api/runtime/input-judgement.md)
