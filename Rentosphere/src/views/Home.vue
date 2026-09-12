<script setup>
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import SearchBar from '../components/SearchBar.vue'
</script>

<template>
  <main class="home-page">

    <Navbar />

    <HeroSection />

    <SearchBar />

  </main>
</template>

<style scoped>

.home-page {
  min-height: 100vh;
  background: #ffffff;
}

</style>