<template>
  <div class="browse-layout">
    <!-- MOBILE FILTER BAR -->
    <div class="mobile-filter-bar">
      <button
        class="filter-toggle"
        type="button"
        @click="mobileFiltersOpen = true"
      >
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
          <path
            d="M1 1h14M4 7h8M6.5 13h3"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
          />
        </svg>

        Filters

        <span v-if="activeFilterCount" class="filter-count">
          {{ activeFilterCount }}
        </span>
      </button>

      <select v-model="sortBy" class="sort-select sort-select-mobile">
        <option value="default">Sort: Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Top Rated</option>
      </select>
    </div>

    <!-- SIDEBAR -->
    <aside
      class="filter-sidebar"
      :class="{ 'is-open': mobileFiltersOpen }"
    >
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

      <!-- CATEGORY -->
      <div class="filter-group">
        <h4>Category</h4>

        <label
          v-for="c in categories"
          :key="c"
          class="checkbox"
        >
          <input
            v-model="filters.categories"
            type="checkbox"
            :value="c"
          />

          <span class="checkbox-box"></span>

          {{ c }}
        </label>
      </div>

      <!-- PRICE -->
      <div class="filter-group">
        <h4>Price range</h4>

        <input
          v-model.number="filters.priceRange"
          type="range"
          min="0"
          max="2000"
          class="slider"
        />

        <div class="price-range-labels">
          <span>R0</span>

          <span class="price-range-current">
            Up to R{{ filters.priceRange }}/day
          </span>
        </div>
      </div>

      <!-- LOCATION -->
      <div class="filter-group">
        <h4>Location</h4>

        <div class="filter-input-wrap">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            class="filter-input-icon"
          >
            <path
              d="M7 13S12 8.4 12 5.5a5 5 0 10-10 0C2 8.4 7 13 7 13z"
              stroke="currentColor"
              stroke-width="1.3"
            />

            <circle
              cx="7"
              cy="5.5"
              r="1.6"
              stroke="currentColor"
              stroke-width="1.3"
            />
          </svg>

          <input
            v-model="filters.location"
            placeholder="Cape Town"
            class="filter-input"
          />
        </div>
      </div>

      <button
        class="apply-mobile"
        type="button"
        @click="mobileFiltersOpen = false"
      >
        Show {{ filteredProducts.length }} results
      </button>
    </aside>

    <div
      v-if="mobileFiltersOpen"
      class="filter-scrim"
      @click="mobileFiltersOpen = false"
    ></div>

    <!-- MAIN -->
    <main class="product-main">
      <div class="browse-header">
        <div>
          <h2>Browse verified rentals</h2>

          <p>
            {{ filteredProducts.length }}
            item{{ filteredProducts.length === 1 ? "" : "s" }}
            available
          </p>
        </div>

        <div class="browse-header-controls">
          <!-- SEARCH -->
          <div class="search-wrap">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              class="search-icon"
            >
              <circle
                cx="6.5"
                cy="6.5"
                r="5"
                stroke="currentColor"
                stroke-width="1.4"
              />

              <path
                d="M10.2 10.2 14 14"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </svg>

            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search rentals..."
              class="search-input"
            />
          </div>

          <!-- SORT -->
          <select
            v-model="sortBy"
            class="sort-select"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">
              Price: Low to High
            </option>
            <option value="price-desc">
              Price: High to Low
            </option>
            <option value="rating-desc">
              Top Rated
            </option>
          </select>
        </div>
      </div>

      <!-- ACTIVE FILTER CHIPS -->
      <div
        v-if="activeFilterCount"
        class="active-chips"
      >
        <span
          v-for="c in filters.categories"
          :key="c"
          class="chip"
        >
          {{ c }}

          <button
            type="button"
            aria-label="Remove filter"
            @click="removeCategoryFilter(c)"
          >
            ✕
          </button>
        </span>

        <span
          v-if="filters.priceRange < 2000"
          class="chip"
        >
          Up to R{{ filters.priceRange }}

          <button
            type="button"
            aria-label="Remove filter"
            @click="filters.priceRange = 2000"
          >
            ✕
          </button>
        </span>

        <span
          v-if="filters.location"
          class="chip"
        >
          {{ filters.location }}

          <button
            type="button"
            aria-label="Remove filter"
            @click="filters.location = ''"
          >
            ✕
          </button>
        </span>
      </div>

      <!-- LOADING -->
      <div
        v-if="isLoading"
        class="grid-three"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="product-card skeleton-card"
        >
          <div class="skeleton-image"></div>

          <div class="card-body">
            <div
              class="skeleton-line skeleton-line-title"
            ></div>

            <div
              class="skeleton-line skeleton-line-meta"
            ></div>

            <div
              class="skeleton-line skeleton-line-price"
            ></div>
          </div>
        </div>
      </div>

      <!-- ERROR -->
      <div
        v-else-if="loadError"
        class="empty-state"
      >
        <div class="empty-icon">!</div>

        <h3>Could not load products</h3>

        <p>
          {{ loadError }}
        </p>

        <button
          class="btn-empty"
          type="button"
          @click="loadProducts"
        >
          Try again
        </button>
      </div>

      <!-- EMPTY -->
      <div
        v-else-if="filteredProducts.length === 0"
        class="empty-state"
      >
        <div class="empty-icon">◎</div>

        <h3>No products match your filters</h3>

        <p>
          Try widening your price range or clearing a
          filter to see more items.
        </p>

        <button
          class="btn-empty"
          type="button"
          @click="clearFilters"
        >
          Clear all filters
        </button>
      </div>

      <!-- PRODUCTS -->
      <div
        v-else
        class="grid-three"
      >
        <div
          v-for="p in filteredProducts"
          :key="p.id"
          class="product-card"
        >
          <!-- IMAGE -->
          <div class="product-image">
            <img
              v-if="p.image_url || p.image"
              :src="p.image_url || p.image"
              :alt="p.title"
            />

            <span
              v-else
              class="placeholder-icon"
            >
              No image
            </span>

            <!-- STATUS -->
            <span
              class="badge"
              :class="
                p.status === 'Safety Verified'
                  ? 'verified'
                  : 'pending'
              "
            >
              {{ p.status }}
            </span>

            <!-- FAVOURITE -->
            <button
              v-if="p.id"
              class="favorite-button"
              type="button"
              :aria-label="
                isFavorite(p.id)
                  ? 'Remove from saved products'
                  : 'Save product'
              "
              :aria-pressed="isFavorite(p.id)"
              @click.stop="toggleFavorite(p)"
            >
              {{ isFavorite(p.id) ? "♥" : "♡" }}
            </button>
          </div>

          <!-- CARD CONTENT -->
          <div class="card-body">
            <h4>
              {{ p.title }}
            </h4>

            <p class="meta">
              {{ p.location || "Location available on request" }}
              ·
              {{ normalizeCategoryName(p.category) }}
            </p>

            <!-- RATING -->
            <p
              v-if="p.rating"
              class="rating-row"
            >
              <span class="stars">
                ★★★★★
              </span>

              <span class="rating-value">
                {{ p.rating }}
              </span>

              <span
                v-if="p.reviews"
                class="rating-count"
              >
                ({{ p.reviews }})
              </span>
            </p>

            <!-- PRICE -->
            <div class="price-row">
              <span class="price">
                R{{
                  Number(
                    p.price_per_day || 0
                  ).toFixed(2)
                }}

                <small>/day</small>
              </span>
            </div>

            <!-- DESCRIPTION PREVIEW -->
            <p
              v-if="p.description"
              class="description-preview"
            >
              {{ p.description }}
            </p>

            <!-- SINGLE ACTION -->
            <div class="product-actions">
              <button
                class="view-product-button"
                type="button"
                @click="openProduct(p)"
              >
                View Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- PRODUCT DETAIL -->
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

