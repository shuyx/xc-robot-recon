# CLAUDE.md - Claude AI 项目工作指南

**目的**: 为Claude AI助手提供XC-RECON-V2项目的核心工作指南  
**更新日期**: 2025-07-19  
**当前版本**: Phase 3

---

## 🎯 项目核心信息

### 项目定位
- **项目名称**: XC-RECON-V2 轮式双臂类人形机器人控制系统重构版
- **技术栈**: FastAPI + Vue 3 + TypeScript + Element Plus (前后端分离)
- **原项目**: XC-ROBOT (Python + PyQt5) → 现代化重构为企业级Web应用
- **硬件平台**: FR3双机械臂 + Hermes移动底盘 + Gemini 335视觉系统

### 当前项目状态
- **Phase 3**: 前端开发90%完成，API集成待进行 (详见 @xc_recon_8.md)
- **下一步**: API集成对接，WebSocket实时通信，3D可视化组件

### 历史参考
- **完整开发历程**: @xc_recon_1.md 到 @xc_recon_8.md
- **最新详细状态**: @xc_recon_8.md
- **技术实施计划**: @xc_recon_steps.md

---

## 📚 关键资源快速索引

### 🔥 必读核心文档 (优先级P0)
```bash
@xc-robot-wiki/technical/xc_os_context.md   # 🎯 项目背景和约束 (最重要)
@xc_recon_8.md                              # 📈 最新开发状态 (2025-07-19)
@xc-robot-wiki/README.md                    # 📖 完整文档导航
@xc-robot-wiki/technical/PROJECT_TECHNICAL_OVERVIEW.md  # 🏗️ 系统架构
```

### 🎨 前端开发关键资源
```bash
# Vue 3前端项目
@frontend/xc-recon-frontend/        # 前端项目根目录
@frontend/xc-recon-frontend/src/    # 源代码
@xc-robot-wiki/design/design_reference/      # UI/UX设计规范 ⭐⭐⭐⭐⭐

# 重要文件
@frontend/xc-recon-frontend/src/stores/user.ts    # 用户状态管理
@frontend/xc-recon-frontend/src/components/layout/MainLayout.vue  # 主布局
@frontend/xc-recon-frontend/src/views/Dashboard.vue  # 仪表板页面
```

### ⚙️ 后端API关键资源
```bash
# FastAPI后端项目
@backend/                           # 后端项目根目录
@backend/api/v1/endpoints/          # API端点实现
@config/app.yml                     # 核心配置文件

# 重要文件
@backend/api/v1/endpoints/auth.py   # 认证API
@backend/api/v1/endpoints/devices.py  # 设备管理API
@backend/core/config.py             # 配置管理
```

### 🔧 硬件和配置资源
```bash
@xc-robot-wiki/hardware/FR3_ROBOT_ANALYSIS.md     # FR3机械臂技术规格 ⭐⭐⭐⭐⭐
@xc-robot-wiki/hardware/robot_config_reference.json  # 跨平台配置参考
@xc-robot-wiki/testing/Testing_Plan.md               # 测试和安全规范
```

---

## 💻 代码风格和开发规范

### TypeScript/Vue 3前端规范
```typescript
// ✅ 推荐的Vue 3 + TypeScript模式
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBreakpoints } from '@vueuse/core'

// 严格类型定义
interface Device {
  id: string
  name: string
  status: 'online' | 'offline'  // 联合类型
}

// 响应式数据
const devices = ref<Device[]>([])
const breakpoints = useBreakpoints({ mobile: 768, tablet: 1024 })
const isMobile = breakpoints.smaller('mobile')

// 环境隔离
if (import.meta.env.DEV && !token.value) {
  mockLogin()  // 仅开发环境
}
</script>
```

### Python/FastAPI后端规范
```python
# ✅ 推荐的FastAPI模式
from pydantic import BaseModel
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException

# 严格数据模型
class DeviceResponse(BaseModel):
    id: str
    name: str
    status: Literal["online", "offline"]
    last_heartbeat: Optional[str] = None

# 标准API结构
@router.get("/devices", response_model=List[DeviceResponse])
async def get_devices():
    """获取设备列表 - 标准注释格式"""
    return {"status": "success", "data": devices}
```

### 文件命名和组织规范
```bash
# ✅ 推荐的文件结构
frontend/src/
├── components/layout/     # 布局组件 (PascalCase)
├── views/                # 页面组件 (PascalCase) 
├── stores/               # Pinia状态 (camelCase)
├── services/             # API服务 (camelCase)
└── types/                # TypeScript类型定义

backend/
├── api/v1/endpoints/     # API端点 (snake_case)
├── core/                 # 核心模块
├── models/               # 数据模型
└── services/             # 业务服务
```

