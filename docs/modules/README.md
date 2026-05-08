# 模块总览

文档按源码系统拆分，不把所有内容塞进单页。

## 模块入口

| 模块 | 入口 |
| --- | --- |
| 核心骨架 | [核心骨架](/modules/core.md) |
| 编辑器事件系统 | [编辑器事件系统](/modules/editor-events.md) |
| 运行时游戏系统 | [运行时游戏系统](/modules/runtime.md) |
| 数据模型与枚举 | [数据模型与枚举](/modules/data-models.md) |
| 官方关卡脚本 | [官方关卡脚本](/modules/levels.md) |
| 源码研究索引 | [源码研究入口](/modding/README.md)、[入口与单例索引](/modding/entry-singletons.md)、[扩展点索引](/modding/extension-points.md) |

## 阅读路径

建议先从核心骨架进入，理解 `RDBase`、`RDClass`、`LevelBase`、`scrConductor`、`scnGame` 和 `scnEditor` 的关系。随后阅读编辑器事件系统，它连接关卡数据、运行时调度、Inspector 面板和事件模型。
