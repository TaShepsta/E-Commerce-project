<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* =========================
   GLOBAL STYLES
========================= */

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;

  font-family: Arial, Helvetica, sans-serif;

  background: #ffffff;
  color: #111111;
}

body {
  min-width: 320px;
}

button,
input,
select,
textarea {
  font-family: inherit;
}

a {
  font-family: inherit;
}
</style>