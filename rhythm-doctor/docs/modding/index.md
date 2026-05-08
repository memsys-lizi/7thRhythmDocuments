# 源码研究入口

本区域是源码研究的交叉入口，用来把可调用方法、事件写法和数据字段回链到正式 API 页面。它不讲解外部修改工具链，也不围绕具体外部框架组织内容。

## 目标

- 整理可调用方法和常用入口。
- 标出事件系统、关卡数据、运行时管理器的关键字段。
- 说明哪些成员适合读取、哪些成员修改风险较高。
- 记录反编译命名和源码导出结构对阅读代码造成的影响。

## 首批关注点

| 方向 | 相关类型 |
| --- | --- |
| 全局入口 | `RDBase`、`RDClass`、`scrGameManager`、`scrConductor` |
| 关卡运行 | `LevelBase`、`LevelEvent_Base`、`Beat` |
| 编辑器事件 | `LevelEvent_*`、`InspectorPanel_*`、`ControlAttribute` |
| 自定义方法 | `LevelEvent_CallCustomMethod`、`MethodAutocompleteUI`、`ListedMethodAttribute`、`LevelBase`、`RDRoom` |
| 自定义关卡 | `CustomLevelData`、`RDLevelData`、`RDLevelSettings` |
| 入口与单例 | `RDBase`、`RDClass`、`scrGameManager`、`scnGame`、`scnEditor`、`PauseMenu` |
| 高风险系统 | 输入、判定、音频、窗口、关卡加载、编辑器保存、事件运行路径 |

## 已关联页面

| 页面 | 内容 |
| --- | --- |
| [编辑器事件系统](/modules/editor-events.md) | 编辑器事件模块入口 |
| [自定义方法事件](/api/editor-events/custom-methods.md) | `CallCustomMethod` 表达式、参数解析、自动补全范围、`ListedMethod` 标记和已标注方法清单 |
| [可调用方法索引](/modding/callable-methods.md) | 从源码研究角度整理 `CallCustomMethod` 可触达的 `LevelBase`、`RDRoom`、官方关卡公开方法和调用前提 |
| [事件写法索引](/modding/event-patterns.md) | 从源码研究角度整理歌曲、行、视觉、房间、文本、窗口和收尾控制的常见事件组合 |
| [数据字段索引](/modding/data-fields.md) | 整理 `.rdlevel` 根节点、settings、events、conditionals、bookmarks、colorPalette 和校验入口 |
| [入口与单例索引](/modding/entry-singletons.md) | 整理 `RDBase`、`RDClass`、`RDEditorBase`、`scrGameManager`、`scrConductor`、`scnGame` 和 `scnEditor` 的入口关系 |
| [扩展点索引](/modding/extension-points.md) | 串联事件类、Inspector 面板、属性反射、条件系统、官方关卡脚本、房间、VFX 和资源加载入口 |
| [高风险系统索引](/modding/high-risk-systems.md) | 串联输入、判定、音频、窗口、暂停结算、事件运行、编辑器保存和存档校验等跨模块系统 |
| [未分类源码覆盖清单](/modding/source-coverage.md) | 统计 `Assembly-CSharp` 下 1050 个 `.cs` 文件的文档命中情况，并建立阶段 7 补文档队列 |

## 风险提示

| 风险 | 说明 |
| --- | --- |
| 反编译命名不完整 | 一些名称来自当前源码导出结果，使用前应结合调用点和实际运行场景阅读 |
| 单例依赖多 | 很多类通过 `RDBase` 或 `RDClass` 访问全局单例，调用时要注意场景状态 |
| 编辑器和运行时混用 | `scnEditor`、`scnGame` 的可用性依赖当前场景 |
| 第三方插件 | 插件代码不作为主要修改目标，优先从 RD 主工程接入点理解 |



