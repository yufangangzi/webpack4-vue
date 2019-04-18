import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import Main from '../views/main.vue'
Vue.use(VueRouter)
let loginRouter = {
  path: '/login',
  name: 'login',
  component: () => import('../views/login'),
  meta: { requireAuth: false }
}
let aside = [
  {
    path: '/',
    name: 'Index',
    title: '概览',
    iconclass: 'icon-0',
    component: () => import('../views/index/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/statistics',
    name: 'statistics',
    title: '统计报表',
    iconclass: 'icon-1',
    component: () => import('../views/statistics'),
    meta: { requireAuth: true }
  },
  {
    path: '/account',
    name: 'account',
    title: '用户管理',
    iconclass: 'icon-2',
    component: () => import('../views/account'),
    meta: { requireAuth: true }
  }
]
const appRouter = [
  {
    path: '/',
    name: 'zhuye',
    title: 'main',
    component: Main,
    children:  [...aside]
  },
]
let router = new VueRouter({
  mode: 'hash',
  routes: [
    loginRouter,
    ...appRouter,
  ]
})

router.beforeEach((to, from, next) => {
  // 页面title更替，若不需要可注释
  // document.title = to.meta.title
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 判断是否是登录状态
    if (Cookies.get('food_isLogin') === '1') {
      next()
    } else {
      // 否则跳回登录页
      next('/login')
    }
  } else {
    // 如果不需要登录权限，就直接resolve这个钩子
    next()
  }
})
export {router,aside}
