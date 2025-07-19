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
    <!-- 基于xc_recon_oldgui.md的9分组菜单结构 -->
    <template v-for="menu in menuConfig" :key="menu.id">
      <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.id">
        <template #title>
          <span class="menu-icon">{{ menu.icon }}</span>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item
          v-for="child in menu.children"
          :key="child.id"
          :index="child.path"
        >
          <span class="submenu-icon">{{ child.icon }}</span>
          <span>{{ child.title }}</span>
        </el-menu-item>
      </el-sub-menu>
      
      <el-menu-item v-else :index="menu.path">
        <span class="menu-icon">{{ menu.icon }}</span>
        <span>{{ menu.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { menuConfig } from '@/config/menu'

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