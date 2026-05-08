# ADOFAI 文档进度

## 当前结论

ADOFAI 源码目录当前包含 1222 个 `.cs` 文件。主工程代码大量位于源码根目录，同时存在 `ADOFAI`、`ADOFAI.Editor.Actions`、`ADOFAI.LevelEditor.Controls`、`ADOFAI.FloorFX`、`ADOFAI.Serialization`、`ADOFAI.Common.Platform` 等命名空间目录。第三方或通用依赖包括 `Rewired`、`ByteSheep.Events`、`TMPro.Examples`、`BlendModes`、`MonsterLove.StateMachine` 等。

和 RD 的事件系统不同，ADOFAI 的关卡事件以 `LevelEvent` 数据对象为中心，事件类型由 `LevelEventType` 枚举表示，属性元数据来自 `LevelEventInfo`、`PropertyInfo` 和启动时读取的 `LevelEditorProperties` 资源。运行时效果大量落在 `ffx*Plus`、`ffx*` 和 `ADOFAI.FloorFX` 类族中；编辑器撤销、复制、粘贴、选择和快捷键操作集中在 `ADOFAI.Editor.Actions`。

## 阶段进度

| 阶段 | 状态 | 目标 | 当前记录 |
| --- | --- | --- | --- |
| 阶段 0：文档基础设施与架构侦察 | 已完成 | 建立 docsify 项目、侧边栏、黑白样式、首页、进度页、架构总览和源码地图 | 已确认源码规模和主要类族，已建立文档项目骨架、架构总览、源码地图和初始导航 |
| 阶段 1：核心骨架 | 已完成 | 深写 `ADOBase`、`ADOClass`、`ADOStartup`、`scrController`、`scrConductor`、`scnGame`、`scnEditor`、`scrLevelMaker`、`scrFloor` | 已完成 [ADOBase](/api/core/ADOBase.md)、[ADOClass](/api/core/ADOClass.md)、[ADOStartup](/api/core/ADOStartup.md)、[scrController](/api/core/scrController.md)、[scrConductor](/api/core/scrConductor.md)、[scnGame](/api/core/scnGame.md)、[scnEditor](/api/core/scnEditor.md)、[scrLevelMaker](/api/core/scrLevelMaker.md)、[scrFloor](/api/core/scrFloor.md)、[核心启动与全局访问](/modules/core-startup.md)、[运行时控制器状态机](/modules/runtime-controller.md)、[音频与节拍运行时](/modules/audio-beat-runtime.md)、[自定义关卡运行主线](/modules/custom-level-runtime.md)、[路径生成与地板运行时](/modules/path-floor-runtime.md) 和 [编辑器主入口](/modules/editor-main.md) |
| 阶段 2：关卡数据模型 | 已完成 | 深写 `LevelData`、`LevelEvent`、`LevelEventInfo`、`PropertyInfo`、`Property`、`LevelEventType`、`LevelEventCategory`、`LevelEventExecutionTime`、序列化与校验 | 已完成 [LevelData](/api/data-models/LevelData.md)、[LevelEvent](/api/data-models/LevelEvent.md)、[LevelEventInfo](/api/data-models/LevelEventInfo.md)、[PropertyInfo](/api/data-models/PropertyInfo.md)、[Property](/api/data-models/Property.md)、[事件类型与属性枚举](/api/data-models/event-metadata-enums.md)、[LevelDataCLS](/api/data-models/LevelDataCLS.md)、[读取结果与序列化](/api/data-models/serialization-validation.md) 和 [关卡数据模型](/modules/level-data-model.md)，已覆盖 `.adofai` 文件读取、settings、actions、decorations、事件属性字典、元数据资源解码、字段默认值、编码解码、版本兼容、关卡选择摘要、读取结果和 JSON 写入转换器；下一步进入阶段 3：编辑器系统 |
| 阶段 3：编辑器系统 | 已完成 | 覆盖 `scnEditor`、`InspectorPanel`、`PropertiesPanel`、`PropertyControl_*`、`ADOFAI.Editor.Actions`、偏好设置、粒子编辑器和编辑器面板 | 已完成 [InspectorPanel](/api/editor/InspectorPanel.md)、[PropertiesPanel](/api/editor/PropertiesPanel.md)、[PropertyControl 控件族](/api/editor/property-controls.md)、[ADOFAI.Editor.Actions](/api/editor/editor-actions.md)、[偏好设置、粒子编辑器与辅助面板](/api/editor/preferences-particle-panels.md)、[scnEditor 长流程](/api/editor/scnEditor-workflows.md)、[编辑器小型 UI 类](/api/editor/editor-ui-widgets.md)、[阶段 3 编辑器系统复核](/api/editor/stage-3-review.md)、[编辑器事件与属性面板](/modules/editor-property-panels.md)、[编辑器动作系统](/modules/editor-actions.md)、[编辑器辅助面板](/modules/editor-auxiliary-panels.md)、[编辑器长流程](/modules/editor-workflows.md) 和 [编辑器小型 UI 组件](/modules/editor-ui-widgets.md)，已覆盖事件 tab、属性面板生成、装饰多选合并、控件预制体选择、分组 tab、事件值写入 UI、基础输入控件、文件控件、复合数值控件、列表控件、高级滤镜动态控件、快捷键动作分组、播放保存、选择删除、复制粘贴、书签、面板动作、偏好设置、粒子编辑器、查找注释面板、关卡打开保存、新建关卡、状态保存、地板与装饰选择、事件增删、撤销重做、播放预览、事件栏按钮、分类 tab、Inspector tab、颜色选择器、列表项、快捷键提示、地板方向按钮、练习时间线、gizmo、渐变控件、基础控件、编辑器键位管理和编辑器工具类 |
| 阶段 4：运行时游戏系统 | 已完成 | 覆盖控制器状态机、输入、判定、轨道生成、地板、相机、音频、VFX、暂停、结算和场景流程 | 已完成 [运行时输入与判定](/api/runtime/input-judgement.md)、[运行时输入与判定链路](/modules/runtime-input-judgement.md)、[控制器状态、暂停与练习流程](/api/runtime/controller-pause-flow.md)、[控制器、暂停与练习流程](/modules/runtime-controller-pause.md)、[相机与 VFX 运行链路](/api/runtime/camera-vfx-chain.md)、[相机与 VFX 运行时](/modules/runtime-camera-vfx.md)、[结算、成绩与进度保存](/api/runtime/results-save-flow.md)、[结算与成绩保存模块](/modules/runtime-results-save.md)、[场景流转与加载跳转](/api/runtime/scene-loading-flow.md)、[场景流转与加载模块](/modules/runtime-scene-loading.md)、[运行时效果族补充](/api/runtime/effect-families.md)、[运行时效果族模块](/modules/runtime-effect-families.md)、[官方关卡脚本运行入口](/api/runtime/official-level-scripts.md) 和 [官方关卡脚本运行模块](/modules/runtime-official-level-scripts.md)，覆盖输入判定、状态机、暂停、checkpoint、练习、胜利失败、相机/VFX、结算保存、加载跳转、地板效果、装饰效果、对象效果、文本、声音、帧率、输入事件、粒子效果、`Level` 关卡脚本、`ffxCallMethod` 调用链和 `TaroBGScript` 节拍演出入口；下一步进入阶段 5：事件与效果执行 |
| 阶段 5：事件与效果执行 | 进行中 | 按 `LevelEventType`、`ffxPlusBase`、`ffx*Plus`、`ffx*`、`ADOFAI.FloorFX` 建立事件到运行时效果的对照文档 | 已完成 [事件执行总览](/api/events/event-execution-overview.md)、[事件到效果调度模块](/modules/event-effect-dispatch.md)、[轨道与地板事件](/api/events/track-floor-events.md) 和 [轨道与地板事件模块](/modules/track-floor-events.md)，覆盖 `LevelEventType` 分层、`ApplyEventsToFloors`、`ApplyEvent` 映射、`ffxPlusBase` 字段与生命周期、`PrepVfx`、`scrVfxPlus.Update`、`runOnHit`、`runManually`、条件事件、输入事件、hitbox 触发、`SetSpeed`、`Twirl`、`ColorTrack`、`ChangeTrack`、`AnimateTrack`、`MoveTrack`、`RecolorTrack`、`PositionTrack`、`Hold`、`MultiPlanet`、`FreeRoam`、`Pause`、`AutoPlayTiles`、`Hide`、`ScaleMargin`、`ScaleRadius`、`Multitap`、`TileDimensions`、`SetFloorIcon` 和 `Checkpoint`；下一步拆写相机滤镜或装饰对象事件族 |
| 阶段 6：平台、存档、服务与 UI | 未开始 | 覆盖 `Persistence`、`GCS`、`GCNS`、平台 helper、Steam、DLC、CLS、关卡选择、菜单、移动端 UI 和本地化 | 待写 |
| 阶段 7：文件级覆盖与复核 | 未开始 | 建立 1222 个 `.cs` 文件覆盖清单，补齐未分类文件，复核链接、术语表、调用图和全站一致性 | 待写 |

