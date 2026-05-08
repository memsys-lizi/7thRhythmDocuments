# 平台输入、第三方边界与剩余工具索引

## 基本信息

本页收口阶段 7 中剩余的平台输入小类、跨平台服务入口、通用图形工具和第三方目录边界。这里的重点是区分 ADOFAI 主工程代码与随项目分发的第三方/示例代码，避免把第三方内部实现误写成 ADOFAI 自有系统。

## Switch 鼠标输入结构

`nn.hid` 目录中剩余文件是 Switch HID 鼠标数据结构，代码本身只定义枚举、句柄和只读状态结构。

| 文件 | 类型 | 源码事实 |
| --- | --- | --- |
| `MouseAttribute.cs` | `nn.hid.MouseAttribute` | `[Flags]` 枚举，包含 `None`、`Transferable`、`IsConnected`。 |
| `MouseButton.cs` | `nn.hid.MouseButton` | `[Flags]` 枚举，包含左键、右键、中键、前进键和后退键。 |
| `MouseHandle.cs` | `nn.hid.MouseHandle` | 结构体，只保存一个 `uint _storage` 字段。 |
| `MouseState.cs` | `nn.hid.MouseState` | 只读结构体，保存采样号、坐标、位移、滚轮、侧滚轮、按钮和属性；`ToString()` 输出位置、位移、滚轮、按钮、属性和采样号。 |

## 平台与服务补充

| 文件 | 类型 | 源码事实 |
| --- | --- | --- |
| `MacUtils.cs` | `MacUtils` | 通过 `DllImport("RDMacPlugin")` 调用原生插件，读取 downloads path，复制 UTF-8 字节并释放插件侧字符串。 |
| `EntitlementsService.cs` | `EntitlementsService` | 启动时读取 Steam player identifier 并请求 entitlement 列表；支持 8 位大写字母数字 redeem code，向 `https://7thbe.at/api/entitlements` 发起 GET/POST 请求。 |
| `SteamManager.cs` | `SteamManager` | Steamworks.NET manager，单例化后 `DontDestroyOnLoad`，执行 packsize/dll check、`SteamAPI.Init()`、warning hook、`SteamAPI.RunCallbacks()` 和 shutdown。 |
| `NXManagerState.cs` | `NXManagerState` | Switch/NX manager 状态枚举，包含 `None`、`Active`、`Inactive`。 |
| `GPGSIds.cs` | `GPGSIds` | Google Play Games Services ID 常量文件，归入移动端服务接入边界。 |
| `PackageInstallerResult.cs` | `PackageInstallerResult` | 包安装结果类型，归入 Android/移动端安装返回值边界。 |
| `ConsoleProDebug.cs` | `ConsoleProDebug` | 调试输出辅助类，归入开发期 console/debug 接入边界。 |

## 图形、碰撞与质量开关工具

| 文件 | 类型 | 源码事实 |
| --- | --- | --- |
| `PostEffectsBase.cs` | `PostEffectsBase` | 图像后处理基类，检查 shader、RenderTexture 格式、DX11 支持和深度纹理需求；不支持时禁用组件；提供 `DrawBorder()` 绘制 RenderTexture 边缘。 |
| `OBBCollision.cs` | `OBBCollision` | 静态 OBB 碰撞工具，计算两个旋转矩形角点、投影轴和投影区间，用分离轴检测判断是否相交。 |
| `TempTextureConverter.cs` | `TempTextureConverter` | MonoBehaviour，保存 `Texture[] texturesToConvert`，`Start()` 和 `Update()` 为空。 |
| `HifiEnabler.cs` | `HifiEnabler` | `Awake()` 中刷新视觉设置，并在 `visualQuality == High` 时启用指定 GameObject 和 MonoBehaviour。 |
| `MaskLightGradient.cs`、`EnvMapAnimator.cs`、`SmoothSR.cs`、`SuperSpriteTrail.cs` | 渲染辅助组件 | 归入根目录视觉渲染辅助文件族，与材质、sprite renderer、trail 或环境贴图动画相关。 |

