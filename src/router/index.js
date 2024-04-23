import Default from '@/layout/Default.vue'
import Authentication from '@/layout/Authentication.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TableLayoutVue from '@/layout/TableLayout.vue'
import { checkAccessToken } from '@/utils/axios/setupApi'
import notFoundVue from '@/pages/notFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: Authentication,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('../pages/login.vue')
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('../pages/register.vue')
        }
      ]
    },

    {
      name: 'trang chủ',
      component: Default,
      path: '/',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'Teacher',
          component: TableLayoutVue,
          children: [
            {
              path: '/teacher',
              name: 'Quản lý giáo viên',
              component: () => import('@/pages/myTeacher.vue')
            },
            {
              path: '/users',
              name: 'Quản lý người dùng',
              component: () => import('@/pages/myUser.vue')
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
      path: '/:catchAll(.*)',
      name: 'error404',
      component: notFoundVue
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isToken = checkAccessToken()

  if (to.meta.requiresAuth && !isToken) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
export default router
