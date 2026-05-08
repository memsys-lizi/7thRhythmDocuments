# 阶段 3 编辑器系统复核

## 复核范围

| 项 | 内容 |
| --- | --- |
| 复核阶段 | 阶段 3：编辑器系统 |
| 源码范围 | `7thRhythmSource/ADOFAi` 中与编辑器、Inspector、属性控件、编辑器动作、编辑器面板、小型 UI、gizmo、编辑器工具相关的主工程类 |
| 复核结果 | 阶段 3 主要编辑器入口、长流程、属性控件、动作系统、辅助面板、小型 UI 组件、渐变控件、键位管理和工具类均已归档到文档页面。 |
| 下一阶段 | 阶段 4：运行时游戏系统 |

本页用于收口阶段 3，记录已经归类的编辑器类族，以及不继续在阶段 3 展开的边界。后续如果在文件级覆盖阶段发现小型编辑器类漏项，应回链到本页或 [编辑器小型 UI 类](/api/editor/editor-ui-widgets.md)。

## 已完成页面

| 页面 | 覆盖重点 |
| --- | --- |
| [scnEditor](/api/core/scnEditor.md) | 编辑器主场景入口、字段、生命周期和核心协作对象。 |
| [scnEditor 长流程](/api/editor/scnEditor-workflows.md) | 打开、保存、新建、状态保存、选择、剪贴板、事件增删、撤销重做、播放预览。 |
| [InspectorPanel](/api/editor/InspectorPanel.md) | 事件 tab、Inspector 显隐、当前事件选择、装饰多选和面板刷新。 |
| [PropertiesPanel](/api/editor/PropertiesPanel.md) | 属性行生成、属性控件选择、事件字段写入 UI、装饰多选合并。 |
| [PropertyControl 控件族](/api/editor/property-controls.md) | 基础输入控件、文件控件、复合数值控件、列表控件、高级滤镜动态控件。 |
| [ADOFAI.Editor.Actions](/api/editor/editor-actions.md) | 编辑器快捷键动作、文件动作、选择动作、复制粘贴、播放、书签和面板切换。 |
| [偏好设置、粒子编辑器与辅助面板](/api/editor/preferences-particle-panels.md) | 偏好设置菜单、粒子编辑器、查找注释面板。 |
| [编辑器小型 UI 类](/api/editor/editor-ui-widgets.md) | 事件按钮、分类 tab、Inspector tab、颜色选择器、列表项、gizmo、练习时间线。 |
| [编辑器主入口](/modules/editor-main.md) | 编辑器场景主线和核心协作关系。 |
| [编辑器事件与属性面板](/modules/editor-property-panels.md) | 事件元数据到属性面板的生成链路。 |
| [编辑器动作系统](/modules/editor-actions.md) | 编辑器动作分组和动作到 `scnEditor` 的调用关系。 |
| [编辑器辅助面板](/modules/editor-auxiliary-panels.md) | 偏好设置、粒子编辑器和查找注释模块边界。 |
| [编辑器长流程](/modules/editor-workflows.md) | 文件、状态、选择、剪贴板、事件写入、撤销重做和播放预览流程图。 |
| [编辑器小型 UI 组件](/modules/editor-ui-widgets.md) | 小型 UI 类的模块边界、协作图和阶段 3 边界。 |

## 编辑器类族归档

| 类族 | 代表类型 | 已归档页面 |
| --- | --- | --- |
| 主场景入口 | `scnEditor`、`SaveStateScope` | [scnEditor](/api/core/scnEditor.md)、[scnEditor 长流程](/api/editor/scnEditor-workflows.md) |
| 属性面板 | `InspectorPanel`、`PropertiesPanel`、`Property` | [InspectorPanel](/api/editor/InspectorPanel.md)、[PropertiesPanel](/api/editor/PropertiesPanel.md) |
| 属性控件 | `PropertyControl_*`、`SliderUtils`、`TMP_InputFieldPolyfill` | [PropertyControl 控件族](/api/editor/property-controls.md) |
| 编辑器动作 | `EditorAction`、`SimpleEditorAction`、`CompositeEditorAction`、`ConditionalEditorAction`、各类 `*EditorAction` | [ADOFAI.Editor.Actions](/api/editor/editor-actions.md)、[编辑器动作系统](/modules/editor-actions.md) |
| 辅助面板 | `EditorPreferencesMenu`、`EditorPreferencesTabButton`、`EditorPreferencesControl`、`ParticleEditor`、`FindCommentPanel` | [偏好设置、粒子编辑器与辅助面板](/api/editor/preferences-particle-panels.md) |
| 事件栏与 tab | `LevelEventButton`、`CategoryTab`、`InspectorTab`、`CycleButtons` | [编辑器小型 UI 类](/api/editor/editor-ui-widgets.md) |
| 颜色控件 | `RDColorPickerPopup`、`CUIColorPicker`、`AlphaSlider`、`IColorPickerData`、`ColorField` | [编辑器小型 UI 类](/api/editor/editor-ui-widgets.md)、本页“渐变与基础控件补充” |
| 列表项 | `ListItem`、`ListItem_Decoration`、`ListItem_Event`、`AdofaiEventTrigger` | [编辑器小型 UI 类](/api/editor/editor-ui-widgets.md) |
| Gizmo | `EditorGizmo`、`TransformGizmo`、`TransformGizmoHolder`、`DecoTransformGizmoHolder`、`PanelTransformGizmoHolder`、`DecorationPivot` | [编辑器小型 UI 类](/api/editor/editor-ui-widgets.md) |
| 轻量 UI | `KeyIndicator`、`FloorDirectionButton`、`scrShortcutText`、`PracticeTimeline`、`FPSCounter`、`DynamicallyOrderedFont` | [编辑器小型 UI 类](/api/editor/editor-ui-widgets.md) |
| 编辑器工具 | `RDEditorUtils`、`EditorWebServices`、`EditorDifficultySelector`、`EditorSpeedIndicator`、`EditorSelectTarget` | 本页“编辑器工具补充” |

