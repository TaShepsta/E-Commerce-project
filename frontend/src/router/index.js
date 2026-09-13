import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import HowItWorksView from "../views/HowItWorksView.vue";
import BrowseView from "../views/BrowseView.vue";
import MyEarningsView from "../views/MyEarningsView.vue";
import MyListingsView from "../views/MyListingsView.vue";
import BecomeAnOwner from "../views/BecomeAnOwner.vue";

import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";

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
      path: "/categories",
      name: "categories",
      component: CategoriesView,
    },

    {
      path: "/my-listings",
      name: "my-listings",
      component: MyListingsView,
    },

    {
      path: "/my-earnings",
      name: "my-earnings",
      component: MyEarningsView,
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
      path: "/about",
      name: "about",
      component: AboutView,
    },

    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },

    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
    },
  ],
});

export default router;