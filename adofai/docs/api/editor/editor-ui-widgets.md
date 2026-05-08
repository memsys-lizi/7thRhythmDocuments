# 编辑器小型 UI 类

## 基本信息

| 项 | 内容 |
| --- | --- |
| 主要源码路径 | `7thRhythmSource/ADOFAi/ADOFAI`、`7thRhythmSource/ADOFAi`、`7thRhythmSource/ADOFAi/ADOFAI.Editor.Interfaces` |
| 相关类型 | `LevelEventButton`、`CategoryTab`、`InspectorTab`、`CycleButtons`、`EventIndicator`、`KeyIndicator`、`FloorDirectionButton`、`RDColorPickerPopup`、`CUIColorPicker`、`AlphaSlider`、`ListItem`、`EditorGizmo`、`TransformGizmo` |
| 所属阶段 | 编辑器系统 |
| 主要职责 | 补齐编辑器中不适合独立成大型页面的小型 UI 组件：事件栏按钮、分类 tab、事件 tab、快捷键提示、颜色选择器、列表项、地板方向按钮和 gizmo。 |

这些类多数是 Unity 组件脚本。它们不保存完整关卡数据，而是把鼠标、键盘、输入框和按钮事件转发给 `scnEditor`、`InspectorPanel`、`PropertyControl_List`、`scrDecorationManager` 或关卡数据对象。

## 事件栏与分类

| 类型 | 源码路径 | 继承/接口 | 职责 |
| --- | --- | --- | --- |
| `LevelEventButton` | `ADOFAI/LevelEventButton.cs` | `ADOBase`，`IPointerEnterHandler`，`IPointerExitHandler`，`IPointerClickHandler` | 编辑器事件栏上的事件按钮。 |
| `CategoryTab` | `ADOFAI/CategoryTab.cs` | `ADOBase`，`IPointerClickHandler`，`IPointerEnterHandler`，`IPointerExitHandler` | 事件分类栏 tab。 |
| `InspectorTab` | `ADOFAI/InspectorTab.cs` | `ADOBase`，`IPointerClickHandler` | Inspector 里的事件或 settings tab。 |
| `CycleButtons` | `CycleButtons.cs` | `ADOBase` | 同一地板多个同类型事件之间的上一个/下一个切换按钮。 |

### LevelEventButton

| 成员 | 行为 |
| --- | --- |
| `Init(LevelEventType type, int pageNum = 0, int keyCode = 0)` | 保存页号、事件类型和快捷键号，从 `GCS.levelEventsInfo` 读取事件元数据，从 `GCS.levelEventIcons` 读取图标，并注册按钮点击回调。 |
| `enableButton` | 写入时根据启用状态把基础颜色设为白色或灰色半透明，并重新刷新 hover 视觉。 |
| `OnClicky()` | 启用状态下，按住 Ctrl 或 Meta 时调用 `ADOBase.editor.FilterEventType(type)`；否则调用 `ADOBase.editor.AddEventAtSelected(type)`；随后刷新筛选显示。 |
| `OnPointerEnter` / `OnPointerExit` | 更新 `pointInButton`，并在启用时切换图标透明度和 `eventPickerText`。 |
| `ShowAsFiltered(bool filtered)` | 筛选中时把图标颜色设为青色；取消筛选时恢复普通选择显示。 |
| `OnPointerClick(PointerEventData eventData)` | 右键点击时，如果当前分类是 Favorites 则移除收藏，否则添加收藏。 |

`LevelEventButton` 不直接创建 `LevelEvent`，真正的事件添加由 `scnEditor.AddEventAtSelected` 完成。按钮自身只负责识别点击方式、收藏操作、筛选状态和图标提示。

### CategoryTab

| 成员 | 行为 |
| --- | --- |
| `Init(LevelEventCategory category)` | 保存分类，设置图标为 `GCS.eventCategoryIcons[category]`，把按钮名称设为分类名，并初始化未选中状态。 |
| `OnPointerClick` | 调用 `ADOBase.editor.SetCategory(levelEventCategory)`。 |
| `OnPointerEnter` / `OnPointerExit` | 在 `ADOBase.editor.categoryText` 显示或清空本地化分类名。 |
| `SetSelected(bool selected)` | 用 DOTween 调整背景锚点、按钮颜色和图标透明度；选中时显示分类名。 |

