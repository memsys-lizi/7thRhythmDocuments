# 装饰、对象、文本与声音事件

本页覆盖阶段 5 的装饰对象、文本、声音和少量运行时方法类事件。它们都由 `scnGame.ApplyEvent()` 创建 `ffxPlusBase` 子类，再通过 `scrVfxPlus` 或手动触发入口执行。

## 源码范围

| 事件 | 组件 | 源码路径 |
| --- | --- | --- |
| `MoveDecorations` | `ffxMoveDecorationsPlus` | `7thRhythmSource/ADOFAi/ffxMoveDecorationsPlus.cs` |
| `SetObject` | `ffxSetObjectPlus` | `7thRhythmSource/ADOFAi/ffxSetObjectPlus.cs` |
| `SetText` | `ffxSetTextPlus` | `7thRhythmSource/ADOFAi/ffxSetTextPlus.cs` |
| `SetDefaultText` | `ffxSetDefaultText` | `7thRhythmSource/ADOFAi/ffxSetDefaultText.cs` |
| `PlaySound` | `ffxPlaySound` | `7thRhythmSource/ADOFAi/ffxPlaySound.cs` |
| `AddComponent` | `ffxAddComponent` | `7thRhythmSource/ADOFAi/ffxAddComponent.cs` |
| `KillPlayer` | `ffxKillPlayer` | `7thRhythmSource/ADOFAi/ffxKillPlayer.cs` |

## `MoveDecorations`

`MoveDecorations` 创建 `ffxMoveDecorationsPlus`，通过 tag 从 `scrDecorationManager` 中取得目标装饰，再按启用的属性 tween 或立即修改。

### Decode

| 事件属性 | 写入字段 |
| --- | --- |
| `duration` | 乘 `crotchet` 后写入 `duration`。 |
| `relativeTo` | 写入 `movementType`。 |
| `visible` | 写入 `visible`。 |
| `decorationImage` | 写入 `targetImageFilename`。 |
| `depth` | 写入 `targetDepth`。 |
| `parallax` | 写入 `targetParallax`。 |
| `parallaxOffset` | 乘 tile size 后写入 `targetParallaxOffset`。 |
| `positionOffset` | 乘 tile size 后写入 `targetPos`。 |
| `pivotOffset` | 乘 tile size 后写入 `targetPivot`。 |
| `rotationOffset` | 写入 `targetRot`。 |
| `scale` | 除以 100 后写入 `targetScaleV2`。 |
| `color` | 写入 `targetColor`。 |
| `opacity` | 除以 100 后写入 `targetOpacity`。 |
| `maskingType`、`useMaskingDepth`、`maskingFrontDepth`、`maskingBackDepth` | 写入视觉装饰遮罩相关字段。 |
| `tag` | 按空格拆分为 `targetTags`；空 tag 使用 `NO TAG`。 |
| `ease` | DOTween ease。 |

每个可选属性都有对应 `Used` 布尔值，来自事件字段是否被禁用。

### StartEffect

`StartEffect()` 在官方关卡低视觉质量且不是 MikoSkip 时直接返回。执行时遍历 `decManager.GetTaggedDecorations(targetTags)`：

| 类别 | 行为 |
| --- | --- |
| placement | 自定义关卡中，如果启用 `relativeTo` 且不是 `LastPosition`，调用 `dec.SetPlacementType(movementType)`。 |
| position | tween `SetPositionX/Y()`，`LastPosition` 使用当前 pivot 位置，否则从 `dec.startPos` 起算。 |
| parallax offset | tween `SetParallaxOffsetX/Y()`。 |
| pivot | tween `SetPivotX/Y()`。 |
| rotation | tween `SetRotation()`。 |
| scale | tween `SetScale()`，分别使用 X/Y 轴约束。 |
| color | tween `SetColor()`。 |
| opacity | tween `SetOpacity()`。 |
| parallax | tween `dec.parallax.multiplier`。 |
| visible | 调用 `dec.SetVisible(visible && !dec.forceHide)`。 |
| depth | 调用 `dec.SetDepth(targetDepth)`。 |
| particle image | 对 `scrParticleDecoration` 调用 `SetSprite()`。 |
| visual image | 对 `scrVisualDecoration` 调用 `SetSprite()`。 |
| masking | 对 `scrVisualDecoration` 调用 `SetMaskingType()`、`SetMaskingTarget()`、`SetMaskingDepth()`。 |

