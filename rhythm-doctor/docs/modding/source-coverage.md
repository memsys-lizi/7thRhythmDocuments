# 未分类源码覆盖清单

本页记录 `RDFucked/Assets/Scripts/Assembly-CSharp` 的源码覆盖统计。统计方式是读取当前源码目录下所有 `.cs` 文件，再用文件名在 `docs/**/*.md` 中做字符串命中检查。

## 当前统计

| 项目 | 数量 |
| --- | --- |
| `Assembly-CSharp` 下 `.cs` 文件总数 | 1050 |
| 文件名已在文档中命中 | 1050 |
| 文件名未在文档中命中 | 0 |

## 文档规模统计

| 项目 | 数量 |
| --- | ---: |
| Markdown 文档总数 | 99 份 |
| 文档总大小 | 约 1.09 MB |
| 去空白字符总数 | 682,707 字符 |
| 中文汉字数 | 132,080 字 |
| 英文与代码 token 数 | 50,572 个 |

## 目录分布

| 目录 | `.cs` 文件数 | 当前覆盖状态 |
| --- | --- | --- |
| 根目录 | 645 | 已按核心类、运行时系统、官方关卡、UI、平台、资源辅助和收口页面归类 |
| `RDLevelEditor` | 360 | 已按事件、Inspector、时间线、属性控件、编辑器弹窗和 UI 辅助归类 |
| `RhythmWeightlifter` | 17 | 已归入 [小游戏与测试组件](/api/runtime/mini-games-tests.md) |
| `UnityEngine` | 9 | 已归入 [依赖与兼容辅助](/api/runtime/dependency-compatibility.md) |
| `SmfLite` | 6 | MIDI 读取相关轻量库，按依赖说明处理 |
| `RewiredConsts` | 3 | Rewired 常量生成文件，按依赖说明处理 |
| `Kino` | 2 | 已归入后处理与依赖说明 |
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
| 根目录文件 | 0 | 已补 [收口辅助类与场景脚本](/api/runtime/final-utility-scenes.md) |
| `RDLevelEditor` 文件 | 0 | 已补 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) 和 [枚举与轻量模型补充](/api/data-models/enums-lightweight-models.md) |
| 其他目录文件 | 0 | `Properties/AssemblyInfo.cs` 已在本页作为工程元信息记录 |

## 根目录未命中类群

以下统计来自未命中文件名的前缀或名称模式，用于决定补文档顺序。

| 类群 | 数量 | 处理方向 |
| --- | --- | --- |
| UI 与菜单辅助 | 0 | 已分别归入运行时辅助页面和收口页面 |
| 角色动画与视觉组件 | 0 | 已分别归入视觉、渲染、主题和收口页面 |
| 枚举与小型模型 | 0 | 已归入数据模型补充和收口页面 |
| 小游戏和测试组件 | 0 | 已归入小游戏、测试和收口页面 |
| 音频与 BPM 辅助 | 0 | 已归入音频、导入、Web 工具和收口页面 |
| 自定义关卡与平台服务 | 0 | 已归入平台服务和数据模型页面 |

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

## 阶段 7 补文档完成记录

| 优先级 | 页面方向 | 覆盖目标 |
| --- | --- | --- |
| 1 | 编辑器 UI 辅助 | 已完成：把 RDLevelEditor 未命中 35 个文件归入编辑器控件、弹窗、选择器和时间线辅助页面 |
| 2 | 根目录 UI 与菜单 | 已完成：补 [UI 与菜单辅助类](/api/runtime/ui-menu-helpers.md)，覆盖菜单、对话框、按钮提示、本地化文本、错误面板、Canvas、颜色控件和存档槽 UI 辅助 |
| 3 | 视觉与动画辅助 | 已完成：补 [视觉与动画辅助类](/api/runtime/visual-animation-helpers.md)，覆盖 BPM 动画、自定义动画、背景、后处理、粒子、Detonator、Stutter、万花筒、眼睛阵列和运动小物件 |
| 4 | 平台与服务 | 已完成：补 [平台与服务辅助类](/api/runtime/platform-services.md)，覆盖 Steam、Workshop、Discord 富状态、Web 服务、entitlement、平台窗口抽象、文件读写和自定义关卡选择器服务入口 |
| 5 | 小游戏与测试 | 已完成：补 [小游戏与测试组件](/api/runtime/mini-games-tests.md)，覆盖 Rhythm Weightlifter、Bullet、RowEntranceTest、波形测试、旁白测试和调试开关 |
| 6 | 依赖与兼容辅助 | 已完成：补 [依赖与兼容辅助](/api/runtime/dependency-compatibility.md)，覆盖 SmfLite MIDI、Unity UI 补充、Rewired 常量与本地化、Kino 后处理、DOTween 扩展、程序树和编译兼容占位 |
| 7 | 枚举与轻量模型 | 已完成：补 [枚举与轻量模型补充](/api/data-models/enums-lightweight-models.md)，覆盖暂停菜单数据、旁白动作、字体包、保存 JSON、选择实体、编辑器小枚举和 UI 小组件 |
| 8 | 场景主题与房间组件 | 已完成：补 [场景主题与房间组件](/api/runtime/scene-theme-components.md)，覆盖 ward、airport、garden、rooftop、roller disco、records room、转场格子、旋转 voxel、时钟灯光、splash、logo 和 warning 场景 |
| 9 | 渲染后处理与波形组件 | 已完成：补 [渲染后处理与波形组件](/api/runtime/rendering-postprocessing.md)，覆盖 Camera 后处理、像素化、平铺、2D 透视、多边形波形、频谱、音量、credits 和角色选择视觉 |
| 10 | 音频、导入与 Web 工具 | 已完成：补 [音频、导入与 Web 工具](/api/runtime/io-audio-web-tools.md)，覆盖 Ogg 编码、音频采样、BPM 检测、暂停试听、关卡包安装、CSV/Zip、Web 场景、截图和输入辅助 |
| 11 | 收口辅助类与场景脚本 | 已完成：补 [收口辅助类与场景脚本](/api/runtime/final-utility-scenes.md)，覆盖最后 32 个根目录未命中文件，覆盖清单归零 |

## 统计口径

| 项目 | 说明 |
| --- | --- |
| 文件总数 | 使用 `Get-ChildItem RDFucked/Assets/Scripts/Assembly-CSharp -Recurse -Filter *.cs` 统计 |
| 文档命中 | 把文件名去掉 `.cs` 后，在 `docs/**/*.md` 正文中查找同名字符串 |
| 未命中含义 | 文件名没有出现在当前文档正文中；当前未命中为 0 |
| 覆盖目标 | 页面覆盖类职责、字段、方法、生命周期和跨模块关系 |


