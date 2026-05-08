# Mod 作者入口

本区域面向希望研究或修改 RD 行为的 Mod 作者。

## 目标

- 整理可调用方法和常用入口。
- 标出事件系统、关卡数据、运行时管理器的关键字段。
- 说明哪些成员适合读取、哪些成员修改风险较高。
- 记录反编译命名和源码导出结构对 Mod 使用造成的影响。

## 首批关注点

| 方向 | 相关类型 |
| --- | --- |
| 全局入口 | `RDBase`、`RDClass`、`scrGameManager`、`scrConductor` |
| 关卡运行 | `LevelBase`、`LevelEvent_Base`、`Beat` |
| 编辑器事件 | `LevelEvent_*`、`InspectorPanel_*`、`ControlAttribute` |
| 自定义关卡 | `CustomLevelData`、`RDLevelData`、`RDLevelSettings` |

## 风险提示

| 风险 | 说明 |
| --- | --- |
| 反编译命名不完整 | 一些名称来自当前源码导出结果，使用前应结合调用点和实际运行场景阅读 |
| 单例依赖多 | 很多类通过 `RDBase` 或 `RDClass` 访问全局单例，调用时要注意场景状态 |
| 编辑器和运行时混用 | `scnEditor`、`scnGame` 的可用性依赖当前场景 |
| 第三方插件 | 插件代码不作为主要修改目标，优先从 RD 主工程接入点理解 |
