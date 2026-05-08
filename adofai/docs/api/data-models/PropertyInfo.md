# PropertyInfo

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 源码路径 | `7thRhythmSource/ADOFAi/ADOFAI/PropertyInfo.cs` |
| 命名空间 | `ADOFAI` |
| 类型 | `class PropertyInfo` |
| 主要职责 | 描述事件属性的名称、类型、默认值、控件类型、范围限制、显示启用条件、是否编码和对路径或地板的影响。 |

`PropertyInfo` 是事件字段的元数据对象。它由 `ADOStartup.DecodeLevelEventInfoList()` 在读取 `LevelEditorProperties` 资源时创建，并挂到 `LevelEventInfo.propertiesInfo`。`LevelEvent` 依靠它决定默认值、解码类型和编码规则；编辑器面板依靠它决定控件类型、标签、范围和条件显示。

## 核心字段

| 名称 | 类型 | 作用 |
| --- | --- | --- |
| `name` | `string` | 属性名。 |
| `order` | `int` | 属性在事件元数据中的顺序。 |
| `type` | `PropertyType` | 属性数据类型。 |
| `control` | `MonoBehaviour` | 关联的控件实例。 |
| `controlType` | `ControlType` | 编辑器控件类型。 |
| `enumType` | `Type` | 枚举属性对应的 CLR 枚举类型。 |
| `enumExceptions` | `object[]` | 枚举选项排除列表。 |
| `enumTypeString` | `string` | 资源中 `Enum:` 后的枚举类型字符串。 |
| `unit` | `string` | 属性单位文本。 |
| `placeholderKey`、`placeholder` | `string` | 占位文本键和值。 |
| `customLocalizationKey`、`customLabel` | `string` | 自定义本地化键和自定义标签。 |
| `pro` | `bool` | 标记属性是否属于 Pro 属性。 |
| `dict` | `Dictionary<string, object>` | 原始属性元数据字典。 |
| `levelEventInfo` | `LevelEventInfo` | 属性所属事件元数据。 |
| `canBeDisabled` | `bool` | 属性是否可以被禁用。 |
| `startEnabled` | `bool` | 可禁用属性的初始启用状态。 |
| `stringDropdown` | `bool` | 字符串属性是否作为下拉项处理。 |
| `invisible` | `bool` | 属性是否隐藏。 |
| `slider` | `bool` | 属性是否使用滑杆表现。 |
| `ignoreRange` | `bool` | 校验时是否忽略范围限制。 |
| `groupName` | `string` | 属性所属分组名。 |
| `value_default` | `object` | 属性默认值。 |
| `required` | `bool` | 属性是否必填。 |
| `encode` | `bool` | 属性是否写入 `.adofai` 文件。 |
| `affectsFloors` | `bool` | 属性变化是否影响地板。 |
| `affectsPath` | `bool` | 属性变化是否影响路径。 |

## 条件字段

| 名称 | 类型 | 来源字段 | 作用 |
| --- | --- | --- | --- |
| `disableIfVals` | `List<Tuple<string, string>>` | `disableIf` | 条件匹配时禁用属性。 |
| `enableIfVals` | `List<Tuple<string, string>>` | `enableIf` | 条件匹配时启用属性。 |
| `hideIfVals` | `List<Tuple<string, string>>` | `hideIf` | 条件匹配时隐藏属性。 |
| `showIfVals` | `List<Tuple<string, string>>` | `showIf` | 条件匹配时显示属性。 |
| `isEnabled` | `bool` | 字段默认值 | 编辑器使用的运行时启用状态。 |

`enableIf`、`disableIf`、`showIf` 和 `hideIf` 都会通过 `RDEditorUtils.DecodeStringArray()` 解码为成对的键和值。如果数组长度不是偶数，源码会记录调试日志。

## 类型与默认值解析

构造函数会读取资源字典中的 `type` 字符串，并把它转换为 `PropertyType`、默认值和控件类型。

