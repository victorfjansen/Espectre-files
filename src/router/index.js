import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/views/Home.vue'
import Dashboard from '@/views/Dashboard.vue'
import Estados from '@/views/Estados.vue'
import Erro from '@/views/Erro.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/index.html',
    redirect: '/',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/estados',
    name: 'estados',
    component: Estados,
  },
  {
    path: '/:pathMatch(.*)*',
    component: Erro,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
