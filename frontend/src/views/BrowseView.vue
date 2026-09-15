<template>
  <div class="browse-layout">
    <!-- =====================================================
         FILTER SIDEBAR
    ====================================================== -->

    <aside class="filter-sidebar">
      <div class="filter-card">
        <div class="filter-heading">
          <div>
            <span class="filter-eyebrow">REFINE</span>
            <h3>Find what you need</h3>
          </div>

          <button
            v-if="
              filters.categories.length ||
              filters.location ||
              filters.priceRange < 2000
            "
            type="button"
            class="clear-filters"
            @click="clearFilters"
          >
            Clear
          </button>
        </div>

        <div class="filter-divider"></div>

        <!-- Category -->
        <div class="filter-group">
          <div class="filter-title-row">
            <h4>Category</h4>

            <span v-if="filters.categories.length" class="selected-count">
              {{ filters.categories.length }}
            </span>
          </div>

          <div class="category-options">
            <label
              v-for="category in categories"
              :key="category"
              class="checkbox"
              :class="{
                selected: filters.categories.includes(category),
              }"
            >
              <input
                type="checkbox"
                :value="category"
                v-model="filters.categories"
              />

              <span class="custom-checkbox">
                <span class="checkmark">✓</span>
              </span>

              <span class="checkbox-text">
                {{ category }}
              </span>
            </label>
          </div>
        </div>

        <!-- Price -->
        <div class="filter-group">
          <div class="filter-title-row">
            <h4>Price Range</h4>

            <span class="price-value">
              R{{ filters.priceRange }}
            </span>
          </div>

          <div class="slider-wrapper">
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              v-model.number="filters.priceRange"
              class="slider"
            />

            <div class="slider-labels">
              <span>R0</span>
              <span>R2,000+</span>
            </div>
          </div>

          <p class="filter-description">
            Show items costing up to
            <strong>R{{ filters.priceRange }}/day</strong>
          </p>
        </div>

        <!-- Location -->
        <div class="filter-group">
          <div class="filter-title-row">
            <h4>Location</h4>
          </div>

          <div class="location-input-wrapper">
            <span class="location-icon">⌖</span>

            <input
              v-model="filters.location"
              type="text"
              placeholder="Cape Town"
              class="filter-input"
            />

            <button
              v-if="filters.location"
              type="button"
              class="clear-location"
              aria-label="Clear location"
              @click="filters.location = ''"
            >
              ×
            </button>
          </div>

          <p class="filter-description">
            Search by the item's location.
          </p>
        </div>

        <!-- Active filters -->
        <div
          v-if="
            filters.categories.length ||
            filters.location ||
            filters.priceRange < 2000
          "
          class="active-filters"
        >
          <span class="active-label">Active filters</span>

          <div class="active-filter-list">
            <span
              v-for="category in filters.categories"
              :key="`category-${category}`"
              class="filter-tag"
            >
              {{ category }}

              <button
                type="button"
                @click="removeCategory(category)"
                :aria-label="`Remove ${category} filter`"
              >
                ×
              </button>
            </span>

            <span
              v-if="filters.location"
              class="filter-tag"
            >
              {{ filters.location }}

              <button
                type="button"
                @click="filters.location = ''"
                aria-label="Remove location filter"
              >
                ×
              </button>
            </span>

            <span
              v-if="filters.priceRange < 2000"
              class="filter-tag"
            >
              Up to R{{ filters.priceRange }}

              <button
                type="button"
                @click="filters.priceRange = 2000"
                aria-label="Remove price filter"
              >
                ×
              </button>
            </span>
          </div>
        </div>
      </div>
    </aside>

    <!-- =====================================================
         MAIN PRODUCT AREA
    ====================================================== -->

    <main class="product-main">
      <!-- Header -->
      <div class="browse-header">
        <div class="header-copy">
          <span class="browse-eyebrow">EXPLORE RENTOSPHERE</span>

          <h2>Browse Verified Products</h2>

          <p>
            Find quality rental products for your next event,
            project or adventure.
          </p>
        </div>

        <div class="item-count">
          <strong>{{ filteredProducts.length }}</strong>
          <span>
            {{
              filteredProducts.length === 1
                ? "item available"
                : "items available"
            }}
          </span>
        </div>
      </div>

      <!-- Active filter summary -->
      <div
        v-if="
          filters.categories.length ||
          filters.location ||
          filters.priceRange < 2000
        "
        class="filter-summary"
      >
        <span class="summary-dot"></span>

        <span>
          Showing results based on your selected filters.
        </span>

        <button
          type="button"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="state-message"
      >
        <div class="loading-spinner"></div>

        <p>Loading products...</p>
      </div>

      <!-- Error -->
      <div
        v-else-if="loadError"
        class="state-message error"
      >
        <div class="state-icon">!</div>

        <h3>Something went wrong</h3>

        <p>{{ loadError }}</p>

        <button
          class="retry-button"
          type="button"
          @click="loadProducts"
        >
          Try Again
        </button>
      </div>

      <!-- No products -->
      <div
        v-else-if="filteredProducts.length === 0"
        class="state-message"
      >
        <div class="state-icon empty">⌕</div>

        <h3>No products found</h3>

        <p>
          No products match your current filters.
          Try changing your search criteria.
        </p>

        <button
          class="retry-button"
          type="button"
          @click="clearFilters"
        >
          Clear Filters
        </button>
      </div>

      <!-- Products -->
      <div
        v-else
        class="grid-three"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <!-- Product image -->
          <div class="product-image">
            <img
              v-if="product.image_url"
              :src="product.image_url"
              :alt="product.title"
              @error="handleImageError"
            />

            <span
              v-else
              class="placeholder-icon"
            >
              No Image
            </span>

            <!-- Status -->
            <span
              class="badge"
              :class="
                product.status === 'Safety Verified'
                  ? 'verified'
                  : 'pending'
              "
            >
              {{ product.status }}
            </span>
          </div>

          <!-- Card content -->
          <div class="card-body">
            <h4>{{ product.title }}</h4>

            <p class="meta">
              {{ product.location || "Location available on request" }}
              <span>•</span>
              {{ normalizeCategoryName(product.category) }}
            </p>

            <p class="description">
              {{ product.description }}
            </p>

            <div class="price-row">
              <span class="price">
                R{{ formatPrice(product.price_per_day) }}/day
              </span>
            </div>

            <div class="earning-hint">
              <span>
                Owner Earnings:
                <strong>
                  R{{ calculateOwnerEarnings(product.price_per_day) }}
                </strong>
              </span>

              <span class="earning-divider">|</span>

              <span>
                Fee:
                <strong>
                  R{{ calculateFee(product.price_per_day) }}
                </strong>
              </span>
            </div>

            <button
              class="btn-small"
              type="button"
              @click="selectedProduct = product"
            >
              View Details & Book
              <span class="button-arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Product details modal -->
      <ProductDetail
        v-if="selectedProduct"
        :product="selectedProduct"
        @close="selectedProduct = null"
      />
    </main>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
} from "vue";

