# 关卡设置模型

本页整理 `RDLevelSettings`。它是 `.rdlevel` 根对象中 `settings` 字典的结构体表示，保存关卡展示信息、预览资源、游玩模式、rank 边界、兼容 mod 和缓存字段。

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 类型 | `struct RDLevelSettings` |
| 命名空间 | `RDLevelEditor` |
| 源码路径 | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/RDLevelSettings.cs` |
| 当前编码版本 | `67` |

## 字段

| 字段 | 类型 | JSON 键 | 作用 |
| --- | --- | --- | --- |
| `version` | `int` | `version` | 关卡格式版本。 |
| `artist` | `string` | `artist` | 艺术家名，解码时最长 256。 |
| `song` | `string` | `song` | 歌曲名，解码时最长 256。 |
| `specialArtistType` | `SpecialArtistType` | `specialArtistType` | 艺术家归属说明。 |
| `artistPermissionFileName` | `string` | `artistPermission` | 艺术家授权文件名。 |
| `artistLinks` | `string` | `artistLinks` | 艺术家链接文本。 |
| `author` | `string` | `author` | 谱面作者，解码时最长 256。 |
| `difficulty` | `LevelDifficulty` | `difficulty` | 自定义关卡选择界面显示的难度。 |
| `seizureWarning` | `bool` | `seizureWarning` | 是否显示光敏警告。 |
| `previewImageName` | `string` | `previewImage` | 预览图文件名。 |
| `syringeIconName` | `string` | `syringeIcon` | 注射器图标文件名。 |
| `previewSongName` | `string` | `previewSong` | 关卡选择界面预览音频文件名。 |
| `previewSongStartTime` | `float` | `previewSongStartTime` | 预览音频起始秒数。 |
| `previewSongDuration` | `float` | `previewSongDuration` | 预览音频时长，默认 `10`。 |
| `description` | `string` | `description` | 关卡说明，解码时最长 1000。 |
| `tags` | `string` | `tags` | 逗号分隔标签。 |
| `songLabelHue` | `float` | `songNameHue` | 歌曲标签色相。 |
| `songLabelGrayscale` | `bool` | `songLabelGrayscale` | 歌曲标签是否灰度。 |
| `canBePlayedOn` | `LevelPlayMode` | `canBePlayedOn` | 支持 1P、2P 或两种模式。 |
| `separate2PLevelFilename` | `string` | `separate2PLevelFilename` | 双人模式独立关卡文件名。 |
| `rankMaxMistakes` | `int[]` | `rankMaxMistakes` | F 到 A 的最大错误阈值数组，长度 4。 |
| `rankDescription` | `string[]` | `rankDescription` | F、D、C、B、A、S 六段 rank 文案。 |
| `customClass` | `string` | `customClass` | 自定义关卡绑定的内置 `Level_*` 类名。 |
| `multiplayerAppearance` | `MultiplayerAppearance` | `multiplayerAppearance` | 双人显示模式。 |
| `firstBeatBehavior` | `FirstBeatBehavior` | `firstBeatBehavior` | 第一小节事件运行策略。 |
| `mods` | `string[]` | `mods` | 兼容行为开关。 |
| `inkFile` | `string` | `inkFile` | 对话 Ink 文件名。 |
| `levelVolume` | `float` | `levelVolume` | 运行时 `LevelMasterVolume` 使用的关卡音量。 |
| `createRowsManually` | `bool` | 无直接编码键 | 运行时字段，构造函数设为 false。 |
| `lastModifiedTime` | `string` | `lastModifiedTime` | 自定义关卡缓存字段。 |
| `firstSongFileName` | `string` | `firstSong` | 自定义关卡缓存字段。 |
| `firstSongoffset` | `float` | `firstSongOffset` | 自定义关卡缓存字段。 |
| `bpm` | `float` | `bpm` | 自定义关卡缓存字段。 |
| `mainRDLevelRelativePath` | `string` | `mainRDLevelRelativePath` | 自定义关卡缓存字段。 |

## 属性

| 属性 | 类型 | 行为 |
| --- | --- | --- |
| `levelName` | `string` | 返回 `artist + " - " + song`。 |
| `rankLowerBounds` | `float[]` | 返回长度 6 的数组：`float.MaxValue`、四个 `rankMaxMistakes`、`0`。 |

`LevelBase` 使用 `rankLowerBounds` 设置 `rankLowerBounds`、`missesToCrackHeart` 和 rank 描述。

## 默认值

构造函数 `RDLevelSettings(int version)` 接收参数但把 `this.version` 固定设为 `67`。主要默认值如下：

| 字段 | 默认值 |
| --- | --- |
| `artist`、`song`、`author`、`description`、`tags` | 空字符串。 |
| `specialArtistType` | `SpecialArtistType.None`。 |
| `difficulty` | `LevelDifficulty.Medium`。 |
| `seizureWarning` | `false`。 |
| `previewSongStartTime` | `0`。 |
| `previewSongDuration` | `10`。 |
| `songLabelHue` | `UnityEngine.Random.Range(0f, 100f) / 100f`。 |
| `songLabelGrayscale` | `false`。 |
| `canBePlayedOn` | `LevelPlayMode.OnePlayerOnly`。 |
| `multiplayerAppearance` | `MultiplayerAppearance.HorizontalStrips`。 |
| `rankMaxMistakes` | `LevelValidation.DefaultRankMaxMistakes`，即 `[20, 15, 10, 5]`。 |
| `rankDescription` | 从 `RDString.Get("editor.LevelSettings.defaultF" ... "defaultS")` 读取。 |
| `firstBeatBehavior` | `FirstBeatBehavior.RunEventsOnPrebar`。 |
| `levelVolume` | `1`。 |
| `customClass`、`mods` | null。 |
| `createRowsManually` | `false`。 |

## Decode

`Decode(Dictionary<string, object>)` 从 settings 字典读取字段。

| 行为 | 说明 |
| --- | --- |
| 必读 version | 直接 `Convert.ToInt32(dict["version"])`。 |
| 字符串长度截断 | `artist`、`song`、`author` 最长 256，`description` 最长 1000。 |
| 枚举读取 | `specialArtistType`、`canBePlayedOn`、`multiplayerAppearance`、`firstBeatBehavior`、`difficulty` 使用 `RDEditorUtils.DecodeEnum<T>()`。 |
| 布尔读取 | `songLabelGrayscale`、`seizureWarning` 使用 `RDEditorUtils.DecodeBool()`。 |
| rank 数组 | `rankMaxMistakes` 从 4 个数字读取；`rankDescription` 从 6 个字符串读取。 |
| mods 兼容 | `mods` 可以是逗号字符串，也可以是 `List<object>`。 |
| 缓存字段 | `lastModifiedTime`、`firstSong`、`firstSongOffset`、`bpm`、`mainRDLevelRelativePath` 存在时读取。 |

`Decode()` 没有读取 `createRowsManually`，该字段只由构造默认值或其他代码路径写入。

## Encode

`Encode(bool includeCacheData = false)` 输出 settings 字典内部内容。

| 分支 | 行为 |
| --- | --- |
| 普通保存 | `version` 使用 `67`，输出展示字段、资源字段、游玩模式、rank、mods、rankDescription。 |
| 缓存保存 | `includeCacheData = true` 时使用当前 `version`，并额外输出 `mainRDLevelRelativePath`、`lastModifiedTime`、`firstSong`、`firstSongOffset`、`bpm`。 |
| 可选字段 | `customClass` 和 `inkFile` 非空时才输出。 |
| mods | `mods` 非空时用 `EncodeStringArrayForMods("mods", mods)` 输出。 |
| rankDescription | 手工打开数组，输出 6 条转义字符串。 |

`DesktopLevelLoader` 保存自定义关卡缓存时会调用 `settings.Encode(includeCacheData: true)`。

## 相关枚举

| 枚举 | 值 | 用途 |
| --- | --- | --- |
| `SpecialArtistType` | `None`、`AuthorIsArtist`、`PublicLicense` | 描述作者和音乐艺术家的关系。 |
| `LevelPlayMode` | `None`、`OnePlayerOnly`、`TwoPlayerOnly`、`BothModes` | 自定义关卡支持的玩家模式。 |
| `MultiplayerAppearance` | `HorizontalStrips`、`Nothing` | 双人模式外观。 |
| `FirstBeatBehavior` | `RunNormally`、`RunEventsOnPrebar` | 第一小节事件运行策略。 |
| `LevelDifficulty` | `Easy`、`Medium`、`Tough`、`VeryTough` | 自定义关卡难度。 |

## 校验边界

`LevelValidation.GetLevelSettingsErrors()` 会检查以下内容：

| 项目 | 规则 |
| --- | --- |
| `artist`、`song`、`author` | 非空，最长 256。 |
| `tags` | 总长度不超过 1024，单个 tag 不超过 254，逗号分隔后不能出现空 tag。 |
| `previewImageName` | 使用 `GC.SupportedImageFiles`，最大 2,000,000 bytes。 |
| `syringeIconName` | 使用 `GC.SupportedImageFiles`，最大 20,000 bytes。 |
| `previewSongName` | 使用 `GC.SupportedAudioFiles`。 |
| `canBePlayedOn` | 不能是 `LevelPlayMode.None`。 |
| `separate2PLevelFilename` | `BothModes` 且字段非空时检查文件扩展、存在性和反序列化。 |
| `songLabelHue` | 范围 `0..100`。 |
| `rankMaxMistakes` | 不能为 null。 |
| `previewSongStartTime` | 不能小于 0。 |
| `previewSongDuration` | 范围 `1..20`。 |

`ForceSettingsValidation()` 会对长度、资源文件、预览时间、标签、玩家模式、色相和 rank 阈值执行修复写回。

## 相关页面

| 页面 | 关系 |
| --- | --- |
| [关卡数据模型](/api/data-models/level-data.md) | `settings` 是 `.rdlevel` 根结构的第一块。 |
| [场景流程与暂停流程](/api/runtime/scene-flow.md) | `scnGame` 和关卡选择界面读取这些设置。 |
| [音频运行时](/api/runtime/audio-runtime.md) | `firstSong`、`bpm`、`previewSong`、`levelVolume` 与音频运行相关。 |


