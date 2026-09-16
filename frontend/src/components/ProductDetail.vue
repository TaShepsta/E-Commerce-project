<template>
  <div class="detail-backdrop" @click.self="emit('close')">
    <div v-if="product" class="detail-modal" role="dialog" aria-modal="true">
      <button class="close-button" type="button" @click="emit('close')">
        ×
      </button>

      <div class="detail-image-wrap">
        <img
          v-if="product.image_url || product.image"
          :src="product.image_url || product.image"
          :alt="product.imageAlt || product.title || product.name"
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

        <div class="rental-controls">
          <label>
            Days
            <input v-model.number="days" type="number" min="1" />
          </label>

          <label>
            Quantity
            <input v-model.number="qty" type="number" min="1" />
          </label>
        </div>

        <p class="subtotal">
          Subtotal:
          <strong>R{{ subtotal }}</strong>
        </p>

        <div class="detail-actions">
          <button class="primary-button" type="button" @click="handleAdd">
            Add to Cart
          </button>

          <button class="secondary-button" type="button" @click="handleRentNow">
            Rent Now
          </button>
        </div>

        <button class="close-text-button" type="button" @click="emit('close')">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import { addToCart } from "../stores/cart.js";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);
const router = useRouter();
const store = useStore();

// Cart/checkout is only for logged-in users, so send guests to log in
// (or create an account) instead of silently building a guest cart.
function requireLogin() {
  if (store.getters["auth/isAuthenticated"]) return true;

  emit("close");
  router.push({ path: "/login", query: { redirect: "/browse" } });
  return false;
}

const days = ref(1);
const qty = ref(1);

const subtotal = computed(() => {
  return (
    Number(props.product.price_per_day || 0) *
    Number(days.value || 1) *
    Number(qty.value || 1)
  );
});

function handleAdd() {
  if (!requireLogin()) return;

  addToCart(props.product, days.value, qty.value);

  Swal.fire(
    "Added!",
    `${props.product.title} added to your cart`,
    "success"
  );

  emit("close");
}

function handleRentNow() {
  if (!requireLogin()) return;

  addToCart(props.product, days.value, qty.value);
  emit("close");
  router.push("/cart");
}
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
  max-height: 90vh;
  overflow-y: auto;
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
  min-height: 360px;
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
  color: #0f172a;
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

.rental-controls {
  display: flex;
  gap: 16px;
  margin-top: 22px;
}

.rental-controls label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 700;
  flex: 1;
}

.rental-controls input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
}

.subtotal {
  margin-top: 18px;
  color: #4b5563;
}

.subtotal strong {
  color: #0b3b32;
  font-size: 1.1rem;
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}

.primary-button,
.secondary-button,
.close-button,
.close-text-button {
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font: inherit;
}

.primary-button {
  flex: 1;
  padding: 12px 20px;
  background: #0b3b32;
  color: #ffffff;
  font-weight: 700;
}

.primary-button:hover {
  background: #092f29;
}

.secondary-button {
  flex: 1;
  padding: 12px 18px;
  background: #f5a000;
  color: #0f172a;
  font-weight: 700;
}

.secondary-button:hover {
  background: #e99b13;
}

.close-button {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.9);
  color: #111827;
  font-size: 1.4rem;
}

.close-text-button {
  margin-top: 14px;
  padding: 8px 14px;
  background: transparent;
  color: #68717a;
  font-size: 0.85rem;
}

.close-text-button:hover {
  color: #0f172a;
}

@media (max-width: 760px) {
  .detail-modal {
    grid-template-columns: 1fr;
  }

  .detail-image-wrap,
  .detail-image-wrap img,
  .detail-image-placeholder {
    min-height: 240px;
  }

  .detail-content {
    padding: 22px;
  }

  .rental-controls {
    flex-direction: column;
  }

  .detail-actions {
    flex-direction: column;
  }
}
</style>