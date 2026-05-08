# 编辑器事件系统

## 模块边界

本模块覆盖 `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor` 中的关卡编辑器事件系统。

核心类型：

| 类型族 | 说明 |
| --- | --- |
| `LevelEvent_Base` | 所有关卡事件的数据基类 |
| `LevelEvent_*` | 具体事件数据，如移动、播放声音、显示房间、设置 BPM |
| `InspectorPanel` | 编辑器右侧属性面板基类 |
| `InspectorPanel_*` | 具体事件 Inspector 面板 |
| `LevelEventControl_*` | 时间线上的事件控件 |
| `ControlAttribute` 及子类 | 自动生成属性控件的元数据 |

## 核心流程

```mermaid
flowchart TD
  EventType["LevelEvent_* 类型"]
  Attr["LevelEventInfoAttribute"]
  Info["LevelEventInfo"]
  PropInfo["BasePropertyInfo"]
  EventObj["LevelEvent_Base 实例"]
  Control["LevelEventControl_* 时间线控件"]
  Panel["InspectorPanel_* 属性面板"]
  Property["Property + PropertyControl"]
  Runtime["LevelBase / scrExecuteOnCertainBeat"]

  EventType --> Attr --> Info --> PropInfo
  EventType --> EventObj
  Info --> EventObj
  EventObj --> Control --> Panel
  Panel --> Property --> EventObj
  EventObj --> Runtime
```

## 源码结论

| 项目 | 事实 |
| --- | --- |
| `LevelEventType` 范围 | `None = 0` 到 `HideWindow = 80` |
| `LevelEvent_*` 命名 | 类名去掉 `LevelEvent_` 后解析成 `LevelEventType` |
| `LevelEvent_Base` | 负责公共字段、条件、标签、房间、编码解码、复制克隆和节拍调度 |
| `LevelEventInfo` | 反射读取事件类的 `LevelEventInfoAttribute` 和带 `JsonPropertyAttribute` 的公开实例属性 |
| `LevelEventInfoAttribute` | 记录事件执行时机、排序偏移、是否使用小节、节拍、类型、目标 ID、房间用法等元数据 |
| `BasePropertyInfo` | 把事件属性映射为可解码、可编码、可复制、可生成控件的描述 |
| `InspectorPanel` | 负责显示、保存、更新事件 UI，也能基于 `LevelEventInfo.propertiesInfo` 自动生成属性控件 |
| `RDInspectorPanelManager` | 收集手工面板，并为缺失的 `InspectorPanel` 子类创建自动面板 |

## 已写页面

