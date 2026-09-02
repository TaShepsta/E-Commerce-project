<template>
  <div class="browse-page">
    <section class="browse-head">
      <RouterLink to="/categories" class="back-link"
        >← All categories</RouterLink
      >
      <p class="eyebrow">
        {{ selectedEvent ? "RENT BY EVENT" : "EXPLORE RENTOSPHERE" }}
      </p>
      <h1>{{ selectedEvent?.name || "All rentals" }}</h1>
      <p class="browse-description">
        {{
          selectedEvent?.description ||
          "Practical things for projects, celebrations, weekends and everyday life."
        }}
      </p>
      <div class="browse-tools">
        <label class="search-field"
          ><span>⌕</span
          ><input
            v-model="searchTerm"
            type="search"
            placeholder="Search rentals"
            aria-label="Search rentals" /></label
        ><span class="result-count"
          >{{ filteredProducts.length }} items available</span
        >
      </div>
    </section>
    <section class="results-section">
      <div v-if="filteredProducts.length" class="product-grid">
        <article
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.imageAlt" /><span
              class="availability"
              >Available</span
            >
          </div>
          <div class="product-details">
            <div class="product-title">
              <h2>{{ product.name }}</h2>
              <button type="button" aria-label="Save item">♡</button>
            </div>
            <div class="rating">
              <span>★</span> {{ product.rating }}
              <a href="#reviews">({{ product.reviews }} reviews)</a>
            </div>
            <div class="rental-meta">
              <span>⌁ {{ product.times }}</span
              ><span>✓ Flexible pickup</span>
            </div>
            <div class="product-footer">
              <strong
                >R{{ product.price }}
                <small>/ {{ product.priceUnit }}</small></strong
              ><button class="view-button" type="button">View details</button>
            </div>
          </div>
        </article>
      </div>
      <div v-else class="empty-state">
        <h2>No rentals found</h2>
        <p>Try another search or explore all of our event categories.</p>
        <RouterLink to="/categories" class="primary-button"
          >Back to categories</RouterLink
        >
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { eventCategories, products } from "../data/products";

const route = useRoute();
const searchTerm = ref("");
const selectedEvent = computed(() =>
  eventCategories.find((event) => event.slug === route.query.category),
);
const filteredProducts = computed(() =>
  products.filter(
    (product) =>
      (!route.query.category || product.category === route.query.category) &&
      product.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
  ),
);
</script>

<style scoped>
.browse-page {
  --green: #0b3b32;
  --ink: #111827;
  --cream: #f7f3ea;
  --gold: #e99b13;
  min-height: 100vh;
  color: var(--ink);
  background: var(--cream);
}
.browse-head {
  max-width: 1180px;
  padding: 60px 7% 45px;
  margin: 0 auto;
}
.back-link {
  display: inline-block;
  margin-bottom: 45px;
  color: var(--green);
  text-decoration: none;
  font-size: 0.86rem;
  font-weight: 800;
}
.eyebrow {
  margin: 0 0 12px;
  color: #ce7f00;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}
.browse-head h1 {
  margin: 0 0 14px;
  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 0.9;
  letter-spacing: -0.045em;
}
.browse-description {
  max-width: 540px;
  margin-bottom: 28px;
  color: #68717a;
  line-height: 1.65;
}
.browse-tools {
  display: flex;
  align-items: center;
  gap: 17px;
}
.search-field {
  width: min(100%, 390px);
  height: 50px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 15px;
  border: 1px solid #dad6cb;
  border-radius: 8px;
  background: white;
}
.search-field span {
  color: var(--gold);
  font-size: 1.45rem;
}
.search-field input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  font: inherit;
}
.result-count {
  color: #68717a;
  font-size: 0.84rem;
}
.results-section {
  padding: 55px 7% 100px;
  background: white;
}
.product-grid {
  max-width: 1180px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin: 0 auto;
}
.product-card {
  overflow: hidden;
  border: 1px solid #e5e0d7;
  border-radius: 12px;
  background: #fbfaf7;
}
.product-image {
  height: 220px;
  position: relative;
  overflow: hidden;
  background: #d7d8d0;
}
.product-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.availability {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 9px;
  border-radius: 4px;
  color: var(--green);
  background: #e8f0e5;
  font-size: 0.7rem;
  font-weight: 800;
}
.product-details {
  padding: 20px;
}
.product-title {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 10px;
}
.product-title h2 {
  margin: 0;
  font-size: 1.16rem;
  line-height: 1.15;
}
.product-title button {
  border: 0;
  cursor: pointer;
  color: var(--green);
  background: transparent;
  font-size: 1.45rem;
  line-height: 1;
}
.rating {
  margin: 12px 0 17px;
  font-size: 0.82rem;
}
.rating span {
  color: var(--gold);
}
.rating a {
  color: #737984;
  text-decoration: none;
}
.rental-meta {
  display: grid;
  gap: 8px;
  padding: 14px 0;
  border-top: 1px solid #e4e0d7;
  border-bottom: 1px solid #e4e0d7;
  color: #68717a;
  font-size: 0.78rem;
}
.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 18px;
}
.product-footer strong {
  font-size: 1.3rem;
}
.product-footer small {
  color: #737984;
  font-size: 0.72rem;
  font-weight: 500;
}
.view-button,
.primary-button {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 0;
  border-radius: 7px;
  padding: 10px 12px;
  color: white;
  background: var(--green);
  font: inherit;
  font-size: 0.76rem;
  font-weight: 800;
}
.view-button span {
  color: #f2b33d;
}
.empty-state {
  max-width: 550px;
  margin: 0 auto;
  padding: 80px 0;
  text-align: center;
}
.empty-state h2 {
  font-size: 2rem;
}
.empty-state p {
  margin-bottom: 24px;
  color: #68717a;
}
.empty-state .primary-button {
  text-decoration: none;
}
@media (max-width: 850px) {
  .browse-head,
  .results-section {
    padding-left: 5%;
    padding-right: 5%;
  }
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .browse-head {
    padding-top: 38px;
  }
  .back-link {
    margin-bottom: 34px;
  }
  .browse-tools {
    display: block;
  }
  .search-field {
    width: 100%;
  }
  .result-count {
    display: block;
    margin-top: 12px;
  }
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
