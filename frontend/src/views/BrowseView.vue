<template>
  <div class="browse-layout">
    <!-- MOBILE FILTER BAR -->
    <div class="mobile-filter-bar">
      <button class="filter-toggle" type="button" @click="mobileFiltersOpen = true">
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
          <path d="M1 1h14M4 7h8M6.5 13h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        </svg>
        Filters
        <span v-if="activeFilterCount" class="filter-count">{{ activeFilterCount }}</span>
      </button>

      <select v-model="sortBy" class="sort-select sort-select-mobile">
        <option value="default">Sort: Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Top Rated</option>
      </select>
    </div>

    <!-- SIDEBAR -->
    <aside class="filter-sidebar" :class="{ 'is-open': mobileFiltersOpen }">
      <div class="filter-sidebar-header">
        <h3>Filters</h3>
        <div class="filter-sidebar-actions">
          <button
            v-if="activeFilterCount"
            class="clear-filters"
            type="button"
            @click="clearFilters"
          >
            Clear all
          </button>
          <button
            class="close-filters"
            type="button"
            aria-label="Close filters"
            @click="mobileFiltersOpen = false"
          >
            ✕
          </button>
        </div>
      </div>

      <div class="filter-group">
        <h4>Category</h4>
        <label v-for="c in categories" :key="c" class="checkbox">
          <input type="checkbox" :value="c" v-model="filters.categories" />
          <span class="checkbox-box"></span>
          {{ c }}
        </label>
      </div>

      <div class="filter-group">
        <h4>Price Range</h4>
        <input
          type="range"
          min="0"
          max="2000"
          v-model.number="filters.priceRange"
          class="slider"
        />
        <div class="price-range-labels">
          <span>R0</span>
          <span class="price-range-current">Up to R{{ filters.priceRange }}/day</span>
        </div>
      </div>

      <div class="filter-group">
        <h4>Location</h4>
        <div class="filter-input-wrap">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="filter-input-icon">
            <path d="M7 13S12 8.4 12 5.5a5 5 0 10-10 0C2 8.4 7 13 7 13z" stroke="currentColor" stroke-width="1.3" />
            <circle cx="7" cy="5.5" r="1.6" stroke="currentColor" stroke-width="1.3" />
          </svg>
          <input
            v-model="filters.location"
            placeholder="Cape Town"
            class="filter-input"
          />
        </div>
      </div>

      <button class="apply-mobile" type="button" @click="mobileFiltersOpen = false">
        Show {{ filteredProducts.length }} results
      </button>
    </aside>

    <div v-if="mobileFiltersOpen" class="filter-scrim" @click="mobileFiltersOpen = false"></div>

    <main class="product-main">
      <div class="browse-header">
        <div>
          <h2>Browse Verified Listings</h2>
          <p>{{ filteredProducts.length }} item{{ filteredProducts.length === 1 ? "" : "s" }} available</p>
        </div>

        <div class="browse-header-controls">
          <div class="search-wrap">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" class="search-icon">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.4" />
              <path d="M10.2 10.2 14 14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search rentals..."
              class="search-input"
            />
          </div>

          <select v-model="sortBy" class="sort-select">
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Top Rated</option>
          </select>
        </div>
      </div>

      <!-- ACTIVE FILTER CHIPS -->
      <div v-if="activeFilterCount" class="active-chips">
        <span v-for="c in filters.categories" :key="c" class="chip">
          {{ c }}
          <button type="button" @click="removeCategoryFilter(c)" aria-label="Remove filter">✕</button>
        </span>
        <span v-if="filters.priceRange < 2000" class="chip">
          Up to R{{ filters.priceRange }}
          <button type="button" @click="filters.priceRange = 2000" aria-label="Remove filter">✕</button>
        </span>
        <span v-if="filters.location" class="chip">
          {{ filters.location }}
          <button type="button" @click="filters.location = ''" aria-label="Remove filter">✕</button>
        </span>
      </div>

      <!-- LOADING SKELETONS -->
      <div v-if="isLoading" class="grid-three">
        <div v-for="n in 6" :key="n" class="product-card skeleton-card">
          <div class="skeleton-image"></div>
          <div class="card-body">
            <div class="skeleton-line skeleton-line-title"></div>
            <div class="skeleton-line skeleton-line-meta"></div>
            <div class="skeleton-line skeleton-line-price"></div>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-else-if="filteredProducts.length === 0" class="empty-state">
        <div class="empty-icon">◎</div>
        <h3>No listings match your filters</h3>
        <p>Try widening your price range or clearing a filter to see more items.</p>
        <button class="btn-small btn-empty" type="button" @click="clearFilters">
          Clear all filters
        </button>
      </div>

      <!-- RESULTS -->
      <div v-else class="grid-three">
        <div v-for="p in filteredProducts" :key="p.id" class="product-card">
          <div class="product-image">
            <img
              v-if="p.image_url || p.image"
              :src="p.image_url || p.image"
              :alt="p.title || p.name"
            />
            <span v-else class="placeholder-icon">No Image</span>
            <span
              class="badge"
              :class="p.status === 'Safety Verified' ? 'verified' : 'pending'"
            >
              {{ p.status }}
            </span>
          </div>

          <div class="card-body">
            <h4>{{ p.title || p.name }}</h4>
            <p class="meta">
              {{ p.location || "Location available on request" }} •
              {{ normalizeCategoryName(p.category) }}
            </p>

            <p v-if="p.rating" class="rating-row">
              <span class="stars">★★★★★</span>
              <span class="rating-value">{{ p.rating }}</span>
              <span v-if="p.reviews" class="rating-count">({{ p.reviews }})</span>
            </p>

            <div class="price-row">
              <span class="price">R{{ p.price_per_day || p.price }}<small>/day</small></span>
            </div>
            <div class="earning-hint">
              Owner Earnings: R{{
                ((p.price_per_day || p.price) * 0.85).toFixed(0)
              }}
              | Fee: R{{ ((p.price_per_day || p.price) * 0.15).toFixed(0) }}
            </div>
            <button class="btn-small" @click="selectedProduct = p">
              View Details & Book
            </button>
          </div>
        </div>
      </div>

      <ProductDetail
        v-if="selectedProduct"
        :product="selectedProduct"
        @close="selectedProduct = null"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ProductDetail from "../components/ProductDetail.vue";