import {
  eventCategories,
} from "../data/products";

import {
  productsApi,
} from "../services/api";

import {
  showToast,
} from "../utils/notifications";

/*
|--------------------------------------------------------------------------
| LOCAL STORAGE
|--------------------------------------------------------------------------
| Browse products use localStorage for favourites.
| This does NOT touch your live favorites database/table.
*/

const FAVORITES_STORAGE_KEY =
  "rentosphere_product_favorites";

/* ---------------- STATE ---------------- */

const selectedProduct = ref(null);
const products = ref([]);
const isLoading = ref(true);
const loadError = ref("");

const categories =
  eventCategories.map(
    (category) => category.name,
  );

const filters = ref({
  categories: [],
  priceRange: 2000,
  location: "",
});

const searchQuery = ref("");
const sortBy = ref("default");
const mobileFiltersOpen = ref(false);

const favoriteIds = ref(
  new Set(),
);

/* ---------------- FILTERS ---------------- */

const activeFilterCount = computed(() => {
  return (
    filters.value.categories.length +
    (filters.value.priceRange < 2000
      ? 1
      : 0) +
    (filters.value.location ? 1 : 0)
  );
});

function clearFilters() {
  filters.value = {
    categories: [],
    priceRange: 2000,
    location: "",
  };

  searchQuery.value = "";
}

