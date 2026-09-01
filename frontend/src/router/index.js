import { createRouter, createWebHistory } from 'vue-router'
import Browse from '../views/Browse.vue'
import BecomeOwner from '../views/BecomeOwner.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/browse'},
    {path: '/browse', component: Browse},
    {path: '/become-owner', component: BecomeOwner},
  ]
})