import ProductDetail from "../components/ProductDetail.vue";

import { eventCategories } from "../data/products";

import { productsApi } from "../services/api";

import { showToast } from "../utils/notifications";

// ============================================================
// STATE
// ============================================================

const selectedProduct = ref(null);

const products = ref([]);

const loading = ref(false);

const loadError = ref("");

// ============================================================
// CATEGORIES
// ============================================================

const categories = eventCategories.map(
  (category) => category.name,
);

// ============================================================
// FILTERS
// ============================================================

const filters = ref({
  categories: [],
  priceRange: 2000,
  location: "",
});

// ============================================================
// CATEGORY NAME
// ============================================================

const normalizeCategoryName = (category) => {
  const foundCategory = eventCategories.find(
    (item) =>
      item.slug === category ||
      item.name === category,
  );

  return foundCategory?.name || category;
};

// ============================================================
// LOAD PRODUCTS FROM BACKEND
// ============================================================

async function loadProducts() {
  loading.value = true;

  loadError.value = "";

  try {
    const data = await productsApi.getAll();

    if (Array.isArray(data)) {
      products.value = data;
    } else {
      products.value = [];
    }
  } catch (error) {
    console.error(
      "Failed to load products:",
      error,
    );

    loadError.value =
      error.message ||
      "Unable to load products.";

    showToast(
      loadError.value,
      "error",
    );
  } finally {
    loading.value = false;
  }
}

// ============================================================
// CLEAR FILTERS
// ============================================================

function clearFilters() {
  filters.value.categories = [];
  filters.value.priceRange = 2000;
  filters.value.location = "";
}

// ============================================================
// REMOVE SINGLE CATEGORY
// ============================================================

function removeCategory(category) {
  filters.value.categories =
    filters.value.categories.filter(
      (item) => item !== category,
    );
}

// ============================================================
// IMAGE ERROR
// ============================================================

function handleImageError(event) {
  event.target.style.display = "none";
}

