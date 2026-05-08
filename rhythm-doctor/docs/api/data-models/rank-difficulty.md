# Rank 与难度枚举

本页整理 rank、关卡选择难度、自定义关卡难度、关卡来源和关卡类型相关枚举。

## 源码范围

| 类型 | 源码路径 | 职责 |
| --- | --- | --- |
| `Rank` | `RDFucked/Assets/Scripts/Assembly-CSharp/Rank.cs` | 关卡成绩值类型，支持普通、加号、减号、未完成和比较。 |
| `Difficulty` | `RDFucked/Assets/Scripts/Assembly-CSharp/Difficulty.cs` | 官方关卡选择界面的教程、普通、夜班和 Challenge 难度。 |
| `LevelDifficulty` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelDifficulty.cs` | 自定义关卡设置中的显示难度。 |
| `LevelPlayMode` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelPlayMode.cs` | 自定义关卡支持的玩家模式。 |
| `LevelType` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelType.cs` | 运行时关卡类型。 |
| `LevelSource` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelSource.cs` | 运行时关卡来源。 |

## Rank 值

`Rank` 是 struct，内部保存 `int internalValue`，并提供到 int 的隐式转换。

| 常量 | 值 | 字符串 |
| --- | --- | --- |
| `NeverSelected` | `-3` | `NeverSelected` |
| `NotAvailable` | `-2` | `NotAvailable` |
| `NotFinished` | `-1` | `NotFinished` |
| `Fminus` | `-10` | `F-` |
| `F` | `0` | `F` |
| `Fplus` | `10` | `F+` |
| `Dminus` | `-11` | `D-` |
| `D` | `1` | `D` |
| `Dplus` | `11` | `D+` |
| `Cminus` | `-12` | `C-` |
| `C` | `2` | `C` |
| `Cplus` | `12` | `C+` |
| `Bminus` | `-13` | `B-` |
| `B` | `3` | `B` |
| `Bplus` | `13` | `B+` |
| `Aminus` | `-14` | `A-` |
| `A` | `4` | `A` |
| `Aplus` | `14` | `A+` |
| `Sminus` | `-15` | `S-` |
| `S` | `5` | `S` |
| `Splus` | `15` | `S+` |

| 业务常量 | 值 | 作用 |
| --- | --- | --- |
| `ToPass` | `3` | B 及以上视为通过。 |
| `ForMedal` | `4` | A 及以上用于奖牌和夜班解锁判断。 |
| `BossClear` | `4` | Boss 通过值。 |
| `BossNoCheckpoints` | `14` | Boss 无 checkpoint 通过，等价 A+。 |
| `BossPerfect` | `5` | Boss 完美，等价 S。 |

## Rank 属性与方法

| 成员 | 行为 |
| --- | --- |
| `passed` | `ToNormal() >= 3`。 |
| `perfected` | `ToNormal() == 5`。 |
| `unlocksNightShift` | `ToNormal() >= 4`。 |
| `isNormalRank` | `ToNormal()` 在 `0..5` 之间。 |
| `noCheckpoints` | `internalValue == 14`。 |
| `FromString(string)` | 把 `F`、`F+`、`S-`、`NotFinished` 等字符串转成 Rank；默认返回 F。 |
| `ToString()` | 把内部值转成显示字符串；未列出的值返回 `F`。 |
| `ComparativeInt()` | 把加号、减号和普通 rank 合并成 `0..5`，特殊未完成值返回 `-1`。 |
| `ToNormal()` | 把 `S+`、`S-` 转成 `S`，其他加减号同理。 |
| `ToPlus()` | 普通 F 到 S 转成 F+ 到 S+。 |
| `ToMinus()` | 普通 F 到 S 转成 F- 到 S-。 |

`Persistence.IsBetterRank()` 使用 `ToNormal()` 比较新旧成绩；`Conditional_Custom` 使用 `ComparativeInt()` 比较自定义条件中的 rank；`Rankscreen` 使用 `ToNormal()` 选择 rank 描述。

