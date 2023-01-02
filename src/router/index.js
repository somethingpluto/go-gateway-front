import Vue from 'vue'
import Router from 'vue-router'

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
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '服务信息', icon: 'dashboard', affix: false }
    }]
  },
  {
    path: '/service',
    component: Layout,
    redirect: '/service/list',
    name: 'Service',
    meta: { title: '服务管理', icon: 'table' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/service/list'),
        name: '服务列表',
        meta: { title: '服务列表', icon: 'table' }
      },
      {
        path: 'add_http',
        component: () => import('@/views/service/AddHttpService'),
        name: 'AddHTTP',
        meta: { title: '添加HTTP', icon: 'el-icon-sort' }
      },
      {
        path: 'add_tcp',
        component: () => import('@/views/service/AddTcpService'),
        name: 'AddTCP',
        meta: { title: '添加TCP', icon: 'el-icon-rank' }
      },
      {
        path: 'add_grpc',
        component: () => import('@/views/service/AddGrpcService'),
        name: 'AddGRPC',
        meta: { title: '添加GRPC', icon: 'el-icon-refresh-right' }
      },
      {
        path: 'service_edit_http/:id(\\d+)',
        component: () => import('@/views/service/AddHttpService'),
        name: '修改HTTP服务',
        meta: {
          title: '修改HTTP服务',
          icon: 'component',
          affix: false
        },
        hidden: true
      },
      {
        path: 'service_edit_tcp/:id(\\d+)',
        component: () => import('@/views/service/AddTcpService'),
        name: '修改TCP服务',
        meta: {
          title: '修改TCP服务',
          icon: 'component',
          affix: false
        },
        hidden: true
      },
      {
        path: 'service_edit_grpc/:id(\\d+)',
        component: () => import('@/views/service/AddGrpcService'),
        name: '修改GRPC服务',
        meta: {
          title: '修改GRPC服务',
          icon: 'component',
          affix: false
        },
        hidden: true
      },
      {
        path: 'service_stat/:id(\\d+)',
        component: () => import('@/views/service/Stat'),
        name: '服务统计',
        meta: {
          title: '服务统计',
          icon: 'component',
          affix: false
        },
        hidden: true
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
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
