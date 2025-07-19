import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/interaction',
      children: [
        // ⚡ 快速启动
        {
          path: '/quickstart',
          name: 'quickstart',
          component: () => import('../views/quickstart/QuickStartPage.vue'),
        },
        {
          path: '/quickstart/favorites',
          name: 'favorites',
          component: () => import('../views/quickstart/FavoritesPage.vue'),
        },
        {
          path: '/quickstart/recent',
          name: 'recent',
          component: () => import('../views/quickstart/RecentPage.vue'),
        },
        
        // 📡 设备连接
        {
          path: '/device',
          name: 'device',
          component: () => import('../views/device/DeviceConnectionPage.vue'),
        },
        {
          path: '/device/connection',
          name: 'connection-test',
          component: () => import('../views/device/ConnectionTestPage.vue'),
        },
        {
          path: '/device/network',
          name: 'network-config',
          component: () => import('../views/device/NetworkConfigPage.vue'),
        },
        
        // 🤖 机器人控制
        {
          path: '/control',
          name: 'control',
          component: () => import('../views/control/RobotControlPage.vue'),
        },
        {
          path: '/control/arm',
          name: 'arm-control',
          component: () => import('../views/control/ArmControlPage.vue'),
        },
        {
          path: '/control/chassis',
          name: 'chassis-control',
          component: () => import('../views/control/ChassisControlPage.vue'),
        },
        {
          path: '/control/coord',
          name: 'coord-control',
          component: () => import('../views/control/CoordControlPage.vue'),
        },
        
        // 🧪 场景测试
        {
          path: '/testing',
          name: 'testing',
          component: () => import('../views/testing/ScenarioTestPage.vue'),
        },
        {
          path: '/testing/component',
          name: 'component-testing',
          component: () => import('../views/testing/ComponentTestPage.vue'),
        },
        {
          path: '/testing/integration',
          name: 'integration-testing',
          component: () => import('../views/testing/IntegrationTestPage.vue'),
        },
        {
          path: '/testing/vision',
          name: 'vision-testing',
          component: () => import('../views/testing/VisionTestPage.vue'),
        },
        {
          path: '/testing/e2e',
          name: 'e2e-testing',
          component: () => import('../views/testing/E2ETestPage.vue'),
        },
        
        // 🎯 仿真规划
        {
          path: '/simulation',
          name: 'simulation',
          component: () => import('../views/simulation/SimulationPage.vue'),
        },
        {
          path: '/simulation/robot',
          name: 'robot-sim',
          component: () => import('../views/simulation/RobotSimPage.vue'),
        },
        {
          path: '/simulation/path',
          name: 'path-planning',
          component: () => import('../views/simulation/PathPlanningPage.vue'),
        },
        {
          path: '/simulation/task',
          name: 'task-orchestration',
          component: () => import('../views/simulation/TaskOrchestrationPage.vue'),
        },
        
        // 👁️ 视觉感知
        {
          path: '/vision',
          name: 'vision',
          component: () => import('../views/vision/VisionSystemPage.vue'),
        },
        {
          path: '/vision/system',
          name: 'vision-system',
          component: () => import('../views/vision/VisionSystemPage.vue'),
        },
        {
          path: '/vision/calibration',
          name: 'camera-calibration',
          component: () => import('../views/vision/CameraCalibrationPage.vue'),
        },
        {
          path: '/vision/pointcloud',
          name: 'pointcloud',
          component: () => import('../views/vision/PointCloudPage.vue'),
        },
        {
          path: '/vision/image',
          name: 'image-processing',
          component: () => import('../views/vision/ImageProcessingPage.vue'),
        },
        
        // 🤝 智能交互 (重点模块)
        {
          path: '/interaction',
          name: 'interaction',
          component: () => import('../views/interaction/SmartInteractionPage.vue'),
        },
        {
          path: '/interaction/face',
          name: 'face-recognition',
          component: () => import('../views/interaction/FaceRecognitionPage.vue'),
        },
        {
          path: '/interaction/chat',
          name: 'conversational-task',
          component: () => import('../views/interaction/ConversationalTaskPage.vue'),
        },
        {
          path: '/interaction/elevator',
          name: 'elevator-control',
          component: () => import('../views/interaction/ElevatorControlPage.vue'),
        },
        
        // 📊 数据监控
        {
          path: '/monitoring',
          name: 'monitoring',
          component: () => import('../views/monitoring/DataMonitoringPage.vue'),
        },
        {
          path: '/monitoring/system',
          name: 'system-monitor',
          component: () => import('../views/monitoring/SystemMonitorPage.vue'),
        },
        {
          path: '/monitoring/analytics',
          name: 'data-analytics',
          component: () => import('../views/monitoring/DataAnalyticsPage.vue'),
        },
        {
          path: '/monitoring/performance',
          name: 'performance-stats',
          component: () => import('../views/monitoring/PerformanceStatsPage.vue'),
        },
        
        // ⚙️ 系统管理
        {
          path: '/management',
          name: 'management',
          component: () => import('../views/management/SystemManagementPage.vue'),
        },
        {
          path: '/management/config',
          name: 'parameter-config',
          component: () => import('../views/management/ParameterConfigPage.vue'),
        },
        {
          path: '/management/maintenance',
          name: 'maintenance',
          component: () => import('../views/management/MaintenancePage.vue'),
        },
        {
          path: '/management/settings',
          name: 'system-settings',
          component: () => import('../views/management/SystemSettingsPage.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
  ],
})

export default router
