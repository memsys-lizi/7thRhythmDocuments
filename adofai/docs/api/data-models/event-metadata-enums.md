# 事件类型与属性枚举

## 基本信息

| 类型 | 源码路径 | 作用 |
| --- | --- | --- |
| `LevelEventType` | `7thRhythmSource/ADOFAi/ADOFAI/LevelEventType.cs` | 关卡事件、装饰事件和 settings 事件的类型枚举。 |
| `LevelEventCategory` | `7thRhythmSource/ADOFAi/ADOFAI/LevelEventCategory.cs` | 编辑器事件分类枚举。 |
| `LevelEventExecutionTime` | `7thRhythmSource/ADOFAi/ADOFAI/LevelEventExecutionTime.cs` | 事件执行时机枚举。 |
| `PropertyType` | `7thRhythmSource/ADOFAi/ADOFAI/PropertyType.cs` | 事件属性数据类型枚举。 |
| `ControlType` | `7thRhythmSource/ADOFAi/ADOFAI/ControlType.cs` | 编辑器属性控件类型枚举。 |
| `FileType` | `7thRhythmSource/ADOFAi/ADOFAI/FileType.cs` | 文件属性选择类型枚举。 |

这些枚举共同支撑 ADOFAI 的事件元数据系统。`ADOStartup.SetupLevelEventsInfo()` 会从 `LevelEditorProperties` 资源读取字符串，再解析为这些枚举或类型。

## LevelEventType

`LevelEventType` 的枚举成员如下：

| 顺序 | 成员 |
| --- | --- |
| 0 | `None` |
| 1 | `SetSpeed` |
| 2 | `Twirl` |
| 3 | `Checkpoint` |
| 4 | `LevelSettings` |
| 5 | `SongSettings` |
| 6 | `TrackSettings` |
| 7 | `BackgroundSettings` |
| 8 | `CameraSettings` |
| 9 | `MiscSettings` |
| 10 | `EventSettings` |
| 11 | `DecorationSettings` |
| 12 | `MoveCamera` |
| 13 | `CustomBackground` |
| 14 | `ChangeTrack` |
| 15 | `ColorTrack` |
| 16 | `AnimateTrack` |
| 17 | `RecolorTrack` |
| 18 | `MoveTrack` |
| 19 | `AddDecoration` |
| 20 | `AddText` |
| 21 | `SetText` |
| 22 | `Flash` |
| 23 | `SetHitsound` |
| 24 | `SetFilter` |
| 25 | `SetFilterAdvanced` |
| 26 | `SetPlanetRotation` |
| 27 | `HallOfMirrors` |
| 28 | `ShakeScreen` |
| 29 | `MoveDecorations` |
| 30 | `PositionTrack` |
| 31 | `RepeatEvents` |
| 32 | `Bloom` |
| 33 | `Hold` |
| 34 | `SetHoldSound` |
| 35 | `SetConditionalEvents` |
| 36 | `ScreenTile` |
| 37 | `ScreenScroll` |
| 38 | `EditorComment` |
| 39 | `Bookmark` |
| 40 | `CallMethod` |
| 41 | `AddComponent` |
| 42 | `PlaySound` |
| 43 | `MultiPlanet` |
| 44 | `FreeRoam` |
| 45 | `FreeRoamTwirl` |
| 46 | `FreeRoamRemove` |
| 47 | `FreeRoamWarning` |
| 48 | `Pause` |
| 49 | `AutoPlayTiles` |
| 50 | `Hide` |
| 51 | `ScaleMargin` |
| 52 | `ScaleRadius` |
| 53 | `Multitap` |
| 54 | `TileDimensions` |
| 55 | `KillPlayer` |
| 56 | `ScalePlanets` |
| 57 | `SetFloorIcon` |
| 58 | `AddObject` |
| 59 | `SetObject` |
| 60 | `SetDefaultText` |
| 61 | `SetFrameRate` |
| 62 | `AddParticle` |
| 63 | `SetParticle` |
| 64 | `EmitParticle` |
| 65 | `SetInputEvent` |

`LevelEventType` 既包含普通运行时事件，也包含 `LevelSettings`、`SongSettings`、`TrackSettings` 等 settings 事件。`ADOStartup.SetupLevelEventsInfo()` 会把每个枚举值映射到同名字符串，写入 `GCS.levelEventTypeString`。

## LevelEventCategory

| 成员 | 作用位置 |
| --- | --- |
| `Gameplay` | 事件分类。 |
| `TrackFx` | 事件分类。 |
| `DecorationFx` | 事件分类。 |
| `VisualFx` | 事件分类。 |
| `FxModifiers` | 事件分类。 |
| `Conveniences` | 事件分类。 |
| `Jank` | 事件分类。 |
| `Favorites` | 事件分类。 |

分类数据不是写在枚举里，而是由 `ADOStartup.DecodeLevelEventCategoryList()` 读取资源中的 `categories` 列表，把分类追加到对应 `LevelEventInfo.categories`。

## LevelEventExecutionTime

| 成员 | 用途 |
| --- | --- |
| `OnPrebar` | 事件元数据中的执行时机。 |
| `OnBar` | 事件元数据中的执行时机，也是解析失败时的默认值。 |
| `Special` | 事件元数据中的特殊执行时机。 |

## PropertyType

| 成员 | 用途 |
| --- | --- |
| `NotAssigned` | 未分配。 |
| `Bool` | 布尔属性。 |
| `Int` | 整数属性。 |
| `Float` | 浮点属性。 |
| `String` | 单行字符串属性。 |
| `LongString` | 长文本属性。 |
| `Color` | 颜色属性。 |
| `File` | 文件路径属性。 |
| `Enum` | 枚举属性。 |
| `Vector2` | 二维向量属性。 |
| `Tile` | 地板引用属性。 |
| `Export` | 导出属性。 |
| `Rating` | 评分属性。 |
| `Array` | 数组属性。 |
| `FloatPair` | 浮点数对属性。 |
| `Vector2Range` | 二维向量范围属性。 |
| `MinMaxGradient` | 粒子渐变属性。 |
| `List` | 列表属性。 |
| `FilterProperties` | 滤镜属性集合。 |
| `ParticlePlayback` | 粒子播放属性。 |
| `Note` | 编辑器说明属性。 |

`PropertyInfo` 构造函数按资源中的 `type` 字符串设置 `PropertyType`，`LevelEvent.Decode()` 和 `LevelEvent.Encode()` 再按 `PropertyType` 选择解码和编码分支。

## ControlType

| 成员 | 用途 |
| --- | --- |
| `NotAssigned` | 未分配。 |
| `InputField` | 输入框。 |
| `LongInputField` | 长文本输入框。 |
| `ColorPicker` | 颜色选择器。 |
| `Dropdown` | 下拉框。 |
| `ToggleGroup` | 开关组。 |
| `File` | 文件选择控件。 |
| `FloatPair` | 浮点数对控件。 |
| `Hidden` | 隐藏控件。 |
| `MinMaxGradient` | 最小最大渐变控件。 |
| `ParticlePlayback` | 粒子播放控件。 |

`PropertyInfo` 会先按属性类型推导 `controlType`，如果资源字典含有 `control` 字段，再用该字段覆盖推导结果。

## FileType

| 成员 | 用途 |
| --- | --- |
| `Audio` | 音频文件属性。 |
| `Image` | 图片文件属性。 |
| `Video` | 视频文件属性。 |

`PropertyInfo` 在处理 `File` 属性时从资源字段 `fileType` 读取 `FileType`。

