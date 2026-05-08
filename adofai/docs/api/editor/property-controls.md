# PropertyControl 控件族

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 源码目录 | `7thRhythmSource/ADOFAi/ADOFAI.LevelEditor.Controls` |
| 命名空间 | `ADOFAI.LevelEditor.Controls` |
| 核心基类 | `PropertyControl : ADOBase` |
| 主要职责 | 为编辑器属性面板提供具体输入控件，把 UI 输入写回 `LevelEvent`，并触发路径、地板、背景、装饰和粒子预览刷新。 |

`PropertyControl_*` 是 [PropertiesPanel](/api/editor/PropertiesPanel.md) 生成属性 UI 时实际挂载的控件族。`PropertiesPanel.RenderControl()` 根据 [PropertyInfo](/api/data-models/PropertyInfo.md) 的 `PropertyType` 选择控件预制体，并把 `propertyInfo`、`propertiesPanel` 和 `propertyTransform` 写入控件。

## 控件文件清单

| 文件 | 主要类型 | 作用 |
| --- | --- | --- |
| `PropertyControl.cs` | `PropertyControl` | 控件基类，提供文本、选择项、启用状态、显示状态、路径刷新和粒子预览刷新入口。 |
| `PropertyControl_Text.cs` | `PropertyControl_Text` | 文本、整数、浮点和部分 Tile 数值输入。 |
| `PropertyControl_Toggle.cs` | `PropertyControl_Toggle` | 枚举和字符串下拉/按钮组。 |
| `PropertyControl_Bool.cs` | `PropertyControl_Bool` | 布尔开关按钮组。 |
| `PropertyControl_Color.cs` | `PropertyControl_Color` | 十六进制颜色输入与颜色选择弹窗。 |
| `PropertyControl_File.cs` | `PropertyControl_File` | 音频、图片、视频文件选择与清空。 |
| `PropertyControl_Vector2.cs` | `PropertyControl_Vector2` | 双输入二维向量。 |
| `PropertyControl_Tile.cs` | `PropertyControl_Tile` | 地板编号和 `TileRelativeTo` 组合输入。 |
| `PropertyControl_FloatPair.cs`、`PropertyControl_FloatPairBase.cs` | `PropertyControl_FloatPair` | 双浮点范围或数值对输入。 |
| `PropertyControl_Vector2Range.cs` | `PropertyControl_Vector2Range` | 二维向量范围输入。 |
| `PropertyControl_MinMaxGradient.cs` | `PropertyControl_MinMaxGradient` | 粒子颜色/渐变模式输入。 |
| `PropertyControl_List.cs` | `PropertyControl_List` | 事件和装饰列表控件基类，处理搜索、虚拟列表、拖拽和多选。 |
| `PropertyControl_DecorationsList.cs` | `PropertyControl_DecorationsList` | 装饰列表、装饰搜索、隐藏/锁定全部和新增装饰按钮。 |
| `PropertyControl_EventsList.cs` | `PropertyControl_EventsList` | 普通事件列表、事件搜索和删除多选事件。 |
| `PropertyControl_FilterProperties.cs` | `PropertyControl_FilterProperties` | 根据 CameraFilterPack 滤镜字段动态生成高级滤镜属性控件。 |
| `PropertyControl_Export.cs` | `PropertyControl_Export` | 打开导出窗口，必要时先加载艺术家数据。 |
| `PropertyControl_Rating.cs` | `PropertyControl_Rating` | 星级评分输入。 |
| `PropertyControl_Note.cs` | `PropertyControl_Note` | 显示属性说明文本。 |
| `PropertyControl_ParticlePlayback.cs` | `PropertyControl_ParticlePlayback` | 粒子播放相关控件。 |
| `PropertyControlRightClickHandler.cs` | `PropertyControlRightClickHandler` | 控件右键处理器。 |
| `PropertyControl_Slider.cs` | `PropertyControl_Slider` | 滑杆属性输入。 |

## PropertyControl 基类

| 成员 | 类型 | 行为 |
| --- | --- | --- |
| `propertyInfo` | `PropertyInfo` | 当前控件对应的属性元数据。 |
| `propertiesPanel` | `PropertiesPanel` | 控件所属属性面板。 |
| `propertyTransform` | `RectTransform` | 属性行的 RectTransform。 |
| `rectTransform` | `RectTransform` | 控件自身布局。 |
| `randomControl` | `PropertyControl` | 随机值控件引用。 |
| `selectables` | `virtual List<Selectable>` | 返回 Tab 导航使用的可选 UI。 |
| `text` | `virtual string` | 控件文本值。 |
| `OnRightClick()` | `virtual void` | 右键行为。 |
| `ValidateInput()` | `virtual void` | 输入校验。 |
| `Setup(bool addListener)` | `virtual void` | 控件初始化和事件监听绑定。 |
| `EnumSetup(...)` | `virtual void` | 枚举控件初始化。 |
| `SetRandomLayout()` | `virtual void` | 随机值布局调整。 |
| `OnSelectedEventChanged(LevelEvent levelEvent)` | `virtual void` | 选中事件变化回调。 |

