<template>
  <article class="listing-row">
    <div class="listing-thumb">
      <img
        v-if="listing.image"
        :src="listing.image"
        :alt="listing.imageAlt || listing.name"
      />
      <div v-else class="listing-placeholder">No Image</div>
    </div>
    <div class="listing-details">
      <h3>{{ listing.name }}</h3>
      <p>{{ category }}</p>
    </div>
    <div class="listing-price">
      <strong>R{{ listing.price }}</strong>
      <span>/ {{ listing.priceUnit }}</span>
    </div>
    <span class="status" :class="listing.status.toLowerCase()">{{
      listing.status
    }}</span>
    <div class="listing-actions">
      <button
        type="button"
        aria-label="View listing"
        @click="$emit('view', listing)"
      >
        View
      </button>
      <button
        type="button"
        aria-label="Edit listing"
        @click="$emit('edit', listing)"
      >
        Edit
      </button>
      <button type="button" @click="$emit('toggle', listing)">
        {{ listing.status === "Paused" ? "Resume" : "Pause" }}
      </button>
      <button
        type="button"
        class="danger-button"
        @click="$emit('delete', listing)"
      >
        Delete
      </button>
    </div>
  </article>
</template>

<script setup>
defineProps({
  listing: {
    type: Object,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

defineEmits(["view", "edit", "toggle", "delete"]);
</script>

<style scoped>
.listing-row {
  display: grid;
  grid-template-columns: 88px minmax(180px, 1fr) 120px 110px auto;
  align-items: center;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid #e4e0d7;
}
.listing-thumb {
  width: 88px;
  height: 72px;
  border-radius: 7px;
  overflow: hidden;
  background: #f7f3ea;
}
.listing-thumb img,
.listing-placeholder {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.listing-placeholder {
  display: grid;
  place-items: center;
  color: #68717a;
  font-size: 0.7rem;
  font-weight: 700;
}
.listing-details h3 {
  margin: 0 0 5px;
  font-size: 1.08rem;
}
.listing-details p,
.listing-price span {
  margin: 0;
  color: #68717a;
  font-size: 0.82rem;
}
.listing-price strong {
  font-size: 1.15rem;
}
.status {
  width: fit-content;
  padding: 6px 9px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 800;
}
.status.available {
  color: #0b3b32;
  background: #e8f0e5;
}
.status.paused {
  color: #765315;
  background: #f8edcf;
}
.listing-actions {
  display: flex;
  justify-content: end;
  gap: 8px;
}
.listing-actions button {
  border: 1px solid #d9d5cc;
  border-radius: 5px;
  padding: 8px 10px;
  color: #0b3b32;
  background: white;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
}

.danger-button {
  color: #8f1d1d;
  border-color: #e6b1b1;
}
@media (max-width: 850px) {
  .listing-row {
    grid-template-columns: 76px 1fr auto;
    gap: 14px;
  }
  .listing-row > img {
    width: 76px;
    height: 64px;
  }
  .listing-price,
  .status {
    grid-column: 2;
  }
  .listing-actions {
    grid-column: 3;
    grid-row: 1 / span 2;
    flex-direction: column;
  }
}
@media (max-width: 520px) {
  .listing-row {
    grid-template-columns: 64px 1fr;
  }
  .listing-row > img {
    width: 64px;
    height: 58px;
  }
  .listing-price,
  .status,
  .listing-actions {
    grid-column: 2;
    grid-row: auto;
  }
  .listing-actions {
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
  }
}
</style>
