# 模块入口

ADOFAI 文档按源码模块组织。模块页面负责解释系统边界、核心流程和关键类型，API 页面负责展开字段、属性和方法。

## 模块规划

| 模块 | 范围 | 重点问题 |
| --- | --- | --- |
| 核心启动与全局状态 | `ADOStartup`、`ADOBase`、`ADOClass`、`GCS`、`GCNS` | 游戏启动时初始化了哪些系统，全局单例从哪里取，哪些状态跨场景保存。 |
| 场景与运行时控制 | `scrController`、`States`、`scnGame`、`Level`、`LevelML`、`LevelTNO` | 游戏状态机、官方关卡与自定义关卡的运行路径。 |
| 音频与节拍 | `scrConductor`、`AudioManager`、校准、hitsound、hold sound | DSP 时间、BPM、偏移、音频输出和节拍调度。 |
| 轨道与地板 | `scrLevelMaker`、`scrFloor`、`FloorRenderer`、轨道形状枚举 | 路径数据怎样生成地板，地板怎样承载事件和判定状态。 |
| 关卡数据模型 | `LevelData`、`LevelEvent`、`EventsArray`、`DecorationsArray`、序列化转换器 | `.adofai` 文件怎样映射到运行时对象。 |
| 编辑器事件与属性面板 | `InspectorPanel`、`PropertiesPanel`、`Property`、`PropertyControl_*` | 事件元数据怎样生成编辑器控件，控件怎样写回 `LevelEvent`。 |
| 编辑器动作系统 | `ADOFAI.Editor.Actions` | 快捷键、菜单动作、撤销重做、复制粘贴和选择流程。 |
| 事件效果运行时 | `ffxPlusBase`、`ffx*Plus`、`ffx*`、`ADOFAI.FloorFX` | `LevelEventType` 怎样映射到运行时效果组件。 |
| UI、菜单与关卡选择 | `scnLevelSelect`、`LevelSelectBase`、`CustomLevelTile`、`MobileMenu` | 关卡选择、CLS、菜单面板和移动端 UI。 |
| 平台、存档与服务 | `Persistence`、`ADOFAI.Common.Platform`、Steam、DLC、Analytics | 存档字段、平台差异、服务初始化和 DLC 状态。 |
| 第三方依赖接入 | `Rewired`、`ByteSheep.Events`、`BlendModes`、`TMPro.Examples` | 只说明 ADOFAI 使用入口，不逐项深写第三方源码。 |
