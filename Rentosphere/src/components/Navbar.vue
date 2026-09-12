<template>
  <header class="navbar">
    <div class="navbar-container">

      <!-- Rentosphere Logo -->
      <RouterLink to="/" class="logo">
        <img
          src="@/assets/rentosphere-logo.jpeg"
          alt="Rentosphere"
        />
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">
          Home
        </RouterLink>

        <RouterLink to="/browse" class="nav-link">
          Browse
        </RouterLink>

        <RouterLink to="/categories" class="nav-link">
          Categories
        </RouterLink>

        <RouterLink to="/how-it-works" class="nav-link">
          How it Works
        </RouterLink>

        <RouterLink to="/become-owner" class="nav-link">
          Become an Owner
        </RouterLink>

        <RouterLink to="/about" class="nav-link">
          About Us
        </RouterLink>
      </nav>

      <!-- Account -->
      <div class="account-actions">
        <RouterLink to="/login" class="login-btn">
          Log in
        </RouterLink>

        <RouterLink to="/signup" class="signup-btn">
          Sign up
        </RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="mobile-menu-btn"
        aria-label="Open menu"
      >
        ☰
      </button>

    </div>
  </header>
</template>

<style scoped>

/* =========================
   NAVBAR
========================= */

.navbar {
  width: 100%;
  height: 72px;

  background: #ffffff;

  border-bottom: 1px solid #e5e5e5;

  display: flex;
  align-items: center;

  /* Sticky navbar */
  position: sticky;
  top: 0;

  /* Keep navbar above everything */
  z-index: 1000;
}

.navbar-container {
  width: 100%;
  max-width: 1450px;

  margin: 0 auto;

  padding: 0 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}


/* =========================
   LOGO
========================= */

.logo {
  display: flex;
  align-items: center;

  text-decoration: none;

  width: 190px;
  height: 55px;
}

.logo img {
  width: 175px;
  height: auto;

  display: block;

  object-fit: contain;
}


/* =========================
   NAVIGATION
========================= */

.nav-links {
  display: flex;
  align-items: center;

  gap: 32px;
}

.nav-link {
  color: #111111;

  text-decoration: none;

  font-size: 14px;
  font-weight: 500;

  white-space: nowrap;

  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #f5a000;
}

.nav-link.router-link-exact-active {
  font-weight: 700;
}


/* =========================
   ACCOUNT
========================= */

.account-actions {
  display: flex;
  align-items: center;

  gap: 20px;

  white-space: nowrap;
}

.login-btn {
  color: #111111;

  text-decoration: none;

  font-size: 14px;
  font-weight: 500;

  transition: color 0.2s ease;
}

.login-btn:hover {
  color: #f5a000;
}

.signup-btn {
  background: #063b2f;
  color: #ffffff;

  text-decoration: none;

  padding: 12px 20px;

  border-radius: 8px;

  font-size: 14px;
  font-weight: 600;

  transition: background 0.2s ease;
}

.signup-btn:hover {
  background: #052e25;
}


/* =========================
   MOBILE MENU BUTTON
========================= */

.mobile-menu-btn {
  display: none;

  border: none;

  background: transparent;

  font-size: 26px;

  cursor: pointer;

  color: #063b2f;
}


/* =========================
   TABLET
========================= */

@media (max-width: 1150px) {

  .navbar-container {
    padding: 0 25px;
  }

  .nav-links {
    gap: 18px;
  }

  .nav-link {
    font-size: 13px;
  }

  .logo {
    width: 165px;
  }

  .logo img {
    width: 150px;
  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 850px) {

  .navbar {
    height: 65px;
  }

  .navbar-container {
    padding: 0 20px;
  }

  .nav-links,
  .account-actions {
    display: none;
  }

  .logo {
    width: 170px;
  }

  .logo img {
    width: 155px;
  }

  .mobile-menu-btn {
    display: block;
  }

}

</style>