# 自定义关卡与错误模型

本页整理自定义关卡列表项、关卡校验和错误展示相关模型。它们主要服务于自定义关卡选择、导入、发布和编辑器设置检查。

## 源码范围

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `CustomLevelData` | `RDFucked/Assets/Scripts/Assembly-CSharp/CustomLevelData.cs` | 自定义关卡列表项，保存路径、设置、图标、Steam 来源、标签和 hash。 |
| `LevelValidation` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelValidation.cs` | 校验关卡设置、资源文件、独立 2P 关卡、FinishLevel 事件数量，并提供自定义目录路径。 |
| `LevelErrorName` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelErrorName.cs` | 具体错误枚举。 |
| `LevelErrorType` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelErrorType.cs` | 错误类型枚举。 |
| `LevelErrorContainer` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelErrorContainer.cs` | ScriptableObject，保存可展示错误配置。 |
| `LevelErrorPresentation` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelErrorPresentation.cs` | UI 展示组件，把错误列表转换成本地化文本。 |
| `SettingErrorLocalization` | `RDFucked/Assets/Scripts/Assembly-CSharp/SettingErrorLocalization.cs` | 单个设置项的错误展示配置。 |
| `SettingCondition` | `RDFucked/Assets/Scripts/Assembly-CSharp/SettingCondition.cs` | 错误条件，负责按错误类型生成本地化说明。 |

## CustomLevelData

`CustomLevelData` 是自定义关卡选择界面使用的关卡列表项。`scnCLS` 保存 `List<CustomLevelData>`，`DesktopLevelLoader` 负责从文件夹加载并填充数据。

| 成员 | 类型 | 作用 |
| --- | --- | --- |
| `DefaultBpm` | `const float` | 自定义关卡默认 BPM，值为 `100`。 |
| `WorkshopItemURLPrefix` | `const string` | Steam Workshop 页面前缀：`http://steamcommunity.com/sharedfiles/filedetails/?id=`。 |
| `publishedId` | `PublishedFileId_t` | Steam 发布 ID，带 `[NonSerialized]`。 |
| `name` | `string` | 列表项名称，`DesktopLevelLoader` 会写入 `settings.song`。 |
| `settings` | `RDLevelSettings` | 关卡设置缓存。 |
| `syringeIcon` | `Texture` | 自定义关卡选择界面的图标纹理。 |
| `path` | `string` | 关卡文件夹路径。 |
| `mainRDLevelFilePath` | `string` | 主 `.rdlevel` 文件路径。 |
| `isFromSteam` | `bool` | 是否来自 Steam Workshop。 |
| `isLegacyLevel` | `bool` | 是否为旧格式关卡。 |
| `tags` | `List<string>` | 标签列表。 |
| `Hash` | `string` | 延迟计算的关卡 hash。 |

`Hash` 的计算分两类：旧关卡使用 `new DirectoryInfo(path).Name` 作为 hash 输入；非旧关卡使用 `settings.author`、`settings.artist`、`settings.song` 作为 hash 输入。

## LevelValidation 常量与路径

| 常量或属性 | 值或行为 |
| --- | --- |
| `MaxArtistLength`、`MaxSongLength`、`MaxAuthorLength` | `256`。 |
| `MaxDescriptionLength` | `1000`。 |
| `MaxTagLength` | `254`。 |
| `MaxTagTotalLength` | `1024`。 |
| `PreviewImageMaxFileSize` | `2,000,000` bytes。 |
| `SyringeIconMaxFileSize` | `20,000` bytes。 |
| `MinSongLabelHue` / `MaxSongLabelHue` | `0` / `100`。 |
| `DefaultRankMaxMistakes` | `[20, 15, 10, 5]`。 |
| `MinPreviewSongDuration` / `MaxPreviewSongDuration` | `1` / `20`。 |
| `DefaultPreviewSongStartTime` / `DefaultPreviewSongDuration` | `0` / `10`。 |
| `MainFilename` / `BackupFilename` | `main.rdlevel` / `backup.rdlevel`。 |
| `MinFinishLevelEventNumber` | `3`。 |
| `PreviewImageRecommendedDimensions` | `120 x 68`。 |
| `SyringeIconRecommendedDimensions` | `19 x 15`。 |
| `TempLevelsFolder` | `Path.Combine(Persistence.DataPath, "Temp")`。 |
| `CustomLevelsPath` | `Documents/Rhythm Doctor/Levels`，不存在时创建目录。 |
| `CustomCharactersPath` | `Documents/Rhythm Doctor/Characters`，不存在时创建目录。 |

