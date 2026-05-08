# 数据字段索引

本页是阶段 6 的数据入口索引，面向 `.rdlevel` 数据定位和 RD 源码阅读。字段细节以阶段 4 的数据模型页面为准；本页负责把根节点、运行时读取点、编辑器写回点和校验入口串起来。

## 根结构

`RDLevelData.Encode()` 输出 `.rdlevel` 根对象时，固定写出以下节点。

| JSON 键 | 源码字段 | 主要类型 | 详情页 |
| --- | --- | --- | --- |
| `settings` | `RDLevelData.settings` | `RDLevelSettings` | [关卡设置模型](/api/data-models/level-settings.md) |
| `rows` | `RDLevelData.rows` | `List<LevelEvent_MakeRow>` | [关卡数据模型](/api/data-models/level-data.md)、[行与节拍事件](/api/editor-events/row-events.md) |
| `decorations` | `RDLevelData.sprites` | `List<LevelEvent_MakeSprite>` | [关卡数据模型](/api/data-models/level-data.md)、[精灵生命周期事件](/api/editor-events/SpriteLifecycleEvents.md) |
| `events` | `RDLevelData.levelEvents` | `List<LevelEvent_Base>` | [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md)、[事件覆盖清单](/api/editor-events/event-coverage.md) |
| `conditionals` | `RDLevelData.conditionals` | `List<Conditional>` | [条件系统](/api/data-models/conditionals.md) |
| `bookmarks` | `RDLevelData.bookmarks` | `List<BookmarkData>` | [音频与辅助数据模型](/api/data-models/audio-and-auxiliary.md) |
| `colorPalette` | `RDLevelData.colorPalette` | `string[]` | [音频与辅助数据模型](/api/data-models/audio-and-auxiliary.md) |

`scnEditor.EncodeData()` 会把编辑器当前的 settings、rows、events、conditionals、sprites、bookmarks 和 colorPalette 交给 `RDLevelData(...).Encode()` 保存。`LevelBase.Decode()` 与 `scnEditor.DecodeData()` 分别从运行时和编辑器侧读取这些字段。

## Settings 字段入口

| 字段组 | JSON 键 | 运行或编辑用途 | 详情页 |
| --- | --- | --- | --- |
| 基础展示 | `artist`、`song`、`author`、`description`、`tags` | 自定义关卡列表、错误提示、关卡展示文本 | [关卡设置模型](/api/data-models/level-settings.md) |
| 艺术家说明 | `specialArtistType`、`artistPermission`、`artistLinks` | 自定义关卡元信息和发布信息 | [关卡设置模型](/api/data-models/level-settings.md) |
| 资源预览 | `previewImage`、`syringeIcon`、`previewSong`、`previewSongStartTime`、`previewSongDuration` | 关卡选择界面预览图、图标和试听音频 | [关卡设置模型](/api/data-models/level-settings.md)、[自定义关卡与错误模型](/api/data-models/custom-levels-errors.md) |
| 难度与模式 | `difficulty`、`canBePlayedOn`、`separate2PLevelFilename`、`multiplayerAppearance` | 自定义关卡选择、1P/2P 入口、双人外观 | [Rank 与难度枚举](/api/data-models/rank-difficulty.md) |
| Rank | `rankMaxMistakes`、`rankDescription` | `LevelBase` 设置 rank 边界、心形破裂阈值和结算文案 | [关卡设置模型](/api/data-models/level-settings.md) |
| 兼容开关 | `mods` | `LevelBase.ModExists()` 与旧版本事件行为兼容 | [关卡数据模型](/api/data-models/level-data.md) |
| 脚本绑定 | `customClass`、`inkFile` | 绑定官方 `Level_*` 类和 Ink 文件 | [官方关卡脚本总览](/api/levels/overview.md)、[ShowDialogue](/api/editor-events/ShowDialogue.md) |
| 音量 | `levelVolume` | 运行时关卡整体音量 | [音频运行时](/api/runtime/audio-runtime.md) |
| 缓存字段 | `mainRDLevelRelativePath`、`lastModifiedTime`、`firstSong`、`firstSongOffset`、`bpm` | `DesktopLevelLoader` 与 `LevelImporter` 读取自定义关卡缓存 | [关卡设置模型](/api/data-models/level-settings.md) |

`RDLevelSettings.Encode(includeCacheData: true)` 会额外写入缓存字段；普通保存不写这些缓存字段。

## Rows、Decorations 与 Events

| 节点 | 编码来源 | 读取方式 | 详情页 |
| --- | --- | --- | --- |
| `rows` | `LevelEvent_MakeRow.Encode()` | `RDLevelData` 解码时创建 `LevelEvent_MakeRow`，加入 `rows` 和 `levelEvents` | [行与节拍事件](/api/editor-events/row-events.md) |
| `decorations` | `LevelEvent_MakeSprite.Encode()` | `RDLevelData` 解码时创建 `LevelEvent_MakeSprite`，加入 `sprites` 和 `levelEvents` | [精灵生命周期事件](/api/editor-events/SpriteLifecycleEvents.md) |
| `events` | 普通 `LevelEvent_Base.Encode()` | 根据 `type` 拼出 `RDLevelEditor.LevelEvent_{type}`，反射创建事件并调用 `Decode()` | [事件覆盖清单](/api/editor-events/event-coverage.md) |

