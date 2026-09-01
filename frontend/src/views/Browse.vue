<template>
  <div class="browse-layout">
    <!-- sidebar filters -->
     <aside class="filter-sidebar">
      <h3>Filters</h3>

      <div class="filter-group">
        <h4>Category</h4>
        <label v-for="c in categories" :key="c" class="checkbox">
          <input type="checkbox" :value="c" v-model="filters.categories"/>{{ c }}
        </label>
      </div>

      <div class="filter-group">
        <h4>Price Range</h4>
        <input type="range" min="0" max="2000" v-model.number="filters.priceRange" class="slider" />
        <p>Up to R{{ filters.priceRange }}/day</p>
      </div>

      <div class="filter-group">
        <h4>Location</h4>
        <input v-model="filters.location" placeholder="Cape Town" class="filter-input" />
      </div>
     </aside>

     <!-- product grid -->
      <main class="product-main">
        <div class="browse-header">
          <h2>Browse Verified Listing of products</h2>
          <p>{{ filteredProducts.length }} items available</p>
        </div>

        <div class="grid-three">
          <div v-for="p in filteredProducts" :key="p.id" class="product-card">
            <div class="product-image">
              <img v-if="p.image_url" :src="p.image_url" />
              <span v-else class="placeholder-icon">No Image</span>
              <span class="badge" :class="p.status==='Safety Verified'?'verified':'pending'">{{ p.status }}</span>
            </div>
            <div class="card-body">
              <h4>{{ p.title }}</h4>
              <p class="meta">{{ p.location }} , {{ p.category }}</p>
              <div class="price-row">
                <span class="price">R{{ p.price }}/day</span>
              </div>
              <div class="earning-hint">Owner Earnings: R{{ (p.price * 0.85).toFixed(0) }} | Fee: R{{ (p.price * 0.15).toFixed(0) }}</div>
              <button class="btn-small">View Details & Book</button>
            </div>
          </div>
        </div>
      </main>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import axios from 'axios';

const products = ref([]);
const categories = ['Tools', 'Trailers', 'Gas Tanks', 'Appliances', 'Event Equipment', 'Machinery'];
const filters = ref({ categories:[], priceRange: 2000, location: '' });

onMounted(async() => {
  const res = await axios.get('/api/products?status=Safety Verified')
  products.value = res.data;
})

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const catOk = filters.value.categories.length === 0 || filters.value.categories.includes(p.category);
    const priceOk = Number(p.price) <= filters.value.priceRange;
    const locOk = !filters.value.location || p.location.toLowerCase().includes(filters.value.location.toLowerCase());
    return catOk && priceOk && locOk;
  })
})

</script>