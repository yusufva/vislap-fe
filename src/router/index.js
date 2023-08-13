// Composables
import { createRouter, createWebHistory } from 'vue-router'

import Navbar from '@/components/Navbar.vue'

import Login from '@/layouts/LoginPage.vue'
import Register from '@/layouts/Register.vue'
import Main from '@/views/MainPage.vue'
import Shop from '@/views/ShopPage.vue'
import Cart from '@/views/CartPage.vue'
import Trans from '@/views/Trans/TransPage.vue'
import TransDetail from '@/views/Trans/TransDetail.vue'
import Service from '@/views/ServicePage.vue'
import About from '@/views/AboutPage.vue'

const routes = [
  {
    path: '/',
    component: Navbar,
    children: [
      {
        path: '',
        name: 'main',
        component: Main,
      },
      {
        path: 'shop',
        name: 'shop',
        component: Shop
      },
      {
        path: 'cart',
        name: 'cart',
        component: Cart
      },
      {
        path: 'transaction',
        name: 'transaction',
        component: Trans
      },
      {
        path: 'transaction/:id',
        name:'transactiondetail',
        component: TransDetail
      },
      {
        path: 'service',
        name: 'service',
        component: Service
      },
      {
        path: 'about',
        name: 'about',
        component: About
      }
    ],
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
