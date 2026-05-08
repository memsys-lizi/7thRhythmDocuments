# 运行时游戏系统

## 模块边界

本模块覆盖关卡运行期间的核心系统：

- 节拍和判定。
- 行、房间、窗口和角色显示。
- 音频加载与播放。
- VFX、相机、屏幕效果。
- 场景切换和暂停流程。

## 主要类型线索

| 类型或类型族 | 说明 |
| --- | --- |
| `Beat`、`BeatClassic`、`BeatOneshot` | 节拍实体和具体节拍类型 |
| `scrConductor` | 音乐时间和播放控制核心 |
| `RDHitStrip`、`HitStripManager` | 命中条显示与管理 |
| `RDCamera` | 相机行为 |
| `RDEnvironment` | 场景环境基类 |

## 已写页面

| 页面 | 内容 |
| --- | --- |
| [运行时系统总览](/api/runtime/overview.md) | 运行时主干对象、节拍与判定入口、输入聚合、房间与 VFX、窗口系统和事件落点。 |
| [节拍与判定](/api/runtime/beats-judgement.md) | `Beat`、`BeatClassic`、`BeatOneshot`、按下判定、hold 释放、漏拍、命中条和结果枚举。 |
| [输入系统](/api/runtime/input-system.md) | `RDInput`、输入后端、键盘、手柄、触摸、自定义按钮、模拟按键和玩家输入交换。 |
| [行与角色系统](/api/runtime/rows-characters.md) | `Row`、`RowEntity`、`scrPlayerbox`、`scrBeatbox`、Classic/Oneshot 行控制器、显隐、排序、角色和行事件落点。 |
| [房间与 VFX 系统](/api/runtime/rooms-vfx.md) | `scrVfxControl`、`RDRoom`、相机、房间 quad、背景前景、遮罩透视、主题和 VFX preset。 |
| [窗口系统](/api/runtime/windows.md) | `WindowChoreographer`、`RealWindowChoreographer`、`VirtualWindowChoreographer`、`WindowDancer`、窗口实现和渲染链路。 |
| [音频运行时](/api/runtime/audio-runtime.md) | `AudioManager`、`scrConductor`、`RDGameSounds`、`SoundData`、`RDSongOffsets`、混音组、外部音频和环境音。 |
| [场景流程与暂停流程](/api/runtime/scene-flow.md) | `scnGame`、`PauseMenu`、`PauseMenuMode`、`Rankscreen`、加载、开始、暂停、跳过、重开、失败和结算。 |
| [UI 与菜单辅助类](/api/runtime/ui-menu-helpers.md) | 菜单、对话框、按钮提示、本地化文本、错误面板、Canvas、颜色控件和存档槽 UI 辅助。 |
| [视觉与动画辅助类](/api/runtime/visual-animation-helpers.md) | BPM 动画、自定义动画、背景、后处理、粒子、Detonator、Stutter、万花筒、眼睛阵列和运动小物件。 |
| [平台与服务辅助类](/api/runtime/platform-services.md) | Steam、Workshop、Discord 富状态、Web 服务、entitlement、平台窗口抽象、文件读写和自定义关卡选择器服务入口。 |
| [小游戏与测试组件](/api/runtime/mini-games-tests.md) | Rhythm Weightlifter 独立模式、Bullet 校准测试、行进入测试、波形测试、旁白测试和调试开关。 |
| [依赖与兼容辅助](/api/runtime/dependency-compatibility.md) | SmfLite MIDI、Unity UI 补充、Rewired 常量与本地化、Kino 后处理、DOTween 扩展、程序树和编译兼容占位。 |
| [场景主题与房间组件](/api/runtime/scene-theme-components.md) | 主题环境、Rooftop、转场格子、旋转 voxel、时钟灯光、启动场景和警告场景。 |
| [渲染后处理与波形组件](/api/runtime/rendering-postprocessing.md) | Camera 后处理、像素化、平铺、2D 透视、多边形波形、频谱、音量、credits 和角色选择视觉。 |
| [音频、导入与 Web 工具](/api/runtime/io-audio-web-tools.md) | Ogg 编码、音频采样、BPM 检测、暂停试听、关卡包安装、CSV/Zip、Web 场景、截图、输入辅助。 |
| [收口辅助类与场景脚本](/api/runtime/final-utility-scenes.md) | 角色模板导出、展示关卡选择、SleevePaint、旁白访问、旧校准、Care Less 窗口和小型视觉组件。 |

## 阅读重点

- 游戏时间如何从音频推进到事件执行。
- 音频文件如何从事件字段进入 `AudioManager`，再由 `scrConductor` 定时播放。
- 判定窗口和命中结果如何计算。
- 行、角色、房间如何被事件驱动。
- VFX 与后处理如何触发。
- 暂停、失败、胜利和结算如何改变 `GameState`、音频、窗口舞蹈和场景。

## 复核状态

阶段 3 已完成导航、API 索引和模块页复核，记录见 [阶段 3 与阶段 4 复核](/api/review/stage-3-4-review.md)。
