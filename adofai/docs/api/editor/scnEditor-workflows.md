# scnEditor 长流程

## 基本信息

| 项 | 内容 |
| --- | --- |
| 源码路径 | `7thRhythmSource/ADOFAi/scnEditor.cs` |
| 相关类型 | `scnEditor`、`SaveStateScope`、`LevelData`、`LevelEvent`、`FloorData`、`scrFloor` |
| 所属阶段 | 编辑器系统 |
| 主要职责 | 管理编辑器中较长的业务流程：打开关卡、保存关卡、新建关卡、选择地板、选择装饰、复制粘贴、添加事件、删除事件、撤销重做和播放预览。 |

`scnEditor` 的主类页面已经说明它是编辑器场景的入口。本页只展开源码里较长、跨多个系统的流程，避免把文件操作、选择系统、事件系统和播放预览混在同一个概览里。

## SaveStateScope

| 成员 | 行为 |
| --- | --- |
| `SaveStateScope(scnEditor editor, bool clearRedo = false, bool dataHasChanged = true, bool skipSaving = false)` | 保存传入的 `scnEditor` 引用；当 `skipSaving` 为 `false` 时调用 `editor.SaveState(clearRedo, dataHasChanged)`；随后递增 `editor.changingState`。 |
| `Dispose()` | 递减 `editor.changingState`。 |

`SaveStateScope` 位于 `7thRhythmSource/ADOFAi/SaveStateScope.cs`。它的作用不是直接修改关卡，而是把一次编辑操作包进状态保存区间：构造时保存当前状态并标记编辑器正在切换状态，释放时恢复 `changingState` 计数。`scnEditor` 的选择、剪切、粘贴、属性控件写回、事件增删和撤销重做都大量使用这个类型。

## 打开关卡流程

| 方法 | 行为 |
| --- | --- |
| `OpenLevel()` | 先通过 `CheckUnsavedChanges` 处理未保存变更；确认后暂停当前播放状态，并启动 `OpenLevelCo()`。 |
| `OpenLevel(string filePath)` | 直接暂停当前播放状态，启动 `OpenLevelCo(filePath)`，并关闭弹窗。 |
| `SanitizeLevelPath(string path)` | 移除路径中的 `file:` 前缀，并使用 `Uri.UnescapeDataString` 解码。 |
| `OpenLevelCo(string definedLevelPath = null)` | 等待文件对话框空闲，清除地板偏移线和撤销重做栈，读取文件或压缩包，调用 `customLevel.LoadLevel`，成功后重建路径、选择首块地板、刷新设置面板、重载资源和装饰；失败后恢复旧路径并弹出错误信息。 |
| `OpenRecent(bool checkCtrl = false)` | 读取 `Persistence.GetLastOpenedLevel()`；如果文件存在且没有被 Ctrl 打开目录逻辑拦截，就经过未保存检查后打开最近关卡。 |
| `FindAdofaiLevelOnDirectory(string path)` | 在目录内递归寻找 `.adofai` 文件，跳过 `backup.adofai` 和以点开头的文件。 |

`OpenLevelCo` 对压缩包有专门处理：当用户选择的扩展名属于 `GCS.levelZipExtensions`，编辑器会创建临时解压目录，调用 `ZipUtils.Unzip`，再用 `FindAdofaiLevelOnDirectory` 查找实际 `.adofai` 文件。解压失败会显示 `editor.notification.unzipFailed`，找不到关卡文件会显示 `editor.notification.levelNotFound`，并删除临时目录。

读取成功后的关键顺序是：`RemakePath()`、清空 `lastSelectedFloor`、`SelectFirstFloor()`、`UpdateSongAndLevelSettings()`、`customLevel.ReloadAssets(force: true, reloadDecorations: false)`、`UpdateDecorationObjects()`、更新 Discord presence、显示加载成功通知、清除 `unsavedChanges`。

## 保存与新建流程