---

## 🔧 开发工作流和工具

### Git工作流
```bash
# 当前分支: develop (主开发分支)
# 提交规范: type(scope): description
# 例如: feat(frontend): 添加设备管理界面
#      docs(api): 更新API文档
#      fix(auth): 修复登录认证问题
```

### 开发环境
```bash
# 前端启动 (Vue 3 + Vite)
cd frontend/xc-recon-frontend
npm run dev                    # http://localhost:5173

# 后端启动 (FastAPI + Uvicorn)  
cd backend
python -m uvicorn main:app --reload  # http://localhost:8000
```

### 常用开发命令
```bash
# 前端
npm run lint                   # 代码检查
npm run type-check            # TypeScript类型检查
npm run build                 # 生产构建

# 后端
python -m pytest             # 运行测试
python -m black .             # 代码格式化
python -m mypy .              # 类型检查
```

---

## 🎯 Claude工作指南

### 任务执行模式
1. **🎯 确认背景**: `@xc-robot-wiki/technical/xc_os_context.md` 确认项目约束
2. **📈 检查状态**: `@xc_recon_8.md` 了解最新进展  
3. **🔍 精确定位**: 根据任务类型查找对应文档和代码
4. **📖 查阅详情**: `@xc-robot-wiki/README.md` 获取完整文档导航

### 常见任务类型和资源映射

| 任务类型 | 主要参考资源 | 关键文件 |
|---------|-------------|---------|
| **前端界面开发** | `@xc-robot-wiki/design/design_reference/` | `MainLayout.vue`, `Dashboard.vue` |
| **API接口开发** | `@xc-robot-wiki/technical/PROJECT_TECHNICAL_OVERVIEW.md` | `endpoints/*.py` |
| **设备集成** | `@xc-robot-wiki/hardware/FR3_ROBOT_ANALYSIS.md` | `devices.py`, `config.py` |
| **测试和验证** | `@xc-robot-wiki/testing/Testing_Plan.md` | `tests/`, `Testing_Programs_Guide.md` |
| **部署和配置** | `@xc-robot-wiki/development/DEPLOYMENT_GUIDE.md` | `config/app.yml` |

### 代码修改原则
- ✅ **先读后写**: 使用Read工具查看现有代码再进行修改
- ✅ **类型安全**: TypeScript严格类型，Python类型注解
- ✅ **环境隔离**: 开发/生产环境代码分离
- ✅ **遵循约定**: 按照项目现有代码风格和命名规范
- ✅ **增量修改**: 优先Edit现有文件，避免重写

### 问题解决路径
```
遇到问题 → 查阅@xc-robot-wiki/README.md → 定位相关文档 → 查看现有代码 → 提出解决方案
```

---

## 🚨 重要约束和注意事项

### 硬件约束
- **FR3机械臂**: IP配置192.168.58.2(右臂)/192.168.58.3(左臂)
- **开发环境**: Mac环境使用仿真模式，避免真实硬件依赖
- **网络配置**: 参考`@xc-robot-wiki/hardware/robot_config_reference.json`

### 技术约束  
- **Python版本**: 3.11.10 (已统一)
- **Node.js版本**: 18+ 
- **数据库**: 支持SQLite(开发)/PostgreSQL(生产)
- **浏览器兼容**: 现代浏览器，响应式设计优先

### 安全约束
- **认证**: JWT令牌认证，开发环境模拟登录
- **权限**: 基于角色的访问控制
- **数据验证**: Pydantic严格验证所有API输入

---

## 📝 快速参考清单

### 需要AI协助时的必备信息
- [x] 阅读项目背景: `@xc-robot-wiki/technical/xc_os_context.md`
- [x] 确认当前状态: `@xc_recon_8.md`  
- [x] 了解技术架构: `@xc-robot-wiki/technical/PROJECT_TECHNICAL_OVERVIEW.md`
- [x] 查看相关文档: `@xc-robot-wiki/README.md`

### 常用命令速查
```bash
# 查看项目状态
git status
npm run dev                    # 前端开发服务器
python -m uvicorn main:app --reload  # 后端开发服务器

# 代码质量检查  
npm run lint && npm run type-check    # 前端
python -m pytest && python -m mypy .  # 后端
```

---

**🤖 Claude使用提示**: 
- 在执行任何开发任务前，请先阅读相关文档
- 修改代码时请保持现有的代码风格和架构模式
- 如有疑问，优先查阅`@xc-robot-wiki/`目录下的相关文档
- 重大修改前请先与用户确认技术方案

**最后更新**: 2025-07-19 by Kevin Yuan  
**适用版本**: XC-RECON-V2 Phase 3