# 术语表

| 术语 | 说明 |
| --- | --- |
| RD | Rhythm Doctor 项目主工程简称 |
| `RDFucked` | 本地 Unity 工程目录名，仅作为源码参考 |
| 主工程代码 | `Assets/Scripts/Assembly-CSharp` 下的 RD 代码 |
| 编辑器事件 | `RDLevelEditor` 中的 `LevelEvent_*` 事件数据和对应 UI |
| Inspector Panel | 关卡编辑器右侧属性面板，常由 `InspectorPanel_*` 实现 |
| 源码 API | 按源码类型、字段、属性、方法和调用关系整理的参考页面 |
| beat | 游戏内拍点，通常由 `scrConductor` 的音乐时间换算到关卡节拍 |
| bar | 小节编号，`scrConductor.barNumber` 和事件节拍共同决定当前段落 |
| crotchet | 四分音符时值，RD 用它把 BPM、拍数和秒数互相换算 |
| row | 游戏中的一行角色与节拍容器，运行时主要由 `Row` 和 `RowEntity` 管理 |
| room | 房间显示单元，负责背景、前景、遮罩、透视和场景内视觉层级 |
| window | 游戏窗口系统中的可舞蹈窗口或虚拟窗口，由 `WindowChoreographer` 族管理 |
| condition | 事件或数据上的条件对象，运行时用于决定事件是否生效 |
| rank | 关卡结算等级，受命中、失误、完美状态和关卡脚本影响 |
| `LevelBase` | 关卡逻辑基类，承载关卡数据、事件调度、公开关卡方法和官方关卡脚本覆写点 |
| `scnGame` | 游戏运行场景，负责加载关卡、创建行和节拍、处理暂停、失败、结算与输入 |
| `scnEditor` | 关卡编辑器场景，负责打开、保存、时间线、Inspector 和预览播放 |
| `scrConductor` | 音乐时间核心，负责 BPM、小节、拍点、歌曲播放、scrub 和事件时间换算 |
| `LevelEvent_Base` | 编辑器事件基类，负责公共字段、解码编码、准备、运行和条件检查 |
| `RDLevelData` | `.rdlevel` 根数据模型，包含 settings、rows、decorations、events、conditionals、bookmarks 和调色板 |
| `RDLevelSettings` | 关卡设置模型，保存标题、作者、难度、音量、版本、资源路径和播放设置 |
| `Timeline` | 编辑器时间线控件，负责事件位置、书签、滚动、播放头和坐标换算 |
| `WindowChoreographer` | 窗口系统入口，管理真实窗口或虚拟窗口的舞蹈、内容、标题和排序 |
| `scrVfxControl` | 运行时视觉控制器，承接主题、滤镜、闪光、背景、前景和 HUD 覆盖层变化 |