function removeCategoryFilter(category) {
  filters.value.categories =
    filters.value.categories.filter(
      (c) => c !== category,
    );
}

function normalizeCategoryName(category) {
  return (
    eventCategories.find(
      (item) => item.slug === category,
    )?.name || category
  );
}

/* ---------------- NORMALISE PRODUCT ---------------- */

function normalizeProduct(product) {
  return {
    ...product,

    id: Number(product.id),

    title: product.title || "",

    category: product.category || "",

    location:
      product.location ||
      "Cape Town",

    description:
      product.description || "",

    image_url:
      product.image_url || "",

    image:
      product.image_url || "",

    price_per_day: Number(
      product.price_per_day || 0,
    ),

    status:
      product.status ||
      "Pending Inspection",
  };
}

/* ---------------- LOCAL STORAGE FAVOURITES ---------------- */

function loadFavoriteIds() {
  try {
    const saved =
      localStorage.getItem(
        FAVORITES_STORAGE_KEY,
      );

    if (!saved) {
      favoriteIds.value = new Set();
      return;
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      favoriteIds.value = new Set();
      return;
    }

    favoriteIds.value = new Set(
      parsed
        .map(Number)
        .filter(
          (id) =>
            Number.isInteger(id) &&
            id > 0,
        ),
    );
  } catch (error) {
    console.error(
      "Failed to load saved products:",
      error,
    );

    favoriteIds.value = new Set();
  }
}

function saveFavoriteIds(ids) {
  try {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(
        [...ids],
      ),
    );
  } catch (error) {
    console.error(
      "Failed to save favourites:",
      error,
    );

    showToast(
      "Could not save your favourite.",
      "error",
    );
  }
}

/* ---------------- LOAD PRODUCTS ---------------- */

async function loadProducts() {
  isLoading.value = true;
  loadError.value = "";

  try {
    const data =
      await productsApi.getAll();

    if (!Array.isArray(data)) {
      throw new Error(
        "The products API returned invalid data.",
      );
    }

    products.value =
      data.map(normalizeProduct);

    console.log(
      "Products loaded from database:",
      products.value,
    );

    if (products.value.length === 0) {
      loadError.value =
        "There are currently no verified products available.";
    }
  } catch (error) {
    console.error(
      "Failed to load products:",
      error,
    );

    loadError.value =
      error?.message ||
      "Failed to load products. Make sure the backend is running.";

    showToast(
      loadError.value,
      "error",
    );

    products.value = [];
  } finally {
    isLoading.value = false;
  }
}

/* ---------------- PAGE LOAD ---------------- */

onMounted(async () => {
  /*
   * Load product favourites from this browser.
   * No request is made to /api/favorites.
   */
  loadFavoriteIds();

  await loadProducts();
});

