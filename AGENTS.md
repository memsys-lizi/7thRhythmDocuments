# Rhythm Doctor 源码文档工作手册

## 固定约束

- Git 提交信息必须使用中文。
- 默认 Node 项目使用 `pnpm`；如果 `pnpm` 不可用，必须先询问再更换工具。
- 禁止使用 TailwindCss。
- 前端设计禁止出现紫色；默认使用黑白配色。
- 禁止在文档正文和导航中使用 emoji。
- `RDFucked/` 是本地 Unity 工程源码参考目录，不进入 Git 仓库。
- `7thRhythmSource/` 是本地源码参考目录，不进入 Git 仓库。
- 节奏医生 docsify 文档项目位于 `rhythm-doctor/`，文档内容位于 `rhythm-doctor/docs/`。
- ADOFAI docsify 文档项目位于 `adofai/`，文档内容位于 `adofai/docs/`。
- 文档站使用 docsify，文档语言使用中文。

## 项目目标

这个仓库要建设一个大型 Rhythm Doctor 源码文档站，主要面向 RD 源码研究者。文档不负责讲解外部修改工具链，也不围绕某一种外部框架组织内容。维护工作必须优先覆盖 RD 主工程源码本身。

最终文档应尽量覆盖 `RDFucked/Assets/Scripts/Assembly-CSharp` 中的 RD 主工程代码，包括：

- 类、结构体、接口、枚举的用途。
- 字段、属性、方法的作用、来源文件和使用关系。
- 运行时核心系统、关卡系统、关卡编辑器事件系统、数据模型和官方关卡脚本。
- 源码研究者关心的可调用入口、扩展点、风险点、运行时入口和数据字段。

第三方插件目录 `RDFucked/Assets/Plugins/Assembly-CSharp-firstpass` 不逐项深写，只说明依赖用途和 RD 中的接入点。

## ADOFAI 文档目标

ADOFAI 文档站位于 `adofai/`，源码参考目录为 `7thRhythmSource/ADOFAi`。文档目标与 RD 文档一致：面向源码研究者，尽量覆盖主工程代码本身，而不是写外部工具链教程。

ADOFAI 当前源码目录包含 1222 个 `.cs` 文件。后续文档必须优先覆盖：

- 启动、全局访问器和场景控制：`ADOStartup`、`ADOBase`、`ADOClass`、`scrController`、`scrConductor`、`scnGame`、`scnEditor`。
- 关卡数据模型：`LevelData`、`LevelEvent`、`LevelEventInfo`、`PropertyInfo`、`Property`、`LevelEventType`、序列化与校验。
- 编辑器系统：`InspectorPanel`、`PropertiesPanel`、`PropertyControl_*`、`ADOFAI.Editor.Actions`、偏好设置、粒子编辑器和编辑器面板。
- 运行时系统：`scrLevelMaker`、`scrFloor`、`ffxPlusBase`、`ffx*Plus`、`ffx*`、`ADOFAI.FloorFX`、输入、音频、判定、相机和 VFX。
- 平台、存档、服务与 UI：`Persistence`、`GCS`、`GCNS`、平台 helper、Steam、DLC、CLS、关卡选择、菜单和移动端 UI。

ADOFAI 的第三方或通用依赖，例如 `Rewired`、`ByteSheep.Events`、`TMPro.Examples`、`BlendModes`、`MonsterLove.StateMachine`，只说明它们在 ADOFAI 中的接入点和用途，不逐项深写第三方源码。

## ADOFAI 完成判定与自动化停止规则

ADOFAI 文档写完的标准不是阶段页面存在，而是 `7thRhythmSource/ADOFAi` 中主工程代码文件已经被系统性覆盖：

- 几乎所有 ADOFAI 主工程 `.cs` 文件都有对应页面、分组页面或索引说明。
- 重点类、事件效果、编辑器动作、数据模型、枚举、运行时系统、平台服务和 UI 类族已经解释字段、属性、方法、生命周期和协作关系。
- 自动生成或人工维护的覆盖清单中，没有未分类的大块源码文件。
- ADOFAI 阶段 0 到阶段 7 均为 `已完成`，并且阶段 7 已完成全站复核、交叉链接、术语表、调用图和缺失项清单清理。
- `adofai/docs/progress.md`、`adofai/docs/_sidebar.md`、`adofai/docs/api/index.md`、模块页和本文件的进度一致。

