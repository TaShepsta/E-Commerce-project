import { createRouter, createWebHistory } from 'vue-router'

// Your pages
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'

// Teammates' pages — swap these for their real files as they build them.
// Until then, PlaceholderView keeps every route working inside the
// shared Navbar/Footer layout.
import PlaceholderView from '../views/PlaceholderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PlaceholderView,
      props: { title: 'Home' }, // teammate: replace with HomeView.vue
    },
    {
      path: '/browse',
      name: 'browse',
      component: PlaceholderView,
      props: { title: 'Browse' }, // teammate: replace with BrowseView.vue
    },
    {
      path: '/categories',
      name: 'categories',
      component: PlaceholderView,
      props: { title: 'Categories' }, // teammate: replace with CategoriesView.vue
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: PlaceholderView,
      props: { title: 'How it Works' }, // teammate: replace with HowItWorksView.vue
    },
    {
      path: '/become-an-owner',
      name: 'become-an-owner',
      component: PlaceholderView,
      props: { title: 'Become an Owner' }, // teammate: replace with BecomeOwnerView.vue
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
  ],
})

export default router