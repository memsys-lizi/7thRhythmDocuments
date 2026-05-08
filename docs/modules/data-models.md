# 数据模型与枚举

## 模块边界

本模块覆盖关卡数据、设置、错误、枚举和序列化模型。

## 主要类型线索

| 类型 | 说明 |
| --- | --- |
| `RDLevelData` | `.rdlevel` 根结构，保存 settings、rows、decorations、events、conditionals、bookmarks 和 colorPalette。 |
| `RDLevelSettings` | 关卡设置模型，保存元信息、预览资源、rank、mods、玩家模式和缓存字段。 |
| `CustomLevelData` | 自定义关卡列表和 Steam 来源信息。 |
| `LevelValidation` | 设置校验、自动修复、资源文件检查和错误枚举输出。 |
| `LevelError*` | 关卡错误展示和错误类型。 |
| `Rank`、`Difficulty`、`LevelDifficulty` | 结果、关卡选择难度和显示难度枚举。 |
| `Conditional`、`Conditionals` | `.rdlevel` 条件模型、编辑器条件面板、全局条件和运行时检查。 |
| `SoundData`、`SoundDataStruct` | 声音属性结构、音频加载、试听、旧版本迁移和事件属性序列化。 |
| `BookmarkData`、`ColorOrPalette`、`TagAction` | 书签、调色板引用和标签运行相关轻量模型。 |
| `BasePropertyInfo`、`ControlAttribute` | 事件属性反射、编码解码和自动 Inspector 控件映射。 |
| `Float2`、`FloatExpression`、`CustomAnimationData` | 表达式数值、二维数据和自定义动画 JSON 数据。 |

## 已写页面

| 页面 | 内容 |
| --- | --- |
| [关卡数据模型](/api/data-models/level-data.md) | `RDLevelData`、`.rdlevel` 根结构、解码、编码、兼容 mods、窗口舞蹈扫描和运行时关系。 |
| [关卡设置模型](/api/data-models/level-settings.md) | `RDLevelSettings` 字段、默认值、解码、编码、相关枚举和 `LevelValidation` 校验边界。 |
| [自定义关卡与错误模型](/api/data-models/custom-levels-errors.md) | `CustomLevelData`、`LevelValidation`、错误枚举、错误展示和自动修复规则。 |
| [Rank 与难度枚举](/api/data-models/rank-difficulty.md) | `Rank`、官方难度、自定义难度、玩家模式、关卡类型和关卡来源。 |
| [条件系统](/api/data-models/conditionals.md) | `Conditional`、`ConditionalInfo`、`ConditionalID`、`Conditionals`、Inspector、全局条件和运行时检查。 |
| [音频与辅助数据模型](/api/data-models/audio-and-auxiliary.md) | `SoundData`、`SoundDataStruct`、游戏音效表、书签、调色板、标签动作和枚举属性序列化。 |
| [属性反射与小型模型](/api/data-models/property-reflection-small-models.md) | `BasePropertyInfo`、属性 Attribute、控件 Attribute、表达式结构、自定义动画数据和指针事件模型。 |
| [枚举与轻量模型补充](/api/data-models/enums-lightweight-models.md) | 暂停菜单数据、旁白动作、字体包、保存 JSON、选择实体、编辑器小枚举和 UI 小组件。 |

## 阅读重点

- `.rdlevel` 或相关关卡文件结构。
- 事件列表和设置字段如何序列化。
- 枚举值在编辑器 UI 和运行时中的使用位置。
- 自定义关卡列表如何读取 settings 缓存、预览资源和 hash。
- 条件列表如何序列化，事件如何引用条件，运行时如何检查条件。
- 声音、颜色、tag、书签这类小模型如何进入事件属性和 `.rdlevel` 根结构。
- `JsonPropertyAttribute`、`BasePropertyInfo` 和控件 Attribute 如何把事件属性变成 Inspector 控件。

## 复核状态

阶段 4 已完成导航、API 索引和模块页复核，记录见 [阶段 3 与阶段 4 复核](/api/review/stage-3-4-review.md)。