import { eventCategories, products as localProducts } from "../data/products";
import { listingsApi } from "../services/api";
import { showToast } from "../utils/notifications";

const selectedProduct = ref(null);
const products = ref([]);
const isLoading = ref(true);
const categories = eventCategories.map((category) => category.name);
const filters = ref({ categories: [], priceRange: 2000, location: "" });
const searchQuery = ref("");
const sortBy = ref("default");
const mobileFiltersOpen = ref(false);

const activeFilterCount = computed(() => {
  return (
    filters.value.categories.length +
    (filters.value.priceRange < 2000 ? 1 : 0) +
    (filters.value.location ? 1 : 0)
  );
});

function clearFilters() {
  filters.value = { categories: [], priceRange: 2000, location: "" };
  searchQuery.value = "";
}

function removeCategoryFilter(category) {
  filters.value.categories = filters.value.categories.filter(
    (c) => c !== category
  );
}

const normalizeCategoryName = (category) => {
  return (
    eventCategories.find((item) => item.slug === category)?.name || category
  );
};

const normalizeListing = (listing) => {
  return {
    ...listing,
    title: listing.title,
    image_url: listing.image_url || listing.image || "",
    image: listing.image_url || listing.image || "",
    location: listing.location || "",
    price_per_day: Number(listing.daily_price ?? listing.price_per_day ?? 0),
    // GET /api/listings only ever returns approved listings, but the
    // owner-dashboard creation flow still writes 'Available' in some
    // paths, so treat both as verified until that's fully reconciled.
    status:
      listing.status === "approved" || listing.status === "Available"
        ? "Safety Verified"
        : listing.status,
  };
};

// Fallback shape for the local products.js dataset, used whenever the API
// has no rows yet (or errors out), so the Browse page isn't empty.
const normalizeLocalProduct = (item) => ({
  ...item,
  title: item.name,
  image_url: item.image,
  image: item.image,
  location: "Cape Town", // placeholder until products have real locations
  price_per_day: item.price,
  status: "Safety Verified",
});

