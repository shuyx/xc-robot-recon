# XC-RECON-V2 项目文档索引

**最后更新**: 2025-07-19  
**文档版本**: v1.0  
**维护者**: Kevin Yuan

---

## 📖 文档概述

本文档库包含XC-RECON-V2项目重构所需的所有背景资料、技术文档、设计规范和测试指南。这些文档是从原始xc-robot项目中精选和整理的核心资料，为开发团队提供全面的技术参考。

## 🗂️ 文档结构

### 📁 [technical/](./technical/) - 技术文档
系统架构、技术栈和核心概念的详细说明

| 文件名 | 描述 | 重要程度 | 用途 |
|--------|------|----------|------|
| [xc_os_context.md](./technical/xc_os_context.md) | **项目核心背景** | ⭐⭐⭐⭐⭐ | 了解项目定位、硬件配置、技术栈 |
| [PROJECT_TECHNICAL_OVERVIEW.md](./technical/PROJECT_TECHNICAL_OVERVIEW.md) | **技术全览** | ⭐⭐⭐⭐⭐ | 系统架构、目录结构、模块功能 |
| [GUI_DESCRIPTION.md](./technical/GUI_DESCRIPTION.md) | **GUI界面功能说明** | ⭐⭐⭐⭐ | PyQt5界面布局和功能详解 |

### 📁 [hardware/](./hardware/) - 硬件文档
机器人硬件、控制协议和配置说明

| 文件名 | 描述 | 重要程度 | 用途 |
|--------|------|----------|------|
| [FR3_ROBOT_ANALYSIS.md](./hardware/FR3_ROBOT_ANALYSIS.md) | **FR3机械臂分析** | ⭐⭐⭐⭐⭐ | 运动学模型、DH参数、控制接口 |
| [fr3_control_doc.md](./hardware/fr3_control_doc.md) | **FR3控制文档** | ⭐⭐⭐⭐ | 机械臂控制API和编程接口 |
| [hermes_control_doc.md](./hardware/hermes_control_doc.md) | **Hermes底盘控制** | ⭐⭐⭐⭐ | 移动底盘控制和导航API |
| [gemini335_control_doc.md](./hardware/gemini335_control_doc.md) | **视觉系统文档** | ⭐⭐⭐ | 相机集成和视觉处理 |
| [robot_config_reference.json](./hardware/robot_config_reference.json) | **配置参考** | ⭐⭐⭐ | 硬件配置参数和网络设置 |

### 📁 [design/](./design/) - 设计文档
UI设计、组件规范和用户体验指南

| 文件/目录 | 描述 | 重要程度 | 用途 |
|-----------|------|----------|------|
| [design_reference/](./design/design_reference/) | **完整设计参考** | ⭐⭐⭐⭐⭐ | UI/UX设计规范和实现指南 |
| [component_specs.md](./design/design_reference/component_specs.md) | **组件规范** | ⭐⭐⭐⭐ | PyQt5组件实现规格 |
| [style_guide.md](./design/design_reference/style_guide.md) | **样式指南** | ⭐⭐⭐⭐ | 视觉设计和交互规范 |
| [ui_mockups/](./design/design_reference/ui_mockups/) | **UI原型** | ⭐⭐⭐⭐⭐ | HTML界面原型和设计参考 |
| [Smartinterface_Planning_doc.md](./design/Smartinterface_Planning_doc.md) | **智能交互模块设计** | ⭐⭐⭐⭐ | AI交互界面设计方案 |

### 📁 [testing/](./testing/) - 测试文档
测试计划、测试程序和质量保证指南

| 文件名 | 描述 | 重要程度 | 用途 |
|--------|------|----------|------|
| [Testing_Plan.md](./testing/Testing_Plan.md) | **综合测试规划** | ⭐⭐⭐⭐⭐ | 系统测试策略和安全规范 |
| [Testing_Programs_Guide.md](./testing/Testing_Programs_Guide.md) | **测试程序指南** | ⭐⭐⭐⭐ | 测试代码编写和执行规范 |

### 📁 [development/](./development/) - 开发文档
开发指南、部署说明和集成文档

