# 事件覆盖清单

本页按 `LevelEventType` 枚举顺序记录事件页面覆盖情况。枚举来自 `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/LevelEventType.cs`，具体事件类来自 `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/LevelEvent_*.cs`。

## 覆盖状态

| 状态 | 含义 |
| --- | --- |
| 分组已覆盖 | 已在分组页解释事件职责和主要字段 |
| 专页已覆盖 | 已有独立页面解释事件或控件专项 |

## 总览

| 编号 | 事件类型 | 事件类 | 当前页面 | 状态 |
| --- | --- | --- | --- | --- |
| 0 | `None` | `LevelEvent_Base` | [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) | 专页已覆盖 |
| 1 | `PlaySong` | `LevelEvent_PlaySong` | [PlaySong](/api/editor-events/PlaySong.md) | 专页已覆盖 |
| 2 | `SetCrotchetsPerBar` | `LevelEvent_SetCrotchetsPerBar` | [歌曲时间线事件](/api/editor-events/SongTimingEvents.md) | 专页已覆盖 |
| 3 | `PlaySound` | `LevelEvent_PlaySound` | [音频与声音事件](/api/editor-events/AudioSoundEvents.md) | 专页已覆盖 |
| 4 | `SetBeatsPerMinute` | `LevelEvent_SetBeatsPerMinute` | [歌曲时间线事件](/api/editor-events/SongTimingEvents.md) | 专页已覆盖 |
| 5 | `SetClapSounds` | `LevelEvent_SetClapSounds` | [音频与声音事件](/api/editor-events/AudioSoundEvents.md) | 专页已覆盖 |
| 6 | `SetHeartExplodeVolume` | `LevelEvent_SetHeartExplodeVolume` | [杂项游戏事件](/api/editor-events/MiscGameEvents.md) | 专页已覆盖 |
| 7 | `SetHeartExplodeInterval` | `LevelEvent_SetHeartExplodeInterval` | [杂项游戏事件](/api/editor-events/MiscGameEvents.md) | 专页已覆盖 |
| 8 | `SayReadyGetSetGo` | `LevelEvent_SayReadyGetSetGo` | [杂项游戏事件](/api/editor-events/MiscGameEvents.md) | 专页已覆盖 |
| 9 | `SetGameSound` | `LevelEvent_SetGameSound` | [音频与声音事件](/api/editor-events/AudioSoundEvents.md) | 专页已覆盖 |
| 10 | `SetBeatSound` | `LevelEvent_SetBeatSound` | [音频与声音事件](/api/editor-events/AudioSoundEvents.md) | 专页已覆盖 |
| 11 | `SetCountingSound` | `LevelEvent_SetCountingSound` | [音频与声音事件](/api/editor-events/AudioSoundEvents.md) | 专页已覆盖 |
| 12 | `AddClassicBeat` | `LevelEvent_AddClassicBeat` | [AddClassicBeat](/api/editor-events/AddClassicBeat.md) | 专页已覆盖 |
| 13 | `AddOneshotBeat` | `LevelEvent_AddOneshotBeat` | [AddOneshotBeat](/api/editor-events/AddOneshotBeat.md) | 专页已覆盖 |
| 14 | `SetRowXs` | `LevelEvent_SetRowXs` | [SetRowXs](/api/editor-events/SetRowXs.md) | 专页已覆盖 |
| 15 | `AddFreeTimeBeat` | `LevelEvent_AddFreeTimeBeat` | [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 专页已覆盖 |
| 16 | `PulseFreeTimeBeat` | `LevelEvent_PulseFreeTimeBeat` | [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 专页已覆盖 |
| 17 | `SetTheme` | `LevelEvent_SetTheme` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 18 | `SetVFXPreset` | `LevelEvent_SetVFXPreset` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 19 | `SetBackgroundColor` | `LevelEvent_SetBackgroundColor` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 20 | `SetForeground` | `LevelEvent_SetForeground` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 21 | `SetSpeed` | `LevelEvent_SetSpeed` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 22 | `Flash` | `LevelEvent_Flash` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 23 | `CustomFlash` | `LevelEvent_CustomFlash` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 24 | `MoveCamera` | `LevelEvent_MoveCamera` | [镜头与震屏事件](/api/editor-events/CameraShakeEvents.md) | 专页已覆盖 |
| 25 | `HideRow` | `LevelEvent_HideRow` | [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 专页已覆盖 |
| 26 | `MoveRow` | `LevelEvent_MoveRow` | [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 专页已覆盖 |
| 27 | `PlayExpression` | `LevelEvent_PlayExpression` | [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 专页已覆盖 |
| 28 | `TintRows` | `LevelEvent_TintRows` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 29 | `BassDrop` | `LevelEvent_BassDrop` | [杂项游戏事件](/api/editor-events/MiscGameEvents.md) | 专页已覆盖 |
| 30 | `ShakeScreen` | `LevelEvent_ShakeScreen` | [镜头与震屏事件](/api/editor-events/CameraShakeEvents.md) | 专页已覆盖 |
| 31 | `FlipScreen` | `LevelEvent_FlipScreen` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 32 | `InvertColors` | `LevelEvent_InvertColors` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 33 | `PulseCamera` | `LevelEvent_PulseCamera` | [镜头与震屏事件](/api/editor-events/CameraShakeEvents.md) | 专页已覆盖 |
| 34 | `TextExplosion` | `LevelEvent_TextExplosion` | [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 专页已覆盖 |
| 35 | `ShowDialogue` | `LevelEvent_ShowDialogue` | [ShowDialogue](/api/editor-events/ShowDialogue.md) | 专页已覆盖 |
| 36 | `ShowStatusSign` | `LevelEvent_ShowStatusSign` | [杂项游戏事件](/api/editor-events/MiscGameEvents.md) | 专页已覆盖 |
| 37 | `FloatingText` | `LevelEvent_FloatingText` | [FloatingText 事件](/api/editor-events/FloatingTextEvents.md) | 专页已覆盖 |
| 38 | `AdvanceText` | `LevelEvent_AdvanceText` | [FloatingText 事件](/api/editor-events/FloatingTextEvents.md) | 专页已覆盖 |
| 39 | `ChangePlayersRows` | `LevelEvent_ChangePlayersRows` | [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 专页已覆盖 |
| 40 | `FinishLevel` | `LevelEvent_FinishLevel` | [杂项游戏事件](/api/editor-events/MiscGameEvents.md) | 专页已覆盖 |
| 41 | `Comment` | `LevelEvent_Comment` | [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 专页已覆盖 |
| 42 | `CommentShow` | 无独立 `LevelEvent_CommentShow.cs` | [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 专页已覆盖 |
| 43 | `ShowHands` | `LevelEvent_ShowHands` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 44 | `PaintHands` | `LevelEvent_PaintHands` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 45 | `SetHandOwner` | `LevelEvent_SetHandOwner` | [杂项游戏事件](/api/editor-events/MiscGameEvents.md) | 专页已覆盖 |
| 46 | `TagAction` | `LevelEvent_TagAction` | [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 专页已覆盖 |
| 47 | `SetPlayStyle` | `LevelEvent_SetPlayStyle` | [杂项游戏事件](/api/editor-events/MiscGameEvents.md) | 专页已覆盖 |
| 48 | `Stutter` | `LevelEvent_Stutter` | [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 专页已覆盖 |
| 49 | `CallCustomMethod` | `LevelEvent_CallCustomMethod` | [自定义方法事件](/api/editor-events/custom-methods.md) | 专页已覆盖 |
| 50 | `NewWindowDance` | `LevelEvent_NewWindowDance` | [窗口控制事件](/api/editor-events/WindowControlEvents.md) | 专页已覆盖 |
| 51 | `ShowRooms` | `LevelEvent_ShowRooms` | [房间控制事件](/api/editor-events/RoomControlEvents.md) | 专页已覆盖 |
| 52 | `MoveRoom` | `LevelEvent_MoveRoom` | [房间控制事件](/api/editor-events/RoomControlEvents.md) | 专页已覆盖 |
| 53 | `ReorderRooms` | `LevelEvent_ReorderRooms` | [房间控制事件](/api/editor-events/RoomControlEvents.md) | 专页已覆盖 |
| 54 | `SetRoomContentMode` | `LevelEvent_SetRoomContentMode` | [房间控制事件](/api/editor-events/RoomControlEvents.md) | 专页已覆盖 |
| 55 | `MaskRoom` | `LevelEvent_MaskRoom` | [房间控制事件](/api/editor-events/RoomControlEvents.md) | 专页已覆盖 |
| 56 | `FadeRoom` | `LevelEvent_FadeRoom` | [房间控制事件](/api/editor-events/RoomControlEvents.md) | 专页已覆盖 |
| 57 | `SetRoomPerspective` | `LevelEvent_SetRoomPerspective` | [房间控制事件](/api/editor-events/RoomControlEvents.md) | 专页已覆盖 |
| 58 | `MakeRow` | `LevelEvent_MakeRow` | [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 专页已覆盖 |
| 59 | `MakeSprite` | `LevelEvent_MakeSprite` | [精灵生命周期事件](/api/editor-events/SpriteLifecycleEvents.md) | 专页已覆盖 |
| 60 | `Move` | `LevelEvent_Move` | [精灵生命周期事件](/api/editor-events/SpriteLifecycleEvents.md) | 专页已覆盖 |
| 61 | `Tint` | `LevelEvent_Tint` | [精灵渲染与排序事件](/api/editor-events/SpriteRenderEvents.md) | 专页已覆盖 |
| 62 | `Tile` | `LevelEvent_Tile` | [精灵渲染与排序事件](/api/editor-events/SpriteRenderEvents.md) | 专页已覆盖 |
| 63 | `PlayAnimation` | `LevelEvent_PlayAnimation` | [精灵生命周期事件](/api/editor-events/SpriteLifecycleEvents.md) | 专页已覆盖 |
| 64 | `SetVisible` | `LevelEvent_SetVisible` | [精灵渲染与排序事件](/api/editor-events/SpriteRenderEvents.md) | 专页已覆盖 |
| 65 | `ReadNarration` | `LevelEvent_ReadNarration` | [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 专页已覆盖 |
| 66 | `NarrateRowInfo` | `LevelEvent_NarrateRowInfo` | [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 专页已覆盖 |
| 67 | `SetOneshotWave` | `LevelEvent_SetOneshotWave` | [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 专页已覆盖 |
| 68 | `WindowResize` | `LevelEvent_WindowResize` | [窗口控制事件](/api/editor-events/WindowControlEvents.md) | 专页已覆盖 |
| 69 | `SetWindowContent` | `LevelEvent_SetWindowContent` | [窗口控制事件](/api/editor-events/WindowControlEvents.md) | 专页已覆盖 |
| 70 | `Blend` | `LevelEvent_Blend` | [精灵渲染与排序事件](/api/editor-events/SpriteRenderEvents.md) | 专页已覆盖 |
| 71 | `ShakeScreenCustom` | `LevelEvent_ShakeScreenCustom` | [镜头与震屏事件](/api/editor-events/CameraShakeEvents.md) | 专页已覆盖 |
| 72 | `ChangeCharacter` | `LevelEvent_ChangeCharacter` | [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 专页已覆盖 |
| 73 | `ReorderRow` | `LevelEvent_ReorderRow` | [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 专页已覆盖 |
| 74 | `ReorderSprite` | `LevelEvent_ReorderSprite` | [精灵渲染与排序事件](/api/editor-events/SpriteRenderEvents.md) | 专页已覆盖 |
| 75 | `DesktopColor` | `LevelEvent_DesktopColor` | [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 专页已覆盖 |
| 76 | `SpinningRows` | `LevelEvent_SpinningRows` | [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 专页已覆盖 |
| 77 | `ReorderWindows` | `LevelEvent_ReorderWindows` | [窗口控制事件](/api/editor-events/WindowControlEvents.md) | 专页已覆盖 |
| 78 | `RenameWindow` | `LevelEvent_RenameWindow` | [窗口控制事件](/api/editor-events/WindowControlEvents.md) | 专页已覆盖 |
| 79 | `SetMainWindow` | `LevelEvent_SetMainWindow` | [窗口控制事件](/api/editor-events/WindowControlEvents.md) | 专页已覆盖 |
| 80 | `HideWindow` | `LevelEvent_HideWindow` | [窗口控制事件](/api/editor-events/WindowControlEvents.md) | 专页已覆盖 |

`LevelEventType` 0 到 80 均已进入基础机制页、分组页或重点事件专页。
