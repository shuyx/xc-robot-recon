// src/config/menu.ts
// 基于xc_recon_oldgui.md的9分组菜单结构配置

export interface MenuItem {
  id: string
  icon: string
  title: string
  path: string
  children?: MenuItem[]
}

export const menuConfig: MenuItem[] = [
  {
    id: 'quickstart',
    icon: '⚡',
    title: '快速启动',
    path: '/quickstart',
    children: [
      { id: 'favorites', icon: '⭐', title: '收藏夹', path: '/quickstart/favorites' },
      { id: 'recent', icon: '📜', title: '最近使用', path: '/quickstart/recent' }
    ]
  },
  {
    id: 'device',
    icon: '📡',
    title: '设备连接',
    path: '/device',
    children: [
      { id: 'connection-test', icon: '🔗', title: '连接测试', path: '/device/connection' },
      { id: 'network-config', icon: '🌐', title: '网络配置', path: '/device/network' }
    ]
  },
  {
    id: 'control',
    icon: '🤖',
    title: '机器人控制',
    path: '/control',
    children: [
      { id: 'arm-control', icon: '🦾', title: '机械臂控制', path: '/control/arm' },
      { id: 'chassis-control', icon: '🚛', title: '底盘控制', path: '/control/chassis' },
      { id: 'coord-control', icon: '🔄', title: '联动控制', path: '/control/coord' }
    ]
  },
  {
    id: 'testing',
    icon: '🧪',
    title: '场景测试',
    path: '/testing',
    children: [
      { id: 'component-testing', icon: '🔧', title: '组件测试', path: '/testing/component' },
      { id: 'integration-testing', icon: '🔗', title: '集成测试', path: '/testing/integration' },
      { id: 'vision-testing', icon: '👁️', title: '视觉引导测试', path: '/testing/vision' },
      { id: 'e2e-testing', icon: '🎯', title: '端到端场景', path: '/testing/e2e' }
    ]
  },
  {
    id: 'simulation',
    icon: '🎯',
    title: '仿真规划',
    path: '/simulation',
    children: [
      { id: 'robot-sim', icon: '🎮', title: '仿真模拟', path: '/simulation/robot' },
      { id: 'path-planning', icon: '🏗️', title: '路径规划', path: '/simulation/path' },
      { id: 'task-orchestration', icon: '📋', title: '任务编排', path: '/simulation/task' }
    ]
  },
  {
    id: 'vision',
    icon: '👁️',
    title: '视觉感知',
    path: '/vision',
    children: [
      { id: 'vision-system', icon: '📷', title: '视觉系统', path: '/vision/system' },
      { id: 'camera-calibration', icon: '🎯', title: '相机标定', path: '/vision/calibration' },
      { id: 'pointcloud', icon: '☁️', title: '点云处理', path: '/vision/pointcloud' },
      { id: 'image-processing', icon: '🔍', title: '图像处理', path: '/vision/image' }
    ]
  },
  {
    id: 'interaction',
    icon: '🤝',
    title: '智能交互', // 重点模块
    path: '/interaction',
    children: [
      { id: 'face-recognition', icon: '👤', title: '人脸识别', path: '/interaction/face' },
      { id: 'conversational-task', icon: '🎤', title: '智能交互', path: '/interaction/chat' },
      { id: 'elevator-control', icon: '🏢', title: '梯控系统', path: '/interaction/elevator' }
    ]
  },
  {
    id: 'monitoring',
    icon: '📊',
    title: '数据监控',
    path: '/monitoring',
    children: [
      { id: 'system-monitor', icon: '📈', title: '系统监控', path: '/monitoring/system' },
      { id: 'data-analytics', icon: '📋', title: '数据分析', path: '/monitoring/analytics' },
      { id: 'performance-stats', icon: '📊', title: '性能统计', path: '/monitoring/performance' }
    ]
  },
  {
    id: 'management',
    icon: '⚙️',
    title: '系统管理',
    path: '/management',
    children: [
      { id: 'parameter-config', icon: '🔧', title: '参数配置', path: '/management/config' },
      { id: 'maintenance', icon: '🛠️', title: '维护管理', path: '/management/maintenance' },
      { id: 'system-settings', icon: '⚙️', title: '系统设置', path: '/management/settings' }
    ]
  }
]

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