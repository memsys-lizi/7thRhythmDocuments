# 任务进度

本页同步根目录 `AGENTS.md` 的长期进度，用于在文档站中快速查看当前阶段。

## 阶段表

| 阶段 | 状态 | 目标 |
| --- | --- | --- |
| 阶段 0：文档基础设施 | 待复核 | 完善 docsify 首页、侧边栏、搜索、黑白样式、模块目录 |
| 阶段 1：核心骨架 | 待复核 | 深写 `RDBase`、`RDClass`、`LevelBase`、`scrConductor`、`scnGame`、`scnEditor` |
| 阶段 2：关卡编辑器事件系统 | 进行中 | 深写 `LevelEvent_Base`、`LevelEvent_*`、`InspectorPanel`、`InspectorPanel_*` |
| 阶段 3：运行时游戏系统 | 未开始 | 覆盖节拍、判定、行、房间、窗口、音频、VFX、场景流程 |
| 阶段 4：数据模型与枚举 | 未开始 | 覆盖 `RDLevelData`、`RDLevelSettings`、自定义关卡、错误、难度、平台等模型 |
| 阶段 5：官方关卡脚本 | 未开始 | 覆盖 `Level_*` 系列，说明每个关卡脚本的特殊逻辑 |
| 阶段 6：Mod 作者索引 | 进行中 | 整理可调用方法、编辑器事件、数据字段、扩展点和风险提示 |
| 阶段 7：全站复核 | 未开始 | 补交叉链接、术语表、调用图、缺失项清单 |

## 当前工作重点

阶段 2 已开始。当前已完成 `LevelEvent_Base`、`LevelEventInfo`、`BasePropertyInfo`、`InspectorPanel` 的第一版人工初稿，并补了歌曲与音频事件、行与节拍事件、视觉与镜头事件、房间与精灵事件、文本与脚本控制事件、窗口与剩余事件分组页、编辑器控件索引、事件覆盖清单、事件运行路径、Inspector 面板读写链路，以及重点事件 `AddClassicBeat`、`AddOneshotBeat`、`SetRowXs`、`PlaySong`、歌曲时间线事件、`ShowDialogue`、`FloatingText` 事件、精灵生命周期事件、精灵渲染与排序事件、镜头与震屏事件、房间控制事件、窗口控制事件、视觉样式与特效事件、行控制与自由节拍事件、音频与声音事件、文本控制与脚本事件、杂项游戏事件专页。自定义方法已整理到编辑器事件分组，Mod 区保留入口页。当前步骤是阶段 2 复核：补 Inspector 面板、时间线控件、交叉链接和缺失项清单。

## 验收清单

- docsify 首页可以打开。
- 侧边栏能进入所有主要模块。
- 文档样式保持黑白灰。
- `RDFucked/` 不出现在 Git 状态中。
- 每次完成阶段或子模块后，同步更新本页和根目录 `AGENTS.md`。
