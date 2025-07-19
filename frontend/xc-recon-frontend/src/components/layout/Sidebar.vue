<template>
  <el-menu
    :default-active="$route.path"
    class="sidebar-menu"
    background-color="#263445"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    router
    @select="handleMenuClick"
  >
    <el-menu-item index="/dashboard">
      <el-icon><Monitor /></el-icon>
      <span>控制台</span>
    </el-menu-item>
    
    <el-sub-menu index="devices">
      <template #title>
        <el-icon><Connection /></el-icon>
        <span>设备管理</span>
      </template>
      <el-menu-item index="/devices">设备列表</el-menu-item>
      <el-menu-item index="/devices/fr3">FR3机械臂</el-menu-item>
      <el-menu-item index="/devices/hermes">Hermes底盘</el-menu-item>
    </el-sub-menu>
    
    <el-sub-menu index="tasks">
      <template #title>
        <el-icon><List /></el-icon>
        <span>任务管理</span>
      </template>
      <el-menu-item index="/tasks">任务列表</el-menu-item>
      <el-menu-item index="/tasks/create">创建任务</el-menu-item>
      <el-menu-item index="/tasks/schedule">任务调度</el-menu-item>
    </el-sub-menu>
    
    <el-menu-item index="/simulation">
      <el-icon><View /></el-icon>
      <span>3D仿真</span>
    </el-menu-item>
    
    <el-sub-menu index="models">
      <template #title>
        <el-icon><Box /></el-icon>
        <span>模型管理</span>
      </template>
      <el-menu-item index="/models">模型库</el-menu-item>
      <el-menu-item index="/models/upload">上传模型</el-menu-item>
    </el-sub-menu>
    
    <el-menu-item index="/logs">
      <el-icon><Document /></el-icon>
      <span>系统日志</span>
    </el-menu-item>
    
    <el-sub-menu index="system">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>系统设置</span>
      </template>
      <el-menu-item index="/system/users">用户管理</el-menu-item>
      <el-menu-item index="/system/config">系统配置</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { 
  Monitor, 
  Connection, 
  List, 
  View, 
  Box, 
  Document, 
  Setting 
} from '@element-plus/icons-vue'

const emit = defineEmits<{
  'item-click': []
}>()

const handleMenuClick = () => {
  emit('item-click')
}
</script>

<style scoped>
.sidebar-menu {
  border-right: none;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 250px;
}

/* 移动端样式 */
@media (max-width: 767px) {
  .sidebar-menu:not(.el-menu--collapse) {
    width: 250px;
    min-width: 250px;
  }
  
  /* 确保菜单项在移动端也能正常显示 */
  :deep(.el-menu-item) {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
  }
  
  :deep(.el-sub-menu__title) {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
  }
  
  :deep(.el-menu-item-group__title) {
    font-size: 12px;
  }
}

/* 平板端样式 */
@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar-menu:not(.el-menu--collapse) {
    width: 200px;
  }
  
  :deep(.el-menu-item) {
    font-size: 13px;
  }
  
  :deep(.el-sub-menu__title) {
    font-size: 13px;
  }
}

/* 超小屏幕优化 */
@media (max-width: 480px) {
  :deep(.el-menu-item) {
    height: 44px;
    line-height: 44px;
    font-size: 13px;
    padding-left: 16px !important;
  }
  
  :deep(.el-sub-menu__title) {
    height: 44px;
    line-height: 44px;
    font-size: 13px;
    padding-left: 16px !important;
  }
  
  :deep(.el-menu-item span) {
    margin-left: 8px;
  }
  
  :deep(.el-sub-menu__title span) {
    margin-left: 8px;
  }
}
</style>