所有移动和显示相关 tween 写入目标装饰的 `eventTweens` 字典，因此可被 scrub 或 kill。

## `SetObject`

`SetObject` 创建 `ffxSetObjectPlus`。它只处理 `scrObjectDecoration`，并按 `ObjectDecorationType` 分成 Planet 和 Floor 两条路径。

### Decode

`Decode()` 读取 tag、duration、ease，并读取 Planet 与 Floor 对象字段：

| 对象类型 | 字段 |
| --- | --- |
| Planet | `planetColor`、`planetTailColor`。 |
| Floor | `trackAngle`、`trackColorType`、`trackColor`、`secondaryTrackColor`、`trackColorAnimDuration`、`trackOpacity`、`trackStyle`、`trackIcon`、`trackIconAngle`、`trackIconFlipped`、`trackRedSwirl`、`trackGraySetSpeedIcon`、`trackGlowEnabled`、`trackGlowColor`、`trackIconOutlines`。 |

### Planet 对象

| 属性 | 行为 |
| --- | --- |
| `planetColor` | kill `ObjectDecorationTweenType.PlanetColor`，tween `dec.GetColor()` 并调用 `SetPlanetColor()`。 |
| `planetTailColor` | kill `ObjectDecorationTweenType.PlanetTailColor`，tween `dec.planetTailColor` 并调用 `SetPlanetTailColor()`。 |

### Floor 对象

| 属性 | 行为 |
| --- | --- |
| `trackAngle` | tween `dec.GetFloorAngle()`，调用 `SetFloorAngle()`。 |
| 颜色相关 | kill `dec.floor.moveTweens[TweenType.Color]`，调用 `dec.SetFloorColor()`。未启用的颜色字段会回读当前 floor 状态。 |
| `trackOpacity` | tween `dec.GetAlpha()`，调用 `SetOpacity()`。 |
| `trackStyle` | 调用 `SetFloorStyle(trackStyle)`。 |
| `trackRedSwirl` | 调用 `SetFloorRedSwirl(trackRedSwirl)`。 |
| `trackIcon` / `trackGraySetSpeedIcon` / `trackRedSwirl` | 调用 `SetFloorIcon()`。 |
| `trackIconAngle` | tween `floorIconAngle`，调用 `SetFloorIconAngle()`。 |
| `trackIconFlipped` | 调用 `SetFloorIconFlipped()`。 |
| `trackGlowEnabled` | 调用 `SetFloorGlowEnabled()`。 |
| `trackGlowColor` | tween `floorGlowColor`，调用 `SetFloorGlowColor()`。 |
| `trackIconOutlines` | 调用 `SetFloorIconOutlines()`。 |

官方关卡低视觉质量时，`StartEffect()` 直接返回。

## `SetText`

`SetText` 创建 `ffxSetTextPlus`，按 tag 查找 `scrTextDecoration` 并调用 `SetText(targetString)`。

| 属性 | 行为 |
| --- | --- |
| `decText` | 使用 `GetStringLocalized("decText")` 读取本地化文本。 |
| `tag` | 按空格拆分；空 tag 使用 `NO TAG`。 |

官方关卡低视觉质量时不执行。`Awake()` 中如果 `decManager` 为空，会使用 `ADOBase.controller.decorationManager`；`Decode()` 会改用 `scnGame.suitableDecManager`。

## `SetDefaultText`

`SetDefaultText` 创建 `ffxSetDefaultText`，目标是 HUD 默认文字颜色、阴影、关卡标题位置和结算文案。

