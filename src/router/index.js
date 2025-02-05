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

router.beforeEach(async (to, from, next) => {
  const login_data = localStorage.getItem('login_data');
  const isAuthenticated = !!login_data; 

  // Redirect to Login if unauthenticated and not on Login page
  if (!isAuthenticated && to.name !== 'Login') {
    if (to.name !== 'ErrorPage') {
      next({ name: 'Login' });
    } else {
      next();
    }
  }
  // Redirect authenticated users away from Login
  else if (isAuthenticated && to.name === 'Login') {
    next({ name: 'Home' });
  }
  // Allow navigation for all other cases
  else {
    next();
  }
});
export default router;