| 资源类型 | `PropertyType` | 默认值行为 | 默认控件 |
| --- | --- | --- | --- |
| `Float` | `Float` | 转成 `float`，缺省为 `0f`，读取 `min`、`max`。 | `InputField` |
| `Bool` | `Bool` | 缺省为 `false`。 | `ToggleGroup` |
| `Int` | `Int` | 转成 `int`，缺省为 `0`，读取 `min`、`max`。 | `InputField` |
| `Color` | `Color` | 缺省为 `ffffffff` 或 `ffffff`，取决于 `usesAlpha`。 | `ColorPicker` |
| `File` | `File` | 缺省为空字符串，读取 `fileType`。 | `File` |
| `String` | `String` | 下拉字符串保留原文，普通字符串通过 `RDString.Get()`。 | `InputField` |
| `Text` | `LongString` | 通过 `RDString.Get()` 得到长文本默认值。 | `LongInputField` |
| `Vector2` | `Vector2` | 转成 `Vector2`，支持 `allowEmpty`、`min`、`max`。 | 未在分支中固定设置 |
| `Vector2Range` | `Vector2Range` | 转成 `Tuple<Vector2, Vector2>`。 | 未在分支中固定设置 |
| `Tile` | `Tile` | 转成 `Tuple<int, TileRelativeTo>`。 | 未在分支中固定设置 |
| `FloatPair` | `FloatPair` | 转成 `Tuple<float, float>`，读取 `min`、`max`、`step`。 | `FloatPair` |
| `MinMaxGradient` | `MinMaxGradient` | 有默认值时反序列化为 `SerializedMinMaxGradient`，否则使用 `SerializedMinMaxGradient.Default()`。 | `MinMaxGradient` |
| `Export` | `Export` | 只设置类型。 | 未在分支中固定设置 |
| `Rating` | `Rating` | 转成 `int`，缺省为 `0`。 | 未在分支中固定设置 |
| `Array` | `Array` | 有默认值用原值，否则为空对象数组。 | 未在分支中固定设置 |
| `List` | `List` | 只设置类型。 | 未在分支中固定设置 |
| `FilterProperties` | `FilterProperties` | 只设置类型。 | 未在分支中固定设置 |
| `ParticlePlayback` | `ParticlePlayback` | 只设置类型。 | `ParticlePlayback` |
| `Note` | `Note` | 读取 `noteKey`，缺省为 `editor.{事件名}.{属性名}.note`。 | 未在分支中固定设置 |
| `Enum:*` | `Enum` | 解析枚举类型并读取默认枚举值。 | `Dropdown` |

如果资源字典包含 `control`，构造函数最后会用该字段覆盖前面推导出的 `controlType`。

## 校验方法

| 签名 | 行为 |
| --- | --- |
| `float Validate(float value)` | 未设置 `ignoreRange` 时，把值限制在 `float_min` 到 `float_max`。 |
| `int Validate(int value)` | 普通整数限制在 `int_min` 到 `int_max`；属性名为 `floor` 时，范围限制为 `0` 到当前关卡最后一块地板。 |
| `Vector2 Validate(Vector2 value, bool forceAllowEmpty = false)` | 不允许空值时用默认分量替换 `NaN`，再按 `minVec`、`maxVec` 限制范围。 |
| `Tuple<float, float> Validate(Tuple<float, float> value)` | 用默认值替换 `NaN`，再按 `floatPairMin`、`floatPairMax` 限制两个分量。 |

## 显示与启用判断

| 签名 | 行为 |
| --- | --- |
| `bool CheckIfEnabled(LevelEvent currentEvent, string group)` | 先调用 `CheckIfShown()`；再根据 `enableIfVals` 和 `disableIfVals` 判断是否启用。 |
| `bool CheckIfShown(LevelEvent currentEvent, string group)` | 处理 `invisible`、事件分组、`showIfVals` 和 `hideIfVals`。 |
| `bool ValueMatch(List<Tuple<string, string>> keysAndVals, LevelEvent currentEvent)` | 根据其他属性的当前值判断条件是否匹配。 |

`ValueMatch()` 支持 `Int`、`Rating`、`Float`、`String`、`File`、`Enum`、`List`、`Vector2` 和 `Bool`。`Vector2` 条件还会检查目标属性是否被禁用。

## 相关类型

| 类型 | 关系 |
| --- | --- |
| [LevelEventInfo](/api/data-models/LevelEventInfo.md) | 每个 `PropertyInfo` 归属于一个事件元数据。 |
| [LevelEvent](/api/data-models/LevelEvent.md) | 通过 `PropertyInfo` 决定默认值、解码类型、编码规则和启用状态。 |
| [Property](/api/data-models/Property.md) | 编辑器 UI 行持有 `PropertyInfo`，并用它设置标签。 |
| [事件类型与属性枚举](/api/data-models/event-metadata-enums.md) | 说明 `PropertyType`、`ControlType` 和 `FileType`。 |