`CategoryTab` 只切换事件栏分类，不决定哪些事件可以显示。事件按钮集合由 `scnEditor.LoadEditorProperties` 根据 `GCS.levelEventsInfo` 和事件分类生成。

### InspectorTab 与 CycleButtons

| 类型 | 成员 | 行为 |
| --- | --- | --- |
| `InspectorTab` | `Init(LevelEventType type, InspectorPanel panel)` | 设置图标、按钮名称、所属面板；非 settings 类型会横向翻转 tab 和循环按钮。 |
| `InspectorTab` | `OnPointerClick(PointerEventData eventData)` | 左键会显示或隐藏 Inspector，或切换选中事件类型；右键在 floor panel 中调用 `ADOBase.editor.RemoveEventAtSelected(levelEventType)`。 |
| `InspectorTab` | `SetSelected(bool selected)` | 未选中时重置 `eventIndex`；当单选地板且同类型事件数量超过 1 时显示 `CycleButtons`；用 DOTween 调整 tab 尺寸、位置和透明度。 |
| `CycleButtons` | `CycleEvent(bool next)` | 读取当前 tab 的 `eventIndex` 和 `levelEventType`，通过 `ADOBase.editor.GetSelectedFloorEvents` 找到同类型事件列表，循环更新索引并调用 `panel.ShowPanel`。 |

`InspectorTab` 是事件 tab、settings tab 和删除入口的共同组件。`CycleButtons` 只在同地板同类型事件超过一个时出现，负责同类型事件内部切换。

## 地板、事件和快捷键指示

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `EventIndicator` | `ADOFAI/EventIndicator.cs` | 显示地板上的事件图标，并根据 `angleOffset` 判断该指示器是否可编辑。 |
| `KeyIndicator` | `ADOFAI/KeyIndicator.cs` | 显示键位提示，并在按键按下且当前没有 UI Selectable 获得焦点时改变颜色。 |
| `FloorDirectionButton` | `ADOFAI/FloorDirectionButton.cs` | 编辑器底部方向按钮，按普通或删除模式切换文本、图标、hitbox 和按钮颜色。 |
| `scrShortcutText` | `scrShortcutText.cs` | 快捷键列表中的文本行，把修饰键和 KeyCode 转成本地化说明。 |

### EventIndicator

| 成员 | 行为 |
| --- | --- |
| `Init(LevelEvent baseEvent, scrFloor baseFloor, int order)` | 保存事件、地板和顺序，设置图标；读取 `angleOffset`，计算地板角度移动量，超出可编辑范围时把 `editable` 设为 `false` 并改变圆圈颜色；最后按地板 entry angle 和事件偏移设置旋转。 |
| `LateUpdate()` | 让圆圈保持世界正向；如果当前事件被 Inspector 选中，使用编辑器的 `vfxIconColor`，否则使用黑色；根据事件 active 状态设置透明度，并调整图标和圆圈 sorting order。 |

`EventIndicator` 只显示指示器状态，不负责修改事件。是否可编辑由初始化时的角度边界计算得到。

### KeyIndicator

| 成员 | 行为 |
| --- | --- |
| `LateUpdate()` | 检查 `keyCodeA` 和 `keyCodeB` 是否按下；如果当前选中对象是 `Selectable`，则不显示激活色；否则根据按键状态切换 `graphics` 颜色。 |
| `SetKeyCode(KeyCode newKeyA, KeyCode newKeyB = KeyCode.None)` | 设置两个 KeyCode；Space 和 Tab 会写入固定文本并可替换边框图片，Shift 写入 `Shift`，其它按键使用 `ToString()`。 |

### FloorDirectionButton

| 成员 | 行为 |
| --- | --- |
| `Start()` | 调用 `Init()`。 |
| `Init()` | 让文本和删除图标角度归零；用 `btnType.ToString().Replace("BackQuote", "")` 设置显示文本；根据 `delete` 选择普通或删除配色、长短按钮图、hitbox 尺寸，并切换普通文本、shift 文本和删除图标显示。 |

