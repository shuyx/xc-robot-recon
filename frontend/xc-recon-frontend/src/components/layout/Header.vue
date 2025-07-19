<template>
  <div class="header-content">
    <div class="header-left">
      <!-- 移动端菜单按钮 -->
      <el-button
        v-if="isMobile"
        type="text"
        class="menu-toggle"
        @click="$emit('toggle-sidebar')"
      >
        <el-icon size="20"><Menu /></el-icon>
      </el-button>
      
      <h1 class="system-title" :class="{ 'title-mobile': isMobile }">
        XC-RECON {{ isMobile ? '' : '控制系统' }}
      </h1>
    </div>
    
    <div class="header-right">
      <el-dropdown @command="handleCommand">
        <span class="user-info" :class="{ 'user-info-mobile': isMobile }">
          <el-icon><User /></el-icon>
          <span v-if="!isMobile">{{ userStore.user?.username || '未登录' }}</span>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人信息</el-dropdown-item>
            <el-dropdown-item command="settings">系统设置</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, ArrowDown, Menu } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

interface Props {
  isMobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isMobile: false
})

const emit = defineEmits<{
  'toggle-sidebar': []
}>()

const userStore = useUserStore()

const handleCommand = (command: string) => {
  switch (command) {
    case 'profile':
      ElMessage.info('个人信息功能开发中')
      break
    case 'settings':
      ElMessage.info('系统设置功能开发中')
      break
    case 'logout':
      userStore.logout()
      ElMessage.success('已退出登录')
      break
  }
}
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-toggle {
  color: white !important;
  padding: 8px !important;
  border: none !important;
  background: transparent !important;
}

.menu-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.system-title {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
}

.title-mobile {
  font-size: 18px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.user-info:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-info-mobile {
  padding: 8px;
  gap: 4px;
}

/* 移动端样式 */
@media (max-width: 767px) {
  .header-content {
    padding: 0 15px;
  }
  
  .system-title {
    font-size: 16px;
  }
}

/* 超小屏幕 */
@media (max-width: 480px) {
  .header-content {
    padding: 0 10px;
  }
  
  .system-title {
    font-size: 14px;
  }
}
</style>