# 相机、滤镜与屏幕事件

本页覆盖阶段 5 的相机、滤镜和屏幕效果事件族。它们都通过 `scnGame.ApplyEvent()` 创建 `ffxPlusBase` 子类，并由 `scrVfxPlus` 按歌曲时间调度。

## 源码范围

| 事件 | 组件 | 源码路径 |
| --- | --- | --- |
| `MoveCamera` | `ffxCameraPlus` | `7thRhythmSource/ADOFAi/ffxCameraPlus.cs` |
| `Flash` | `ffxFlashPlus` | `7thRhythmSource/ADOFAi/ffxFlashPlus.cs` |
| `SetFilter` | `ffxSetFilterPlus` | `7thRhythmSource/ADOFAi/ffxSetFilterPlus.cs` |
| `SetFilterAdvanced` | `ffxSetFilterAdvancedPlus` | `7thRhythmSource/ADOFAi/ffxSetFilterAdvancedPlus.cs` |
| `HallOfMirrors` | `ffxHallOfMirrorsPlus` | `7thRhythmSource/ADOFAi/ffxHallOfMirrorsPlus.cs` |
| `ShakeScreen` | `ffxShakeScreenPlus` | `7thRhythmSource/ADOFAi/ffxShakeScreenPlus.cs` |
| `Bloom` | `ffxBloomPlus` | `7thRhythmSource/ADOFAi/ffxBloomPlus.cs` |
| `ScreenTile` | `ffxScreenTilePlus` | `7thRhythmSource/ADOFAi/ffxScreenTilePlus.cs` |
| `ScreenScroll` | `ffxScreenScrollPlus` | `7thRhythmSource/ADOFAi/ffxScreenScrollPlus.cs` |

## `MoveCamera`

`MoveCamera` 创建 `ffxCameraPlus`。这个组件维护相机父物体位置、`scrVfxPlus.camAngle` 和 `scrCamera.zoomSize` 的静态 tween。

### Decode

| 事件属性 | 写入字段 |
| --- | --- |
| `duration` | 使用 `RDUtils.GetRandomFloat(evnt, "duration") * crotchet`。 |
| `position` | 使用 `RDUtils.GetRandomVector2(evnt, "position")`，乘 `controller.tileSize` 后写入 `targetPos`。 |
| `rotation` | 使用 `RDUtils.GetRandomFloat(evnt, "rotation")` 写入 `targetRot`。 |
| `zoom` | 使用 `RDUtils.GetRandomFloat(evnt, "zoom") / 100f` 写入 `targetZoom`。 |
| `ease` | 写入 DOTween ease。 |
| `relativeTo` | 写入 `movementType`。 |
| `dontDisable` | 控制最低视觉效果下是否禁用。 |
| `minVfxOnly` | 写入 `disableIfMaxFx`。 |

`positionUsed`、`rotationUsed`、`zoomUsed`、`movementTypeUsed` 分别来自对应属性是否被禁用。

### StartEffect

`StartEffect()` 会先按已启用属性 kill 旧 tween，再根据 `relativeTo` 计算最终位置：

| `CamMovementType` | 行为 |
| --- | --- |
| `Player` | 如果相机不在 follow mode，会把父物体切换到玩家跟随状态，并调用 `cam.UpdateFollowCam(true)`。 |
| `Tile` | 如果相机在 follow mode，会转为自由相机；最终位置是地板位置加相对偏移。 |
| `Global` | 切到自由相机；最终位置使用全局偏移。 |
| `LastPosition` | 从当前相机父物体位置继续偏移，并叠加当前 `vfx.camAngle`。 |
| `LastPositionNoRotation` | 从当前相机父物体位置继续偏移，不叠加当前角度。 |

最终会分别 tween：

| Tween | 写入 |
| --- | --- |
| `moveXTween` / `moveYTween` | `camParent.position.x/y`。 |
| `rotationTween` | `vfx.camAngle`。 |
| `zoomTween` | `cam.zoomSize`。 |

`ScrubToTime()` 会在最低视觉效果且 `dontDisable` 为 false 时直接标记已触发；`disableIfMaxFx` 且当前视觉效果为 Full 时也会直接跳过。若 scrub 结束后相机处于玩家模式，会调用 `cam.ViewObjectInstant(cam.furthestPlanet.transform)`。

