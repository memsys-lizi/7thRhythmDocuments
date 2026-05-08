# 文件级覆盖清单

## 基本信息

本页是阶段 7 的文件级覆盖入口。统计范围为 `7thRhythmSource/ADOFAi/**/*.cs`，当前源码目录共有 1222 个 `.cs` 文件。

阶段 7 的目标不是把 1222 个文件名简单堆在一页，而是先把文件族、目录和已覆盖专题对应起来，再逐轮补齐没有被专题吸收的类族。对于第三方目录，文档记录 ADOFAI 的接入点和目录边界，不逐项展开第三方内部实现。

## 当前统计

| 项目 | 数量 | 说明 |
| --- | --- | --- |
| 源码 `.cs` 文件总数 | 1222 | PowerShell 递归统计 `7thRhythmSource/ADOFAi`。 |
| 文档 `.md` 文件总数 | 85 | PowerShell 递归统计 `adofai/docs`。 |
| 文档总字符数 | 520021 | 统计 `adofai/docs/**/*.md` 原始文本字符数。 |
| 去空白字符数 | 459059 | 移除空白字符后的文档字符数。 |
| 中英文词元估算 | 128262 | 按单个 CJK 字符或连续英文/数字/下划线片段估算，用于观察体量，不等同于自然语言分词。 |
| 文件名或类型名已在文档中命中 | 993 | 用文档正文匹配 `.cs` 文件名或去扩展名后的类型名。 |
| 文件名或类型名尚未在文档中命中 | 229 | 主要来自第三方目录、示例脚本、兼容命名空间和少量根目录小组件。 |

这个命中统计只用于找漏项。一个文件名未命中不等于完全没有解释：例如部分 `CameraFilterPack_*` 文件已被相机滤镜流程页从系统层面说明，但还没有按文件族做覆盖索引。

## 顶层目录分布

| 顶层目录 | 文件数 | 覆盖策略 |
| --- | --- | --- |
| `(root)` | 764 | ADOFAI 主工程根目录，包含核心场景、旧式脚本、运行时效果、官方关卡演出、UI 和滤镜脚本；阶段 7 优先清理。 |
| `ADOFAI.Editor.Actions` | 86 | 已由 [ADOFAI.Editor.Actions](/api/editor/editor-actions.md) 和 [编辑器动作系统](/modules/editor-actions.md) 覆盖主干，剩余少量动作类需要文件名索引。 |
| `MobileMenu` | 47 | 已由 [CLS、关卡选择、移动菜单与本地化](/api/platform/cls-level-select-mobile-localization.md) 覆盖主流程，阶段 7 继续补移动菜单控件清单。 |
| `ByteSheep.Events` | 37 | 第三方事件封装目录，只记录 `ffxCallFunction`、`ffxCallFunctionPlus` 的接入点。 |
| `ADOFAI` | 34 | 关卡数据、Inspector、Property、UI 小组件等，核心页面已覆盖，阶段 7 复核剩余轻量类。 |
| `TMPro.Examples` | 29 | TextMeshPro 示例脚本目录，不按 ADOFAI 主工程深写。 |
| `Rewired.UI.ControlMapper` | 28 | Rewired 控制映射 UI，按第三方依赖接入归类。 |
| `ADOFAI.LevelEditor.Controls` | 24 | 已由 [PropertyControl 控件族](/api/editor/property-controls.md) 覆盖主干。 |
| `Rewired.Demos` | 21 | Rewired 示例脚本目录，不按 ADOFAI 主工程深写。 |
| `BlendModes` | 18 | 混合模式渲染扩展目录，只记录 `scrDecorationManager.visualDecoShader` 接入点。 |
| `Rewired.Glyphs` | 14 | Rewired glyph 支持目录，按第三方依赖归类。 |
| `Rewired` | 13 | Rewired 主目录，ADOFAI 接入点为 `ADOStartup`、`RDInput` 和 `RDInputType_Joystick`。 |
| `Rewired.Demos.CustomPlatform` | 12 | Rewired 示例平台目录，不按 ADOFAI 主工程深写。 |
| `Rewired.Glyphs.UnityUI` | 9 | Rewired Unity UI glyph 支持，按第三方依赖归类。 |
| `ADOFAI.Editor.Components.Gradients` | 5 | 已由编辑器小型 UI 和渐变控件说明覆盖主流程。 |
| `nn.hid` | 5 | Switch 输入相关命名空间，阶段 7 归入平台与输入补充清单。 |
| `Rewired.Integration.UnityUI` | 5 | Rewired Unity UI 集成目录，按第三方依赖归类。 |
| `ADOFAI.Editor.Preferences` | 5 | 已由 [偏好设置、粒子编辑器与辅助面板](/api/editor/preferences-particle-panels.md) 覆盖主流程。 |
| `MonsterLove.StateMachine` | 4 | 状态机库，ADOFAI 接入点为 `scrController : StateBehaviour`。 |
| `ADOFAI.Common.Platform` | 4 | 已由 [平台 Helper、DLC、Steam 与服务](/api/platform/platform-dlc-steam-services.md) 覆盖。 |
| 其他小目录 | 59 | 包含平台 helper 子目录、序列化、编辑器模型、DOTween 扩展、WebGL、Unity UI、P/Invoke 安全类型和 AssemblyInfo。 |

## 根目录未命中文件族

根目录共有 764 个 `.cs` 文件。按文件名前缀统计，当前尚未直接命中文档的根目录文件族如下：

