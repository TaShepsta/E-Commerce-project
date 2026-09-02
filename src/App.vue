<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->

<script setup>
import logo from "./assets/rentosphere.png";
</script>

<template>
  <div id="app">
    <!-- NAVIGATION -->
    <header class="navbar">
      <RouterLink to="/" class="logo-link">
        <img :src="logo" alt="Rentosphere logo" />
      </RouterLink>

      <nav class="desktop-nav">
        <RouterLink to="/"> Home </RouterLink>

        <RouterLink to="/browse"> Browse </RouterLink>

        <RouterLink to="/categories"> Categories </RouterLink>

        <RouterLink to="/how-it-works"> How It Works </RouterLink>

        <RouterLink to="/become-owner"> Become an Owner </RouterLink>

        <RouterLink to="/about"> About Us </RouterLink>
      </nav>

      <div class="auth-buttons">
        <button class="login-button">Log in</button>

        <button class="signup-button">Sign up</button>
      </div>
    </header>

    <!-- PAGE CONTENT -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Inter, Arial, Helvetica, sans-serif;
  background: #f7f3ea;
}

button,
a {
  font-family: inherit;
}

.navbar {
  min-height: 72px;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: initial;
  gap: 30px;
  background: white;
  border-bottom: 1px solid #e6e2da;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo-link {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-link img {
  width: 175px;
  height: auto;
  display: block;
}

.desktop-nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
}

.desktop-nav a {
  position: relative;
  color: #111827;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  transition: 0.2s ease;
}

.desktop-nav a:hover,
.desktop-nav a.router-link-active {
  color: #111827;
}

.desktop-nav a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -8px;
  left: 0;
  height: 2px;
  transform: scaleX(0);
  transform-origin: center;
  background: #e99b13;
  transition: transform 0.2s ease;
}

.desktop-nav a:hover::after,
.desktop-nav a.router-link-active::after {
  transform: scaleX(1);
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.login-button,
.signup-button {
  border: none;
  cursor: pointer;
  padding: 10px 17px;
  border-radius: 8px;
  font-weight: 600;
}

.login-button {
  background: transparent;
  color: #111827;
}

.signup-button {
  background: #0b3b32;
  color: white;
}

.signup-button:hover {
  background: #092f29;
}

@media (max-width: 1050px) {
  .desktop-nav {
    gap: 16px;
  }

  .desktop-nav a {
    font-size: 0.78rem;
  }

  .logo-link img {
    width: 150px;
  }
}

@media (max-width: 800px) {
  .navbar {
    min-height: 112px;
    flex-wrap: wrap;
    gap: 8px 16px;
    padding: 0 5%;
  }

  .desktop-nav {
    flex: initial;
    width: 100%;
    order: 3;
    justify-content: flex-start;
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 10px;
    scrollbar-width: none;
  }

  .desktop-nav::-webkit-scrollbar {
    display: none;
  }

  .desktop-nav a {
    flex: 0 0 auto;
    font-size: 0.8rem;
  }

  .logo-link img {
    width: 132px;
  }

  .auth-buttons {
    margin-left: auto;
  }

  .login-button,
  .signup-button {
    padding: 8px 11px;
    font-size: 0.78rem;
  }
}
</style>
