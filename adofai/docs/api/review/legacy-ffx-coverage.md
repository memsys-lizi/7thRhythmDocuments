# 旧式 ffx 效果组件索引

## 基本信息

本页覆盖阶段 7 中剩余的根目录 `ffx*` 旧式效果组件。这批文件大多继承 `ffxPlusBase`，但和阶段 5 已经深写的 `SetFilter`、`MoveDecorations`、`SetText`、`PlaySound` 等通用事件效果不同，它们更多服务官方关卡演出、菜单彩蛋、地板命中特效、旧式 sprite tween 和场景专用逻辑。

统计范围为 `7thRhythmSource/ADOFAi/ffx*.cs` 中尚未被前面专题直接命中的文件，共 48 个。

## 共同运行模型

| 成员或方法 | 常见行为 |
| --- | --- |
| 继承 | 大多数类继承 `ffxPlusBase`，沿用 `floor`、`cond`、`duration`、`ease`、`hifiEffect`、`runOnHit`、`ScrubToTime()` 等运行时约定。 |
| `runOnHit` | 许多旧式效果返回 true，表示挂在地板上等待玩家命中后触发。 |
| `Awake()` | 常调用 `base.Awake()`，并按视觉质量设置 `hifiEffect` 或初始化 floor icon、glow。 |
| `SetStartTime()` | 少数敌人或锤子类重写该方法，把开始时间提前到地板 entry time 之前。 |
| `StartEffect(scrPlanet)` | 主触发点，通常创建 DOTween、移动 sprite、切换 UI、播放音效或改变 floor 状态。 |
| `ScrubToTime(float)` | `ffx*Plus` 包装类常提供空实现，用来允许编辑器 scrub 调用但不回放一次性视觉。 |

## 文件分组

| 分组 | 文件 | 行为概览 |
| --- | --- | --- |
| 相机与背景 | `ffxBgColor.cs`、`ffxCamInst.cs`、`ffxCamMove.cs`、`ffxCamMove_Follow.cs`、`ffxCamMove.cs`、`ffxCamRestore.cs`、`ffxCamSetParams.cs`、`ffxCamShake.cs`、`ffxJerkCam.cs`、`ffxGlitchFilter.cs`、`ffxLowQualityBlizzard.cs`、`ffxTweenBlizzardPlus.cs` | 改背景色、旧式相机移动/恢复/参数设置、相机抖动、低质量暴风雪或滤镜效果。 |
| Sprite 与对象 tween | `ffxFlashSprite.cs`、`ffxFlashSpritePlus.cs`、`ffxHueSpriteTween.cs`、`ffxRotateObjPlus.cs`、`ffxScaleSpritePlus.cs`、`ffxSpriteMove.cs`、`ffxSpriteRotate.cs`、`ffxSpriteScale.cs`、`ffxFadeIn.cs`、`ffxFadeInPlus.cs`、`ffxPulseMag.cs`、`ffxScriptEnable.cs` | 旧式 sprite 显隐、淡入、位置、旋转、缩放、色相、脚本启用和对象旋转缩放包装。 |
| 地板命中特效 | `ffxColdTile.cs`、`ffxHotTile.cs`、`ffxFloorDisappear_ZeroBehind.cs`、`ffxLightBridge.cs`、`ffxTractorbeamFloors.cs` | 命中地板后生成星星、火星、桥面显隐或地板吸附等效果。 |
| 官方关卡演出 | `ffxActivateGoat.cs`、`ffxButterflyCircle.cs`、`ffxDamageRat.cs`、`ffxFearGrowsLightning.cs`、`ffxMDEnemy.cs`、`ffxMDEnemyHit.cs`、`ffxMDGhosts.cs`、`ffxMDHammer.cs`、`ffxPADiamond.cs`、`ffxRatPhase.cs` | 关卡专用演出、敌人生成、命中回调、老鼠或闪电演出、山羊激活、蝴蝶与钻石效果。 |
| 菜单和彩蛋 | `ffxMenuFoolJoker.cs`、`ffxMenuFoolSwirl.cs`、`ffxMenuPlanetSpeedChange.cs`、`ffxSetMenuPhase.cs` | 关卡选择菜单、April Fools 状态、星球速度切换和菜单阶段切换。 |
| Options 特殊演出 | `ffxOptionsShapeBlink.cs`、`ffxSetOptionsIcons.cs`、`ffxSetOptionsText.cs`、`ffxSpawnOptionsShape.cs`、`ffxSetOffset.cs` | Options 关卡的图标、文本、形状、offset 或视觉提示。 |
| 其他旧式组件 | `ffxDamageRat.cs`、`ffxFlashStyle.cs`、`ffxSpawnOptionsShape.cs` | 文件名已列入本页；具体行为按源码所在关卡或 UI 专题继续回链。 |

## 代表性类

### `ffxSpriteMove`

