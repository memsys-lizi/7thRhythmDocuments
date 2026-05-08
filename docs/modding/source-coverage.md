# 未分类源码覆盖清单

本页记录阶段 6 对 `RDFucked/Assets/Scripts/Assembly-CSharp` 的源码覆盖统计。统计方式是读取当前源码目录下所有 `.cs` 文件，再用文件名在 `docs/**/*.md` 中做字符串命中检查。它用于阶段 7 制定补文档队列，不代表最终覆盖结论。

## 当前统计

| 项目 | 数量 |
| --- | --- |
| `Assembly-CSharp` 下 `.cs` 文件总数 | 1050 |
| 文件名已在文档中命中 | 839 |
| 文件名未在文档中命中 | 211 |

## 目录分布

| 目录 | `.cs` 文件数 | 当前覆盖状态 |
| --- | --- | --- |
| 根目录 | 645 | 核心类、运行时系统、官方关卡和大量 UI/平台/资源辅助类混在同层，需要阶段 7 继续拆分 |
| `RDLevelEditor` | 360 | 事件、Inspector、时间线、属性控件和编辑器弹窗已经有主干页面，仍有若干 UI 辅助类未逐项写入 |
| `RhythmWeightlifter` | 17 | 独立小游戏或额外模式类群，当前只进入未分类队列 |
| `UnityEngine` | 9 | 项目内补充的 UI 辅助实现，当前只进入未分类队列 |
| `SmfLite` | 6 | MIDI 读取相关轻量库，按依赖说明处理 |
| `RewiredConsts` | 3 | Rewired 常量生成文件，按依赖说明处理 |
| `Kino` | 2 | 图像后处理相关类，后续归到视觉依赖或运行时 VFX |
| `Rewired` | 2 | Rewired 本地化辅助，按依赖说明处理 |
| 其他单文件目录 | 6 | `DG`、`ProceduralTree`、`Properties`、`RowEntranceTest`、`System` 等 |

## 已有主干覆盖

| 类型族 | 源码数量 | 当前页面 |
| --- | --- | --- |
| `Level_*.cs` | 75 | [官方关卡覆盖清单](/api/levels/coverage.md) 已完成文件级归属 |
| `RDLevelEditor/LevelEvent_*.cs` | 80 | [事件覆盖清单](/api/editor-events/event-coverage.md) 覆盖 `LevelEventType` 0 到 80 |
| `RDLevelEditor/InspectorPanel_*.cs` | 82 | [Inspector 面板索引与专项行为](/api/editor-events/inspector-panels.md) 已建立主干索引 |
| `RDLevelEditor/Conditional_*.cs` | 8 | [条件系统](/api/data-models/conditionals.md) 已覆盖条件类族 |
| `RDLevelEditor/ConditionalInspector_*.cs` | 8 | [条件系统](/api/data-models/conditionals.md) 已覆盖条件 Inspector 类族 |
| `RDLevelEditor/*PropertyInfo.cs` | 14 | [属性反射与小型模型](/api/data-models/property-reflection-small-models.md) 已覆盖属性适配器族 |
| `RDLevelEditor/*Attribute.cs` | 29 | [属性反射与小型模型](/api/data-models/property-reflection-small-models.md) 已覆盖主要 Attribute 族 |
| `RDInputType_*.cs` | 4 | [输入系统](/api/runtime/input-system.md) 已覆盖输入类型族 |

## 未命中文件分布

| 分组 | 未命中数量 | 阶段 7 处理方向 |
| --- | --- | --- |
| 根目录文件 | 211 | 按平台服务、资源、枚举、小游戏和测试组件继续拆分 |
| `RDLevelEditor` 文件 | 3 | 已补 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md)，剩余 `PropertyType`、`RowAndPlayer`、`VerticalDirection` 归入阶段 7 枚举与小型模型复核 |
| 其他目录文件 | 29 | 先做依赖与辅助类说明，再决定是否需要专页 |

## 根目录未命中类群

以下统计来自未命中文件名的前缀或名称模式，用于决定补文档顺序。

| 类群 | 数量 | 处理方向 |
| --- | --- | --- |
| UI 与菜单辅助 | 43 | 关卡选择、暂停、编辑器通用 UI、按钮、弹窗、滑条、文本和 Canvas 辅助 |
| 角色动画与视觉组件 | 39 | 动画、精灵、颜色、描边、相机、stutter、Detonator 和其他视觉组件 |
| 枚举与小型模型 | 31 | `*Type`、`*Mode`、`*Data`、`*Info`、`*Result` 等轻量类型 |
| 小游戏和测试组件 | 25 | Bullet、测试脚本、`RhythmWeightlifter` 和行进入测试 |
| 音频与 BPM 辅助 | 19 | Audio、BPM、声音模式和音频转换辅助 |
| 自定义关卡与平台服务 | 6 | `Analytics`、`EditorWebServices`、`EntitlementsService`、`DiscordPresence`、`CustomLevelSyringe` 等 |

