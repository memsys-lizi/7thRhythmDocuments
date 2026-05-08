# API 草稿区

这里用于放置自动生成并等待人工复核的 API 页面。

## 生成目标

后续将使用 Roslyn 解析 `RDFucked/Assets/Scripts/Assembly-CSharp`，生成：

- 类型索引。
- 类、结构体、接口、枚举页面。
- 字段、属性、方法签名。
- 继承关系和源码路径。

## 页面状态

| 状态 | 含义 |
| --- | --- |
| 草稿 | 自动生成，尚未人工解释 |
| 复核中 | 已开始检查源码和调用点 |
| 已复核 | 字段、属性、方法说明已人工确认 |
| 需补充 | 已发现成员或页面缺口，需要继续阅读源码后补写 |

## 约束

- 自动生成脚本不能修改 `RDFucked/`。
- 自动草稿不能替代人工深写。
- 核心模块 API 页必须与模块讲解页互相链接。

## 核心类

| 页面 | 状态 | 说明 |
| --- | --- | --- |
| [RDBase](/api/core/RDBase.md) | 初稿 | 已人工阅读源码，记录字段、属性、方法和风险 |
| [RDClass](/api/core/RDClass.md) | 初稿 | 已人工阅读源码，记录非组件便利基类 |
| [LevelBase](/api/core/LevelBase.md) | 初稿 | 已人工阅读主结构，先按职责分组，后续拆页逐项深写 |
| [scrConductor](/api/core/scrConductor.md) | 初稿 | 已人工阅读源码，记录音乐时间轴、播放、Scrub、BPM 和校准入口 |
| [scnGame](/api/core/scnGame.md) | 初稿 | 已人工阅读源码，记录游戏场景状态、Beat、行、房间、判定和流程入口 |
| [scnEditor](/api/core/scnEditor.md) | 初稿 | 已人工阅读源码，记录编辑器场景状态、事件控件、文件、播放预览和选择流程 |

## 编辑器事件基础机制

| 页面 | 状态 | 说明 |
| --- | --- | --- |
| [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) | 初稿 | 已人工阅读源码，记录事件公共字段、编码解码、条件、标签和节拍调度 |
| [LevelEventInfo](/api/editor-events/LevelEventInfo.md) | 初稿 | 已人工阅读源码，记录事件元数据 Attribute、属性反射和枚举范围 |
| [BasePropertyInfo](/api/editor-events/BasePropertyInfo.md) | 初稿 | 已人工阅读源码，记录事件属性序列化、默认控件映射和 PropertyControl 管线 |
| [InspectorPanel](/api/editor-events/InspectorPanel.md) | 初稿 | 已人工阅读源码，记录自动面板、保存监听、本地化和面板管理器 |
| [编辑器控件索引](/api/editor-events/editor-controls.md) | 初稿 | 已人工阅读源码，记录时间线控件、属性面板和属性字段控件关系 |
| [自定义方法事件](/api/editor-events/custom-methods.md) | 初稿 | 已人工阅读源码，记录自定义方法事件、自动补全规则、`ListedMethod` 和可调用方法清单 |
| [事件覆盖清单](/api/editor-events/event-coverage.md) | 初稿 | 已按 `LevelEventType` 枚举顺序记录 0 到 80 号事件的页面归属和覆盖状态 |
| [事件运行路径](/api/editor-events/runtime-flow.md) | 初稿 | 已人工阅读源码，记录 `LevelEvent_Base`、`LevelBase`、`scrExecuteOnCertainBeat` 的运行调度关系 |
| [Inspector 面板读写链路](/api/editor-events/inspector-flow.md) | 初稿 | 已人工阅读源码，记录自动面板、手工面板、输入监听和 `AddOneshotBeat` 面板读写示例 |

## 编辑器事件分组