`InvalidFileNameChars` 包含 Windows 文件名非法字符；`InvalidFileNames` 包含 `CON`、`PRN`、`AUX`、`NUL`、`COM0..9`、`LPT0..9`。

## 设置校验

`GetLevelSettingsErrors(string levelDirectory, RDLevelSettings settings)` 是主要校验入口。

| 检查项 | 错误输出 |
| --- | --- |
| `settings` 为默认值 | `LevelSettingsNull`。 |
| `artist` 为空或超过 256 | `ArtistNull` 或 `ArtistLength`。 |
| `song` 为空或超过 256 | `SongNull` 或 `SongLength`。 |
| `author` 为空或超过 256 | `AuthorNull` 或 `AuthorLength`。 |
| `tags` 总长度超过 1024 | `TagsLength`。 |
| tag 为空或单项超过 254 | `TagsNull` 或 `TagsLength`。 |
| `previewImageName` | `PreviewImageNull`、`PreviewImageFileNotFound`、`PreviewImageWrongExtension`、`PreviewImageFileSize`。 |
| `syringeIconName` | `SyringeIconNull`、`SyringeIconFileNotFound`、`SyringeIconWrongExtension`、`SyringeIconFileSize`。 |
| `previewSongName` | `PreviewSongFileNotFound` 或 `PreviewSongWrongExtension`。 |
| `canBePlayedOn == LevelPlayMode.None` | `CanBePlayedOnNull`。 |
| 独立 2P 文件 | `Separate2PLevelNull`、`Separate2PLevelNotFound`、`Separate2PLevelWrongExtension`、`Separate2PLevelDeserialization`。 |
| `songLabelHue` 不在 `0..100` | `SongLabelHueOutRange`。 |
| `rankMaxMistakes == null` | `RankMaxMistakesNull`。 |
| `previewSongStartTime < 0` | `PreviewSongStartTimeNegative`。 |
| `previewSongDuration` 不在 `1..20` | `PreviewSongDurationOutRange`。 |

`GetLevelErrors(string, RDLevelData)` 会先检查数据对象是否为 null，再附加 `GetLevelSettingsErrors()` 的结果。

## 自动修复

`ForceSettingsValidation(string levelDirectory, ref RDLevelSettings settings)` 会先拿到设置错误，再对部分错误直接写回修复值。

| 错误 | 修复 |
| --- | --- |
| `ArtistLength`、`SongLength`、`AuthorLength` | 截断到 256。 |
| `DescriptionLength` | 截断到 1000。 |
| 预览图扩展、找不到、文件过大 | 清空 `previewImageName`。 |
| syringe icon 找不到或文件过大 | 清空 `syringeIconName`。 |
| `PreviewSongStartTimeNegative` | 设置为 `0`。 |
| `PreviewSongDurationOutRange` | clamp 到 `1..20`。 |
| `TagsLength` | 总长截断到 1024，并逐项 trim、单项截断到 254。 |
| `CanBePlayedOnNull` | 设置为 `LevelPlayMode.OnePlayerOnly`。 |
| `SongLabelHueOutRange` | clamp 到 `0..100`。 |
| `RankMaxMistakesNull` | 设置为 `DefaultRankMaxMistakes`。 |

返回列表是修复后仍保留的错误。

## 文件校验

`CheckFile()` 先检查文件名是否为空，再检查扩展名、文件存在性和文件大小。

| 参数 | 行为 |
| --- | --- |
| `extensions` | 扩展名列表。需要扩展名检查时，源码用 `"." + extension == fileExtension` 比较。 |
| `filenameNull` | 文件名为空时返回。 |
| `fileNotFound` | 文件不存在时返回。 |
| `fileWrongExtension` | 扩展名不在列表时返回。 |
| `fileSizeLimitExceeded` 与 `maxFileSize` | 文件大小超过限制时返回。 |

当 `fileWrongExtension == LevelErrorName.None` 时，源码会尝试把每个扩展拼到文件名后面查找。

## 独立 2P 与 FinishLevel

| 方法 | 行为 |
| --- | --- |
| `GetSeparate2PLevelErrors(string, string)` | 拼出独立 2P 文件路径，先反序列化 JSON，再检查 `.rdlevel` 文件扩展和存在性。 |
| `GetFinishLevelEventError(List<LevelEvent_Base>)` | 统计 `LevelEvent_FinishLevel` 数量，少于 3 时返回 `FinishLevelEventNumberNotEnough`。 |

