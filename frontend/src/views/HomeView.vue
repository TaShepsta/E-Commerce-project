<script setup>
import { computed } from "vue";
import { eventCategories, products } from "../data/products.js";
import CategoryCard from "../components/CategoryCard.vue";
import heroImage from "../assets/hero-section-bg.jpeg";
import roadImage from "../assets/rentosphere-road.png";

const popularCategories = computed(() => eventCategories.slice(0, 6));
const popularRentals = computed(() => products.slice(0, 6));

const steps = [
  {
    title: "Search",
    text: "Find the item you need, near you.",
  },
  {
    title: "Book",
    text: "Choose your dates and confirm the rental.",
  },
  {
    title: "Pick up or get it delivered",
    text: "Collect it yourself or arrange delivery.",
  },
  {
    title: "Return & we settle up",
    text: "Bring it back — the owner gets paid securely.",
  },
];
</script>

<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h1>
            <span>Rent</span> what you need.
            <span>Earn</span> from what you own.
          </h1>

          <p class="hero-description">
            Rent anything you need, from trailers to tools, appliances to
            event equipment.
          </p>

          <div class="hero-buttons">
            <RouterLink to="/browse" class="btn btn-primary">
              Browse Products
            </RouterLink>

            <RouterLink to="/become-owner" class="btn btn-secondary">
              List Your Item
            </RouterLink>
          </div>

          <div class="trust-features">
            <div class="trust-item">
              <div class="trust-icon">✓</div>
              <span>Verified &amp; Inspected</span>
            </div>

            <div class="trust-item">
              <div class="trust-icon">🔒</div>
              <span>Secure Payments</span>
            </div>

            <div class="trust-item">
              <div class="trust-icon">🚚</div>
              <span>Delivery Available</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="product-image">
            <img
              :src="heroImage"
              alt="Rental products including trailer, refrigerator, tent, and equipment"
            />
          </div>
        </div>
      </div>

      <div class="road-section">
        <div class="road-scene">
          <img
            :src="roadImage"
            alt="Rentosphere truck driving along a road"
            class="road-image"
          />
        </div>
      </div>
    </section>

    <!-- SEARCH -->
    <section class="search-section">
      <form class="search-bar" @submit.prevent="$router.push('/browse')">
        <div class="search-field">
          <label for="location">Location</label>
          <input
            id="location"
            type="text"
            placeholder="Enter location"
          />
        </div>

        <div class="search-field">
          <label for="category">Category</label>

          <select id="category">
            <option value="">All Categories</option>

            <option
              v-for="category in eventCategories"
              :key="category.slug"
              :value="category.slug"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary search-submit">
          Search
        </button>
      </form>
    </section>

    <!-- EARN FROM WHAT YOU OWN -->
    <section class="section alt earn-section">
      <div class="earn-copy">
        <h2>Earn from what you already own.</h2>

        <p>
          List your items and start earning extra income when others rent
          them.
        </p>

        <ul>
          <li>✔ Easy listing process</li>
          <li>✔ We do the evaluation</li>
          <li>✔ Get paid securely</li>
        </ul>

        <RouterLink to="/become-owner" class="btn btn-primary">
          Become an Owner
        </RouterLink>
      </div>
    </section>

    <!-- POPULAR CATEGORIES -->
    <section class="section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">EXPLORE</p>
          <h2>Popular Categories</h2>
        </div>

        <RouterLink to="/categories" class="section-link">
          View all categories →
        </RouterLink>
      </div>

      <div class="category-grid">
        <CategoryCard
          v-for="(category, index) in popularCategories"
          :key="category.slug"
          :event="category"
          :index="index"
        />
      </div>
    </section>

    <!-- POPULAR RENTALS -->
    <section class="section alt">
      <div class="section-heading">
        <div>
          <p class="eyebrow">TRENDING</p>
          <h2>Popular Near You</h2>
        </div>

        <RouterLink to="/browse" class="section-link">
          View all rentals →
        </RouterLink>
      </div>

      <div class="rental-grid">
        <RouterLink
          v-for="item in popularRentals"
          :key="item.id"
          :to="`/browse?category=${item.category}`"
          class="rental-card"
        >
          <div class="rental-image">
            <img
              :src="item.image"
              :alt="item.imageAlt || item.name"
            />
          </div>

          <div class="rental-info">
            <h3>{{ item.name }}</h3>

            <p class="rental-price">
              R{{ item.price }}
              <span>/ {{ item.priceUnit }}</span>
            </p>

            <p class="rental-rating">
              ★ {{ item.rating }} ({{ item.reviews }})
            </p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="section">
      <div class="section-heading centered">
        <div>
          <p class="eyebrow">SIMPLE &amp; SAFE</p>
          <h2>How Rentosphere Works</h2>
        </div>
      </div>

      <ol class="steps-grid">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
        >
          <span class="step-number">{{ index + 1 }}</span>

          <h3>{{ step.title }}</h3>

          <p>{{ step.text }}</p>
        </li>
      </ol>

      <div class="steps-cta">
        <RouterLink to="/how-it-works" class="section-link">
          See the full guide →
        </RouterLink>
      </div>
    </section>

    <!-- BECOME AN OWNER CTA -->
    <section class="cta-banner">
      <div class="cta-content">
        <h2>
          Trusted by a growing community of renters and owners.
        </h2>

        <p>
          Every listing is evaluated for safety and quality before it goes
          live, so you can rent — or list — with confidence.
        </p>
      </div>

      <RouterLink to="/become-owner" class="btn btn-accent">
        Become an Owner
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
/* =========================================================
   BASE
========================================================= */