| 成员 | 类型 | 行为 |
| --- | --- | --- |
| `targetSprite` | `GameObject` | 要移动的对象。 |
| `targetLocalPosition` | `Vector2` | 目标本地坐标。 |
| `offsetBeats` | `float` | 命中后延迟多少拍开始。 |
| `durationBeats` | `float` | 移动持续拍数。 |
| `runOnHit` | `bool` | 返回 true。 |

`StartEffect()` 根据当前 BPM、地板 speed 和歌曲 pitch 计算 crotchet，然后用 `DOVirtual.DelayedCall()` 延迟执行 `targetSprite.transform.DOLocalMove()`。

### `ffxFlashSprite` 与 `ffxFlashSpritePlus`

`ffxFlashSprite.StartEffectStatic(GameObject, float)` 会激活目标对象，把自身和所有子级 `SpriteRenderer` 的 alpha 设为 1，再用 DOTween 淡到 0。`ffxFlashSpritePlus` 保存 `objFade` 与 `time`，在 `StartEffect()` 中调用静态方法；`ScrubToTime()` 为空。

### `ffxMDEnemy` 与 `ffxMDEnemyHit`

`ffxMDEnemy` 是 `scrMDController` 相关敌人效果。它定义 `EnemyType`、`Direction`、`HitDirection` 三个枚举，`Awake()` 中取得 `scrMDController.instance`，并给当前地板添加 `ffxMDEnemyHit`，将 `onHit` 绑定到 `OnHit()`。

| 方法 | 行为 |
| --- | --- |
| `SetStartTime(float, float)` | 根据敌人方向和类型调整 `moveDuration`，把开始时间提前到地板 entry time 之前，并调用 `FloorSetup()`。 |
| `FloorSetup()` | 视觉质量不是 Minimum/Low 时，根据方向和敌人类型实例化对应 prefab。 |
| `StartEffect(scrPlanet)` | 把敌人放到起点、激活对象并开始移动；Boss 方向会从 candy spawner 发射。 |
| `Update()` | 未命中时沿 `movementVector` 移动；命中后施加向下速度并旋转。 |

`ffxMDEnemyHit` 也继承 `ffxPlusBase`，`runOnHit` 返回 true，`StartEffect()` 只调用 `onHit()`，用于把地板命中事件转发给敌人或锤子效果。

### `ffxMDHammer`

`ffxMDHammer` 使用 `prefab` 实例化锤子，`clockwise` 控制是否 X 轴翻转。`SetStartTime()` 把开始时间提前 3 拍；`Update()` 根据是否命中改变旋转速度，并在角度范围内把锤子 sprite 透明；`OnHit()` 把 `hit` 设为 true。

### `ffxColdTile` 与 `ffxHotTile`

这两个类都是命中地板后的粒子式 sprite 演出。

| 类 | 行为 |
| --- | --- |
| `ffxColdTile` | 从 `TaroBGScript.instance` 取得 tile star 和 tile glow，按随机角度向外移动，并淡出隐藏。 |
| `ffxHotTile` | 从 `TaroBGScript.instance` 取得 tile ember，围绕地板向外飞出并淡出隐藏。 |

它们都用 `1f / scrConductor.instance.song.pitch` 缩放动画时长，并通过 `DOTween.Sequence()` 在淡出后关闭 renderer。

### `ffxLightBridge`

`ffxLightBridge.Start()` 根据当前地板 `seqID`、`tilesAhead` 和 `tileRange` 收集一段地板，设置 `_Flash` 材质参数；如果不是 `turnOff`，会先把目标地板 opacity 设为 0。`StartEffect()` 把这些地板的颜色设为 `color`，再 tween opacity 到 1 或 0。关闭时还会淡出 top glow 并设置 `dontChangeMySprite`。

### `ffxMenuFoolSwirl` 与 `ffxMenuFoolJoker`

| 类 | 行为 |
| --- | --- |
| `ffxMenuFoolSwirl` | 在 April Fools 或 `GCS.FOOL_SWIRL` 为 true 时启用；触发时切换 `GCS.FOOL_SWIRL`、改变 floor 图标、反转玩家旋转方向、更新所有 `scrFloor.isCCW` 和 `scrHoldRenderer.UpdateFoolDir()`。 |
| `ffxMenuFoolJoker` | 在 April Fools 或 `GCS.FOOL_JOKER` 为 true 时启用；触发时调用 `ADOBase.controller.PortalTravelAction(Portal.FoolJoker)`。 |

两个类都会根据 `ADOBase.controller.menuPhase` 控制粒子发射，且在全局 fool 状态开启时把粒子位置跟随当前选择星体。

### `ffxMenuPlanetSpeedChange`

`Awake()` 把当前地板图标设为 Rabbit 并关闭 top glow；`StartEffect()` 在星球速度 1 与 2 之间切换，同时切换 Rabbit/Snail 图标，并对 `ADOBase.conductor.song2` 做淡入或淡出。

## Plus 包装类

