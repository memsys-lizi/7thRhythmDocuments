# API 入口

本页作为 ADOFAI 源码 API 文档的入口。当前已完成核心骨架和关卡数据模型，正在推进编辑器系统阶段。

## 计划中的核心 API 页

| 分组 | 计划页面 | 覆盖类型 |
| --- | --- | --- |
| 核心入口 | [ADOBase](/api/core/ADOBase.md)、[ADOClass](/api/core/ADOClass.md)、[ADOStartup](/api/core/ADOStartup.md) | 全局访问器、启动流程、平台初始化、资源初始化 |
| 场景控制 | [scrController](/api/core/scrController.md)、[scrConductor](/api/core/scrConductor.md)、[scnGame](/api/core/scnGame.md)、[scnEditor](/api/core/scnEditor.md) | 游戏状态、音频时钟、自定义关卡运行、编辑器入口 |
| 轨道与地板 | [scrLevelMaker](/api/core/scrLevelMaker.md)、[scrFloor](/api/core/scrFloor.md)、`Level` | 路径生成、地板对象、官方关卡脚本基类 |
| 关卡数据 | [LevelData](/api/data-models/LevelData.md)、[LevelEvent](/api/data-models/LevelEvent.md)、[LevelEventInfo](/api/data-models/LevelEventInfo.md)、[PropertyInfo](/api/data-models/PropertyInfo.md)、[Property](/api/data-models/Property.md)、[事件类型与属性枚举](/api/data-models/event-metadata-enums.md)、[LevelDataCLS](/api/data-models/LevelDataCLS.md)、[读取结果与序列化](/api/data-models/serialization-validation.md) | `.adofai` 数据、事件对象、属性元数据、事件枚举、属性枚举、关卡选择摘要和序列化 |
| 编辑器控件 | [InspectorPanel](/api/editor/InspectorPanel.md)、[PropertiesPanel](/api/editor/PropertiesPanel.md)、[Property](/api/data-models/Property.md)、[PropertyControl 控件族](/api/editor/property-controls.md) | 属性面板、控件绑定、事件编辑 |
| 编辑器动作 | [ADOFAI.Editor.Actions](/api/editor/editor-actions.md) | 撤销、重做、选择、复制、粘贴、播放、文件、书签和面板动作 |
| 编辑器长流程 | [scnEditor 长流程](/api/editor/scnEditor-workflows.md)、[偏好设置、粒子编辑器与辅助面板](/api/editor/preferences-particle-panels.md)、[编辑器小型 UI 类](/api/editor/editor-ui-widgets.md)、[阶段 3 编辑器系统复核](/api/editor/stage-3-review.md) | 文件打开保存、新建关卡、选择、剪贴板、事件增删、撤销重做、播放预览、辅助面板、小型 UI 组件和阶段收口 |
| 运行时输入与判定 | [运行时输入与判定](/api/runtime/input-judgement.md)、[控制器状态、暂停与练习流程](/api/runtime/controller-pause-flow.md) | 输入聚合、异步键盘、控制器输入处理、玩家更新、命中判定、地板反馈、状态机、暂停、checkpoint、练习和失败胜利流程 |
| 事件效果 | `ffxPlusBase`、`ffx*Plus`、`ffx*` | 事件执行组件、相机、轨道、装饰、滤镜、声音 |
| 存档与服务 | `Persistence`、`GCS`、`GCNS`、平台 helper、DLC、Steam | 全局状态、存档、平台差异、外部服务 |

## 当前已确认的关键事实

