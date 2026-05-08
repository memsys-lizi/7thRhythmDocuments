# 模块入口

ADOFAI 文档按源码模块组织。模块页面负责解释系统边界、核心流程和关键类型，API 页面负责展开字段、属性和方法。

## 模块规划

| 模块 | 范围 | 重点问题 |
| --- | --- | --- |
| [核心启动与全局访问](/modules/core-startup.md) | `ADOStartup`、`ADOBase`、`ADOClass` | 游戏启动时初始化了哪些系统，全局对象从哪里取。 |
| 核心全局状态 | `GCS`、`GCNS`、`Persistence` | 哪些状态跨场景保存，哪些字段来自存档和全局常量。 |
| [运行时控制器状态机](/modules/runtime-controller.md) | `scrController`、`States` | 游戏状态机、暂停、关卡跳转和控制器协作对象。 |
| [自定义关卡运行主线](/modules/custom-level-runtime.md) | `scnGame`、`LevelData`、`scrLevelMaker`、`scrFloor`、`ffxPlusBase` | `.adofai` 数据怎样变成运行时地板、装饰、音频和 VFX。 |
| 官方关卡脚本 | `Level`、`LevelML`、`LevelTNO` | 官方关卡脚本的运行路径和特殊逻辑。 |
| [编辑器主入口](/modules/editor-main.md) | `scnEditor`、`EditorAction`、`InspectorPanel`、`PropertiesPanel` | 编辑器启动、文件操作、选择、播放预览和面板协作。 |
| [音频与节拍运行时](/modules/audio-beat-runtime.md) | `scrConductor`、`CalibrationPreset`、`AudioManager`、`AsyncInputManager` | DSP 时间、BPM、偏移、音频输出、节拍传播和预排声音。 |
| [路径生成与地板运行时](/modules/path-floor-runtime.md) | `scrLevelMaker`、`scrFloor`、`scrLevelMaker2`、`FloorRenderer` | 路径数据怎样生成地板，地板怎样承载事件和判定状态。 |
| [关卡数据模型](/modules/level-data-model.md) | `LevelData`、`LevelEvent`、`LevelEventInfo`、`PropertyInfo`、`LevelDataCLS`、序列化转换器 | `.adofai` 文件怎样映射到运行时对象，以及关卡选择摘要怎样读取 settings。 |
| [编辑器事件与属性面板](/modules/editor-property-panels.md) | `InspectorPanel`、`PropertiesPanel`、`Property`、`PropertyControl_*` | 事件元数据怎样生成编辑器控件，控件怎样写回 `LevelEvent`。 |
| [编辑器动作系统](/modules/editor-actions.md) | `ADOFAI.Editor.Actions` | 快捷键、菜单动作、撤销重做、复制粘贴和选择流程。 |
| [编辑器辅助面板](/modules/editor-auxiliary-panels.md) | `EditorPreferencesMenu`、`ParticleEditor`、`FindCommentPanel` | 偏好设置、粒子编辑器和查找注释面板。 |
| 事件效果运行时 | `ffxPlusBase`、`ffx*Plus`、`ffx*`、`ADOFAI.FloorFX` | `LevelEventType` 怎样映射到运行时效果组件。 |
| UI、菜单与关卡选择 | `scnLevelSelect`、`LevelSelectBase`、`CustomLevelTile`、`MobileMenu` | 关卡选择、CLS、菜单面板和移动端 UI。 |
| 平台、存档与服务 | `Persistence`、`ADOFAI.Common.Platform`、Steam、DLC、Analytics | 存档字段、平台差异、服务初始化和 DLC 状态。 |
| 第三方依赖接入 | `Rewired`、`ByteSheep.Events`、`BlendModes`、`TMPro.Examples` | 只说明 ADOFAI 使用入口，不逐项深写第三方源码。 |
