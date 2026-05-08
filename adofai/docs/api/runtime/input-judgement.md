# 运行时输入与判定

## 基本信息

| 项 | 内容 |
| --- | --- |
| 主要源码 | `RDInput.cs`、`RDInputType.cs`、`RDInputType_Keyboard.cs`、`RDInputType_AsyncKeyboard.cs`、`AsyncInputManager.cs`、`AsyncInput.cs`、`AsyncInputUtils.cs`、`scrController.cs`、`scrPlayer.cs`、`scrPlanet.cs`、`scrMisc.cs` |
| 相关枚举 | `InputAction`、`HitMargin`、`HitMarginGeneral`、`HitMarginLimit` |
| 所属阶段 | 阶段 4：运行时游戏系统 |
| 主要职责 | 说明运行时按键怎样被采集、聚合、按状态查询，并怎样进入玩家更新、地板命中和判定等级计算。 |

ADOFAI 的运行时输入并不是只读 Unity `Input`。普通输入路径通过 `RDInputType_Keyboard`、`RDInputType_Mouse`、`RDInputType_Joystick` 和 Rewired 聚合；开启异步输入时，`AsyncInputManager` 使用 SkyHook 接收键盘事件，`scrController.UpdateInput` 按事件 tick 逐批处理，最后调用玩家和星体的命中逻辑。

## 输入动作枚举

| 枚举值 | 用途 |
| --- | --- |
| `Main` | 主命中输入，`RDInput.GetMain` 会从所有活动输入设备累计数量。 |
| `Skip` | 跳过相关输入。 |
| `Cancel` | 取消输入，键盘实现中对应 Escape。 |
| `Quit` | 退出输入，键盘实现中对应 Q。 |
| `Restart` | 重开输入，键盘实现中对应 R。 |
| `Left` / `Right` / `Up` / `Down` | 方向输入。 |
| `LeftAlt` / `RightAlt` / `UpAlt` / `DownAlt` | 替代方向输入。 |
| `Action1` / `Action2` | 左半键盘和右半键盘动作区。 |
| `Confirm` | 确认输入，键盘实现中包括 Space、Return、KeypadEnter。 |
| `Back` | 返回输入，键盘实现中通常使用 Escape。 |
| `FaceUp` / `FaceLeft` | 面键输入，键盘实现中分别对应 S、A。 |

`RDInputType.Get(InputAction action, ButtonState state)` 使用 switch 把 `InputAction` 分发到具体抽象方法。`Main` 不走 `Get`，而是由每个输入类型的 `Main(ButtonState state)` 单独返回数量。

## RDInput 聚合层

| 成员 | 行为 |
| --- | --- |
| `inputs` | 保存所有输入类型实例。 |
| `joystickInput` / `keyboardInput` / `mouseInput` / `asyncKeyboardMouseInput` | 当前主摇杆、键盘、鼠标和异步键盘输入对象。 |
| `Setup(InputManager rewiredManager = null)` | 只执行一次初始化；创建鼠标、键盘、异步键盘、0 号摇杆输入，并按 Rewired player 数追加其它摇杆输入。 |
| `SetMapping(string mapName)` | 转发给 `joystickInput.SetMapping(mapName)`。 |
| `Reinitialize()` | 清除初始化标记并重新 `Setup()`。 |
| `GetState(InputAction inputAction, ButtonState state = ButtonState.WentDown)` | 遍历 `inputs`，只要任意活动输入类型返回真就返回真。 |
| `GetMain(ButtonState state = ButtonState.WentDown)` | 遍历活动输入类型，累计每个输入类型的 `Main(state)` 数量。 |
| `GetStateKeys(ButtonState state = ButtonState.WentDown)` | 先调用 `GetMain(state)` 更新缓存，再从活动输入类型的按下、按住、抬起或未按缓存里收集 `AnyKeyCode`。 |
| `GetPosition()` | 累加所有活动输入类型的方向向量，并限制长度不超过 1。 |
| `mouseScrollDelta` | 鼠标在窗口范围内才返回 `Input.mouseScrollDelta`，否则返回零向量。 |
| `useKeyLimiter` | 只在 `scrController.instance.gameworld` 且暂停菜单未启用时为真。 |

`RDInput` 还提供 `mainPress`、`mainHeld`、`restartPress`、`cancelPress`、`leftPress`、`rightPress`、`action1Press` 等静态属性。这些属性都是 `GetState` 或 `GetMain` 的薄封装，用于控制器、菜单和编辑器代码直接读取当前帧输入。

