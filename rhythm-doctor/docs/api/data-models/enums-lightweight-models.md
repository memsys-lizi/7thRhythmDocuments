# 枚举与轻量模型补充

本页补充阶段 7 复核时发现的根目录轻量类型，以及 `RDLevelEditor` 中仍未归入主页面的三个小类型。它们多数不是独立系统入口，而是被菜单、暂停流程、叙事、输入提示、关卡选择、保存文件、视觉组件或编辑器控件引用的辅助数据结构。

## 源码范围

| 类型或文件 | 路径 | 用途 |
| --- | --- | --- |
| `BeatSoundMode` | `RDFucked/Assets/Scripts/Assembly-CSharp/BeatSoundMode.cs` | 节拍声音 pitch 模式枚举。 |
| `ConditionType` | `RDFucked/Assets/Scripts/Assembly-CSharp/ConditionType.cs` | 条件系统的条件类型枚举。 |
| `ContainerType` | `RDFucked/Assets/Scripts/Assembly-CSharp/ContainerType.cs` | 菜单容器类型枚举。 |
| `ElementType` | `RDFucked/Assets/Scripts/Assembly-CSharp/ElementType.cs` | 菜单或叙事导航元素类型枚举。 |
| `FeatureSet` | `RDFucked/Assets/Scripts/Assembly-CSharp/FeatureSet.cs` | 运行特性集合枚举。 |
| `GameResult` | `RDFucked/Assets/Scripts/Assembly-CSharp/GameResult.cs` | 关卡结束结果枚举。 |
| `HandUpdateType` | `RDFucked/Assets/Scripts/Assembly-CSharp/HandUpdateType.cs` | 手部更新类型枚举。 |
| `NarrationActionName` | `RDFucked/Assets/Scripts/Assembly-CSharp/NarrationActionName.cs` | 旁白动作名称枚举。 |
| `PauseContentName` | `RDFucked/Assets/Scripts/Assembly-CSharp/PauseContentName.cs` | 暂停菜单内容项名称枚举。 |
| `PauseContentValueType` | `RDFucked/Assets/Scripts/Assembly-CSharp/PauseContentValueType.cs` | 暂停菜单内容值类型枚举。 |
| `RotatingVoxelMode` | `RDFucked/Assets/Scripts/Assembly-CSharp/RotatingVoxelMode.cs` | 旋转 voxel 视觉对象模式枚举。 |
| `ShadowRowStyle` | `RDFucked/Assets/Scripts/Assembly-CSharp/ShadowRowStyle.cs` | 影子行样式枚举。 |
| `SubdivisionRowMode` | `RDFucked/Assets/Scripts/Assembly-CSharp/SubdivisionRowMode.cs` | subdivision 行显示模式枚举。 |
| `WindowType` | `RDFucked/Assets/Scripts/Assembly-CSharp/WindowType.cs` | 窗口消息类型枚举。 |
| `PropertyType` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/PropertyType.cs` | 编辑器属性控件类型枚举。 |
| `VerticalDirection` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/VerticalDirection.cs` | 编辑器竖向方向枚举。 |
| `RowAndPlayer` | `RDFucked/Assets/Scripts/Assembly-CSharp/RDLevelEditor/RowAndPlayer.cs` | 编辑器行与 CPU 角色选择控件。 |

## 基础枚举

| 枚举 | 成员 |
| --- | --- |
| `BeatSoundMode` | `NoMods = 0`、`HighPitchOnFirstBeat = 1`、`CustomPitchForEachBeat = 2` |
| `ConditionType` | `LastHit = 0`、`ButtonAction = 1`、`MistakeCount = 2` |
| `ContainerType` | `None = 0`、`VerticalMenu = 1`、`HorizontalMenu = 2`、`Selection = 3` |
| `ElementType` | `None = 0`、`Button = 1`、`Dropdown = 2`、`Inputfield = 3`、`Toggle = 4`、`Slider = 5`、`Label = 6`、`VerticalMenu = 7`、`HorizontalMenu = 8`、`Selection = 9`、`VerticalList = 10`、`HorizontalList = 11`、`SelectableEntity = 12`、`Tab = 13`、`Link = 14` |
| `FeatureSet` | `Desktop = 0`、`SteamDeck = 1` |
| `GameResult` | `LevelAlreadyWasPassed = 0`、`LevelJustPassed = 1`、`LevelHasntBeenPassed = 2`、`PlayerQuitLevel = 3` |
| `HandUpdateType` | `LeftHand = 0`、`LeftHandShort = 1`、`RightHand = 2`、`RightHandShort = 3`、`BothHands = 4` |
| `RotatingVoxelMode` | `Heart = 0`、`BrokenHeart = 1`、`ZenGarden = 2`、`Baseball = 3` |
| `ShadowRowStyle` | `HostToShadowIf2P = 0`、`ShadowToHost = 1` |
| `SubdivisionRowMode` | `Mini = 0`、`Normal = 1` |
| `WindowType` | `Notification = 0`、`Dialogue = 1` |
| `PropertyType` | `NotAssigned = 0`、`Bool = 1`、`Int = 2`、`Float = 3`、`String = 4`、`Color = 5`、`File = 6`、`Enum = 7`、`Vector2 = 8`、`Export = 9`、`Rating = 10` |
| `VerticalDirection` | `Up = 0`、`Down = 1` |