/* ---------------- OPEN PRODUCT ---------------- */

function openProduct(product) {
  if (!product?.id) {
    showToast(
      "This product does not have a valid ID.",
      "error",
    );

    return;
  }

  selectedProduct.value = product;
}

/* ---------------- FAVOURITES ---------------- */

function isFavorite(id) {
  return favoriteIds.value.has(
    Number(id),
  );
}

function toggleFavorite(product) {
  if (!product?.id) {
    showToast(
      "This product does not have a valid ID.",
      "error",
    );

    return;
  }

  const productId = Number(
    product.id,
  );

  const wasFavorite =
    isFavorite(productId);

  const nextFavorites =
    new Set(favoriteIds.value);

  if (wasFavorite) {
    nextFavorites.delete(
      productId,
    );

    favoriteIds.value =
      nextFavorites;

    saveFavoriteIds(
      nextFavorites,
    );

    showToast(
      "Removed from saved products.",
      "info",
    );

    return;
  }

  nextFavorites.add(
    productId,
  );

  favoriteIds.value =
    nextFavorites;

  saveFavoriteIds(
    nextFavorites,
  );

  showToast(
    "Product saved.",
    "success",
  );
}

/* ---------------- FILTERING + SORTING ---------------- */

const filteredProducts =
  computed(() => {
    const query =
      searchQuery.value
        .trim()
        .toLowerCase();

    const filtered =
      products.value.filter(
        (p) => {
          const categoryName =
            normalizeCategoryName(
              p.category || "",
            );

          const categoryOk =
            filters.value
              .categories.length === 0 ||
            filters.value.categories.includes(
              categoryName,
            );

          const priceValue =
            Number(
              p.price_per_day || 0,
            );

          const priceOk =
            priceValue <=
            Number(
              filters.value.priceRange,
            );

          const locationText =
            (
              p.location || ""
            ).toLowerCase();

          const locationOk =
            !filters.value.location ||
            locationText.includes(
              filters.value.location
                .toLowerCase(),
            );

          const nameText =
            (
              p.title || ""
            ).toLowerCase();

          const descriptionText =
            (
              p.description || ""
            ).toLowerCase();

          const categoryText =
            (
              p.category || ""
            ).toLowerCase();

          const searchOk =
            !query ||
            nameText.includes(query) ||
            descriptionText.includes(
              query,
            ) ||
            categoryText.includes(
              query,
            );

          return (
            categoryOk &&
            priceOk &&
            locationOk &&
            searchOk
          );
        },
      );

    const sorted = [
      ...filtered,
    ];

    if (
      sortBy.value ===
      "price-asc"
    ) {
      sorted.sort(
        (a, b) =>
          Number(
            a.price_per_day || 0,
          ) -
          Number(
            b.price_per_day || 0,
          ),
      );
    }

    if (
      sortBy.value ===
      "price-desc"
    ) {
      sorted.sort(
        (a, b) =>
          Number(
            b.price_per_day || 0,
          ) -
          Number(
            a.price_per_day || 0,
          ),
      );
    }

    if (
      sortBy.value ===
      "rating-desc"
    ) {
      sorted.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0),
      );
    }

    return sorted;
  });
</script>

<style scoped>
.browse-layout {
  --paper: #f7f3ea;
  --surface: #ffffff;
  --surface-alt: #f2ede2;
  --pine: #0b3b32;
  --pine-deep: #082820;
  --gold: #e99b13;
  --gold-deep: #b87f1b;
  --line: #dedbd3;
  --ink: #172033;
  --ink-soft: #6b7280;
  --ink-faint: #a3a89e;
  --danger: #8f1d1d;

  display: flex;
  min-height: calc(100vh - 72px);
  background: var(--paper);
  color: var(--ink);

  font-family: Arial, Helvetica, sans-serif;

  position: relative;
}

/* ---------------- SIDEBAR ---------------- */

