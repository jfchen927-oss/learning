# 🌍 Learning Projects

> 学习笔记和项目集合 / Learning notes and projects

[![GitHub](https://img.shields.io/badge/GitHub-jfchen927--oss-blue?logo=github)](https://github.com/jfchen927-oss)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

这个仓库包含了一系列独立的学习项目，涵盖 **3D 可视化**、**数学建模**、**AI 模型研究** 等领域。

每个项目都在 `projects/` 目录下的独立文件夹中，可以单独运行。

---

## 📁 项目结构

```
learning/
├── projects/                      # 项目集合
│   ├── earth-monitor/            # 🌍 3D 实时活动地球
│   │   ├── index.html
│   │   └── main.js
│   │
│   ├── mcm-flowchart/            # 📊 科研流程图
│   │   ├── index.html            # 展示页面
│   │   ├── moon_colony_flowchart_research.png
│   │   ├── moon_colony_flowchart_research.svg
│   │   ├── moon_colony_flowchart.mmd
│   │   └── generate_flowchart.py
│   │
│   └── vision-model-research/    # 🤖 视觉模型调研
│       └── report.md             # 居家助手跌倒检测模型分析
│
└── README.md                     # 本文件
```

---

## 🚀 在线预览

| 项目 | 预览链接 | 说明 |
|------|----------|------|
| 🌍 **实时活动地球** | [在线查看](https://5ca5a481281e62be-23-97-62-116.serveousercontent.com) | Three.js 3D 可视化 |
| 📊 **MCM 流程图** | [在线查看](https://5ca5a481281e62be-23-97-62-116.serveousercontent.com/projects/mcm-flowchart/) | 太空电梯月球殖民物流系统 |

> ⚠️ 注意：Serveo 链接是临时的，如果失效请本地运行

---

## 📂 项目详情

### 🌍 项目一：实时活动地球 (earth-monitor)

基于 **Three.js** 的 3D 可视化项目，展示全球实时活动数据。

**特性：**
- 🌏 3D 旋转地球模型（带大气光晕效果）
- ✨ 星空背景（3000+ 随机星星）
- 📍 20 个全球主要城市标记（带脉冲动画）
- 🔗 城市间动态数据流连线
- 🖱️ 鼠标交互（悬停高亮、点击选中、拖拽旋转）
- 📊 实时模拟数据面板

**技术栈：** Three.js r128 + HTML5 Canvas

**本地运行：**
```bash
cd projects/earth-monitor
python -m http.server 8080
# 访问 http://localhost:8080
```

---

### 📊 项目二：MCM 流程图 (mcm-flowchart)

**2026 MCM Problem B** 数学建模竞赛题目的科研级流程图。

**研究主题：** 利用太空电梯系统为 10 万人口的月球殖民地进行物资运输的数学建模。

**文件说明：**
| 文件 | 格式 | 用途 |
|------|------|------|
| `moon_colony_flowchart_research.png` | PNG (5970×4170) | 高清位图，适合打印 |
| `moon_colony_flowchart_research.svg` | SVG | 矢量图，可无限放大 |
| `moon_colony_flowchart.mmd` | Mermaid | 源码，可二次编辑 |
| `generate_flowchart.py` | Python | 生成脚本（需 matplotlib）|

**本地查看：**
```bash
cd projects/mcm-flowchart
python -m http.server 8080
# 访问 http://localhost:8080
```

---

### 🤖 项目三：视觉模型调研 (vision-model-research)

**科研级调研报告：** 8B参数以内轻量级视觉模型对比分析，用于居家助手跌倒检测。

**研究内容：**
- 📊 5 大模型家族对比（YOLOv8、YOLOv5、YOLO-NAS、MobileNet、EfficientDet）
- 🔬 详细参数验证（参数量、FLOPs、mAP、推理速度）
- 📉 量化分析（INT8/FP16 压缩比、精度损失）
- 🏠 边缘设备部署建议（Raspberry Pi / Jetson / NUC）
- 💰 成本效益分析

**核心结论：**
- 🥇 推荐模型：**YOLOv8n (INT8)** - 仅 3.2M 参数，量化后 1.6MB
- 🏠 适用场景：边缘计算、本地部署、实时监测
- 📈 性能指标：Raspberry Pi 4 上 11.8 FPS，跌倒检测精度 87.3% mAP

**查看报告：**
```bash
# 直接阅读 Markdown
cat projects/vision-model-research/report.md

# 或使用 Markdown 阅读器
# 推荐使用 Typora / VS Code 预览
```

**报告亮点：**
| 指标 | YOLOv8n | YOLOv8n-pose |
|------|---------|--------------|
| 参数量 | 3.2M | 3.3M |
| 模型大小 | 6.2 MB | 6.4 MB |
| INT8 量化后 | 1.6 MB | 1.7 MB |
| Pi 4 延迟 | 85ms | 131ms |
| 精度 (mAP) | 37.3% | 50.4% |

---

## 🛠️ 快速开始

### 克隆仓库
```bash
git clone https://github.com/jfchen927-oss/learning.git
cd learning
```

### 运行任意项目
```bash
# 进入项目目录
cd projects/earth-monitor    # 或 projects/mcm-flowchart

# 启动本地服务器
python -m http.server 8080

# 浏览器访问 http://localhost:8080
```

---

## 📚 学习资源

### 项目一相关
- [Three.js 官方文档](https://threejs.org/docs/)

### 项目二相关
- [MCM 数学建模竞赛](https://www.comap.com/undergraduate/contests/)
- [Mermaid 流程图语法](https://mermaid.js.org/)

### 项目三相关
- [Ultralytics YOLOv8 官方文档](https://docs.ultralytics.com/models/yolov8/)
- [TensorRT 量化指南](https://docs.nvidia.com/deeplearning/tensorrt/)
- [UR Fall Detection Dataset](http://fenix.univ.rzeszow.pl/mkepski/ds/uf.html)

---

## 🤝 如何添加新项目

1. 在 `projects/` 下创建新文件夹
2. 放入项目文件（建议包含 `index.html` 作为入口，或 `README.md` 作为说明）
3. 在本 README 中添加项目说明
4. 提交并推送

```bash
mkdir projects/my-new-project
cd projects/my-new-project
# ... 创建你的项目文件
git add .
git commit -m "Add new project: my-new-project"
git push
```

---

## 📝 许可证

[MIT](LICENSE) © 2026 jfchen927-oss

---

## 🙏 致谢

- 项目由 [Orange](https://github.com/openclaw/openclaw) 🍊 AI 助手协助创建
- 3D 地球使用 Three.js 开源库
- 视觉模型调研基于 Ultralytics YOLO 系列文档

---

<p align="center">
  <sub>Built with ❤️ by Orange 🍊</sub>
</p>