| 页面 | 内容 |
| --- | --- |
| [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) | 事件公共字段、属性、编码解码、条件、标签、调度、复制和时间换算。 |
| [LevelEventInfo](/api/editor-events/LevelEventInfo.md) | 事件元数据、Attribute 字段、执行时机、房间用法、标签页和事件类型范围。 |
| [BasePropertyInfo](/api/editor-events/BasePropertyInfo.md) | 事件属性反射、序列化映射、默认控件映射、`Property` 和 `PropertyControl`。 |
| [InspectorPanel](/api/editor-events/InspectorPanel.md) | 自动面板、保存监听、本地化、属性控件更新和 `RDInspectorPanelManager`。 |
| [编辑器控件索引](/api/editor-events/editor-controls.md) | 时间线控件、属性面板和字段控件三层 UI 关系。 |
| [时间线与事件控件](/api/editor-events/timeline-controls.md) | `Timeline`、`TabSection`、事件控件、点击创建、拖拽移动、书签、波形和坐标换算。 |
| [Inspector 面板索引与专项行为](/api/editor-events/inspector-panels.md) | `InspectorPanel_*` 子类、手工面板、自动面板和专项字段联动。 |
| [事件覆盖清单](/api/editor-events/event-coverage.md) | 按 `LevelEventType` 枚举顺序记录事件页面归属和覆盖状态。 |
| [事件运行路径](/api/editor-events/runtime-flow.md) | 事件从关卡数据进入 `Prepare`、`RunPrebar`、按节拍调度和 Scrub 追赶的运行链路。 |
| [Inspector 面板读写链路](/api/editor-events/inspector-flow.md) | 自动面板与手工面板的显示、保存、输入监听和字段回写路径。 |
| [AddClassicBeat](/api/editor-events/AddClassicBeat.md) | Classic 节拍事件字段、Hold、Swing、准备、运行、拆 FreeTime 和面板读写。 |
| [AddOneshotBeat](/api/editor-events/AddOneshotBeat.md) | Oneshot 节拍事件字段、验证、解码、准备、预备音频、运行和面板读写。 |
| [音频与声音事件](/api/editor-events/AudioSoundEvents.md) | 播放音效、拍手音、系统音、行 pulse sound、数拍音和 SoundData。 |
| [FloatingText 事件](/api/editor-events/FloatingTextEvents.md) | `FloatingText`、`AdvanceText`、歌词推进、朗读、面板和时间线联动。 |
| [镜头与震屏事件](/api/editor-events/CameraShakeEvents.md) | `MoveCamera`、`ShakeScreen`、`PulseCamera`、`ShakeScreenCustom` 的字段与运行路径。 |
| [PlaySong](/api/editor-events/PlaySong.md) | 歌曲字段、旧音量迁移、音频准备、播放、BPM 设置和时间线控件。 |
| [房间控制事件](/api/editor-events/RoomControlEvents.md) | 房间显示、移动、排序、遮罩、透明度、内容模式和透视顶点。 |
| [行控制与自由节拍事件](/api/editor-events/RowControlEvents.md) | 行创建、自由节拍、显示隐藏、移动、玩家换行、波形、排序和旋转行。 |
| [SetRowXs](/api/editor-events/SetRowXs.md) | X pattern、Synco、运行修饰、面板读写和时间线显示。 |
| [ShowDialogue](/api/editor-events/ShowDialogue.md) | 普通文本、Ink 指令、本地化、自定义角色准备、RDInk 调用和面板关系。 |
| [精灵生命周期事件](/api/editor-events/SpriteLifecycleEvents.md) | `MakeSprite`、`Move`、`PlayAnimation`、自定义资源加载、精灵注册和面板读写。 |
| [精灵渲染与排序事件](/api/editor-events/SpriteRenderEvents.md) | `Tint`、`Tile`、`SetVisible`、`ReorderSprite`、`Blend` 和 `CustomSprite` 平铺更新。 |
| [文本控制与脚本事件](/api/editor-events/TextControlEvents.md) | 表情、文字爆炸、注释脚本、标签、Stutter、旁白和换角色。 |
| [视觉样式与特效事件](/api/editor-events/VisualStyleEvents.md) | 主题、VFX、背景前景、闪光、行染色、手部和桌面颜色事件。 |
| [窗口控制事件](/api/editor-events/WindowControlEvents.md) | 窗口舞蹈、缩放、内容、显示、标题、排序和主窗口。 |
| [杂项游戏事件](/api/editor-events/MiscGameEvents.md) | 爆心、RDGS、BassDrop、状态牌、完成关卡、手部归属和播放风格。 |
| [歌曲时间线事件](/api/editor-events/SongTimingEvents.md) | `SetBeatsPerMinute`、`SetCrotchetsPerBar`、面板、时间线和换算关系。 |
| [歌曲与音频事件](/api/editor-events/song-audio-events.md) | `PlaySong`、BPM、拍号、播放音效、行节拍音、计数音、拍手音和游戏音效替换。 |
| [行与节拍事件](/api/editor-events/row-events.md) | `MakeRow`、Classic/Oneshot/FreeTime 节拍、`SetRowXs`、行显示、行移动和玩家换行。 |
| [视觉与镜头事件](/api/editor-events/visual-camera-events.md) | 主题、VFX preset、背景前景、闪光、镜头移动、震屏、行染色和手部显示。 |
| [房间与精灵事件](/api/editor-events/room-sprite-events.md) | 房间显示、房间变换、遮罩、透视、排序，以及自定义精灵创建、移动、染色、平铺和动画。 |
| [文本与脚本控制事件](/api/editor-events/text-control-events.md) | 对话、浮动文字、旁白、注释脚本、标签触发、自定义方法、角色表情、换角色和 Stutter。 |
| [窗口与剩余事件](/api/editor-events/window-misc-events.md) | 窗口舞蹈、窗口缩放、窗口内容、主窗口、窗口标题、窗口显示、窗口排序、播放风格和精灵混合。 |

## Mod 作者关注点

| 入口 | 说明 |
| --- | --- |
| 事件类型 | 具体事件类名与 `LevelEventType` 枚举名一一对应。 |
| 保存字段 | 事件专属字段来自带 `JsonPropertyAttribute` 的公开属性；公共字段来自 `LevelEvent_Base`。 |
| 运行入口 | 具体事件重写 `Run`、`RunPrebar`、`Prepare`、`TaggedActionVariant`。 |
| UI 入口 | 手工面板继承 `InspectorPanel`；自动面板通过 `BasePropertyInfo` 和 `ControlAttribute` 生成。 |
| 条件 | 本地条件存在 `conditionals`，全局条件存在 `globalConditionals`，取反分别使用负数编码和 `~` 前缀。 |

## 相关页面

- [事件覆盖清单](/api/editor-events/event-coverage.md)：按 `LevelEventType` 编号定位每个事件页面。
- [编辑器控件索引](/api/editor-events/editor-controls.md)：解释时间线控件、属性面板和字段控件的关系。
- [时间线与事件控件](/api/editor-events/timeline-controls.md)：解释底部时间线、标签页、事件控件、坐标换算、点击创建和拖拽编辑。
- [Inspector 面板索引与专项行为](/api/editor-events/inspector-panels.md)：解释手工面板、自动面板和复杂字段联动。
- [Inspector 面板读写链路](/api/editor-events/inspector-flow.md)：解释属性面板如何显示事件并把字段写回数据对象。
- [自定义方法事件](/api/editor-events/custom-methods.md)：解释 `CallCustomMethod` 与 `[ListedMethod(true)]` 的事件入口。
- [事件写法索引](/modding/event-patterns.md)：从源码研究角度按常见目标回到事件分组页和专页。
