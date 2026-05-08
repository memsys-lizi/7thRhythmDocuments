# PropertiesPanel

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 源码路径 | `7thRhythmSource/ADOFAi/ADOFAI/PropertiesPanel.cs` |
| 命名空间 | `ADOFAI` |
| 类型 | `class PropertiesPanel : ADOBase` |
| 主要职责 | 根据 `LevelEventInfo.propertiesInfo` 创建属性行和具体控件，并把 `LevelEvent` 的字段值写入控件。 |

`PropertiesPanel` 是 Inspector 中每个事件类型的属性容器。它负责创建 [Property](/api/data-models/Property.md) 行、选择对应 `PropertyControl_*` 预制体、处理 Tab 键控件导航、属性启用勾选和分组显示。

## 嵌套结构

| 名称 | 字段 | 作用 |
| --- | --- | --- |
| `PropertySelectable` | `selectable`、`control`、`propertyRef`、`isPropertyCheckbox` | 记录可通过 Tab 键导航的 UI 控件，以及它是否是属性启用复选框。 |

## 字段与属性

| 名称 | 类型 | 作用 |
| --- | --- | --- |
| `layout` | `GridLayoutGroup` | 属性布局。 |
| `scrollRect` | `ScrollRect` | 属性滚动容器。 |
| `content` | `RectTransform` | 属性行挂载容器。 |
| `contentLayout` | `VerticalLayoutGroup` | 属性内容垂直布局。 |
| `viewport` | `RectTransform` | 滚动视口。 |
| `contentSizeFitter` | `ContentSizeFitter` | 内容自适应组件。 |
| `tabButtons` | `Dictionary<string, PropertiesSubTabButton>` | 属性分组按钮。 |
| `properties` | `Dictionary<string, Property>` | 属性名到 `Property` 行的映射。 |
| `levelEventType` | `LevelEventType` | 当前面板对应的事件类型。 |
| `inspectorPanel` | `InspectorPanel` | 所属 Inspector。 |
| `propertySelectables` | `List<PropertySelectable>` | Tab 键导航列表。 |
| `eventSystem` | `EventSystem` | 当前 UI 事件系统。 |
| `dontRenderKeys` | `List<string>` | 不渲染的属性键，当前为 `selectTarget`。 |
| `tabContainer` | `RectTransform` | 分组 tab 容器，可为空。 |
| `selectedTab` | `string` | 当前选中的属性分组名，可为空。 |

## 生命周期

| 方法 | 行为 |
| --- | --- |
| `Awake()` | 从 `content` 获取 `VerticalLayoutGroup`。 |
| `Update()` | 监听 Tab 键，在当前属性控件列表中前后移动焦点。 |

Tab 键导航会跳过当前不可用的属性。按住 Ctrl 或 Shift 时向前移动，否则向后移动。若属性被禁用，只有属性启用复选框仍可被选中。

## 初始化与渲染

| 签名 | 行为 |
| --- | --- |
| `void Init(InspectorPanel panel, LevelEventInfo levelEventInfo)` | 保存所属 Inspector，遍历 `propertiesInfo`，过滤隐藏控件和 Pro 条件后调用 `RenderControl()`。 |
| `void RenderControl(string propertyKey, PropertyInfo propertyInfo)` | 根据 `PropertyType` 和 `PropertyInfo` 选择控件预制体，创建 `Property` 行和 `PropertyControl`，并建立各种引用。 |

`Init()` 会跳过 `dontRenderKeys` 中的属性。`PropertyInfo.controlType == ControlType.Hidden` 的属性不会渲染。Pro 属性只有在编辑器条件或 `Persistence.enableProEvents` 允许时渲染。

## PropertyType 到控件预制体

