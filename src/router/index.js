import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView,
      meta: { layout: 'default' },
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
      meta: { layout: 'default' },
    },
  ],
})

export default router