// ============================================================
// PRICE FORMATTING
// ============================================================

function formatPrice(price) {
  const number = Number(price || 0);

  return number.toFixed(0);
}

// ============================================================
// OWNER EARNINGS
// ============================================================

function calculateOwnerEarnings(price) {
  const number = Number(price || 0);

  return (number * 0.85).toFixed(0);
}

// ============================================================
// PLATFORM FEE
// ============================================================

function calculateFee(price) {
  const number = Number(price || 0);

  return (number * 0.15).toFixed(0);
}

// ============================================================
// FILTERED PRODUCTS
// ============================================================

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    // -------------------------------
    // CATEGORY
    // -------------------------------

    const categoryName =
      normalizeCategoryName(
        product.category || "",
      );

    const categoryMatches =
      filters.value.categories.length === 0 ||
      filters.value.categories.includes(
        categoryName,
      );

    // -------------------------------
    // PRICE
    // -------------------------------

    const priceValue = Number(
      product.price_per_day || 0,
    );

    const priceMatches =
      priceValue <=
      Number(filters.value.priceRange);

    // -------------------------------
    // LOCATION
    // -------------------------------

    const locationText = (
      product.location || ""
    ).toLowerCase();

    const searchLocation =
      filters.value.location
        .toLowerCase()
        .trim();

    const locationMatches =
      !searchLocation ||
      locationText.includes(
        searchLocation,
      );

    // -------------------------------
    // FINAL RESULT
    // -------------------------------

    return (
      categoryMatches &&
      priceMatches &&
      locationMatches
    );
  });
});

// ============================================================
// LOAD PRODUCTS WHEN PAGE OPENS
// ============================================================

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
/* ============================================================
   RENTOSPHERE COLOUR SYSTEM
============================================================ */

.browse-layout {
  --browse-green: #0b3b32;
  --browse-green-light: #e7f0ed;
  --browse-gold: #e99b13;
  --browse-gold-light: #fff4dc;
  --browse-cream: #f7f3ea;
  --browse-white: #ffffff;
  --browse-ink: #111827;
  --browse-muted: #6b7280;
  --browse-border: #e5e1d8;

  display: flex;
  min-height: calc(100vh - 72px);

  background: var(--browse-cream);

  color: var(--browse-ink);
}

/* ============================================================
   FILTER SIDEBAR
============================================================ */

.filter-sidebar {
  width: 300px;

  flex-shrink: 0;

  padding: 28px 20px 28px 28px;
}

/*
 * This is what keeps the filters visible while
 * the user scrolls through the products.
 */
.filter-card {
  position: sticky;
  top: 24px;

  background: var(--browse-white);

  border: 1px solid var(--browse-border);

  border-radius: 18px;

  padding: 22px;

  box-shadow:
    0 8px 30px rgba(11, 59, 50, 0.07);

  max-height: calc(100vh - 48px);

  overflow-y: auto;

  scrollbar-width: thin;
}

/* ============================================================
   FILTER HEADER
============================================================ */

.filter-heading {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 12px;
}

.filter-eyebrow,
.browse-eyebrow {
  display: block;

  color: var(--browse-gold);

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 1.4px;

  text-transform: uppercase;

  margin-bottom: 5px;
}

.filter-heading h3 {
  margin: 0;

  color: var(--browse-green);

  font-size: 20px;

  line-height: 1.2;

  font-weight: 800;
}

.clear-filters {
  border: none;

  background: transparent;

  color: var(--browse-green);

  font-size: 12px;

  font-weight: 700;

  cursor: pointer;

  padding: 4px 0;

  white-space: nowrap;
}

.clear-filters:hover {
  color: var(--browse-gold);
}

/* ============================================================
   FILTER DIVIDER
============================================================ */

.filter-divider {
  height: 1px;

  background: var(--browse-border);

  margin: 20px 0;
}

/* ============================================================
   FILTER GROUP
============================================================ */

.filter-group {
  margin-top: 24px;
}

.filter-group:first-of-type {
  margin-top: 0;
}

.filter-title-row {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

  margin-bottom: 12px;
}

.filter-group h4 {
  margin: 0;

  color: var(--browse-ink);

  font-size: 13px;

  font-weight: 800;

  letter-spacing: 0.1px;
}

.selected-count {
  display: flex;

  align-items: center;

  justify-content: center;

  min-width: 22px;

  height: 22px;

  padding: 0 6px;

  border-radius: 20px;

  background: var(--browse-green-light);

  color: var(--browse-green);

  font-size: 11px;

  font-weight: 800;
}

