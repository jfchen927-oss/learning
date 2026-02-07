import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np

# 设置中文字体
plt.rcParams['font.family'] = ['DejaVu Sans', 'Arial Unicode MS', 'SimHei']
plt.rcParams['axes.unicode_minus'] = False

fig, ax = plt.subplots(1, 1, figsize=(20, 14))
ax.set_xlim(0, 20)
ax.set_ylim(0, 14)
ax.axis('off')
ax.set_facecolor('#0a0a1a')
fig.patch.set_facecolor('#0a0a1a')

# 颜色方案 - 科研风格
colors = {
    'input': '#1e3a5f',
    'scenario': '#4a3728',
    'elevator': '#1b4332',
    'rocket': '#5c2828',
    'calc': '#3d1f5f',
    'output': '#5c4819',
    'optimize': '#1f4f4f',
    'decision': '#4a1a3d',
    'arrow': '#4a90d9',
    'text': '#ffffff',
    'border': '#6a9fd4'
}

def draw_box(ax, x, y, w, h, color, title, content, border_color=None):
    """绘制带标题的框"""
    if border_color is None:
        border_color = color
    
    # 主框
    box = FancyBboxPatch((x, y), w, h, 
                          boxstyle="round,pad=0.02,rounding_size=0.15",
                          facecolor=color, edgecolor=border_color, 
                          linewidth=2, alpha=0.9)
    ax.add_patch(box)
    
    # 标题栏
    title_box = FancyBboxPatch((x, y+h-0.5), w, 0.5,
                                boxstyle="round,pad=0.02,rounding_size=0.1",
                                facecolor=border_color, edgecolor=border_color,
                                linewidth=1, alpha=1)
    ax.add_patch(title_box)
    
    # 标题文字
    ax.text(x + w/2, y + h - 0.25, title, 
            ha='center', va='center', fontsize=10, fontweight='bold',
            color='white')
    
    # 内容文字
    ax.text(x + w/2, y + h/2 - 0.2, content,
            ha='center', va='center', fontsize=8,
            color='white', wrap=True, linespacing=1.5)
    
    return (x + w/2, y + h, x + w/2, y)  # 返回上下中点坐标

def draw_arrow(ax, start, end, color='#4a90d9', style='->'):
    """绘制箭头"""
    ax.annotate('', xy=end, xytext=start,
                arrowprops=dict(arrowstyle='->', color=color, lw=2,
                              connectionstyle='arc3,rad=0'))

def draw_dashed_arrow(ax, start, end, color='#888888'):
    """绘制虚线箭头（反馈）"""
    ax.annotate('', xy=end, xytext=start,
                arrowprops=dict(arrowstyle='->', color=color, lw=1.5,
                              connectionstyle='arc3,rad=0.2',
                              linestyle='dashed'))

# 标题
ax.text(10, 13.5, 'Space Elevator Moon Colony Logistics System', 
        ha='center', va='center', fontsize=18, fontweight='bold', color='#4a90d9')
ax.text(10, 13.1, 'Mathematical Model Architecture - 2026 MCM Problem B', 
        ha='center', va='center', fontsize=11, color='#888888')

# 第一行: 输入和场景
draw_box(ax, 0.5, 10.5, 4, 2, colors['input'], 'INPUT PARAMETERS',
         'Colony: 100,000 people\nMaterials: 100M MT\nStart: Year 2050\nWater: Annual req.',
         '#2d5aa0')

draw_box(ax, 5.5, 10.5, 4, 2, colors['scenario'], 'SCENARIOS',
         'A: Space Elevator Only\nB: Rockets Only\nC: Hybrid Approach',
         '#d4896a')

# 第二行: 两个系统模型
draw_box(ax, 0.5, 6.5, 4.5, 3.5, colors['elevator'], 'SPACE ELEVATOR MODEL',
         '3 Galactic Harbours @ 120°\nCapacity: 179,000 MT/year each\n2-Stage: Port→Apex→Moon\nTether: 100,000 km graphene\nSwaying tolerance model\nElevator failure rate',
         '#2d6a4f')

draw_box(ax, 6, 6.5, 4.5, 3.5, colors['rocket'], 'ROCKET MODEL',
         '10 Global Launch Sites\nPayload: 100-150 MT/launch\nCost per launch model\nFailure rate analysis\nEnvironmental impact factor',
         '#a04040')

# 第三行: 核心计算
draw_box(ax, 0.5, 3, 10, 3, colors['calc'], 'CORE CALCULATION MODULE',
         'Transport Timeline: T_total = Σ(T_elevator + T_rocket)\n' +
         'Cost Model: C_total = C_fixed + C_variable × MT\n' +
         'Reliability: R_system = Π R_i\n' +
         'Water Logistics: V_water = P × 365 × r_consumption',
         '#5a2d8a')

# 第四行: 输出
draw_box(ax, 0.5, 0.3, 2.3, 2.3, colors['output'], 'COST',
         'Total Cost\nComparison', '#b8860b')

