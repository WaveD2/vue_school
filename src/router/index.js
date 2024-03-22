import Default from '@/layout/Default.vue'
import Authentication from '@/layout/Authentication.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TableLayoutVue from '@/layout/TableLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'trang chủ',
      component: Default,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'teacher',
          component: TableLayoutVue,
          children: [
            {
              path: '/teacher',
              name: 'Quản lý giáo viên',
              component: () => import('@/pages/myTeacher.vue')
            }
          ]
        },
        {
          path: '/setting-profile',
          name: 'Cài đặt thông tin',
          component: () => import('@/pages/settingProfile.vue')
        }
      ]
    },
    {
      path: '/',
      name: 'authentication',
      component: Authentication,
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue')
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue')
        }
      ]
    }
  ]
})

export default router
