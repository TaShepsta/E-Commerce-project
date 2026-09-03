<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner container">
      <div class="footer-brand">
        <span class="logo-mark">R</span>
        <span class="logo-text">rent<span class="logo-dot">o</span>sphere</span>
        <p>Rent anything you need, from trailers to tools, appliances to event equipment.</p>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <router-link to="/about">About Us</router-link>
        <router-link to="/how-it-works">How it Works</router-link>
        <router-link to="/become-an-owner">Become an Owner</router-link>
      </div>

      <div class="footer-col">
        <h4>Browse</h4>
        <router-link to="/browse">All Products</router-link>
        <router-link to="/categories">Categories</router-link>
      </div>

      <div class="footer-col">
        <h4>Account</h4>
        <router-link to="/login">Log in</router-link>
        <router-link to="/signup">Sign up</router-link>
      </div>
    </div>

    <div class="footer-bottom container">
      <p>© {{ year }} Rentosphere. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-alt);
  margin-top: 64px;
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 32px;
  padding: 48px 24px 32px;
}

.footer-brand {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-weight: 700;
}

.footer-brand p {
  flex-basis: 100%;
  margin: 8px 0 0;
  max-width: 320px;
  font-size: 0.9rem;
}

.logo-mark {
  width: 28px;
  height: 28px;
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

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-col h4 {
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.footer-col a {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.footer-col a:hover {
  color: var(--color-primary);
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding: 18px 24px;
}

.footer-bottom p {
  margin: 0;
  font-size: 0.82rem;
}

@media (max-width: 700px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
}
</style>