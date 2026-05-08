# scr UI、条件与文本辅助组件索引

## 基本信息

本页覆盖阶段 7 中第一批剩余 `scr*` 组件：平台条件、进度条件、节日条件、调试状态、链接文本、版本文本和轻量 UI 显隐组件。这些类通常只有一个 `Start()`、`Awake()` 或 `Update()`，职责是根据全局状态启用/禁用对象，或把某段 UI 文本、链接、版本号同步到组件上。

这些类多数不参与 `LevelEvent` 数据流，也不由 `scnGame.ApplyEvent()` 创建。它们主要挂在 Unity 场景或预制体对象上，通过 `GCS`、`Persistence`、`ADOBase`、`RDString`、`RDC` 和当前 controller 状态读值。

## 平台与运行环境条件

| 文件 | 继承 | 条件 | 行为 |
| --- | --- | --- | --- |
| `scrDisableIfMobile.cs` | `ADOBase` | `ADOBase.isMobile` | `Start()` 中移动端禁用对象。 |
| `scrDisableIfNotMobile.cs` | `ADOBase` | `!ADOBase.isMobile` | 非移动端禁用对象。 |
| `scrDisableIfSwitch.cs` | `ADOBase` | `ADOBase.isSwitch` | Switch 平台禁用对象。 |
| `scrDisableIfNotSwitch.cs` | `ADOBase` | `!ADOBase.isSwitch` | 非 Switch 平台禁用对象。 |
| `scrDisableIfBooth.cs` | `MonoBehaviour` | `GCS.d_booth` | booth 模式禁用对象。 |
| `scrDisableIfMinimumVFX.cs` | `ADOBase` | `ADOBase.controller.visualEffects == VisualEffects.Minimum` | 最低 VFX 设置时在 `Awake()` 禁用对象。 |
| `scrDisableIfNotJudge.cs` | `MonoBehaviour` | `!GCS.d_judges` | 非 judge 模式禁用对象。 |
| `scrDisableIfNotGameWorld.cs` | `ADOBase` | `!ADOBase.controller.gameworld` | 当前不是 game world 时禁用对象。 |
| `scrDisableIfNotEditingLevel.cs` | `ADOBase` | 没有 editor 或 `!editor.inStrictlyEditingMode` | `Update()` 中检测，不在严格编辑模式时禁用对象。 |

这些类都直接调用 `gameObject.SetActive(false)`，不做淡出动画，也不递归处理外部引用。

## 进度、世界与解锁条件

| 文件 | 关键字段 | 条件与行为 |
| --- | --- | --- |
| `scrDisableIfNotAllLevelsComplete.cs` | `disableIfAllLevelsComplete` | `GCS.maxLevel < 18` 且未反向时禁用；`GCS.maxLevel >= 18` 且反向时禁用。 |
| `scrDisableIfNotUnlockedXtra.cs` | 无 | `Persistence.unlockedXF` 为 false 时禁用对象。 |
| `scrDisableIfUnlockedXtra.cs` | 无 | `Persistence.unlockedXF` 为 true 时禁用对象。 |
| `scrDisableIfOverallProgressStage.cs` | `requiredStage`、`inverted` | 比较 `Persistence.GetOverallProgressStage()` 和 `requiredStage`；`GCS.FOOL_JOKER` 且阶段大于等于 7 时把 required stage 改为 5。 |
| `scrDisableIfPastProgressStage.cs` | `requiredStage` | 如果整体进度已经达到或超过 required stage，就禁用对象。 |
| `scrDisableIfWorldNotComplete.cs` | `world` | `world >= 0` 时调用 `Persistence.IsWorldComplete(int)`；负数时按整体进度阶段判断。 |
| `scrDisableIfWorldNotCompleteString.cs` | `world` | 调用 `Persistence.IsWorldComplete(string)`，未完成时禁用对象。 |

## 日期、节日与分支条件

| 文件 | 关键字段 | 行为 |
| --- | --- | --- |
| `scrDisableIfPastDate.cs` | 无 | `Update()` 中比较 UTC 时间和 `2020-06-28 17:00:00`，过期后禁用对象。 |
| `scrDateCountdown.cs` | `Text text` | 每帧显示距离 `2020-06-28 17:00:00 UTC` 的 `小时:分钟:秒` 倒计时。 |
| `scrEnableIfAprilFools.cs` | `inJoker`、`invert` | 根据 `ADOBase.IsAprilFools()` 或 `GCS.FOOL_JOKER` 设置对象 active，支持反向。 |
| `scrEnableIfBeta.cs` | `setBuildText` | 非 debug、Steam 初始化、当前 branch 非 stable 且 branch 名非空时显示对象；可把 `TMP_Text` 改为分支 build 文本。 |
| `scrEnableIfCNY.cs` | `animals` | CNY 期间根据年份加载 `Resources/CNY Constellations/{animal}` sprite；否则禁用对象。 |
| `scrEnableIfShowTech.cs` | `invert` | 根据 `Persistence.ShowTechLevels()` 设置对象 active，支持反向。 |
| `scrEnableOnlyForLanguage.cs` | `english`、`chinese` | 只在允许的语言下保留对象；语言判断来自 `RDString.isChinese`。 |

