<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import logo from "./assets/rentosphere.png";
import Footer from "./components/Footer.vue";
import Chatbot from "./components/Chatbot.vue";
import { cartCount } from "./stores/cart.js";

const route = useRoute();
const router = useRouter();
const store = useStore();

const menuOpen = ref(false);
const profileMenuOpen = ref(false);

const isAuthenticated = computed(
  () => store.getters["auth/isAuthenticated"]
);

const currentUser = computed(() => store.state.auth.user);

const isAdmin = computed(() => currentUser.value?.role === "admin");

// Owner account
const isOwnerAccount = computed(
  () => currentUser.value?.role === "owner"
);

// Owner dashboard/navigation only unlocks after approval.
const isApprovedOwner = computed(
  () =>
    isOwnerAccount.value &&
    currentUser.value?.ownerStatus === "approved"
);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function toggleProfileMenu() {
  profileMenuOpen.value = !profileMenuOpen.value;
}

function closeProfileMenu() {
  profileMenuOpen.value = false;
}

const userInitial = computed(() => {
  const name = currentUser.value?.name || "";
  return name.trim().charAt(0).toUpperCase() || "?";
});

function handleEscape(event) {
  if (event.key === "Escape") {
    closeMenu();
    closeProfileMenu();
  }
}

function goToLogin() {
  closeMenu();
  router.push("/login");
}

function goToSignup() {
  closeMenu();
  router.push("/signup");
}

function handleLogout() {
  closeMenu();
  closeProfileMenu();

  store.dispatch("auth/logout");
  router.push("/");
}

watch(
  () => route.fullPath,
  () => {
    closeMenu();
    closeProfileMenu();
  }
);

function handleOutsideClick(event) {
  if (
    profileMenuOpen.value &&
    !event.target.closest(".profile-widget")
  ) {
    closeProfileMenu();
  }
}

onMounted(() => {
  // Refresh the user's profile so owner approval/role changes
  // are picked up without requiring another login.
  if (isAuthenticated.value) {
    store.dispatch("auth/refreshProfile");
  }

  document.addEventListener("keydown", handleEscape);
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
  document.removeEventListener("click", handleOutsideClick);
});
</script>

<template>
  <div id="app">
    <!-- NAVBAR -->
    <header class="navbar">
      <!-- LOGO -->
      <RouterLink to="/" class="logo-link">
        <img
          :src="logo"
          alt="Rentosphere logo"
        />
      </RouterLink>

      <!-- MOBILE MENU BUTTON -->
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-navigation"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- MAIN NAVIGATION -->
      <nav
        id="primary-navigation"
        class="desktop-nav"
        :class="{ 'is-open': menuOpen }"
      >
        <!-- HOME -->
        <RouterLink
          to="/"
          @click="closeMenu"
        >
          Home
        </RouterLink>

        <!-- BROWSE -->
        <RouterLink
          to="/browse"
          @click="closeMenu"
        >
          Browse
        </RouterLink>

        <!--
          MY BOOKINGS

          Visible to normal logged-in renters.
          Hidden from:
          - Admins
          - Approved owners
        -->
        <RouterLink
          v-if="
            isAuthenticated &&
            !isAdmin &&
            !isApprovedOwner
          "
          to="/my-bookings"
          @click="closeMenu"
        >
          My Bookings
        </RouterLink>

        <!-- ADMIN NAVIGATION -->
        <template v-if="isAdmin">
          <RouterLink
            to="/admin/owner-applications"
            @click="closeMenu"
          >
            Owner Applications
          </RouterLink>
        </template>

        <!-- APPROVED OWNER NAVIGATION -->
        <template v-else-if="isApprovedOwner">
          <RouterLink
            to="/my-listings"
            @click="closeMenu"
          >
            My Listings
          </RouterLink>

          <RouterLink
            to="/my-earnings"
            @click="closeMenu"
          >
            My Earnings
          </RouterLink>
        </template>

        <!-- NORMAL RENTER / PUBLIC NAVIGATION -->
        <template v-else>
          <RouterLink
            to="/how-it-works"
            @click="closeMenu"
          >
            How It Works
          </RouterLink>

          <RouterLink
            to="/become-owner"
            @click="closeMenu"
          >
            Become an Owner
          </RouterLink>

          <RouterLink
            to="/about"
            @click="closeMenu"
          >
            About Us
          </RouterLink>
        </template>
      </nav>

      <!-- RIGHT SIDE OF NAVBAR -->
      <div class="auth-buttons">
        <!-- CART -->
        <RouterLink
          v-if="isAuthenticated"
          to="/cart"
          class="cart-link"
          aria-label="View cart"
          @click="closeMenu"
        >
          <span aria-hidden="true">&#128722;</span>

          <span
            v-if="cartCount > 0"
            class="cart-badge"
          >
            {{ cartCount }}
          </span>
        </RouterLink>

        <!-- LOGGED-IN USER -->
        <template v-if="isAuthenticated">
          <div class="profile-widget">
            <!-- PROFILE AVATAR -->
            <button
              class="profile-avatar"
              type="button"
              :aria-expanded="profileMenuOpen"
              aria-haspopup="true"
              aria-label="Account menu"
              @click.stop="toggleProfileMenu"
            >
              {{ userInitial }}
            </button>

            <!-- PROFILE DROPDOWN -->
            <div
              v-if="profileMenuOpen"
              class="profile-dropdown"
            >
              <p class="profile-dropdown-name">
                {{ currentUser?.name || "there" }}
              </p>

              <p class="profile-dropdown-email">
                {{ currentUser?.email }}
              </p>

              <hr />

              <!-- ADMIN -->
              <RouterLink
                v-if="isAdmin"
                to="/admin/owner-applications"
                class="profile-dropdown-link"
                @click="closeProfileMenu"
              >
                Owner Applications
              </RouterLink>

              <!--
                MY BOOKINGS

                Normal renters only.
                Approved owners do NOT see this.
              -->
              <RouterLink
                v-if="
                  !isAdmin &&
                  !isApprovedOwner
                "
                to="/my-bookings"
                class="profile-dropdown-link"
                @click="closeProfileMenu"
              >
                My Bookings
              </RouterLink>

              <!-- MY LISTINGS -->
              <RouterLink
                v-if="isApprovedOwner"
                to="/my-listings"
                class="profile-dropdown-link"
                @click="closeProfileMenu"
              >
                My Listings
              </RouterLink>

              <!-- MY EARNINGS -->
              <RouterLink
                v-if="isApprovedOwner"
                to="/my-earnings"
                class="profile-dropdown-link"
                @click="closeProfileMenu"
              >
                My Earnings
              </RouterLink>

              <!-- LOG OUT -->
              <button
                class="profile-dropdown-logout"
                type="button"
                @click="handleLogout"
              >
                Log out
              </button>
            </div>
          </div>
        </template>

        <!-- LOGGED-OUT USER -->
        <template v-else>
          <button
            class="login-button"
            type="button"
            @click="goToLogin"
          >
            Log in
          </button>

          <button
            class="signup-button"
            type="button"
            @click="goToSignup"
          >
            Sign up
          </button>
        </template>
      </div>
    </header>

    <!-- PAGE CONTENT -->
    <main>
      <RouterView />
    </main>

    <!-- FOOTER -->
    <Footer />

    <!-- CHATBOT -->
    <Chatbot />
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

