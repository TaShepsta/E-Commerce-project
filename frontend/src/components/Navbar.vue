<template>
  <nav class="navbar">
    <img src="/rentosphere-logo.jpeg" alt="logo" />
    <div class="nav-links">
      <router-link to="/browse">Browse</router-link>
      <router-link to="/become-owner">Become an Owner</router-link>
      <router-link to="/cart">Cart ({{ cartCount }})</router-link>
    </div>
  </nav>
</template>

<script setup>
import {cartCount} from '../stores/cart.js';
</script>