| 方法 | 行为 |
| --- | --- |
| `SaveLevel()` | 如果 `ADOBase.levelPath` 非空，调用 `levelData.Encode()` 得到文本并写入路径；保存成功后显示通知、清除 `unsavedChanges`、关闭面板；Unity 编辑器环境下额外调用 `ExportInternalLevel()`。如果路径为空，转入 `SaveLevelAs()`。 |
| `SaveLevelAs(bool newLevel = false, string path = null)` | 启动 `SaveLevelAsCo(newLevel, path)`。 |
| `SaveLevelAsCo(bool newLevel = false, string path = null)` | 等待文件对话框空闲；无传入路径时弹出保存对话框；保存函数会规范路径、补 `.adofai` 后缀、更新 `customLevel.levelPath`、刷新文件名显示、更新最近目录和最近关卡，再调用 `SaveLevel()`。 |
| `NewLevel()` | 弹出保存对话框；用户选择路径后清除地板偏移、选择、装饰和事件数据，重置 `levelData`，刷新 settings、资源、装饰对象、路径、歌曲、撤销重做栈，并显示重置通知。 |

保存流程以 `levelData.Encode()` 为文本来源，最终写入通过 `RDFile.WriteAllText` 完成。新建流程并不是只创建空文件，它会把编辑器内的 `events`、`levelData.decorations`、`selectedDecorations`、撤销栈和重做栈一并清空，再重新生成路径和歌曲。

## 路径重建与编辑器显示

| 方法 | 行为 |
| --- | --- |
| `RemakePath(bool applyEventsToFloors = true, bool remakeLevel = true)` | 调用 `customLevel.RemakePath(applyEventsToFloors, remakeLevel)`，随后重绘地板偏移线、hold 显示、地板编号和多星体显示。 |
| `ApplyEventsToFloors()` | 调用 `customLevel.ApplyEventsToFloors(floors)`，然后重绘偏移线、hold 和多星体显示，并设置 `refreshDecSprites = true`。 |
| `DrawFloorNums()` | 根据 `showFloorNums`、`playMode` 和 `floor.isFake` 控制 `floor.editorNumText` 是否显示。 |
| `DrawHolds(bool unfillHolds = false)` | 转发到 `customLevel.levelMaker.DrawHolds(unfillHolds)`。 |
| `DrawMultiPlanet()` | 调用 `customLevel.levelMaker.DrawMultiPlanet()`；当返回值大于 3 且尚未警告时显示 `PopupType.Spoiler`。 |
| `DrawFloorOffsetLines()` | 清除旧连接线，遍历 `PositionTrack` 事件，根据 `positionOffset`、上一块地板位置、出射角和 tile size 生成 `LineRenderer` 偏移线。 |

`DrawFloorOffsetLines()` 会跳过 0 号地板、非 `PositionTrack` 事件、上一块地板处于 hold 的情况，以及事件属性 `justThisTile` 为 `true` 的情况。偏移线只用于编辑器表现，路径本身仍由 `customLevel.RemakePath` 和事件应用流程决定。

## 选择地板与装饰

| 方法 | 行为 |
| --- | --- |
| `SelectFloor(scrFloor floorToSelect, bool cameraJump = true)` | 用 `SaveStateScope` 包住选择操作；清除旧选择和选中色，添加目标地板，更新当前地板信息、选中色、相机跳转和选中状态。 |
| `SelectFirstFloor()` | 选择 `floors[0]` 并返回该地板。 |
| `NextFloor(scrFloor floor)` | 返回列表中目标地板之后的一块；越界时返回 `null`。 |
| `PreviousFloor(scrFloor floor)` | 返回列表中目标地板之前的一块；越界时返回 `null`。 |
| `MultiSelectFloors(scrFloor startFloor, scrFloor endFloor, bool setSelectPoint = false)` | 清除旧选择，按起止地板在 `floors` 中的索引形成连续多选，更新地板信息和选中色。 |
| `SearchByComment(string text)` | 在 `levelData.levelEvents` 中查找启用的 `EditorComment`，按注释文本包含关系返回去重后的 floor 序号数组。 |
| `SelectDecoration(LevelEvent levelEvent, ...)` | 在 `SaveStateScope` 中处理装饰选中；支持 Ctrl 反选、非 Shift/Ctrl 时清空其它选择、相机聚焦、选择框、gizmo、面板和装饰列表刷新。 |
| `DeselectDecoration(LevelEvent levelEvent)` | 多选装饰时移除目标装饰并重新选中列表最后一个；单选时转入全部取消装饰选择。 |