## Difficulty

`Difficulty` 是官方关卡选择界面使用的难度。

| 值 | 数值 | 用途 |
| --- | --- | --- |
| `Tutorial` | `0` | 教程关卡。 |
| `Normal` | `1` | 白天或普通难度。 |
| `Hard` | `2` | 夜班或 hard 难度。 |
| `Challenge` | `3` | Challenge 难度。 |

`scnLevelSelect` 用 `Dictionary<Difficulty, Level>` 把角色和关卡映射起来，并用 `currentDifficulty` 切换普通与 Hard 关卡。`HeartMonitor.Show()` 接收 `Difficulty` 来显示对应角色肖像和 BPM。

## LevelDifficulty

`LevelDifficulty` 是自定义关卡设置中的显示难度，保存在 `RDLevelSettings.difficulty`。

| 值 | 数值 |
| --- | --- |
| `Easy` | `0` |
| `Medium` | `1` |
| `Tough` | `2` |
| `VeryTough` | `3` |

`InspectorPanel_LevelSettings` 提供这四个可选值；`LevelDetail` 和 `scnCLS` 用 `RDString.Get("enum.LevelDifficulty." + settings.difficulty)` 显示本地化难度。

## LevelPlayMode

`LevelPlayMode` 表示自定义关卡支持的玩家模式。

| 值 | 数值 | 行为 |
| --- | --- | --- |
| `None` | `0` | 校验中会触发 `CanBePlayedOnNull`。 |
| `OnePlayerOnly` | `1` | 只支持单人。 |
| `TwoPlayerOnly` | `2` | 只支持双人。 |
| `BothModes` | `3` | 单人和双人都支持。 |

`LevelDetail` 根据该值决定关卡能否以当前玩家模式启动；当 `BothModes` 且 `separate2PLevelFilename` 非空时，会使用独立双人 `.rdlevel` 文件。

## LevelType

`LevelType` 是运行时关卡类型，保存在 `LevelBase.levelType`。

| 值 | 数值 | 用途 |
| --- | --- | --- |
| `Tutorial` | `0` | 教程关卡。 |
| `Regular` | `1` | 常规关卡。 |
| `Boss` | `2` | Boss 关卡。 |
| `Bonus` | `3` | Bonus 关卡。 |
| `Intermission` | `4` | 幕间关卡。 |
| `Collab` | `5` | 合作关卡。 |
| `Challenge` | `6` | Challenge 关卡。 |
| `Intro` | `7` | Intro 关卡。 |
| `Cutscene` | `8` | Cutscene。 |

`scnGame` 用 `LevelType` 判断 loading screen、是否可跳过、是否可重开、是否可退出、结算保存和教程跳转等流程。

## LevelSource

`LevelSource` 记录 `scnGame` 加载关卡的来源。

| 值 | 数值 | 来源 |
| --- | --- | --- |
| `ExternalPath` | `0` | 外部文件路径，主要用于自定义关卡和编辑器预览。 |
| `InternalPath` | `1` | 内置关卡资源或 `Level_*` 类。 |
| `CutscenesPath` | `2` | Cutscene 资源路径。 |

`scnGame.Start()` 根据 `levelToLoadSource` 选择读取外部 `.rdlevel`、`Resources/InternalLevels` 或 cutscene 路径。`Rankscreen.ShowAndSaveRank()` 也会根据来源决定保存普通关卡成绩还是自定义关卡成绩。

## 相关页面

| 页面 | 关系 |
| --- | --- |
| [关卡设置模型](/api/data-models/level-settings.md) | `LevelDifficulty` 和 `LevelPlayMode` 来自 settings。 |
| [自定义关卡与错误模型](/api/data-models/custom-levels-errors.md) | 自定义关卡校验会使用 `LevelPlayMode`。 |
| [场景流程与暂停流程](/api/runtime/scene-flow.md) | `LevelType` 和 `LevelSource` 决定运行时加载、跳过、重开和结算分支。 |



