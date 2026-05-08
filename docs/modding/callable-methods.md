# 可调用方法索引

本页是阶段 6 的交叉索引，用来帮助源码研究者和 Mod 作者从“可调用入口”的角度查代码。`CallCustomMethod` 本身属于 RD 编辑器事件系统，主要由关卡事件和自定义关卡流程使用；Mod 作者会关注它，是因为它暴露了 `LevelBase`、`RDRoom` 和当前官方关卡实例上的一部分公开方法。

事件机制的源码细节见 [自定义方法事件](/api/editor-events/custom-methods.md)。本页不改变自定义方法事件的定位，只把已经写过的入口按使用场景归类。

## 调用路径

| 调用来源 | 目标 | 入口形式 |
| --- | --- | --- |
| `LevelEvent_CallCustomMethod` | 当前 `LevelBase` 或官方关卡子类 | 关卡事件写 `Method()`、`level.Method()`、字段赋值、字段自增和自减 |
| `LevelEvent_CallCustomMethod` | `scrVfxControl` | 关卡事件写 `vfx.Method()` |
| `LevelEvent_CallCustomMethod` | `RDRoom` | 关卡事件写 `room1.Method()` 到 `room4.Method()`，或 `room[0].Method()` 到 `room[3].Method()` |
| `RDInk.runLevelMethod` | 当前 `LevelBase` 或官方关卡子类 | 方法名字符串，只调用无参方法 |

## 参数和签名

| 规则 | 内容 |
| --- | --- |
| 自动补全方法 | 公开实例方法、返回 `void`、参数只使用 `int`、`float`、`string`、`bool`，并带 `[ListedMethod]`；开发模式还会列出满足签名的未标记方法。 |
| 参数转换 | `str:hello` 和 `"hello"` 转字符串；`true`/`false` 转布尔；带小数点优先转 `float`；整数优先转 `int`。 |
| 字段操作 | 支持 `field = value`、`field++`、`field--`，目标是当前 `LevelBase` 或关卡子类字段。 |
| Ink 调用 | `runLevelMethod` 只按名称调用当前关卡实例上的无参方法。 |

## LevelBase 常用入口

| 类别 | 方法 |
| --- | --- |
| 失误与治疗 | `Mistake()`、`MistakeSilent()`、`MistakeOrHeal()`、`MistakeOrHealP1()`、`MistakeOrHealP2()`、`MistakeOrHealSilent()`、`SetMistakeWeightInstant(int, float)` |
| 命中记录 | `Hit()`、`HitIncorrect()`、`ResetHitHistory()`、`ResetHitHistoryP1()`、`ResetHitHistoryP2()` |
| 音乐 | `CurrentSongVol(float, float)`、`StopSong(float)`、`OneSongAtATime(bool)` |
| 行与心形 | `SetShadowRow(int, int)`、`UnsetShadowRow(int, int)`、`SetClumsyRow(int, int)`、`ToggleRowReflection(int, bool)`、`ToggleRowReflectionRoom(int, bool)`、`ToggleRowHitFX(int, bool)`、`SetRowLength(int, int)`、`SetRowLengthTimed(int, int, float)` |
| Oneshot 和脉冲 | `TweenRowPulseBend(int, int, float, float, string)`、`TweenOneshotPositionOverride(int, float, float, string)`、`TweenOneshotPositionOverrideLerp(int, float, float, string)` |
| 状态与显示 | `TweenFloat(int, float, float, string)`、`StopEverything()`、`StopAllBeats()`、`IgnoreInput(bool)` |
| 聚光灯与心形 | `ShowSpotlight(int, bool)`、`ExpandSpotlight(float)`、`HideSpotlight()`、`CrackAllHearts()`、`UpdateAllHearts()`、`SetHeartMistakes(int, float)`、`ShakeRow(int, int, float)` |
| 手部归属 | `SetHandToP1(int, bool)`、`SetHandToP2(int, bool)`、`SetHandToPlayer(int, bool)` |
| 对话 | `StopDialogue()`、`StopDialogueInstant()` |

## RDRoom 常用入口