## 颜色选择器

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `IColorPickerData` | `ADOFAI.Editor.Interfaces/IColorPickerData.cs` | 颜色选择器和属性控件之间的接口。 |
| `RDColorPickerPopup` | `ADOFAI/RDColorPickerPopup.cs` | 颜色选择弹窗，连接 Hex 输入、RGBA 输入、色板、透明度和弹窗动画。 |
| `CUIColorPicker` | `CUIColorPicker.cs` | 通过 hue 条和 saturation/value 面板计算结果颜色。 |
| `AlphaSlider` | `AlphaSlider.cs` | 同步透明度 slider 和 `CUIColorPicker.Color.a`。 |

### IColorPickerData

| 成员 | 含义 |
| --- | --- |
| `text` | 颜色文本，弹窗隐藏时会被写回。 |
| `usesAlpha` | 是否使用 Alpha 通道。 |
| `sample` | 用于显示当前颜色的 `Image`。 |
| `SetPickerPosition(RDColorPickerPopup popup)` | 控件决定弹窗位置。 |
| `OnHide(string value)` | 弹窗隐藏后接收最终颜色文本。 |

### RDColorPickerPopup

| 成员 | 行为 |
| --- | --- |
| `Awake()` | 缓存 `RectTransform`；监听 Hex 输入变化，合法且聚焦时更新 `lastValidColor` 和 `cuiColorPicker.Color`；给 RGBA 输入注册 end edit 回调。 |
| `Update()` | 没有 RGBA 输入框聚焦时，把 Hex 颜色同步到 RGBA 输入；Hex 输入框未聚焦时，把 `cuiColorPicker.Color` 写回 Hex。 |
| `SetResultColorFromRGBAInputs(TMP_InputField currentRGBAInput)` | RGBA 输入聚焦时把空值和越界值修正到 0 到 255，再把四个输入值合成 `Color` 写给 `cuiColorPicker.Color`。 |
| `Show(IColorPickerData propertyControl_Color)` | 保存接口对象，根据 `usesAlpha` 显示或隐藏透明度控件、调整尺寸和输入长度；设置起始颜色、结果 Image、弹窗位置和遮罩层，并播放显示动画。 |
| `Hide()` | 如果弹窗激活，把最终颜色写回接口对象，调用 `OnHide(Color)`，再播放隐藏动画。 |
| `Animate(bool show)` | 用 DOTween 缩放显示或隐藏，动画结束后设置对象激活状态。 |

### CUIColorPicker 与 AlphaSlider

| 类型 | 成员 | 行为 |
| --- | --- | --- |
| `CUIColorPicker` | `Color` | 属性写入时调用 `Setup(value)`，重新创建色条、色板和拖拽逻辑。 |
| `CUIColorPicker` | `SetOnValueChangeCallback(Action<Color> onValueChange)` | 保存颜色变化回调。 |
| `CUIColorPicker` | `SetRandomColor()` | 随机生成 RGB 并写入 `Color`。 |
| `CUIColorPicker` | `OnEnable()` | 把结果 Image 设为 `startColor`，并同步 alpha slider。 |
| `AlphaSlider` | `UpdateResultAlpha()` | 把 slider 值写入 `cuiColorPicker.Color.a`。 |
| `AlphaSlider` | `UpdateAlphaSlider()` | 把 slider 值同步为 `cuiColorPicker.Color.a`。 |

`CUIColorPicker.Setup` 会用 HSV 计算 hue 和 saturation/value 面板，鼠标按下时进入 hue 拖拽或色板拖拽状态，拖拽时更新 knob 位置、结果颜色和回调。

## 列表项

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `ListItem` | `ADOFAI/ListItem.cs` | 装饰列表和事件列表的基类。 |
| `ListItem_Decoration` | `ADOFAI/ListItem_Decoration.cs` | 装饰列表条目，显示名称、tag、类型图标、可见按钮和锁定按钮。 |
| `ListItem_Event` | `ADOFAI/ListItem_Event.cs` | 事件列表条目，显示事件类型名和事件图标。 |
| `AdofaiEventTrigger` | `AdofaiEventTrigger.cs` | 统一转发 pointer、drag 和 move 事件给委托字段。 |

### ListItem