如果 ADOFAI 自动化任务启动时发现上述条件已经满足，应停止继续写作，不再新增重复页面或空泛总结；如果自动化系统允许删除或暂停当前任务，必须删除当前 ADOFAI 文档自动化任务，避免用户不在时继续空转。

## ADOFAI 当前进度

| 阶段 | 状态 | 当前记录 |
| --- | --- | --- |
| 阶段 0：文档基础设施与架构侦察 | 已完成 | 已建立 `adofai/` docsify 项目、首页、侧边栏、黑白样式、进度页、架构总览和源码地图。 |
| 阶段 1：核心骨架 | 已完成 | 已完成 `ADOBase`、`ADOClass`、`ADOStartup`、`scrController`、`scrConductor`、`scnGame`、`scnEditor`、`scrLevelMaker`、`scrFloor`，以及核心启动、运行时控制器、音频节拍、自定义关卡运行、路径地板和编辑器主入口模块页。 |
| 阶段 2：关卡数据模型 | 已完成 | 已完成 `LevelData`、`LevelEvent`、`LevelEventInfo`、`PropertyInfo`、`Property`、事件类型与属性枚举、`LevelDataCLS`、读取结果与序列化页面，以及关卡数据模型模块页，覆盖 `.adofai` 文件读取、settings、actions、decorations、事件属性字典、元数据资源解码、字段默认值、编码解码、版本兼容、关卡选择摘要、读取结果和 JSON 写入转换器；下一步进入阶段 3：编辑器系统。 |
| 阶段 3：编辑器系统 | 已完成 | 已完成 `InspectorPanel`、`PropertiesPanel`、`PropertyControl_*` 控件族、`ADOFAI.Editor.Actions`、偏好设置、粒子编辑器、查找注释面板、`scnEditor` 长流程、编辑器小型 UI 类、阶段 3 编辑器系统复核、编辑器事件与属性面板模块页、编辑器动作系统模块页、编辑器辅助面板模块页、编辑器长流程模块页和编辑器小型 UI 组件模块页，覆盖事件 tab、属性面板生成、装饰多选合并、控件预制体选择、分组 tab、事件值写入 UI、基础输入控件、文件控件、复合数值控件、列表控件、高级滤镜动态控件、快捷键动作分组、播放保存、选择删除、复制粘贴、书签、面板动作、偏好设置、粒子编辑器、查找注释面板、关卡打开保存、新建关卡、状态保存、地板与装饰选择、事件增删、撤销重做、播放预览、事件栏按钮、分类 tab、Inspector tab、颜色选择器、列表项、快捷键提示、地板方向按钮、练习时间线、gizmo、渐变控件、基础控件、编辑器键位管理和编辑器工具类。 |
| 阶段 4：运行时游戏系统 | 已完成 | 已完成运行时输入与判定、控制器状态、暂停与练习流程、相机与 VFX 运行链路、结算与成绩保存、场景流转与加载跳转、运行时效果族、官方关卡脚本运行入口 API 页和模块页，覆盖 `RDInput`、`RDInputType`、普通键盘、异步键盘、`AsyncInputManager`、`AsyncInputUtils`、`scrController.UpdateInput`、`scrPlayer.Simulated_PlayerControl_Update`、`scrPlayer.Hit`、`scrPlanet.SwitchChosen`、`scrMisc.GetHitMargin`、输入限制、`scrFloor.LightUp`、`States`、`Start_Rewind`、`OnMusicScheduled`、`Countdown`、`Checkpoint`、`PlayerControl`、`TogglePauseGame`、`PauseMenu`、`SetPracticeMode`、`PracticeTimeline`、`FailAction`、`Fail2Action`、`Won`、`scrCamera`、`scrVfxPlus`、`ffxPlusBase`、相机与滤镜效果、结算保存、`scrLoader`、`PortalTravelAction`、`EnterLevel`、`EnterWorld`、`LoadCustomLevel`、`LoadCustomWorld`、`QuitToMainMenu`、`ResetCustomLevel`、`scnGame.ResetScene`、地板效果、装饰效果、对象效果、文本、声音、帧率、输入事件、粒子效果、`Level`、`LevelML`、`LevelTNO`、`ffxCallMethod` 和 `TaroBGScript`；下一步进入阶段 5：事件与效果执行。 |
| 阶段 5：事件与效果执行 | 已完成 | 已完成事件执行总览、事件到效果调度、轨道与地板事件、相机滤镜与屏幕事件、装饰对象文本声音事件、输入粒子与剩余运行时事件 API 页和模块页，覆盖 `LevelEventType` 分层、`scnGame.ApplyEventsToFloors`、`scnGame.ApplyEvent`、`ffxPlusBase`、`scnGame.PrepVfx`、`scrVfxPlus.Update`、`runOnHit`、`runManually`、条件事件、输入事件、hitbox 触发、轨道地板事件、相机滤镜屏幕事件、装饰对象文本声音、帧率、星球缩放、hitsound、hold sound、粒子设置和粒子发射；下一步进入阶段 6：平台、存档、服务与 UI。 |
| 阶段 6：平台、存档、服务与 UI | 已完成 | 已完成 ADOFAI [全局状态、常量与存档](/api/platform/global-state-persistence.md)、[平台 Helper、DLC、Steam 与服务](/api/platform/platform-dlc-steam-services.md)、[CLS、关卡选择、移动菜单与本地化](/api/platform/cls-level-select-mobile-localization.md)、[UI、服务辅助类与依赖接入](/api/platform/ui-service-dependencies.md) 和 [平台、存档与全局状态模块](/modules/platform-persistence-services.md)，覆盖 `GCS`、`GCNS`、`Persistence`、平台 helper、DLC manager、SteamIntegration、SteamWorkshop、GameServices、Analytics、`scnCLS`、`OptionsPanelsCLS`、CLS 数据模型、`CustomLevelTile`、桌面关卡选择、移动菜单地图、`RDString`、通知、导入面板、设置菜单、平台条件开关和第三方依赖接入点；下一步进入阶段 7：文件级覆盖与复核。 |
| 阶段 7：文件级覆盖与复核 | 进行中 | 已完成 ADOFAI [文件级覆盖清单](/api/review/source-coverage.md) 第一轮、[CameraFilterPack 文件族索引](/api/review/camera-filterpack-coverage.md)、[旧式 ffx 效果组件索引](/api/review/legacy-ffx-coverage.md)、[scr UI、条件与文本辅助组件索引](/api/review/scr-ui-condition-coverage.md)、[scr 动画、相机与 HUD 辅助组件索引](/api/review/scr-animation-hud-camera-coverage.md)、[scr 场景、菜单与服务辅助组件索引](/api/review/scr-scene-menu-service-coverage.md)、[根目录 UI、暂停菜单与场景脚本索引](/api/review/root-ui-scene-coverage.md)、[官方演出、世界显示与统计脚本索引](/api/review/official-presentation-coverage.md)、[工具、枚举与网格渲染脚本索引](/api/review/tools-mesh-light-models-coverage.md) 和 [编辑器动作补充与移动菜单控件索引](/api/review/editor-actions-mobile-menu-coverage.md)：已把 61 个 `CameraFilterPack_*`、48 个剩余 `ffx*`、三批 `scr*` 组件、暂停菜单、玩家选择、Taro 菜单、成就 UI、扫雷小游戏、世界灯光、统计类、Mawaru 演出、Cutscene 系列、剩余枚举、扩展方法、IO/音频工具、地板网格、遮罩、小型行为组件、编辑器缩放动作和移动菜单剩余控件列入索引；下一步继续处理平台输入小类、第三方目录边界和全站最终复核。 |

