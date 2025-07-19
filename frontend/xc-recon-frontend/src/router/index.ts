import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue'),
        },
        {
          path: '/devices',
          name: 'devices',
          component: () => import('../views/DeviceManager.vue'),
        },
        {
          path: '/devices/fr3',
          name: 'fr3-control',
          component: () => import('../views/FR3Control.vue'),
        },
        {
          path: '/devices/hermes',
          name: 'hermes-control',
          component: () => import('../views/HermesControl.vue'),
        },
        {
          path: '/tasks',
          name: 'tasks',
          component: () => import('../views/TaskManager.vue'),
        },
        {
          path: '/tasks/create',
          name: 'task-create',
          component: () => import('../views/TaskCreate.vue'),
        },
        {
          path: '/simulation',
          name: 'simulation',
          component: () => import('../views/Simulation3D.vue'),
        },
        {
          path: '/models',
          name: 'models',
          component: () => import('../views/ModelManager.vue'),
        },
        {
          path: '/logs',
          name: 'logs',
          component: () => import('../views/SystemLogs.vue'),
        },
        {
          path: '/system/users',
          name: 'user-management',
          component: () => import('../views/UserManagement.vue'),
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
