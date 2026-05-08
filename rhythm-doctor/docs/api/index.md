# 源码 API 索引

本区按源码类型和编辑器事件整理 API 页面。页面内容以 `RDFucked/Assets/Scripts/Assembly-CSharp` 中的 RD 主工程代码为依据，侧重类职责、关键字段、方法行为、调用关系和跨模块影响。

## 阅读方式

- 先读 [核心骨架](/modules/core.md)，理解全局入口、关卡状态、音乐时间轴、游戏场景和编辑器场景。
- 再读 [编辑器事件系统](/modules/editor-events.md)，理解事件数据、时间线控件和 Inspector 面板如何协作。
- 查具体事件时，可以从 [事件覆盖清单](/api/editor-events/event-coverage.md) 按 `LevelEventType` 编号进入对应页面。
- 做跨模块源码研究时，可以从 [可调用方法索引](/modding/callable-methods.md)、[事件写法索引](/modding/event-patterns.md)、[数据字段索引](/modding/data-fields.md)、[入口与单例索引](/modding/entry-singletons.md)、[扩展点索引](/modding/extension-points.md)、[高风险系统索引](/modding/high-risk-systems.md) 和 [未分类源码覆盖清单](/modding/source-coverage.md) 回到对应 API 页面。

## 复核清单

| 页面 | 内容 |
| --- | --- |
| [阶段 3 与阶段 4 复核](/api/review/stage-3-4-review.md) | 运行时系统和数据模型与枚举页面的导航、API 索引、模块页入口复核 |
| [阶段 7 全站复核](/api/review/stage-7-site-review.md) | 全站覆盖、官方关卡归属、缺失项清单、主干调用图和后续复核队列 |
| [主干调用图](/api/review/call-graphs.md) | 关卡数据、编辑器读写、音乐时间、判定、窗口和视觉系统的跨模块调用关系 |

## 核心类

| 页面 | 内容 |
| --- | --- |
| [RDBase](/api/core/RDBase.md) | 组件脚本的全局入口、字段、属性、方法和风险 |
| [RDClass](/api/core/RDClass.md) | 非组件便利基类和常用单例访问方式 |
| [LevelBase](/api/core/LevelBase.md) | 关卡运行状态、事件列表、BPM、判定统计和公开方法入口 |
| [scrConductor](/api/core/scrConductor.md) | 音乐时间轴、播放、Scrub、BPM 和校准入口 |
| [scnGame](/api/core/scnGame.md) | 游戏场景状态、Beat、行、房间、判定和流程入口 |
| [scnEditor](/api/core/scnEditor.md) | 编辑器场景状态、事件控件、文件、播放预览和选择流程 |

## 编辑器事件基础机制

| 页面 | 内容 |
| --- | --- |
| [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) | 事件公共字段、编码解码、条件、标签和节拍调度 |
| [LevelEventInfo](/api/editor-events/LevelEventInfo.md) | 事件元数据 Attribute、属性反射和枚举范围 |
| [BasePropertyInfo](/api/editor-events/BasePropertyInfo.md) | 事件属性序列化、默认控件映射和 PropertyControl 管线 |
| [InspectorPanel](/api/editor-events/InspectorPanel.md) | 自动面板、保存监听、本地化和面板管理器 |
| [编辑器控件索引](/api/editor-events/editor-controls.md) | 时间线控件、属性面板和属性字段控件关系 |
| [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) | 批量选择、事件选择器、角色颜色房间弹窗、时间线按钮、精灵列表和保存状态辅助 |
| [时间线与事件控件](/api/editor-events/timeline-controls.md) | `Timeline`、`TabSection`、事件控件、点击创建、拖拽移动和坐标换算 |
| [Inspector 面板索引与专项行为](/api/editor-events/inspector-panels.md) | `InspectorPanel_*` 子类、手工面板、自动面板和专项字段联动 |
| [自定义方法事件](/api/editor-events/custom-methods.md) | 自定义方法事件、自动补全规则、`ListedMethod` 和可调用方法清单 |
| [事件覆盖清单](/api/editor-events/event-coverage.md) | `LevelEventType` 0 到 80 号事件的页面归属 |
| [事件运行路径](/api/editor-events/runtime-flow.md) | `LevelEvent_Base`、`LevelBase`、`scrExecuteOnCertainBeat` 的运行调度关系 |
| [Inspector 面板读写链路](/api/editor-events/inspector-flow.md) | 自动面板、手工面板、输入监听和 `AddOneshotBeat` 面板读写示例 |

