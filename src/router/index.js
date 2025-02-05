import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Create from '../views/Create.vue';
import View from '../views/View.vue';
import Login from '../views/Login.vue';
import UserProfile from '../views/UserProfile.vue'; // Import the UserProfile component

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
  },
  {
    path: '/view/:id',
    name: 'View',
    component: View,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile, 

  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to redirect to login if not logged in
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user') !== null; // Check if the user is logged in
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed if authenticated or no auth required
  }
});

export default router;