`events` 节点不保存 base event、`MakeRow` 和 `MakeSprite`。这些事件在编码时分别进入 `rows` 或 `decorations`，但运行时仍会合并进 `levelEvents`。

## 事件公共字段

| 字段 | 类型 | 用途 | 详情页 |
| --- | --- | --- | --- |
| `type` | `LevelEventType` | 指定事件类后缀，用于反射创建具体 `LevelEvent_*` | [事件覆盖清单](/api/editor-events/event-coverage.md) |
| `bar`、`beat` | 数值 | 定位事件在时间线上的小节和拍 | [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) |
| `active` | `bool` | 控制事件是否参与运行和保存逻辑 | [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) |
| `tag` | `string` | 被 `TagAction` 和 `LevelBase` 标签运行方法查找 | [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) |
| `conditionals` | `List<int>` | 引用本地条件 ID，负数使用 `-id - 1` 表示取反 | [条件系统](/api/data-models/conditionals.md) |
| `globalConditionals` | `List<string>` | 引用全局条件 ID，`~` 前缀表示取反 | [条件系统](/api/data-models/conditionals.md) |
| `rooms` | `Rooms` | 指定事件影响的房间范围 | [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) |

事件专属字段来自具体 `LevelEvent_*` 上带 `JsonPropertyAttribute` 的公开属性。字段反射、默认控件和编码管线见 [BasePropertyInfo](/api/editor-events/BasePropertyInfo.md)。

## Conditionals 字段入口

| 位置 | 字段 | 行为 | 详情页 |
| --- | --- | --- | --- |
| 根节点 | `conditionals` | 保存关卡自定义条件列表 | [条件系统](/api/data-models/conditionals.md) |
| 条件对象 | `type`、`id`、`name`、`tag` | `Conditional.Decode()` 根据 `type` 反射创建具体条件类 | [条件系统](/api/data-models/conditionals.md) |
| 条件属性 | 带 `JsonPropertyAttribute` 的公开属性 | `ConditionalInfo` 收集后参与解码、编码和 Inspector 显示 | [条件系统](/api/data-models/conditionals.md) |
| 事件引用 | `conditionals`、`globalConditionals` | `LevelEvent_Base.CheckConditionals()` 在运行前统一检查 | [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) |

全局条件由 `Conditionals.GetGlobalConditionals()` 创建，内置 gid 包含 `p`、`f`、`n`、`o`。

## Bookmarks 与 Color Palette

| 节点 | 字段 | 行为 | 详情页 |
| --- | --- | --- | --- |
| `bookmarks` | `bar`、`beat`、`color` | 编辑器时间线书签位置和颜色索引 | [音频与辅助数据模型](/api/data-models/audio-and-auxiliary.md) |
| `colorPalette` | 21 个颜色字符串 | 编辑器设置面板保存；`ColorOrPalette` 可通过 `pal{index}` 引用 | [音频与辅助数据模型](/api/data-models/audio-and-auxiliary.md) |

`ColorOrPalette.ToColor(true)` 从 `scnEditor.instance.colorPalette` 取编辑器颜色；运行时使用 `RDLevelData.current.colorPalette`。

## 校验与自动修复入口

| 入口 | 检查对象 | 行为 |
| --- | --- | --- |
| `LevelValidation.GetLevelSettingsErrors()` | `RDLevelSettings` | 检查艺术家、歌曲、作者、标签、预览资源、玩家模式、色相、rank 和预览时长。 |
| `LevelValidation.GetLevelErrors()` | `RDLevelData` | 检查数据对象并追加 settings 错误。 |
| `LevelValidation.ForceSettingsValidation()` | `RDLevelSettings` | 对长度、预览资源、预览时长、标签、玩家模式、色相和 rank 阈值执行修复写回。 |
| `LevelValidation.GetFinishLevelEventError()` | `List<LevelEvent_Base>` | 统计 `FinishLevel` 事件数量。 |

发布和导入相关错误展示见 [自定义关卡与错误模型](/api/data-models/custom-levels-errors.md)。

## 源码阅读顺序

1. 查 `.rdlevel` 根节点时，先读 [关卡数据模型](/api/data-models/level-data.md)。
2. 查关卡选择界面、发布信息和资源预览时，读 [关卡设置模型](/api/data-models/level-settings.md)。
3. 查事件字段时，先用 [事件覆盖清单](/api/editor-events/event-coverage.md) 找到事件类，再进入对应事件页。
4. 查条件字段时，读 [条件系统](/api/data-models/conditionals.md)，再回到事件页看绑定方式。
5. 查声音、颜色、书签和标签动作时，读 [音频与辅助数据模型](/api/data-models/audio-and-auxiliary.md)。
6. 修改或解释字段前先确认字段由编辑器保存、关卡加载缓存还是运行时重建，避免把运行时临时状态当成持久字段。