## 完成判定与自动化停止规则

本项目的“文档写完”不是指阶段页面存在，而是指 `RDFucked/Assets/Scripts/Assembly-CSharp` 中 RD 主工程代码文件已经被系统性覆盖：

- 绝大多数 RD 主工程 `.cs` 文件都有对应页面、分组页面或索引说明。
- 重点类、关卡脚本、事件类、数据模型、枚举、运行时系统和源码研究入口已经解释其字段、属性、方法、生命周期和协作关系。
- 自动生成或人工维护的覆盖清单中，没有未分类的大块源码文件。
- 阶段 0 到阶段 7 均为 `已完成`，并且阶段 7 已完成全站复核、交叉链接、术语表、调用图和缺失项清单清理。
- `rhythm-doctor/docs/progress.md`、`rhythm-doctor/docs/_sidebar.md`、`rhythm-doctor/docs/api/index.md`、模块页和 `AGENTS.md` 的进度一致。

如果自动化任务启动时发现上述条件已经满足，应停止继续写作，不再新增重复页面或空泛总结；只需要报告“文档已完成，自动化无需继续推进”。如果自动化系统允许删除或暂停当前任务，必须删除当前文档自动化任务，避免用户不在时继续空转。

## 阶段 6 规划原则

阶段 6 是“源码研究索引”阶段，不写外部工具链教程，也不围绕具体外部框架展开。索引内容由维护者按源码情况拆分，必须服务两个目标：补齐跨模块索引，并为阶段 7 全站覆盖复核做准备。