/* ============================================================
   CATEGORY CHECKBOXES
============================================================ */

.category-options {
  display: flex;

  flex-direction: column;

  gap: 4px;
}

.checkbox {
  display: flex;

  align-items: center;

  gap: 10px;

  min-height: 38px;

  padding: 6px 8px;

  margin: 0 -8px;

  border-radius: 8px;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.checkbox:hover {
  background: var(--browse-cream);
}

.checkbox.selected {
  background: var(--browse-green-light);

  color: var(--browse-green);
}

.checkbox input {
  position: absolute;

  opacity: 0;

  pointer-events: none;
}

.custom-checkbox {
  width: 18px;

  height: 18px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border: 1.5px solid #c8c5bd;

  border-radius: 5px;

  background: #ffffff;

  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.checkbox input:checked + .custom-checkbox {
  background: var(--browse-green);

  border-color: var(--browse-green);
}

.checkmark {
  color: #ffffff;

  font-size: 11px;

  font-weight: 800;

  opacity: 0;

  transform: scale(0.5);

  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.checkbox input:checked + .custom-checkbox .checkmark {
  opacity: 1;

  transform: scale(1);
}

.checkbox-text {
  font-size: 13px;

  line-height: 1.3;
}

/* ============================================================
   PRICE SLIDER
============================================================ */

.price-value {
  color: var(--browse-green);

  font-size: 13px;

  font-weight: 800;
}

.slider-wrapper {
  padding: 4px 2px 0;
}

.slider {
  appearance: none;

  width: 100%;

  height: 5px;

  border-radius: 10px;

  background: #ddd9d0;

  outline: none;

  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  appearance: none;

  width: 18px;

  height: 18px;

  border-radius: 50%;

  background: var(--browse-gold);

  border: 3px solid #ffffff;

  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.18);

  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 18px;

  height: 18px;

  border-radius: 50%;

  background: var(--browse-gold);

  border: 3px solid #ffffff;

  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.18);

  cursor: pointer;
}

.slider-labels {
  display: flex;

  justify-content: space-between;

  margin-top: 7px;

  color: var(--browse-muted);

  font-size: 10px;
}

.filter-description {
  margin: 8px 0 0;

  color: var(--browse-muted);

  font-size: 11px;

  line-height: 1.45;
}

.filter-description strong {
  color: var(--browse-green);
}

/* ============================================================
   LOCATION INPUT
============================================================ */

.location-input-wrapper {
  position: relative;

  display: flex;

  align-items: center;
}

.location-icon {
  position: absolute;

  left: 12px;

  color: var(--browse-green);

  font-size: 18px;

  line-height: 1;

  pointer-events: none;
}

.filter-input {
  width: 100%;

  height: 42px;

  box-sizing: border-box;

  border: 1px solid var(--browse-border);

  border-radius: 9px;

  padding: 0 36px 0 36px;

  background: #ffffff;

  color: var(--browse-ink);

  font-size: 13px;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.filter-input::placeholder {
  color: #9ca3af;
}

.filter-input:focus {
  border-color: var(--browse-green);

  box-shadow:
    0 0 0 3px rgba(11, 59, 50, 0.08);
}

.clear-location {
  position: absolute;

  right: 10px;

  top: 50%;

  transform: translateY(-50%);

  width: 22px;

  height: 22px;

  border: none;

  border-radius: 50%;

  background: #eeeae2;

  color: var(--browse-muted);

  cursor: pointer;

  line-height: 18px;

  font-size: 15px;

  padding: 0;
}

.clear-location:hover {
  background: var(--browse-green);

  color: #ffffff;
}

/* ============================================================
   ACTIVE FILTERS
============================================================ */

.active-filters {
  margin-top: 24px;

  padding-top: 18px;

  border-top: 1px solid var(--browse-border);
}

.active-label {
  display: block;

  margin-bottom: 9px;

  color: var(--browse-muted);

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.8px;

  text-transform: uppercase;
}

.active-filter-list {
  display: flex;

  flex-wrap: wrap;

  gap: 6px;
}

.filter-tag {
  display: inline-flex;

  align-items: center;

  gap: 5px;

  max-width: 100%;

  padding: 5px 7px 5px 9px;

  border-radius: 20px;

  background: var(--browse-gold-light);

  color: #76500b;

  font-size: 10px;

  font-weight: 700;
}

.filter-tag button {
  display: flex;

  align-items: center;

  justify-content: center;

  width: 16px;

  height: 16px;

  padding: 0;

  border: none;

  border-radius: 50%;

  background: transparent;

  color: #76500b;

  cursor: pointer;

  font-size: 13px;
}

.filter-tag button:hover {
  background: rgba(0, 0, 0, 0.08);
}

/* ============================================================
   MAIN PRODUCT AREA
============================================================ */

.product-main {
  flex: 1;

  min-width: 0;

  padding: 36px 32px 60px;

  color: var(--browse-ink);
}

/* ============================================================
   HEADER
============================================================ */

.browse-header {
  display: flex;

  justify-content: space-between;

  align-items: flex-end;

  gap: 20px;

  max-width: 1400px;
}

.header-copy {
  min-width: 0;
}

.browse-eyebrow {
  margin-bottom: 7px;
}

.browse-header h2 {
  margin: 0;

  color: var(--browse-green);

  font-size: 30px;

  line-height: 1.15;

  font-weight: 800;

  letter-spacing: -0.5px;
}

.browse-header p {
  max-width: 650px;

  margin: 9px 0 0;

  color: var(--browse-muted);

  font-size: 14px;

  line-height: 1.6;
}

.item-count {
  display: flex;

  align-items: baseline;

  gap: 5px;

  flex-shrink: 0;

  padding: 9px 13px;

  border: 1px solid var(--browse-border);

  border-radius: 30px;

  background: #ffffff;

  color: var(--browse-muted);

  font-size: 12px;
}

.item-count strong {
  color: var(--browse-green);

  font-size: 15px;
}

/* ============================================================
   FILTER SUMMARY
============================================================ */

.filter-summary {
  display: flex;

  align-items: center;

  gap: 8px;

  margin-top: 22px;

  padding: 10px 13px;

  border: 1px solid #dce8e4;

  border-radius: 10px;

  background: var(--browse-green-light);

  color: var(--browse-green);

  font-size: 12px;
}

.summary-dot {
  width: 7px;

  height: 7px;

  flex-shrink: 0;

  border-radius: 50%;

  background: var(--browse-gold);
}

.filter-summary button {
  margin-left: auto;

  border: none;

  background: transparent;

  color: var(--browse-green);

  font-size: 11px;

  font-weight: 800;

  cursor: pointer;

  text-decoration: underline;
}

/* ============================================================
   PRODUCT GRID
============================================================ */

.grid-three {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 24px;

  margin-top: 26px;

  max-width: 1400px;
}

/* ============================================================
   PRODUCT CARD
============================================================ */

.product-card {
  display: flex;

  flex-direction: column;

  min-width: 0;

  background: #ffffff;

  border: 1px solid var(--browse-border);

  border-radius: 15px;

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  color: var(--browse-ink);
}

.product-card:hover {
  transform: translateY(-4px);

  border-color: #d8d2c6;

  box-shadow:
    0 12px 30px rgba(11, 59, 50, 0.1);
}

/* ============================================================
   PRODUCT IMAGE
============================================================ */

.product-image {
  height: 190px;

  background: #eeeae2;

  position: relative;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;
}

.product-image img {
  width: 100%;

  height: 100%;

  object-fit: cover;

  transition: transform 0.35s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.03);
}

.placeholder-icon {
  display: flex;

  align-items: center;

  justify-content: center;

  width: 100%;

  height: 100%;

  color: var(--browse-muted);

  font-size: 13px;
}

/* ============================================================
   STATUS BADGE
============================================================ */

.badge {
  position: absolute;

  top: 12px;

  left: 12px;

  padding: 6px 11px;

  border-radius: 20px;

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.2px;

  color: #ffffff;

  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.12);
}

