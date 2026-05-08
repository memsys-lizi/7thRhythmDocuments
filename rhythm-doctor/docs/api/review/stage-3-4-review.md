# 阶段 3 与阶段 4 复核清单

本页记录运行时游戏系统和数据模型与枚举的复核结果。复核范围是 docsify 页面入口、模块页入口、API 索引入口和主题覆盖，不修改 `RDFucked/`。

## 阶段 3：运行时游戏系统

| 页面 | 覆盖主题 | 入口状态 |
| --- | --- | --- |
| [运行时系统总览](/api/runtime/overview.md) | `scnGame`、`LevelBase`、`scrConductor`、Beat、输入、房间、VFX、窗口和事件落点 | 已在侧边栏、API 索引和模块页登记 |
| [节拍与判定](/api/runtime/beats-judgement.md) | `Beat`、`BeatClassic`、`BeatOneshot`、`scrPlayerbox`、`HitType`、`OffsetType`、`RDHitStrip`、`HitStripManager` | 已在侧边栏、API 索引和模块页登记 |
| [输入系统](/api/runtime/input-system.md) | `RDInput`、输入后端、键盘、手柄、触摸、自定义按钮、模拟按键和玩家输入交换 | 已在侧边栏、API 索引和模块页登记 |
| [行与角色系统](/api/runtime/rows-characters.md) | `Row`、`RowEntity`、`scrPlayerbox`、`scrBeatbox`、Classic/Oneshot 行控制器、角色与行事件落点 | 已在侧边栏、API 索引和模块页登记 |
| [房间与 VFX 系统](/api/runtime/rooms-vfx.md) | `scrVfxControl`、`RDRoom`、`RDCamera`、`RoomCamera`、背景前景、遮罩、透视、主题和 VFX preset | 已在侧边栏、API 索引和模块页登记 |
| [窗口系统](/api/runtime/windows.md) | `WindowChoreographer`、真实窗口、虚拟窗口、`WindowDancer`、窗口事件和渲染链路 | 已在侧边栏、API 索引和模块页登记 |
| [音频运行时](/api/runtime/audio-runtime.md) | `AudioManager`、`scrConductor`、`RDGameSounds`、`SoundData`、`RDSongOffsets`、mixer group 和音频调度 | 已在侧边栏、API 索引和模块页登记 |
| [场景流程与暂停流程](/api/runtime/scene-flow.md) | `scnGame`、`PauseMenu`、`PauseMenuMode`、`Rankscreen`、加载、开始、暂停、重开、失败和结算 | 已在侧边栏、API 索引和模块页登记 |

阶段 3 的 8 个页面已经覆盖当前运行时系统主干，并且都能从公开导航进入。

## 阶段 4：数据模型与枚举

| 页面 | 覆盖主题 | 入口状态 |
| --- | --- | --- |
| [关卡数据模型](/api/data-models/level-data.md) | `RDLevelData`、`.rdlevel` 根结构、行、装饰、事件、条件、书签、调色板和窗口舞蹈扫描 | 已在侧边栏、API 索引和模块页登记 |
| [关卡设置模型](/api/data-models/level-settings.md) | `RDLevelSettings`、元信息、预览资源、难度、玩家模式、rank、mods 和校验边界 | 已在侧边栏、API 索引和模块页登记 |
| [自定义关卡与错误模型](/api/data-models/custom-levels-errors.md) | `CustomLevelData`、`LevelValidation`、错误枚举、错误展示和自动修复规则 | 已在侧边栏、API 索引和模块页登记 |
| [Rank 与难度枚举](/api/data-models/rank-difficulty.md) | `Rank`、`Difficulty`、`LevelDifficulty`、`LevelPlayMode`、`LevelType`、`LevelSource` | 已在侧边栏、API 索引和模块页登记 |
| [条件系统](/api/data-models/conditionals.md) | `Conditional`、`ConditionalInfo`、`ConditionalID`、`Conditionals`、Inspector、全局条件和运行时检查 | 已在侧边栏、API 索引和模块页登记 |
| [音频与辅助数据模型](/api/data-models/audio-and-auxiliary.md) | `SoundData`、`SoundDataStruct`、`RDGameSounds`、书签、调色板、标签动作和枚举属性 | 已在侧边栏、API 索引和模块页登记 |
| [属性反射与小型模型](/api/data-models/property-reflection-small-models.md) | `BasePropertyInfo`、属性 Attribute、控件 Attribute、Float 表达式、自定义动画数据和指针事件模型 | 已在侧边栏、API 索引和模块页登记 |

阶段 4 的 7 个页面已经覆盖当前数据模型与枚举主干，并且都能从公开导航进入。

## 复核结论

| 阶段 | 页面数 | 结论 |
| --- | --- | --- |
| 阶段 3：运行时游戏系统 | 8 | 已完成导航、API 索引和模块页复核。 |
| 阶段 4：数据模型与枚举 | 7 | 已完成导航、API 索引和模块页复核。 |

阶段 6 已完成源码研究索引，阶段 7 已完成全站复核。本页作为阶段 3 与阶段 4 的复核入口保留。



