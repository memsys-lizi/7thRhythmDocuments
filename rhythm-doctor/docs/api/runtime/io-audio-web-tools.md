# 音频、导入与 Web 工具

本页补充阶段 7 中剩余的音频工具、关卡包导入、文件压缩、Web 入口、截图、输入辅助和少量工具组件。它们多数不是核心运行时系统，而是围绕编辑器、暂停菜单、关卡导入、启动外部关卡和辅助场景提供服务。

## 源码范围

| 类型 | 路径 | 主要职责 |
| --- | --- | --- |
| `AudioclipToOggEncoder` | `RDFucked/Assets/Scripts/Assembly-CSharp/AudioclipToOggEncoder.cs` | 把 `AudioClip` 片段编码为 Ogg Vorbis。 |
| `AudioObserver` | `RDFucked/Assets/Scripts/Assembly-CSharp/AudioObserver.cs` | 每帧枚举场景中的 `AudioSource`。 |
| `AudioSamplesToTexture` | `RDFucked/Assets/Scripts/Assembly-CSharp/AudioSamplesToTexture.cs` | 把音频采样写入 `128x128` 波形纹理。 |
| `BPMDetector` | `RDFucked/Assets/Scripts/Assembly-CSharp/BPMDetector.cs` | 基于短整型采样估算 BPM。 |
| `PauseMenuAudioPreview` | `RDFucked/Assets/Scripts/Assembly-CSharp/PauseMenuAudioPreview.cs` | 暂停菜单音量和 glossary 项的试听音频。 |
| `ImportLevel` | `RDFucked/Assets/Scripts/Assembly-CSharp/ImportLevel.cs` | 导入关卡 UI 列表项数据。 |
| `LevelImporterInfoSection` | `RDFucked/Assets/Scripts/Assembly-CSharp/LevelImporterInfoSection.cs` | 导入器信息分区，维护导入项数量和清空行为。 |
| `RDPackageInstaller` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDPackageInstaller.cs` | URL 文件名解析、下载、zip 检查、解压和 `.rdlevel` 查找。 |
| `CSVReader` | `RDFucked/Assets/Scripts/Assembly-CSharp/CSVReader.cs` | 读取 `TextAsset` CSV 并拆成二维网格。 |
| `RDDirectory` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDDirectory.cs` | 目录访问抽象入口。 |
| `RDDirectory_Default` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDDirectory_Default.cs` | 基于 `System.IO.Directory` 的默认目录实现。 |
| `ZipUtils` | `RDFucked/Assets/Scripts/Assembly-CSharp/ZipUtils.cs` | zip 解压和打包工具。 |
| `Releases` | `RDFucked/Assets/Scripts/Assembly-CSharp/Releases.cs` | release number、build date 和 build commit 静态信息。 |
| `RDWrldLevelURL` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDWrldLevelURL.cs` | URL 下载关卡场景的 UI 引用容器。 |
| `RDWrldSignup` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDWrldSignup.cs` | email signup 场景，保存到桌面 JSON 文本。 |
| `RDWrldSRT` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDWrldSRT.cs` | SRT 外部关卡加载场景。 |
| `Survey` | `RDFucked/Assets/Scripts/Assembly-CSharp/Survey.cs` | 简易反馈表单。 |
| `TakeScreenshot` | `RDFucked/Assets/Scripts/Assembly-CSharp/TakeScreenshot.cs` | 暂停菜单截图模糊背景。 |
| `TempresManager` | `RDFucked/Assets/Scripts/Assembly-CSharp/TempresManager.cs` | Ian desktop tempres 小玩法流程。 |
| `UnityPS_Scriptable` | `RDFucked/Assets/Scripts/Assembly-CSharp/UnityPS_Scriptable.cs` | ParticleSystem 预设 ScriptableObject。 |
| `CustomWindowMac` | `RDFucked/Assets/Scripts/Assembly-CSharp/CustomWindowMac.cs` | Mac 平台窗口类，直接继承 `CustomWindow`。 |
| `RDCheatCode` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDCheatCode.cs` | 序列输入作弊码检测。 |
| `RDJoystick` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDJoystick.cs` | JoyCon 轴触发和按键辅助。 |
| `PropertyControl_RowLegacy` | `RDFucked/Assets/Scripts/Assembly-CSharp/PropertyControl_RowLegacy.cs` | 旧版 row 属性控件高度调整。 |