- 数据字段索引：`.rdlevel`、`RDLevelData`、`RDLevelSettings`、rows、events、decorations、conditionals、bookmarks、palettes、settings 校验入口。
- 入口与单例索引：Unity 场景、全局单例、`RDBase`、`RDClass`、`scrGameManager`、`scrConductor`、`scnGame`、`scnEditor` 的职责和调用前提。
- 高风险系统索引：判定、输入、音频、窗口、暂停、结算、存档、关卡加载、编辑器保存和事件运行路径。
- 扩展点索引：事件类、Inspector 面板、关卡脚本公开方法、房间方法、数据模型和资源加载接入点。
- 未分类源码索引：用脚本或搜索统计 `Assembly-CSharp` 下尚未被页面覆盖的 RD 主工程 `.cs` 文件，为阶段 7 逐项清理。
- 交叉入口：每个索引页都要回链到正式 API 页面，避免重复解释后产生矛盾。

## 写作准则

正式文档只写已经从源码、调用点、Unity 配置或反编译结果中确认过的内容。遇到暂时没有读透的字段或方法，继续追踪源码；如果当轮没有查清，就先从该页面移出，放到工作清单里，等查清后再写入正式文档。

## 阶段进度

| 阶段 | 状态 | 目标 | 进度记录 |
| --- | --- | --- | --- |
| 阶段 0：文档基础设施 | 已完成 | 完善 docsify 首页、侧边栏、搜索、黑白样式、模块目录 | 已复核 docsify 首页、侧边栏、搜索配置和黑白样式；公开导航已移除维护者入口 |
| 阶段 1：核心骨架 | 已完成 | 深写 `RDBase`、`RDClass`、`LevelBase`、`scrConductor`、`scnGame`、`scnEditor` | 六个核心类页面已完成读者向整理，并与核心骨架模块页、编辑器事件运行路径建立交叉入口 |
| 阶段 2：关卡编辑器事件系统 | 已完成 | 深写 `LevelEvent_Base`、`LevelEvent_*`、`InspectorPanel`、`InspectorPanel_*`、事件属性与控件关系 | 已完成阶段复核：覆盖 `LevelEventType` 0 到 80 的分组页或专页，补齐基础机制、事件运行路径、Inspector 读写链路、事件覆盖清单、时间线与事件控件、Inspector 面板索引和重点事件专页 |
| 阶段 3：运行时游戏系统 | 已完成 | 覆盖节拍、判定、行、房间、窗口、音频、VFX、场景流程 | 已完成运行时系统总览、节拍与判定、输入系统、行与角色系统、房间与 VFX 系统、窗口系统、音频运行时、场景流程与暂停流程，并完成 [阶段 3 与阶段 4 复核](/api/review/stage-3-4-review.md) |
| 阶段 4：数据模型与枚举 | 已完成 | 覆盖 `RDLevelData`、`RDLevelSettings`、自定义关卡、错误、难度、平台等模型 | 已完成 `RDLevelData`、`RDLevelSettings`、`CustomLevelData`、`LevelValidation`、错误、rank、难度、条件、音频、属性反射和小型模型页面，并完成 [阶段 3 与阶段 4 复核](/api/review/stage-3-4-review.md) |
| 阶段 5：官方关卡脚本 | 已完成 | 覆盖 `Level_*` 系列，说明每个关卡脚本的特殊逻辑 | 已建立 [官方关卡脚本总览](/api/levels/overview.md)、[教程与开场关卡](/api/levels/tutorials-opening.md)、[Boss 与高压段落](/api/levels/boss-high-pressure.md)、[运动与节奏变体](/api/levels/athlete-freezeshot.md)、[视觉与窗口特殊关卡](/api/levels/visual-special.md)、[叙事与场景关卡](/api/levels/story-scene-levels.md)、[其余官方与测试脚本](/api/levels/misc-official-levels.md) 和 [官方关卡覆盖清单](/api/levels/coverage.md)：当前源码目录 75 个 `Level_*.cs` 文件已全部归属到专题页或文件级页面 |
| 阶段 6：源码研究索引 | 已完成 | 整理可调用方法、编辑器事件、数据字段、扩展点、高风险系统和未分类源码索引 | 已完成自定义方法事件第一版、[可调用方法索引](/modding/callable-methods.md)、[事件写法索引](/modding/event-patterns.md)、[数据字段索引](/modding/data-fields.md)、[入口与单例索引](/modding/entry-singletons.md)、[扩展点索引](/modding/extension-points.md)、[高风险系统索引](/modding/high-risk-systems.md) 和 [未分类源码覆盖清单](/modding/source-coverage.md)：覆盖清单统计 `Assembly-CSharp` 下 1050 个 `.cs` 文件，当前 1050 个文件名已在文档中命中，0 个文件名未命中 |
| 阶段 7：全站复核 | 已完成 | 补交叉链接、术语表、调用图、缺失项清单 | 已补 [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md)、[UI 与菜单辅助类](/api/runtime/ui-menu-helpers.md)、[视觉与动画辅助类](/api/runtime/visual-animation-helpers.md)、[平台与服务辅助类](/api/runtime/platform-services.md)、[小游戏与测试组件](/api/runtime/mini-games-tests.md)、[依赖与兼容辅助](/api/runtime/dependency-compatibility.md)、[枚举与轻量模型补充](/api/data-models/enums-lightweight-models.md)、[场景主题与房间组件](/api/runtime/scene-theme-components.md)、[渲染后处理与波形组件](/api/runtime/rendering-postprocessing.md)、[音频、导入与 Web 工具](/api/runtime/io-audio-web-tools.md)、[收口辅助类与场景脚本](/api/runtime/final-utility-scenes.md)、[阶段 7 全站复核](/api/review/stage-7-site-review.md) 和 [主干调用图](/api/review/call-graphs.md)；全站链接、侧边栏路由、覆盖统计和文字口径已完成最终复核 |

