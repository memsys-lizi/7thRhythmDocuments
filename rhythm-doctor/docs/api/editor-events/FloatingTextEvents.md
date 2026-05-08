# FloatingText Events

本页深写 `FloatingText` 和 `AdvanceText`。这两个事件是一组配套文本事件：`FloatingText` 创建歌词/浮动文字实例，`AdvanceText` 按相同 `id` 推进同组文字。

## 类型总览

| 事件类型 | 事件类 | 面板类 | 时间线控件 | 作用 |
| --- | --- | --- | --- | --- |
| `FloatingText` | `LevelEvent_FloatingText` | `InspectorPanel_FloatingText` | `LevelEventControl_Action` | 创建浮动文字或重置并推进已有文字 |
| `AdvanceText` | `LevelEvent_AdvanceText` | `InspectorPanel_AdvanceText` | `LevelEventControl_Action` | 推进指定 `FloatingText.id` 的下一段文字 |

## FloatingText 基本信息

| 项目 | 内容 |
| --- | --- |
| 源码 | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/LevelEvent_FloatingText.cs` |
| 继承 | `LevelEvent_Base, IDurationHaver` |
| 执行时机 | `LevelEventExecutionTime.OnBar` |
| 房间使用 | `RoomsUsage.ManyRoomsAndOnTop` |
| Y 排序 | `-10` |

## FloatingText 属性

| 属性 | 类型 | 默认值 | 作用 |
| --- | --- | --- | --- |
| `id` | `int` | 创建时生成 | 文本组 ID，`AdvanceText` 用它找到目标 |
| `text` | `string` | 示例文本 | 歌词或浮动文字内容 |
| `times` | `string` | 空 | 当前源码保留字段 |
| `color` | `ColorOrPalette` | `Color.white` | 填充颜色 |
| `outlineColor` | `ColorOrPalette` | `Color.black` | 描边颜色 |
| `textPosition` | `Vector2` | `(50, 50)` | 百分比屏幕位置 |
| `font` | `TextFont` | 枚举默认值 | 字体 |
| `size` | `int` | `8` | 字号 |
| `angle` | `float` | `0` | 旋转角度 |
| `showChildren` | `bool` | `true` | 是否在时间线显示同组 `AdvanceText` 子事件 |
| `fadeOutDuration` | `float` | `3f` | 淡出时长，也是 `IDurationHaver.duration` |
| `mode` | `FloatingTextMode` | `FadeOut` | 消失方式 |
| `anchor` | `TextAnchor` | `MiddleCenter` | 文本锚点 |
| `narrate` | `bool` | `true` | 是否朗读文字 |
| `narrationCategory` | `NarrationCategory` | `Subtitles` | 朗读分类 |

## FloatingText 生命周期

| 方法 | 行为 |
| --- | --- |
| `Init()` | 写入示例文本 |
| `OnCreate()` | 调用 `GenerateNewID()` |
| `GenerateNewID()` | 从 0 开始寻找编辑器中未被其他 `FloatingText` 使用的 ID |
| `OnDelete()` | 删除所有同 ID 的 `AdvanceText` 控件 |
| `Prepare()` | 调用 `GetLocalizedText()`，把 `[[key]]` 形式文本替换为本地化文本 |
| `Decode()` | 关卡版本 `<= 50` 时关闭朗读；`narrationCategory == Main` 时改为 `Fallback` |
| `CopyFromInternal()` | 复制文本、样式、位置、朗读和 ID 等字段 |

## FloatingText Run

`Run()` 使用 `RunOnBeat` 执行。

| 分支 | 行为 |
| --- | --- |
| `vfx.allLyrics` 已包含 `id` | 遍历 `currentIds`，重置对应 `LyricsGame` 并调用 `AdvanceText()` |
| 不存在同 ID 歌词 | 按房间创建新的歌词对象，并立即推进第一段 |
| 朗读开启 | 拼接 `splitLyrics`，去掉富文本颜色标签，求值花括号表达式后调用 `Narration.Say` |

创建歌词时，事件会把 `textPosition` 从百分比换算到 RD 画面坐标；每个房间会生成一个歌词对象，第一个房间使用事件 `id`，后续房间使用临时 ID。`followCam` 会在目标房间不是 `-1` 且房间不处于 `peekWindowMode` 时开启。

## AdvanceText 基本信息

| 项目 | 内容 |
| --- | --- |
| 源码 | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/LevelEvent_AdvanceText.cs` |
| 继承 | `LevelEvent_Base, IDurationHaver` |
| 执行时机 | `LevelEventExecutionTime.OnBar` |
| 房间使用 | `RoomsUsage.NotUsed` |
| Y 排序 | `-10` |