| 类别 | 方法 |
| --- | --- |
| 房间后处理 | `SetVignetteAlpha(float)` |
| Kaleidoscope | `EditKaleidoscopeColor(bool, string, float, string)`、`EditKaleidoscopeSpeed(float, float, string)`、`EditKaleidoscopeRate(float)`、`EditKaleidoscopeColors(float, float, float, float, float, float)`、`SyncKaleidoscopes(int)`、`EditKaleidoscopeRepeat(int)`、`EditKaleidoscopeOffset(float, float, string)`、`EditKaleidoscopeRoll(float, float, string)`、`ToggleKaleidoscopeSymmetry(bool)` |
| 场景对象 | `ColeLight(int)`、`CafeLight(int)`、`CafeLightColor(string, float, float)`、`CafeDoor(bool)`、`PaigeDoor(bool)`、`AbandonedDoor(bool)`、`AbandonedElevator(bool)` |
| Samurai 与 Physio | `SamuraiDoor(bool, bool, bool)`、`SamuraiLanterns(bool, float, string)`、`SamuraiTransparentBG(bool)`、`PhysioEdega(bool)`、`PhysioLights(bool)` |
| 体育场 | `StadiumBaseballRain(float)`、`StadiumLightning(bool)`、`StadiumGlitchyLights(bool)` |
| 病房 | `SetWardScroll(float, float, string)`、`IncrementWardScrollOffset(float, float, string)`、`SetWardScrollOffsetSmooth(float, float, float, float)`、`SetWardSeamless(bool)`、`ToggleWardTVs(bool)` |
| 气球与粒子 | `PopBalloons(float)`、`SetBalloonsSpawnDelay(float)`、`SetBalloonsSortingOrder(int, int)`、`FlowingDiamonds(float, float)`、`SpawnParticle(string, float, float, float)` |
| 其他主题 | `DarkenedRollerdisco(bool)`、`TintRecordsRoom(bool, string, float, float, string)`、`EnableTypingIan(bool)`、`ShowBossStageText(float, float, string)`、`SetRollerdiscoScrollSpeed(float, float, string)`、`SetRollerdiscoScrollOffset(float, float, string)` |
| 眼睛场景 | `SetEyesVerticalShift(bool, float)`、`SetEyesColor(bool, bool, string, float, float, string)`、`SetEyesBackgroundColor(bool, string, float, float, string)`、`SetEyesFocus(bool, float, float, float, string)`、`SetEyesFocusRow(bool, int)`、`EyesBlink(bool, float)`、`EyesToggle(bool, float, bool)` |

## 官方关卡公开入口

| 页面 | 适合查找的调用 |
| --- | --- |
| [教程与开场关卡](/api/levels/tutorials-opening.md) | 教程跳转、教程 Ink、手部提示、Oneshot 教学。 |
| [Boss 与高压段落](/api/levels/boss-high-pressure.md) | Boss2 咖啡店、room3 门和镜头、Paige 眼睛和手臂、Insomniac Hard 遮挡、低血量和失败。 |
| [运动与节奏变体](/api/levels/athlete-freezeshot.md) | Freezeshot afterimage、AthleteFinale 杯子和特殊棒球、Injury 泡泡、手机直播、病房滚动。 |
| [视觉与窗口特殊关卡](/api/levels/visual-special.md) | SVT kaleidoscope、Smokin 杯堆、Bitterness 粒子和医院层、Montage window peek、Trailer infinite zoom。 |
| [叙事与场景关卡](/api/levels/story-scene-levels.md) | Lofi Ian 手、LuckyBreak 体育场、HaileyDuet 泡泡与咖啡、DistantDuet 天空、HelpingHands credits、Steinway 音量。 |
| [其余官方与测试脚本](/api/levels/misc-official-levels.md) | CareLess alert 和粒子、EdegaPerformance 手臂、MeetAndTweet story、OST 杯堆、活动曲和测试脚本。 |

## 选择入口的顺序

1. 先判断目标是否是通用行为：行、心形、输入、聚光灯、音乐优先查 `LevelBase`。
2. 目标是房间环境时，优先使用 `room1` 到 `room4` 或 `room[index]` 调用 `RDRoom`。
3. 目标只存在于某个官方关卡时，进入对应关卡专题页确认素材、行编号、房间编号和初始化时机。
4. 目标是事件本身的运行顺序、参数解析、自动补全，回到 [自定义方法事件](/api/editor-events/custom-methods.md)。

## 调用前提

| 前提 | 说明 |
| --- | --- |
| 场景对象已加载 | 官方关卡方法通常依赖 `LoadBigAssets()` 中创建的 prefab、背景或粒子对象。 |
| 行编号存在 | 行和心形方法会按行数组取对象，调用前要确认当前关卡创建了对应行。 |
| 房间编号一致 | `room1` 到 `room4` 是事件字符串写法，`room[0]` 到 `room[3]` 是数组下标写法。 |
| 当前关卡类型一致 | `level.Method()` 指向当前 `LevelBase` 子类实例，换关后方法集合也会变化。 |
| 编辑器与运行时状态不同 | 自动补全属于编辑器 UI，实际调用发生在事件运行或 Ink 外部函数执行时。 |

## 后续拆分

阶段 6 后续会继续补三类 Mod 索引：

| 页面 | 目标 |
| --- | --- |
| [事件写法索引](/modding/event-patterns.md) | 按 `LevelEventType` 和事件专题页整理常用事件组合。 |
| 数据字段索引 | 整理 `.rdlevel` 中 settings、rows、events、decorations、conditionals 的字段入口。 |
| 高风险系统索引 | 整理高风险运行时入口，例如判定、音频、窗口、失败、rank 和存档路径。 |
