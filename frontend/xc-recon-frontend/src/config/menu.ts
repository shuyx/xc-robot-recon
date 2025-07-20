// 菜单配置 - 基于sidebar_nav.html的9分组结构
export interface MenuItem {
  id: string
  title: string
  icon: string
  path?: string
  children?: MenuItem[]
}

export const menuConfig: MenuItem[] = [
  {
    id: 'quick-launch',
    title: '快速启动',
    icon: 'fa-solid fa-bolt',
    children: [
      { id: 'main-dashboard', title: '主界面', icon: 'fa-solid fa-clipboard-list', path: '/dashboard' },
      { id: 'favorites', title: '收藏功能', icon: 'fa-solid fa-star', path: '/favorites' },
      { id: 'recent', title: '最近使用', icon: 'fa-solid fa-clock', path: '/recent' }
    ]
  },
  {
    id: 'device-connection',
    title: '设备连接',
    icon: 'fa-solid fa-plug',
    children: [
      { id: 'device-connect', title: '设备连接', icon: 'fa-solid fa-link', path: '/device/connection' },
      { id: 'network-config', title: '网络配置', icon: 'fa-solid fa-globe', path: '/device/network' },
      { id: 'device-test', title: '设备测试', icon: 'fa-solid fa-flask', path: '/device/test' }
    ]
  },
  {
    id: 'robot-control',
    title: '机器人控制',
    icon: 'fa-solid fa-robot',
    children: [
      { id: 'arm-control', title: '机械臂控制', icon: 'fa-solid fa-robot', path: '/robot/arm' },
      { id: 'chassis-control', title: '底盘控制', icon: 'fa-solid fa-bullseye', path: '/robot/chassis' },
      { id: 'joint-control', title: '联动控制', icon: 'fa-solid fa-sync', path: '/robot/joint' }
    ]
  },
  {
    id: 'intelligent-interaction',
    title: '智能交互',
    icon: 'fa-solid fa-handshake',
    children: [
      { id: 'face-recognition', title: '人脸识别', icon: 'fa-solid fa-user', path: '/interaction/face' },
      { id: 'smart-chat', title: '智能对话', icon: 'fa-solid fa-comment', path: '/interaction/chat' },
      { id: 'elevator-control', title: '梯控系统', icon: 'fa-solid fa-building', path: '/interaction/elevator' }
    ]
  },
  {
    id: 'scene-testing',
    title: '场景测试',
    icon: 'fa-solid fa-flask',
    children: [
      { id: 'component-test', title: '组件测试', icon: 'fa-solid fa-flask', path: '/testing/component' },
      { id: 'integration-test', title: '集成测试', icon: 'fa-solid fa-link', path: '/testing/integration' },
      { id: 'vision-guided-test', title: '视觉引导测试', icon: 'fa-solid fa-eye', path: '/testing/vision' },
      { id: 'end-to-end-test', title: '端到端场景', icon: 'fa-solid fa-bullseye', path: '/testing/e2e' }
    ]
  },
  {
    id: 'simulation-planning',
    title: '仿真规划',
    icon: 'fa-solid fa-bullseye',
    children: [
      { id: 'robot-simulation', title: '机器人仿真', icon: 'fa-solid fa-gamepad', path: '/simulation/robot' },
      { id: 'path-planning', title: '路径规划', icon: 'fa-solid fa-map', path: '/simulation/path' },
      { id: 'task-orchestration', title: '任务编排', icon: 'fa-solid fa-clipboard-list', path: '/simulation/task' }
    ]
  },
  {
    id: 'visual-perception',
    title: '视觉感知',
    icon: 'fa-solid fa-eye',
    children: [
      { id: 'vision-system', title: '视觉系统', icon: 'fa-solid fa-eye', path: '/vision/system' },
      { id: 'camera-calibration', title: '相机标定', icon: 'fa-solid fa-camera', path: '/vision/calibration' },
      { id: 'point-cloud', title: '点云处理', icon: 'fa-solid fa-cloud', path: '/vision/pointcloud' },
      { id: 'image-processing', title: '图像处理', icon: 'fa-solid fa-image', path: '/vision/image' }
    ]
  },
  {
    id: 'data-monitoring',
    title: '数据监控',
    icon: 'fa-solid fa-chart-bar',
    children: [
      { id: 'system-monitor', title: '系统监控', icon: 'fa-solid fa-chart-bar', path: '/monitoring/system' },
      { id: 'data-analysis', title: '数据分析', icon: 'fa-solid fa-chart-pie', path: '/monitoring/analysis' },
      { id: 'performance-stats', title: '性能统计', icon: 'fa-solid fa-chart-line', path: '/monitoring/performance' }
    ]
  },
  {
    id: 'system-management',
    title: '系统管理',
    icon: 'fa-solid fa-cog',
    children: [
      { id: 'system-settings', title: '系统设置', icon: 'fa-solid fa-cog', path: '/management/settings' },
      { id: 'parameter-config', title: '参数配置', icon: 'fa-solid fa-sliders-h', path: '/management/config' },
      { id: 'maintenance', title: '维护管理', icon: 'fa-solid fa-tools', path: '/management/maintenance' }
    ]
  }
]

// 菜单图标颜色映射 - 基于sidebar_nav.html的颜色设计
export const menuIconColors: Record<string, string> = {
  'quick-launch': 'text-yellow-400',
  'device-connection': 'text-green-400', 
  'robot-control': 'text-primary',
  'intelligent-interaction': 'text-blue-400',
  'scene-testing': 'text-purple-400',
  'simulation-planning': 'text-red-400',
  'visual-perception': 'text-teal-400',
  'data-monitoring': 'text-indigo-400',
  'system-management': 'text-gray-400'
}

// 导出扁平化的路由列表（用于路由配置）
export const getRouteList = (): Array<{ path: string; name: string; title: string }> => {
  const routes: Array<{ path: string; name: string; title: string }> = []
  
  menuConfig.forEach(menu => {
    // 添加主菜单路由
    routes.push({
      path: menu.path,
      name: menu.id,
      title: menu.title
    })
    
    // 添加子菜单路由
    menu.children?.forEach(child => {
      routes.push({
        path: child.path,
        name: child.id,
        title: child.title
      })
    })
  })
  
  return routes
}