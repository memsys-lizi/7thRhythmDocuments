# ADOClass

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 源码路径 | `7thRhythmSource/ADOFAi/ADOClass.cs` |
| 类型 | `public class ADOClass : RDClassDll` |
| 命名空间 | 全局命名空间 |
| 主要职责 | 为非 MonoBehaviour 风格的 ADOFAI 类提供一组实例访问器。 |

`ADOClass` 和 [ADOBase](/api/core/ADOBase.md) 的访问对象高度相似，但 `ADOClass` 继承 `RDClassDll`，并且大多数访问器是实例属性。源码中 `Level` 继承 `ADOClass`，因此官方关卡脚本可以通过实例属性访问控制器、编辑器、自定义关卡、关卡选择和装饰管理器。

## 静态字段

| 字段 | 类型 | 初始值 | 作用 |
| --- | --- | --- | --- |
| `levelScenes` | `Scene[]` | 未在本文件初始化 | 保存关卡场景数组。 |
| `ClearWhite` | `Color` | `new Color(1f, 1f, 1f, 0f)` | 透明白色常量。 |

## 实例访问器

| 属性 | 类型 | 指向 |
| --- | --- | --- |
| `audioManager` | `AudioManager` | `AudioManager.Instance` |
| `conductor` | `scrConductor` | `scrConductor.instance` |
| `controller` | `scrController` | `scrController.instance` |
| `lm` | `scrLevelMaker` | `scrLevelMaker.instance` |
| `uiController` | `scrUIController` | `scrUIController.instance` |
| `cls` | `scnCLS` | `scnCLS.instance` |
| `editor` | `scnEditor` | `scnEditor.instance` |
| `customLevel` | `scnGame` | `scnGame.instance` |
| `levelPath` | `string` | `scnGame.instance.levelPath` |
| `gc` | `RDConstants` | `RDConstants.data` |
| `worldData` | `Dictionary<string, GCNS.WorldData>` | `GCNS.worldData` |
| `levelSelect` | `scnLevelSelect` | `scnLevelSelect.instance` |
| `decorationManager` | `scrDecorationManager` | `scrDecorationManager.instance` |

## 状态访问器

| 属性 | 类型 | 行为 |
| --- | --- | --- |
| `isLevelEditor` | `bool` | `editor != null`。 |
| `isEditingLevel` | `bool` | 与 `isLevelEditor` 相同。 |
| `isUnityEditor` | `bool` | `Application.isEditor`。 |
| `isCLS` | `bool` | `cls != null`。 |
| `currentLevel` | `string` | 静态属性，读取 `scrController.instance.levelName`。 |

## 与 ADOBase 的差异

| 项目 | `ADOBase` | `ADOClass` |
| --- | --- | --- |
| 父类 | `RDBaseDll` | `RDClassDll` |
| 访问器形态 | 多数为静态属性 | 多数为实例属性 |
| 场景判断 | 包含编辑器、自定义关卡、CLS、DLC、精选关卡、平台和设备判断 | 只保留少量编辑器、Unity Editor 和 CLS 判断 |
| 跳转与工具方法 | 包含进入选关、校准、重载场景、本地化关卡名和节日判断 | 本文件不定义方法 |
| 额外访问器 | 无 `decorationManager` 实例属性 | 提供 `decorationManager` |

`ADOClass` 的定位更窄。它不负责启动、场景跳转或平台判定，只给继承它的普通类提供常用对象入口。

## 相关类型

| 类型 | 关系 |
| --- | --- |
| `Level` | 源码中 `Level : ADOClass`，用于官方关卡脚本基类。 |
| `ADOBase` | 提供更完整的静态全局访问和工具方法。 |
| `RDClassDll` | `ADOClass` 的直接父类。 |
