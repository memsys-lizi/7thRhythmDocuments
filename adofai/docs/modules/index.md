# 模块入口

ADOFAI 文档按源码模块组织。模块页面负责解释系统边界、核心流程和关键类型，API 页面负责展开字段、属性和方法。

## 模块规划

| 模块 | 范围 | 重点问题 |
| --- | --- | --- |
| [核心启动与全局访问](/modules/core-startup.md) | `ADOStartup`、`ADOBase`、`ADOClass` | 游戏启动时初始化了哪些系统，全局对象从哪里取。 |
| [平台、存档与全局状态模块](/modules/platform-persistence-services.md) | `GCS`、`GCNS`、`Persistence`、`ADOFAI.Common.Platform`、Steam、DLC、Analytics、GameServices | 跨场景状态、存档字段、平台差异、服务初始化、DLC 状态、Workshop、云存档和统计上传。 |
| [运行时控制器状态机](/modules/runtime-controller.md) | `scrController`、`States` | 游戏状态机、暂停、关卡跳转和控制器协作对象。 |
| [自定义关卡运行主线](/modules/custom-level-runtime.md) | `scnGame`、`LevelData`、`scrLevelMaker`、`scrFloor`、`ffxPlusBase` | `.adofai` 数据怎样变成运行时地板、装饰、音频和 VFX。 |
| [官方关卡脚本运行模块](/modules/runtime-official-level-scripts.md) | `Level`、`LevelML`、`LevelTNO`、`ffxCallMethod`、`TaroBGScript` | 官方关卡脚本的运行路径、反射方法入口和大型关卡节拍演出脚本。 |
| [编辑器主入口](/modules/editor-main.md) | `scnEditor`、`EditorAction`、`InspectorPanel`、`PropertiesPanel` | 编辑器启动、文件操作、选择、播放预览和面板协作。 |
| [音频与节拍运行时](/modules/audio-beat-runtime.md) | `scrConductor`、`CalibrationPreset`、`AudioManager`、`AsyncInputManager` | DSP 时间、BPM、偏移、音频输出、节拍传播和预排声音。 |
| [路径生成与地板运行时](/modules/path-floor-runtime.md) | `scrLevelMaker`、`scrFloor`、`scrLevelMaker2`、`FloorRenderer` | 路径数据怎样生成地板，地板怎样承载事件和判定状态。 |
| [关卡数据模型](/modules/level-data-model.md) | `LevelData`、`LevelEvent`、`LevelEventInfo`、`PropertyInfo`、`LevelDataCLS`、序列化转换器 | `.adofai` 文件怎样映射到运行时对象，以及关卡选择摘要怎样读取 settings。 |
| [编辑器事件与属性面板](/modules/editor-property-panels.md) | `InspectorPanel`、`PropertiesPanel`、`Property`、`PropertyControl_*` | 事件元数据怎样生成编辑器控件，控件怎样写回 `LevelEvent`。 |
| [编辑器动作系统](/modules/editor-actions.md) | `ADOFAI.Editor.Actions` | 快捷键、菜单动作、撤销重做、复制粘贴和选择流程。 |
| [编辑器辅助面板](/modules/editor-auxiliary-panels.md) | `EditorPreferencesMenu`、`ParticleEditor`、`FindCommentPanel` | 偏好设置、粒子编辑器和查找注释面板。 |
| [编辑器长流程](/modules/editor-workflows.md) | `scnEditor`、`SaveStateScope`、`LevelState`、`FloorData` | 文件打开保存、新建关卡、状态保存、选择、剪贴板、事件增删、撤销重做和播放预览。 |
| [编辑器小型 UI 组件](/modules/editor-ui-widgets.md) | `LevelEventButton`、`CategoryTab`、`InspectorTab`、`RDColorPickerPopup`、`ListItem_*`、`TransformGizmoHolder` | 事件栏、tab、颜色选择器、列表项、快捷键提示、地板方向按钮、练习时间线和 gizmo；阶段 3 收口见 [阶段 3 编辑器系统复核](/api/editor/stage-3-review.md)。 |
| [运行时输入与判定链路](/modules/runtime-input-judgement.md) | `RDInput`、`AsyncInputManager`、`scrController`、`scrPlayer`、`scrPlanet`、`scrMisc` | 普通输入、异步输入、玩家更新、命中判定、输入限制和地板反馈。 |
| [控制器、暂停与练习流程](/modules/runtime-controller-pause.md) | `scrController`、`States`、`PauseMenu`、`PracticeTimeline`、`scrMistakesManager` | 状态机、暂停、checkpoint 淡入、PlayerControl、练习模式、胜利和失败流程。 |
| [相机与 VFX 运行时](/modules/runtime-camera-vfx.md) | `scrCamera`、`scrVfxPlus`、`ffxPlusBase`、相机与滤镜效果 | 相机跟随、自由相机、缩放、旋转、VFX 调度、视频背景、scrub、滤镜、闪屏、震屏和 Bloom。 |
| [结算与成绩保存模块](/modules/runtime-results-save.md) | `scrMarginTracker`、`scrMistakesManager`、`DetailedResults`、`EndscreenLanterns`、`scrFailBar` | 命中统计、准确率、完成度、官方与自定义关卡保存、详细结果、灯笼和失败条。 |
| [场景流转与加载模块](/modules/runtime-scene-loading.md) | `scrLoader`、`PortalTravelAction`、`EnterLevel`、`LoadCustomLevel`、`ResetCustomLevel`、`scrUIController` | 传送门分发、官方关卡解析、自定义关卡路径、跨场景黑场加载和场景内重置。 |
| [运行时效果族模块](/modules/runtime-effect-families.md) | `ffxMoveFloorPlus`、`ffxRecolorFloorPlus`、`ffxMoveDecorationsPlus`、`ffxSetObjectPlus`、`ffxSetTextPlus`、`ffxPlaySound`、`ADOFAI.FloorFX` | 地板、装饰、对象、文本、声音、帧率、输入事件和粒子效果。 |
| [事件到效果调度模块](/modules/event-effect-dispatch.md) | `LevelEventType`、`scnGame.ApplyEventsToFloors`、`scnGame.ApplyEvent`、`ffxPlusBase`、`scrVfxPlus` | `LevelEventType` 怎样映射到运行时效果组件，普通时间调度与手动触发怎样分流。 |
| [轨道与地板事件模块](/modules/track-floor-events.md) | `SetSpeed`、`Twirl`、`MoveTrack`、`RecolorTrack`、`AnimateTrack`、`Checkpoint`、`FreeRoam` | 轨道和地板事件怎样写入 `scrFloor`，以及怎样生成地板 tween、轨道动画和 checkpoint 效果。 |
| [相机、滤镜与屏幕事件模块](/modules/camera-filter-events.md) | `MoveCamera`、`Flash`、`SetFilter`、`SetFilterAdvanced`、`HallOfMirrors`、`ShakeScreen`、`Bloom`、`ScreenTile`、`ScreenScroll` | 相机、滤镜、闪屏、震屏、Bloom、屏幕平铺和滚动事件怎样写入运行时组件。 |
| [装饰、对象、文本与声音事件模块](/modules/decoration-object-text-sound-events.md) | `MoveDecorations`、`SetObject`、`SetText`、`SetDefaultText`、`PlaySound`、`AddComponent`、`KillPlayer` | 装饰、对象装饰、文本、HUD 文案、声音、动态组件和条件死亡事件怎样执行。 |
| [输入、粒子与剩余运行时事件模块](/modules/input-particle-runtime-events.md) | `SetInputEvent`、`SetFrameRate`、`ScalePlanets`、`SetHitsound`、`SetHoldSound`、`SetParticle`、`EmitParticle` | 输入事件、帧率、星球缩放、命中声音、hold 声音和粒子效果怎样执行。 |
| [UI、菜单与关卡选择](/api/platform/cls-level-select-mobile-localization.md) | `scnLevelSelect`、`LevelSelectBase`、`scnCLS`、`OptionsPanelsCLS`、`CustomLevelTile`、`MobileMenu`、`RDString` | 关卡选择、CLS、菜单面板、移动端 UI 和本地化入口。 |
| [UI、服务辅助类与依赖接入](/api/platform/ui-service-dependencies.md) | `Notification`、`ImportLevelsCLS`、`SettingsMenu`、`RDStringToUIText`、`Rewired`、`ByteSheep.Events`、`BlendModes`、`MonsterLove.StateMachine`、`TMPro.Examples` | 通知、导入、设置、平台条件开关、本地化 UI 和第三方依赖在 ADOFAI 中的使用入口。 |
| [文件级覆盖清单](/api/review/source-coverage.md) | `7thRhythmSource/ADOFAi/**/*.cs` | 统计 1222 个源码文件、归类顶层目录和未命中文件族，并规划阶段 7 的补齐顺序。 |