## 音频编码、采样和试听

| 类型 | 字段或常量 | 方法行为 |
| --- | --- | --- |
| `AudioclipToOggEncoder` | `RescaleFactor = 32767`、`Padding = 0.3f`、`WriteBufferSize = 512`、内部 `AudioSource` | `Start()` 添加不自动播放的 `AudioSource`；`EncodeToOgg()` 按起始时间和时长截取 `AudioClip` 采样，补 0.3 秒 padding，转 16-bit PCM，再用 `OggVorbisEncoder` 写 header、comments、books 和音频 packet；进度变化时调用回调并 `yield return null`；可写入 `outputPath`。 |
| `AudioObserver` | 无公开字段 | `Update()` 每帧查找所有 `AudioSource` 并读取其 `gameObject.GetInstanceID()`。 |
| `AudioSamplesToTexture` | `textureSize = 128`、`textureSamplesLength = 16384` | `AudioClipToTexture()` 创建 `128x128` RGBA32 纹理；未启用 `GC.levelEditor_streamMP3Loading` 时读取全量采样，把绝对值写入红色和 alpha；纹理使用 Bilinear filter 和 Clamp wrap，命名为 `Waveform`。 |
| `BPMDetector` | `leftChn`、`BPM`、`sampleRate = 44100`、`trackLength` | `Detect()` 每 `3600` 个采样求平方和，把局部能量峰计数，最后按 `numPeaks / (trackLength / 60)` 得到 BPM；`getBPM()` 返回检测结果。 |
| `PauseMenuAudioPreview` | 静态 `audioSources`、`oneshotPhraseProgress`、`subdivThree`、`firstOffset`、`oneshotWords`、`lastPreviewTweens` | `PlayPreviewAudio()` 按 `PauseContentName` 选择试听音效、节拍序列或 glossary 映射；`PreviewAudioPlaySound()` 调用 `scrConductor.PlayImmediately()` 并记录 AudioSource；`PlaySoundSequence()` 使用 `RDSongOffsets` 和 delayed tween 排列音效；`StopPreviewAudio()` 停止并销毁试听音源，kill 所有预览 tween。 |

`PauseMenuAudioPreview.Start()` 会预加载 held beat 的四个起始音效。试听音频的 mixer path 会随用途切换，例如 beatsounds、hitsounds、dialogue、feedback、editor UI 等。

## 导入关卡与包安装

| 类型 | 字段 | 行为 |
| --- | --- | --- |
| `ImportLevel` | `checkIssuesButton`、`progressImage`、`progressText`、`infoText`、`customLevel`、`settings`、`isUrl`、`path`、`errorsName`、`errorToken`、`progress` | `Awake()` 从 `progressText` 获取 Text；`Start()` 默认允许 toggle remove button，并在 CJK 或 reduced pixel font 时把 info text 字号设为 6。 |
| `LevelImporterInfoSection` | `levels`、`titleKey`、`titleText`、`clearButton` | `Add()` 设置导入项说明文本、字体和 sibling index，更新标题数量并激活分区；`Remove()` 移除项并在空时隐藏分区；`Clear()` 销毁所有导入项并清空列表。 |
| `RDPackageInstaller` | 静态 `anyErrors`、`errorMessage`、`cancelDownload` | `GetFileNameFromUrl()` 用 HEAD 请求和 content-disposition 或 URL 路径解析文件名；`DownloadPackage()` 用 `UnityWebRequest` 和 `DownloadHandlerFile` 下载文件，支持取消和进度文本；`NarrateDownloadProgress()` 每 5% 进度朗读一次；`CheckFileIsZip()` 检查文件头是否为 `PK`；`UnzipAndFindLevel()` 解压后查找关卡；`FindRDLevel()` 优先找 `main.rdlevel`，再找其他 `.rdlevel`；`MoveRDLevelFolder()` 删除子目录后移动或复制目录。 |
| `PropertyControl_RowLegacy` | `rectTransform`、`dropdown`、`dropdownContainer`、`noRowsDescription` | `UpdateHeight()` 在 no rows 描述可见时高度设为 `42`，否则设为 `14`。 |