onMounted(async () => {
  try {
    const data = await listingsApi.getPublic();
    const apiListings = Array.isArray(data) ? data.map(normalizeListing) : [];
    products.value =
      apiListings.length > 0
        ? apiListings
        : localProducts.map(normalizeLocalProduct);
  } catch (error) {
    showToast(error.message, "error");
    products.value = localProducts.map(normalizeLocalProduct);
  } finally {
    isLoading.value = false;
  }
});

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  const filtered = products.value.filter((p) => {
    const categoryName = normalizeCategoryName(p.category || "");
    const catOk =
      filters.value.categories.length === 0 ||
      filters.value.categories.includes(categoryName);

    const priceValue = Number(p.price_per_day ?? p.price ?? 0);
    const priceOk = Number(priceValue) <= Number(filters.value.priceRange);

    const locText = (p.location || "").toLowerCase();
    const locOk =
      !filters.value.location ||
      locText.includes(filters.value.location.toLowerCase());

    const nameText = (p.title || p.name || "").toLowerCase();
    const searchOk = !query || nameText.includes(query);

    return catOk && priceOk && locOk && searchOk;
  });

  const sorted = [...filtered];
  if (sortBy.value === "price-asc") {
    sorted.sort(
      (a, b) => (a.price_per_day ?? a.price ?? 0) - (b.price_per_day ?? b.price ?? 0)
    );
  } else if (sortBy.value === "price-desc") {
    sorted.sort(
      (a, b) => (b.price_per_day ?? b.price ?? 0) - (a.price_per_day ?? a.price ?? 0)
    );
  } else if (sortBy.value === "rating-desc") {
    sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  return sorted;
});
</script>

<style scoped>
.browse-layout {
  display: flex;
  min-height: calc(100vh - 72px);
  background: #f7f3ea;
  position: relative;
}

/* ---------------- SIDEBAR ---------------- */

.filter-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid #e6e2da;
  padding: 28px 24px;
  color: #111827;
}

.filter-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-sidebar-header h3 {
  margin: 0;
  color: #0b3b32;
}

.filter-sidebar-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.clear-filters {
  border: none;
  background: none;
  color: #e99b13;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
}

.close-filters {
  display: none;
  border: none;
  background: none;
  font-size: 1rem;
  cursor: pointer;
  color: #6b7280;
}

.filter-group {
  margin-top: 28px;
}

.filter-group h4 {
  font-size: 13px;
  margin-bottom: 14px;
  font-weight: 700;
  color: #172033;
  letter-spacing: 0.2px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin: 10px 0;
  color: #33393f;
  cursor: pointer;
}

.checkbox input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-box {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  border: 1.5px solid #d8d2c4;
  border-radius: 5px;
  position: relative;
  transition: background 0.15s, border-color 0.15s;
}

.checkbox input:checked + .checkbox-box {
  background: #0b3b32;
  border-color: #0b3b32;
}

.checkbox input:checked + .checkbox-box::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(40deg);
}

.slider {
  width: 100%;
  accent-color: #e9a11a;
}

.price-range-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #8a8f96;
}

.price-range-current {
  color: #0b3b32;
  font-weight: 700;
}

.filter-input-wrap {
  position: relative;
}

.filter-input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9aa0a6;
}

.filter-input {
  width: 100%;
  height: 42px;
  border: 1px solid #e6e2da;
  border-radius: 9px;
  padding: 0 14px 0 34px;
  font-size: 14px;
  box-sizing: border-box;
}

.filter-input:focus,
.search-input:focus {
  outline: none;
  border-color: #e9a11a;
}

.apply-mobile {
  display: none;
  width: 100%;
  margin-top: 30px;
  height: 46px;
  border: none;
  border-radius: 9px;
  background: #0b3b32;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.filter-scrim {
  display: none;
}

/* ---------------- MOBILE FILTER BAR ---------------- */

.mobile-filter-bar {
  display: none;
}

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid #e6e2da;
  border-radius: 9px;
  background: white;
  color: #172033;
  font-weight: 700;
  font-size: 0.88rem;
}

.filter-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 50%;
  background: #e9a11a;
  color: #172033;
  font-size: 0.7rem;
  font-weight: 800;
}

.sort-select-mobile {
  flex: 1;
}

/* ---------------- MAIN ---------------- */

.product-main {
  flex: 1;
  padding: 36px 40px;
  color: #111827;
  min-width: 0;
}

.browse-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.browse-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #0b3b32;
  margin: 0;
}

.browse-header p {
  color: #7b8288;
  margin-top: 6px;
}

.browse-header-controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.search-wrap {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: #9aa0a6;
}

.search-input {
  width: 220px;
  height: 42px;
  border: 1px solid #e6e2da;
  border-radius: 9px;
  padding: 0 14px 0 36px;
  font-size: 14px;
  box-sizing: border-box;
}

