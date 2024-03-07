import Default from '@/layout/Default.vue'
import Authentication from '@/layout/Authentication.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: Default,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/components/HomeComponent.vue')
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
    }
  ]
})

export default router
