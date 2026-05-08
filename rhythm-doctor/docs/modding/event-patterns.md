# 事件写法索引

本页是阶段 6 的交叉索引，用来从源码研究角度整理常见事件组合。事件定义、字段、运行入口和 Inspector 读写规则仍以 [编辑器事件系统](/modules/editor-events.md) 与各事件专页为准。

## 阅读入口

| 目标 | 先读页面 |
| --- | --- |
| 查事件编号和归属 | [事件覆盖清单](/api/editor-events/event-coverage.md) |
| 查事件何时执行 | [事件运行路径](/api/editor-events/runtime-flow.md) |
| 查时间线和面板 | [时间线与事件控件](/api/editor-events/timeline-controls.md)、[Inspector 面板读写链路](/api/editor-events/inspector-flow.md) |
| 查事件公共字段 | [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) |
| 查自动面板字段生成 | [LevelEventInfo](/api/editor-events/LevelEventInfo.md)、[BasePropertyInfo](/api/editor-events/BasePropertyInfo.md) |

## 歌曲与节拍起点

| 需求 | 事件 | 说明 |
| --- | --- | --- |
| 播放关卡歌曲 | `PlaySong` | 加载歌曲、音量、开始偏移、Pitch 和旧音量字段迁移见 [PlaySong](/api/editor-events/PlaySong.md)。 |
| 设置 BPM | `SetBeatsPerMinute` | 修改时间线换算和运行时 BPM，细节见 [歌曲时间线事件](/api/editor-events/SongTimingEvents.md)。 |
| 设置每小节拍数 | `SetCrotchetsPerBar` | 修改小节刻度和时间线显示，细节见 [歌曲时间线事件](/api/editor-events/SongTimingEvents.md)。 |
| 播放独立音效 | `PlaySound`、`SetGameSound` | 音效事件、拍手音、计数音和游戏音效替换见 [音频与声音事件](/api/editor-events/AudioSoundEvents.md)。 |

这组事件通常决定后续 Beat、行移动和视觉事件对齐的时间基准。

## 行与 Beat 组合

| 需求 | 事件 | 说明 |
| --- | --- | --- |
| 创建行 | `MakeRow` | 行创建、角色、房间和玩家关系见 [行与节拍事件](/api/editor-events/row-events.md)。 |
| 创建 Classic Beat | `AddClassicBeat` | Classic 字段、Hold、Swing、Prepare 和 Run 见 [AddClassicBeat](/api/editor-events/AddClassicBeat.md)。 |
| 创建 Oneshot Beat | `AddOneshotBeat` | Oneshot 字段、预备音频、Hold 和验证见 [AddOneshotBeat](/api/editor-events/AddOneshotBeat.md)。 |
| 创建 FreeTime Beat | `AddFreeTimeBeat`、`PulseFreeTimeBeat` | 自由节拍、pulse 和行控制见 [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md)。 |
| 设置 X pattern | `SetRowXs` | X pattern、Synco、面板读写和时间线显示见 [SetRowXs](/api/editor-events/SetRowXs.md)。 |

源码里 Beat 事件会通过 `Prepare`、`RunPrebar` 或 `Run` 进入 `LevelBase` 与运行时行对象。具体运行链路见 [事件运行路径](/api/editor-events/runtime-flow.md) 和 [节拍与判定](/api/runtime/beats-judgement.md)。

## 行表现与角色

| 需求 | 事件 | 说明 |
| --- | --- | --- |
| 显示或隐藏行 | `HideRow` | 行显示状态和专项面板联动见 [行与节拍事件](/api/editor-events/row-events.md)。 |
| 移动行 | `MoveRow`、`SetRowXs` | 行位移、X pattern 和补间字段见 [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md)。 |
| 切换玩家行 | `ChangePlayersRows` | 玩家与行的归属切换见 [行与节拍事件](/api/editor-events/row-events.md)。 |
| 修改角色表现 | `ChangeCharacter`、`PlayExpression` | 角色替换和表情播放见 [文本控制与脚本事件](/api/editor-events/TextControlEvents.md)。 |
| 调整 Oneshot 波形 | `SetOneshotWave` | Oneshot 行波形控制见 [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md)。 |

## 视觉与镜头

| 需求 | 事件 | 说明 |
| --- | --- | --- |
| 设置主题和 VFX | `SetTheme`、`SetVFXPreset` | 主题、VFX preset 和桌面颜色见 [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md)。 |
| 设置背景前景 | `SetBackgroundColor`、`SetForeground` | 背景、前景和颜色事件见 [视觉与镜头事件](/api/editor-events/visual-camera-events.md)。 |
| 闪光与染色 | `Flash`、`CustomFlash`、`TintRows` | 闪光、行染色和自定义颜色见 [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md)。 |
| 镜头移动 | `MoveCamera` | 镜头目标、角度和补间见 [镜头与震屏事件](/api/editor-events/CameraShakeEvents.md)。 |
| 震屏与脉冲 | `ShakeScreen`、`PulseCamera`、`ShakeScreenCustom` | 镜头震动和自定义震屏见 [镜头与震屏事件](/api/editor-events/CameraShakeEvents.md)。 |