## RDLevelEditor 未命中清单

| 文件 | 处理方向 |
| --- | --- |
| `BulkSelectPanel.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) |
| `CharacterButton.cs`、`RDCharacterPickerPopup.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) |
| `EventRoomsTooltip.cs`、`RDRoomsSelectionPopup.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) |
| `ExpInputField.cs`、`PropertyControl_GameSound.cs`、`SoundFieldFileLoader.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) |
| `LetterMovementButton.cs`、`RDLetterMovementPickerPopup.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) |
| `PalettePickerButton.cs`、`RDColorPickerPopup.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) |
| `SelectLevelEventButton.cs`、`SelectLevelEventPanel.cs`、`EventCategory.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) |
| `SpriteHeader.cs`、`SpritesListScroll.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) |
| `TimelineHeightEventTrigger.cs`、`tlHorizontalScrollRect.cs`、`FollowPlayheadEventTrigger.cs`、`SnapButtonEventTrigger.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) |
| `TutorialMask.cs`、`UITextUpdater.cs`、`UpdateUIOnFullRoom.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) |
| `SaveStateScope.cs`、`SetEditorVersion.cs`、`ExtensionAssociation.cs`、`RDBetaLock.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) |
| `InspectorPanel_SetHandOwner.cs`、`InspectorPanel_SetHeartExplodeInterval.cs`、`InspectorPanel_SetHeartExplodeVolume.cs`、`InspectorPanel_ShowHands.cs` | 已归入 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md)，后续复核时补到对应事件专页 |

## 其他目录未命中清单

| 目录或文件 | 处理方向 |
| --- | --- |
| `RhythmWeightlifter/*.cs` | 建立独立小游戏/额外模式页面，覆盖 `scnRhythmWeightlifter`、角色、音频控制和计分格 |
| `SmfLite/*.cs` | 建立 MIDI 读取依赖说明，覆盖文件容器、事件、轨道和 sequencer |
| `UnityEngine/UI/*.cs` | 建立 UI 辅助依赖说明，覆盖描边、字距、字母移动和对象池 |
| `Rewired/Localization/*.cs`、`RewiredConsts/Layout.cs` | 并入依赖说明或输入系统附录 |
| `DG/Tweening/Perspective2DSpriteExtensions.cs` | 并入视觉辅助类说明 |
| `ProceduralTree/RDProceduralTree.cs` | 并入视觉/关卡装饰辅助说明 |
| `RowEntranceTest/RowEntranceTest.cs` | 并入测试组件说明 |
| `System/Runtime/CompilerServices/IsExternalInit.cs` | 编译兼容辅助，放入依赖说明 |

## 阶段 7 补文档队列

| 优先级 | 页面方向 | 覆盖目标 |
| --- | --- | --- |
| 1 | 编辑器 UI 辅助 | 已完成：把 RDLevelEditor 未命中 35 个文件归入编辑器控件、弹窗、选择器和时间线辅助页面 |
| 2 | 根目录 UI 与菜单 | 已完成：补 [UI 与菜单辅助类](/api/runtime/ui-menu-helpers.md)，覆盖菜单、对话框、按钮提示、本地化文本、错误面板、Canvas、颜色控件和存档槽 UI 辅助 |
| 3 | 视觉与动画辅助 | 已完成：补 [视觉与动画辅助类](/api/runtime/visual-animation-helpers.md)，覆盖 BPM 动画、自定义动画、背景、后处理、粒子、Detonator、Stutter、万花筒、眼睛阵列和运动小物件 |
| 4 | 平台与服务 | 覆盖 Analytics、Entitlements、Discord、编辑器网络服务、平台辅助和文件关联 |
| 5 | 小游戏与测试 | 覆盖 RhythmWeightlifter、Bullet、RowEntranceTest 和测试脚本 |
| 6 | 依赖与兼容辅助 | 覆盖 SmfLite、Rewired 本地化、UnityEngine UI 补充、`IsExternalInit` 和 DOTween 扩展 |

## 统计口径

| 项目 | 说明 |
| --- | --- |
| 文件总数 | 使用 `Get-ChildItem RDFucked/Assets/Scripts/Assembly-CSharp -Recurse -Filter *.cs` 统计 |
| 文档命中 | 把文件名去掉 `.cs` 后，在 `docs/**/*.md` 正文中查找同名字符串 |
| 未命中含义 | 文件名没有出现在当前文档正文中，阶段 7 需要人工归类 |
| 覆盖目标 | 后续页面要覆盖类职责、字段、方法、生命周期和跨模块关系 |
