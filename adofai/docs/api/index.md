# API 入口

本页作为 ADOFAI 源码 API 文档的入口。当前处于阶段 0，后续会按源码分层逐步补齐类页和专题页。

## 计划中的核心 API 页

| 分组 | 计划页面 | 覆盖类型 |
| --- | --- | --- |
| 核心入口 | `ADOBase`、`ADOClass`、`ADOStartup` | 全局访问器、启动流程、平台初始化、资源初始化 |
| 场景控制 | `scrController`、`scrConductor`、`scnGame`、`scnEditor` | 游戏状态、音频时钟、自定义关卡运行、编辑器入口 |
| 轨道与地板 | `scrLevelMaker`、`scrFloor`、`Level` | 路径生成、地板对象、官方关卡脚本基类 |
| 关卡数据 | `LevelData`、`LevelEvent`、`LevelEventInfo`、`PropertyInfo` | `.adofai` 数据、事件对象、属性元数据 |
| 编辑器控件 | `InspectorPanel`、`PropertiesPanel`、`Property`、`PropertyControl_*` | 属性面板、控件绑定、事件编辑 |
| 编辑器动作 | `EditorAction` 与 `ADOFAI.Editor.Actions` | 撤销、重做、选择、复制、粘贴、播放和文件动作 |
| 事件效果 | `ffxPlusBase`、`ffx*Plus`、`ffx*` | 事件执行组件、相机、轨道、装饰、滤镜、声音 |
| 存档与服务 | `Persistence`、`GCS`、`GCNS`、平台 helper、DLC、Steam | 全局状态、存档、平台差异、外部服务 |

## 当前已确认的关键事实

| 类型 | 源码路径 | 作用 |
| --- | --- | --- |
| `ADOBase` | `7thRhythmSource/ADOFAi/ADOBase.cs` | 继承 `RDBaseDll`，提供 `audioManager`、`conductor`、`controller`、`editor`、`customLevel` 等全局访问器，并封装当前场景、平台、关卡类型判断和跳转方法。 |
| `ADOStartup` | `7thRhythmSource/ADOFAi/ADOStartup.cs` | 通过 `RuntimeInitializeOnLoadMethod(BeforeSceneLoad)` 在场景加载前执行，初始化平台、存档、Steam、DLC、事件元数据、输入、音频设置和加载器。 |
| `LevelData` | `7thRhythmSource/ADOFAi/ADOFAI/LevelData.cs` | 保存路径数据、角度数据、事件数组、装饰数组和 8 类 settings 事件，并通过属性读取歌曲、关卡、轨道、背景和相机设置。 |
| `LevelEvent` | `7thRhythmSource/ADOFAi/ADOFAI/LevelEvent.cs` | 保存 `floor`、`eventType`、属性字典、禁用字典、可见/锁定状态和事件元数据，并提供类型化读取方法。 |
| `PropertyControl` | `7thRhythmSource/ADOFAi/ADOFAI.LevelEditor.Controls/PropertyControl.cs` | 编辑器属性控件基类，负责控件文本、枚举设置、输入校验、启用状态和对路径/地板变化的回写。 |
