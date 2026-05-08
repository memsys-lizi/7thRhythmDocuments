# 依赖说明

## Unity 包

工程使用 Unity 6000.3.3f1，`Packages/manifest.json` 中主要包含 Unity 内置模块和 Rider 支持。

| 依赖 | 用途 |
| --- | --- |
| `com.unity.textmeshpro` | 文本渲染与 UI 文本 |
| `com.unity.ide.rider` | Rider IDE 支持 |
| `com.unity.modules.audio` | 音频系统 |
| `com.unity.modules.video` | 视频播放 |
| `com.unity.modules.ui` | Unity UI |
| `com.unity.modules.physics2d` | 2D 物理 |

## 插件目录

`Assets/Plugins/Assembly-CSharp-firstpass` 中包含大量第三方或平台相关代码。当前策略是不逐项深写，只说明它们在 RD 中承担的功能和接入位置。

| 插件或命名空间 | 初步用途 |
| --- | --- |
| `OggVorbisEncoder` | Ogg 音频编码 |
| `MP3Sharp` | MP3 解码 |
| `Discord` | Discord 集成 |
| `Rewired` | 输入系统 |
| `DG.Tweening` | DOTween 动画补间 |
| `nn.*` | Nintendo Switch 平台 API |
| `tk2dRuntime` | 2D Toolkit 运行时 |
| `UnityStandardAssets.ImageEffects` | 后处理效果 |

## 阅读重点

- 找出 RD 主工程中调用插件的入口。
- 为 Mod 作者标注哪些依赖不适合直接改动。
- 将插件相关解释链接回具体 RD 系统页面。
