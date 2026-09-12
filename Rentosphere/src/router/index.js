import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [

    // =========================
    // HOME
    // =========================

    {
      path: '/',
      name: 'home',
      component: Home,
    },


    // =========================
    // ABOUT
    // =========================

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },


    // =========================
    // SIGN UP
    // =========================

    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    },


    // =========================
    // RENTER SIGN UP
    // =========================

    {
      path: '/signup/renter',
      name: 'renter-signup',
      component: () => import('../views/RenterSignupView.vue'),
    },


    // =========================
    // OWNER SIGN UP
    // =========================

    {
      path: '/signup/owner',
      name: 'owner-signup',
      component: () => import('../views/OwnerSignupView.vue'),
    },

  ],

})

export default router