## RDInputType 基类

| 成员 | 行为 |
| --- | --- |
| `MainStateCount` | 保存某个状态在当前帧统计到的 `AnyKeyCode` 列表和 `lastFrameUpdated`。 |
| `pressCount` / `heldCount` / `releaseCount` / `isReleaseCount` | 分别对应按下、按住、抬起、未按状态的缓存。 |
| `isActive` | 控制该输入类型是否参与查询。 |
| `Position()` | 默认根据方向键是否按住生成方向向量。 |
| `GetStateCount(ButtonState state)` | 根据状态返回对应缓存；输入未激活时返回 `dummyCount`。 |
| `Get(InputAction action, ButtonState state = ButtonState.WentDown)` | 把动作枚举分发到 `Cancel`、`Back`、`Quit`、方向、动作键、确认键和面键。 |

所有具体输入类型都必须实现 `Main`、`Restart`、`Cancel`、`Back`、`Quit`、方向键、动作键、确认键和面键查询。

## 键盘输入

| 成员 | 行为 |
| --- | --- |
| `RDInputType_Keyboard(int schemeIndex)` | 构造主键列表，遍历 `KeyCode` 0 到 329，排除部分鼠标按钮区间。 |
| `CheckKeyState(KeyCode key, ButtonState state)` | 根据 `WentDown`、`WentUp`、`IsDown`、`IsUp` 调用 Unity `Input`。 |
| `Main(ButtonState state)` | 输入未激活时返回 0，否则调用 `MainIgnoreActive`。 |
| `MainIgnoreActive(ButtonState state)` | 按帧缓存主键数量；`WentDown` 状态会移除特殊输入；启用 key limiter 时只保留 `Persistence.keyLimiterKeys.unityKeysCache` 中允许的键。 |
| `CountSpecialInput()` | 收集 Escape、系统键、虚拟形象数字键、暂停状态按键、难度选择方向键、关卡选择键、CLS 键等不应计为主命中的特殊输入。 |
| `Action1` | 检查 `LeftKeys`，也就是键盘左半区。 |
| `Action2` | 检查 `RightKeys`，也就是键盘右半区。 |
| `Confirm` | 检查 Space、Return、KeypadEnter。 |

普通键盘路径使用 Unity 输入系统按帧读取，所以它无法像异步输入那样按硬件事件 tick 逐批推进玩家状态。

## 异步输入

| 类型 | 行为 |
| --- | --- |
| `AsyncInputManager` | 创建并管理 SkyHook 钩子、事件队列、当前按键集合、按下集合、抬起集合和 frame-dependent 集合。 |
| `AsyncInput` | 对 `AsyncInputManager` 的键集合提供 `GetKey`、`GetKeyDown`、`GetKeyUp` 查询。 |
| `RDInputType_AsyncKeyboard` | 把 SkyHook `KeyLabel` 映射到 ADOFAI 的 `InputAction` 查询，并实现异步版本的 `Main`。 |
| `AsyncInputUtils` | 根据 tick 计算歌曲位置和星体角度，并在异步输入处理时刷新角度。 |

### AsyncInputManager

| 成员 | 行为 |
| --- | --- |
| `keyQueue` | SkyHook 事件进入的并发队列。 |
| `keyMask` / `keyDownMask` / `keyUpMask` | 当前按住、当前事件批次按下、当前事件批次抬起的键集合。 |
| `frameDependentKeyMask` / `frameDependentKeyDownMask` / `frameDependentKeyUpMask` | frame-dependent 查询使用的键集合。 |
| `isActive` | 读取 `SkyHookManager.Instance.isHookActive`；缺少 native DLL 时只记录一次警告并返回 `false`。 |
| `ToggleHook(bool active)` | 根据目标状态启动或停止 SkyHook，并启用或禁用管理器组件。 |
| `ClearKeys()` | 清空当前键集合和事件队列。 |
| `Setup()` | `RuntimeInitializeOnLoadMethod`；订阅 `SkyHookManager.KeyUpdated`，非鼠标键进入 `keyQueue`，创建常驻 `Async Input Manager` 对象并默认禁用。 |
| `Update()` | 根据设置、hook 状态、`scrController` 状态切换普通键盘和异步键盘是否激活；只有 PlayerControl 状态会启用异步键盘。 |
| `OnDisable()` | 恢复普通键盘激活，禁用异步键盘。 |