状态只能使用：`未开始`、`进行中`、`已完成`、`待复核`。

## 自动化继续规则

自动任务每次开始都要先读根目录 `AGENTS.md` 和本页，确认阶段、约束和最新进度；再读取 `7thRhythmSource/ADOFAi` 中当前阶段对应源码，只把源码确认的内容写入中文 docsify 文档。

每轮完成一个子模块后，需要同步维护：

| 文件 | 维护内容 |
| --- | --- |
| `adofai/docs/_sidebar.md` | 新页面导航 |
| `adofai/docs/api/index.md` | API 页面索引 |
| `adofai/docs/modules/index.md` | 模块页面索引 |
| `adofai/docs/progress.md` | 阶段状态和覆盖统计 |
| `AGENTS.md` | 长期规则和阶段概况 |

每轮必须运行 Markdown 表格检查、禁用词检查、docsify 路由检查和 `git status`。每轮都要提交一次 Git，提交信息必须是中文。

## 完成判定

ADOFAI 文档写完的标准是：`7thRhythmSource/ADOFAi` 下几乎所有主工程 `.cs` 文件都已被页面、专题或覆盖索引系统性覆盖；核心类、数据模型、事件效果、编辑器系统、运行时系统、平台服务和 UI 类族均有解释；阶段 0 到阶段 7 均为 `已完成`，且阶段 7 的文件级覆盖清单没有未分类的大块源码文件。

如果自动化任务启动时发现上述条件已经满足，应停止继续写作；如果自动化系统允许删除当前任务，必须删除 ADOFAI 文档自动化任务，避免空转。
