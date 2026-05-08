# 任务进度

本页同步根目录 `AGENTS.md` 的长期进度，用于在文档站中快速查看当前阶段。

## 阶段表

| 阶段 | 状态 | 目标 |
| --- | --- | --- |
| 阶段 0：文档基础设施 | 已完成 | 完善 docsify 首页、侧边栏、搜索、黑白样式、模块目录 |
| 阶段 1：核心骨架 | 已完成 | 深写 `RDBase`、`RDClass`、`LevelBase`、`scrConductor`、`scnGame`、`scnEditor` |
| 阶段 2：关卡编辑器事件系统 | 已完成 | 深写 `LevelEvent_Base`、`LevelEvent_*`、`InspectorPanel`、`InspectorPanel_*` |
| 阶段 3：运行时游戏系统 | 待复核 | 覆盖节拍、判定、行、房间、窗口、音频、VFX、场景流程 |
| 阶段 4：数据模型与枚举 | 待复核 | 覆盖 `RDLevelData`、`RDLevelSettings`、自定义关卡、错误、难度、平台等模型 |
| 阶段 5：官方关卡脚本 | 进行中 | 覆盖 `Level_*` 系列，说明每个关卡脚本的特殊逻辑 |
| 阶段 6：Mod 作者索引 | 进行中 | 整理可调用方法、编辑器事件、数据字段、扩展点和风险提示 |
| 阶段 7：全站复核 | 未开始 | 补交叉链接、术语表、调用图、缺失项清单 |

## 当前工作重点

阶段 0、阶段 1 和阶段 2 已复核完成。阶段 3 主体页面已完成并进入待复核，当前覆盖 [运行时系统总览](/api/runtime/overview.md)、[节拍与判定](/api/runtime/beats-judgement.md)、[输入系统](/api/runtime/input-system.md)、[行与角色系统](/api/runtime/rows-characters.md)、[房间与 VFX 系统](/api/runtime/rooms-vfx.md)、[窗口系统](/api/runtime/windows.md)、[音频运行时](/api/runtime/audio-runtime.md) 和 [场景流程与暂停流程](/api/runtime/scene-flow.md)。阶段 4 主体页面已完成并进入待复核。阶段 5 已开始，当前完成 [官方关卡脚本总览](/api/levels/overview.md)、[教程与开场关卡](/api/levels/tutorials-opening.md)、[Boss 与高压段落](/api/levels/boss-high-pressure.md)、[运动与节奏变体](/api/levels/athlete-freezeshot.md)、[视觉与窗口特殊关卡](/api/levels/visual-special.md) 和 [叙事与场景关卡](/api/levels/story-scene-levels.md)。下一步深写其他官方与测试脚本。

## 验收清单

- docsify 首页可以打开。
- 侧边栏能进入所有主要模块。
- 文档样式保持黑白灰。
- `RDFucked/` 不出现在 Git 状态中。
- 每次完成阶段或子模块后，同步更新本页和根目录 `AGENTS.md`。