| 文件族 | 未命中文件数 | 后续处理 |
| --- | --- | --- |
| 其他根目录类 | 231 | 包含 UI、文本、菜单、官方关卡演出、小游戏、平台条件组件、调试组件和小型数据类；需要按主题分批补页。 |
| `scr*` | 137 | 旧式场景脚本、UI 脚本、显示脚本和条件开关；优先按 UI、场景、平台、演出、调试分组。 |
| `*Button*` | 9 | 小型按钮组件；归入 UI 控件补充页。 |
| `scn*` | 5 | 场景脚本补项；归入场景辅助脚本页。 |
| `*Menu*` | 4 | 菜单补项；归入 UI 与菜单补充页。 |
| `Level*` | 3 | `LevelImporterInfoSection`、`LevelRadar`、`LevelSelectCutsceneController`；归入 CLS、关卡选择和官方演出补充。 |
| `*LineRenderer*` | 1 | 线渲染辅助组件；归入渲染与 UI 辅助补充。 |

## 优先补齐批次

| 批次 | 文件族 | 目标页面 |
| --- | --- | --- |
| 7.1 | `CameraFilterPack_*`、滤镜 shader 驱动组件、`scrVfxPlus` 中滤镜字典使用点 | 已完成：[CameraFilterPack 文件族索引](/api/review/camera-filterpack-coverage.md)。 |
| 7.2 | 剩余 `ffx*`、旧式官方关卡效果、sprite tween、相机 tween、菜单效果 | 已完成：[旧式 ffx 效果组件索引](/api/review/legacy-ffx-coverage.md)。 |
| 7.3 | 剩余 `scr*` 条件开关、按钮、菜单、文本、调试 HUD 和小型 UI | 进行中：第一批见 [scr UI、条件与文本辅助组件索引](/api/review/scr-ui-condition-coverage.md)，第二批见 [scr 动画、相机与 HUD 辅助组件索引](/api/review/scr-animation-hud-camera-coverage.md)，第三批见 [scr 场景、菜单与服务辅助组件索引](/api/review/scr-scene-menu-service-coverage.md)。 |
| 7.4 | 根目录 UI、按钮、暂停菜单、场景脚本、`MobileMenu` 目录剩余控件、`nn.hid`、Switch/移动端输入小类 | 进行中：根目录 UI 与场景脚本见 [根目录 UI、暂停菜单与场景脚本索引](/api/review/root-ui-scene-coverage.md)，移动菜单剩余控件见 [编辑器动作补充与移动菜单控件索引](/api/review/editor-actions-mobile-menu-coverage.md)。 |
| 7.5 | `ADOFAI.Editor.Actions` 剩余动作类、编辑器模型和接口 | 已完成：[编辑器动作补充与移动菜单控件索引](/api/review/editor-actions-mobile-menu-coverage.md)。 |
| 7.6 | 官方关卡大型脚本、Taro cutscene、世界显示和小游戏脚本剩余类 | 进行中：官方演出和世界显示见 [官方演出、世界显示与统计脚本索引](/api/review/official-presentation-coverage.md)。 |
| 7.7 | 枚举、轻量模型、扩展方法、IO/音频工具、渲染网格类和小型行为组件 | 已完成：[工具、枚举与网格渲染脚本索引](/api/review/tools-mesh-light-models-coverage.md)。 |
| 7.8 | 平台输入小类、第三方目录归档表和全站链接复核 | 已完成：平台输入和第三方边界见 [平台输入、第三方边界与剩余工具索引](/api/review/platform-input-third-party-boundary.md)，全站复核见 [阶段 7 全站复核](/api/review/stage-7-final-review.md)。 |

## 已覆盖专题入口

| 覆盖范围 | 页面 |
| --- | --- |
| 启动、全局访问、场景控制和核心运行时 | [API 入口](/api/index.md)、[核心启动与全局访问](/modules/core-startup.md)、[运行时控制器状态机](/modules/runtime-controller.md) |
| 关卡数据模型和序列化 | [关卡数据模型](/modules/level-data-model.md)、[读取结果与序列化](/api/data-models/serialization-validation.md) |
| 编辑器系统、属性面板、动作和控件 | [编辑器事件与属性面板](/modules/editor-property-panels.md)、[编辑器动作系统](/modules/editor-actions.md)、[编辑器小型 UI 组件](/modules/editor-ui-widgets.md) |
| 运行时输入、判定、暂停、相机、VFX、结算和加载 | [运行时输入与判定链路](/modules/runtime-input-judgement.md)、[控制器、暂停与练习流程](/modules/runtime-controller-pause.md)、[相机与 VFX 运行时](/modules/runtime-camera-vfx.md)、[场景流转与加载模块](/modules/runtime-scene-loading.md) |
| 事件到效果执行 | [事件到效果调度模块](/modules/event-effect-dispatch.md)、[运行时效果族模块](/modules/runtime-effect-families.md) |
| 平台、存档、服务、UI 和依赖接入 | [平台、存档与全局状态模块](/modules/platform-persistence-services.md)、[UI、服务辅助类与依赖接入](/api/platform/ui-service-dependencies.md) |

## 阶段 7 当前状态

阶段 7 已完成。当前已完成文件级统计、`CameraFilterPack_*`、旧式 `ffx*`、三批 `scr*`、根目录 UI/场景、官方演出、世界显示、枚举、扩展工具、IO/音频工具、地板网格、遮罩、小型行为组件、编辑器缩放动作、移动菜单剩余控件、平台输入小类、根目录剩余工具、第三方目录边界和全站最终复核。
