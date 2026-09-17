import { createRouter, createWebHistory } from "vue-router";

import RenterSignupView from "../views/RenterSignupView.vue";
import OwnerSignupView from "../views/OwnerSignupView.vue";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import HowItWorksView from "../views/HowItWorksView.vue";
import BrowseView from "../views/BrowseView.vue";
import MyEarningsView from "../views/MyEarningsView.vue";
import MyListingsView from "../views/MyListingsView.vue";
import BecomeAnOwner from "../views/BecomeAnOwner.vue";
import AdminOwnerApplicationsView from "../views/AdminOwnerApplicationsView.vue";
import store from "../stores/index.js";

import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";

import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import ResetPasswordView from "../views/ResetPasswordView.vue";
import MyBookingsView from "../views/MyBookingsView.vue";
import PaymentSuccessView from "../views/PaymentSuccessView.vue";
import PaymentCancelView from "../views/PaymentCancelView.vue";

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

    {
      path: "/my-listings",
      name: "my-listings",
      component: MyListingsView,
      meta: { requiresOwner: true },
    },

    {
      path: "/my-earnings",
      name: "my-earnings",
      component: MyEarningsView,
      meta: { requiresOwner: true },
    },

    {
      path: "/how-it-works",
      name: "how-it-works",
      component: HowItWorksView,
    },

    {
      path: "/become-owner",
      name: "become-owner",
      component: BecomeAnOwner,
    },

    {
      path: "/admin/owner-applications",
      name: "admin-owner-applications",
      component: AdminOwnerApplicationsView,
      meta: { requiresAdmin: true },
    },

    {
      path: "/about",
      name: "about",
      component: AboutView,
    },

    {
      path: "/cart",
      name: "cart",
      component: Cart,
      meta: { requiresAuth: true },
    },

    {
      path: "/my-bookings",
      name: "my-bookings",
      component: MyBookingsView,
      meta: { requiresAuth: true },
    },

    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
      meta: { requiresAuth: true },
    },

    {
      path: "/payment-success",
      name: "payment-success",
      component: PaymentSuccessView,
      meta: { requiresAuth: true },
    },

    {
      path: "/payment-cancel",
      name: "payment-cancel",
      component: PaymentCancelView,
      meta: { requiresAuth: true },
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },

    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },

    {
      path: "/signup/renter",
      name: "signup-renter",
      component: RenterSignupView,
    },

    {
      path: "/signup/owner",
      name: "signup-owner",
      component: OwnerSignupView,
    },

    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPasswordView,
    },

    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPasswordView,
    },
  ],
});

router.beforeEach((to) => {
  if (to.meta?.requiresAdmin && store.state.auth.user?.role !== "admin") {
    return { path: "/" };
  }

  if (to.meta?.requiresAuth && !store.getters["auth/isAuthenticated"]) {
    return { path: "/login", query: { redirect: to.fullPath } };
  }

  if (to.meta?.requiresOwner) {
    const user = store.state.auth.user;
    const canAccess = user?.role === "admin" ||
      (user?.role === "owner" && user?.ownerStatus === "approved");

    if (!canAccess) {
      return { path: user ? "/become-owner" : "/login", query: user ? {} : { redirect: to.fullPath } };
    }
  }
});

export default router;