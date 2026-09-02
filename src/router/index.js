// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue'),
//     },
//   ],
// })

// export default router

import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import HowItWorksView from "../views/HowItWorksView.vue";
import BrowseView from "../views/BrowseView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/browse",
      name: "browse",
      component: BrowseView,
    },
    // {
    //   path: '/browse',
    //   name: 'browse',
    //   component: () => import('../views/BrowseView.vue')
    // },
    {
      path: "/categories",
      name: "categories",
      component: CategoriesView,
    },

    {
      path: "/how-it-works",
      name: "how-it-works",
      component: HowItWorksView,
    },

    {
      path: "/become-owner",
      name: "become-owner",
      component: HomeView,
    },
    // {
    //   path: '/become-owner',
    //   name: 'become-owner',
    //   component: () => import('../views/BecomeOwnerView.vue')
    // },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
  ],
});

export default router;
