import Vue from 'vue'
import Router from 'vue-router'
import getters from '@/store/getters'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '仪表盘',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard', roles: ['low', 'mid', 'high'] }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  // 信息采集模块
  {
    path: '/info-collect',
    component: Layout,
    meta: {
      roles: 'low',
      title: '信息采集',
      icon: '数据录入'
    },
    children: [
      {
        path: 'addInfo',
        name: 'addInfo',
        component: () => import('@/views/info-collect/AddPeople'),
        meta: { title: '人员录入', icon: '人员', roles: 'low' }
      },
      {
        path: 'Query',
        name: 'Query',
        component: () => import('@/views/info-collect/Query'),
        meta: { title: '人员查询', icon: '查询', roles: 'low' }
      }
    ]
  },
  // 社区业务
  {
    path: '/communityBusiness',
    component: Layout,
    meta: {
      roles: 'low',
      title: '社区业务',
      icon: 'form'
    },
    children: [
      {
        path: 'trans',
        name: 'trans',
        component: () => import('@/views/community/Trans'),
        meta: { title: '人员迁移', icon: '商户迁移', roles: 'low' }
      },
      {
        path: 'death',
        name: 'death',
        component: () => import('@/views/community/Death'),
        meta: { title: '生死管理', icon: '死因管理', roles: 'low' }
      }
    ]
  },
  // 社区管理
  {
    path: '/communityManage',
    component: Layout,
    meta: {
      roles: 'mid',
      title: '社区管理',
      icon: '社区管理'
    },
    children: [
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/community/Manage'),
        meta: { title: '管理社区', icon: '社区(1)', roles: 'mid' }
      },
      {
        path: 'visit',
        name: 'visit',
        component: () => import('@/views/community/Visit'),
        meta: { title: '走访记录', icon: '走访记录', roles: 'mid' }
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/community/Activity'),
        meta: { title: '活动记录', icon: '活动', roles: 'mid' }
      }
    ]
  },
  // 档案管理
  {
    path: '/file-manage',
    component: Layout,
    meta: {
      roles: 'low',
      title: '档案管理',
      icon: '档案,档案袋'
    },
    children: [
      {
        path: 'query',
        name: 'query',
        component: () => import('@/views/file-manage/Query'),
        meta: { title: '档案查询', icon: '查询', roles: 'low' }
      },
      // {
      //   path: 'trans-in',
      //   name: 'trans-in',
      //   component: () => import('@/views/file-manage/Trans-in'),
      //   meta: { title: '转入申请', icon: '专线接入', roles: 'low' }
      // },
      {
        path: 'fee',
        name: 'fee',
        component: () => import('@/views/file-manage/Fee'),
        meta: { title: '收费记录', icon: '收费', roles: 'low' }
      }
    ]
  },
  // 退管管理
  {
    path: '/retire-manage',
    component: Layout,
    meta: {
      roles: 'mid',
      title: '退管管理',
      icon: '离退休_fill'
    },
    children: [
      {
        path: 'query',
        name: 'query',
        component: () => import('@/views/retire-manage/Query'),
        meta: { title: '退管查询', icon: '查询', roles: 'mid' }
      },
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/retire-manage/Manage'),
        meta: { title: '管理退管', icon: '社区管理', roles: 'mid' }
      }
    ]
  },
  // 系统管理
  {
    path: '/system',
    component: Layout,
    meta: {
      roles: 'high',
      title: '权限管理',
      icon: 'system'
    },
    children: [
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/Role'),
        meta: { title: '权限查询', icon: '权限', roles: 'high' }
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/system/Add'),
        meta: { title: '新增管理员', icon: '申请权限', roles: 'high' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '/*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