### 基类状态刷新

| 方法 | 行为 |
| --- | --- |
| `OnValueChange()` | 如果粒子编辑器处于激活状态，调用 `particleEditor.UpdatePreview()`，并刷新粒子编辑器所有 tab 中控件的启用状态。 |
| `ToggleOthersEnabled()` | 对 `LevelSettings` 中的艺术家授权相关字段做特殊启用判断，然后刷新同面板其他属性控件。 |
| `UpdateEnabled()` | 调用 `PropertyInfo.CheckIfEnabled()` 和 `CheckIfShown()`，再交给 `SetEnabled()`。 |
| `SetEnabled(bool enabled, bool shown = true)` | 设置子级文本颜色、`Selectable.interactable`、滑杆透明度、`propertyInfo.isEnabled` 和显示状态。 |
| `SetShown(bool shown)` | 根据属性是否 `invisible` 设置属性行显示。 |
| `ApplyTileChanges()` | 如果属性影响路径，重建路径并刷新装饰；如果影响地板，调用 `ApplyEventsToFloors()`。 |

## 基础输入控件

| 控件 | 写回行为 |
| --- | --- |
| `PropertyControl_Text` | `onEndEdit` 中校验输入，按 `PropertyType.Int`、`Float`、`String`、`Tile` 转换后写入当前 `LevelEvent`。`floor` 会写入事件 `floor` 字段。 |
| `PropertyControl_Toggle` | `SelectVar()` 根据属性类型写入枚举值、字符串下拉值或 `TileRelativeTo`。 |
| `PropertyControl_Bool` | 两个按钮写入布尔值，并更新按钮选中背景和文本颜色。 |
| `PropertyControl_Color` | `ColorField.onChange` 写入颜色字符串，并按事件类型刷新背景或装饰。 |
| `PropertyControl_Rating` | 点击星级按钮写入整数评分，星星颜色按难度区间切换。 |
| `PropertyControl_Note` | `Setup()` 从 `propertyInfo.noteKey` 读取本地化说明文本，不写回事件。 |

`PropertyControl_Text` 支持简单表达式输入：浮点和整数解析失败时会用 `DataTable.Compute()` 尝试计算表达式，再通过 `PropertyInfo.Validate()` 限制范围。

## 文件控件

`PropertyControl_File` 根据 `PropertyInfo.fileType` 处理音频、图片和视频：

| 文件类型 | 行为 |
| --- | --- |
| `Audio` | 打开音频选择器；选择 mp3 时设置 `ADOBase.editor.songToConvert` 并显示 `OggEncode` 弹窗；其他音频直接写入事件并更新歌曲与关卡设置。 |
| `Image` | 写入事件后按事件类型刷新背景、装饰、粒子、轨道或背景贴图。 |
| `Video` | 写入事件后启用 `customLevel.videoBG`，设置 URL，停止并重新准备视频。 |

如果关卡尚未保存，文件控件会按文件类型显示“保存后导入”的弹窗。右键清空时会把事件字段置为空，并按文件类型刷新歌曲、背景、装饰或视频对象。

## 向量与复合数值控件

| 控件 | 行为 |
| --- | --- |
| `PropertyControl_Vector2` | 管理 x/y 两个输入框；空字符串和 `NaN` 互转；校验时调用 `PropertyInfo.Validate(Vector2)`。 |
| `PropertyControl_Tile` | 组合 `PropertyControl_Text` 和 `PropertyControl_Toggle`，形成 `Tuple<int, TileRelativeTo>`。 |
| `PropertyControl_FloatPair` | 使用 `MinMaxControl` 读写 `Tuple<float, float>`，保存时更新事件并刷新装饰。 |
| `PropertyControl_Vector2Range` | 管理两个二维向量范围，供 `Vector2Range` 属性使用。 |
| `PropertyControl_MinMaxGradient` | 管理颜色、渐变和 `ParticleSystemGradientMode`，并保存 `SerializedMinMaxGradient`。 |

`PropertyControl_Vector2` 对 `AddDecoration` 的 `tile` 属性有特殊处理：x/y 会被四舍五入成整数。对于 `PositionTrack`、`FreeRoam`、`FreeRoamTwirl`、`FreeRoamRemove`、`FreeRoamWarning`，保存后会重新应用事件到地板，并在单选时更新地板按钮画布位置。

## 列表控件

`PropertyControl_List` 是事件列表和装饰列表的基类，负责搜索、虚拟列表、拖拽、多选和键盘导航。

