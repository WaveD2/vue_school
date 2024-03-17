import Default from '@/layout/Default.vue'
import Authentication from '@/layout/Authentication.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TableLayoutVue from '@/layout/TableLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: Default,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/my-parent',
          name: 'myParent',
          component: () => import('@/pages/myParent.vue')
        },
        {
          path: '/my-student',
          name: 'myStudent',
          component: () => import('@/pages/myStudent.vue')
        },

        {
          path: '/setting-profile',
          name: 'settingProfile',
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
    },
    {
      path: '/',
      name: 'teacher',
      component: TableLayoutVue,
      children: [
        {
          path: '/teacher',
          component: () => import('@/pages/myTeacher.vue')
        }
      ]
    }
  ]
})

export default router
