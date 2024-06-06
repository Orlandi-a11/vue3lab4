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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/vocabulos',
      name: 'vocabulos',
      component: () => import('../views/VocabuloView.vue')
    },

    {
      path: '/encomenda',
      name: 'encomenda',
      component: () => import('../views/EncomendaView.vue')
    }



  ]
})

export default router