import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import View from '../views/View.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/view/:id',
    name: 'View',
    component: View
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router