这些枚举没有方法。源码中的主要信息就是成员名称和数值，阅读时应优先根据调用点理解上下文，例如 `PropertyType` 属于 `RDLevelEditor` 命名空间，和属性控件映射相关；`FeatureSet` 只区分 `Desktop` 与 `SteamDeck`。

## 暂停菜单数据

| 类型 | 成员 | 行为 |
| --- | --- | --- |
| `PauseContentName` | 大量暂停菜单项名称，包括 `Continue`、`Restart`、`Settings`、`Volume`、`NarrationSettings`、`SoundGlossary`、`EditorWindowTab`、`StartGame` 等 | 作为内容项 id，被暂停菜单数据、设置页和子菜单跳转使用。 |
| `PauseContentValueType` | `None`、`ModeChanger`、`String`、`Int`、`Bool`、`LanguageLocalization`、`Resolution`、`Defibrillator`、`WindowMovement`、`AccessibilityScope`、`NarrationReportPosition`、`DiscordPresence` | 描述内容项的值展示和交互类型。 |
| `PauseMenuModeData` | `name`、`localizedText`、`useLevelDetail`、`useCategories`、`defaultCategoryLocalizationKey`、`categoryIcon`、`contentNames` | `ScriptableObject` 数据 `PauseMenuData` 引用它来描述每个暂停菜单模式包含哪些内容项。 |
| `PauseMenuData` | `contents`、`modes`、`pauseContentsDict`、`pauseModesDict`、`isInitialized` | `Initialize()` 把数组建成字典；`GetModeContents()` 根据 `PauseModeName` 返回当前模式可显示的 `PauseMenuContentData` 列表；`GetModeByName()` 返回模式数据。 |

`PauseMenuData.Initialize()` 会跳过 Linux 上的 `WindowMovement` 内容项。`GetModeContents()` 会按平台和运行环境过滤若干项目：旁白不可用时隐藏旁白设置和 glossary，编辑器产品名下隐藏重新首次设置、重置校准和 voices，非 Windows 隐藏 `ForceSAPINarration`，非 Mac 与非 Linux 隐藏 speech rate 和 speech volume。

## 字体、旁白与按键提示

| 类型 | 字段或属性 | 行为 |
| --- | --- | --- |
| `FontData` | `font`、`size = 1f`、`lineHeight = 1f` | 可序列化字体数据，保存 Unity `Font` 与尺寸倍率。 |
| `FontPack` | `language`、`usePixelFont`、`vectorFont`、`pixelFont`、`flashFont`、`vectorFontAsset`、`pixelFontAsset`、`flashFontAsset` | `font` 属性按 `usePixelFont` 返回 vector 或 pixel 字体；`fontAsset` 返回 TextMeshPro 字体资产；`isCJK` 对中文、韩文、日文返回 true。 |
| `NarrationActionName` | 从 `ToSelect = 1` 到 `ToViewSearchResults = 36` 等动作名 | 旁白动作 id，和 `RDString.Get("narration." + actionName)` 搭配生成说明文本。 |
| `NarrationAction` | `actionName`、`keys`、`combo` | 构造函数保存动作名和按键数组；`GetNarration()` 根据 `combo` 和按键数量取本地化模板，再替换 `[key1]`、`[key2]` 和 `[action]`。 |
| `NarrationData` | `actions` | `ScriptableObject`，菜单名为 `RhythmDoctor/NarrationData`。 |
| `KeyHelperInfo` | `type`、`guids`、四个 action 按钮和四个方向按钮的 `ButtonInfo` | 手柄或键盘提示图标配置。 |
| `KeyInfoPanel.Info` | `rect`、`layout` | `GeUnfoldWidth()` 汇总所有激活子项宽度和 layout spacing；`GetFoldWidth()` 只取第一个激活子项宽度。 |