## AdvanceText 属性

| 属性 | 类型 | 默认值 | 作用 |
| --- | --- | --- | --- |
| `id` | `int` | 0 | 目标 `FloatingText.id` |
| `fadeOutDuration` | `float?` | 空 | 本次推进使用的淡出时长覆盖值 |
| `duration` | `float` | 计算值 | 有覆盖值时返回覆盖值，否则返回父 `FloatingText.fadeOutDuration` |
| `floatingText` | `LevelEvent_FloatingText` | 查找结果 | 在编辑器事件控件中寻找相同 ID 的 `FloatingText` |

## AdvanceText Run

`Run()` 会计算可选自定义淡出秒数，然后遍历当前关卡事件列表寻找同 ID 的 `FloatingText`。

| 步骤 | 行为 |
| --- | --- |
| 计算淡出 | `fadeOutDuration` 有值时，用 conductor 把拍数换成秒 |
| 查找父事件 | 遍历 `RDLevelData.current.levelEvents` 找同 ID `FloatingText` |
| 推进文字 | 若 `vfx.allLyrics` 包含父 ID，遍历父事件 `currentIds` 并调用 `LyricsGame.AdvanceText(customFadeTime)` |

## AdvanceText Tooltip

`GetTooltipText()` 会根据当前 `AdvanceText` 在同组里的序号，取父 `FloatingText.GetLocalizedText()` 拆分后的对应片段。若序号超出文本片段数量，返回 `null`。

## FloatingText 面板

`InspectorPanel_FloatingText` 是手工面板。

| UI 控件 | 写回字段 |
| --- | --- |
| `lyrics` | `text` |
| `textFont` | `font` |
| `color` | `color` |
| `outlineColor` | `outlineColor` |
| `textPosition` | `textPosition` |
| `size` | `size` |
| `angle` | `angle` |
| `showChildren` | `showChildren` |
| `fadeOutDuration` | `fadeOutDuration` |
| `mode` | `mode` |
| `narrate` | `narrate` |
| `narrationCategory` | `narrationCategory` |
| `horizontalAlignment` / `verticalAlignment` | `anchor` |

`UpdateEvents()` 会按歌词拆分数量自动补齐缺少的 `AdvanceText` 事件，并把这些子事件放到当前事件之后的拍点上。

## AdvanceText 面板

`InspectorPanel_AdvanceText` 也是手工面板。

| UI 控件 | 行为 |
| --- | --- |
| `id` | 显示目标 ID，但保存逻辑没有写回 ID |
| `fadeOutDuration` | 空文本表示不覆盖父事件淡出时长 |
| `fragment` | 显示当前 `AdvanceText` 对应的歌词片段；找不到父事件、片段超出或事件禁用时显示不同状态 |

`SelectFloatingTextEvent()` 会选中同 ID 的父 `FloatingText` 控件。

## 时间线联动

`LevelEventControl_Action` 对这组事件有特殊处理：

| 事件 | 行为 |
| --- | --- |
| `FloatingText` | 更新所有同 ID `AdvanceText` 的 `y`，并刷新这些控件 |
| `AdvanceText` | 控件宽度减半；如果找到父 `FloatingText`，继承父事件颜色并跟随父事件的 `showChildren` |
| 双击 `FloatingText` | 选中所有同 ID `AdvanceText` |
| 双击 `AdvanceText` | 选中父 `FloatingText` 和其他同 ID `AdvanceText` |

## 相关页面

| 页面 | 关系 |
| --- | --- |
| [文本与脚本控制事件](/api/editor-events/text-control-events.md) | 所属事件分组 |
| [ShowDialogue](/api/editor-events/ShowDialogue.md) | 同属文本系统的对话事件 |
| [Inspector 面板读写链路](/api/editor-events/inspector-flow.md) | 手工面板读写路径 |
| [事件运行路径](/api/editor-events/runtime-flow.md) | `RunOnBeat` 调度机制 |