发布面板 `RDPublishPopup` 会把 `GetFinishLevelEventError()` 加入发布校验。

## 错误展示

### LevelErrorContainer

`LevelErrorContainer` 是 ScriptableObject，字段 `showableErrors` 保存 `SettingErrorLocalization[]`。`GetErrorsToCheck()` 会遍历所有 `required` 的设置项，并收集其中每个 `SettingCondition.name`。

### SettingErrorLocalization

| 字段 | 作用 |
| --- | --- |
| `settingNameToken` | 设置名称本地化 token。 |
| `settingName` | 设置枚举名。 |
| `required` | 是否参与必检错误集合。 |
| `errors` | 该设置项下的错误条件列表。 |

### SettingCondition

| 字段 | 作用 |
| --- | --- |
| `name` | `LevelErrorName`。 |
| `type` | `LevelErrorType`。 |
| `recommended` | 是否是推荐项。 |

`GetLocalized(string value = null)` 以 `RDString.Get("settingRequirement." + type)` 为模板，然后按错误类型替换 token。

| 错误类型 | 替换行为 |
| --- | --- |
| `EventNumberNotEnough` | `FinishLevelEventNumberNotEnough` 时填入最小数量 `3` 和 `editor.FinishLevel`。 |
| `FileSize` | 预览图填 `2 MB.`，syringe icon 填 `20 KB.`。 |
| `Length` | 按字段填 `256`、`1000` 或 `254`。 |
| `NumberOutRange` | 预览时长填 `1..20`，歌曲色相填 `0..100`。 |
| `WrongExtension` | 预览歌使用 `GC.SupportedAudioFiles`，其他使用 `GC.SupportedImageFiles`。 |
| `Dimensions` | `SyringeIconDimensions` 使用 `19 x 15`。 |
| `FileNotFound` | 替换 `[fileName]`。 |
| `FileCorruption` | 替换 `[fileName]`，并附加 `customLevelSelect.levelErrorName.<name>`。 |

### LevelErrorPresentation

`ShowErrors(List<LevelErrorName>, RDLevelSettings, string)` 会遍历 `errorContainer.showableErrors`，只处理 `required` 条目。每个设置项命中第一个错误时先写设置名，然后逐条追加 `SettingCondition.GetLocalized()` 生成的文本。资源文件找不到时，会把对应文件名作为动态值传入；关卡文件损坏错误会传入主 `.rdlevel` 路径。

## LevelErrorName 分组

| 分组 | 值 |
| --- | --- |
| 根数据 | `LevelDataNull`、`LevelSettingsNull`、`LevelEventsNull`、`LevelRowsNull` |
| 文本字段 | `ArtistNull`、`ArtistLength`、`SongNull`、`SongLength`、`AuthorNull`、`AuthorLength`、`DescriptionLength` |
| 预览图 | `PreviewImageNull`、`PreviewImageWrongExtension`、`PreviewImageFileNotFound`、`PreviewImageFileSize` |
| 注射器图标 | `SyringeIconNull`、`SyringeIconFileNotFound`、`SyringeIconWrongExtension`、`SyringeIconFileSize`、`SyringeIconDimensions` |
| 预览音频 | `PreviewSongWrongExtension`、`PreviewSongFileNotFound`、`PreviewSongStartTimeNegative`、`PreviewSongDurationOutRange` |
| 标签与模式 | `TagsNull`、`TagsLength`、`CanBePlayedOnNull` |
| 色相与 Rank | `SongLabelHueOutRange`、`RankMaxMistakesNull` |
| 独立 2P | `Separate2PLevelNull`、`Separate2PLevelWrongExtension`、`Separate2PLevelNotFound`、`Separate2PLevelDeserialization` |
| 事件数量 | `FinishLevelEventNumberNotEnough` |

## 相关页面

| 页面 | 关系 |
| --- | --- |
| [关卡数据模型](/api/data-models/level-data.md) | `RDLevelData` 是校验入口的数据对象。 |
| [关卡设置模型](/api/data-models/level-settings.md) | `RDLevelSettings` 是校验和自定义列表的核心字段。 |
| [Rank 与难度枚举](/api/data-models/rank-difficulty.md) | rank、难度和模式枚举。 |