异步输入只在 `Persistence.GetChosenAsynchronousInput()` 为真、SkyHook active、存在 `scrController.instance`，且控制器状态为 `States.PlayerControl` 时接管键盘输入。离开 PlayerControl 时会清空异步按键集合。

### RDInputType_AsyncKeyboard

| 成员 | 行为 |
| --- | --- |
| 构造函数 | 默认 `_isActive = false`，订阅场景加载事件，并启动警告递减协程。 |
| `Main(ButtonState state)` | 根据状态选择 `AsyncInputManager` 的 held、up、down 集合或反向全集；`WentDown` 状态会移除特殊输入；启用 key limiter 时只保留允许的异步键。 |
| `GetSpecialInput()` | 移除 Escape、系统键、暂停状态键、难度 UI 键、关卡选择键、CLS 键和部分鼠标键。 |
| `IncrementDefuncWarn()` | 异步输入长时间不正常时递增警告计数，指定场景中达到 5 次会禁用异步输入。 |
| `DisableAsyncInput()` | 显示错误画布，关闭 hook，关闭异步输入设置并保存偏好。 |

### AsyncInputUtils

| 方法 | 行为 |
| --- | --- |
| `GetSongPosition(scrConductor conductor, ulong nowTick)` | 使用 tick、`dspTimeSong`、校准值、歌曲 pitch 和 offset 计算歌曲位置；旧 conductor 或 WebGL 路径使用 `conductor.song.time`。 |
| `GetAngle(scrPlanet planet, double snappedLastAngle, ulong nowTick)` | 根据歌曲位置、`player.lastHit`、`crotchetAtStart`、星体速度和方向计算角度。 |
| `AdjustAngle(scrPlayer player, ulong targetTick)` | 异步输入启用且 offset 已更新时，根据目标 tick 更新 `targetSongTick`，并刷新 chosen planet 角度。 |
| `WhileFloorNotChange(scrPlayer player, Action action)` | 在玩家当前地板没有变化前重复执行动作，用于一次输入事件内可能连续推进地板的流程。 |

## scrController 输入处理

| 方法 | 行为 |
| --- | --- |
| `UnlockInput()` | 设置 `lockInput = 0`，`responsive = true`。 |
| `LockInput(float fSecs)` | 当秒数大于 0 时设置输入锁定时间，并让 `responsive = false`。 |
| `UpdateLockInput()` | 用 `Time.deltaTime * ADOBase.conductor.song.pitch` 递减 `lockInput`，归零后恢复 `responsive`。 |
| `UpdateInput()` | 只在异步键盘激活时处理；清理按下/抬起集合，读取 `AsyncInputManager.keyQueue`，按事件 tick 排序并分批调用 `ProcessKeyInputs`。 |
| `ProcessKeyInputs(ulong eventTick)` | 暂停时返回；根据事件 tick 或当前帧 tick，让所有玩家执行 `Simulated_PlayerControl_Update(num)`；最后写入 `AsyncInputManager.lastReportedTargetTick`。 |

`UpdateInput()` 会把同一 tick 的 SkyHook 事件放进同一批次。遇到新 tick 时，先处理上一批按键，再清空 `keyDownMask` 和 `keyUpMask`。这保证玩家判定可以按事件时间推进，而不是只按 Unity 当前帧推进。

## scrPlayer 玩家更新

| 方法 | 行为 |
| --- | --- |
| `Simulated_PlayerControl_Update(ulong? targetTick = null)` | 玩家死亡、暂停、没有当前地板或处于 cutscene 时返回；计算下一块是否 hold；按顺序处理 post-hold fail、自动/hold 命中、hold 行为、pre-hold fail、按键释放事件和相机目标变化。 |
| `HitAutoFloors(ulong? targetTick = null)` | 有有效输入触发时统计有效按键数量，把每个按键时间加入 `keyTimes`；单键输入会清空连续多押计数。 |
| `UpdateHoldBehavior(ulong? targetTick = null)` | 处理 hold 释放、strict hold、非 gameworld hold、hold 未达标死亡和 hold 完成后命中。 |
| `UpdateHoldKeys(ulong? targetTick = null)` | 根据 `keyTimes` 消耗输入；满足条件时调用 `Hit()`，并在 hold 地板上记录当前按住键。 |
| `HitInputEvent(bool isAuto = false, InputEventState state = InputEventState.Down)` | 触发 `ffxSetInputEventPlus` 中对应输入状态和按键方向的效果；当效果设置 `ignoreInput` 时会增加忽略计数。 |
| `Hit(bool isAuto = false)` | 检查控制器是否 responsive、编辑器暂停状态和输入事件；切换 chosen planet，更新误差表、相机 pulse、hold 和地板推进。 |

