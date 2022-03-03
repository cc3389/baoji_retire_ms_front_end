import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
// 路由拦截器
router.beforeEach(async(to, from, next) => {
  // start progress bar 开始进度条
  NProgress.start()
  console.log('[路由拦截器]准备拦截')
  // set page title 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in 获取cookie中的token
  const hasToken = getToken()
  console.log('[路由拦截器]token:', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      console.log('[路由拦截器]userinfo:', hasGetUserInfo)
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('user/generateRoutes', roles)
          router.addRoutes(accessRoutes)// 动态添加路由
          console.log('[路由拦截器]accessRoutes:', accessRoutes)
          console.log('[路由拦截器]next()', next())
          if (to.meta.roles === store.getters.auth) {
            next()
          }
        } catch (error) {
          console.log('error', error)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    // 无权限
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly 白名单列表中的路由可以放行
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page. 跳转到登录界面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
