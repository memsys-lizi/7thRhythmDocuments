# 输入、粒子与剩余运行时事件

本页覆盖阶段 5 最后一组运行时事件：输入事件、帧率、星球缩放、hitsound、hold sound、粒子设置与粒子发射。

## 源码范围

| 事件 | 组件 | 源码路径 |
| --- | --- | --- |
| `SetInputEvent` | `ffxSetInputEventPlus` | `7thRhythmSource/ADOFAi/ffxSetInputEventPlus.cs` |
| `SetFrameRate` | `ffxSetFrameRatePlus` | `7thRhythmSource/ADOFAi/ffxSetFrameRatePlus.cs` |
| `ScalePlanets` | `ffxScalePlanetsPlus` | `7thRhythmSource/ADOFAi/ffxScalePlanetsPlus.cs` |
| `SetHitsound` | `ffxSetHitsound` | `7thRhythmSource/ADOFAi/ffxSetHitsound.cs` |
| `SetHoldSound` | `ffxSetHoldsound` | `7thRhythmSource/ADOFAi/ffxSetHoldsound.cs` |
| `SetParticle` | `ADOFAI.FloorFX.ffxSetParticlePlus` | `7thRhythmSource/ADOFAi/ADOFAI.FloorFX/ffxSetParticlePlus.cs` |
| `EmitParticle` | `ADOFAI.FloorFX.ffxEmitParticlePlus` | `7thRhythmSource/ADOFAi/ADOFAI.FloorFX/ffxEmitParticlePlus.cs` |

## `SetInputEvent`

`SetInputEvent` 创建 `ffxSetInputEventPlus`。它不是直接执行某个视觉效果，而是在 `PrepVfx()` 中把同一地板上带指定 event tag 的效果登记为输入触发效果。

### Decode

| 属性 | 写入字段 |
| --- | --- |
| `target` | `InputEventTarget target`。 |
| `state` | `InputEventState state`。 |
| `targetEventTag` | 写入 `tag`。 |
| `ignoreInput` | 写入 `ignoreInput`。 |

### PrepVfx

`PrepVfx()` 只初始化一次。它遍历当前地板 `floor.plusEffects`，读取每个效果的 `sourceLevelEvent.eventTag`，如果 event tag 中包含 `targetEventTag`：

| 行为 | 结果 |
| --- | --- |
| `inputEvents.Add(plusEffect)` | 把目标效果收入输入事件集合。 |
| `plusEffect.triggered = true` | 防止目标效果被普通时间调度再次触发。 |
| `plusEffect.runManually = true` | 标记目标效果由手动入口触发。 |

`StartEffect()` 会把自身写入 `ADOBase.controller.inputEventFfx[(int)state][(int)target]`。玩家输入处理会读取该表，并对 `inputEvents` 中的效果调用 `StartEffectWithOffset(chosenPlanet)`。

## `SetFrameRate`

`SetFrameRate` 创建 `ffxSetFrameRatePlus`。

| 属性 | 行为 |
| --- | --- |
| `enabled` | 写入 `enableCustomFrameRate`。 |
| `frameRate` | 写入 `frameRate`。 |

`StartEffect()` 调用 `cam.SetCustomFrameRate(enableCustomFrameRate, frameRate)`。

## `ScalePlanets`

`ScalePlanets` 创建 `ffxScalePlanetsPlus`，按目标星球类型 tween `planetScale`。

| 属性 | 行为 |
| --- | --- |
| `targetPlanet` | 写入 `TargetPlanet targetPlanet`。 |
| `scale` | 除以 100 后写入 `targetScale`。 |
| `duration` | 乘 `crotchet` 后写入持续时间。 |
| `ease` | DOTween ease。 |

`StartEffect()` 会遍历 `ADOBase.controller.playerManager` 中所有玩家，根据 `targetPlanet` 选出星体列表：

| 目标 | 星体 |
| --- | --- |
| `All` | `planetarySystem.planetList`。 |
| `FirePlanet` | `planetarySystem.planetRed`。 |
| `IcePlanet` | `planetarySystem.planetBlue`。 |
| `GreenPlanet` | `planetarySystem.planetGreen`。 |

每个目标星体会 kill 当前 `scaleTween`，再 tween `planet.planetScale` 到目标缩放，结束时再次写入目标值。

## `SetHitsound`

`SetHitsound` 创建 `ffxSetHitsound`。这个组件 `runOnHit` 为 true，命中地板时由地板或星体命中流程读取。

| 属性 | 行为 |
| --- | --- |
| `gameSound` | 写入 `GameSound gameSound`。 |
| `hitsound` | 写入 `HitSound hitSound`。 |
| `hitsoundVolume` | 除以 100 后写入 `volume`。 |

`Decode()` 会把自身写到 `floor.setHitsound`。`StartEffect()` 为空实现，实际效果依赖地板命中时读取该组件的字段。

## `SetHoldSound`

