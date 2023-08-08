// Composables
import { createRouter, createWebHistory } from 'vue-router'

import Navbar from '@/components/Navbar.vue'

import Login from '@/layouts/LoginPage.vue'
import Register from '@/layouts/Register.vue'
import Main from '@/views/MainPage.vue'
import Shop from '@/views/ShopPage.vue'

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
