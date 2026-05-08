# Property

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 源码路径 | `7thRhythmSource/ADOFAi/ADOFAI/Property.cs` |
| 命名空间 | `ADOFAI` |
| 类型 | `class Property : MonoBehaviour` |
| 主要职责 | 表示编辑器属性面板中的一行属性 UI，保存标签、启用按钮、随机按钮、控件容器和对应的 `PropertyInfo`。 |

`Property` 是数据模型和编辑器 UI 的连接点。它本身不实现具体输入控件逻辑，具体控件由 `ADOFAI.LevelEditor.Controls.PropertyControl` 及其子类负责。`Property` 负责持有控件实例，并在设置 `info` 时计算显示标签。

## 字段

| 名称 | 类型 | 分组 | 作用 |
| --- | --- | --- | --- |
| `label` | `TMP_Text` | UI | 属性名称文本。 |
| `helpButton` | `Button` | UI | 帮助按钮。 |
| `randomButton` | `Button` | UI | 随机按钮。 |
| `enabledButton` | `Button` | UI | 属性启用按钮。 |
| `enabledCheckmark` | `GameObject` | UI | 启用状态勾选标记。 |
| `controlContainer` | `RectTransform` | UI | 输入控件挂载容器。 |
| `offText` | `GameObject` | UI | 属性关闭状态文本对象。 |
| `checkbgImage` | `Image` | UI/Images | 启用按钮背景图。 |
| `checkImage` | `Image` | UI/Images | 启用按钮图像。 |
| `key` | `string` | Runtime | 属性键名。 |
| `control` | `PropertyControl` | Runtime | 具体属性控件实例。 |
| `_info` | `PropertyInfo` | 私有字段 | 当前属性元数据。 |

## 属性

| 名称 | 类型 | 行为 |
| --- | --- | --- |
| `info` | `PropertyInfo` | setter 保存 `_info`，然后根据元数据计算 `label.text`。 |

`info` setter 的标签选择顺序如下：

1. 如果 `PropertyInfo.customLabel` 不为空，直接使用它。
2. 如果 `customLocalizationKey == null`，先查 `editor.{事件名}.{属性名}`，再查 `editor.{属性名}`。
3. 如果 `customLocalizationKey` 是空字符串，标签为空。
4. 否则使用 `RDString.Get(customLocalizationKey)`。
5. 如果 `PropertyInfo.required == true`，在标签末尾追加红色星号富文本。

找不到默认本地化键时，源码会输出调试警告，警告内容包含事件属性键和备用属性键。

## 与数据模型的关系

| 类型 | 关系 |
| --- | --- |
| [PropertyInfo](/api/data-models/PropertyInfo.md) | `Property.info` 保存字段元数据，并用它决定标签文本。 |
| [LevelEventInfo](/api/data-models/LevelEventInfo.md) | 标签默认键会使用 `PropertyInfo.levelEventInfo.name`。 |
| `PropertyControl` | `Property.control` 持有具体输入控件，后续编辑器系统阶段会展开控件读写链路。 |

