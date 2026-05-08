# 官方关卡脚本

## 模块边界

本模块覆盖 `RDFucked/Assets/Scripts/Assembly-CSharp/Level_*.cs`。这些脚本是官方关卡在 `LevelBase` 之上的专用逻辑层，包括教程、主线、boss、硬版、Booth 变体、活动曲和测试脚本。

## 已写页面

| 页面 | 内容 |
| --- | --- |
| [官方关卡脚本总览](/api/levels/overview.md) | `Level_*` 范围、分组、生命周期、已读重点脚本和阶段 5 拆分计划。 |
| [教程与开场关卡](/api/levels/tutorials-opening.md) | `Level_Intro`、`Level_Tutorial_*`、`Level_OpeningCreds` 的教程流程、Oneshot 教学、片头字幕和跳转。 |
| [Boss 与高压段落](/api/levels/boss-high-pressure.md) | `Level_Boss2`、`Level_Boss2Booth`、`Level_Boss2Hard`、`Level_PaigesReckoning`、`Level_InsomniacHard`、`Level_FinalRemix` 的 Boss 血量、失败覆写、低血量和高压小节。 |
| [运动与节奏变体](/api/levels/athlete-freezeshot.md) | `Level_Freezeshot`、`Level_FreezeshotH`、`Level_FreezeshotBooth`、`Level_AthleteTherapy`、`Level_AthleteFinale`、`Level_Injury` 的体育场棒球、灯牌、afterimage、杯子、泡泡和手机直播。 |
| [视觉与窗口特殊关卡](/api/levels/visual-special.md) | `Level_SVT`、`Level_Smokin`、`Level_Blurred`、`Level_Bitterness`、`Level_Montage`、`Level_Montage2`、`Level_Trailer` 的 kaleidoscope、咖啡杯、窗口 peek、粒子、Boss 失败和 trailer 演示。 |
| [叙事与场景关卡](/api/levels/story-scene-levels.md) | `Level_Lofi`、`Level_Lounge`、`Level_LuckyBreak`、`Level_HaileyDuet`、`Level_DistantDuet`、`Level_HelpingHands`、`Level_Steinway`、`Level_SteinwayH`、`Level_StevensonsTango` 的手部、背景、灯光、体育场、泡泡和 credits。 |

## 写作重点

| 关注点 | 内容 |
| --- | --- |
| 生命周期 | `Init()`、`LoadBigAssets()`、`preactions()`、`actions()`、`Update()` 的实际职责。 |
| 判定回调 | `OnHit()`、`OnMistake()`、`OnHeldPress()`、`FailLevel()` 如何改变关卡状态。 |
| 专用素材 | 关卡 prefab、背景、环境、Ink 文件、视频后处理和 HUD 对象。 |
| 公开方法 | 给 `CallCustomMethod`、Ink 或事件调用的 `public void`。 |
| 运行风险 | 对行编号、房间编号、当前关卡资源、二人模式和低闪光设置的依赖。 |

## 下一步

阶段 5 下一页深写其他官方与测试脚本，覆盖活动曲、测试脚本、空实现脚本和其余 `Level_*` 文件。