## `Flash`

`Flash` 创建 `ffxFlashPlus`。它使用 `scrCamera` 上的前景或背景 flash renderer。

| 事件属性 | 写入字段 |
| --- | --- |
| `duration` | 乘 `crotchet` 后写入 `duration`。 |
| `startColor` / `endColor` | 写入开始色和结束色。 |
| `startOpacity` / `endOpacity` | 除以 100 后写入颜色 alpha。 |
| `ease` | DOTween ease。 |
| `plane` | `FlashPlane.Foreground` 时写入 `FG = true`。 |

`StartEffect()` 在最低视觉效果下不执行。执行时选择前景或背景 renderer，设置开始颜色，再把 material color tween 到结束颜色。`legacyFlash` 为 true 时使用前景 renderer，并在执行时刷新 layer。

## `SetFilter`

`SetFilter` 创建 `ffxSetFilterPlus`。它只操作 `scrVfxPlus` 维护的 `filterToComp`、`filterCurrIntensity` 和 `filterTween` 字典。

| 事件属性 | 写入字段 |
| --- | --- |
| `filter` | `Filter` 枚举。 |
| `enabled` | 是否启用目标滤镜。 |
| `intensity` | 除以 100 后写入强度。 |
| `disableOthers` | 是否关闭其他滤镜。 |
| `duration` | 乘 `crotchet` 后写入持续时间。 |
| `ease` | DOTween ease。 |

`Awake()` 设置 `hifiEffect = true`，并且除非 `dontDisable` 为 true，否则最低视觉效果会禁用它。`StartEffect()` 会 kill 目标滤镜旧 tween；duration 为 0 时直接设置强度，否则 tween `filterCurrIntensity[filter]`。如果 `disableOthers` 为 true，会 kill 其他滤镜 tween 并禁用其他滤镜组件。

### 强度写入示例

| Filter | 写入组件字段 |
| --- | --- |
| `VHS` | `CameraFilterPackLegacy_Real_VHS.TRACKING = 0.212f * intensity`。 |
| `LED` | `CameraFilterPackLegacy_TV_LED.Size = RoundToInt(5f * intensity)`。 |
| `Waves` | `CameraFilterPackLegacy_Distortion_Wave_Horizontal.WaveIntensity = 10f * intensity`。 |
| `Pixelate` | `CameraFilterPackLegacy_Pixel_Pixelisation._Pixelisation = 4f * intensity`。 |
| `MotionBlur` | 非移动端时写入 `CameraMotionBlur.velocityScale = 0.375f * intensity`。 |
| `Aberration` | `Offset = intensity * 0.04f - 0.02f`。 |
| `Blur` | `Amount = intensity * 2f`。 |
| `Petals` | 调用 `FallingPetals.TogglePetals(true, 6f)`。 |
| `PetalsInstant` | 调用 `FallingPetals.TogglePetals(true, 28f)`。 |

## `SetFilterAdvanced`

`SetFilterAdvanced` 创建 `ffxSetFilterAdvancedPlus`。它通过反射把 `Assembly-CSharp-firstpass` 中的滤镜组件加到目标对象上，并 tween 公开字段。

### 静态状态

| 字段 | 作用 |
| --- | --- |
| `blacklistedFilterKeywords` | 包含 `Blend2Camera_`、`Antialiasing_FXAA`、`Colors_Adjust_PreFilters`，命中时 `StartEffect()` 直接返回。 |
| `planeToCamera` | 将 `FilterPlane.Foreground` 映射到 `scrCamera.instance.camobj`，`Background` 映射到 `scrCamera.instance.BGcam`。 |
| `addedFilters`、`usedFilters`、`modifiedFilters` | 记录每个 GameObject 上新增、使用和修改过的滤镜名。 |
| `filterOriginalValues` | 保存被修改字段的原始值。 |
| `filterFieldTweens` | 保存每个目标、每个滤镜、每个字段的 tween。 |
| `initializedFilters` | 记录已经初始化过的滤镜。 |

### Decode 与 Setup

`Decode()` 读取 `duration`、`ease`、`plane`、`targetTag`、`filter`、`enabled`、`disableOthers`，然后收集所有以 `filter_` 开头且未被禁用的事件属性。当前源码中 `targetType` 被设置为 `FilterTargetType.Camera`，因此 `Setup()` 会以 `plane` 选择前景或背景相机对象作为目标。

