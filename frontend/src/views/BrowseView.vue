<template>
  <div class="browse-layout">
    <aside class="filter-sidebar">
      <h3>Filters</h3>

      <div class="filter-group">
        <h4>Category</h4>
        <label v-for="c in categories" :key="c" class="checkbox">
          <input type="checkbox" :value="c" v-model="filters.categories" />
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
        <p>Up to R{{ filters.priceRange }}/day</p>
      </div>

      <div class="filter-group">
        <h4>Location</h4>
        <input
          v-model="filters.location"
          placeholder="Cape Town"
          class="filter-input"
        />
      </div>
    </aside>

    <main class="product-main">
      <div class="browse-header">
        <h2>Browse Verified Listing of products</h2>
        <p>{{ filteredProducts.length }} items available</p>
      </div>

      <div class="grid-three">
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
            <div class="price-row">
              <span class="price">R{{ p.price_per_day || p.price }}/day</span>
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
import { eventCategories } from "../data/products";
import { listingsApi } from "../services/api";
import { showToast } from "../utils/notifications";

const selectedProduct = ref(null);
const products = ref([]);
const categories = eventCategories.map((category) => category.name);
const filters = ref({ categories: [], priceRange: 2000, location: "" });

const normalizeCategoryName = (category) => {
  return (
    eventCategories.find((item) => item.slug === category)?.name || category
  );
};

const normalizeListing = (listing) => {
  const description = listing.description || "";
  const locationMatch = description.match(/^Location:\s*([^\n]+)/i);

  return {
    ...listing,
    title: listing.name,
    image_url: listing.image || listing.image_url || "",
    image: listing.image || listing.image_url || "",
    location: locationMatch ? locationMatch[1].trim() : "",
    price_per_day: Number(listing.price ?? listing.price_per_day ?? 0),
    status: listing.status === "Available" ? "Safety Verified" : listing.status,
  };
};

onMounted(async () => {
  try {
    const data = await listingsApi.getAll();
    products.value = Array.isArray(data) ? data.map(normalizeListing) : [];
  } catch (error) {
    showToast(error.message, "error");
  }
});

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
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

    return catOk && priceOk && locOk;
  });
});
</script>

<style scoped>
.browse-layout {
  display: flex;
  min-height: calc(100vh - 72px);
  background: #f7f3ea;
}

.filter-sidebar {
  width: 280px;
  background: #fff;
  border-right: 1px solid var(--border);
  padding: 24px;
  color: #111827;
}

.filter-group {
  margin-top: 24px;
}

.filter-group h4 {
  font-size: 14px;
  margin-bottom: 12px;
  font-weight: 600;
}

.checkbox {
  display: flex;
  gap: 8px;
  font-size: 14px;
  margin: 6px 0;
}

.filter-input {
  width: 90%;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0 12px;
}

.slider {
  width: 100%;
}

.product-main {
  flex: 1;
  padding: 32px;
  color: #111827;
}

.browse-header h2 {
  font-size: 24px;
  font-weight: 700;
}

.browse-header p {
  color: var(--muted);
  margin-top: 4px;
}

.grid-three {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.product-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
  color: #111827;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.product-image {
  height: 180px;
  background: var(--light);
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
  font-size: 48px;
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}

.badge.verified {
  background: var(--green);
}

.badge.pending {
  background: var(--yellow);
}

.card-body {
  padding: 16px;
}

.card-body h4 {
  font-size: 15px;
  font-weight: 600;
}

.meta {
  font-size: 12px;
  color: var(--muted);
  margin-top: 4px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.price {
  font-weight: 700;
  font-size: 16px;
}

.earning-hint {
  font-size: 11px;
  color: var(--muted);
  margin-top: 6px;
  background: var(--light);
  padding: 4px 8px;
  border-radius: 6px;
}

.btn-small {
  margin-top: 12px;
  width: 100%;
  height: 36px;
  background: var(--navy);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}

@media (max-width: 768px) {
  .browse-layout {
    flex-direction: column;
  }

  .filter-sidebar {
    width: 100%;
  }

  .grid-three {
    grid-template-columns: 1fr;
  }

  .product-main {
    padding: 20px;
  }
}
</style>
