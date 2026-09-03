<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-shell">
    <Navbar />
    <main class="app-main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
@import './assets/theme.css';

.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
}
</style>