地板选择和装饰选择都会进入撤销状态系统，但多数选择操作传入 `dataHasChanged: false`，表示选择状态要记录，关卡数据本身没有变化。

## 复制、剪切与粘贴

| 方法 | 行为 |
| --- | --- |
| `CopyFloor(scrFloor toCopy, bool clearClipboard = true, bool cut = false, bool selectedEventOnly = false, bool allSameTypeEvents = false)` | 可选清空剪贴板，把 `CopyOfFloor` 结果加入 `clipboard`，设置 `clipboardContent = ClipboardContent.Floors`；非剪切时闪烁地板。 |
| `MultiCopyFloors(bool cut = false)` | 清空剪贴板后逐个复制 `selectedFloors`。 |
| `CutFloor(scrFloor toCut, bool clearClipboard = true, bool selectedEventOnly = false, bool allSameTypeEvents = false)` | 保存状态，复制地板或事件后删除对应事件或装饰，重新应用事件并刷新事件 tab 与指示器。 |
| `MultiCutFloors()` | 保存状态，复制多选地板后调用 `DeleteMultiSelection()`。 |
| `PasteFloors(bool alsoPasteDecorations = true)` | 要求剪贴板非空、内容类型为地板且当前单选；检查方向不能向后；保存状态后偏移后续事件 floor id，插入路径数据或角度数据，复制事件和附着装饰，重建路径、选择粘贴后的地板并闪烁。 |
| `CopyDecoration(LevelEvent toCopy, bool clearClipboard = true, bool cut = false)` | 非拖拽状态下复制装饰事件，设置 `clipboardContent = ClipboardContent.Decorations`。 |
| `MultiCopyDecorations()` | 按装饰在 `levelData.decorations` 中的顺序复制当前装饰选择。 |
| `CutDecoration(LevelEvent toCut)` | 保存状态，复制目标装饰并调用 `RemoveEvent(toCut)`。 |
| `MultiCutDecorations()` | 保存状态，复制多选装饰并删除多选装饰。 |
| `PasteDecorations(bool duplicating = false)` | 要求剪贴板为装饰类型且非拖拽；有地板选择时把装饰转为相对 tile 放置并设置 floor，无地板选择时直接复制装饰数据。 |
| `PasteEvents(scrFloor targetFloor, FloorData floorData, bool alsoPasteDecorations = true, bool overwrite = true, bool selectAfterward = true, bool updateFloors = true)` | 从 `FloorData` 复制事件到目标地板；可覆盖同地板旧事件、同步复制附着装饰、重应用事件、选中目标地板并打开对应事件面板。 |

`PasteEvents` 有多层规则：首块地板会检查 `allowFirstFloorCheck`，solo 类型不会重复添加，同一地板上的 `Hold` 与 `Pause` 互斥，`FreeRoam` 与 `Twirl` 互斥。带背景图的事件会设置 `refreshBgSprites`，装饰事件会设置 `refreshDecSprites`。

## 添加与删除事件

