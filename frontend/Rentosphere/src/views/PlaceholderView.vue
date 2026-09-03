<!--
  Blank starter for a teammate's page.
  Copy this file, rename it (e.g. BrowseView.vue), and change the title —
  it already sits inside the shared Navbar/Footer layout from App.vue,
  so it automatically matches the site design with zero extra work.
-->
<script setup>
defineProps({
  title: {
    type: String,
    default: 'Page coming soon',
  },
})
</script>

<template>
  <section class="placeholder container">
    <h1>{{ title }}</h1>
    <p>This page hasn't been built yet.</p>
  </section>
</template>

<style scoped>
.placeholder {
  padding: 96px 24px;
  text-align: center;
}
</style>