.home {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: clip;
  display: flex;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
}

.home *,
.home *::before,
.home *::after {
  box-sizing: border-box;
}

.home img {
  max-width: 100%;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--gold);
  font-weight: 800;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
}

/* =========================================================
   BUTTONS
========================================================= */

.btn {
  min-width: 165px;
  padding: 15px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
  white-space: nowrap;
  box-sizing: border-box;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: #063b2f;
  color: #ffffff;
}

.btn-primary:hover {
  background: #052e25;
}

.btn-secondary {
  background: #ffffff;
  color: #111111;
  border: 1px solid #222222;
}

.btn-secondary:hover {
  background: #f5f5f5;
}

.btn-accent {
  background: var(--gold);
  color: #1a1a1a;
}

/* =========================================================
   HERO
========================================================= */

.hero {
  width: 100%;
  min-width: 0;
  background: #ffffff;
  overflow: hidden;
}

.hero-container {
  width: 100%;
  max-width: 1450px;
  min-height: 610px;
  margin: 0 auto;
  padding: 55px 50px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 45px;
  align-items: center;
  box-sizing: border-box;
}

.hero-content {
  position: relative;
  padding-left: 10px;
  min-width: 0;
  max-width: 100%;
}

.hero-content h1 {
  margin: 0;
  max-width: 650px;
  font-size: clamp(48px, 5vw, 76px);
  line-height: 0.98;
  font-weight: 800;
  letter-spacing: -3px;
  color: #101010;
  overflow-wrap: break-word;
}

.hero-content h1 span {
  color: #063b2f;
}

.hero-description {
  width: 100%;
  max-width: 540px;
  margin: 28px 0 30px;
  font-size: 18px;
  line-height: 1.6;
  color: #333333;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 38px;
}

.trust-features {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 500;
  color: #222222;
  min-width: 0;
}

.trust-icon {
  width: 25px;
  height: 25px;
  flex: 0 0 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #063b2f;
  font-size: 15px;
}

