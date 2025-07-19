<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <HeaderComponent @toggle-sidebar="toggleSidebar" :is-mobile="isMobile" />
    </el-header>
    
    <el-container class="layout-body">
      <!-- 移动端遮罩层 -->
      <div 
        v-if="isMobile && sidebarVisible" 
        class="sidebar-overlay"
        @click="closeSidebar"
      ></div>
      
      <el-aside 
        class="layout-sidebar" 
        :class="{ 
          'sidebar-mobile': isMobile,
          'sidebar-hidden': isMobile && !sidebarVisible,
          'sidebar-visible': isMobile && sidebarVisible
        }"
        :width="sidebarWidth"
      >
        <SidebarComponent @item-click="handleSidebarItemClick" />
      </el-aside>
      
      <el-main class="layout-main" :class="{ 'main-mobile': isMobile }">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBreakpoints } from '@vueuse/core'
import HeaderComponent from './Header.vue'
import SidebarComponent from './Sidebar.vue'

const sidebarVisible = ref(true)

// 使用VueUse的breakpoints
const breakpoints = useBreakpoints({
  mobile: 768,
  tablet: 1024,
})

const isMobile = breakpoints.smaller('mobile')
const isTablet = breakpoints.between('mobile', 'tablet')

// 侧边栏宽度
const sidebarWidth = computed(() => {
  if (isMobile.value) return '250px'
  if (isTablet.value) return '200px'
  return '250px'
})

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

const closeSidebar = () => {
  if (isMobile.value) {
    sidebarVisible.value = false
  }
}

const handleSidebarItemClick = () => {
  // 移动端点击菜单项后自动收起侧边栏
  if (isMobile.value) {
    sidebarVisible.value = false
  }
}

onMounted(() => {
  // 移动端默认隐藏侧边栏
  if (isMobile.value) {
    sidebarVisible.value = false
  }
})

// 监听断点变化，桌面端自动显示侧边栏
breakpoints.greater('mobile').value && (sidebarVisible.value = true)
</script>

<style scoped>
.layout-container {
  height: 100vh;
  overflow: hidden;
}

.layout-header {
  background-color: #304156;
  color: white;
  padding: 0;
  line-height: 60px;
  position: relative;
  z-index: 1001;
}

.layout-body {
  height: calc(100vh - 60px);
  position: relative;
}

.layout-sidebar {
  background-color: #263445;
  color: white;
  transition: transform 0.3s ease;
  overflow-y: auto;
  overflow-x: hidden;
}

.layout-main {
  padding: 20px;
  background-color: #f0f2f5;
  overflow-y: auto;
  transition: margin-left 0.3s ease;
}

/* 移动端样式 */
.sidebar-mobile {
  position: fixed;
  left: 0;
  top: 60px;
  height: calc(100vh - 60px);
  z-index: 1000;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
}

.sidebar-hidden {
  transform: translateX(-100%);
}

.sidebar-visible {
  transform: translateX(0);
}

.sidebar-overlay {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.main-mobile {
  margin-left: 0 !important;
  padding: 15px;
}

/* 平板端样式 */
@media (min-width: 768px) and (max-width: 1023px) {
  .layout-main {
    padding: 15px;
  }
}

/* 桌面端样式 */
@media (min-width: 1024px) {
  .layout-main {
    padding: 20px;
  }
}

/* 超小屏幕优化 */
@media (max-width: 480px) {
  .layout-main {
    padding: 10px;
  }
}
</style>