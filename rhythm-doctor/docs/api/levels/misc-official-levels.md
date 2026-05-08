# 其余官方与测试脚本

本页覆盖阶段 5 中尚未进入前面专题页的 `Level_*` 文件。范围包括早期主线、活动曲、联动曲、测试脚本、空实现脚本、cutscene 脚本和辅助组件。页面以文件级覆盖为主，记录源码中已经确认的继承关系、生命周期覆写、素材入口和公开方法。

## 源码范围

| 分组 | 脚本 |
| --- | --- |
| 早期主线 | `Level_OrientalTechno`、`Level_OrientalDubstep`、`Level_OrientalInsomniac`、`Level_Intimate`、`Level_IntimateH`、`Level_Classy`、`Level_ClassyC`、`Level_ClassyH`、`Level_KnowYou`、`Level_Invisible` |
| 活动与联动曲 | `Level_CareLess`、`Level_GongXi`、`Level_Garden`、`Level_EdegaRave`、`Level_EdegaPerformance`、`Level_Lean`、`Level_Lesmis`、`Level_Unbeatable`、`Level_Unreachable`、`Level_VividStasis`、`Level_SparkLine`、`Level_SongOfTheSea`、`Level_Rollerdisco` |
| 测试与空实现 | `Level_ArtExercise`、`Level_AfterimageTest`、`Level_Heldbeats`、`Level_Dummy`、`Level_djtest`、`Level_Playground`、`Level_MyLevel`、`Level_GAndTonic`、`Level_FlyAway` |
| Cutscene 与辅助 | `Level_Cutscene_Airport`、`Level_MeetAndTweet`、`Level_LesMis_Helper`、`Level_OST` |

## 早期主线

| 类 | 已确认行为 |
| --- | --- |
| `Level_OrientalTechno` | `Init()` 设置 `songsUsed = sndOrientalTechno`；`LoadBigAssets()` 加载 `RDSamuraiWard`；`preactions()` 把 debugText 设置为当前 bar；`actions()` 按 bar 分支推进关卡。 |
| `Level_OrientalDubstep` | `Init()` 读取 Halloween week 并设置歌曲；`LoadBigAssets()` 加载 `RDSamuraiWard`；公开 `SetBgStyle(int)`、`EnableBassDropTimeSlow()`、`DisableBassDropTimeSlow()`、`SetToZenGarden()`、`SetToHeart()`、`SetToBrokenHeart()`、`OpenDoors()`、`SpeedUpRoom3Heart(float)`。 |
| `Level_OrientalInsomniac` | 定义三阶段 HP 常量；`Init()` 使用 `sndOrientalInsomniac1/2/3`；`LoadBigAssets()` 设置 Boss；`PlayLowHealthIfLow()` 处理低血量声音；`OnMistake()` 结束 stutter；`AddObstruction(int, float, float)` 添加遮挡；`FailLevel()` 覆写失败；`OnHit()` 扣 boss HP。 |
| `Level_Intimate` | `Init()` 设置 `heartExplodeType = GatherAndCeil`；`LoadBigAssets()` 添加 `Intimate_SkySS`、城市背景等；`preactions()` 与 `actions()` 按 bar 分支；公开 `TransitionToSkylineBackground()`。 |
| `Level_IntimateH` | `Init()` 设置 `heartExplodeType = GatherAndCeil`；`LoadBigAssets()` 加载 `RDGirlWard`；`preactions()` 与 `actions()` 按 bar 分支；公开 `TransitionToSkylineBackground()`。 |
| `Level_Classy` | `LoadBigAssets()` 设置 `keepHandsInFront = true`。 |
| `Level_ClassyC` | `Init()` 设置 `songsUsed = sndBarbraC`；`LoadBigAssets()` 设置 `specialSpeedHack = 1`；`preactions()` 与 `actions()` 按 bar 分支。 |
| `Level_ClassyH` | `LoadBigAssets()` 返回一帧；`preactions()` 与 `actions()` 为空覆写。 |
| `Level_KnowYou` | 保留数据构造函数和空 `Init()`。 |
| `Level_Invisible` | 保留数据构造函数，类体没有额外生命周期覆写。 |

## 活动与联动曲

