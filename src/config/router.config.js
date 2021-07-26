// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
 name: 'RouteView',
 render: (h) => h('router-view')
}

export const asyncRouterMap = [

 {
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: { title: 'menu.home' },
  redirect: '/dataset/excel',
  children: [
   // dashboard
   {
    path: '/dataset',
    name: '数据集',
    redirect: '/excel',
    component: RouteView,
    meta: { title: '数据集', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
    children: [
     {
      path: '/dataset/excel',
      name: 'datasetList',
      component: () => import('@/views/dataset/excel/list'),
      meta: { title: 'excel', permission: ['exception'] }

     },

     {
      path: '/dataset/sql',
      name: 'sql',
      component: () => import('@/views/dataset/sql/list'),
      meta: { title: 'mysql', permission: ['exception'] }

     },
     {
      path: '/dataset/interface',
      name: 'dataset',
      component: () => import('@/views/dataset/interface/list'),
      meta: { title: '接口', permission: ['exception'] }

     },

    ]
   },
   {
    path: '/dashboard',
    name: '报表',
    redirect: '/dashboard/pc',
    component: RouteView,
    meta: { title: '报表', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
    children: [
     {
      path: '/dashboard/pc',
      name: 'datasetPC',
      component: () => import('@/views/dashboard/list'),
      meta: { title: 'PC' }

     },

    ]
   },

  ]
 },

 {
  path: '/create/:id',
  name: 'create',
  component: () => import('@/views/dashboard/create'),
  meta: { title: '创建表', }
 },
 {
  path: '/add/customChart',
  name: 'customChart',
  component: () => import('@/views/dashboard/addCustom'),
  meta: { title: '自定义表', }
 },


]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
 {
  path: '/login',
  name: 'login',
  component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
 },
 {
  path: '/user/login',
  component: UserLayout,
  redirect: '/register',
  hidden: true,
  children: [

   {
    path: 'register',
    name: 'register',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
   },
   {
    path: 'register-result',
    name: 'registerResult',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
   },
   {
    path: 'recover',
    name: 'recover',
    component: undefined
   }
  ]
 },

 {
  path: '/404',
  component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
 }

]