.sort-select {
  height: 42px;
  border: 1px solid #e6e2da;
  border-radius: 9px;
  padding: 0 14px;
  font-size: 14px;
  background: white;
  color: #172033;
}

/* ---------------- ACTIVE FILTER CHIPS ---------------- */

.active-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px 14px;
  border-radius: 20px;
  background: #f2ede2;
  color: #0b3b32;
  font-size: 0.82rem;
  font-weight: 600;
}

.chip button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: rgba(11, 59, 50, 0.12);
  color: #0b3b32;
  font-size: 0.65rem;
  cursor: pointer;
}

/* ---------------- GRID / CARDS ---------------- */

.grid-three {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 28px;
}

.product-card {
  background: #fff;
  border: 1px solid #e6e2da;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  color: #111827;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(23, 32, 51, 0.1);
}

.product-image {
  height: 180px;
  background: #f2ede2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-icon {
  font-size: 14px;
  color: #9aa0a6;
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
}

.badge.verified {
  background: #0b3b32;
}

.badge.pending {
  background: #e9a11a;
  color: #172033;
}

.card-body {
  padding: 18px;
}

.card-body h4 {
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  color: #172033;
}

.meta {
  font-size: 12px;
  color: #7b8288;
  margin: 6px 0 0;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 8px 0 0;
  font-size: 12px;
}

.stars {
  color: #e9a11a;
  letter-spacing: 1px;
  font-size: 11px;
}

.rating-value {
  font-weight: 700;
  color: #172033;
}

.rating-count {
  color: #9aa0a6;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.price {
  font-weight: 800;
  font-size: 18px;
  color: #0b3b32;
}

.price small {
  font-weight: 500;
  font-size: 12px;
  color: #7b8288;
}

.earning-hint {
  font-size: 11px;
  color: #7b8288;
  margin-top: 8px;
  background: #f7f3ea;
  padding: 5px 8px;
  border-radius: 6px;
}

.btn-small {
  margin-top: 14px;
  width: 100%;
  height: 38px;
  background: #172033;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: background 0.15s;
}

.btn-small:hover {
  background: #0b3b32;
}

/* ---------------- SKELETON ---------------- */

.skeleton-card {
  pointer-events: none;
}

.skeleton-image {
  height: 180px;
  background: linear-gradient(90deg, #f2ede2 25%, #ece5d6 37%, #f2ede2 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

.skeleton-line {
  height: 12px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f2ede2 25%, #ece5d6 37%, #f2ede2 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

.skeleton-line-title {
  width: 70%;
}

.skeleton-line-meta {
  width: 50%;
  margin-top: 10px;
}

.skeleton-line-price {
  width: 35%;
  margin-top: 16px;
  height: 16px;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

/* ---------------- EMPTY STATE ---------------- */

.empty-state {
  margin-top: 60px;
  padding: 60px 20px;
  text-align: center;
  border: 1px dashed #dcd7cc;
  border-radius: 14px;
  background: white;
}

.empty-icon {
  width: 52px;
  height: 52px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: #f2ede2;
  color: #e99b13;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.empty-state h3 {
  margin: 0;
  color: #0b3b32;
}

.empty-state p {
  margin: 10px auto 0;
  max-width: 360px;
  color: #7b8288;
}

.btn-empty {
  display: inline-block;
  width: auto;
  padding: 0 22px;
}

/* ---------------- RESPONSIVE ---------------- */

@media (max-width: 1100px) {
  .grid-three {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .browse-layout {
    flex-direction: column;
  }

  .mobile-filter-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: white;
    border-bottom: 1px solid #e6e2da;
  }

  .filter-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 84%;
    max-width: 320px;
    z-index: 1100;
    overflow-y: auto;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }

  .filter-sidebar.is-open {
    transform: translateX(0);
    box-shadow: 20px 0 40px rgba(0, 0, 0, 0.15);
  }

  .close-filters {
    display: block;
  }

  .apply-mobile {
    display: block;
  }

  .filter-scrim {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(17, 24, 39, 0.4);
    z-index: 1050;
  }

  .grid-three {
    grid-template-columns: 1fr;
  }

  .product-main {
    padding: 20px;
  }

  .browse-header {
    flex-direction: column;
  }

  .browse-header-controls {
    width: 100%;
  }

  .search-wrap,
  .search-input {
    width: 100%;
  }
}
</style>