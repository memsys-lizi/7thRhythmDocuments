# 任务进度

本页同步根目录 `AGENTS.md` 的长期进度，用于在文档站中快速查看当前阶段。

## 阶段表

| 阶段 | 状态 | 目标 |
| --- | --- | --- |
| 阶段 0：文档基础设施 | 已完成 | 完善 docsify 首页、侧边栏、搜索、黑白样式、模块目录 |
| 阶段 1：核心骨架 | 已完成 | 深写 `RDBase`、`RDClass`、`LevelBase`、`scrConductor`、`scnGame`、`scnEditor` |
| 阶段 2：关卡编辑器事件系统 | 已完成 | 深写 `LevelEvent_Base`、`LevelEvent_*`、`InspectorPanel`、`InspectorPanel_*` |
| 阶段 3：运行时游戏系统 | 已完成 | 覆盖节拍、判定、行、房间、窗口、音频、VFX、场景流程 |
| 阶段 4：数据模型与枚举 | 已完成 | 覆盖 `RDLevelData`、`RDLevelSettings`、自定义关卡、错误、难度、平台等模型 |
| 阶段 5：官方关卡脚本 | 已完成 | 覆盖 `Level_*` 系列，说明每个关卡脚本的特殊逻辑 |
| 阶段 6：源码研究索引 | 已完成 | 整理可调用方法、编辑器事件、数据字段、扩展点、高风险系统和未分类源码索引 |
| 阶段 7：全站复核 | 已完成 | 补交叉链接、术语表、调用图、缺失项清单 |

## 当前工作重点

阶段 0 到阶段 7 已完成。阶段 3 和阶段 4 复核记录见 [阶段 3 与阶段 4 复核](/api/review/stage-3-4-review.md)。阶段 5 已完成文件级归属和阶段 7 复核，当前源码目录 75 个 `Level_*.cs` 文件均已归入专题页或文件级说明。阶段 6 已完成 [可调用方法索引](/modding/callable-methods.md)、[事件写法索引](/modding/event-patterns.md)、[数据字段索引](/modding/data-fields.md)、[入口与单例索引](/modding/entry-singletons.md)、[扩展点索引](/modding/extension-points.md)、[高风险系统索引](/modding/high-risk-systems.md) 和 [未分类源码覆盖清单](/modding/source-coverage.md)。覆盖清单统计 `Assembly-CSharp` 下 1050 个 `.cs` 文件，当前 1050 个文件名已在文档中命中，0 个文件名未命中。阶段 7 已完成 [阶段 7 全站复核](/api/review/stage-7-site-review.md)、[主干调用图](/api/review/call-graphs.md)、术语表补充、全站链接抽查、侧边栏路由检查、禁用词检查和最终完成判定。

## 阶段 6 完成记录

| 顺序 | 页面方向 | 目标 |
| --- | --- | --- |
| 1 | 数据字段索引 | 已完成：整理 `.rdlevel`、settings、rows、events、decorations、conditionals、bookmarks、palettes 和设置校验入口 |
| 2 | 入口与单例索引 | 已完成：从源码角度说明 Unity 场景、全局单例、运行时管理器、编辑器管理器的职责和调用前提 |
| 3 | 高风险系统索引 | 已完成：整理判定、输入、音频、窗口、暂停、结算、存档、关卡加载、编辑器保存和事件运行路径 |
| 4 | 扩展点索引 | 已完成：串联事件类、Inspector 面板、关卡脚本公开方法、房间方法、数据模型和资源加载接入点 |
| 5 | 未分类源码覆盖清单 | 已完成：统计 `Assembly-CSharp` 下 `.cs` 文件并建立阶段 7 补文档队列 |

## 验收清单

- docsify 首页可以打开。
- 侧边栏能进入所有主要模块。
- 文档样式保持黑白灰。
- `RDFucked/` 不出现在 Git 状态中。
- 阶段 0 到阶段 7 均已完成。
