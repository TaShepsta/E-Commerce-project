<template>
  <div class="detail-backdrop" @click.self="$emit('close')">
    <div class="detail-modal" role="dialog" aria-modal="true">
      <button class="close-button" type="button" @click="$emit('close')">
        ×
      </button>

      <div class="detail-image-wrap">
        <img
          v-if="product.image_url"
          :src="product.image_url"
          :alt="product.title"
        />
        <div v-else class="detail-image-placeholder">No Image</div>
      </div>

      <div class="detail-content">
        <div class="detail-heading">
          <p class="eyebrow">Listing details</p>
          <h3>{{ product.title }}</h3>
        </div>

        <div class="meta-row">
          <span>{{ product.category }}</span>
          <span>{{ product.location || "Location available on request" }}</span>
        </div>

        <div class="price-block">
          <strong>R{{ product.price_per_day }}</strong>
          <span>/day</span>
        </div>

        <div class="status-row">
          <span
            class="badge"
            :class="
              product.status === 'Safety Verified' ? 'verified' : 'pending'
            "
          >
            {{ product.status }}
          </span>
        </div>

        <p class="description">
          {{ product.description || "No description provided yet." }}
        </p>

        <div class="detail-actions">
          <button class="primary-button" type="button">Book now</button>
          <button
            class="secondary-button"
            type="button"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});

defineEmits(["close"]);
</script>

<style scoped>
.detail-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(17, 24, 39, 0.45);
}

.detail-modal {
  position: relative;
  width: min(920px, 100%);
  display: grid;
  grid-template-columns: minmax(280px, 1.2fr) minmax(280px, 1fr);
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.2);
}

.detail-image-wrap {
  min-height: 360px;
  background: #f7f3ea;
}

.detail-image-wrap img,
.detail-image-placeholder {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.detail-image-placeholder {
  display: grid;
  place-items: center;
  color: #68717a;
  font-size: 1.2rem;
  font-weight: 700;
}

.detail-content {
  padding: 28px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #e99b13;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.detail-heading h3 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  line-height: 1.1;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
  color: #68717a;
  font-size: 0.85rem;
}

.price-block {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 18px;
}

.price-block strong {
  font-size: 2rem;
  color: #0b3b32;
}

.price-block span {
  color: #68717a;
}

.status-row {
  margin-top: 18px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 800;
}

.badge.verified {
  background: #e8f0e5;
  color: #0b3b32;
}

.badge.pending {
  background: #fffbeb;
  color: #765315;
}

.description {
  margin-top: 18px;
  color: #4b5563;
  line-height: 1.7;
  white-space: pre-line;
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.primary-button,
.secondary-button,
.close-button {
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font: inherit;
}

.primary-button {
  padding: 12px 20px;
  background: #0b3b32;
  color: #ffffff;
  font-weight: 700;
}

.secondary-button {
  padding: 12px 18px;
  background: #f7f3ea;
  color: #0b3b32;
  font-weight: 700;
}

.close-button {
  position: absolute;
  top: 14px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.8);
  color: #111827;
  font-size: 1.4rem;
}

@media (max-width: 760px) {
  .detail-modal {
    grid-template-columns: 1fr;
  }

  .detail-image-wrap {
    min-height: 240px;
  }
}
</style>
