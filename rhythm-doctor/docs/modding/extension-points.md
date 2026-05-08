# 扩展点索引

本页整理 RD 主工程中适合继续追踪的跨模块扩展点。这里的“扩展点”指源码中已经存在的接入形态：继承、Attribute 标记、反射收集、公开回调、事件落点和资源加载入口。具体字段、方法和运行行为仍以对应 API 页面为准。

## 总览

| 扩展点 | 主要类型 | 接入形态 | 详情页 |
| --- | --- | --- | --- |
| 编辑器事件 | `LevelEvent_*`、`LevelEventInfoAttribute`、`JsonPropertyAttribute` | 类名对应 `LevelEventType`，Attribute 描述事件元数据，公开属性进入序列化与 Inspector | [LevelEventInfo](/api/editor-events/LevelEventInfo.md)、[LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) |
| Inspector 面板 | `InspectorPanel_*`、`RDInspectorPanelManager` | 手工面板或自动面板；专项面板重写显示、保存或属性联动方法 | [Inspector 面板索引与专项行为](/api/editor-events/inspector-panels.md) |
| 属性反射 | `BasePropertyInfo`、`ControlAttribute`、`JsonPropertyAttribute` | 根据属性类型选择编码器、解码器和默认控件 | [属性反射与小型模型](/api/data-models/property-reflection-small-models.md) |
| 条件系统 | `Conditional_*`、`ConditionalInfoAttribute`、`ConditionalInspector_*` | 条件类名对应 `ConditionalType`，属性进入条件编码和面板显示 | [条件系统](/api/data-models/conditionals.md) |
| 官方关卡脚本 | `Level_*`、`LevelBase` | 继承 `LevelBase`，覆写生命周期和判定回调，提供关卡专用公开方法 | [官方关卡脚本总览](/api/levels/overview.md) |
| 自定义方法事件 | `LevelEvent_CallCustomMethod`、`ListedMethodAttribute` | 事件字符串通过反射调用当前关卡、`RDRoom` 或 VFX 对象公开方法 | [自定义方法事件](/api/editor-events/custom-methods.md) |
| 房间与 VFX | `RDRoom`、`scrVfxControl` | 房间事件、视觉事件和关卡脚本调用房间/VFX 方法 | [房间与 VFX 系统](/api/runtime/rooms-vfx.md) |
| 自定义资源 | `CustomAnimationData`、`CustomAnimation`、`CustomSprite`、`SoundData` | 关卡加载或事件准备阶段读取音频、动画、纹理和精灵数据 | [音频与辅助数据模型](/api/data-models/audio-and-auxiliary.md)、[属性反射与小型模型](/api/data-models/property-reflection-small-models.md) |

## 编辑器事件扩展点

`LevelEventInfo` 的构造流程说明了事件类的基本接入规则：

| 规则 | 源码行为 |
| --- | --- |
| 类名 | 事件类命名使用 `RDLevelEditor.LevelEvent_` 加 `LevelEventType` 后缀 |
| 元数据 | 事件类需要 `LevelEventInfoAttribute`，缺少时 `LevelEventInfo` 构造会抛出异常 |
| 专属字段 | 只收集当前事件类自己声明的公开实例属性，并筛选带 `JsonPropertyAttribute` 的属性 |
| 字段顺序 | `LevelEventInfo` 按 `MetadataToken` 保持源码声明顺序 |
| 属性适配 | 每个字段交给 `BasePropertyInfo.FromProperty()` 生成编码、解码和控件描述 |

事件公共字段、条件、房间、标签和运行调度由 [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) 负责。事件编号与页面归属见 [事件覆盖清单](/api/editor-events/event-coverage.md)。

## Inspector 面板扩展点

Inspector 面板分为手工面板、自动面板和空子类自动面板。

| 接入点 | 作用 |
| --- | --- |
| `RDInspectorPanelManager.Setup()` | 扫描 `InspectorPanel` 子类；层级中已有实例时保留手工面板，缺失实例时克隆空面板作为自动面板 |
| `InspectorPanel.AwakeAuto()` | 根据事件 `LevelEventInfo.propertiesInfo` 自动生成属性控件 |
| `UpdateUIInternal()` | 手工面板从事件对象读取字段并刷新 UI |
| `SaveInternal()` | 手工面板从 UI 读取字段并写回事件对象 |
| `UpdateUIProperties()` | 自动属性控件刷新前后插入字段联动 |
| `SaveProperties()` | 自动属性保存前后插入字段联动 |

已经深写的专项面板包括 `AddClassicBeat`、`AddOneshotBeat`、`SetRowXs`、`CallCustomMethod`、`FloatingText`、`MakeRow`、`MakeSprite`、`ChangePlayersRows` 和 `LevelSettings`。详情见 [Inspector 面板索引与专项行为](/api/editor-events/inspector-panels.md)。

## 属性与控件扩展点

`BasePropertyInfo` 是自动 Inspector 与事件序列化的共同入口。

| 类型 | 接入方式 |
| --- | --- |
| `JsonPropertyAttribute` | 标记 JSON 键名、单位、本地化键、必填、启用状态、`enableIf` 和 `saveIf` |
| `BasePropertyInfo.FromProperty()` | 根据 C# 类型创建 `BoolPropertyInfo`、`IntPropertyInfo`、`FloatPropertyInfo`、`SoundDataPropertyInfo`、`EnumPropertyInfo` 等适配器 |
| `ControlAttribute` | 显式指定控件；缺省时由 `GetDefaultControlAttribute()` 根据属性类型推导 |
| `enableIf` / `saveIf` | 反射绑定事件类上的无参 bool 方法，用于控制 UI 启用和字段保存 |
| `OffAttribute` | 配合 nullable 属性表达默认关闭状态 |