`Simulated_PlayerControl_Update` 多次使用 `AsyncInputUtils.WhileFloorNotChange` 包裹子流程。这样一次输入或自动命中如果改变了当前地板，会重新进入对应检查，避免在旧地板状态上继续执行后续逻辑。

## scrPlanet 判定与移动

| 方法 | 行为 |
| --- | --- |
| `SwitchChosen()` | 根据当前星体角度、目标 exit angle、方向、BPM、速度、歌曲 pitch 和 margin scale 调用 `scrMisc.GetHitMargin`；有效命中时选择下一地板，不命中时走伤害和失败文本；命中后处理多押、key limiter、multitap、conditional effects、命中文本，并调用 `MoveToNextFloor`。 |
| `MoveToNextFloor(scrFloor floor, float exitAngle, HitMargin hitMargin)` | 把星体移动到目标地板，更新 hold、位置、角度和地板状态。 |

`SwitchChosen` 在 gameworld 和 free roam 下有两套目标地板选择逻辑。gameworld 中目标通常是 `currfloor.nextfloor`；free roam 中会按角度方向查找可落脚地板，并处理 unstable 地板的隐藏和淡出。

## HitMargin 计算

| 枚举 | 值 |
| --- | --- |
| `HitMargin` | `TooEarly`、`VeryEarly`、`EarlyPerfect`、`Perfect`、`LatePerfect`、`VeryLate`、`TooLate`、`Multipress`、`FailMiss`、`FailOverload`、`Auto`、`OverPress` |
| `HitMarginGeneral` | `Counted`、`Perfect`、`Pure` |
| `HitMarginLimit` | `None`、`PerfectsOnly`、`PurePerfectOnly` |

| 方法 | 行为 |
| --- | --- |
| `scrMisc.GetAdjustedAngleBoundaryInDeg(HitMarginGeneral marginType, double bpmTimesSpeed, double conductorPitch, double marginMult = 1.0)` | 按难度、移动端、当前 speed trial、BPM、歌曲 pitch 和 margin 倍率计算 Counted、Perfect、Pure 三层角度边界。 |
| `scrMisc.GetHitMargin(float hitangle, float refangle, bool isCW, float bpmTimesSpeed, float conductorPitch, double marginScale = 1.0)` | 把命中角度与参考角度的差转成度数，按 Counted、Perfect、Pure 边界依次得到 TooEarly 到 TooLate 的 `HitMargin`。 |
| `scrMisc.IsValidHit(HitMargin margin)` | `HitMarginLimit.PerfectsOnly` 只允许 EarlyPerfect 到 LatePerfect；`PurePerfectOnly` 只允许 Perfect；默认允许 VeryEarly 到 VeryLate；Auto 始终有效。 |
| `scrMisc.AngleToTime(double angle, double bpm)` | 把角度转换为时间，先对角度取 2π 模，再除以 π 并乘以 crotchet。 |

## 命中后的地板反馈

| 方法 | 行为 |
| --- | --- |
| `scrFloor.LightUp(HitMargin hitmargin = HitMargin.Perfect)` | 标记 `hasLit = true`；typing mode 下生成字母显示；根据 hit margin limit 和命中等级设置地板颜色；根据 tile flash style 显示 top/bottom glow 或移动到顶层；最后通知目标装饰 `HitFloor()`。 |

命中反馈只是视觉层。真正的判定等级由 `scrMisc.GetHitMargin` 和 `scrPlanet.SwitchChosen` 决定，地板推进由 `MoveToNextFloor` 完成。

## 相关页面

- [scrController](/api/core/scrController.md)
- [scrFloor](/api/core/scrFloor.md)
- [scrConductor](/api/core/scrConductor.md)
- [运行时输入与判定链路](/modules/runtime-input-judgement.md)
- [音频与节拍运行时](/modules/audio-beat-runtime.md)