`Setup()` 使用 `Type.GetType(filterName + ", Assembly-CSharp-firstpass")` 找到滤镜类型，并读取公开实例字段。目标对象已有该组件时复用组件；没有时 `AddComponent(filterType)` 并先禁用组件。

### StartEffect

`StartEffect()` 会：

| 步骤 | 行为 |
| --- | --- |
| 黑名单 | `filterName` 包含黑名单关键字时直接返回。 |
| 禁用其他 | `disableOthers` 为 true 时调用 `ResetFilters(targetObject, false)`。 |
| 字段筛选 | 只处理 `int`、`float`、`Color`、`Vector2` 类型的公开字段。 |
| 单位换算 | 调用 `RDEditorUtils.FilterFieldToUnit()` 和 `UnitMultiplier()` 处理数值单位。 |
| duration 0 | 直接写字段值。 |
| duration 非 0 | 创建 DOTween，写入 `filterFieldTweens`。 |
| 启用状态 | 最后设置 `monoBehaviour.enabled = enableFilter`，并记录 used / initialized。 |

`OnDestroy()` 会清理新增组件、移除 used 记录、kill 字段 tween，并从 initialized 中移除当前滤镜。

## `HallOfMirrors`

`HallOfMirrors` 创建 `ffxHallOfMirrorsPlus`。`Decode()` 读取 `enabled`，`StartEffect()` 调用 `ADOBase.controller.EnableHallOfMirrors(enableHOM)`。

## `ShakeScreen`

`ShakeScreen` 创建 `ffxShakeScreenPlus`。

| 事件属性 | 写入字段 |
| --- | --- |
| `intensity` | 除以 100 后写入 `intensity`。 |
| `strength` | 除以 100 后写入 `strength`。 |
| `duration` | 乘 `crotchet` 后写入持续时间。 |
| `ease` | DOTween ease。 |
| `fadeOut` | 写入 DOTween shake 的 fadeOut 参数。 |

最低视觉效果或 duration 为 0 时不执行。非线性 ease 会先生成 multiplier：`InOut` ease 先升后降，`Out` ease 从 1 降到 0，其他 ease 从 0 升到 1。最终用 `DOTween.Shake()` 写入 `cam.shake`，结束时把 `cam.shake` 归零。

## `Bloom`

`Bloom` 创建 `ffxBloomPlus`。`Awake()` 缓存主相机上的 `VideoBloom`。

| 事件属性 | 写入字段 |
| --- | --- |
| `enabled` | `videoBloom.enabled`。 |
| `threshold` | 除以 100 后 tween 到 `VideoBloom.Threshold`。 |
| `intensity` | 除以 100 后 tween 到 `VideoBloom.MasterAmount`。 |
| `color` | tween 到 `VideoBloom.Tint`。 |
| `duration` | 乘 `crotchet`。 |
| `ease` | DOTween ease。 |

`StartEffect()` 会 kill threshold、intensity、color 的旧 tween，然后创建三条新 tween。

## `ScreenTile` 与 `ScreenScroll`

| 事件 | 组件 | 行为 |
| --- | --- | --- |
| `ScreenTile` | `ffxScreenTilePlus` | 缓存主相机 `ScreenTile`；duration 为 0 时直接设置 `tileX/tileY`，否则 tween 两个 tile 值；当 tile 都是 1 时禁用组件。 |
| `ScreenScroll` | `ffxScreenScrollPlus` | 缓存主相机 `ScreenScroll`；把事件 `scroll` 除以 100，再乘歌曲 pitch 写入 `screenScroll.scrollSpeed`；两个分量都是 0 时禁用组件。 |

## 与其他页面的关系

| 页面 | 关系 |
| --- | --- |
| [事件执行总览](/api/events/event-execution-overview.md) | 说明这些事件如何由 `ApplyEvent()` 创建并进入 `scrVfxPlus` 调度。 |
| [相机与 VFX 运行链路](/api/runtime/camera-vfx-chain.md) | 展开 `scrCamera`、`scrVfxPlus`、RenderTexture、滤镜字典和相机运行时基础。 |
| [轨道与地板事件](/api/events/track-floor-events.md) | 对照轨道与地板类事件的不同处理路径。 |