.filter-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--line);
  padding: 30px 26px;

  position: sticky;
  top: 72px;
  height: calc(100vh - 72px);
  box-sizing: border-box;
  overflow-y: auto;
  align-self: flex-start;
}

.filter-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-sidebar-header h3 {
  margin: 0;
  font-weight: 800;
  font-size: 1.15rem;
  color: var(--pine);
}

.filter-sidebar-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.clear-filters {
  border: none;
  background: none;
  color: var(--gold-deep);
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
  color: var(--ink-soft);
}

.filter-group {
  margin-top: 30px;
}

.filter-group h4 {
  font-size: 0.82rem;
  margin: 0 0 14px;
  font-weight: 700;
  color: var(--ink);
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  margin: 11px 0;
  color: var(--ink-soft);
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
  border: 1.5px solid var(--line);
  border-radius: 4px;
  position: relative;
  transition:
    background 0.15s,
    border-color 0.15s;
}

.checkbox input:checked
  + .checkbox-box {
  background: var(--pine);
  border-color: var(--pine);
}

.checkbox input:checked
  + .checkbox-box::after {
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

.checkbox input:focus-visible
  + .checkbox-box {
  box-shadow:
    0 0 0 3px
    rgba(233, 155, 19, 0.25);
}

.slider {
  width: 100%;
  accent-color: var(--gold);
}

.price-range-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.76rem;
  color: var(--ink-faint);
}

.price-range-current {
  color: var(--pine);
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
  color: var(--ink-faint);
}

.filter-input {
  width: 100%;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 0 14px 0 34px;
  font-size: 0.88rem;
  font-family: inherit;
  box-sizing: border-box;
  background: var(--surface);
  color: var(--ink);
}

.filter-input:focus,
.search-input:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow:
    0 0 0 3px
    rgba(233, 155, 19, 0.18);
}

.apply-mobile {
  display: none;
  width: 100%;
  margin-top: 32px;
  height: 46px;
  border: none;
  border-radius: 6px;
  background: var(--gold);
  color: var(--pine-deep);
  font-weight: 700;
  cursor: pointer;
}

/* ---------------- MOBILE FILTER ---------------- */

.filter-scrim {
  display: none;
}

.mobile-filter-bar {
  display: none;
}

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--surface);
  color: var(--ink);
  font-weight: 700;
  font-size: 0.88rem;
  font-family: inherit;
}

.filter-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 50%;
  background: var(--gold);
  color: var(--pine-deep);
  font-size: 0.7rem;
  font-weight: 800;
}

.sort-select-mobile {
  flex: 1;
}

/* ---------------- MAIN ---------------- */

.product-main {
  flex: 1;
  padding: 40px 44px;
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
  font-weight: 800;
  font-size: 1.8rem;
  letter-spacing: -0.02em;
  color: var(--pine);
  margin: 0;
}

.browse-header p {
  color: var(--ink-soft);
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
  color: var(--ink-faint);
}

.search-input {
  width: 220px;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 0 14px 0 36px;
  font-size: 0.88rem;
  font-family: inherit;
  box-sizing: border-box;
  color: var(--ink);
}

.sort-select {
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 0 14px;
  font-size: 0.88rem;
  font-family: inherit;
  background: var(--surface);
  color: var(--ink);
}

/* ---------------- FILTER CHIPS ---------------- */

.active-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px 14px;
  border-radius: 20px;
  background: var(--surface-alt);
  color: var(--pine);
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
  background: rgba(11, 59, 46, 0.12);
  color: var(--pine);
  font-size: 0.65rem;
  cursor: pointer;
}

/* ---------------- GRID ---------------- */

.grid-three {
  display: grid;
  grid-template-columns: repeat(
    3,
    minmax(0, 1fr)
  );
  gap: 26px;
  margin-top: 30px;
}

.product-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
}

.product-card:hover {
  transform: translateY(-3px);
  border-color: #d7cfba;
  box-shadow:
    0 16px 32px
    rgba(11, 59, 46, 0.09);
}