字段类型和默认控件映射见 [属性反射与小型模型](/api/data-models/property-reflection-small-models.md)。

## 条件系统扩展点

条件系统与事件属性系统使用相似的反射模式。

| 类型 | 接入方式 |
| --- | --- |
| `Conditional_*` | 类名后缀对应 `ConditionalType` |
| `ConditionalInfoAttribute` | 标记条件是否是常量条件 |
| `ConditionalInfo` | 收集带 `JsonPropertyAttribute` 的公开属性，生成条件属性描述 |
| `ConditionalInspector_*` | 从 UI 保存具体条件对象 |
| `Conditionals` | 编辑器条件面板，负责创建、编辑、绑定、取反、删除和复制条件 |
| `LevelEvent_Base.CheckConditionals()` | 运行前统一检查本地条件和全局条件 |

条件 ID、全局条件、取反编码和运行时检查链路见 [条件系统](/api/data-models/conditionals.md)。

## 官方关卡脚本扩展点

官方关卡脚本通过继承 `LevelBase` 接入运行时。阶段 5 已把 75 个 `Level_*.cs` 文件全部归属到专题页或文件级页面。

| 覆写点 | 调用阶段 | 常见职责 |
| --- | --- | --- |
| `Init()` | 关卡对象构造后 | 设置关卡类型、rank、Boss 标记、跳转目标、特殊规则和歌曲列表 |
| `LoadBigAssets()` | 关卡加载协程 | 实例化关卡 prefab、背景、视频后处理、Ink 文件和主题资源 |
| `preactions()` | 每小节预执行 | 安排小节前的行、音乐、冻结、状态文字和失败提示 |
| `actions()` | 每小节执行 | 安排视觉效果、房间切换、剧情动作、标签事件和自定义方法 |
| `Update()` | 每帧 | 处理持续视觉、滚动、实时输入或镜头状态 |
| `OnHit()` / `OnMistake()` | 判定回调 | 推进 Boss 血量、体育场棒球、低血量状态、失败预处理或特殊反馈 |
| `FailLevel()` | 失败流程 | 覆盖默认失败流程，接入 Boss、剧情失败或 checkpoint 行为 |
| `BeepGet()` / `BeepSet()` / `BeepGo()` | Oneshot 提示阶段 | 同步灯光、聚光灯、提示视觉和关卡专用反馈 |

官方关卡分组和重点脚本见 [官方关卡脚本总览](/api/levels/overview.md)；文件级归属见 [官方关卡覆盖清单](/api/levels/coverage.md)。

## 自定义方法与公开方法入口

`CallCustomMethod` 是编辑器事件系统的一员。它通过事件字符串解析目标，再通过反射调用方法或读写字段。

| 目标 | 字符串形式 | 说明 |
| --- | --- | --- |
| 当前关卡 | `Method()`、`level.Method()` | 目标是当前 `LevelBase` 或官方 `Level_*` 子类实例 |
| VFX 控制器 | `vfx.Method()` | 目标是 `scrVfxControl` |
| 房间 | `room1.Method()` 到 `room4.Method()` | 目标是对应 `RDRoom` |
| 房间数组 | `room[0].Method()` 到 `room[3].Method()` | 目标是对应 `RDRoom` 数组下标 |
| 字段 | `field = value`、`field++`、`field--` | 目标是当前关卡字段 |

自动补全方法需要公开实例方法、返回 `void`、参数类型受支持，并带 `[ListedMethod]`；开发模式下还会列出满足签名的未标记方法。详见 [自定义方法事件](/api/editor-events/custom-methods.md) 和 [可调用方法索引](/modding/callable-methods.md)。

## 房间、VFX 与资源入口

| 入口 | 类型 | 使用来源 |
| --- | --- | --- |
| 房间对象 | `RDRoom` | 房间事件、关卡脚本公开方法和 `CallCustomMethod` 房间目标 |
| 全局视觉 | `scrVfxControl` | 视觉事件、镜头事件、关卡脚本和 `RDBase.Vfx` / `RDClass.Vfx` |
| 自定义精灵 | `CustomSprite` | `MakeSprite`、`Move`、`Tint`、`Tile`、`PlayAnimation`、`SetVisible`、`ReorderSprite`、`Blend` |
| 自定义动画 | `CustomAnimationData`、`CustomAnimation` | 自定义角色与精灵动画资源 |
| 音频数据 | `SoundData`、`SoundDataStruct` | `PlaySong`、`PlaySound`、Beat 声音、游戏音效和编辑器试听 |
| 关卡设置资源 | `RDLevelSettings` | 预览图、注射器图标、预览音频、Ink 文件和自定义关卡缓存字段 |

房间与全局视觉见 [房间与 VFX 系统](/api/runtime/rooms-vfx.md)。声音、书签、颜色与标签动作见 [音频与辅助数据模型](/api/data-models/audio-and-auxiliary.md)。自定义动画数据见 [属性反射与小型模型](/api/data-models/property-reflection-small-models.md)。

## 阅读路线

1. 从 [入口与单例索引](/modding/entry-singletons.md) 确认当前对象属于组件、普通逻辑类、编辑器控件还是运行时场景。
2. 如果对象是事件，进入 [事件覆盖清单](/api/editor-events/event-coverage.md) 找事件类和专题页。
3. 如果对象是事件字段或 Inspector 控件，进入 [BasePropertyInfo](/api/editor-events/BasePropertyInfo.md) 和 [属性反射与小型模型](/api/data-models/property-reflection-small-models.md)。
4. 如果对象是官方关卡脚本，进入 [官方关卡覆盖清单](/api/levels/coverage.md) 找到归属页面。
5. 如果对象是房间、VFX、窗口、音频、输入或判定，进入 [运行时系统总览](/api/runtime/overview.md) 找对应专题。



