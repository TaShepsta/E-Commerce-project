<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner container">
      <router-link to="/" class="logo" @click="isOpen = false">
        <span class="logo-mark">R</span>
        <span class="logo-text">rent<span class="logo-dot">o</span>sphere</span>
      </router-link>

      <nav class="nav-links" :class="{ open: isOpen }">
        <router-link to="/" class="nav-link" @click="isOpen = false">Home</router-link>
        <router-link to="/browse" class="nav-link" @click="isOpen = false">Browse</router-link>
        <router-link to="/categories" class="nav-link" @click="isOpen = false">Categories</router-link>
        <router-link to="/how-it-works" class="nav-link" @click="isOpen = false">How it Works</router-link>
        <router-link to="/become-an-owner" class="nav-link" @click="isOpen = false">Become an Owner</router-link>
        <router-link to="/about" class="nav-link" @click="isOpen = false">About Us</router-link>

        <div class="nav-actions-mobile">
          <router-link to="/login" class="link-login" @click="isOpen = false">Log in</router-link>
          <router-link to="/signup" class="btn btn-primary" @click="isOpen = false">Sign up</router-link>
        </div>
      </nav>

      <div class="navbar-actions">
        <router-link to="/login" class="link-login">Log in</router-link>
        <router-link to="/signup" class="btn btn-primary">Sign up</router-link>
      </div>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.1rem;
}

.logo-mark {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.logo-dot {
  color: var(--color-accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  position: relative;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text);
  padding: 6px 0;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--color-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-link.router-link-exact-active {
  color: var(--color-primary);
  font-weight: 600;
}

.nav-link.router-link-exact-active::after {
  transform: scaleX(1);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.link-login {
  font-weight: 500;
  font-size: 0.95rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.menu-toggle span {
  width: 22px;
  height: 2px;
  background: var(--color-text);
}

.nav-actions-mobile {
  display: none;
}

@media (max-width: 860px) {
  .nav-links {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    background: var(--color-surface);
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 8px 24px 20px;
    border-bottom: 1px solid var(--color-border);
    display: none;
  }
  .nav-links.open {
    display: flex;
  }
  .nav-link {
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid var(--color-surface-alt);
  }
  .nav-actions-mobile {
    display: flex;
    gap: 14px;
    margin-top: 14px;
    width: 100%;
  }
  .navbar-actions {
    display: none;
  }
  .menu-toggle {
    display: flex;
  }
}
</style>