## 渐变与基础控件补充

| 类型 | 源码路径 | 行为 |
| --- | --- | --- |
| `GradientEditor` | `ADOFAI.Editor.Components.Gradients/GradientEditor.cs` | 渐变弹窗编辑器；初始化颜色 marker、alpha marker、预览、颜色字段、时间字段、alpha 字段和模式下拉；支持拖拽 marker、添加 marker、撤销重做快照和弹窗动画。 |
| `GradientField` | `ADOFAI.Editor.Components.Gradients/GradientField.cs` | 渐变字段控件；点击按钮时把当前 `Gradient` 交给 `GradientEditor`，编辑完成后更新预览并触发 `valueChanged`。 |
| `GradientMarker` | `ADOFAI.Editor.Components.Gradients/GradientMarker.cs` | 渐变关键点 UI；左键触发选择，右键触发删除，背景颜色表示选中状态。 |
| `GradientMarkerLine` | `ADOFAI.Editor.Components.Gradients/GradientMarkerLine.cs` | 渐变 marker 轨道；鼠标按下时把 `PointerEventData` 传给 `onClick`。 |
| `GradientGenerator` | `ADOFAI.Editor.Components.Gradients/GradientGenerator.cs` | 生成 600 x 60 的 `Texture2D`，逐像素调用 `gradient.Evaluate` 写入 `RawImage`。 |
| `SerializedGradient` | `ADOFAI.Editor.Models/SerializedGradient.cs` | 把 Unity `Gradient` 与可 JSON 序列化的 color keys、alpha keys、mode 互相转换。 |
| `SerializedMinMaxGradient` | `ADOFAI.Editor.Models/SerializedMinMaxGradient.cs` | 解码粒子系统用的颜色、双颜色、渐变、双渐变和随机颜色，并转换为 `ParticleSystem.MinMaxGradient`。 |
| `ColorField` | `ADOFAI.Editor.Components/ColorField.cs` | 基础颜色字段，内部 `PickerData` 实现 `IColorPickerData`，连接输入框、示例颜色、颜色弹窗和变化事件。 |
| `Switch` | `ADOFAI.Editor.Components/Switch.cs` | 开关控件；点击按钮切换 bool，使用 DOTween 移动 handle 并改变背景色，再触发 `onToggle`。 |
| `MinMaxControl` | `ADOFAI.Editor.Components/MinMaxControl.cs` | 起止数值控件；从两个 `DraggableNumberInputField` 读取表达式计算结果，支持 clamp 和 range 关系，并通过 `onChange` 输出二元组。 |
| `DraggableNumberInputField` | `ADOFAI.Editor.Components/DraggableNumberInputField.cs` | 可拖拽数值输入框；鼠标按下后按水平或垂直轴计算数值变化，支持 clamp、格式化小数和拖拽事件。 |

这些控件属于编辑器输入层。它们和 `PropertyControl_*` 的区别是：`PropertyControl_*` 面向关卡事件属性，以上类可以作为更基础的 UI 组件被偏好设置、粒子编辑器或其它面板复用。

## 编辑器键位补充

| 类型 | 源码路径 | 行为 |
| --- | --- | --- |
| `EditorKeybindManager` | `ADOFAI.Editor/EditorKeybindManager.cs` | 保存 `Dictionary<EditorKeybind, List<EditorAction>>`；支持注册、移除和遍历键位；`ExecutePressedActions` 会执行第一个按下键位绑定的全部动作并返回 `true`。 |
| `EditorKeybind` | `ADOFAI.Editor/EditorKeybind.cs` | 保存 `KeyModifier`、`KeyCode` 和 `ctrlIsCmd`；提供 `IsPressed`、`IsReleased`、`IsHeld`，并用当前 Shift、Control、Alt、BackQuote 状态匹配修饰键掩码。 |
| `KeyModifier` | `ADOFAI.Editor/KeyModifier.cs` | `[Flags]` 枚举：`None`、`Shift`、`Control`、`Alt`、`BackQuote`。 |

