import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/calendar',
    name: 'Calendar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Calendar.vue')
  },
  {
    path: '/betChampionship',
    name: 'BetChampionship',
    component: () => import(/* webpackChunkName: "about" */ '../components/BetChampionship.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "about" */ '../components/News.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