| 页面 | 状态 | 说明 |
| --- | --- | --- |
| [歌曲与音频事件](/api/editor-events/song-audio-events.md) | 初稿 | 已人工阅读源码，记录歌曲、BPM、节拍声音、计数音、拍手音和游戏音效事件 |
| [行与节拍事件](/api/editor-events/row-events.md) | 初稿 | 已人工阅读源码，记录行创建、Classic/Oneshot/FreeTime 节拍、行移动、隐藏、换行和 X pattern |
| [视觉与镜头事件](/api/editor-events/visual-camera-events.md) | 初稿 | 已人工阅读源码，记录主题、VFX、背景前景、闪光、镜头、震屏、行染色和手部事件 |
| [房间与精灵事件](/api/editor-events/room-sprite-events.md) | 初稿 | 已人工阅读源码，记录房间显示、变换、遮罩、透视、精灵创建、移动、染色、平铺、动画和排序 |
| [文本与脚本控制事件](/api/editor-events/text-control-events.md) | 初稿 | 已人工阅读源码，记录对话、浮动文字、旁白、注释指令、标签、自定义方法、表情、换角色和 Stutter |
| [自定义方法事件](/api/editor-events/custom-methods.md) | 初稿 | 已人工阅读源码，记录自定义方法事件、自动补全规则、`ListedMethod` 和可调用方法清单 |
| [窗口与剩余事件](/api/editor-events/window-misc-events.md) | 初稿 | 已人工阅读源码，记录窗口舞蹈、缩放、内容、标题、显示、排序、播放风格和精灵混合 |

## 重点事件专页

| 页面 | 状态 | 说明 |
| --- | --- | --- |
| [AddClassicBeat](/api/editor-events/AddClassicBeat.md) | 初稿 | 已人工阅读源码，记录 Classic 字段、Hold、Swing、Prepare、Run、拆 FreeTime 和面板读写 |
| [AddOneshotBeat](/api/editor-events/AddOneshotBeat.md) | 初稿 | 已人工阅读源码，记录 Oneshot 字段、验证、解码、准备、预备音频、运行和面板读写 |
| [音频与声音事件](/api/editor-events/AudioSoundEvents.md) | 初稿 | 已人工阅读源码，记录播放音效、拍手音、系统音、行 pulse sound、数拍音和 SoundData |
| [FloatingText 事件](/api/editor-events/FloatingTextEvents.md) | 初稿 | 已人工阅读源码，记录 `FloatingText`、`AdvanceText`、歌词推进、朗读、面板和时间线联动 |
| [镜头与震屏事件](/api/editor-events/CameraShakeEvents.md) | 初稿 | 已人工阅读源码，记录 `MoveCamera`、`ShakeScreen`、`PulseCamera`、`ShakeScreenCustom` 的字段与运行路径 |
| [PlaySong](/api/editor-events/PlaySong.md) | 初稿 | 已人工阅读源码，记录歌曲字段、旧音量迁移、音频准备、播放、BPM 设置和时间线控件 |
| [房间控制事件](/api/editor-events/RoomControlEvents.md) | 初稿 | 已人工阅读源码，记录房间显示、移动、排序、遮罩、透明度、内容模式和透视顶点 |
| [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 初稿 | 已人工阅读源码，记录行创建、自由节拍、显示隐藏、移动、玩家换行、波形、排序和旋转行 |
| [SetRowXs](/api/editor-events/SetRowXs.md) | 初稿 | 已人工阅读源码，记录 X pattern、Synco、运行修饰、面板读写和时间线显示 |
| [ShowDialogue](/api/editor-events/ShowDialogue.md) | 初稿 | 已人工阅读源码，记录普通文本、Ink 指令、本地化、自定义角色准备、RDInk 调用和面板关系 |
| [精灵生命周期事件](/api/editor-events/SpriteLifecycleEvents.md) | 初稿 | 已人工阅读源码，记录 `MakeSprite`、`Move`、`PlayAnimation`、自定义资源加载、精灵注册和面板读写 |
| [精灵渲染与排序事件](/api/editor-events/SpriteRenderEvents.md) | 初稿 | 已人工阅读源码，记录 `Tint`、`Tile`、`SetVisible`、`ReorderSprite`、`Blend` 和 `CustomSprite` 平铺更新 |
| [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 初稿 | 已人工阅读源码，记录表情、文字爆炸、注释脚本、标签、Stutter、旁白和换角色 |
| [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 初稿 | 已人工阅读源码，记录主题、VFX、背景前景、闪光、行染色、手部和桌面颜色事件 |
| [窗口控制事件](/api/editor-events/WindowControlEvents.md) | 初稿 | 已人工阅读源码，记录窗口舞蹈、缩放、内容、显示、标题、排序和主窗口 |
| [杂项游戏事件](/api/editor-events/MiscGameEvents.md) | 初稿 | 已人工阅读源码，记录爆心、RDGS、BassDrop、状态牌、完成关卡、手部归属和播放风格 |
| [歌曲时间线事件](/api/editor-events/SongTimingEvents.md) | 初稿 | 已人工阅读源码，记录 `SetBeatsPerMinute`、`SetCrotchetsPerBar`、面板、时间线和换算关系 |