## 编辑器事件分组

| 页面 | 内容 |
| --- | --- |
| [歌曲与音频事件](/api/editor-events/song-audio-events.md) | 歌曲、BPM、节拍声音、计数音、拍手音和游戏音效事件 |
| [行与节拍事件](/api/editor-events/row-events.md) | 行创建、Classic/Oneshot/FreeTime 节拍、行移动、隐藏、换行和 X pattern |
| [视觉与镜头事件](/api/editor-events/visual-camera-events.md) | 主题、VFX、背景前景、闪光、镜头、震屏、行染色和手部事件 |
| [房间与精灵事件](/api/editor-events/room-sprite-events.md) | 房间显示、变换、遮罩、透视、精灵创建、移动、染色、平铺、动画和排序 |
| [文本与脚本控制事件](/api/editor-events/text-control-events.md) | 对话、浮动文字、旁白、注释指令、标签、自定义方法、表情、换角色和 Stutter |
| [自定义方法事件](/api/editor-events/custom-methods.md) | 自定义方法事件、自动补全规则、`ListedMethod` 和可调用方法清单 |
| [窗口与剩余事件](/api/editor-events/window-misc-events.md) | 窗口舞蹈、缩放、内容、标题、显示、排序、播放风格和精灵混合 |

## 重点事件专页