| 类型 | 源码路径 | 作用 |
| --- | --- | --- |
| `ADOBase` | `7thRhythmSource/ADOFAi/ADOBase.cs` | 继承 `RDBaseDll`，提供 `audioManager`、`conductor`、`controller`、`editor`、`customLevel` 等全局访问器，并封装当前场景、平台、关卡类型判断和跳转方法。 |
| `ADOStartup` | `7thRhythmSource/ADOFAi/ADOStartup.cs` | 通过 `RuntimeInitializeOnLoadMethod(BeforeSceneLoad)` 在场景加载前执行，初始化平台、存档、Steam、DLC、事件元数据、输入、音频设置和加载器。 |
| `ADOClass` | `7thRhythmSource/ADOFAi/ADOClass.cs` | 继承 `RDClassDll`，为 `Level` 等普通类提供实例式全局访问器。 |
| `scrController` | `7thRhythmSource/ADOFAi/scrController.cs` | 继承 `StateBehaviour`，使用 `States` 管理开始、倒计时、checkpoint、玩家控制、失败和胜利状态。 |
| `scrConductor` | `7thRhythmSource/ADOFAi/scrConductor.cs` | 继承 `ADOBase`，管理歌曲 AudioSource、DSP 时间、BPM、节拍传播、hitsound、hold sound 和校准预设。 |
| `scnGame` | `7thRhythmSource/ADOFAi/scnGame.cs` | 继承 `ADOBase`，加载 `LevelData`，重建路径，刷新素材，把 `LevelEvent` 应用到地板并准备 VFX。 |
| `scnEditor` | `7thRhythmSource/ADOFAi/scnEditor.cs` | 继承 `ADOBase`，管理编辑器场景、快捷键动作、文件打开保存、选择、撤销重做、事件面板和播放预览。 |
| `scrLevelMaker` | `7thRhythmSource/ADOFAi/scrLevelMaker.cs` | 继承 `ADOBase`，把旧式路径字符串或角度数组生成 `scrFloor` 列表，并计算角度长度、entry time、hold 和多星体显示。 |
| `scrFloor` | `7thRhythmSource/ADOFAi/scrFloor.cs` | 继承 `ADOBase`，表示单块地板，保存角度、时间、判定、视觉、hold、free roam 和运行时事件效果。 |
| `LevelData` | `7thRhythmSource/ADOFAi/ADOFAI/LevelData.cs` | 保存路径数据、角度数据、事件数组、装饰数组和 8 类 settings 事件，并通过属性读取歌曲、关卡、轨道、背景和相机设置。 |
| `LevelEvent` | `7thRhythmSource/ADOFAi/ADOFAI/LevelEvent.cs` | 保存 `floor`、`eventType`、属性字典、禁用字典、可见/锁定状态和事件元数据，并提供类型化读取方法。 |
| `LevelEventInfo` | `7thRhythmSource/ADOFAi/ADOFAI/LevelEventInfo.cs` | 保存事件名、类型、属性定义、分类、执行时机、DLC 限制和分组信息。 |
| `PropertyInfo` | `7thRhythmSource/ADOFAi/ADOFAI/PropertyInfo.cs` | 描述单个事件属性的类型、默认值、控件类型、范围、条件显示和编码规则。 |
| `Property` | `7thRhythmSource/ADOFAi/ADOFAI/Property.cs` | 编辑器属性行组件，持有标签、启用按钮、控件容器和 `PropertyInfo`。 |
| `LevelDataCLS` | `7thRhythmSource/ADOFAi/ADOFAI/LevelDataCLS.cs` | 关卡选择使用的轻量关卡摘要，只解码 `LevelSettings` 和 `SongSettings`。 |
| `LevelArrayConverter` | `7thRhythmSource/ADOFAi/ADOFAI.Serialization/LevelArrayConverter.cs` | `LevelData.Encode()` 使用的 JSON 写入转换器，特殊格式化 `actions` 和 `decorations` 数组。 |
| `InspectorPanel` | `7thRhythmSource/ADOFAi/ADOFAI/InspectorPanel.cs` | 管理编辑器事件 tab、当前事件选择、装饰多选、属性面板显示和事件启用/隐藏按钮。 |
| `PropertiesPanel` | `7thRhythmSource/ADOFAi/ADOFAI/PropertiesPanel.cs` | 根据事件属性元数据创建属性行和具体控件，并把 `LevelEvent` 字段值写入 UI。 |
| `PropertyControl` | `7thRhythmSource/ADOFAi/ADOFAI.LevelEditor.Controls/PropertyControl.cs` | 编辑器属性控件基类，负责控件文本、枚举设置、输入校验、启用状态和对路径/地板变化的回写。 |
| `PropertyControl_*` | `7thRhythmSource/ADOFAi/ADOFAI.LevelEditor.Controls/*.cs` | 文本、开关、颜色、文件、向量、列表、滤镜、导出、评分、说明和粒子播放控件族。 |
| `EditorAction` | `7thRhythmSource/ADOFAi/ADOFAI.Editor.Actions/EditorAction.cs` | 编辑器动作基类，定义快捷键分组、描述键和 `Execute(scnEditor)`。 |
| `EditorPreferencesMenu` | `7thRhythmSource/ADOFAi/ADOFAI.Editor.Preferences/EditorPreferencesMenu.cs` | 编辑器偏好设置弹窗主控制器，生成分类和偏好字段。 |
| `ParticleEditor` | `7thRhythmSource/ADOFAi/ADOFAI.Editor.ParticleEditor/ParticleEditor.cs` | `AddParticle` 事件的分组属性编辑器和粒子预览面板。 |
| `FindCommentPanel` | `7thRhythmSource/ADOFAi/ADOFAI.Editor.Panels/FindCommentPanel.cs` | 根据注释文本搜索并跳转地板。 |
| `SaveStateScope` | `7thRhythmSource/ADOFAi/SaveStateScope.cs` | `scnEditor` 状态保存区间，构造时可调用 `SaveState`，并用 `changingState` 防止嵌套状态切换。 |
| `LevelEventButton` | `7thRhythmSource/ADOFAi/ADOFAI/LevelEventButton.cs` | 编辑器事件栏按钮，负责点击添加事件、筛选事件和收藏事件。 |
| `RDColorPickerPopup` | `7thRhythmSource/ADOFAi/ADOFAI/RDColorPickerPopup.cs` | 颜色选择弹窗，连接 Hex、RGBA、色板、透明度和属性控件接口。 |
| `TransformGizmoHolder` | `7thRhythmSource/ADOFAi/TransformGizmoHolder.cs` | 编辑器 gizmo 手柄集合基类，负责手柄位置、旋转、hover 动画和图标切换。 |
| `GradientEditor` | `7thRhythmSource/ADOFAi/ADOFAI.Editor.Components.Gradients/GradientEditor.cs` | 渐变弹窗编辑器，管理颜色 marker、alpha marker、预览、模式、撤销重做和弹窗动画。 |
| `EditorKeybindManager` | `7thRhythmSource/ADOFAi/ADOFAI.Editor/EditorKeybindManager.cs` | 编辑器快捷键管理器，把 `EditorKeybind` 映射到一组 `EditorAction` 并执行按下的动作。 |
| `RDInput` | `7thRhythmSource/ADOFAi/RDInput.cs` | 运行时输入聚合层，统一普通键盘、鼠标、摇杆和异步键盘输入。 |
| `AsyncInputManager` | `7thRhythmSource/ADOFAi/AsyncInputManager.cs` | SkyHook 异步输入管理器，维护事件队列和按键集合，并在 PlayerControl 状态接管键盘输入。 |
| `States` | `7thRhythmSource/ADOFAi/States.cs` | `scrController` 使用的状态枚举，包含 Start、Countdown、Checkpoint、PlayerControl、Fail、Fail2、Won。 |
| `PauseMenu` | `7thRhythmSource/ADOFAi/PauseMenu.cs` | 暂停菜单控制器，负责显示暂停界面、设置、玩家选择、练习入口、关卡切换和恢复游戏。 |