状态只能使用：`未开始`、`进行中`、`已完成`、`待复核`。

## 每次继续工作的流程

1. 先阅读本文件，确认当前阶段和约束。
2. 根据当前任务检查对应文档目录：RD 使用 `rhythm-doctor/docs/`，ADOFAI 使用 `adofai/docs/`。
3. 根据当前阶段读取对应源码：RD 使用 `7thRhythmSource/RhythmDoctor`，ADOFAI 使用 `7thRhythmSource/ADOFAi`。
4. 写文档时同时维护导航、交叉链接和进度记录。
5. 完成一个阶段或子模块后，更新本文件的阶段进度。
6. 验证 docsify 页面可访问，并检查 `7thRhythmSource/`、`RDFucked/`、`node_modules/` 没有进入 Git 状态。
7. ADOFAI 文档任务每轮都要提交一次 Git，提交信息必须使用中文。

## 类页面写作模板

每个重点类页面应包含以下内容：

- 基本信息：源码路径、命名空间、继承关系、主要职责。
- 用途概览：用自然语言说明这个类在系统里的位置。
- 字段表：名称、类型、可见性、默认值或初始化方式、作用。
- 属性表：名称、类型、读写能力、作用、依赖对象。
- 方法表：签名、参数、返回值、主要行为、调用关系。
- 生命周期：Unity 生命周期方法、初始化顺序、运行时调用路径。
- 相关类型：父类、子类、常用协作类、事件或数据模型。
- 注意事项：反编译命名、跨模块影响、调用前提。

## 模块页面写作模板

每个模块页面应包含以下内容：

- 模块边界：包含哪些源码目录和类族。
- 主要职责：这个模块解决什么问题。
- 核心流程：尽量使用 Mermaid 图或列表说明数据流、调用流。
- 关键类型：列出入口类、数据类、管理器、事件类。
- 源码研究关注点：哪些方法或字段会被调用、扩展或跨模块依赖。
- 缺失清单：尚未解释或需要复核的类。

## 文档生成策略

- 优先使用 Roslyn 解析 C#，生成 API 草稿页和索引，避免漏字段、属性、方法。
- 自动生成内容只作为草稿，核心模块必须人工复核和补充解释。
- API 草稿应记录源码路径、类型签名、成员签名和基础继承关系。
- 生成脚本不得修改 `RDFucked/`。
- 自动生成后必须检查页面链接和 docsify 显示效果。

## 设计规范

- 使用黑白灰为主色。
- 不使用紫色、彩色渐变和 TailwindCss。
- 可以使用简洁图标、截图和 Mermaid 图，但不要使用 emoji。
- 文档页优先可读性：清晰标题、短段落、表格、交叉链接。
- 大页面要拆分，禁止把所有内容塞进一个文件。
