# 关卡数据模型

本页整理 `.rdlevel` 主数据模型。`RDLevelData` 位于 `RDLevelEditor` 命名空间，是编辑器、运行时和自定义关卡列表共同使用的关卡数据入口。

## 源码范围

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `RDLevelData` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/RDLevelData.cs` | 关卡根模型，保存设置、行、装饰、事件、条件、书签、调色板和窗口舞蹈扫描结果。 |
| `RDLevelSettings` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/RDLevelSettings.cs` | `settings` 节点模型，保存关卡元信息、预览资源、难度、rank、游玩模式、mods 和缓存字段。 |
| `CustomLevelData` | `RDFucked/Assets/Scripts/Assembly-CSharp/CustomLevelData.cs` | 自定义关卡列表项，保存路径、Steam 来源、图标、标签和 hash。 |
| `LevelValidation` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelValidation.cs` | 关卡设置校验与自动修复边界。 |

## `.rdlevel` 根结构

`RDLevelData.Encode()` 固定按以下顺序输出根对象：

| 键 | 来源字段 | 内容 |
| --- | --- | --- |
| `settings` | `settings` | `RDLevelSettings.Encode()` 生成的关卡设置。 |
| `rows` | `rows` | `LevelEvent_MakeRow` 列表，每个元素用行事件自己的 `Encode()` 输出。 |
| `decorations` | `sprites` | `LevelEvent_MakeSprite` 列表。 |
| `events` | `levelEvents` | 排除 base event、MakeRow、MakeSprite 后的普通事件。 |
| `conditionals` | `conditionals` | `Conditional.Encode()` 输出的条件列表。 |
| `bookmarks` | `bookmarks` | 每个书签包含 `bar`、`beat`、`color`。 |
| `colorPalette` | `colorPalette` | 固定 21 个颜色字符串。 |

## RDLevelData 字段

| 字段 | 类型 | 作用 |
| --- | --- | --- |
| `current` | `static RDLevelData` | 当前正在解码或使用的关卡数据。 |
| `decodingFailed` | `static bool` | 解码失败标记。 |
| `encode` | `static StringBuilder` | 关卡整体编码用缓冲。 |
| `eventEncode` | `static StringBuilder` | 事件编码用缓冲。 |
| `encodingLevelEvents` | `static bool` | 当前是否正在编码 `events` 数组。 |
| `levelEvents` | `List<LevelEvent_Base>` | 所有关卡事件，包含行和精灵创建事件。 |
| `rows` | `List<LevelEvent_MakeRow>` | `rows` 节点解码得到的行创建事件。 |
| `sprites` | `List<LevelEvent_MakeSprite>` | `decorations` 节点解码得到的精灵创建事件。 |
| `conditionals` | `List<Conditional>` | 条件列表。 |
| `bookmarks` | `List<BookmarkData>` | 编辑器书签列表。 |
| `settings` | `RDLevelSettings` | 关卡设置。 |
| `colorPalette` | `string[]` | 21 个颜色槽。 |
| `errorStatus` | `int` | 错误状态字段。 |
| `errorName` | `LevelErrorName` | 解码错误名。 |
| `usesWindowDance` | `bool` | 解码事件时扫描得到，表示关卡启用窗口舞蹈事件。 |
| `resizesWindow` | `bool` | 窗口尺寸相关标记。 |
| `windowCount` | `int` | 窗口舞蹈需要的窗口数量，默认 `1`。 |

## 构造与解码

| 构造函数 | 行为 |
| --- | --- |
| `RDLevelData()` | 创建 version 67 的默认 `RDLevelSettings`，初始化 rows、sprites、levelEvents、conditionals、bookmarks 和 21 个颜色槽。 |
| `RDLevelData(RDLevelSettings, List<...>)` | 直接用编辑器中已有的设置、行、事件、条件、精灵、书签和调色板构造，用于保存。 |
| `RDLevelData(Dictionary<string, object>, bool, bool, bool)` | 从 JSON 根字典解码关卡。 |

### 字典解码流程

| 步骤 | 行为 |
| --- | --- |
| 设置当前数据 | `current = this`，`errorName = None`。 |
| 解码 settings | 根对象包含 `settings` 时调用 `settings.Decode()`；否则创建 version 1 的 `RDLevelSettings`。 |
| 强制最新版 | `forceLatestVersion` 为 true 时把 `settings.version` 改成 `67`。 |
| 解码 rows | 遍历 `rootDict["rows"]`，创建 `LevelEvent_MakeRow`，加入 `levelEvents` 和 `rows`。 |
| 解码 decorations | 根对象包含 `decorations` 时创建 `LevelEvent_MakeSprite`，加入 `levelEvents` 和 `sprites`。 |
| 解码 events | 根据 `type` 拼出 `RDLevelEditor.LevelEvent_` 类型名，用反射实例化事件并调用 `Decode()`。 |
| 扫描窗口舞蹈 | active 事件 `usesWindowDance` 为 true 时，根据事件窗口字段更新 `windowCount`，并设置 `usesWindowDance = true`。 |
| onlyActiveEvents | 为 true 时只把 active 事件加入 `levelEvents`；为 false 时保留 inactive 事件。 |
| onlySettings | 为 true 且遇到 `LevelEvent_PlaySong` 时提前返回，用于关卡列表读取设置和歌曲缓存。 |
| 解码 conditionals | 遍历 `conditionals` 节点，调用 `Conditional.Decode()`。 |
| 解码 bookmarks | 每个元素读取 `bar`、`beat`、`color` 并创建 `BookmarkData`。 |
| 解码 colorPalette | 最多读取 21 个颜色，使用 `RDEditorUtils.DecodeColor(item, hasAlpha: true)`；没有节点时使用 `RDEditorConstants.defaultColorPalette`。 |
| 旧版本 mods | 根据 version 和事件内容向 `settings.mods` 添加兼容开关。 |
| 排序 | 按 `LevelEvent_Base.sortOrder` 对 `levelEvents` 排序。 |

解码 `events` 时，如果事件类型找不到或不是 `LevelEvent_Base` 子类，会记录 warning 并跳过该事件。`settings`、`conditionals`、`bookmarks`、`colorPalette` 解码失败时会设置 `decodingFailed = true` 和对应 `errorName`。

## 旧版本兼容 mods

`RDLevelData` 在解码完成前会根据版本和事件内容补充 `settings.mods`。

| 条件 | 添加 mod |
| --- | --- |
| `settings.version < 47` | `booleansDefaultToTrue` |
| `settings.version < 49` | `classicHitParticles` |
| version 小于 67 且 active `SetVFXPreset.duration > 0` | `oldVFXEasing` |
| version 小于 53 且 active 事件存在 tag | `legacyTaggedEvents` |
| version 小于 62 且 active 事件存在 tag | `runTaggedEventsWhileScrubbing` |

这些 mod 会被 `LevelBase` 读取，用于旧关卡运行和事件行为兼容。

## 编码流程

`Encode()` 生成完整关卡文本。

| 步骤 | 行为 |
| --- | --- |
| 初始化 | 清空静态 `encode`，设置缩进，打开根字典。 |
| settings | 打开 `settings` 字典，追加 `settings.Encode()`。 |
| rows | 打开 `rows` 数组；按列表顺序重写 `row.row` 后输出。 |
| decorations | 打开 `decorations` 数组；按列表顺序重写 `sprite.row` 后输出。 |
| events | 设置 `encodingLevelEvents = true`，只输出非 base event、非 MakeRow、非 MakeSprite 的事件。 |
| conditionals | 输出每个 `Conditional.Encode()`。 |
| bookmarks | 输出每个书签的 `bar`、`beat`、`color`。 |
| colorPalette | 固定输出 21 个颜色字符串。 |
| 收尾 | 关闭数组和字典，返回字符串。 |

## 辅助方法

| 方法 | 行为 |
| --- | --- |
| `GetFirstSongOffset()` | 遍历 `levelEvents`，返回最后一个 `LevelEvent_PlaySong.song.offset`；没有播放歌曲事件时返回 `0`。 |
| `GetFirstSongFileName()` | 返回第一个 `LevelEvent_PlaySong.song.filename`；没有时返回 null。 |
| `GetSongBPM(string)` | 先找同名 `PlaySong` 的 BPM，再找任意 `PlaySong` BPM，再找 `SetBeatsPerMinute` BPM，最后返回 `100`。 |

`DesktopLevelLoader` 和 `LevelImporter` 会用 `onlySettings = true` 的 `RDLevelData` 快速读取自定义关卡的第一首歌、BPM、offset、last modified 和主文件相对路径。

## 与运行时的关系

| 使用位置 | 行为 |
| --- | --- |
| `LevelBase.Decode()` | 从关卡文本创建 `RDLevelData`，然后构建运行时事件表。 |
| `scnGame.Start()` | 读取 `RDLevelData.current`，根据 `usesWindowDance` 创建窗口舞蹈系统，并用 `settings` 设置 rich presence 和关卡类型。 |
| `LevelBase` | 读取 `settings.rankDescription`、`rankLowerBounds`、`multiplayerAppearance`、`mods`、`inkFile`。 |
| `scnEditor.EncodeData()` | 用当前编辑器状态创建 `RDLevelData(...).Encode()`。 |
| `scnEditor.DecodeData()` | 用 `new RDLevelData(rootDict, onlyActiveEvents: false, ...)` 还原编辑器数据。 |

## 相关页面

| 页面 | 关系 |
| --- | --- |
| [关卡设置模型](/api/data-models/level-settings.md) | `settings` 节点字段、默认值、解码和编码。 |
| [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) | `events` 数组中普通事件的公共序列化规则。 |
| [场景流程与暂停流程](/api/runtime/scene-flow.md) | `scnGame` 如何读取关卡数据并进入运行时。 |
| [音频运行时](/api/runtime/audio-runtime.md) | `GetFirstSongOffset()`、`GetSongBPM()` 和播放歌曲事件关系。 |


