import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../views/EditorView.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/ResultView.vue')
    },
    {
      path: "/:catchall(.*)*", // Catch all uncaught path
      name: "home",
      component: HomeView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 } // Always start at the top of the page
  }
})

export default router
