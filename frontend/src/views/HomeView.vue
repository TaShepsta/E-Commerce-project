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
          <label>Location</label>
          <input type="text" placeholder="Enter location" />
        </div>
        <div class="search-field">
          <label>Category</label>
          <select>
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
            <img :src="item.image" :alt="item.imageAlt || item.name" />
          </div>
          <div class="rental-info">
            <h3>{{ item.name }}</h3>
            <p class="rental-price">
              R{{ item.price }} <span>/ {{ item.priceUnit }}</span>
            </p>
            <p class="rental-rating">★ {{ item.rating }} ({{ item.reviews }})</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="section">
      <div class="section-heading centered">
        <p class="eyebrow">SIMPLE &amp; SAFE</p>
        <h2>How Rentosphere Works</h2>
      </div>

      <ol class="steps-grid">
        <li v-for="(step, index) in steps" :key="step.title">
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
      <div>
        <h2>Trusted by a growing community of renters and owners.</h2>
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
.home {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hero {
  width: 100%;
  background: #ffffff;
}

.hero-container {
  max-width: 1450px;
  min-height: 610px;
  margin: 0 auto;
  padding: 55px 50px;
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 45px;
  align-items: center;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--gold);
  font-weight: 800;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
}

.hero-content {
  position: relative;
  padding-left: 10px;
}

.hero-content h1 {
  margin: 0;
  max-width: 650px;
  font-size: clamp(48px, 5vw, 76px);
  line-height: 0.98;
  font-weight: 800;
  letter-spacing: -3px;
  color: #101010;
}

.hero-content h1 span {
  color: #063b2f;
}

.hero-description {
  max-width: 540px;
  margin: 28px 0 30px;
  font-size: 18px;
  line-height: 1.6;
  color: #333333;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 38px;
}

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
  transition: transform 0.2s ease, background 0.2s ease;
  white-space: nowrap;
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
}

.trust-icon {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #063b2f;
  font-size: 15px;
}

.hero-visual {
  min-height: 500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  width: 100%;
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
  height: 100%;
  object-fit: cover;
  display: block;
}

.road-section {
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-top: 5px;
}

.road-scene {
  width: 100%;
  position: relative;
  overflow: hidden;
  line-height: 0;
}

.road-image {
  width: 100%;
  height: auto;
  min-height: 115px;
  object-fit: cover;
  object-position: center;
  display: block;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.steps-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  text-align: center;
}

@media (max-width: 1100px) {
  .hero-container {
    grid-template-columns: 1fr;
    padding: 50px 35px;
  }

  .hero-content {
    text-align: center;
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

  .road-image {
    min-height: 100px;
    object-fit: cover;
  }
}

@media (max-width: 900px) {
  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .steps-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 650px) {
  .hero-container {
    padding: 35px 20px;
  }

  .hero-content h1 {
    font-size: 48px;
    letter-spacing: -2px;
  }

  .hero-description {
    font-size: 16px;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .hero-buttons .btn {
    width: 100%;
    box-sizing: border-box;
  }

  .trust-features {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .hero-visual {
    min-height: 0;
    align-items: flex-start;
  }

  .product-image {
    width: 100%;
    height: 350px;
  }

  .road-section {
    margin-top: 0;
  }

  .road-scene {
    width: 100%;
    height: 100px;
  }

  .road-image {
    width: 100%;
    height: 100px;
    min-height: 0;
    object-fit: cover;
    object-position: center;
  }

  .category-grid,
  .steps-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 400px) {
  .hero-content h1 {
    font-size: 42px;
  }

  .road-scene {
    height: 85px;
  }

  .road-image {
    height: 85px;
  }
}

.search-section {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px 48px;
}

.search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px;
}

.search-field {
  flex: 1;
  min-width: 140px;
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

.earn-section {
  text-align: center;
}

.earn-copy {
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

.section {
  max-width: 1180px;
  margin: 0 auto;
  padding: 48px 24px;
  min-width: 0;
}

.section.alt {
  background: var(--cream);
  max-width: none;
}

.section.alt > * {
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
}

.section-heading {
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

.rental-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 22px;
  min-width: 0;
}

.rental-card {
  display: block;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.rental-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(17, 24, 39, 0.1);
}

.rental-image {
  height: 160px;
}

.rental-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.rental-info {
  padding: 16px;
}

.rental-info h3 {
  margin: 0 0 8px;
  font-size: 1rem;
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

.steps-grid li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-number {
  width: 42px;
  height: 42px;
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
}

.steps-grid p {
  margin: 0;
  color: var(--muted);
  font-size: 0.88rem;
  max-width: 220px;
}

.steps-cta {
  text-align: center;
  margin-top: 28px;
}

.cta-banner {
  background: var(--green);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  padding: 48px 24px;
}

.cta-banner > div {
  max-width: 640px;
}

.cta-banner h2 {
  margin: 0 0 10px;
  font-size: 1.5rem;
}

.cta-banner p {
  margin: 0;
  opacity: 0.85;
}

</style>