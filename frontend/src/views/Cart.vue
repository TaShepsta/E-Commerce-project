<template>
  <div class="cart-page">
    <div class="cart-header">
      <h1>Your cart</h1>
      <p v-if="cart.items.length">
        {{ cartCount }} item{{ cartCount === 1 ? "" : "s" }} ready for checkout
      </p>
    </div>

    <div v-if="cart.items.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h3>Your cart is empty</h3>
      <p>Browse rentals and add something you need for your next project or event.</p>
      <RouterLink to="/browse" class="btn-primary">Browse Rentals</RouterLink>
    </div>

    <div v-else class="cart-layout">
      <div class="cart-items">
        <div v-for="item in cart.items" :key="item.id" class="cart-item">
          <div class="item-image">
            <img
              v-if="item.image_url || item.image"
              :src="item.image_url || item.image"
              :alt="item.title || item.name"
            />
            <span v-else class="no-image">No image</span>
          </div>

          <div class="item-details">
            <h3>{{ item.title || item.name }}</h3>
            <p class="item-meta">
              {{ item.location || "Location available on request" }}
              <span v-if="item.category"> · {{ item.category }}</span>
            </p>
            <p class="item-price">R{{ Number(item.price_per_day ?? item.price ?? 0).toFixed(0) }}<small>/day</small></p>
          </div>

          <div class="item-controls">
            <label>
              Days
              <input
                type="number"
                min="1"
                :value="item.days"
                @change="handleUpdate(item.id, 'days', $event.target.value)"
              />
            </label>
            <label>
              Qty
              <input
                type="number"
                min="1"
                :value="item.qty"
                @change="handleUpdate(item.id, 'qty', $event.target.value)"
              />
            </label>
          </div>

          <div class="item-subtotal">
            <strong>R{{ (Number(item.price_per_day ?? item.price ?? 0) * item.days * item.qty).toFixed(0) }}</strong>
            <button class="remove-btn" type="button" @click="removeFromCart(item.id)">
              Remove
            </button>
          </div>
        </div>
      </div>

      <aside class="cart-summary">
        <h3>Order summary</h3>

        <div class="summary-row">
          <span>Subtotal</span>
          <span>R{{ cartTotal.toFixed(0) }}</span>
        </div>
        <div class="summary-row">
          <span>Rentosphere Courier</span>
          <span>R{{ DELIVERY_FEE }}</span>
        </div>
        <div class="summary-row summary-total">
          <span>Total</span>
          <span>R{{ cartGrandTotal.toFixed(0) }}</span>
        </div>

        <RouterLink to="/checkout" class="btn-primary btn-block">
          Proceed to checkout
        </RouterLink>
        <RouterLink to="/browse" class="continue-link">
          ← Continue browsing
        </RouterLink>
      </aside>
    </div>
  </div>
</template>

<script setup>
import {
  cart,
  cartTotal,
  cartCount,
  cartGrandTotal,
  removeFromCart,
  updateCartItem,
  DELIVERY_FEE,
} from "../stores/cart.js";

function handleUpdate(id, field, rawValue) {
  const value = Math.max(1, Number(rawValue) || 1);
  updateCartItem(id, { [field]: value });
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');

.cart-page {
  --paper: #faf6ee;
  --surface: #ffffff;
  --pine: #0b3b2e;
  --pine-deep: #082820;
  --gold: #d99a2b;
  --gold-deep: #b87f1b;
  --line: #e4decf;
  --ink: #17231f;
  --ink-soft: #5e6863;
  --danger: #b3261e;

  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 24px 90px;
  color: var(--ink);
  font-family: "Inter", sans-serif;
  background: var(--paper);
}

.cart-header h1 {
  margin: 0;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 2.1rem;
  letter-spacing: -0.01em;
  color: var(--pine);
}

.cart-header p {
  margin: 8px 0 0;
  color: var(--ink-soft);
}

/* ---------------- EMPTY STATE ---------------- */

.empty-cart {
  margin-top: 44px;
  padding: 76px 20px;
  text-align: center;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 4px;
}

.empty-icon {
  font-size: 2rem;
  margin-bottom: 16px;
}

.empty-cart h3 {
  margin: 0;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--pine);
}

.empty-cart p {
  margin: 10px auto 26px;
  max-width: 360px;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* ---------------- LAYOUT ---------------- */

.cart-layout {
  margin-top: 36px;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 44px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
}

.cart-item {
  display: grid;
  grid-template-columns: 104px 1fr auto auto;
  gap: 20px;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid var(--line);
}

.cart-item:first-child {
  padding-top: 0;
}

.item-image {
  width: 104px;
  height: 78px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--paper);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  font-size: 0.7rem;
  color: #a3a89e;
}

.item-details h3 {
  margin: 0;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--ink);
}

.item-meta {
  margin: 6px 0 0;
  font-size: 0.8rem;
  color: var(--ink-soft);
}

.item-price {
  margin: 8px 0 0;
  font-weight: 700;
  color: var(--pine);
}

.item-price small {
  font-weight: 400;
  color: var(--ink-soft);
}

.item-controls {
  display: flex;
  gap: 12px;
}

.item-controls label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--ink-soft);
}

.item-controls input {
  width: 58px;
  padding: 8px;
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: "Inter", sans-serif;
  text-align: center;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.item-controls input:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(217, 154, 43, 0.18);
}

.item-subtotal {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.item-subtotal strong {
  font-family: "Fraunces", serif;
  color: var(--pine);
  font-size: 1.1rem;
}

.remove-btn {
  border: none;
  background: none;
  color: var(--danger);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.remove-btn:hover {
  text-decoration: underline;
}

/* ---------------- SUMMARY ---------------- */

.cart-summary {
  position: sticky;
  top: 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-top: 3px solid var(--pine);
  border-radius: 4px;
  padding: 26px;
}

.cart-summary h3 {
  margin: 0 0 20px;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--pine);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
  color: var(--ink-soft);
  font-size: 0.92rem;
}

.summary-total {
  border-bottom: none;
  padding-top: 18px;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--ink);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--gold);
  color: var(--pine-deep);
  padding: 14px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.92rem;
  margin-top: 22px;
  transition: background 0.15s ease;
}

.btn-primary:hover {
  background: var(--gold-deep);
}

.btn-block {
  width: 100%;
  box-sizing: border-box;
}

.continue-link {
  display: block;
  text-align: center;
  margin-top: 14px;
  color: var(--ink-soft);
  font-size: 0.85rem;
  text-decoration: none;
}

.continue-link:hover {
  color: var(--pine);
}

/* ---------------- RESPONSIVE ---------------- */

@media (max-width: 860px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 88px 1fr;
    grid-template-areas:
      "image details"
      "controls controls"
      "subtotal subtotal";
  }

  .item-image {
    grid-area: image;
    width: 88px;
    height: 68px;
  }

  .item-details {
    grid-area: details;
  }

  .item-controls {
    grid-area: controls;
    margin-top: 10px;
  }

  .item-subtotal {
    grid-area: subtotal;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .cart-summary {
    position: static;
  }
}
</style>