## 小型演出与 UI 辅助

| 文件 | 类型 | 源码事实 |
| --- | --- | --- |
| `BarFade.cs` | `BarFade` | 从 `NewLife.instance.barAlpha.transform.position.x` 读取 alpha，并写入 SpriteRenderer 材质 `_Color`。 |
| `BarRotate.cs` | `BarRotate` | 读取 `NewLife.instance.camy` 的 z 角和 zoomSize，旋转并按 zoompower 缩放自身。 |
| `EventCircle.cs` | `EventCircle` | 根据左右 Shift 是否按下，在普通 dotted circle 与 precise dotted circle sprite 之间切换。 |
| `Crack.cs` | `Crack` | Neo Cosmos 裂缝演出脚本，控制 `Mawaru_Sprite` 状态、本地化待续文本、音效、屏幕震动和文字顶点 tween。 |
| `Ember.cs` | `Ember` | 非 MonoBehaviour 数据类，保存 `Mawaru_Sprite`、生成时间、生命时间、随机缩放、速度、波动参数和 alive 状态。 |
| `AbsoluteRotationShadow.cs`、`PaintingStretch.cs`、`SpinningPlanets.cs`、`RotateCross.cs`、`RandomRotator3D.cs`、`LegacyRandomRotator3D.cs` | 视觉运动辅助 | 归入根目录小型 transform/视觉运动组件族。 |
| `scrImageFader.cs`、`scrTextFader.cs`、`SmoothScrollRect.cs`、`ListItemPool.cs`、`DropdownSample.cs`、`testdropdowninstantiator.cs` | UI 辅助 | 归入根目录 UI、列表、下拉框和滚动辅助组件族。 |
| `HitSoundOffset.cs`、`HitSoundPreviewPlayer.cs`、`PreviewSongPlayer.cs` | 音频预览辅助 | 归入编辑器或菜单中的 hitsound/song preview 辅助文件族。 |
| `CustomFloorIcon.cs`、`DecorationListFilter.cs`、`EaseGraphRenderer.cs`、`EventCircle.cs` | 编辑器显示辅助 | 归入编辑器视觉提示、装饰过滤和 easing 曲线显示文件族。 |

## 官方演出与测试补项

这些文件属于根目录官方演出、测试背景或示例运动组件，已按文件级别归入阶段 7，后续若要继续压低未命中数，可把同类演出脚本再拆成专题。

| 文件族 | 文件 |
| --- | --- |
| Neo Cosmos / New Life 辅助 | `BBManager.cs`、`BarFade.cs`、`BarRotate.cs`、`Crack.cs`、`GemElevator.cs`、`NewLife` 相关脚本、`OverseerIdle.cs` |
| Sing Sing / Mawaru 演出 | `Mawaru_Goat.cs`、`SingSing_Glider.cs`、`SingSing_Notefield.cs`、`SingSingTutorials.cs` |
| 背景和路径测试 | `TemplateBG.cs`、`MeshTestBG.cs`、`SampleMesh.cs`、`PathGenerator2.cs`、`PathGeneratorOld.cs`、`PathMaker.cs`、`RotateTest.cs`、`SSTSampleMovement.cs` |
| 轨道/地板小模型 | `Segment.cs`、`EntranceTile.cs`、`MultitapTileBehavior.cs`、`FreeroamShape.cs`、`BGShapeType.cs`、`PositionState.cs`、`ColourSchemeHitMargin.cs` |
| 资源和安装辅助 | `RDNote.cs`、`ArtistUISettings.cs`、`FontData.cs`、`SpriteInstantiater.cs`、`LaserSpawner.cs`、`SkipIntroBehavior.cs` |

## 第三方目录边界

以下目录包含随项目分发的第三方库、示例代码或平台安全类型。ADOFAI 文档只记录它们在项目中的接入点，不逐项解释第三方内部类。

