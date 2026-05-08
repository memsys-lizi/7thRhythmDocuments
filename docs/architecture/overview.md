# 工程概览

## 基本信息

| 项目 | 内容 |
| --- | --- |
| Unity 工程目录 | `RDFucked/` |
| Unity 版本 | `6000.3.3f1` |
| 主工程代码目录 | `RDFucked/Assets/Scripts/Assembly-CSharp` |
| 编辑器事件代码目录 | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor` |
| 第三方插件目录 | `RDFucked/Assets/Plugins/Assembly-CSharp-firstpass` |
| 场景目录 | `RDFucked/Assets/Fizzd/Scenes` |

## 已知规模

| 范围 | 数量 |
| --- | --- |
| C# 脚本总数 | 约 2487 |
| 主工程根目录脚本 | 约 645 |
| `RDLevelEditor` 脚本 | 约 360 |
| `LevelEvent_*` 脚本 | 约 80 |

## 目录结构

```text
RDFucked/
  Assets/
    Scripts/
      Assembly-CSharp/
        RDLevelEditor/
    Plugins/
      Assembly-CSharp-firstpass/
    Fizzd/
      Scenes/
  Packages/
  ProjectSettings/
```

## 文档边界

`Assets/Scripts/Assembly-CSharp` 是主文档目标。第三方插件只记录依赖作用，不逐项解释字段和方法。

## 当前判断

| 判断 | 说明 |
| --- | --- |
| `RDBase` 和 `RDClass` 是大量运行时类的便捷基类 | 两者暴露 `conductor`、`game`、`gm`、`editor`、`gc` 等常用入口 |
| `RDLevelEditor` 是关卡编辑器和事件系统核心命名空间 | 目录中包含 `LevelEvent_*`、`InspectorPanel_*`、`Timeline`、`TabSection_*` 等 |
| 文档应先覆盖核心和编辑器事件系统 | 这部分最能同时服务源码研究者理解主工程运行方式 |
