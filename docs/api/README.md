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

## 已写页面

| 页面 | 状态 | 说明 |
| --- | --- | --- |
| [RDBase](/api/core/RDBase.md) | 初稿 | 已人工阅读源码，记录字段、属性、方法和风险 |
| [RDClass](/api/core/RDClass.md) | 初稿 | 已人工阅读源码，记录非组件便利基类 |
| [LevelBase](/api/core/LevelBase.md) | 初稿 | 已人工阅读主结构，先按职责分组，后续拆页逐项深写 |
| [scrConductor](/api/core/scrConductor.md) | 初稿 | 已人工阅读源码，记录音乐时间轴、播放、Scrub、BPM 和校准入口 |
| [scnGame](/api/core/scnGame.md) | 初稿 | 已人工阅读源码，记录游戏场景状态、Beat、行、房间、判定和流程入口 |
| [scnEditor](/api/core/scnEditor.md) | 初稿 | 已人工阅读源码，记录编辑器场景状态、事件控件、文件、播放预览和选择流程 |
| [LevelEvent_Base](/api/editor-events/LevelEvent_Base.md) | 初稿 | 已人工阅读源码，记录事件公共字段、编码解码、条件、标签和节拍调度 |
| [LevelEventInfo](/api/editor-events/LevelEventInfo.md) | 初稿 | 已人工阅读源码，记录事件元数据 Attribute、属性反射和枚举范围 |
| [BasePropertyInfo](/api/editor-events/BasePropertyInfo.md) | 初稿 | 已人工阅读源码，记录事件属性序列化、默认控件映射和 PropertyControl 管线 |
| [InspectorPanel](/api/editor-events/InspectorPanel.md) | 初稿 | 已人工阅读源码，记录自动面板、保存监听、本地化和面板管理器 |
| [歌曲与音频事件](/api/editor-events/song-audio-events.md) | 初稿 | 已人工阅读源码，记录歌曲、BPM、节拍声音、计数音、拍手音和游戏音效事件 |