| 页面 | 内容 |
| --- | --- |
| [AddClassicBeat](/api/editor-events/AddClassicBeat.md) | Classic 字段、Hold、Swing、Prepare、Run、拆 FreeTime 和面板读写 |
| [AddOneshotBeat](/api/editor-events/AddOneshotBeat.md) | Oneshot 字段、验证、解码、准备、预备音频、运行和面板读写 |
| [音频与声音事件](/api/editor-events/AudioSoundEvents.md) | 播放音效、拍手音、系统音、行 pulse sound、数拍音和 SoundData |
| [FloatingText 事件](/api/editor-events/FloatingTextEvents.md) | `FloatingText`、`AdvanceText`、歌词推进、朗读、面板和时间线联动 |
| [镜头与震屏事件](/api/editor-events/CameraShakeEvents.md) | `MoveCamera`、`ShakeScreen`、`PulseCamera`、`ShakeScreenCustom` 的字段与运行路径 |
| [PlaySong](/api/editor-events/PlaySong.md) | 歌曲字段、旧音量迁移、音频准备、播放、BPM 设置和时间线控件 |
| [房间控制事件](/api/editor-events/RoomControlEvents.md) | 房间显示、移动、排序、遮罩、透明度、内容模式和透视顶点 |
| [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 行创建、自由节拍、显示隐藏、移动、玩家换行、波形、排序和旋转行 |
| [SetRowXs](/api/editor-events/SetRowXs.md) | X pattern、Synco、运行修饰、面板读写和时间线显示 |
| [ShowDialogue](/api/editor-events/ShowDialogue.md) | 普通文本、Ink 指令、本地化、自定义角色准备、RDInk 调用和面板关系 |
| [精灵生命周期事件](/api/editor-events/SpriteLifecycleEvents.md) | `MakeSprite`、`Move`、`PlayAnimation`、自定义资源加载、精灵注册和面板读写 |
| [精灵渲染与排序事件](/api/editor-events/SpriteRenderEvents.md) | `Tint`、`Tile`、`SetVisible`、`ReorderSprite`、`Blend` 和 `CustomSprite` 平铺更新 |
| [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 表情、文字爆炸、注释脚本、标签、Stutter、旁白和换角色 |
| [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 主题、VFX、背景前景、闪光、行染色、手部和桌面颜色事件 |
| [窗口控制事件](/api/editor-events/WindowControlEvents.md) | 窗口舞蹈、缩放、内容、显示、标题、排序和主窗口 |
| [杂项游戏事件](/api/editor-events/MiscGameEvents.md) | 爆心、RDGS、BassDrop、状态牌、完成关卡、手部归属和播放风格 |
| [歌曲时间线事件](/api/editor-events/SongTimingEvents.md) | `SetBeatsPerMinute`、`SetCrotchetsPerBar`、面板、时间线和换算关系 |

## 运行时系统

| 页面 | 内容 |
| --- | --- |
| [运行时系统总览](/api/runtime/overview.md) | `scnGame`、`LevelBase`、`scrConductor`、Beat、输入、房间、VFX 和窗口系统的主干数据流 |
| [节拍与判定](/api/runtime/beats-judgement.md) | `Beat`、`BeatClassic`、`BeatOneshot`、`scrPlayerbox`、`HitType`、`OffsetType`、`RDHitStrip` 和 `HitStripManager` |
| [输入系统](/api/runtime/input-system.md) | `RDInput`、`RDInputType`、键盘、手柄、触摸、自定义按钮、模拟按键和输入交换 |
| [行与角色系统](/api/runtime/rows-characters.md) | `Row`、`RowEntity`、`scrPlayerbox`、`scrBeatbox`、Classic/Oneshot 行控制器和角色枚举 |
| [房间与 VFX 系统](/api/runtime/rooms-vfx.md) | `scrVfxControl`、`RDRoom`、`RDCamera`、`RoomCamera`、背景前景、遮罩、透视、主题和 VFX preset |
| [窗口系统](/api/runtime/windows.md) | `WindowChoreographer`、真实窗口、虚拟窗口、`WindowDancer`、窗口事件、blit 链路和窗口舞蹈 preset |
| [音频运行时](/api/runtime/audio-runtime.md) | `AudioManager`、`scrConductor`、`RDGameSounds`、`SoundData`、`RDSongOffsets`、mixer group 和音频调度 |
| [场景流程与暂停流程](/api/runtime/scene-flow.md) | `scnGame`、`PauseMenu`、`PauseMenuMode`、`Rankscreen`、关卡加载、开始、暂停、重开、失败和结算 |
| [UI 与菜单辅助类](/api/runtime/ui-menu-helpers.md) | 菜单、对话框、按钮提示、本地化文本、错误面板、Canvas、颜色控件和存档槽 UI 辅助 |
| [视觉与动画辅助类](/api/runtime/visual-animation-helpers.md) | BPM 动画、自定义动画、背景、后处理、粒子、Detonator、Stutter、万花筒、眼睛阵列和运动小物件 |
| [平台与服务辅助类](/api/runtime/platform-services.md) | Steam、Workshop、Discord 富状态、Web 服务、entitlement、平台窗口抽象、文件读写和自定义关卡选择器服务入口 |
| [小游戏与测试组件](/api/runtime/mini-games-tests.md) | Rhythm Weightlifter 独立模式、Bullet 校准测试、行进入测试、波形测试、旁白测试和调试开关 |
| [依赖与兼容辅助](/api/runtime/dependency-compatibility.md) | SmfLite MIDI、Unity UI 补充、Rewired 常量与本地化、Kino 后处理、DOTween 扩展、程序树和编译兼容占位 |
| [场景主题与房间组件](/api/runtime/scene-theme-components.md) | 主题环境、Rooftop、转场格子、旋转 voxel、时钟灯光、启动场景和警告场景 |
| [渲染后处理与波形组件](/api/runtime/rendering-postprocessing.md) | Camera 后处理、像素化、平铺、2D 透视、多边形波形、频谱、音量、credits 和角色选择视觉 |
| [音频、导入与 Web 工具](/api/runtime/io-audio-web-tools.md) | Ogg 编码、音频采样、BPM 检测、暂停试听、关卡包安装、CSV/Zip、Web 场景、截图、输入辅助 |
| [收口辅助类与场景脚本](/api/runtime/final-utility-scenes.md) | 角色模板导出、展示关卡选择、SleevePaint、旁白访问、旧校准、Care Less 窗口和小型视觉组件 |

## 数据模型与枚举

| 页面 | 内容 |
| --- | --- |
| [关卡数据模型](/api/data-models/level-data.md) | `RDLevelData`、`.rdlevel` 根结构、行、装饰、事件、条件、书签、调色板和窗口舞蹈扫描 |
| [关卡设置模型](/api/data-models/level-settings.md) | `RDLevelSettings`、关卡元信息、预览资源、难度、玩家模式、rank、mods 和校验边界 |
| [自定义关卡与错误模型](/api/data-models/custom-levels-errors.md) | `CustomLevelData`、`LevelValidation`、`LevelErrorName`、错误展示和设置校验 |
| [Rank 与难度枚举](/api/data-models/rank-difficulty.md) | `Rank`、`Difficulty`、`LevelDifficulty`、`LevelPlayMode`、`LevelType` 和 `LevelSource` |
| [条件系统](/api/data-models/conditionals.md) | `Conditional`、`Conditionals`、条件枚举、全局条件、Inspector、事件绑定和运行时检查 |
| [音频与辅助数据模型](/api/data-models/audio-and-auxiliary.md) | `SoundData`、`SoundDataStruct`、`RDGameSounds`、书签、颜色调色板、标签动作和枚举属性 |
| [属性反射与小型模型](/api/data-models/property-reflection-small-models.md) | `BasePropertyInfo` 派生类、Attribute 控件映射、Float 表达式、自定义动画数据和指针事件模型 |
| [枚举与轻量模型补充](/api/data-models/enums-lightweight-models.md) | 暂停菜单数据、旁白动作、字体包、保存 JSON、选择实体、编辑器小枚举和 UI 小组件 |

## 官方关卡脚本

| 页面 | 内容 |
| --- | --- |
| [官方关卡脚本总览](/api/levels/overview.md) | `Level_*` 脚本范围、分组索引、共同生命周期、重点脚本入口和后续拆分计划 |
| [教程与开场关卡](/api/levels/tutorials-opening.md) | `Level_Intro`、`Level_Tutorial_*`、`Level_OpeningCreds` 的资源、流程、回调、跳转和公开方法 |
| [Boss 与高压段落](/api/levels/boss-high-pressure.md) | `Level_Boss2`、`Level_Boss2Booth`、`Level_Boss2Hard`、`Level_PaigesReckoning`、`Level_InsomniacHard`、`Level_FinalRemix` 的 Boss、失败、低血量和高压段落逻辑 |
| [运动与节奏变体](/api/levels/athlete-freezeshot.md) | `Level_Freezeshot`、`Level_FreezeshotH`、`Level_FreezeshotBooth`、`Level_AthleteTherapy`、`Level_AthleteFinale`、`Level_Injury` 的棒球、灯牌、afterimage、杯子、泡泡和手机直播逻辑 |
| [视觉与窗口特殊关卡](/api/levels/visual-special.md) | `Level_SVT`、`Level_Smokin`、`Level_Blurred`、`Level_Bitterness`、`Level_Montage`、`Level_Montage2`、`Level_Trailer` 的 kaleidoscope、咖啡杯、窗口 peek、粒子、Boss 失败和 trailer 演示逻辑 |
| [叙事与场景关卡](/api/levels/story-scene-levels.md) | `Level_Lofi`、`Level_Lounge`、`Level_LuckyBreak`、`Level_HaileyDuet`、`Level_DistantDuet`、`Level_HelpingHands`、`Level_Steinway`、`Level_SteinwayH`、`Level_StevensonsTango` 的手部、背景、灯光、体育场和 credits 逻辑 |
| [其余官方与测试脚本](/api/levels/misc-official-levels.md) | 早期主线、活动曲、联动曲、测试脚本、空实现脚本、cutscene 脚本和辅助组件的文件级覆盖 |
| [官方关卡覆盖清单](/api/levels/coverage.md) | 75 个 `Level_*.cs` 文件的专题页或文件级归属复核 |



