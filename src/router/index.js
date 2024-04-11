import Default from '@/layout/Default.vue'
import Authentication from '@/layout/Authentication.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TableLayoutVue from '@/layout/TableLayout.vue'
import { checkAccessToken } from '@/utils/axios/setupApi'
import notFoundVue from '@/pages/notFound.vue'
import testVue from '@/pages/test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'authentication',
      component: Authentication,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../pages/login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../pages/register.vue')
        }
      ]
    },

    {
      path: '/',
      name: 'trang chủ',
      component: Default,
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
    },
    {
      path: '/test',
      name: 'error404',
      component: testVue
    }
  ]
})

// router.beforeEach(async (to, from, next) => {
//   if (to.path === '/login') {
//     const isLogin = await checkAccessToken()
//     console.log('isLogin', isLogin)
//     if (isLogin) {
//       const previousRoute = localStorage.getItem('previousRoute')
//       const routerCurrent = previousRoute ? previousRoute : 'teacher'
//       console.log('routerCurrent', routerCurrent)
//       next(routerCurrent)
//     } else {
//       next() // Bỏ qua và tiếp tục chuyển hướng đến '/login'
//     }
//   } else {
//     localStorage.setItem('previousRoute', `${to.path}`)
//     next()
//   }
// })

export default router
