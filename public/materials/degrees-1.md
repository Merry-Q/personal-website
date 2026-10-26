# AIShuzipuAU

Logic Pro 里的本地级数谱 AU 插件。音频分析在 Mac 上完成，不上传文件，也不连接账号或云端服务。

插件代码 `AISS`，厂商标识 `Aisz`，产物是 `AIShuzipuAU.component`。最低系统是 macOS 12，同时包含 arm64 和 x86_64。

## 当前做了什么

- 用文件对话框加载 WAV、MP3、FLAC，并显示文件名、时长、采样率。
- 本地做调性、节拍、段落、和弦和级数。算法是可替换的 C++ 接口，失败时返回说明，不让插件崩溃。
- 段落边界可以拖拽。调性可以手改。转调点之后按新调重算级数。
- 置信度低于 70% 的和弦标黄。
- 导出 JSON 和纯文本。ChordPro、MIDI 只保留接口，点击后说明 MVP 尚未实现。
- 插件挂在音轨上时原样通过音频，不改声。

## 还没做什么

- 没有 VST3、ARA、Windows 版本。
- 没有云端模型，也没有 Python 子进程。以后如果要换本地模型，替换 `IAnalysisEngine`，仍然不能访问网络。
- 段落标签来自能量和音色相似度，不是人工标注模型。
- 节拍不稳时，和弦退回 0.5 秒网格。
- 超过 15 分钟的音频只分析开头 15 分钟。
- 不能在时间轴上逐个改和弦。ChordPro 和 MIDI 还不能导出真正的文件。

## 在 macOS 上构建

需要 Xcode 14 或更新版本，以及 Git。JUCE 固定为 8.0.15。构建机器需要能访问 GitHub 一次；插件运行时不需要网络。

```bash
git clone <你的仓库地址>
cd 级数谱插件
chmod +x scripts/build-au.sh
./scripts/build-au.sh
```

等价命令：

```bash
cmake -B build -G Xcode \
  -DCMAKE_OSX_DEPLOYMENT_TARGET=12.0 \
  -DCMAKE_OSX_ARCHITECTURES="arm64;x86_64"
cmake --build build --config Release --target AIShuzipuEngineTests
ctest --test-dir build -C Release --output-on-failure
cmake --build build --config Release --target AIShuzipuAU_AU
```

只编当前芯片时，把架构改成 `arm64` 或 `x86_64`。已经下载过 JUCE 时，可以跳过拉取：

```bash
cmake -B build -G Xcode -DJUCE_SOURCE_DIR="$HOME/src/JUCE"
```

编完后确认两种架构都在：

```bash
lipo -info build/AIShuzipuAU_artefacts/Release/AU/AIShuzipuAU.component/Contents/MacOS/AIShuzipuAU
```

本机试加载前做一次 ad-hoc 签名：

```bash
codesign --force --deep --sign - build/AIShuzipuAU_artefacts/Release/AU/AIShuzipuAU.component
```

正式分发需要 Apple Developer ID，ad-hoc 签名不能代替它。

Windows 不能生成 AU。在 Windows 上只能验证分析引擎：

```powershell
cmake -B build
cmake --build build --config Release --target AIShuzipuEngineTests
ctest --test-dir build -C Release --output-on-failure
```

## 安装到 Logic Pro

把 `AIShuzipuAU.component` 拷到下面其中一个目录。用户目录不需要管理员权限。

- 用户级：`~/Library/Audio/Plug-Ins/Components/`
- 系统级：`/Library/Audio/Plug-Ins/Components/`

```bash
mkdir -p ~/Library/Audio/Plug-Ins/Components
cp -R build/AIShuzipuAU_artefacts/Release/AU/AIShuzipuAU.component ~/Library/Audio/Plug-Ins/Components/
```

让 Logic 重新扫描：

1. 完全退出 Logic Pro。
2. 如果刚装好却没出现，在终端执行 `killall -9 AudioComponentRegistrar`，再打开 Logic。
3. 打开 Logic Pro → 设置 → 插件管理器。
4. 找到 AIShuzipu / AIShuzipuAU。如果没有，选中列表后使用「重新扫描」，或重置并重新扫描。
5. 确认插件已勾选启用。
6. 在音频轨的 Audio FX 插槽里搜索 AIShuzipuAU。它是效果器，声音会原样通过，分析使用插件里加载的文件。

命令行检查：

```bash
auval -v aufx AISS Aisz
```

`aufx` 是效果器类型，`AISS` 是插件代码，`Aisz` 是厂商代码。

## 编译失败时怎么处理

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 提示当前不是 macOS，没有 AU 目标 | 在 Windows 或 Linux 上配置 | AU 只能在 macOS 上编。这里先跑 `AIShuzipuEngineTests` |
| 部署版本必须 >= 12.0 | `CMAKE_OSX_DEPLOYMENT_TARGET` 低于 12 | 删掉 `build`，加上 `-DCMAKE_OSX_DEPLOYMENT_TARGET=12.0` |
| 拉取 JUCE 需要 Git | 没装命令行工具 | 安装 Xcode Command Line Tools，或设置 `-DJUCE_SOURCE_DIR` |
| FetchContent 连不上 GitHub | 构建机没有网络，或标签不存在 | 确认能访问 github.com，或改用本机 JUCE 8.0.15 源码目录 |
| `lipo` 只有一种架构 | 配置时覆盖了通用二进制 | 重新配置 `-DCMAKE_OSX_ARCHITECTURES="arm64;x86_64"` |
| Logic 里看不到插件 | 拷错目录，或组件缓存没刷新 | 确认 Components 目录，退出 Logic，执行 `killall -9 AudioComponentRegistrar` 后再扫描 |
| `auval` 找不到 AISS / Aisz | 组件没签名或没安装到扫描目录 | 先 ad-hoc 签名，再确认安装路径 |
| FLAC 打不开 | JUCE 编译时关掉了 `JUCE_USE_FLAC` | 保持默认开启。失败时插件会提示改用 WAV 或 MP3，不会崩溃 |
| 测试程序找不到 | Xcode 生成器把可执行文件放在配置子目录 | 用 `ctest --test-dir build -C Release --output-on-failure`，不要猜路径 |

JUCE 本体使用 AGPLv3 或商业授权。这个仓库没有关闭 JUCE 启动画面。分发插件前需要确认你的 JUCE 授权。

## 模块

- `PluginProcessor` / `PluginEditor`：AU 外壳和界面。音频线程只做直通。
- `AnalysisEngine`：串联特征、调性、节拍、段落、和弦、级数。
- `ChordEngine`：大三、小三、属七、大七、小七、挂二、挂四、加九、减七和斜杠和弦。
- `DegreeEngine`：按当前调性和转调点生成 `1`、`5`、`6m7`、`2m7`、`4maj7`，以及副属、借用、斜杠标记。
- `ExportEngine`：JSON、纯文本，以及 ChordPro / MIDI 占位。

级数以同主音大调音阶为参照。C 调里的 Am7 记成 `6m7`，D7 记成 `57/5`，Bb 记成 `b7`。小调里的属和弦大三和弦仍记成 `5`。降七级上的属七和弦记成 `b7dom7`，避免和 `b77` 混淆。

## GitHub Actions

`.github/workflows/build-au.yml` 在 macOS runner 上运行引擎测试、编译 `.component`、做 ad-hoc 签名并上传产物。运行时不会上传任何音频。