## 链接与文本组件

### `scrButtonURL` 与 `scrButtonURL_OSBased`

| 类 | 字段 | 行为 |
| --- | --- | --- |
| `scrButtonURL` | `link`、`localized`、`button` | `Awake()` 获取同对象 `Button` 并绑定点击；`OpenURL()` 在链接非空且非 Switch 时暂停游戏，并通过 `ADOBase.platformHelper.OpenURL()` 打开链接。 |
| `scrButtonURL_OSBased` | `macLink` | 覆盖 `OpenURL()`，macOS 使用 `macLink`，其他平台使用 `link`，然后调用 `Application.OpenURL()`。 |

`localized` 为 true 时，两者都会把链接字符串当作 `RDString` key 读取。

### `scrClickableTextmesh`

`scrClickableTextmesh` 需要同对象有 `TMP_Text`。`OnPointerClick()` 使用 `TMP_TextUtilities.FindIntersectingLink()` 找到点击位置下的 TMP link，找到后用 `Application.OpenURL(tMP_LinkInfo.GetLinkID())` 打开链接。

### `scrTextWithLink` 与 `scrTextWithLink_TMP`

| 类 | 文本类型 | 行为 |
| --- | --- | --- |
| `scrTextWithLink` | `UnityEngine.UI.Text` | 把 `[`、`]` 或本地化模式下的 `[[`、`]]` 替换为加粗、变色标签；用 `cachedTextGenerator` 计算链接文字横向范围，并把一个透明按钮移动到链接范围上。 |
| `scrTextWithLink_TMP` | `TMP_Text` | 添加 `TMP_TextHyperlinks`，把标记替换成 TMP `<link=url>`、加粗和颜色标签；按钮点击通过 `ADOBase.platformHelper.OpenURL(url)` 打开链接。 |

`scrTextWithLink` 依赖 `ADOBase.editor.GetComponent<CanvasScaler>().referenceResolution` 计算屏幕缩放；如果文本没有链接标记，`Process()` 会禁用组件。

### 其他文本组件

| 文件 | 行为 |
| --- | --- |
| `scrVersionText.cs` | 显示 `v{Application.version} ({ADOBase.platform})` 或 `r141 ({GCNS.buildCommit}, {GCNS.buildDate})`，`UpdatePage()` 在两页之间切换；`Init()` 根据 free roam、gameworld、Taro boss、speed trial、practice mode 调整锚点、pivot 和对齐。 |
| `scrDifficultyText.cs` | 初始隐藏文本；按 I 降低 `GCS.HITMARGIN_COUNTED`，按 O 增加该值，并写入 `PlayerPrefs` 的 `difficulty`。 |
| `scrWebTabLanguageSwitch.cs` | 按 Tab 时强制语言开关，在 English 与 ChineseSimplified 间切换，然后调用 `scrController.instance.Restart()`。 |

## 状态显示与菜单 phase

### `scrShowIfDebug`

`scrShowIfDebug` 是 HUD 状态文本组件。`Awake()` 读取 `Text` 并设置本地化字体；`Update()` 根据多个全局状态决定是否显示：

| 条件 | 行为 |
| --- | --- |
| `hideWithNoAuto && RDC.noAutoHud` | 隐藏文本。 |
| `RDC.noHud` 或 `GCS.d_recording` | 隐藏文本。 |
| `RDC.auto && RDC.debug` | 显示空文本。 |
| `RDC.auto` | 显示 `status.autoplay`，旧 auto 模式追加 `(old)`；编辑器 play mode 暂停时追加 `status.paused`。 |
| 当前地板的下一块地板 `showStatusText` 且非 Taro 场景 | 显示 `status.autoTile`，颜色改为橙色。 |
| `RDC.debug` | 显示 `Debug Mode`。 |
| 其他情况 | 隐藏并清空文本。 |

### `scrShowOnlyInPhase`

`scrShowOnlyInPhase` 根据 `ADOBase.controller.menuPhase == activephase` 对一组可视对象淡入淡出。

