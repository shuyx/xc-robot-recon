<template>
  <div class="sidebar-container">
    <!-- 展开状态的侧边栏 -->
    <div v-if="!collapsed" class="sidebar-expanded">
      <!-- 系统Logo区域 -->
      <div class="logo-area">
        <div class="logo-content">
          <el-icon class="logo-icon">
            <Avatar />
          </el-icon>
          <span class="logo-text">机器人系统</span>
        </div>
        <button class="collapse-button" @click="toggleCollapse">
          <el-icon>
            <ArrowLeft />
          </el-icon>
        </button>
      </div>
      
      <!-- 全局搜索区域 -->
      <div class="search-area">
        <div class="search-wrapper">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索功能..." 
            class="search-input"
            @input="handleSearch"
          >
          <el-icon class="search-icon">
            <Search />
          </el-icon>
        </div>
      </div>
      
      <!-- 菜单组区域 -->
      <div class="menu-groups">
        <div 
          v-for="(menu, index) in filteredMenuConfig" 
          :key="menu.id" 
          class="menu-group"
          :data-menu-id="menu.id"
        >
          <!-- 菜单组标题 -->
          <div 
            class="menu-group-header"
            :class="{ 'active': activeGroupId === menu.id }"
            @click="toggleMenuGroup(menu.id)"
          >
            <div class="group-title">
              <el-icon :color="getMenuColor(menu.id)">
                <component :is="menu.icon" />
              </el-icon>
              <span>{{ menu.title }}</span>
            </div>
            <div class="group-toggle">
              <el-icon>
                <ArrowUp v-if="expandedGroups.includes(menu.id)" />
                <ArrowDown v-else />
              </el-icon>
            </div>
          </div>
          
          <!-- 菜单项列表 -->
          <div 
            v-if="expandedGroups.includes(menu.id)" 
            class="menu-items"
          >
            <div 
              v-for="child in menu.children" 
              :key="child.id"
              class="menu-item"
              :class="{ 'active': activeMenuId === child.id }"
              @click="handleMenuItemClick(child)"
            >
              <el-icon class="item-icon">
                <component :is="child.icon" />
              </el-icon>
              <span class="item-title">{{ child.title }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 系统状态区域 -->
      <div class="system-status">
        <div class="status-item">
          <el-icon class="status-online">
            <Connection />
          </el-icon>
          <span class="status-text">系统状态: 正常</span>
        </div>
        <div class="status-item">
          <el-icon class="status-signal">
            <Promotion />
          </el-icon>
          <span class="status-text">连接设备: 3台</span>
        </div>
      </div>
    </div>
    
    <!-- 折叠状态的侧边栏 -->
    <div v-else class="sidebar-collapsed">
      <!-- 系统Logo图标 -->
      <div class="collapsed-logo" @click="toggleCollapse">
        <el-icon class="logo-icon">
          <Avatar />
        </el-icon>
      </div>
      
      <!-- 折叠状态菜单图标 -->
      <div class="collapsed-menu-icons">
        <div 
          v-for="(menu, index) in menuConfig" 
          :key="menu.id"
          class="collapsed-menu-item"
          :class="{ 'active': activeGroupId === menu.id }"
          :title="menu.title"
          @click="handleCollapsedMenuClick(menu, index)"
        >
          <el-icon :color="getMenuColor(menu.id)">
            <component :is="menu.icon" />
          </el-icon>
        </div>
      </div>
      
      <!-- 折叠状态系统状态图标 -->
      <div class="collapsed-status">
        <div class="collapsed-status-item" title="系统状态: 正常">
          <el-icon class="status-online">
            <Connection />
          </el-icon>
        </div>
        <div class="collapsed-status-item" title="连接设备: 3台">
          <el-icon class="status-signal">
            <Promotion />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { menuConfig, menuIconColors, type MenuItem } from '@/config/menu'
import { 
  Avatar, 
  ArrowLeft, 
  ArrowUp, 
  ArrowDown, 
  Search,
  Connection,
  Promotion
} from '@element-plus/icons-vue'

// Props
interface Props {
  collapsed: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'toggle-collapse': []
  'menu-click': [menuItem: MenuItem]
}>()

// Router
const router = useRouter()

// 响应式数据
const searchQuery = ref('')
const expandedGroups = ref(['quick-launch', 'robot-control', 'scene-testing']) // 默认展开的菜单组
const activeGroupId = ref('robot-control') // 当前激活的菜单组
const activeMenuId = ref('arm-control') // 当前激活的菜单项

// 计算属性 - 过滤搜索结果
const filteredMenuConfig = computed(() => {
  if (!searchQuery.value.trim()) {
    return menuConfig
  }
  
  const query = searchQuery.value.toLowerCase()
  return menuConfig.map(menu => ({
    ...menu,
    children: menu.children?.filter(child => 
      child.title.toLowerCase().includes(query) ||
      menu.title.toLowerCase().includes(query)
    )
  })).filter(menu => 
    menu.title.toLowerCase().includes(query) || 
    (menu.children && menu.children.length > 0)
  )
})

// 获取菜单图标颜色
const getMenuColor = (menuId: string): string => {
  const colorClass = menuIconColors[menuId]
  const colorMap: Record<string, string> = {
    'text-yellow-400': '#FBBF24',
    'text-green-400': '#34D399', 
    'text-primary': '#409EFF',
    'text-blue-400': '#60A5FA',
    'text-purple-400': '#A78BFA',
    'text-red-400': '#F87171',
    'text-teal-400': '#2DD4BF',
    'text-indigo-400': '#818CF8',
    'text-gray-400': '#9CA3AF'
  }
  return colorMap[colorClass] || '#9CA3AF'
}

// 切换侧边栏折叠状态
const toggleCollapse = () => {
  emit('toggle-collapse')
}

// 切换菜单组展开/折叠
const toggleMenuGroup = (groupId: string) => {
  const index = expandedGroups.value.indexOf(groupId)
  if (index > -1) {
    expandedGroups.value.splice(index, 1)
  } else {
    expandedGroups.value.push(groupId)
  }
  activeGroupId.value = groupId
}

// 处理菜单项点击
const handleMenuItemClick = (menuItem: MenuItem) => {
  activeMenuId.value = menuItem.id
  activeGroupId.value = findParentGroupId(menuItem.id) || ''
  
  // 导航到路由
  if (menuItem.path) {
    router.push(menuItem.path)
  }
  
  // 触发事件
  emit('menu-click', menuItem)
}

// 处理折叠状态菜单点击
const handleCollapsedMenuClick = (menu: MenuItem, index: number) => {
  activeGroupId.value = menu.id
  
  // 在折叠状态下点击菜单组，展开侧边栏并展开该菜单组
  emit('toggle-collapse')
  
  setTimeout(() => {
    if (!expandedGroups.value.includes(menu.id)) {
      expandedGroups.value.push(menu.id)
    }
  }, 300) // 等待侧边栏展开动画完成
}

// 处理搜索输入
const handleSearch = () => {
  // 搜索时自动展开包含搜索结果的菜单组
  if (searchQuery.value.trim()) {
    const newExpandedGroups: string[] = []
    filteredMenuConfig.value.forEach(menu => {
      if (menu.children && menu.children.length > 0) {
        newExpandedGroups.push(menu.id)
      }
    })
    expandedGroups.value = newExpandedGroups
  }
}

// 查找菜单项的父级菜单组ID
const findParentGroupId = (menuItemId: string): string | null => {
  for (const menu of menuConfig) {
    if (menu.children?.some(child => child.id === menuItemId)) {
      return menu.id
    }
  }
  return null
}

// 键盘快捷键处理
const handleKeyboardShortcut = (event: KeyboardEvent) => {
  // 数字键1-9快速跳转到对应菜单组
  if (event.key >= '1' && event.key <= '9') {
    const index = parseInt(event.key) - 1
    if (index < menuConfig.length) {
      const targetMenu = menuConfig[index]
      toggleMenuGroup(targetMenu.id)
      
      // 滚动到目标菜单组
      const element = document.querySelector(`[data-menu-id="${targetMenu.id}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}

// 组件挂载时设置键盘监听
onMounted(() => {
  window.addEventListener('keydown', handleKeyboardShortcut)
})

// 组件卸载时移除键盘监听
import { onUnmounted } from 'vue'
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboardShortcut)
})
</script>

<style scoped>
.sidebar-container {
  height: 100%;
  font-family: 'Inter', sans-serif;
}

/* 展开状态的侧边栏样式 */
.sidebar-expanded {
  width: 240px;
  height: 100%;
  background: var(--secondary-color, #2c3e50);
  color: white;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 系统Logo区域 */
.logo-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  color: var(--primary-color, #409EFF);
  font-size: 20px;
  width: 24px;
  height: 24px;
}

.logo-text {
  font-weight: bold;
  font-size: 18px;
}

.collapse-button {
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.3s ease;
}

.collapse-button:hover {
  color: white;
}

/* 全局搜索区域 */
.search-area {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.search-wrapper {
  position: relative;
}

.search-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 8px 12px 8px 36px;
  border-radius: 6px;
  outline: none;
  transition: background-color 0.3s ease;
}

.search-input::placeholder {
  color: #9CA3AF;
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 1px var(--primary-color, #409EFF);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  font-size: 14px;
  width: 16px;
  height: 16px;
}

/* 菜单组区域 */
.menu-groups {
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
}

.menu-group {
  margin-bottom: 0;
}

/* 菜单组标题 */
.menu-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menu-group-header:hover {
  background: var(--hover-color, rgba(255, 255, 255, 0.1));
}

.menu-group-header.active {
  background: rgba(64, 158, 255, 0.2);
}

.group-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.group-title .el-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.group-toggle .el-icon {
  font-size: 12px;
  color: #9CA3AF;
  transition: transform 0.3s ease;
  width: 16px;
  height: 16px;
}

/* 菜单项列表 */
.menu-items {
  background: var(--group-bg-color, rgba(255, 255, 255, 0.05));
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin: 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 0;
}

.menu-item:hover {
  background: var(--hover-color, rgba(255, 255, 255, 0.1));
}

.menu-item.active {
  background: rgba(64, 158, 255, 0.3);
}

.item-icon {
  color: #9CA3AF;
  font-size: 14px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item.active .item-icon {
  color: var(--primary-color, #409EFF);
}

.item-title {
  font-size: 14px;
}

/* 系统状态区域 */
.system-status {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  flex-shrink: 0;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.status-item:last-child {
  margin-bottom: 0;
}

.status-text {
  font-size: 14px;
}

.status-online {
  color: var(--success-color, #00A870);
}

.status-signal {
  color: var(--primary-color, #409EFF);
}

/* 折叠状态的侧边栏样式 */
.sidebar-collapsed {
  width: 60px;
  height: 100%;
  background: var(--secondary-color, #2c3e50);
  color: white;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 折叠状态Logo */
.collapsed-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.collapsed-logo:hover {
  background: var(--hover-color, rgba(255, 255, 255, 0.1));
}

.collapsed-logo .logo-icon {
  color: var(--primary-color, #409EFF);
  font-size: 20px;
}

/* 折叠状态菜单图标 */
.collapsed-menu-icons {
  flex: 1;
  padding: 8px 0;
}

.collapsed-menu-item {
  display: flex;
  justify-content: center;
  padding: 12px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
}

.collapsed-menu-item:hover {
  background: var(--hover-color, rgba(255, 255, 255, 0.1));
}

.collapsed-menu-item.active {
  background: rgba(64, 158, 255, 0.2);
}

.collapsed-menu-item i {
  font-size: 16px;
}

/* 折叠状态系统状态 */
.collapsed-status {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 0;
  flex-shrink: 0;
}

.collapsed-status-item {
  display: flex;
  justify-content: center;
  padding: 8px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar-expanded {
    width: 240px;
    position: fixed;
    top: 64px;
    left: 0;
    z-index: 999;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }
  
  .sidebar-collapsed {
    width: 60px;
    position: fixed;
    top: 64px;
    left: 0;
    z-index: 999;
  }
}

/* 滚动条样式 */
.sidebar-expanded::-webkit-scrollbar,
.sidebar-collapsed::-webkit-scrollbar,
.menu-groups::-webkit-scrollbar {
  display: none;
}

.sidebar-expanded,
.sidebar-collapsed,
.menu-groups {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>