`NarrationAction.GetNarration()` 对方向键、空格、Esc、Return、LeftControl、LeftShift 这类按键走本地化键 `narration.<KeyCode>`；其他键直接使用 `KeyCode.ToString()`。

## 存档 JSON 与协程结果

| 类型 | 成员 | 行为 |
| --- | --- | --- |
| `PlayerPrefsJson.FileLocation` | `Automatic`、`UserFolder`、`PersistentDataFolder` | 保存文件位置枚举。 |
| `PlayerPrefsJson.FileType` | `Settings`、`Slot0`、`Slot1`、`Slot2` | 保存文件类型枚举。 |
| `PlayerPrefsJson` | `files`、`filesPath`、`AllFileTypes`、`nonSyncedKeys`、`DefaultLevelEncoding`、`Filenames`、`dict`、`fileType` | 把设置和存档槽保存为 `.rdsave` JSON；使用 `GDMiniJSON.Json` 序列化和反序列化。 |
| `CoroutineWithData` | `result`、`target`、`coroutine` | 构造函数启动 `Run()`；`Run()` 每次推进目标 IEnumerator，并把 `target.Current` 保存到 `result`。 |
| `RDBool` | `On = 0`、`Off = 1`、`DontOverride = 2` | 三态布尔枚举。 |
| `GameOverBarInfo` | `bar`、`deathVariantInfo` | 构造函数保存死亡 bar 和变体信息数组。 |
| `WebServiceResult` | `NoResponse`、`BadResponse`、`ErrorNumber`、`Correct` | Web 请求结果枚举。 |

`PlayerPrefsJson.LoadAllFiles()` 会先清空缓存，然后依次加载 `Settings`、`Slot0`、`Slot1`、`Slot2`。主文件成功时会保存备份；主文件失败但备份成功时会标记主文件损坏并使用备份；两者都失败时会标记两个文件损坏并创建新文件。`nonSyncedKeys` 中的窗口和分辨率键走 Unity `PlayerPrefs`，其他键写入 `dict`。

## 选择实体与关卡元信息

| 类型 | 字段或属性 | 行为 |
| --- | --- | --- |
| `GuestData` | `type`、`link`、`linkType`、`name` | 关卡元信息中的 guest 数据容器。 |
| `LevelMetadata` | `id`、`type`、`bpm`、`portraits`、`characters`、`guest1` 到 `guest4` | 关卡选择或展示用元数据；`type` 默认为 `LevelType.Regular`，`bpm` 默认为 `100f`。 |
| `SelectableEntity` | `gameObject`、`id`、`group`、`gamePosition`、`cameraOffset`、`descriptionOffset`、`downArrowOffset`、`upArrowOffset`、`levelType`、`normalEnabled`、`hardEnabled`、`leftPager`、`skipCamAnimOnSelect` | 关卡选择实体基类；属性 `isBossLevel`、`isBonus`、`isIntermission`、`isCollab` 直接比较 `levelType`。 |
| `SelectableCharacter` | `charactersNormal`、`charactersHard`、`portraitsNormal`、`portraitsHard`、`unlocks`、`levels`、`animation`、`childAnimations`、`levelTier`、`bpmNormal`、`bpmHard` | 角色型关卡选择实体，保存普通和困难难度的角色、头像、解锁关卡和动画对象。 |
| `SelectableObject` | `action` | `ActionToPerform()` 根据难度拼接 `_Normal` 或 `_Hard`，调用 `ink.Run("diaLevelSelect", objectName, ...)`，回调里解除 `scnLevelSelect` 的控制锁和对话运行标记。 |

## UI 小组件与常量容器