draw_box(ax, 3.1, 0.3, 2.3, 2.3, colors['output'], 'TIMELINE',
         'Construction\nDuration', '#b8860b')

draw_box(ax, 5.7, 0.3, 2.3, 2.3, colors['output'], 'ENVIRONMENT',
         'Impact\nAssessment', '#b8860b')

draw_box(ax, 8.3, 0.3, 2.3, 2.3, colors['output'], 'RELIABILITY',
         'System\nRobustness', '#b8860b')

# 右侧: 优化和决策
draw_box(ax, 11.5, 9, 4, 2.5, colors['optimize'], 'OPTIMIZATION',
         'Multi-Objective:\nmin(Cost, Time, Impact)\nSensitivity Analysis\nRisk Mitigation',
         '#2d8a8a')

draw_box(ax, 15.8, 9, 3.7, 2.5, colors['decision'], 'DECISION',
         'Recommended\nStrategy', '#8a2d6a')

draw_box(ax, 11.5, 5.5, 8, 3, colors['decision'], 'FINAL OUTPUT',
         'Implementation Roadmap\nLetter to MCM Agency\n', '#8a2d6a')

draw_box(ax, 11.5, 0.3, 8, 4.8, colors['input'], 'KEY EQUATIONS',
         'Elevator Transport Time:\nT_e = Distance / Velocity + Load/Unload\n\n' +
         'Rocket Transport Time:\nT_r = Launch window + Flight duration\n\n' +
         'Total System Cost:\nC = Σ(C_e × n_elevator) + Σ(C_r × n_rocket)\n\n' +
         'System Reliability:\nR(t) = e^(-λt)  (exponential decay)\n\n' +
         'Water Requirement:\nW = N_people × r_water × 365 days',
         '#2d5aa0')

# 绘制箭头连接
# 输入 -> 场景
draw_arrow(ax, (2.5, 10.5), (5.5, 11.5))

# 场景 -> 两个系统
draw_arrow(ax, (7.5, 10.5), (2.75, 10))
draw_arrow(ax, (7.5, 10.5), (8.25, 10))

# 系统 -> 计算模块
draw_arrow(ax, (2.75, 6.5), (3, 6))
draw_arrow(ax, (8.25, 6.5), (7, 6))

# 计算 -> 输出
draw_arrow(ax, (3, 3), (1.65, 2.6))
draw_arrow(ax, (4.5, 3), (4.25, 2.6))
draw_arrow(ax, (6, 3), (6.85, 2.6))
draw_arrow(ax, (7.5, 3), (9.45, 2.6))

# 输出 -> 优化
draw_arrow(ax, (5.5, 0.3), (11.5, 8.5))

# 优化 -> 决策
draw_arrow(ax, (13.5, 9), (15.8, 10.25))

# 决策 -> 最终输出
draw_arrow(ax, (17.65, 9), (17.5, 8.5))

# 反馈箭头 (虚线)
draw_dashed_arrow(ax, (13.5, 9), (2.5, 12.5))  # 优化 -> 输入
draw_dashed_arrow(ax, (2.75, 6.5), (3, 4.5))   # 电梯故障 -> 计算
draw_dashed_arrow(ax, (8.25, 6.5), (7, 4.5))   # 火箭失败 -> 计算

# 添加图例
legend_elements = [
    mpatches.Patch(facecolor=colors['input'], edgecolor='#2d5aa0', label='Input/Parameters'),
    mpatches.Patch(facecolor=colors['scenario'], edgecolor='#d4896a', label='Scenarios'),
    mpatches.Patch(facecolor=colors['elevator'], edgecolor='#2d6a4f', label='Elevator System'),
    mpatches.Patch(facecolor=colors['rocket'], edgecolor='#a04040', label='Rocket System'),
    mpatches.Patch(facecolor=colors['calc'], edgecolor='#5a2d8a', label='Core Calculations'),
    mpatches.Patch(facecolor=colors['output'], edgecolor='#b8860b', label='Output Metrics'),
    mpatches.Patch(facecolor=colors['optimize'], edgecolor='#2d8a8a', label='Optimization'),
    mpatches.Patch(facecolor=colors['decision'], edgecolor='#8a2d6a', label='Decision'),
]
ax.legend(handles=legend_elements, loc='upper left', bbox_to_anchor=(0.02, 0.98),
          facecolor='#1a1a2e', edgecolor='#4a90d9', labelcolor='white', fontsize=8)

# 添加注释框
ax.text(10, 0.05, 
        'Figure 1: System Architecture for Space Elevator Moon Colony Logistics Model (2026 MCM Problem B)',
        ha='center', va='bottom', fontsize=9, color='#666666', style='italic')

plt.tight_layout()
plt.savefig('moon_colony_flowchart_research.png', 
            dpi=300, bbox_inches='tight', facecolor='#0a0a1a', edgecolor='none')
plt.savefig('moon_colony_flowchart_research.svg', 
            bbox_inches='tight', facecolor='#0a0a1a', edgecolor='none')
print("Research-level flowchart generated successfully!")
print("Files: moon_colony_flowchart_research.png & .svg")
