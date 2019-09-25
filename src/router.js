import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/index.vue')
    },
    {
      path: '/edition',
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
})