`RDPackageInstaller.DownloadPackage()` 会选择 `scnCLS.instance` 或 `scnEditor.instance` 作为 coroutine runner；两者都为空时抛出异常。下载完成后如果 request 有错误或目标文件不存在，会设置 `anyErrors` 和 `errorMessage`。

## 文件与压缩工具

| 类型 | 成员 | 行为 |
| --- | --- | --- |
| `CSVReader` | `grid` | 构造函数读取 `TextAsset.text` 并调用 `SplitCsvGrid()`；`SplitCsvGrid()` 先计算最大列数，再填充二维数组并把 `""` 还原成 `"`；`SplitCsvLine()` 使用正则解析带引号的 CSV 单行。 |
| `RDDirectory` | 静态 `Instance` | `Exists(path)` 和 `CreateDirectory(path)` 转发给抽象内部方法。 |
| `RDDirectory_Default` | 无公开字段 | `InternalExists()` 调用 `Directory.Exists()`；`InternalCreateDirectory()` 调用 `Directory.CreateDirectory()`。 |
| `ZipUtils` | 无实例字段 | `Unzip()` 确保目标目录存在并记录空目录或非空目录信息，再 `ExtractToDirectory()`；`Zip()` 创建或覆盖 zip 文件，把传入文件逐个 `CreateEntryFromFile()`。 |
| `Releases` | `releaseNumber = 42`、`buildDate = "not-set"`、`buildCommit = "not-set"` | 静态构建信息容器。 |

## Web 与外部关卡入口

| 类型 | 继承 | 行为 |
| --- | --- | --- |
| `RDWrldLevelURL` | `scnBase` | 保存 URL 输入框、搜索框、状态文本、下载和播放按钮、玩家按钮、列表容器、list item prefab、跳过已下载 toggle 等 UI 引用；类中没有方法。 |
| `RDWrldSignup` | `scnBase` | `signupEmails` 指向桌面 `signupEmails.json`；`Start()` 清空 HUD overlay、设置 BPM 82 和 4/4，触发 pre-bar 并播放 `sndScribble`；`OnPreBar()` 每 17 bar 播放 `sndIntro2`；`CancelButton()` 回关卡选择；`SubmitButton()` 保存 email 后回关卡选择；`Save()` 把非空 email 追加到文件。 |
| `RDWrldSRT` | `scnBase` | `Awake()` 设置当前场景和提示文本；`Start()` 设置 BPM、关闭 HUD camera overlay；`Update()` 支持 1234 删除 PlayerPrefs、L 打开文件、S 进 sleeve paint、Space 加载已选关卡；`GetFile()` 用 file dialog 选 `rdlevel`、`rdzip` 或 `json`，rdzip 会先 `RDPackageInstaller.UnzipAndFindLevel()`；`OnPreBar()` 每 17 bar 播放 `sndIntro2`。 |
| `Survey` | `MonoBehaviour` | `SendButtonAction()` 在 comments 不为空时拼接版本、评分、难度、评论和 email，禁用发送按钮并显示 thanks；空评论第一次会把 placeholder 改成橙色并追加提示；`GoBackButtonAction()` 调用 `scrWrldMonthlyLevel.TransitionFromQuitToIntroScene()`；`QuitButtonAction()` 退出应用。 |

## 截图、窗口和辅助资源