| 类 | 已确认行为 |
| --- | --- |
| `Level_CareLess` | `LoadBigAssets()` 加载 HoodieBoy ward；`preactions()` 和 `actions()` 按 bar 分支；公开 Hoodie ward 灯光、夜间模式、吉他模式、窗口滚动、alert 框、swarm 粒子、icon rain、icon spiral 和 Samurai 花瓶层级方法。 |
| `Level_GongXi` | `Init()` 设置 `songsUsed = gongxirag2`；`LoadBigAssets()` 遍历 `levelEvents`；`preactions()` 与 `actions()` 按 bar 分支。 |
| `Level_Garden` | `LoadBigAssets()` 调整 room2 行容器高度；公开 `MoveCouple(int)`、`ShowCouple()`、`HideCouple()`、`ShowLeaves()`；`preactions()` 设置 `visualBeatLengthMultiplier = 3`。 |
| `Level_EdegaRave` | `LoadBigAssets()` 加载 `ShatteredGlass/ShatteredGlass`；公开 `TintRecordsRoomForeground(int, string, float, float, string)`、`ShatterGlass()`、`SkipRank()`。 |
| `Level_EdegaPerformance` | 公开手臂按钮显示、手臂 X/Y 移动、按钮 X/Y 移动、手臂动画、紧张状态和对话头像侧边翻转方法。 |
| `Level_Lean` | `Init()` 设置 `songsUsed = sndLeanOn`；`preactions()` 与 `actions()` 按 bar 分支；公开空方法 `reduceshadow()`。 |
| `Level_Lesmis` | `Init()` 读取 `scnGame.loadDogMode`；`LoadBigAssets()` 设置 `bossActNum = 3`；`preactions()` 与 `actions()` 按 bar 分支；公开 `Update2()` 与 `SetEnding(bool)`。 |
| `Level_Unbeatable` | `LoadBigAssets()` 处理 sliding portrait；`preactions()` 缓存 row4 角色；`actions()` 在第 59 小节外返回；公开 `ShowPortrait(int)`。 |
| `Level_Unreachable` | `preactions()` 第 1 小节在非低闪光下注册发光逻辑；公开手部 glow、kaleidoscope glow、手动 glow、glow row 增删、override alpha tween 和 space setup 方法。 |
| `Level_VividStasis` | `Init()` 设置 cutscene 段落 `(0, 24)`；公开 `VRankHacky()`，启用 room1 camera 的 heat distortion。 |
| `Level_SparkLine` | `Init()` 设置 cutscene 段落 `(0, 48)`；公开 `BalloonsSetStutterPoint()`、`BalloonsStutter()`、`BalloonsResume()`。 |
| `Level_SongOfTheSea` | 公开 `noteSounds` 字典；`LoadBigAssets()` 加载 50 到 81 的 note 声；公开 Nicole 层级移动、咖啡店开关门和 `PlayNote(bool)`。 |
| `Level_Rollerdisco` | `LoadBigAssets()` 加载 `RDTrain`；公开 `FlipTrain(bool room1, bool flipped)`。 |

## 测试与空实现

| 类 | 已确认行为 |
| --- | --- |
| `Level_ArtExercise` | 保留数据构造函数和空 `preactions()`。 |
| `Level_AfterimageTest` | `LoadBigAssets()` 创建 afterimage renderer 与 texture 列表；公开 `PasteCurrentFrame()`。 |
| `Level_Heldbeats` | 保留空 `Init()`、`preactions()`、`actions()`；公开 `MoveSnake()`，移动 room0 train 中的 `Train_Rattlesnake`。 |
| `Level_Dummy` | 保留空 `Init()`、`preactions()`、`actions()`。 |
| `Level_djtest` | `preactions()` 读取当前 bar；`actions()` 为空覆写。 |
| `Level_Playground` | `Init()` 设置 `songsUsed = sndOrientalTechno`；`LoadBigAssets()` 返回一帧；`preactions()` 设置 debugText；`actions()` 按 bar 分支。 |
| `Level_MyLevel` | 保留空 `Init()`、`preactions()`、`actions()`。 |
| `Level_GAndTonic` | 只有数据构造函数。 |
| `Level_FlyAway` | 只有数据构造函数。 |

## Cutscene 与辅助

| 类 | 已确认行为 |
| --- | --- |
| `Level_Cutscene_Airport` | 缓存 `RDMainWard`；公开 `OpenDoor(bool)`，调用 `ward.SetOfficeDoorOpened(open)`；`actions()` 第 1 小节执行关卡逻辑；公开 `DoTimescale(float, float, string)`。 |
| `Level_MeetAndTweet` | 定义 `StoryMode`；`LoadBigAssets()` 缓存当前 sprite 数据；公开当前 story、个人 story、显示、清理、mistake 装饰和 wobble 方法。 |
| `Level_LesMis_Helper` | 继承 `RDBase`，包含 `Update()`，作为 `Level_Lesmis` 辅助组件。 |
| `Level_OST` | 缓存 HoodieBoy ward；`actions()` 读取当前 bar；公开 cascading lights、HoodieBoy ward 对象、灯光、夜间模式、咖啡店 setup、杯堆开始/结束和投杯方法。 |

## 公开方法入口汇总

| 主题 | 方法来源 |
| --- | --- |
| 手臂与按钮 | `Level_EdegaPerformance` 的 `ShowButton`、`MoveArmX/Y`、`MoveButtonX/Y`、`PlayArmAnim`、`ToggleNervous`。 |
| Hoodie ward | `Level_CareLess` 与 `Level_OST` 的灯光、夜间模式、对象开关方法。 |
| 咖啡店杯堆 | `Level_OST` 的 `SetUpCoffeeShop()`、`StartStack()`、`EndStack()`、`ThrowCoffee(bool)`。 |
| 视觉粒子 | `Level_CareLess` 的 swarm、icon rain、icon spiral；`Level_Garden` 的 leaves；`Level_EdegaRave` 的 shattered glass。 |
| 叙事装饰 | `Level_MeetAndTweet` 的 story 显示、清理、mistake 和 wobble 系列。 |
| Cutscene | `Level_Cutscene_Airport` 的 door 和 timescale；`Level_VividStasis` 与 `Level_SparkLine` 的 cutscene 段落方法。 |

## 阶段 5 收尾

阶段 5 的专题页已经覆盖当前已识别的 `Level_*` 文件族。下一步进入阶段 5 复核：对 `RDFucked/Assets/Scripts/Assembly-CSharp/Level_*.cs` 生成覆盖清单，确认每个文件都能从总览页或专题页找到归属，再把阶段 5 标记为待复核或已完成。