| 成员或方法 | 行为 |
| --- | --- |
| `itemsReorderable` | 控制列表项是否允许拖拽重排。 |
| `isDraggingItems`、`isDraggingOverItemMiddle` | 静态拖拽状态。 |
| `filteredEvents` | 当前搜索过滤后的事件列表。 |
| `shownItems` | 当前可见的列表项。 |
| `Start()` | 绑定清空搜索、显示标签切换和搜索输入，并设置列表尺寸与占位文本。 |
| `Update()` | 处理 Alt 或按钮显示标签、上下键选择、Home/End 跳转、拖拽结束和删除按钮可用状态。 |
| `LateUpdate()` | 根据父容器高度调整自身尺寸，滚动或视口变化时刷新可见项。 |
| `RefreshItemsList()` | 延迟刷新列表。 |
| `RefreshScrollRectPosition(LevelEvent levelEvent)` | 延迟滚动到指定事件。 |

`PropertyControl_DecorationsList` 增加装饰专用能力：

| 功能 | 行为 |
| --- | --- |
| 新增装饰按钮 | `Awake()` 根据 `decorationButtonTypes` 创建按钮，点击后添加对应装饰并选中。 |
| 搜索过滤 | 支持 `floor:`、`tag:`、`type:`；`type:` 支持 image、text、particle 等装饰类型关键字。 |
| 全部隐藏/锁定 | 使用 `toggleHideAllButton`、`toggleLockAllButton` 和对应图标状态。 |
| 列表更新 | `OnDecorationUpdate()` 设置延迟刷新标记。 |

`PropertyControl_EventsList` 是普通事件列表：

| 功能 | 行为 |
| --- | --- |
| 删除按钮 | 调用 `ADOBase.editor.DeleteMultiSelection()`。 |
| 搜索过滤 | 支持 `floor:`、`tag:`、`type:`，未使用过滤键时按事件类型名和 tag 搜索。 |
| 列表更新 | `OnEventsUpdate()` 设置延迟刷新标记。 |

## 高级滤镜控件

`PropertyControl_FilterProperties` 用于 `SetFilterAdvanced`：

1. 从当前事件的 `filter` 属性取滤镜类型名。
2. 使用 `Type.GetType($"{filter}, Assembly-CSharp-firstpass")` 找到滤镜类型。
3. 反射读取 public instance 字段。
4. 只为 `int`、`float`、`Color`、`Vector2` 字段生成属性控件。
5. 根据 `RangeAttribute` 设置范围和滑杆。
6. 把动态控件插入到 `propertiesPanel`，并维护 `levelEvent.data`、`disabled` 和 `propertySelectables`。
7. 清理已经不属于当前滤镜的旧动态控件。

这个控件说明高级滤镜属性不是固定写死在事件元数据中，而是由滤镜类型的字段在运行时反射生成。

## 导出与特殊控件

| 控件 | 行为 |
| --- | --- |
| `PropertyControl_Export` | 点击导出按钮；如果 `EditorWebServices.artists` 尚未加载，先显示 loading 文本并调用 `LoadAllArtists()`，完成后打开导出窗口。 |
| `PropertyControl_ParticlePlayback` | 在 `PropertiesPanel.SetProperties()` 中会接收当前事件对应的 `scrParticleDecoration`。 |
| `PropertyControlRightClickHandler` | 为控件提供右键入口，实际行为由控件的 `OnRightClick()` 实现。 |

## 与编辑器状态的关系

大多数控件保存时都会使用 `SaveStateScope(ADOBase.editor)`，因此输入修改会进入编辑器撤销/重做系统。写回事件后，控件通常会调用：

| 调用 | 作用 |
| --- | --- |
| `ToggleOthersEnabled()` | 刷新同面板属性启用状态。 |
| `ApplyTileChanges()` | 根据属性元数据刷新路径或地板事件。 |
| `ADOBase.customLevel.SetBackground()` | 背景设置变化后刷新背景。 |
| `ADOBase.editor.UpdateDecorationObject()` | 装饰事件变化后刷新装饰对象。 |
| `OnValueChange()` | 刷新粒子编辑器预览和粒子编辑器控件启用状态。 |

## 相关类型

| 类型 | 关系 |
| --- | --- |
| [PropertiesPanel](/api/editor/PropertiesPanel.md) | 根据 `PropertyInfo` 创建具体 `PropertyControl`。 |
| [InspectorPanel](/api/editor/InspectorPanel.md) | 提供当前选中的 `LevelEvent`。 |
| [PropertyInfo](/api/data-models/PropertyInfo.md) | 决定控件类型、范围、单位、启用条件和影响路径/地板的标记。 |
| [LevelEvent](/api/data-models/LevelEvent.md) | 控件最终读写的数据对象。 |