| 方法 | 行为 |
| --- | --- |
| `AddEventAtSelected(LevelEventType eventType)` | 要求单选地板，且锁定路径编辑时事件类型必须在白名单内；检查 `Hold/Pause`、`FreeRoam/Twirl`、最后一块地板添加 `FreeRoam` 等互斥规则；保存状态后添加、切换或移除事件，并刷新地板事件和指示器。 |
| `AddEvent(int floorID, LevelEventType eventType)` | 创建 `LevelEvent` 并加入 `events`；在条件满足时继承当前选中事件的 `angleOffset`；`SetHitsound` 会继承前一个同 game sound 的音量；`SetFilterAdvanced` 会设置 `isNewlyAdded`。 |
| `AddDecoration(LevelEventType eventType, int index = -1)` | 创建装饰事件并插入到装饰列表。 |
| `AddDecoration(LevelEvent dec, int index = -1)` | 保存状态，将装饰插入 `levelData.decorations`，并通过 `scrDecorationManager.instance.CreateDecoration` 创建对象。 |
| `CreateDecoration(LevelEventType eventType)` | 创建 floor 为 `-1` 的装饰事件；如果当前单选地板，则使用 `DecPlacementType.Tile` 并设置地板和零位置，否则使用当前相机位置除以 tile size。 |
| `RemoveEventAtSelected(LevelEventType eventType)` | 对装饰事件转入删除多选装饰；普通事件根据当前 tab 索引删除选中地板上的对应事件，刷新 tab、事件应用、指示器和地板按钮位置；删除 `Hold` 时重建路径。 |

`FreeRoam` 的添加有附加生成逻辑：如果下一块地板没有 `PositionTrack`，会在下一块地板创建 `PositionTrack`，根据当前地板的 `exitangle` 写入 `positionOffset`，并创建一个 `MoveCamera`，设置 `relativeTo = CamMovementType.Player`。

## 撤销与重做

| 方法 | 行为 |
| --- | --- |
| `Undo()` | 调用 `UndoOrRedo(redo: false)`。 |
| `Redo()` | 调用 `UndoOrRedo(redo: true)`。 |
| `UndoOrRedo(bool redo)` | 当 `changingState != 0` 或目标状态栈为空时直接返回；在 `SaveStateScope(clearRedo: false, dataHasChanged)` 中恢复 `LevelState`，重建路径和装饰，恢复装饰选择、地板选择、事件面板、settings 面板和粒子编辑器。 |
| `SaveState(bool clearRedo = true, bool dataHasChanged = true)` | 当编辑器未初始化或正在切换状态时返回；复制当前 `levelData`，记录地板选择、装饰索引、settings 面板选中事件、地板事件 tab 和 tab 索引；加入 `undoStates`，必要时清空 `redoStates`，并限制撤销栈最多 100 项。 |

`UndoOrRedo` 恢复状态后会删除已消费的栈顶状态。撤销时会先把当前撤销栈顶移入 `redoStates`；重做时则直接从 `redoStates` 读取。`dataHasChanged` 会影响 `SaveState` 是否设置 `unsavedChanges = true`。

## 播放预览

| 方法 | 行为 |
| --- | --- |
| `Play()` | 当地板数只有 1 时返回；解锁输入，设置快捷播放速度，缓存当前地板或装饰选择，清理 UI 选中、弹窗阻挡、地板光效和编号，启用 conductor，重建路径，设置 checkpoint，重载资源并调用 `customLevel.Play(num)`。 |
| `ClearFloorGlows()` | 关闭所有地板的 bottom glow 和 top glow。 |
| `PauseIfUnpaused()` | 当前未暂停时调用 `TogglePause()`。 |
| `TogglePause(bool clsToEditor = false)` | 调用 `ResetScene(clsToEditor)`。 |
| `ResetScene(bool clsToEditor = false)` | 重置自动失败标记；必要时隐藏 inspector、刷新 settings；调用 `customLevel.ResetScene(true)`，清理装饰刷新、拖拽缓存和 UI 选中对象。 |

`Play()` 会把 `GCS.checkpointNum` 设置为缓存的起始地板，并把 `GCS.editorQuickPitchedPlaying` 设置为是否按住 Ctrl。播放前还会禁用难度选择、no fail 按钮和 unlock key limiter 按钮，并让 `scrDecorationManager` 隐藏空装饰、关闭编辑器点击碰撞。

## 相关页面

- [scnEditor](/api/core/scnEditor.md)
- [ADOFAI.Editor.Actions](/api/editor/editor-actions.md)
- [InspectorPanel](/api/editor/InspectorPanel.md)
- [PropertiesPanel](/api/editor/PropertiesPanel.md)
- [编辑器长流程](/modules/editor-workflows.md)