`SetHoldSound` 创建 `ffxSetHoldsound`，同样 `runOnHit` 为 true。

| 属性 | 行为 |
| --- | --- |
| `holdStartSound` | 写入 hold 起始声音。 |
| `holdLoopSound` | 写入 hold 循环声音。 |
| `holdEndSound` | 写入 hold 结束声音。 |
| `holdMidSound` | 写入 hold 中段声音。 |
| `holdMidSoundType` | 写入中段声音类型。 |
| `holdMidSoundDelay` | 乘 `crotchet` 后写入延迟秒数。 |
| `holdMidSoundTimingRelativeTo` | 写入中段声音相对时机。 |
| `holdSoundVolume` | 除以 100 后写入 `volume`。 |

`StartEffect()` 为空实现，字段由 hold 相关运行时流程使用。

## `SetParticle`

`SetParticle` 创建 `ADOFAI.FloorFX.ffxSetParticlePlus`。它按 tag 查找 `scrParticleDecoration`，修改其 `ParticleSystem` 模块。

### Decode

| 属性 | 写入 |
| --- | --- |
| `duration` | 乘 `crotchet` 后写入持续时间。 |
| `color` | `ParticleSystem.MinMaxGradient color`。 |
| `colorOverLifetime` | `ParticleSystem.MinMaxGradient colorOverLifetime`。 |
| `targetMode` | `ParticlePlayMode targetMode`。 |
| `maxParticles` | `maxParticles`。 |
| `particleLifetime` | 转换为随机 `MinMaxCurve`。 |
| `sizeOverLifetime` | 转换为线性 `MinMaxCurve`。 |
| `particleSize` | 转换为随机 `MinMaxCurve`。 |
| `rotationOverTime` | 转换为随机 `MinMaxCurve`。 |
| `velocity` | `Tuple<Vector2, Vector2>`。 |
| `shapeType` | `ParticleShape`。 |
| `shapeRadius` | 半径。 |
| `emissionRate` | 发射速率。 |
| `simulationSpeed` | 模拟速度。 |
| `arc` | 发射弧度。 |
| `arcMode` | `ParticleSystemShapeMultiModeValue`。 |
| `velocityLimitOverLifetime` | 限速曲线。 |
| `lockRotation` / `lockScale` | 写入装饰锁定标志。 |
| `tag` | 按空格拆分；空 tag 使用 `NO TAG`。 |
| `ease` | DOTween ease。 |

每个粒子属性还有 `use...` 布尔值，来自事件字段是否被禁用。

### StartEffect

官方关卡低视觉质量时不执行。对每个目标 `scrParticleDecoration`：

| 模块 | 行为 |
| --- | --- |
| lock | 写入 `dec.lockRotation`、`dec.lockScale`。 |
| play mode | `Start` 调用 `Play()`；`Stop` 调用 `StopEmitting`；`Clear` 调用 `StopEmittingAndClear`。 |
| main | tween `main.maxParticles`、`main.startLifetime`、`main.startSize`、`main.startColor`。 |
| rotation over lifetime | tween `rotationModule.z`。 |
| size over lifetime | 启用模块并写入 `sizeOverLifetimeModule.size`。 |
| limit velocity over lifetime | 启用模块并写入 drag。 |
| velocity over lifetime | tween `velocityModule.x` 和 `velocityModule.y`。 |
| shape | 写入 Rectangle 或 Circle，tween radius、arc，写入 arc mode。 |
| emission | tween `emissionModule.rateOverTime`。 |
| simulation | tween `dec.simulationSpeed`。 |
| color over lifetime | 写入 `colorOverLifetimeModule.color`。 |

`ScrubToTime(float time)` 会在时间落入效果持续区间时，对目标粒子系统执行 `Simulate()`，并在需要时启动自动播放粒子。

## `EmitParticle`

`EmitParticle` 创建 `ADOFAI.FloorFX.ffxEmitParticlePlus`。

| 属性 | 行为 |
| --- | --- |
| `count` | 发射数量。 |
| `tag` | 按空格拆分；空 tag 使用 `NO TAG`。 |

`StartEffect()` 遍历目标 `scrParticleDecoration`，调用 `taggedDecoration.particleSystem.Emit(count)`。

## 阶段 5 收口说明

至此阶段 5 已按运行时事件族完成主干拆分：

| 事件族 | 页面 |
| --- | --- |
| 调度主线 | [事件执行总览](/api/events/event-execution-overview.md) |
| 轨道地板 | [轨道与地板事件](/api/events/track-floor-events.md) |
| 相机滤镜屏幕 | [相机、滤镜与屏幕事件](/api/events/camera-filter-events.md) |
| 装饰对象文本声音 | [装饰、对象、文本与声音事件](/api/events/decoration-object-text-sound-events.md) |
| 输入粒子运行时补充 | 本页 |

后续阶段 7 的文件级覆盖复核仍需要回扫每个 `ffx*` 文件名，补充未被上述专题吸收的旧式官方关卡效果组件。