| 成员 | 行为 |
| --- | --- |
| `Awake()` | 给 floor 按钮注册选择地板回调；把 `AdofaiEventTrigger` 的点击、按下、拖拽、进入和离开事件转交给 `PropertyControl_List`。 |
| `SetEvent(LevelEvent ev)` | 保存源事件，校验 floor id；根据 `relativeTo` 判断是否显示 floor 按钮和 floor 文本；刷新 tag 显示和选中状态。 |
| `IsSelected()` | 判断源事件是否在 `ADOBase.editor.selectedDecorations` 中。 |
| `ShowItemTag(bool show)` | 在名称/类型图标和 tag 文本/tag 图标之间切换。 |
| `SetSelectedState(bool selected)` | 调用 `ShowSelectionBackground`。 |
| `SelectFloorButton()` | 校验 floor id 后调用 `ADOBase.editor.SelectFloor`。 |

### ListItem_Decoration 与 ListItem_Event

| 类型 | 成员 | 行为 |
| --- | --- | --- |
| `ListItem_Decoration` | `Awake()` | 指向 `ADOBase.editor.propertyControlDecorationsList`，注册可见按钮和锁定按钮回调，缓存按钮颜色倍率。 |
| `ListItem_Decoration` | `LateUpdate()` | 根据 `sourceLevelEvent.visible` 和 `locked` 更新图标；根据 `scrDecoration.forceHide` 和 `forceLock` 调整按钮颜色倍率。 |
| `ListItem_Decoration` | `SetEvent(LevelEvent ev)` | 获取对应 `scrDecoration`，设置名称、tag、Transform 名称和装饰类型图标。 |
| `ListItem_Decoration` | `SelectItemButton()` | Shift 按住时调用 `propertyControlList.SelectItemsInRange`；否则通过装饰索引调用 `ADOBase.editor.SelectDecoration`。 |
| `ListItem_Decoration` | `PowerButton()` / `LockButton()` | 调用 `ADOBase.editor.ShowEvent` 和 `ADOBase.editor.LockEvent` 切换可见与锁定。 |
| `ListItem_Event` | `SetEvent(LevelEvent ev)` | 指向 `ADOBase.editor.propertyControlEventsList`，设置事件类型名、对象名和事件图标。 |

## Gizmo 系统

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `EditorGizmo` | `ADOFAI/EditorGizmo.cs` | gizmo 基类，按编辑器相机正交尺寸缩放 gizmo。 |
| `DecorationPivot` | `ADOFAI/DecorationPivot.cs` | 单选装饰时把 pivot 十字移动到装饰 pivot 位置。 |
| `TransformGizmo` | `ADOFAI/TransformGizmo.cs` | 单个拖拽手柄，保存方向、hover 状态和手柄类型。 |
| `TransformGizmoHolder` | `TransformGizmoHolder.cs` | 手柄集合基类，负责手柄位置、旋转、hover 动画和图标切换。 |
| `DecoTransformGizmoHolder` | `DecoTransformGizmoHolder.cs` | 装饰缩放与旋转手柄集合。 |
| `PanelTransformGizmoHolder` | `PanelTransformGizmoHolder.cs` | Inspector 面板宽度拖拽手柄集合。 |

### EditorGizmo、DecorationPivot 和 TransformGizmo

| 类型 | 成员 | 行为 |
| --- | --- | --- |
| `EditorGizmo` | `Awake()` | 缓存 `gizmoTransform` 的初始缩放。 |
| `EditorGizmo` | `LateUpdate()` | 根据 `ADOBase.editor.camera.orthographicSize / 5f` 重新设置 gizmo 缩放。 |
| `DecorationPivot` | `UpdatePivotCrossImage(bool enable)` | 只有单选装饰且对应 `scrDecoration` 存在时显示 pivot 十字，并把位置设为 `decoration.pivotPosVec`。 |
| `TransformGizmo` | `GetDirectionVector()` | 根据 `GizmoPlacement` 返回八方向向量。 |
| `TransformGizmo` | `IsSideGizmo()` | 判断手柄是否为上下左右四个边手柄。 |
| `TransformGizmo` | `OnMouseEnter` / `OnPointerEnter` | 鼠标不在屏幕边缘时，把自己设为 `ADOBase.editor.lastHoveredGizmo`。 |
| `TransformGizmo` | `OnMouseExit` / `OnPointerExit` | 清空 `ADOBase.editor.lastHoveredGizmo`。 |

### TransformGizmoHolder

