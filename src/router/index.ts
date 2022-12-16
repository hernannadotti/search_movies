import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ItemMovieComponent from '@/components/ItemMovieComponent.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchView.vue')
  },
  {
    path: '/item/:id',
    component: ItemMovieComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