| 类 | 包装目标 | 行为 |
| --- | --- | --- |
| `ffxFlashSpritePlus` | `ffxFlashSprite.StartEffectStatic()` | 保存目标对象和时间，触发时调用静态淡出逻辑。 |
| `ffxScaleSpritePlus` | `ffxSpriteScale.StartEffectStatic()` | 保存目标对象、目标缩放和时间，触发时执行缩放 tween。 |
| `ffxRotateObjPlus` | 对象旋转 tween | 保存 `objRot` 与 `targetAngle`，按 `duration` 和 `ease` tween Z 角度。 |

这些包装类和阶段 5 的通用 `ffx*Plus` 不同，不直接从 `LevelEvent` 解码字段，通常由官方关卡脚本或场景预制体配置字段。

## 全部文件清单

| 文件 | 归类 |
| --- | --- |
| `ffxActivateGoat.cs` | 官方关卡演出 |
| `ffxBgColor.cs` | 相机与背景 |
| `ffxButterflyCircle.cs` | 官方关卡演出 |
| `ffxCamInst.cs` | 相机与背景 |
| `ffxCamMove_Follow.cs` | 相机与背景 |
| `ffxCamMove.cs` | 相机与背景 |
| `ffxCamRestore.cs` | 相机与背景 |
| `ffxCamSetParams.cs` | 相机与背景 |
| `ffxCamShake.cs` | 相机与背景 |
| `ffxColdTile.cs` | 地板命中特效 |
| `ffxDamageRat.cs` | 官方关卡演出 |
| `ffxFadeIn.cs` | Sprite 与对象 tween |
| `ffxFadeInPlus.cs` | Sprite 与对象 tween |
| `ffxFearGrowsLightning.cs` | 官方关卡演出 |
| `ffxFlashSprite.cs` | Sprite 与对象 tween |
| `ffxFlashSpritePlus.cs` | Sprite 与对象 tween |
| `ffxFlashStyle.cs` | 其他旧式组件 |
| `ffxFloorDisappear_ZeroBehind.cs` | 地板命中特效 |
| `ffxGlitchFilter.cs` | 相机与背景 |
| `ffxHotTile.cs` | 地板命中特效 |
| `ffxHueSpriteTween.cs` | Sprite 与对象 tween |
| `ffxJerkCam.cs` | 相机与背景 |
| `ffxLightBridge.cs` | 地板命中特效 |
| `ffxLowQualityBlizzard.cs` | 相机与背景 |
| `ffxMDEnemy.cs` | 官方关卡演出 |
| `ffxMDEnemyHit.cs` | 官方关卡演出 |
| `ffxMDGhosts.cs` | 官方关卡演出 |
| `ffxMDHammer.cs` | 官方关卡演出 |
| `ffxMenuFoolJoker.cs` | 菜单和彩蛋 |
| `ffxMenuFoolSwirl.cs` | 菜单和彩蛋 |
| `ffxMenuPlanetSpeedChange.cs` | 菜单和彩蛋 |
| `ffxOptionsShapeBlink.cs` | Options 特殊演出 |
| `ffxPADiamond.cs` | 官方关卡演出 |
| `ffxPulseMag.cs` | Sprite 与对象 tween |
| `ffxRatPhase.cs` | 官方关卡演出 |
| `ffxRotateObjPlus.cs` | Sprite 与对象 tween |
| `ffxScaleSpritePlus.cs` | Sprite 与对象 tween |
| `ffxScriptEnable.cs` | Sprite 与对象 tween |
| `ffxSetMenuPhase.cs` | 菜单和彩蛋 |
| `ffxSetOffset.cs` | Options 特殊演出 |
| `ffxSetOptionsIcons.cs` | Options 特殊演出 |
| `ffxSetOptionsText.cs` | Options 特殊演出 |
| `ffxSpawnOptionsShape.cs` | Options 特殊演出 |
| `ffxSpriteMove.cs` | Sprite 与对象 tween |
| `ffxSpriteRotate.cs` | Sprite 与对象 tween |
| `ffxSpriteScale.cs` | Sprite 与对象 tween |
| `ffxTractorbeamFloors.cs` | 地板命中特效 |
| `ffxTweenBlizzardPlus.cs` | 相机与背景 |

## 与已完成页面的关系

| 主题 | 页面 |
| --- | --- |
| 通用事件到 `ffxPlusBase` 调度 | [事件执行总览](/api/events/event-execution-overview.md) |
| 相机、滤镜、屏幕事件 | [相机、滤镜与屏幕事件](/api/events/camera-filter-events.md) |
| 运行时效果族主干 | [运行时效果族补充](/api/runtime/effect-families.md) |
| 官方关卡脚本入口 | [官方关卡脚本运行入口](/api/runtime/official-level-scripts.md) |
| 文件级统计 | [文件级覆盖清单](/api/review/source-coverage.md) |

## 阶段 7 覆盖状态

本页已经把剩余 48 个旧式 `ffx*` 文件全部列入文档索引。下一批建议处理剩余 `scr*` 组件，因为它们数量最大，且混合了 UI、条件开关、场景演出、调试组件和平台辅助。
