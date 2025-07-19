# CLAUDE.md - Claude AI 工作指南

**目的**: XC-RECON-V2项目AI协作核心指南  
**状态**: Phase 3 (前端90%完成)  
**日期**: 2025-07-19

## 🎯 快速参考

### 核心文档 (必读)
- `@docs/technical/xc_os_context.md` - 项目背景约束
- `@xc_recon_8.md` - 最新开发状态  
- `@docs/README.md` - 完整文档导航

### 关键目录
- `@frontend/xc-recon-frontend/src/` - Vue3前端代码
- `@backend/api/v1/endpoints/` - FastAPI后端
- `@docs/hardware/` - 硬件规格文档

## 💻 开发规范

### 代码修改原则  
- ✅ **先读后写**: 使用Read工具查看现有代码再进行修改
- ✅ **类型安全**: TypeScript严格类型，Python类型注解
- ✅ **环境隔离**: 开发/生产环境代码分离
- ✅ **遵循约定**: 按照项目现有代码风格和命名规范

### 重要约束
- **硬件约束**: FR3机械臂IP 192.168.58.2/3，开发环境仿真模式
- **技术约束**: Python 3.11.10，Node.js 18+，现代浏览器支持
- **安全约束**: JWT认证，基于角色访问控制，Pydantic数据验证

---

**🤖 使用提示**: 执行任务前请先阅读相关文档，遵循现有代码风格