| 属性类型 | 控件来源 |
| --- | --- |
| `File` | `ADOBase.gc.prefab_controlBrowse` |
| `Int`、`Float`、`String` | 默认 `prefab_controlText`；字符串下拉改用 `prefab_controlToggle`；滑杆属性改用 `prefab_controlSlider`。 |
| `LongString` | `prefab_controlLongText` |
| `Enum` | `prefab_controlToggle` |
| `Color` | `prefab_controlColor` |
| `Bool` | `prefab_controlBool` |
| `Vector2` | `prefab_controlVector2` |
| `Tile` | `prefab_controlTile` |
| `FloatPair` | `prefab_floatPair` |
| `MinMaxGradient` | `prefab_minMaxGradient` |
| `Vector2Range` | `prefab_vector2Range` |
| `Export` | Steam 初始化后使用 `prefab_controlExport`。 |
| `Rating` | `prefab_controlRating` |
| `List` | `decorations` 使用 `prefab_controlDecorationsList`；`events` 使用 `prefab_controlEventsList`。 |
| `FilterProperties` | `prefab_controlFilterProperties` |
| `ParticlePlayback` | `prefab_controlParticlePlayback` |
| `Note` | `prefab_controlNote` |

枚举属性会过滤部分不应显示的值：`Ease.Unset`、`Ease.INTERNAL_Zero`、`Ease.INTERNAL_Custom` 不加入列表；装饰事件不显示 `DecPlacementType.LastPosition`；`ObjectDecorationType.PlayerBubble` 只有开发状态下显示；`PropertyInfo.enumExceptions` 中的枚举值也会被排除。

## 特殊控件逻辑

| 属性 | 行为 |
| --- | --- |
| 字符串下拉 `filter` | 扫描当前程序集里名称以 `CameraFilterPack_` 开头的类型，并排除 `ffxSetFilterAdvancedPlus.blacklistedFilterKeywords` 命中的滤镜。 |
| 字符串下拉 `component` | 扫描当前程序集里继承 `ffxPlusBase` 的类型。 |
| `List` 属性 `decorations` | 接管 `scrollRect` 的滚动条和 content，把编辑器 `decorationsListContent` 指向列表控件内容。 |
| `List` 属性 `events` | 把编辑器 `eventsListContent` 指向列表控件内容。 |

## 写入事件值到控件

| 签名 | 行为 |
| --- | --- |
| `void SetProperties(LevelEvent levelEvent, bool checkIfEnabled = true)` | 遍历事件数据，把每个属性写入对应控件，并刷新启用勾选和控件状态。 |
| `void SetupCheckmark(Property property, PropertyControl control)` | 配置属性启用按钮和勾选状态。 |
| `void SelectTab(string targetTab)` | 切换属性分组，只显示 `Property.info.groupName == targetTab` 的属性。 |

`SetProperties()` 对不同控件类型使用不同赋值路径：

| 类型或控件 | 写入方式 |
| --- | --- |
| `Vector2` | 用 `Vector2.ToString("f6")` 写入文本；有随机值时同步随机控件。 |
| `Tile` | 写入 `PropertyControl_Tile.tileValue`。 |
| `FilterProperties` | 如果事件含 `isNewlyAdded`，写入 `enableProperties` 后移除该临时键。 |
| `Bool` | 写入 `PropertyControl_Bool.value`。 |
| `PropertyControl_ParticlePlayback` | 根据事件从 `scrDecorationManager.GetDecoration()` 取粒子装饰。 |
| `PropertyControl_FloatPair` | 写入 `MinMaxControl.start`、`end` 并刷新输入。 |
| `PropertyControl_Vector2Range` | 分别写入 x、y 的起止值并刷新输入。 |
| `PropertyControl_MinMaxGradient` | 调用 `SetValue()`。 |
| `PropertyControl_Note` | 不写文本值。 |
| 其他控件 | 使用 `levelEvent[item].ToString()` 写入 `control.text`。 |

如果面板包含 `floor` 属性，`SetProperties()` 会把 `levelEvent.floor` 限制在 `0` 到当前编辑器地板数量减一之间，再写入对应控件。

## 相关类型

| 类型 | 关系 |
| --- | --- |
| [InspectorPanel](/api/editor/InspectorPanel.md) | `PropertiesPanel` 的拥有者，负责选择事件对象。 |
| [LevelEventInfo](/api/data-models/LevelEventInfo.md) | 提供当前面板需要渲染的属性元数据。 |
| [PropertyInfo](/api/data-models/PropertyInfo.md) | 决定每个属性的控件类型、显示条件、默认值和范围。 |
| [Property](/api/data-models/Property.md) | 每个属性行组件。 |
| [LevelEvent](/api/data-models/LevelEvent.md) | `SetProperties()` 读取的事件数据对象。 |

