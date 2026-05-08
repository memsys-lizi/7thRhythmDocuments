# 源码地图

本页记录 `7thRhythmSource/ADOFAi` 的初始源码分组，作为后续覆盖清单的基础。

## 文件规模

| 项目 | 数量 |
| --- | ---: |
| `.cs` 文件总数 | 1222 |
| 根目录 `.cs` 文件 | 764 |
| `ADOFAI.Editor.Actions` | 86 |
| `MobileMenu` | 47 |
| `ByteSheep.Events` | 37 |
| `ADOFAI` | 34 |
| `TMPro.Examples` | 29 |
| `Rewired.UI.ControlMapper` | 28 |
| `ADOFAI.LevelEditor.Controls` | 24 |
| `Rewired.Demos` | 21 |
| `BlendModes` | 18 |

## 主工程优先级

| 优先级 | 文件族 | 原因 |
| --- | --- | --- |
| 最高 | `ADOBase`、`ADOClass`、`ADOStartup`、`scrController`、`scrConductor`、`scnGame`、`scnEditor` | 启动、场景、音频和编辑器的主入口。 |
| 最高 | `ADOFAI/LevelData.cs`、`LevelEvent.cs`、`LevelEventInfo.cs`、`PropertyInfo.cs`、`LevelEventType.cs` | 关卡数据和事件属性系统的核心。 |
| 最高 | `scrLevelMaker.cs`、`scrFloor.cs`、`ffxPlusBase.cs`、`ffx*Plus.cs`、`ADOFAI.FloorFX/*.cs` | 轨道生成、地板运行时和事件效果执行。 |
| 高 | `ADOFAI.Editor.Actions/*.cs`、`ADOFAI.LevelEditor.Controls/*.cs`、`InspectorPanel.cs`、`PropertiesPanel.cs` | 编辑器交互、撤销重做和属性控件。 |
| 高 | `GCS.cs`、`GCNS.cs`、`Persistence.cs`、`RDInput*.cs`、`AudioManager.cs` | 全局状态、存档、输入与音频。 |
| 中 | 关卡选择、CLS、DLC、平台 helper、菜单 UI、移动端 UI | 影响用户流程和平台差异。 |
| 低 | `Rewired.*`、`TMPro.Examples`、`ByteSheep.Events`、`BlendModes`、CameraFilterPack 类族 | 多为第三方或通用库，文档只说明接入点与用途。 |

## 已确认的目录角色

| 路径或命名空间 | 角色 |
| --- | --- |
| `7thRhythmSource/ADOFAi` 根目录 | 大量 MonoBehaviour、枚举、运行时效果、控制器、平台服务和 UI 脚本。 |
| `ADOFAI` | 关卡数据模型、事件元数据、编辑器属性面板和若干 UI 组件。 |
| `ADOFAI.Editor.Actions` | 编辑器命令系统，覆盖选择、编辑、文件、播放、复制粘贴和快捷操作。 |
| `ADOFAI.LevelEditor.Controls` | 编辑器属性控件基类和具体控件。 |
| `ADOFAI.FloorFX` | 少量新式地板效果事件实现，目前确认有粒子设置与粒子发射。 |
| `ADOFAI.Serialization` | `LevelArrayConverter` 等关卡 JSON 序列化辅助。 |
| `ADOFAI.Common.Platform` | 平台 helper 抽象与默认实现。 |
| `ADOFAI.Common.Platform.Windows`、`Mac`、`Linux` | 平台特化 helper。 |
| `MobileMenu` | 移动端菜单与交互 UI。 |
| `BlendModes` | 混合模式渲染扩展，主要服务装饰渲染。 |
| `ByteSheep.Events` | 高级 UnityEvent 风格事件库。 |
| `Rewired` | 输入系统依赖。 |

## 后续覆盖方法

阶段 7 会用脚本读取全部 `.cs` 文件，再检查文件名是否在 `adofai/docs/**/*.md` 中出现。覆盖不等于完整解释，但可以发现遗漏文件族。对根目录中的 `CameraFilterPack_*`、第三方示例和插件类，后续会统一归入依赖或视觉滤镜说明页，不逐个深写所有字段方法。
