import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ManageCategories from '../views/ManageCategories.vue'
import ManageProducts from '../views/ManageProducts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'login',
      component: LoginView,
      meta: { layout: 'auth' },
    },
    {
      path: '/home',
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
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { layout: 'admin' },
    },
    {
      path: '/manage-categories',
      name: 'manage-categories',
      component: ManageCategories,
      meta: { layout: 'admin' },
    },
    {
      path: '/manage-products',
      name: 'manage-products',
      component: ManageProducts,
      meta: { layout: 'admin' },
    },
  ],
})

export default router