| 成员 | 行为 |
| --- | --- |
| `Awake()` | 遍历 `handles`，把每个 `TransformGizmo.holder` 指向当前 holder。 |
| `LateUpdate()` | 调用 `UpdateGizmosVisibility()`。 |
| `UpdateGizmosTransform(...)` | 根据中心点、世界尺寸、缩放、旋转、pivot 和视差位置计算每个手柄的位置、旋转、碰撞盒和 hover 动画。 |
| `HandleAnimation(Handle handle)` | 当前手柄被 hover 且不是旋转模式时放大手柄；鼠标离开时缩回。 |
| `ChangeGizmosSprite(GizmoSprite gizmoSprite)` | 在缩放图标和旋转图标之间切换所有手柄。 |

`TransformGizmoHolder` 是抽象类，实际拖拽逻辑由子类实现：`DragStart`、`DragEnd` 和 `Drag` 都是抽象方法。

### DecoTransformGizmoHolder

| 成员 | 行为 |
| --- | --- |
| `Update()` | 编辑关卡时根据 Ctrl 是否按住或旋转是否开始切换旋转/缩放模式，并确保 holder 的本地缩放为 `Vector3.one`。 |
| `LateUpdate()` | 单选装饰存在时，根据装饰 pivot、尺寸、缩放、旋转、pivot offset 和视差位置更新手柄位置。 |
| `DragStart(TransformGizmo handle)` | 读取当前装饰、起始缩放、起始角度、起始尺寸、对侧手柄位置和当前手柄位置。 |
| `DragEnd()` | 结束旋转模式。 |
| `Drag(Vector2 mouseTranslation, Vector2 mouseDelta)` | 单选装饰时，根据 Ctrl 进入旋转，根据 Shift 保持比例，根据 Alt 控制位置补偿；写回事件的 `rotation` 或 `scale`，并调用装饰对象和属性面板刷新。 |
| `Setup(LevelEvent levelEvent)` | 根据装饰事件找到当前 `scrDecoration`，并缓存部分视觉组件。 |
| `UpdateGizmosVisibility()` | 仅在单选 `AddDecoration` 或 `AddParticle`、未锁路径编辑、未锁缩放等条件满足时显示可用手柄；旋转模式下隐藏边手柄。 |

### PanelTransformGizmoHolder

| 成员 | 行为 |
| --- | --- |
| `Awake()` | 要求 `saveName` 非空；读取 `Persistence.generalPrefs` 中保存的面板宽度，并写入父级 `InspectorPanel` 的 `rect`。 |
| `DragStart(TransformGizmo handle)` | 标记拖拽开始并记录面板起始尺寸。 |
| `DragEnd()` | 结束拖拽，并把面板宽度保存到 `Persistence.generalPrefs`。 |
| `Drag(Vector2 mouseTranslation, Vector2 mouseDelta)` | 把鼠标增量转为面板局部坐标，根据锚点方向调整符号，写入经过 `Validate` 限制的面板宽度。 |
| `Validate(float v)` | 把宽度限制在 `minSize` 到 `maxSize`，并在接近 `snapTarget` 宽度时吸附。 |

## 其它轻量 UI

| 类型 | 源码路径 | 行为 |
| --- | --- | --- |
| `PracticeTimeline` | `PracticeTimeline.cs` | 练习模式暂停菜单中的时间线。它根据 `ADOBase.lm.listFloors` 的 entry time 生成时间数组，支持拖拽起止地板、播放片段音频、调整速度、绘制难度波形和写回 `GCS.checkpointNum`、`GCS.practiceLength`、`GCS.currentSpeedTrial`。 |
| `DynamicallyOrderedFont` | `ADOFAI/DynamicallyOrderedFont.cs` | 根据当前 `SystemLanguage` 调整 TMP 字体 fallback 顺序，把对应语言字体移动到 fallback 表首位，再追加额外字体。 |
| `FPSCounter` | `ADOFAI/FPSCounter.cs` | 当 `GCS.showFPS` 为真时启用文本，以 120 个 `Time.unscaledDeltaTime` 样本计算平均 FPS，每秒刷新一次显示。 |

## 相关页面

- [scnEditor 长流程](/api/editor/scnEditor-workflows.md)
- [InspectorPanel](/api/editor/InspectorPanel.md)
- [PropertyControl 控件族](/api/editor/property-controls.md)
- [编辑器小型 UI 组件](/modules/editor-ui-widgets.md)