`EditorKeybindManager.ExecutePressedActions` 只要执行到一组按键动作就返回 `true`，不会继续扫描后续键位。这一点决定了同一帧内多个快捷键同时命中时的执行顺序由字典枚举顺序决定。

## 编辑器工具补充

| 类型 | 源码路径 | 行为 |
| --- | --- | --- |
| `RDEditorUtils` | `RDEditorUtils.cs` | 编辑器静态工具类；包含鼠标是否在屏幕边缘、Hex 颜色校验、Vector2/Tile/filter properties 编码、基础类型和数组解码、文件选择器、日志目录与平台相关辅助。 |
| `EditorWebServices` | `EditorWebServices.cs` | 编辑器 Web 服务组件；`LoadAllArtists` 和 `GetArtists` 从远端 JSON 拉取认证艺术家列表，失败时切换备用地址，并解码为 `ArtistData[]`。 |
| `EditorDifficultySelector` | `EditorDifficultySelector.cs` | 编辑器难度选择控件；点击循环 `GCS.difficulty`，写入 `Persistence.SetDefaultDifficulty`，更新本地化文字和 bullseye 图标；播放预览时可通过 `SetChangeable(false)` 隐藏和禁用。 |
| `EditorSpeedIndicator` | `EditorSpeedIndicator.cs` | 编辑器快捷播放速度控件；`LessSpeed`、`MoreSpeed` 调整 `Persistence.shortcutPlaySpeed`，Shift 按住时步长为 1，否则为 10，范围 1 到 1000。 |
| `EditorSelectTarget` | `EditorSelectTarget.cs` | 枚举：`Floor`、`Decoration`，用于区分编辑器选择目标。 |
| `EditorDecorationManager` | `EditorDecorationManager.cs` | 空 `MonoBehaviour`，`Start` 和 `Update` 为空。 |
| `NXManager_Editor` | `NXManager_Editor.cs` | 编辑器相关平台管理类，阶段 6 平台服务阶段再归档。 |

`EditorWebServices.GetArtists` 使用的主地址是 `s3.pub1.infomaniak.cloud/.../adofai_artists.json`，连接错误时改用 `7thbeat.sgp1.digitaloceanspaces.com/.../adofai_artists.json`。解析成功后会填充 `ArtistData.id`、`name`、`nameLowercase`、`evidenceURLs`、`link1`、`link2` 和 `approvalLevel`。

## 运行时交界类

| 类型 | 源码路径 | 阶段归属 |
| --- | --- | --- |
| `ActionEntry` | `ActionEntry.cs` | 运行时事件调度轻量数据，阶段 4 或阶段 5 继续说明。 |
| `ActionEntryArg` | `ActionEntryArg.cs` | 带参数的运行时事件调度轻量数据，阶段 4 或阶段 5 继续说明。 |
| `InputAction` | `InputAction.cs` | 输入动作枚举，阶段 4 输入系统继续说明。 |
| `PracticeTimeline` | `PracticeTimeline.cs` | 已在小型 UI 页面说明暂停菜单练习时间线；其与 checkpoint、练习模式和播放状态的关系可在阶段 4 暂停/练习流程中再次回链。 |

阶段 3 不继续深写 `ActionEntry`、`ActionEntryArg` 和 `InputAction`，因为它们是运行时调度和输入系统的一部分，不属于编辑器面板的主流程。

## 阶段 3 收口结论

| 检查项 | 结果 |
| --- | --- |
| 编辑器主入口 | 已覆盖 `scnEditor` 和长流程。 |
| 编辑器数据写入 | 已覆盖 `InspectorPanel`、`PropertiesPanel`、`PropertyControl_*` 和 `LevelEvent` 写入链路。 |
| 编辑器动作 | 已覆盖 `ADOFAI.Editor.Actions` 和键位管理器。 |
| 编辑器辅助面板 | 已覆盖偏好设置、粒子编辑器、查找注释和基础控件。 |
| 编辑器小型 UI | 已覆盖事件按钮、tab、颜色选择、列表项、gizmo、快捷键提示和练习时间线。 |
| 阶段边界 | 运行时输入、判定、事件效果、平台服务、关卡选择和菜单系统转入后续阶段。 |

阶段 3 可以收口为已完成。下一步进入阶段 4，优先补运行时输入、控制器状态机细节、判定、暂停/练习流程、相机和 VFX 的运行路径。

## 相关页面

- [编辑器主入口](/modules/editor-main.md)
- [编辑器长流程](/modules/editor-workflows.md)
- [编辑器小型 UI 组件](/modules/editor-ui-widgets.md)
- [ADOFAI.Editor.Actions](/api/editor/editor-actions.md)
- [PropertyControl 控件族](/api/editor/property-controls.md)
