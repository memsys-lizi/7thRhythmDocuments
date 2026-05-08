# ADOFAI 文档进度

## 当前结论

ADOFAI 源码目录当前包含 1222 个 `.cs` 文件。主工程代码大量位于源码根目录，同时存在 `ADOFAI`、`ADOFAI.Editor.Actions`、`ADOFAI.LevelEditor.Controls`、`ADOFAI.FloorFX`、`ADOFAI.Serialization`、`ADOFAI.Common.Platform` 等命名空间目录。第三方或通用依赖包括 `Rewired`、`ByteSheep.Events`、`TMPro.Examples`、`BlendModes`、`MonsterLove.StateMachine` 等。

和 RD 的事件系统不同，ADOFAI 的关卡事件以 `LevelEvent` 数据对象为中心，事件类型由 `LevelEventType` 枚举表示，属性元数据来自 `LevelEventInfo`、`PropertyInfo` 和启动时读取的 `LevelEditorProperties` 资源。运行时效果大量落在 `ffx*Plus`、`ffx*` 和 `ADOFAI.FloorFX` 类族中；编辑器撤销、复制、粘贴、选择和快捷键操作集中在 `ADOFAI.Editor.Actions`。

## 阶段进度

| 阶段 | 状态 | 目标 | 当前记录 |
| --- | --- | --- | --- |
| 阶段 0：文档基础设施与架构侦察 | 已完成 | 建立 docsify 项目、侧边栏、黑白样式、首页、进度页、架构总览和源码地图 | 已确认源码规模和主要类族，已建立文档项目骨架、架构总览、源码地图和初始导航 |
| 阶段 1：核心骨架 | 进行中 | 深写 `ADOBase`、`ADOClass`、`ADOStartup`、`scrController`、`scrConductor`、`scnGame`、`scnEditor`、`scrLevelMaker`、`scrFloor` | 已完成 [ADOBase](/api/core/ADOBase.md)、[ADOClass](/api/core/ADOClass.md)、[ADOStartup](/api/core/ADOStartup.md) 和 [核心启动与全局访问](/modules/core-startup.md) |
| 阶段 2：关卡数据模型 | 未开始 | 深写 `LevelData`、`LevelEvent`、`LevelEventInfo`、`PropertyInfo`、`Property`、`LevelEventType`、`LevelEventCategory`、`LevelEventExecutionTime`、序列化与校验 | 待写 |
| 阶段 3：编辑器系统 | 未开始 | 覆盖 `scnEditor`、`InspectorPanel`、`PropertiesPanel`、`PropertyControl_*`、`ADOFAI.Editor.Actions`、偏好设置、粒子编辑器和编辑器面板 | 待写 |
| 阶段 4：运行时游戏系统 | 未开始 | 覆盖控制器状态机、输入、判定、轨道生成、地板、相机、音频、VFX、暂停、结算和场景流程 | 待写 |
| 阶段 5：事件与效果执行 | 未开始 | 按 `LevelEventType`、`ffxPlusBase`、`ffx*Plus`、`ffx*`、`ADOFAI.FloorFX` 建立事件到运行时效果的对照文档 | 待写 |
| 阶段 6：平台、存档、服务与 UI | 未开始 | 覆盖 `Persistence`、`GCS`、`GCNS`、平台 helper、Steam、DLC、CLS、关卡选择、菜单、移动端 UI 和本地化 | 待写 |
| 阶段 7：文件级覆盖与复核 | 未开始 | 建立 1222 个 `.cs` 文件覆盖清单，补齐未分类文件，复核链接、术语表、调用图和全站一致性 | 待写 |

状态只能使用：`未开始`、`进行中`、`已完成`、`待复核`。

## 自动化继续规则

自动任务每次开始都要先读根目录 `AGENTS.md` 和本页，确认阶段、约束和最新进度；再读取 `7thRhythmSource/ADOFAi` 中当前阶段对应源码，只把源码确认的内容写入中文 docsify 文档。

每轮完成一个子模块后，需要同步维护：

| 文件 | 维护内容 |
| --- | --- |
| `adofai/docs/_sidebar.md` | 新页面导航 |
| `adofai/docs/api/index.md` | API 页面索引 |
| `adofai/docs/modules/index.md` | 模块页面索引 |
| `adofai/docs/progress.md` | 阶段状态和覆盖统计 |
| `AGENTS.md` | 长期规则和阶段概况 |

每轮必须运行 Markdown 表格检查、禁用词检查、docsify 路由检查和 `git status`。每轮都要提交一次 Git，提交信息必须是中文。

## 完成判定

ADOFAI 文档写完的标准是：`7thRhythmSource/ADOFAi` 下几乎所有主工程 `.cs` 文件都已被页面、专题或覆盖索引系统性覆盖；核心类、数据模型、事件效果、编辑器系统、运行时系统、平台服务和 UI 类族均有解释；阶段 0 到阶段 7 均为 `已完成`，且阶段 7 的文件级覆盖清单没有未分类的大块源码文件。

如果自动化任务启动时发现上述条件已经满足，应停止继续写作；如果自动化系统允许删除当前任务，必须删除 ADOFAI 文档自动化任务，避免空转。
