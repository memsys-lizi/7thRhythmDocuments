# 节奏医生项目文档

这里是 Rhythm Doctor 项目工程的源码研究文档站。

文档目标不是只写一个简单概览，而是长期覆盖 `RDFucked/Assets/Scripts/Assembly-CSharp` 中的 RD 主工程代码：类、字段、属性、方法、调用关系、模块职责和跨模块扩展点。

## 阅读入口

- [工程概览](architecture/overview.md)：了解 Unity 工程和源码目录。
- [模块总览](modules/README.md)：按系统进入各模块文档。
- [源码 API 索引](api/README.md)：按类型和事件进入源码解释页面。
- [源码研究入口](modding/README.md)：整理可调用方法、事件、数据字段和跨模块入口。

## 重要原则

文档只写从源码、调用点、Unity 配置或反编译结果中确认过的内容。暂时没有读透的成员不会用猜测填充，而是继续追源码，等确认后再写入正式页面。
