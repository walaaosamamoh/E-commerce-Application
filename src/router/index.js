import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ManageCategories from '../views/ManageCategories.vue'
import ManageProducts from '../views/ManageProducts.vue'
import AddProduct from '../views/AddProduct.vue'
import EditProduct from '../views/EditProduct.vue'

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
      meta: { 
        layout: 'default',
        requiresAuth: true
      },
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
      meta: { 
        layout: 'default',
        requiresAuth: true
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        layout: 'admin',
        requiresAuth: true,
        requiresRole: 'admin',
      },
    },
    {
      path: '/manage-categories',
      name: 'manage-categories',
      component: ManageCategories,
      meta: {
        layout: 'admin',
        requiresAuth: true,
        requiresRole: 'admin',
      },
    },
    {
      path: '/manage-products',
      name: 'manage-products',
      component: ManageProducts,
      meta: {
        layout: 'admin',
        requiresAuth: true,
        requiresRole: 'admin',
      },
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: AddProduct,
      meta: {
        layout: 'admin',
        requiresAuth: true,
        requiresRole: 'admin',
      },
    },
    {
      path: '/edit-product/:id',
      name: 'edit-product',
      component: EditProduct,
      meta: {
        layout: 'admin',
        requiresAuth: true,
        requiresRole: 'admin'
      },
    },
  ],
})

const user = JSON.parse(localStorage.getItem('user'));
const isLoggedIn = !!user;
const userRole = user?.roleID;
router.beforeEach((to, from, next)=>{
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' });
  } else if (to.meta.requiresRole && to.meta.requiresRole !== userRole) {
    next({ name: 'home' });
  } else {
    next();
  }
})

export default router