.badge.verified {
  background: var(--browse-green);
}

.badge.pending {
  background: var(--browse-gold);

  color: #ffffff;
}

/* ============================================================
   CARD BODY
============================================================ */

.card-body {
  display: flex;

  flex-direction: column;

  flex: 1;

  padding: 17px;
}

.card-body h4 {
  margin: 0;

  color: var(--browse-green);

  font-size: 17px;

  font-weight: 800;

  line-height: 1.3;
}

.meta {
  display: flex;

  flex-wrap: wrap;

  gap: 5px;

  margin: 7px 0 0;

  color: var(--browse-muted);

  font-size: 11px;

  line-height: 1.4;
}

.meta span {
  color: var(--browse-gold);

  font-weight: 800;
}

.description {
  margin: 11px 0 0;

  color: #4b5563;

  font-size: 12px;

  line-height: 1.55;

  min-height: 38px;
}

/* ============================================================
   PRICE
============================================================ */

.price-row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-top: 15px;
}

.price {
  color: var(--browse-green);

  font-size: 17px;

  font-weight: 800;
}

/* ============================================================
   EARNINGS
============================================================ */

.earning-hint {
  display: flex;

  flex-wrap: wrap;

  align-items: center;

  gap: 4px;

  margin-top: 9px;

  padding: 7px 9px;

  border-radius: 7px;

  background: var(--browse-cream);

  color: var(--browse-muted);

  font-size: 10px;

  line-height: 1.5;
}