| 文件名 | 描述 | 重要程度 | 用途 |
|--------|------|----------|------|
| [DEPLOYMENT_GUIDE.md](./development/DEPLOYMENT_GUIDE.md) | **部署指南** | ⭐⭐⭐⭐ | 环境配置和问题解决 |
| [dual_arm_integration_guide.md](./development/dual_arm_integration_guide.md) | **双臂集成指南** | ⭐⭐⭐⭐ | 双机械臂协调控制实现 |
| [CROSS_PLATFORM_SOLUTION.md](./development/CROSS_PLATFORM_SOLUTION.md) | **跨平台开发方案** | ⭐⭐⭐ | Mac/Windows协作开发解决方案 |

---

## 🎯 快速导航

### 新团队成员必读 📚
1. **[xc_os_context.md](./technical/xc_os_context.md)** - 了解项目背景和目标
2. **[PROJECT_TECHNICAL_OVERVIEW.md](./technical/PROJECT_TECHNICAL_OVERVIEW.md)** - 掌握技术架构
3. **[FR3_ROBOT_ANALYSIS.md](./hardware/FR3_ROBOT_ANALYSIS.md)** - 理解硬件平台

### 前端开发者关注 🎨
1. **[design_reference/](./design/design_reference/)** - UI/UX设计规范
2. **[component_specs.md](./design/design_reference/component_specs.md)** - 组件实现规格
3. **[ui_mockups/](./design/design_reference/ui_mockups/)** - 界面原型参考

### 后端开发者关注 ⚙️
1. **[FR3_ROBOT_ANALYSIS.md](./hardware/FR3_ROBOT_ANALYSIS.md)** - 机械臂控制接口
2. **[dual_arm_integration_guide.md](./development/dual_arm_integration_guide.md)** - 双臂集成
3. **[Testing_Plan.md](./testing/Testing_Plan.md)** - 测试和验证策略

### 系统集成者关注 🔧
1. **[DEPLOYMENT_GUIDE.md](./development/DEPLOYMENT_GUIDE.md)** - 部署和配置
2. **[robot_config_reference.json](./hardware/robot_config_reference.json)** - 配置参数
3. **[Testing_Programs_Guide.md](./testing/Testing_Programs_Guide.md)** - 测试执行

---

## 📋 使用指南

### 如何使用这些文档

#### 📖 阅读顺序建议
1. **理解背景** → `xc_os_context.md`
2. **掌握架构** → `PROJECT_TECHNICAL_OVERVIEW.md`
3. **选择专业领域** → 根据角色选择相关文档
4. **深入细节** → 阅读具体实现文档

#### 🔍 AI助手参考指南
当您需要AI助手帮助时，可以这样引用：

```
@docs/technical/xc_os_context.md - 了解项目背景和约束
@docs/hardware/FR3_ROBOT_ANALYSIS.md - 获取机械臂技术细节
@docs/design/design_reference/ - 参考UI/UX设计规范
@docs/testing/Testing_Plan.md - 了解测试要求和安全规范
```

#### 📝 文档维护
- **更新频率**: 每个开发阶段结束后更新
- **版本控制**: 重要变更记录在git commit中
- **责任分工**: 各模块负责人维护相关文档

---

## 🔄 项目背景说明

### 原始项目概况
- **项目名称**: XC-ROBOT 轮式双臂类人形机器人控制系统
- **技术栈**: Python + PyQt5 + VTK + FR3 API
- **硬件平台**: FR3双机械臂 + Hermes移动底盘
- **开发阶段**: MVP1.0版本，功能完整

### 重构项目目标
- **项目名称**: XC-RECON-V2 现代化重构
- **技术栈**: FastAPI + Vue 3 + TypeScript + Element Plus
- **架构模式**: 前后端分离，微服务架构
- **开发目标**: 企业级应用，可扩展性和维护性

### 文档价值
这些文档为重构项目提供：
1. **需求理解**: 完整的功能需求和技术约束
2. **技术参考**: 硬件接口、协议规范、算法实现
3. **设计指导**: UI/UX设计原则和实现方案
4. **质量标准**: 测试规范和安全要求

---

## 📞 联系方式

如有文档相关问题，请联系：
- **项目负责人**: Kevin Yuan
- **技术讨论**: 通过git issues或项目群组
- **文档更新**: 提交PR到docs目录

---

**文档说明**: 本文档库是XC-RECON-V2项目的技术知识库，包含了从原始xc-robot项目继承的核心技术资料。请根据您的角色和需求选择相关文档进行阅读。