import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Create from '../views/Create.vue';
import View from '../views/View.vue';
import Login from '../views/Login.vue';
import UserProfile from '../views/UserProfile.vue'; 
import TuningGuitar from '../views/TuningGuitar.vue'; 
import FavoritesPage from '../views/FavoritesPage.vue';
import RejectedTabs from '../views/RejectedTabs.vue';
import ErrorPage from '../views/ErrorPage.vue'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../firebaseApp';

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' },
  },
  {
    path: '/home',
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
  {
    path: '/tuning-Guitar', 
    name: 'TuningGuitar',
    component: TuningGuitar, 
  },
  {
    path: '/favorites', 
    name: 'Favorites',
    component: FavoritesPage, 
  },
  {
    path: '/rejected', 
    name: 'RejectedTabs',
    component: RejectedTabs, 
  },
  {
    path: '/:catchAll(.*)',
    name: 'ErrorPage',
    component: ErrorPage,
  }
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Firebase authentication state listener
const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is authenticated, store user data in localStorage or use Vuex to manage state
    localStorage.setItem('login_data', JSON.stringify(user));
  } else {
    // User is not authenticated, remove login data from localStorage
    localStorage.removeItem('login_data');
  }
});

router.beforeEach(async (to, from, next) => {
  const login_data = localStorage.getItem('login_data');
  const isAuthenticated = !!login_data; // Check if there is login data in localStorage

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