.hero-visual {
  width: 100%;
  min-width: 0;
  min-height: 500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  width: 100%;
  max-width: 100%;
  height: 430px;
  border-radius: 24px;
  overflow: hidden;
  background: #f4f1e8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* =========================================================
   ROAD
========================================================= */

.road-section {
  width: 100%;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  margin-top: 5px;
}

.road-scene {
  width: 100%;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  line-height: 0;
}

.road-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  min-height: 115px;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* =========================================================
   SEARCH
========================================================= */

.search-section {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px 48px;
  box-sizing: border-box;
}

.search-bar {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px;
  box-sizing: border-box;
}

.search-field {
  flex: 1 1 200px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.search-field label {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--muted);
}

.search-field input,
.search-field select {
  width: 100%;
  min-width: 0;
  max-width: 100%;
  border: none;
  font: inherit;
  font-size: 0.92rem;
  color: var(--ink);
  background: transparent;
}

.search-field input:focus,
.search-field select:focus {
  outline: none;
}

.search-submit {
  align-self: center;
}

/* =========================================================
   SECTIONS
========================================================= */

.section {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 48px 24px;
  min-width: 0;
  box-sizing: border-box;
}

.section.alt {
  width: 100%;
  max-width: none;
  background: var(--cream);
}

.section.alt > * {
  width: 100%;
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

.section-heading {
  width: 100%;
  min-width: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
  gap: 16px;
  flex-wrap: wrap;
}

.section-heading.centered {
  justify-content: center;
  text-align: center;
}

.section-heading h2 {
  margin: 0;
  font-size: 1.7rem;
  color: var(--ink);
}

.section-link {
  color: var(--green);
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
}

/* =========================================================
   EARN SECTION
========================================================= */

.earn-section {
  text-align: center;
}

.earn-copy {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}

.earn-copy h2 {
  margin: 0 0 12px;
  font-size: 1.8rem;
  color: var(--ink);
}

.earn-copy p {
  margin: 0 0 18px;
  color: var(--muted);
  line-height: 1.6;
}

.earn-copy ul {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  justify-content: center;
  gap: 22px;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: var(--ink);
}

/* =========================================================
   CATEGORIES
========================================================= */

.category-grid {
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  min-width: 0;
}

/* =========================================================
   RENTALS
========================================================= */

.rental-grid {
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 22px;
  min-width: 0;
}

.rental-card {
  width: 100%;
  min-width: 0;
  display: block;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.rental-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(17, 24, 39, 0.1);
}

.rental-image {
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.rental-image img {
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.rental-info {
  width: 100%;
  min-width: 0;
  padding: 16px;
}

.rental-info h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  overflow-wrap: break-word;
}

.rental-price {
  margin: 0 0 4px;
  font-weight: 800;
  color: var(--green);
}

.rental-price span {
  font-weight: 500;
  color: var(--muted);
  font-size: 0.8rem;
}

.rental-rating {
  margin: 0;
  font-size: 0.82rem;
  color: var(--muted);
}

/* =========================================================
   HOW IT WORKS
========================================================= */

.steps-grid {
  width: 100%;
  max-width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  text-align: center;
  min-width: 0;
}

.steps-grid li {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-number {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  border-radius: 50%;
  background: var(--gold);
  color: #1a1a1a;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.steps-grid h3 {
  margin: 0;
  font-size: 1rem;
  overflow-wrap: break-word;
}

.steps-grid p {
  width: 100%;
  max-width: 220px;
  margin: 0;
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.5;
}

.steps-cta {
  text-align: center;
  margin-top: 28px;
}

/* =========================================================
   CTA
========================================================= */

.cta-banner {
  width: 100%;
  max-width: 100%;
  background: var(--green);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  padding: 48px 24px;
  box-sizing: border-box;
}

.cta-content {
  width: 100%;
  max-width: 640px;
  min-width: 0;
}

.cta-banner h2 {
  margin: 0 0 10px;
  font-size: 1.5rem;
  overflow-wrap: break-word;
}

.cta-banner p {
  margin: 0;
  opacity: 0.85;
  line-height: 1.6;
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1100px) {
  .hero-container {
    grid-template-columns: minmax(0, 1fr);
    min-height: auto;
    padding: 50px 35px;
  }

  .hero-content {
    text-align: center;
    padding-left: 0;
  }

  .hero-content h1 {
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons,
  .trust-features {
    justify-content: center;
  }

  .hero-visual {
    min-height: 0;
  }

  .product-image {
    max-width: 850px;
    margin: 0 auto;
  }

  .road-image {
    min-height: 100px;
  }
}

@media (max-width: 900px) {
  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .steps-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .rental-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 650px) {
  .hero {
    overflow-x: hidden;
  }

  .hero-container {
    width: 100%;
    min-height: auto;
    padding: 32px 16px 30px;
    gap: 28px;
    grid-template-columns: minmax(0, 1fr);
  }

  .hero-content {
    width: 100%;
    min-width: 0;
    padding: 0;
    text-align: center;
  }

  .hero-content h1 {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    font-size: clamp(36px, 11vw, 48px);
    line-height: 1.02;
    letter-spacing: -1.8px;
    overflow-wrap: anywhere;
  }

  .hero-description {
    width: 100%;
    max-width: 100%;
    margin: 18px auto 24px;
    font-size: 15px;
    line-height: 1.55;
  }

  .hero-buttons {
    width: 100%;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 28px;
  }

  .hero-buttons .btn {
    width: 100%;
    min-width: 0;
  }

  .trust-features {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .trust-item {
    width: 100%;
    justify-content: center;
    min-width: 0;
  }

  .hero-visual {
    width: 100%;
    min-height: 0;
  }

  .product-image {
    width: 100%;
    height: 270px;
    border-radius: 18px;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .road-section {
    width: 100%;
    margin-top: 0;
  }

  .road-scene {
    width: 100%;
    height: 85px;
  }

  .road-image {
    width: 100%;
    height: 85px;
    min-height: 0;
    object-fit: cover;
  }

  /* SEARCH */

  .search-section {
    width: 100%;
    max-width: 100%;
    padding: 0 14px 36px;
  }

  .search-bar {
    width: 100%;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    border-radius: 12px;
  }

  .search-field {
    width: 100%;
    min-width: 0;
    flex: none;
  }

  .search-field input,
  .search-field select {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: 44px;
  }

  .search-submit {
    width: 100%;
    min-width: 0;
    align-self: stretch;
  }

  /* SECTIONS */

  .section {
    width: 100%;
    max-width: 100%;
    padding: 38px 16px;
    overflow: hidden;
  }

  .section.alt {
    width: 100%;
    max-width: 100%;
  }

  .section.alt > * {
    width: 100%;
    max-width: 100%;
  }

  /* EARN */

  .earn-copy {
    width: 100%;
    max-width: 100%;
  }

  .earn-copy h2 {
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .earn-copy p {
    font-size: 0.92rem;
  }

  .earn-copy ul {
    flex-direction: column;
    align-items: center;
    gap: 9px;
  }

  .earn-copy .btn {
    width: 100%;
    min-width: 0;
  }

  /* SECTION HEADINGS */

  .section-heading {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 9px;
    margin-bottom: 20px;
  }

  .section-heading.centered {
    align-items: center;
    text-align: center;
  }

  .section-heading h2 {
    font-size: 1.45rem;
    line-height: 1.25;
  }

  .section-link {
    font-size: 0.84rem;
  }

  /* CATEGORIES */

  .category-grid {
    width: 100%;
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  /* RENTALS */

  .rental-grid {
    width: 100%;
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .rental-card {
    width: 100%;
    min-width: 0;
  }

  .rental-image {
    width: 100%;
    height: 190px;
  }

  /* STEPS */

  .steps-grid {
    width: 100%;
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
  }

  .steps-grid li {
    width: 100%;
  }

  .steps-grid p {
    max-width: 280px;
  }

  .steps-cta {
    margin-top: 24px;
  }

  /* CTA */

  .cta-banner {
    width: 100%;
    max-width: 100%;
    padding: 38px 18px;
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 20px;
  }

  .cta-content {
    width: 100%;
    max-width: 100%;
  }

  .cta-banner h2 {
    font-size: 1.3rem;
    line-height: 1.3;
  }

  .cta-banner p {
    font-size: 0.9rem;
    line-height: 1.55;
  }

  .cta-banner .btn {
    width: 100%;
    min-width: 0;
  }
}

/* =========================================================
   SMALL PHONES
========================================================= */

@media (max-width: 400px) {
  .hero-container {
    padding: 28px 14px 26px;
  }

  .hero-content h1 {
    font-size: clamp(34px, 10.5vw, 40px);
    letter-spacing: -1.5px;
  }

  .hero-description {
    font-size: 14px;
  }

  .product-image {
    height: 235px;
    border-radius: 16px;
  }

  .road-scene,
  .road-image {
    height: 72px;
  }

  .search-section {
    padding-left: 10px;
    padding-right: 10px;
  }

  .search-bar {
    padding: 12px;
  }

  .section {
    padding-left: 14px;
    padding-right: 14px;
  }

  .rental-image {
    height: 175px;
  }

  .cta-banner {
    padding-left: 14px;
    padding-right: 14px;
  }
}
</style>