/* =========================
   NAVBAR
========================= */

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

/* =========================
   LOGO
========================= */

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

/* =========================
   MAIN NAV
========================= */

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

/* =========================
   MOBILE MENU
========================= */

.menu-toggle {
  display: none;
  width: 42px;
  height: 42px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-left: auto;
  border: 1px solid #e6e2da;
  border-radius: 8px;
  cursor: pointer;
  background: white;
}

.menu-toggle span {
  width: 19px;
  height: 2px;
  background: #0b3b32;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.menu-toggle[aria-expanded="true"] span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle[aria-expanded="true"] span:nth-child(2) {
  opacity: 0;
}

.menu-toggle[aria-expanded="true"] span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* =========================
   RIGHT SIDE
========================= */

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* =========================
   CART
========================= */

.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #111827;
  text-decoration: none;
  font-size: 1.15rem;
}

.cart-link:hover {
  background: #f7f3ea;
}

.cart-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: #e99b13;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* =========================
   PROFILE
========================= */

.profile-widget {
  position: relative;
}

.profile-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: #0b3b32;
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar:hover {
  background: #092f29;
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 210px;
  background: white;
  border: 1px solid #e6e2da;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 12px;
  z-index: 1100;
}

.profile-dropdown-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.profile-dropdown-email {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 2px 0 0;
  word-break: break-all;
}

.profile-dropdown hr {
  border: none;
  border-top: 1px solid #e6e2da;
  margin: 10px 0;
}

.profile-dropdown-link {
  display: block;
  padding: 8px 4px;
  font-size: 0.85rem;
  color: #111827;
  text-decoration: none;
  border-radius: 5px;
}

.profile-dropdown-link:hover {
  color: #0b3b32;
  background: #f7f3ea;
}

.profile-dropdown-logout {
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 4px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.85rem;
  color: #b91c1c;
  font-weight: 600;
  border-radius: 5px;
}

.profile-dropdown-logout:hover {
  background: #fef2f2;
}

/* =========================
   LOGIN / SIGNUP
========================= */

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

.login-button:hover {
  background: #f7f3ea;
}

.signup-button {
  background: #0b3b32;
  color: white;
}

.signup-button:hover {
  background: #092f29;
}

/* =========================
   TABLET
========================= */

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

/* =========================
   MOBILE
========================= */

@media (max-width: 800px) {
  .navbar {
    min-height: 72px;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 5%;
  }

  .menu-toggle {
    display: flex;
  }

  .desktop-nav {
    display: none;
    width: 100%;
    order: 3;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 0 14px;
  }

  .desktop-nav.is-open {
    display: flex;
  }

  .desktop-nav a {
    padding: 13px 4px;
    font-size: 0.8rem;
  }

  .desktop-nav a::after {
    bottom: 4px;
    transform-origin: left;
  }

  .logo-link img {
    width: 132px;
  }

  .auth-buttons {
    margin-left: 0;
  }

  .login-button,
  .signup-button {
    padding: 8px 11px;
    font-size: 0.78rem;
  }

  .profile-dropdown {
    right: 0;
    min-width: 195px;
  }
}
</style>

