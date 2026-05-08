# 渲染后处理与波形组件

本页补充阶段 7 中剩余的视觉后处理、mesh 生成、波形渲染、频谱显示、credits 滚动和角色选择动画组件。这些类大多挂在 Camera、房间对象、UI 容器或关卡选择场景对象上，负责把输入数据转换为屏幕效果。

## 源码范围

| 类型 | 路径 | 主要职责 |
| --- | --- | --- |
| `ColorSuite` | `RDFucked/Assets/Scripts/Assembly-CSharp/ColorSuite.cs` | Camera 后处理：色温、色调、曲线 LUT、tone mapping、饱和度和 dithering。 |
| `PostEffectsBase` | `RDFucked/Assets/Scripts/Assembly-CSharp/PostEffectsBase.cs` | 后处理基类，检查 shader、材质、HDR、DX11 和深度纹理支持。 |
| `RDHueShift` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDHueShift.cs` | Camera hue shift 后处理。 |
| `RDHueShiftDupe` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDHueShiftDupe.cs` | 与 `RDHueShift` 同结构的 hue shift 组件副本。 |
| `RDImageEffectPixelate` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDImageEffectPixelate.cs` | 像素化后处理和可选背景 Camera 合成。 |
| `RDImageEffectTile` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDImageEffectTile.cs` | 平铺、缩放和偏移后处理。 |
| `RadialBlurDupe` | `RDFucked/Assets/Scripts/Assembly-CSharp/RadialBlurDupe.cs` | Radial blur 后处理副本。 |
| `PrintOnRenderImageFrame` | `RDFucked/Assets/Scripts/Assembly-CSharp/PrintOnRenderImageFrame.cs` | 打印 `OnRenderImage()` 帧信息并原样 blit。 |
| `Perspective2DRoom` | `RDFucked/Assets/Scripts/Assembly-CSharp/Perspective2DRoom.cs` | 2D 房间透视投影换算。 |
| `PolygonWave` | `RDFucked/Assets/Scripts/Assembly-CSharp/PolygonWave.cs` | 多边形波形 mesh 生成。 |
| `PulseGeneral` | `RDFucked/Assets/Scripts/Assembly-CSharp/PulseGeneral.cs` | 按 conductor beat 对对象做 punch scale。 |
| `RDAnimationCurves` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDAnimationCurves.cs` | 以 ScriptableObject 保存命名 AnimationCurve。 |
| `RDWaveManager` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDWaveManager.cs` | Oneshot 波形分配、动画、阴影和 flatten 控制。 |
| `RDWaveRenderer_Polygon` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDWaveRenderer_Polygon.cs` | Polygon pulse wave renderer。 |
| `SimpleSpectrum` | `RDFucked/Assets/Scripts/Assembly-CSharp/SimpleSpectrum.cs` | 音频频谱采样和 bar 可视化。 |
| `OutputVolume` | `RDFucked/Assets/Scripts/Assembly-CSharp/OutputVolume.cs` | RMS 音量采样并输出到 prefab、位置、旋转或缩放。 |
| `SimpleCredits` | `RDFucked/Assets/Scripts/Assembly-CSharp/SimpleCredits.cs` | 按玩家输入翻页的 sprite credits。 |
| `CreditsScroller` | `RDFucked/Assets/Scripts/Assembly-CSharp/CreditsScroller.cs` | 纵向 credits 文本滚动。 |
| `HorizontalCredits` | `RDFucked/Assets/Scripts/Assembly-CSharp/HorizontalCredits.cs` | 从 CSV 生成横向 credits 文本。 |
| `HorizontalMoveAnimator` | `RDFucked/Assets/Scripts/Assembly-CSharp/HorizontalMoveAnimator.cs` | 空 `MonoBehaviour`，`Start()` 与 `Update()` 当前为空。 |
| `ArmSkin` | `RDFucked/Assets/Scripts/Assembly-CSharp/ArmSkin.cs` | 玩家手臂皮肤颜色和 scribble PNG 保存。 |
| `CharacterExpressionGroup` | `RDFucked/Assets/Scripts/Assembly-CSharp/CharacterExpressionGroup.cs` | 按关卡状态和 rank 选择角色表情名。 |
| `SubdivisionCharCenterRotation` | `RDFucked/Assets/Scripts/Assembly-CSharp/SubdivisionCharCenterRotation.cs` | 抵消父级旋转并按屏幕左右翻转 subdivision 角色。 |
| `WalkingSelectableCharacter` | `RDFucked/Assets/Scripts/Assembly-CSharp/WalkingSelectableCharacter.cs` | 关卡选择场景中会走向目标点的角色。 |

## Camera 后处理

| 类型 | 字段或属性 | 生命周期与方法 |
| --- | --- | --- |
| `ColorSuite` | `_colorTemp`、`_colorTint`、`_toneMapping`、`_exposure`、`_saturation`、RGB 曲线、`_ditherMode`、`shader`、`_material`、`_lutTexture` | `Setup()` 创建材质和 `512x1` LUT 纹理；曲线属性 setter 调用 `UpdateLUT()`；`OnRenderImage()` 根据颜色空间、色温色调、tone mapping 和 dithering 设置 shader keyword 后 blit。 |
| `PostEffectsBase` | `supportHDRTextures`、`supportDX11`、`isSupported` | `CheckSupport()` 检查 HDR、DX11、深度纹理；`CheckShaderAndCreateMaterial()` 和 `CreateMaterial()` 复用或创建材质；`NotSupported()` 禁用组件；`DrawBorder()` 用 GL 绘制目标 RenderTexture 边缘。 |
| `RDHueShift` | `SCShader`、`ShaderName`、`Hue`、`SCMaterial` | `Start()` 查找 `Rhythm Doctor/HueShiftOnRenderImage`；`OnRenderImage()` 设置 `_Hue` 和 `_ScreenResolution` 后 blit；`OnDisable()` 销毁材质。 |
| `RDHueShiftDupe` | 同 `RDHueShift` | 代码结构与 `RDHueShift` 相同。 |
| `RDImageEffectPixelate` | `effectShader`、`referenceCamera`、`time`、`screenSize`、背景 Camera 和背景 RT 字段 | `Awake()` 默认用自身 Camera；`Start()` 创建材质；`EnsureBackgroundRT()` 按屏幕尺寸创建 point filter RT；`OnRenderImage()` 支持背景 RT 合成、非整数像素倍率时跳过像素化，以及普通像素化 blit。 |
| `RDImageEffectTile` | `effectShader`、`tileX`、`tileY`、`zoom`、`offsetX`、`offsetY` | `Start()` 创建材质；`OnRenderImage()` 写入 `_TileX`、`_TileY`、`_Zoom`、`_OffsetX`、`_OffsetY` 后 blit；`UpdateState()` 在参数都为默认值时禁用组件。 |
| `RadialBlurDupe` | `Intensity`、`MovX`、`MovY`、`blurWidth`、`ChangeValue*` | `Start()` 查找 `CameraFilterPack/Blur_Radial`；`OnRenderImage()` 更新 `_TimeX`、blur 参数和屏幕尺寸；`OnValidate()` 同步 `ChangeValue*`；运行时 `Update()` 用 `ChangeValue*` 回写实际参数。 |
| `PrintOnRenderImageFrame` | 无公开字段 | `OnRenderImage()` 打印当前 `Time.frameCount` 与对象名，然后 `Graphics.Blit(src, dest)`。 |

`RDImageEffectPixelate.IsNonPixelPerfectResolution()` 使用 `Screen.height / 198f` 判断当前高度是否为 198 的整数倍。背景合成路径里，前景 `src` 会作为 `_OverlayTex` 传给材质。

## 投影与 mesh 生成

| 类型 | 关键字段 | 方法行为 |
| --- | --- | --- |
| `Perspective2DRoom` | `cameraPosition`、`cameraRotation`、`cameraFOV`、`screenRes = 352x198`、`cameraOffset`、`perspectiveOrigin` | `Awake()` 初始化 camera offset 和透视原点；`ApplyPerspective()` 把三维 position/scale 投影到 2D transform，z 小于等于 0、y 小于 0 或 scale 非正时返回 false；`GetProjectedPosition()` 从屏幕位置和屏幕缩放反算投影前位置。 |
| `PolygonWave` | `part`、`sides`、`radius1`、`meshRenderer`、`meshFilter`、缓存列表 | `LateUpdate()` 在 sides、radius 或 part 变化时重建 mesh；`Regen()` 按 `Base`、`Outline`、`Glow` 生成不同顶点、三角形和 vertex color；`color` setter 写入材质颜色。 |
| `SpotlightMesh` | 见 [场景主题与房间组件](/api/runtime/scene-theme-components.md) | 同属于 mesh 生成类，启动时生成三角形聚光灯 mesh。 |

`PolygonWave.Part.Base` 会生成内外圈与中心点，`Outline` 和 `Glow` 会生成四圈多边形。`Glow` 的颜色列表两端透明，中间白色，用于边缘渐变。

## 波形与节拍视觉

| 类型 | 字段或属性 | 方法行为 |
| --- | --- | --- |
| `PulseGeneral` | `initialScale`、`scale`、`conductor` | `Start()` 保存初始 scale 和 conductor；`Update()` 在 `conductor.lastOnBeatFrame == Time.frameCount` 时执行 `DOPunchScale`，完成后恢复初始 scale。 |
| `RDAnimationCurves` | `curves` 数组，元素包含 `name` 和 `AnimationCurve` | `Get(key)` 线性查找同名曲线；找不到时 `Debug.Log("Curve " + key + " not found!")` 并返回 null。 |
| `RDWaveManager` | `ent`、flat/wobble animation、primary/subdiv/all waves、shadows、`waveType`、position override tweens、heldwave 静态参数 | `Awake()` 缓存 shader property id 并合并 wave 数组；`Update()` 先分配/更新 beat wave，再在游戏运行时推进每个 wave；`PlayWobble()` 播放 wobble；`SetPositionOverride()` 和 `SetPositionOverrideLerp()` 用 DOTween 写入 first wave；`ResetShadows()` 初始化 shadow renderer；`HideShadows()`、`FlattenAll()` 批量处理。 |
| `RDWaveRenderer_Polygon` | `sides`、`polygonMain`、`polygonGlow`、`polygonOutline`、`polygonAngle` | `UpdateVisuals()` 根据波形高度设置多边形缩放、边数、材质属性和位置；`LateUpdate()` 控制 main/glow/outline renderer 可见性并按时间旋转；`UpdateColor()` 用 shader data、overlay、black、opacity 和 border color 设置三层颜色。 |

`RDWaveManager.UpdateWaveMechanics()` 遍历 `base.game.beats`，只处理同一 row、未死亡、已经到视觉时间的 `BeatOneshot`。没有 wave 时会先尝试复用 friend 的 wave，再根据 polygon 与 friend 状态在 `subdivWaves` 或 `primaryWaves` 中分配。

## 频谱与音量可视化

| 类型 | 字段或属性 | 方法行为 |
| --- | --- | --- |
| `SimpleSpectrum.SourceType` | `AudioSource`、`AudioListener`、`MicrophoneInput`、`StereoMix`、`Custom` | 数据来源枚举。 |
| `SimpleSpectrum` | 采样参数、bar prefab、频率范围、曲线角度、颜色渐变、内部 spectrum、bars、materials、旧 scale 和颜色缓存 | `Start()` 检查 AudioSource 并 `RebuildSpectrum()`；`RebuildSpectrum()` 删除旧子物体、创建 bar、材质和采样索引；`Update()` 获取 spectrum 数据，按线性或对数频率映射到 bar，再写入本地位置；两个 `GetLogarithmicSpectrumData()` 静态方法分别从 AudioSource 或 AudioListener 读取对数频谱。 |
| `OutputVolume.SourceType` | `AudioSource`、`AudioListener`、`Custom` | 音量来源枚举。 |
| `OutputVolume.OutputType` | `PrefabBar`、`ObjectPosition`、`ObjectRotation`、`ObjectScale` | 输出方式枚举。 |
| `OutputVolume` | 采样、阻尼、输出范围、prefab、颜色渐变和材质字段 | `Start()` 在 prefab bar 模式下实例化 bar 并准备材质；`Update()` 根据来源读取 RMS 或使用 custom 值，再输出到 bar scale、transform position、rotation 或 scale；两个 `GetRMS()` 静态方法分别从 AudioSource 或 AudioListener 取输出数据并求 RMS。 |

`SimpleSpectrum.RestartMicrophone()` 在 `MicrophoneInput`、`StereoMix` 或 `AudioSource` 来源下直接记录 WebGL 不可用的错误信息。`spectrumInputData` 只允许在 `SourceType.Custom` 时设置。

## Credits 与角色选择视觉

| 类型 | 字段或属性 | 方法行为 |
| --- | --- | --- |
| `SimpleCredits` | `index`、`finished`、`sprites`、`image` | `Rewind()` 回到第一张；`Update()` 在任意玩家按下时翻到下一张并播放 `sndHammer`，到末尾后把 `finished` 设为 true。 |
| `CreditsScroller` | `speed`、`finished`、`rt`、`targetPosY` | `Awake()` 缓存 RectTransform；`Start()` 按 Text preferredHeight 计算目标 Y；`OnDisable()` 重置 finished 和位置；`Update()` 根据上下方向键和 control 调整速度并滚动，达到目标后标记完成。 |
| `HorizontalCredits` | `asset`、上下 Text、`colors` | `Populate()` 从 Resources TextAsset 读取 CSV，用 `TextGenerator` 计算字符宽度，把名字分配到 10 行中，交替套用颜色标签，并写入上下两块 Text。 |
| `HorizontalMoveAnimator` | 无公开字段 | `Start()` 和 `Update()` 当前为空。 |
| `ArmSkin` | 颜色、palmLightness、drawing、slot、player、loaded | 构造函数可直接保存颜色，或按玩家和 slot 从 `GC` 默认颜色表初始化；`Load()` 读取 scribble PNG 并从最后几格像素提取颜色；`Save()` 写回 PNG；`GetDrawingPath()` 生成 `scribble<P>_<slot>.png` 路径。 |
| `CharacterExpressionGroup` | `expressionLocked`、`expressionNotPassed`、`expressionPassed`、`expressionPerfect` | `GetExpression(levelState, rank)` 在 rank 未 perfect 时按 `LevelState` 返回 locked/not passed/passed 表情，perfect 时返回 `expressionPerfect`。 |
| `SubdivisionCharCenterRotation` | 无公开字段 | `Update()` 抵消父级和祖父级 Z 旋转，并按对象在屏幕左右位置设置 X scale 为 `1` 或 `-1`。 |
| `WalkingSelectableCharacter` | `character`、walking/tired 表情、day/night destinations、当前目标、tween 和状态 | `Awake()` 注册到 `scnLevelSelect.instance.walkingCharacters`，创建 `scrChar` 和 `CustomAnimation`；`UpdateCharacter()` 选择目标点；`MoveCharacter()` 移动角色并处理目标角色 sprite；`LateUpdate()` 到达目标后按 `CharacterExpressionGroup` 播放表情；`UpdateTiredness()` 控制长时间行走时的 tired 表情和停顿。 |

`WalkingSelectableCharacter.Destination.destEnt` 会优先从 `scnLevelSelect.instance.selectableEntities` 按 id 查找；如果没有 level select 实例，则用 `GameObject.Find(id)` 创建一个临时 `SelectableCharacter`，并把 normal 难度映射到 `Level.Freezeshot`。

## 关系入口

| 相关页面 | 关系 |
| --- | --- |
| [房间与 VFX 系统](/api/runtime/rooms-vfx.md) | Camera、room、VFX preset 和波形渲染的主干系统说明。 |
| [视觉与动画辅助类](/api/runtime/visual-animation-helpers.md) | 动画、后处理和小型视觉组件的前一批整理。 |
| [场景主题与房间组件](/api/runtime/scene-theme-components.md) | 本页的 mesh、转场、灯光和主题组件与场景主题页互补。 |
| [音频运行时](/api/runtime/audio-runtime.md) | `SimpleSpectrum` 和 `OutputVolume` 使用 AudioSource、AudioListener 和 mixer 输出数据。 |
| [枚举与轻量模型补充](/api/data-models/enums-lightweight-models.md) | `SelectableEntity`、`GameResult` 和小型枚举数据与角色选择视觉协作。 |



