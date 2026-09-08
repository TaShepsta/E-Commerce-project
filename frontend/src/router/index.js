import { createRouter, createWebHistory } from 'vue-router'
import Browse from '../views/Browse.vue'
import BecomeOwner from '../views/BecomeOwner.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/browse'},
    {path: '/browse', component: Browse},
    {path: '/become-owner', component: BecomeOwner},
    {path: '/cart', component: Cart},
    {path: '/checkout', component: Checkout},
  ]
})