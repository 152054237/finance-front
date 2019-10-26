import Vue from 'vue'
import Router from 'vue-router'
import System from './views/System.vue'
import Adminsystem from './views/adminsystem.vue'
import Admin from './views/admin/index.vue'
//倒入组件


//使用路由
Vue.use(Router)
// ES6 语法
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'login',
      component:()=>import('@/views/Login.vue')
    },
    {
      path:'/system',
      name:'system',
      component: System
    },
    {
      path: '/usersystem',
      name: 'usersystem',
      component: System,
      children: [
        { path: 'admin', name: 'admin', component: Admin },
        { path: '/system/hotel', name: 'hotel', component:()=>import('@/views/admin/hotel/index.vue')},
        { path: '/system/unit', name: 'unit', component:()=>import('@/views/admin/hotel/counit.vue')},
      ]
    },

    {
      path:'/adminlogin',
      name:'adminlogin',
      component:()=>import('@/views/adminlogin.vue')
    },
    {
      path:'/adminsystem',
      name:'adminsystem',
      component: Adminsystem
    },
    {
      path: '/finance',
      name: 'finance',
      component: Adminsystem,
      children: [
        { path: 'admin', name: 'admin', component: Admin },
        { path: '/adminsystem/adminhotel', name: 'adminhotel', component:()=>import('@/views/admin/admin/adminindex.vue')},
        { path: '/adminsystem/adminunit', name: 'adminunit', component:()=>import('@/views/admin/admin/admincounit.vue')},
      ]
    },

  ]
})
