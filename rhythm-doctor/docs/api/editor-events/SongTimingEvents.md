# Song Timing Events

本页深写两个歌曲时间线基础事件：`SetBeatsPerMinute` 和 `SetCrotchetsPerBar`。它们与 `PlaySong` 一起决定歌曲播放、BPM 变化、小节长度和编辑器时间换算。

## 类型总览

| 事件类型 | 事件类 | 面板类 | 时间线控件 | 作用 |
| --- | --- | --- | --- | --- |
| `SetBeatsPerMinute` | `LevelEvent_SetBeatsPerMinute` | `InspectorPanel_SetBeatsPerMinute` | `LevelEventControl_Song` | 设置 BPM 并登记 BPM change |
| `SetCrotchetsPerBar` | `LevelEvent_SetCrotchetsPerBar` | `InspectorPanel_SetCrotchetsPerBar` | `LevelEventControl_Song` | 设置每小节 crotchet 数和视觉拍长倍率 |

## SetBeatsPerMinute

| 项目 | 内容 |
| --- | --- |
| 源码 | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/LevelEvent_SetBeatsPerMinute.cs` |
| 继承 | `LevelEvent_Base` |
| 执行时机 | `LevelEventExecutionTime.OnPrebar` |
| 排序偏移 | `-9` |
| Y 排序 | `-10` |
| 房间使用 | `RoomsUsage.NotUsed` |

### 属性

| 属性 | 类型 | 默认值 | 序列化 | 作用 |
| --- | --- | --- | --- | --- |
| `beatsPerMinute` | `float` | `100f` | 是 | 目标 BPM，范围属性为 1 到 1000，并使用 BPM 计算器控件 |

### Run

`Run()` 分两步处理 BPM：

| 条件或步骤 | 行为 |
| --- | --- |
| `beat` 接近 1 | 调用 `conductor.SetBPM(beatsPerMinute)`，立即设置当前 BPM |
| 每次运行 | 调用 `conductor.AddBPMChange(beat - 1, beatsPerMinute)`，把当前小节内 BPM 变化登记到 conductor |

`GetTooltipText()` 返回 `{beatsPerMinute} BPM`。

## SetCrotchetsPerBar

| 项目 | 内容 |
| --- | --- |
| 源码 | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/LevelEvent_SetCrotchetsPerBar.cs` |
| 继承 | `LevelEvent_Base` |
| 执行时机 | `LevelEventExecutionTime.OnPrebar` |
| 排序偏移 | `0` |
| Y 排序 | `-10` |
| 房间使用 | `RoomsUsage.NotUsed` |

### 属性

| 属性 | 类型 | 默认值 | 序列化 | 作用 |
| --- | --- | --- | --- | --- |
| `crotchetsPerBar` | `int` | `8` | 是 | 每小节 crotchet 数，范围属性为 1 到 `int.MaxValue` |
| `visualBeatMultiplier` | `float` | `1f` | 是 | 视觉拍长倍率，范围属性为 0 到正无穷 |

### Run

| 字段 | 写入目标 |
| --- | --- |
| `crotchetsPerBar` | `conductor.crotchetsPerBar` |
| `visualBeatMultiplier` | `conductor.visualBeatLengthMultiplier` |

`GetTooltipText()` 会显示视觉拍长倍率。`crotchetsPerBar >= 10` 时，Tooltip 还会额外显示 `{crotchetsPerBar}/4`。

## Inspector 面板

| 面板 | 行为 |
| --- | --- |
| `InspectorPanel_SetBeatsPerMinute` | 无额外重写，使用自动面板读写 `beatsPerMinute` |
| `InspectorPanel_SetCrotchetsPerBar` | 保存属性后调用 `timeline.UpdateUI()`，立即刷新时间线 |

## 时间线控件

两者都使用 `LevelEventControl_Song`。

| 事件 | 控件显示 |
| --- | --- |
| `SetBeatsPerMinute` | 使用普通事件图标，宽度为 `min(14, cellWidth)` |
| `SetCrotchetsPerBar` | 使用 `cpbIcon`，显示 `crotchetsPerBar` 数字；大于 9 时显示 `-` |

`LevelEventControl_Song` 会把控件放在 `timeline.GetPosXFromBarAndBeat(bar, beat)` 对应的 X 坐标，Y 坐标来自 `timeline.GetPosYFromRowIndex(levelEvent.y)`。

## 与 LevelBase 和 Timeline 的关系

| 类型 | 关系 |
| --- | --- |
| `LevelBase` | 收集 `SetCrotchetsPerBar` 到 `cpbEvents`，构建 `crotchetsInEachBar`；收集 `SetBeatsPerMinute` 到 BPM change 列表 |
| `Timeline` | 使用 `SetCrotchetsPerBar` 列表在小节和列之间换算位置 |
| `Timeline` | 使用 `SetBeatsPerMinute` 事件绘制时间线上的 BPM 相关辅助信息 |
| `scnEditor` | 对 `PlaySong`、`SetCrotchetsPerBar`、`SetBeatsPerMinute`、`SetRowXs` 这类事件会触发时间线更新 |

## 与 PlaySong 的关系

| 事件 | 关系 |
| --- | --- |
| `PlaySong` | 播放歌曲时也会调用 `conductor.SetBPM(beatsPerMinute)` |
| `SetBeatsPerMinute` | 用于歌曲播放后的 BPM 改变和小节内 BPM change |
| `SetCrotchetsPerBar` | 改变后续小节长度和编辑器坐标换算 |

## 相关页面

| 页面 | 关系 |
| --- | --- |
| [PlaySong](/api/editor-events/PlaySong.md) | 歌曲播放和初始 BPM |
| [歌曲与音频事件](/api/editor-events/song-audio-events.md) | 所属事件分组 |
| [scrConductor](/api/core/scrConductor.md) | BPM、拍号和歌曲播放执行对象 |
| [事件运行路径](/api/editor-events/runtime-flow.md) | `Run` 和按拍调度机制 |