## 房间与精灵

| 需求 | 事件 | 说明 |
| --- | --- | --- |
| 控制房间显示 | `ShowRooms`、`MoveRoom`、`ReorderRooms` | 房间显示、移动、排序和透明度见 [房间控制事件](/api/editor-events/RoomControlEvents.md)。 |
| 控制房间渲染 | `SetRoomContentMode`、`MaskRoom`、`FadeRoom`、`SetRoomPerspective` | 房间内容模式、遮罩、淡入淡出和透视顶点见 [房间控制事件](/api/editor-events/RoomControlEvents.md)。 |
| 创建自定义精灵 | `MakeSprite` | 自定义资源加载、精灵注册和初始状态见 [精灵生命周期事件](/api/editor-events/SpriteLifecycleEvents.md)。 |
| 移动和播放精灵 | `Move`、`PlayAnimation` | 精灵移动、补间和动画播放见 [精灵生命周期事件](/api/editor-events/SpriteLifecycleEvents.md)。 |
| 渲染和排序精灵 | `Tint`、`Tile`、`SetVisible`、`ReorderSprite`、`Blend` | 染色、平铺、显示、排序和混合见 [精灵渲染与排序事件](/api/editor-events/SpriteRenderEvents.md)。 |

## 文本、标签与脚本控制

| 需求 | 事件 | 说明 |
| --- | --- | --- |
| 显示对话 | `ShowDialogue` | 普通文本、Ink 指令、本地化和自定义角色准备见 [ShowDialogue](/api/editor-events/ShowDialogue.md)。 |
| 显示浮动文字 | `FloatingText`、`AdvanceText` | 浮动文字、歌词推进和朗读见 [FloatingText 事件](/api/editor-events/FloatingTextEvents.md)。 |
| 旁白与文字效果 | `ReadNarration`、`NarrateRowInfo`、`TextExplosion` | 旁白、行信息和文字爆炸见 [文本控制与脚本事件](/api/editor-events/TextControlEvents.md)。 |
| 编辑器注释脚本 | `Comment`、`CommentShow` | 注释指令和显示控制见 [文本控制与脚本事件](/api/editor-events/TextControlEvents.md)。 |
| 标签触发 | `TagAction` | 对带标签事件执行、启用、禁用或随机运行，见 [文本控制与脚本事件](/api/editor-events/TextControlEvents.md)。 |
| 自定义方法事件 | `CallCustomMethod` | 通过事件字符串调用方法或读写字段，细节见 [自定义方法事件](/api/editor-events/custom-methods.md)。 |

`CallCustomMethod` 是编辑器事件系统的一员。阶段 6 的 [可调用方法索引](/modding/callable-methods.md) 只从源码研究角度整理它可触达的入口。

## 窗口与收尾控制

| 需求 | 事件 | 说明 |
| --- | --- | --- |
| 控制窗口舞蹈 | `NewWindowDance`、`WindowResize` | 窗口舞蹈、缩放和真实窗口链路见 [窗口控制事件](/api/editor-events/WindowControlEvents.md)。 |
| 控制窗口内容 | `SetWindowContent`、`SetMainWindow` | 窗口内容、主窗口和渲染目标见 [窗口控制事件](/api/editor-events/WindowControlEvents.md)。 |
| 控制窗口顺序和显示 | `ReorderWindows`、`RenameWindow`、`HideWindow` | 窗口排序、标题和显示状态见 [窗口控制事件](/api/editor-events/WindowControlEvents.md)。 |
| 关卡收尾 | `FinishLevel`、`SetPlayStyle`、`ShowStatusSign`、`SayReadyGetSetGo`、`BassDrop` | 完成关卡、播放风格、状态牌和 RDGS 见 [杂项游戏事件](/api/editor-events/MiscGameEvents.md)。 |

## 按执行时机阅读

| 执行时机 | 适合查的事件 |
| --- | --- |
| `OnPrebar` | 歌曲、BPM、Beat 准备、行创建和需要提前进入运行时对象的事件。 |
| `OnBar` | 大多数视觉、房间、精灵、窗口、文本和控制事件。 |
| 标签触发 | 带 `tag` 的事件与 `TagAction` 协作，执行规则见 [文本控制与脚本事件](/api/editor-events/TextControlEvents.md)。 |
| Scrub 追赶 | 预览或跳转时间线时的追赶逻辑见 [事件运行路径](/api/editor-events/runtime-flow.md)。 |

## 源码阅读顺序

1. 从 [事件覆盖清单](/api/editor-events/event-coverage.md) 找到事件类和页面归属。
2. 阅读对应分组页，确认字段、面板和运行入口。
3. 对核心事件进入专页，例如 `PlaySong`、`AddClassicBeat`、`AddOneshotBeat`、`ShowDialogue`、`SetRowXs`。
4. 需要理解 UI 写回时，回到 [Inspector 面板读写链路](/api/editor-events/inspector-flow.md)。
5. 需要理解运行顺序时，回到 [事件运行路径](/api/editor-events/runtime-flow.md)。


