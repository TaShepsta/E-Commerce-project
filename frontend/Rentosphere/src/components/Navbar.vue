<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const isOpen = ref(false)
const isUserMenuOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const user = computed(() => store.state.auth.user)

const initials = computed(() => {
  const name = user.value?.name || ''
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || '?'
})

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
  isUserMenuOpen.value = false
}

const handleLogout = () => {
  closeUserMenu()
  isOpen.value = false
  store.dispatch('auth/logout')
  router.push('/')
}

const userMenuRoot = ref(null)

const handleOutsideClick = (event) => {
  if (userMenuRoot.value && !userMenuRoot.value.contains(event.target)) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))
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
          <template v-if="isAuthenticated">
            <span class="link-login mobile-user-name">{{ user?.name || 'My Account' }}</span>
            <button type="button" class="btn btn-primary" @click="handleLogout">Log out</button>
          </template>
          <template v-else>
            <router-link to="/login" class="link-login" @click="isOpen = false">Log in</router-link>
            <router-link to="/signup" class="btn btn-primary" @click="isOpen = false">Sign up</router-link>
          </template>
        </div>
      </nav>

      <div class="navbar-actions">
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="link-login">Log in</router-link>
          <router-link to="/signup" class="btn btn-primary">Sign up</router-link>
        </template>

        <div v-else class="user-menu" ref="userMenuRoot">
          <button
            type="button"
            class="user-icon-btn"
            @click.stop="toggleUserMenu"
            :aria-expanded="isUserMenuOpen"
            aria-haspopup="true"
            :aria-label="`Account menu for ${user?.name || 'your account'}`"
          >
            <span class="avatar-circle">{{ initials }}</span>
          </button>

          <div class="user-dropdown" v-if="isUserMenuOpen">
            <div class="dropdown-header">
              <span class="dropdown-name">{{ user?.name }}</span>
              <span class="dropdown-email">{{ user?.email }}</span>
            </div>
            <button type="button" class="dropdown-item dropdown-logout" @click="handleLogout">Log out</button>
          </div>
        </div>
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

.mobile-user-name {
  color: var(--color-text-muted, #5b6660);
}

.user-menu {
  position: relative;
}

.user-icon-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.avatar-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--color-primary, #12402f);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  transition: opacity 0.15s ease;
}

.user-icon-btn:hover .avatar-circle {
  opacity: 0.85;
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  min-width: 220px;
  background: var(--color-surface, #ffffff);
  border: 1px solid var(--color-border, #e3e5e1);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 8px;
  z-index: 60;
}

.dropdown-header {
  display: flex;
  flex-direction: column;
  padding: 8px 10px 10px;
  border-bottom: 1px solid var(--color-border, #e3e5e1);
  margin-bottom: 6px;
}

.dropdown-name {
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--color-text);
}

.dropdown-email {
  font-size: 0.8rem;
  color: var(--color-text-muted, #5b6660);
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 9px 10px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text);
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
}

.dropdown-item:hover {
  background: var(--color-surface-alt, #f4f4f2);
}

.dropdown-logout {
  color: #b3261e;
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