.earning-hint strong {
  color: var(--browse-green);
}

.earning-divider {
  color: #c1bcb2;
}

/* ============================================================
   BUTTON
============================================================ */

.btn-small {
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  width: 100%;

  min-height: 40px;

  margin-top: 13px;

  padding: 8px 12px;

  background: var(--browse-green);

  color: #ffffff;

  border: none;

  border-radius: 8px;

  cursor: pointer;

  font-size: 12px;

  font-weight: 800;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.btn-small:hover {
  background: #075046;

  transform: translateY(-1px);
}

.button-arrow {
  font-size: 15px;

  transition: transform 0.2s ease;
}

.btn-small:hover .button-arrow {
  transform: translateX(3px);
}

/* ============================================================
   LOADING / ERROR / EMPTY STATE
============================================================ */

.state-message {
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  min-height: 260px;

  margin-top: 28px;

  padding: 40px;

  background: #ffffff;

  border: 1px solid var(--browse-border);

  border-radius: 15px;

  text-align: center;

  color: var(--browse-muted);
}

.state-message h3 {
  margin: 12px 0 0;

  color: var(--browse-green);

  font-size: 18px;
}

.state-message p {
  max-width: 420px;

  margin: 8px 0 0;

  font-size: 13px;

  line-height: 1.5;
}

.state-message.error {
  color: #b42318;
}

.state-message.error h3 {
  color: #8f1d15;
}

.state-icon {
  display: flex;

  align-items: center;

  justify-content: center;

  width: 40px;

  height: 40px;

  border-radius: 50%;

  background: #fce8e6;

  color: #b42318;

  font-size: 20px;

  font-weight: 800;
}

.state-icon.empty {
  background: var(--browse-green-light);

  color: var(--browse-green);
}

.loading-spinner {
  width: 30px;

  height: 30px;

  border: 3px solid #e2dfd7;

  border-top-color: var(--browse-green);

  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.retry-button {
  margin-top: 15px;

  padding: 10px 18px;

  border: none;

  border-radius: 8px;

  background: var(--browse-green);

  color: #ffffff;

  cursor: pointer;

  font-size: 12px;

  font-weight: 700;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.retry-button:hover {
  background: #075046;

  transform: translateY(-1px);
}

/* ============================================================
   RESPONSIVE — TABLET
============================================================ */

@media (max-width: 1150px) {
  .filter-sidebar {
    width: 270px;

    padding-left: 20px;
  }

  .product-main {
    padding-left: 24px;

    padding-right: 24px;
  }

  .grid-three {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

/* ============================================================
   RESPONSIVE — SMALL TABLET
============================================================ */

@media (max-width: 850px) {
  .browse-layout {
    flex-direction: column;
  }

  .filter-sidebar {
    width: 100%;

    box-sizing: border-box;

    padding: 20px;
  }

  .filter-card {
    position: relative;

    top: auto;

    max-height: none;

    overflow: visible;
  }

  .product-main {
    padding: 20px;
  }

  .grid-three {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

/* ============================================================
   RESPONSIVE — MOBILE
============================================================ */

@media (max-width: 600px) {
  .filter-sidebar {
    padding: 14px;
  }

  .filter-card {
    padding: 17px;

    border-radius: 14px;
  }

  .filter-heading h3 {
    font-size: 18px;
  }

  .product-main {
    padding: 24px 14px 40px;
  }

  .browse-header {
    flex-direction: column;

    align-items: flex-start;

    gap: 14px;
  }

  .browse-header h2 {
    font-size: 25px;
  }

  .browse-header p {
    font-size: 13px;
  }

  .item-count {
    align-self: flex-start;
  }

  .filter-summary {
    align-items: flex-start;

    flex-wrap: wrap;
  }

  .filter-summary button {
    margin-left: 15px;
  }

  .grid-three {
    grid-template-columns: 1fr;

    gap: 18px;
  }

  .product-image {
    height: 200px;
  }
}
</style>