| 字段 | 类型 | 行为 |
| --- | --- | --- |
| `activephase` | `int` | 目标菜单 phase。 |
| `alsoActivateObjWhenFadeIn` | `bool` | 淡入时是否同时激活对象。 |
| `spriteList`、`textList`、`TMPList`、`imageList`、`goList` | 列表 | 需要随 phase 淡入淡出的组件或对象。 |
| `imageAlphas` | `List<float>` | `Awake()` 记录 image 原始 alpha，淡入时恢复。 |

`Fade()` 会处理自身 `SpriteRenderer`、自身 `Text`、子级 `SpriteRenderer`、外部列表中的 `Text`、`TMP_Text`、`Image` 和 `GameObject` 子级。若子级 sprite 的父物体有 `scrFloor` 且 `dontChangeMySprite` 为 true，淡入 alpha 使用 0.3。

## 其他轻量 UI 辅助

| 文件 | 行为 |
| --- | --- |
| `scrComingSoon.cs` | `LateUpdate()` 读取 `scrCamera.instance.transform.position.x`，把对象 x 坐标 clamp 到 `minX` 和 `maxX` 之间。 |
| `scrDpadInputChecker.cs` | 文件已归入输入/UI 辅助批次；后续输入小组件页会继续展开。 |
| `scrDebugHUDMessage.cs` | 文件已归入 debug HUD 批次；后续 UI 小组件页继续展开具体字段。 |
| `scrDialogBox.cs` | 文件已归入对话框 UI 批次；后续 UI 小组件页继续展开。 |
| `scrBadgeContainer.cs` | 文件已归入徽章 UI 批次；后续 UI 小组件页继续展开。 |
| `scrBestMultiplierText.cs` | 文件已归入成绩文本 UI 批次；后续结算 UI 补充页继续展开。 |

## 本页覆盖文件

| 文件 | 归类 |
| --- | --- |
| `scrBadgeContainer.cs` | 徽章 UI 批次 |
| `scrBestMultiplierText.cs` | 成绩文本 UI 批次 |
| `scrButtonURL.cs` | 链接按钮 |
| `scrButtonURL_OSBased.cs` | 平台分支链接按钮 |
| `scrClickableTextmesh.cs` | TMP 链接点击 |
| `scrComingSoon.cs` | 相机跟随 UI |
| `scrDateCountdown.cs` | 日期倒计时 |
| `scrDebugHUDMessage.cs` | debug HUD 批次 |
| `scrDialogBox.cs` | 对话框 UI 批次 |
| `scrDifficultyText.cs` | 难度调试文本 |
| `scrDisableIfBooth.cs` | 环境条件 |
| `scrDisableIfMinimumVFX.cs` | 视觉质量条件 |
| `scrDisableIfMobile.cs` | 平台条件 |
| `scrDisableIfNotAllLevelsComplete.cs` | 进度条件 |
| `scrDisableIfNotEditingLevel.cs` | 编辑器条件 |
| `scrDisableIfNotGameWorld.cs` | 场景条件 |
| `scrDisableIfNotJudge.cs` | judge 条件 |
| `scrDisableIfNotMobile.cs` | 平台条件 |
| `scrDisableIfNotSwitch.cs` | 平台条件 |
| `scrDisableIfNotUnlockedXtra.cs` | 解锁条件 |
| `scrDisableIfOverallProgressStage.cs` | 整体进度条件 |
| `scrDisableIfPastDate.cs` | 日期条件 |
| `scrDisableIfPastProgressStage.cs` | 整体进度条件 |
| `scrDisableIfSwitch.cs` | 平台条件 |
| `scrDisableIfUnlockedXtra.cs` | 解锁条件 |
| `scrDisableIfWorldNotComplete.cs` | 世界完成条件 |
| `scrDisableIfWorldNotCompleteString.cs` | 世界完成条件 |
| `scrEnableIfAprilFools.cs` | 节日条件 |
| `scrEnableIfBeta.cs` | Steam 分支条件 |
| `scrEnableIfCNY.cs` | CNY 条件 |
| `scrEnableIfShowTech.cs` | tech levels 条件 |
| `scrEnableOnlyForLanguage.cs` | 语言条件 |
| `scrShowIfDebug.cs` | HUD 状态文本 |
| `scrShowOnlyInPhase.cs` | 菜单 phase 显隐 |
| `scrTextWithLink.cs` | UI Text 链接 |
| `scrTextWithLink_TMP.cs` | TMP 链接 |
| `scrVersionText.cs` | 版本文本 |
| `scrWebTabLanguageSwitch.cs` | Web 语言切换 |

## 阶段 7 覆盖状态

本页完成 `scr*` 的第一批收口，覆盖条件开关、链接文本、debug 状态和轻量 UI。下一批继续处理剩余 `scr*` 中的动画、背景、相机跟随、菜单运动、HUD 数字和场景演出组件。
