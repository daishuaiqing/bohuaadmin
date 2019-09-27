import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/',
      name: 'manage',
      component: () => import('./views/Index.vue'),
      children: [
        {
          path: '/',
          name: 'edition',
          component: () => import('./views/EditionList.vue')
        },
        {
          path: '/edition/add',
          name: 'Addedition',
          component: () => import('./views/Edition.vue')
        },
        {
          path: '/leasinger',
          name: 'leasinger',
          component: () => import('./views/LeasingerList.vue')
        }
      ]
    }
  ]
})