| 类型 | 字段或方法 | 行为 |
| --- | --- | --- |
| `RDLayer` | `Default`、`UI`、`Background`、`GameHUD`、`Blades`、`PauseMenu`、`HandsOnTop`、`VirtualWindowDance` | Unity layer 整数常量容器。 |
| `RDSortingOrder` | `Background`、`BackgroundOverlay`、`Sprite`、`HitStrip`、`Foreground`、`PauseOverlay` | renderer sorting order 整数常量容器。 |
| `LevelDetailOption` | 选择、按下、确认、取消、主标签、selector 和动画字段 | `Select()` 设置选中 sprite、内容位置、selector 位置和尺寸，并播放 `CLSAnimation`；`Press()` 启动按下协程；`Deselect()` 恢复默认 sprite、停止动画，并重置确认选项。 |
| `RowAndPlayer` | `text`、`toggleGroup`、`cpuCharacterPicker`、`cpuMarkerImage`、`cpuNoChangeSprite`、`cpuLabelTrans` | `UpdateCPUMarkerImage()` 从 `RowEntity.markersDict` 读取角色 marker；角色为 `None` 时使用 no change sprite；`ShowCharacterPickerIfActive()` 在 ToggleGroup 有选中项时打开角色选择弹窗。 |
| `RoomTransitionIcon` | `bars`、`sizes`、`setup` | `Show()` 根据 `RoomTransitionType` 调整 bars 高度；`Show` 正序，`Hide` 反序，`KeepVisible` 用最大值，`KeepHidden` 用最小值。 |
| `MouseClickHandler` | `leftClick`、`middleClick`、`rightClick` | `OnPointerClick()` 按鼠标按钮触发对应 UnityEvent。 |
| `RedirectedGraphicRaycaster` | `sourceRect`、`targetRaycaster`、`overrideTarget` | `Raycast()` 把 source rect 内的 pointer 坐标归一化后映射到目标 Canvas 尺寸，再调用目标 raycaster。 |
| `DisableIfEditor` | `negate` | `Start()` 比较 `editorMode` 和 `negate`，条件不一致时禁用对象。 |
| `DisableIfMobile` | `negate` | `Start()` 比较 `scnBase.isMobile` 和 `negate`，条件不一致时禁用对象。 |
| `DisableOnAwake` | 无公开字段 | 监听 `SceneManager.sceneLoaded`，场景加载完成时禁用对象。 |
| `SetActiveAtAwake` | `objectsToSetActive` | `Awake()` 遍历列表，把非空对象设为 active。 |
| `ShowFrameCount` | `text` | `Awake()` 获取 `Text`；`Update()` 显示当前 `Time.frameCount`。 |

`RedirectedGraphicRaycaster.RectTransformToScreenSpace()` 读取 RectTransform 四个世界角，再用传入 Camera 转换到屏幕坐标，返回覆盖矩形。

## 执行器辅助基类

| 类型 | 字段或属性 | 行为 |
| --- | --- | --- |
| `RDExecuteOn` | `enabled`、`removed`、`action`、`callingMethod`、`executes` | 抽象类，继承 `RDClass`；构造函数把自身加入 `scrConductor.instance.executes`。 |
| `RDExecuteOn.OnBeat()` | 无参数 | 虚方法，默认空实现。 |
| `RDExecuteOn.Update()` | 无参数 | 虚方法，默认空实现。 |
| `RDExecuteOn.LateUpdate()` | 无参数 | 虚方法，默认空实现。 |
| `RDExecuteOn.Remove()` | 无参数 | 把 `removed` 设为 true。 |
| `RDExecuteOn.FindAll<T>()` | 泛型类型 `T` | 从 `scrConductor.instance.executes` 中筛选类型为 `T` 的执行器。 |
| `RDExecuteOn.ClearAll<T>()` | 泛型类型 `T` | 从 conductor 执行器列表中移除类型为 `T` 的执行器。 |
| `RDExecuteOn.ToString()` | 无参数 | 返回类型名和 `callingMethod`。 |

`RDExecuteOn` 是非组件执行器基类，生命周期由 `scrConductor.instance.executes` 列表驱动；它本身只登记、筛选、移除和提供空虚方法。

## 关系入口

| 相关页面 | 关系 |
| --- | --- |
| [关卡设置模型](/api/data-models/level-settings.md) | `FeatureSet`、`LevelMetadata` 等类型与设置和关卡元信息读取有关。 |
| [条件系统](/api/data-models/conditionals.md) | `ConditionType` 属于条件类型定义。 |
| [场景流程与暂停流程](/api/runtime/scene-flow.md) | `GameResult`、暂停菜单数据和暂停内容枚举进入关卡结束与暂停流程。 |
| [UI 与菜单辅助类](/api/runtime/ui-menu-helpers.md) | `ElementType`、`ContainerType`、`KeyInfoPanel`、鼠标点击和选择实体都服务 UI 导航或展示。 |
| [编辑器 UI 辅助类](/api/editor-events/editor-ui-auxiliary.md) | `PropertyType`、`VerticalDirection`、`RowAndPlayer` 归入编辑器控件与选择器辅助。 |