| 类型 | 字段 | 方法行为 |
| --- | --- | --- |
| `TakeScreenshot` | `iterations`、`blurSpread`、`blurredTexture`、`mat` | `OnRenderImage()` 在 `scnGame.instance.getScreenshot == 1` 时创建模糊 RenderTexture，先 4 tap downsample，再按 iterations 多次 `FourTapCone()` 模糊，把结果放入暂停菜单背景并显示暂停菜单，随后禁用游戏 camera；`getScreenshot == 0` 时禁用自身。 |
| `TempresManager` | Ian desktop、freeplay/input、bars、颜色、尺寸、曲线、score/best text、restart 参数和状态字段 | `Start()` 预初始化 bars；`Tap()` 处理普通点击、失败、freeplay 完成和长按重开；`WinGame()` 保存最好成绩、播放胜利音效并触发 Ian desktop 登录动画或 freeplay 展示；`Restart()` 清空分数和颜色；`ExitGame()` 回关卡选择。 |
| `UnityPS_Scriptable` | `ps` | `ScriptableObject`，菜单名为 `RhythmDoctor/Particle Presets`，保存一个 `ParticleSystem` 预设。 |
| `CustomWindowMac` | 构造参数 `index`、`choreographer`、`transparent` | 构造函数直接转发给 `CustomWindow`。 |

`TakeScreenshot` 的模糊流程使用 `Graphics.BlitMultiTap()`，四个 offset 分别是左下、左上、右上、右下。

## 输入和作弊辅助

| 类型 | 字段或属性 | 行为 |
| --- | --- | --- |
| `RDCheatCode.CheatCode` | `keys`、`actions`、`usingKeys`、`currentIndex` | 支持 `KeyCode[]` 或 `RDInputAction[]` 两种序列；`CheckCheatCode()` 在任意键或任意手柄按钮按下后检查当前序列项，成功推进，失败归零，完成后返回 true。 |
| `RDCheatCode` | `levelLounge` | `Start()` 建立左右方向输入序列；`LateUpdate()` 完成后，如果在关卡选择且 `Level.Lesmis` 可用，则开启 dog mode、解锁 achievement、重置 level speed 并进入关卡；如果在 `scnRhythmWeightlifter`，则切换 DogMode。 |
| `RDJoystick.AxisControl` | `axisName`、`dead`、`deadSignal` | 轴值超过 `0.01` 或小于 `-0.01` 且处于 dead 状态时触发一次；`Update()` 在回到中心后重新 arm；`LateUpdate()` 消费 dead signal。 |
| `RDJoystick` | 单例、两个 X/Y 轴控制、P1/P2 enter 和 cancel 按键数组 | `instance` 懒创建 `RDJoystick` GameObject；方向属性来自轴 trigger；enter/cancel 属性调用 `RDInput.CheckForStateInKeys()`；`Setup()` 组装 JoyCon L/R horizontal/vertical 轴名。 |

`RDJoystick.AxisControl` 的轴名格式是 `JoyConLHorizontalWin`、`JoyConRVerticalWin` 这类字符串，`schemeIndex == 0` 使用 L，否则使用 R。

## 关系入口

| 相关页面 | 关系 |
| --- | --- |
| [音频运行时](/api/runtime/audio-runtime.md) | Ogg 编码、暂停试听、音频采样和 BPM 检测都依赖音频系统或 AudioSource 数据。 |
| [平台与服务辅助类](/api/runtime/platform-services.md) | Web 下载、文件移动、URL 参数、平台窗口和自定义关卡入口与平台服务页互补。 |
| [场景流程与暂停流程](/api/runtime/scene-flow.md) | `TakeScreenshot`、`PauseMenuAudioPreview`、`RDWrldSRT` 和 `RDWrldSignup` 都进入场景或暂停流程。 |
| [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) | `ImportLevel`、`LevelImporterInfoSection` 和 `PropertyControl_RowLegacy` 属于编辑器或导入器 UI 辅助。 |