| 属性 | 行为 |
| --- | --- |
| `defaultTextColor` | tween 或直接设置 `controller.txtLevelName.color`，并同步 `scrVfx.instance.currentColourScheme.colourText`。 |
| `defaultTextShadowColor` | tween 或直接设置 `txtLevelName` 的 `Shadow.effectColor`，并同步 `colourTextShadow`。 |
| `levelTitlePosition` | tween 或直接设置 `txtLevelName.rectTransform.anchoredPosition`，基准为 `txtLevelNameOriginalPosition`。 |
| `levelTitleText` | 直接设置 `controller.txtLevelName.text`。 |
| `congratsText` | 写入 `controller.customTxtCongrats`。 |
| `perfectText` | 写入 `controller.customTxtPurePerfect`。 |

如果当前状态已经是 `States.Won`，并且修改了结算文本，源码会根据 `mistakesManager.IsAllPurePerfect()` 选择 perfect 或 congrats 文本写入 `txtCongrats.text`。

`eventTweens` 暴露默认文字颜色、阴影颜色和标题位置三条 tween。

## `PlaySound`

`PlaySound` 创建 `ffxPlaySound`。它在 `Awake()` 中设置 `startEffectOffset = 1.0`，并取得 mixer group `ConductorPlaySound`。

| 属性 | 行为 |
| --- | --- |
| `hitsound` | 写入 `HitSound hitSound`。 |
| `hitsoundVolume` | 除以 100 后写入 `volume`。 |

`StartEffect()` 以 `conductor.dspTimeSongPosZero + startTime / song.pitch` 计算 DSP 播放时间，再从 `gc.hitSoundOffsets` 读取对应 hitsound offset，调用 `AudioManager.Play("snd" + hitSound, num - value, group, volume)` 并把返回 AudioSource 的 `time` 设置为 `Max(value - startEffectOffset, 0)`。

`ScrubToTime(float t)` 会根据距离 startTime 的差值压缩 `startEffectOffset`，当距离小于等于 0.1 秒时标记 `triggered = true`。

## `AddComponent`

`AddComponent` 创建 `ffxAddComponent`，它会在 `Decode()` 中立即 `Setup()`。

| 字段 | 行为 |
| --- | --- |
| `component` | `Type.GetType(componentName)` 得到组件类型。 |
| `properties` | 用 `GDMiniJSON.Json.Deserialize("{" + properties + "}")` 解析为字典。 |
| `duration` | 乘 `crotchet` 后写入本组件 duration。 |

`Setup()` 会把指定组件添加到当前 floor 的 GameObject。如果新组件是 `ffxPlusBase` 子类，会加入 `floor.plusEffects` 并继承 duration。解析出的 properties 字典会按字段名直接通过 reflection 写入组件字段。

`SetStartTime()` 除了设置自身 start time，也会在添加的组件是 `ffxPlusBase` 时同步设置该组件 start time。

## `KillPlayer`

`KillPlayer` 创建 `ffxKillPlayer`。

| 属性 | 行为 |
| --- | --- |
| `playAnimation` | 取反后写入 `instant`。 |
| `failMessage` | 使用 `GetStringLocalized("failMessage")` 读取。 |

`StartEffect()` 在 auto、已经失败、或 noFail 时直接返回。随后检查 `conditionalInfo` 是否有任一 true；只有条件命中时才设置 `ctrl.instantExplode = instant` 并调用 `ctrl.playerOne.Die(false, false, failMessage)`。

## 与其他页面的关系

| 页面 | 关系 |
| --- | --- |
| [事件执行总览](/api/events/event-execution-overview.md) | 说明这些事件如何由 `ApplyEvent()` 进入调度。 |
| [运行时效果族补充](/api/runtime/effect-families.md) | 展开部分装饰、对象、文本、声音事件的字段细节。 |
| [相机、滤镜与屏幕事件](/api/events/camera-filter-events.md) | 对照相机与屏幕类事件。 |