| 目录 | 边界说明 | ADOFAI 接入点 |
| --- | --- | --- |
| `Rewired`、`Rewired.UI.ControlMapper`、`Rewired.Integration.UnityUI`、`Rewired.Glyphs`、`Rewired.Localization` | Rewired 输入和 UI 映射库。目录中剩余 `ControlMapper`、glyph、demo、template 和 localization 文件不按 ADOFAI 主工程深写。 | `ADOStartup` 初始化输入，`RDInput` 和 `RDInputType_Joystick` 聚合 Rewired 输入。 |
| `Rewired.Demos`、`Rewired.Demos.CustomPlatform`、`Rewired.Demos.GamepadTemplateUI` | Rewired 示例场景脚本。 | 作为依赖包示例随源码存在，不是 ADOFAI 自有流程。 |
| `ByteSheep.Events` | AdvancedEvent/UnityEvent 扩展库。 | ADOFAI 侧接入点是 `ffxCallFunction` 和 `ffxCallFunctionPlus`。 |
| `TMPro.Examples`、`TMPro` | TextMeshPro 示例和兼容脚本。 | ADOFAI 正式文本入口见 `RDString`、`RDStringToUIText` 和各 UI 文本组件。 |
| `BlendModes` | 混合模式材质/渲染支持。 | ADOFAI 侧接入点为装饰渲染和 `scrDecorationManager.visualDecoShader` 相关材质选择。 |
| `MonsterLove.StateMachine` | 状态机库。 | ADOFAI 侧接入点为 `scrController : StateBehaviour` 和控制器状态机。 |
| `CrazyMinnow.AmplitudeWebGL` | WebGL 音频振幅插件。 | 归入 WebGL/音频平台依赖边界。 |
| `UnityEngine.Purchasing.Security` | Unity IAP 安全校验类型。 | 归入移动端购买/安全依赖边界。 |
| `FlyingWormConsole3`、`Fizzd.Scripts.UnityExtension`、`ADOFAI.DOTweenExt`、`System.Runtime.CompilerServices`、`System.Collections.Generic`、`UnityEngine.UI` | 插件、扩展、兼容或编译器辅助命名空间。 | 只记录为依赖或兼容目录，不作为 ADOFAI 业务系统深写。 |

## 第三方文件族示例

| 目录 | 示例文件 |
| --- | --- |
| `Rewired.UI.ControlMapper` | `ControlMapper.cs`、`ControlMapperInputField.cs`、`ControlMapperThemeData.cs`、`InputBehaviorWindow.cs`、`InputRow.cs`、`MappingSet.cs`、`ThemeSettings.cs` |
| `Rewired.Glyphs` | `GlyphTools.cs`、`GlyphProvider.cs`、`GlyphSet.cs`、`PlayerControllerElementGlyph.cs` |
| `Rewired.Demos` | `ControlRemappingDemo1.cs`、`DualShock4SpecialFeaturesExample.cs`、`PlayerMouseSpriteExample.cs`、`SimpleControlRemapping.cs` |
| `ByteSheep.Events` | `AdvancedEvent.cs`、`AdvancedEventRuntime.cs`、`PersistentCall.cs`、`Parameter.cs`、`SerializableCallback.cs` |
| `TMPro.Examples` | `Benchmark01.cs`、`CameraController.cs`、`ObjectSpin.cs`、`ShaderPropAnimator.cs`、`VertexZoom.cs`、`WarpTextExample.cs` |
| `BlendModes` | `BlendMode.cs`、`BlendModeEffect.cs`、`BlendModeMaterials.cs`、`GrabBlender.cs`、`ShaderFeature.cs` |

## 当前收口判断

主工程的核心类、数据模型、编辑器、运行时、事件效果、平台服务、UI、移动菜单、官方演出、工具类和文件族索引已经建立。剩余未命中主要来自第三方依赖、示例脚本、兼容命名空间和少量根目录小组件；这些文件已经由本页标注边界。下一步应做全站最终复核，确认侧边栏、统计页、术语口径和完成判定是否一致。