.product-image {
  height: 180px;
  background: var(--surface-alt);
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
  font-size: 0.8rem;
  color: var(--ink-faint);
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.68rem;
  font-weight: 700;
  color: #fff;
}

.badge.verified {
  background: var(--pine);
}

.badge.pending {
  background: var(--gold);
  color: var(--pine-deep);
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  color: var(--pine);
  background: rgba(255, 255, 255, 0.92);
  font-size: 1.35rem;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.15s ease;
}

.favorite-button:hover {
  transform: scale(1.08);
  background: #ffffff;
}

.favorite-button:active {
  transform: scale(0.95);
}

.favorite-button[aria-pressed="true"] {
  color: #b3261e;
}

/* ---------------- CARD BODY ---------------- */

.card-body {
  padding: 20px;
}

.card-body h4 {
  font-weight: 700;
  font-size: 1.05rem;
  margin: 0;
  color: var(--ink);
}

.meta {
  font-size: 0.78rem;
  color: var(--ink-soft);
  margin: 7px 0 0;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 9px 0 0;
  font-size: 0.78rem;
}

.stars {
  color: var(--gold);
  letter-spacing: 1px;
  font-size: 0.7rem;
}

.rating-value {
  font-weight: 700;
  color: var(--ink);
}

.rating-count {
  color: var(--ink-faint);
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
}

.price {
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--pine);
}

.price small {
  font-family: inherit;
  font-weight: 400;
  font-size: 0.76rem;
  color: var(--ink-soft);
}

/* ---------------- DESCRIPTION ---------------- */

.description-preview {
  margin: 10px 0 0;
  color: var(--ink-soft);
  font-size: 0.78rem;
  line-height: 1.5;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ---------------- PRODUCT BUTTON ---------------- */

.product-actions {
  margin-top: 16px;
}

.view-product-button {
  width: 100%;
  height: 42px;
  border: 1px solid var(--pine);
  border-radius: 6px;
  background: var(--pine);
  color: #ffffff;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: inherit;
  font-weight: 700;
  transition:
    background 0.15s,
    transform 0.15s;
}

.view-product-button:hover {
  background: var(--pine-deep);
}

.view-product-button:active {
  transform: translateY(1px);
}

/* ---------------- EMPTY ---------------- */

.empty-state {
  margin-top: 64px;
  padding: 64px 20px;
  text-align: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.empty-icon {
  width: 50px;
  height: 50px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: var(--surface-alt);
  color: var(--gold-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.empty-state h3 {
  margin: 0;
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--pine);
}

.empty-state p {
  margin: 10px auto 0;
  max-width: 360px;
  color: var(--ink-soft);
  line-height: 1.6;
}

.btn-empty {
  display: inline-block;
  width: auto;
  padding: 0 22px;
  margin-top: 22px;
  height: 40px;
  border: none;
  border-radius: 6px;
  background: var(--pine);
  color: white;
  cursor: pointer;
  font-weight: 700;
}

/* ---------------- SKELETON ---------------- */

.skeleton-card {
  pointer-events: none;
}

.skeleton-image {
  height: 180px;
  background: linear-gradient(
    90deg,
    #f2ede2 25%,
    #ece5d6 37%,
    #f2ede2 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

.skeleton-line {
  height: 12px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #f2ede2 25%,
    #ece5d6 37%,
    #f2ede2 63%
  );
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

/* ---------------- RESPONSIVE ---------------- */

@media (max-width: 1100px) {
  .grid-three {
    grid-template-columns: repeat(
      2,
      minmax(0, 1fr)
    );
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
    background: var(--surface);
    border-bottom: 1px solid var(--line);
  }

  .filter-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 84%;
    max-width: 320px;
    height: auto;
    z-index: 1100;
    overflow-y: auto;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }

  .filter-sidebar.is-open {
    transform: translateX(0);
    box-shadow:
      20px 0 40px
      rgba(0, 0, 0, 0.15);
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

@media (max-width: 430px) {
  .product-main {
    padding: 16px;
  }
}
</style>
