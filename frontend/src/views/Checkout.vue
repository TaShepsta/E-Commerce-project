<template>
  <div class="checkout-page">
    <!-- LOGIN REQUIRED -->
    <div v-if="!isAuthenticated" class="notice-card">
      <span class="notice-mark">1</span>
      <h3>Log in to check out</h3>
      <p>
        You'll need a Rentosphere account so we can confirm your booking and
        send your confirmation email.
      </p>

      <div class="notice-actions">
        <RouterLink to="/login" class="btn-primary">
          Log In
        </RouterLink>

        <RouterLink to="/signup" class="btn-outline">
          Create an Account
        </RouterLink>
      </div>
    </div>

    <!-- EMPTY CART -->
    <div v-else-if="cart.items.length === 0" class="notice-card">
      <span class="notice-mark">···</span>

      <h3>Your cart is empty</h3>

      <p>
        Add an item to your cart before checking out.
      </p>

      <RouterLink to="/browse" class="btn-primary">
        Browse Rentals
      </RouterLink>
    </div>

    <!-- CHECKOUT -->
    <div v-else>
      <header class="checkout-head">
        <div>
          <p class="eyebrow">RENTOSPHERE</p>
          <h1>Confirm your booking</h1>
          <p class="checkout-intro">
            Review your rental details below. You'll be redirected to
            PayFast (sandbox) to complete payment securely.
          </p>
        </div>
      </header>

      <div class="checkout-layout">
        <!-- LEFT SIDE -->
        <div class="checkout-form">

          <!-- CUSTOMER DETAILS -->
          <section class="form-section">
            <h2>Your details</h2>

            <div class="field-grid">
              <label class="field">
                Full name

                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Your full name"
                />
              </label>

              <label class="field">
                Phone number

                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="081 234 5678"
                />
              </label>
            </div>

            <label class="field">
              Email

              <input
                v-model="form.email"
                type="email"
                placeholder="you@email.com"
              />
            </label>
          </section>

          <div class="section-rule"></div>

          <!-- DELIVERY DETAILS -->
          <section class="form-section">
            <h2>Delivery address</h2>

            <label class="field">
              Street address

              <input
                v-model="form.address"
                type="text"
                placeholder="12 Main Road"
              />
            </label>

            <div class="field-grid field-grid-3">
              <label class="field">
                City

                <input
                  v-model="form.city"
                  type="text"
                  placeholder="Cape Town"
                />
              </label>

              <label class="field">
                Province

                <select v-model="form.province">
                  <option value="">Select province</option>

                  <option
                    v-for="province in provinces"
                    :key="province"
                    :value="province"
                  >
                    {{ province }}
                  </option>
                </select>
              </label>

              <label class="field">
                Postal code

                <input
                  v-model="form.postalCode"
                  type="text"
                  placeholder="8001"
                />
              </label>
            </div>

            <label class="field">
              Delivery notes
              <span class="optional">optional</span>

              <textarea
                v-model="form.notes"
                rows="3"
                placeholder="Gate code, landmark, preferred time, etc."
              ></textarea>
            </label>
          </section>

          <div class="section-rule"></div>

          <!-- DELIVERY -->
          <section class="form-section">
            <h2>Delivery method</h2>

            <div class="courier-card">
              <div class="courier-icon">
                🚚
              </div>

              <div class="courier-info">
                <strong>Rentosphere Courier</strong>

                <p>
                  Your rental details will be sent to Rentosphere and you will
                  receive a confirmation email after your booking is created.
                </p>

                <ul>
                  <li>Delivery arrangements will be confirmed separately</li>
                  <li>Items are collected after the rental period</li>
                  <li>Email confirmation is sent after booking</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <!-- ORDER SUMMARY -->
        <aside class="order-summary">
          <h3>Booking summary</h3>

          <div class="summary-items">
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="summary-item"
            >
              <span class="summary-item-name">
                {{ item.title || item.name }}

                <small>
                  {{ item.days }}
                  day{{ item.days > 1 ? "s" : "" }}
                  ×
                  {{ item.qty }}
                </small>
              </span>

              <span>
                R{{
                  (
                    Number(item.price_per_day || item.price || 0) *
                    Number(item.days || 1) *
                    Number(item.qty || 1)
                  ).toFixed(0)
                }}
              </span>
            </div>
          </div>

          <div class="summary-row">
            <span>Subtotal</span>
            <span>R{{ cartTotal.toFixed(0) }}</span>
          </div>

          <div class="summary-row">
            <span>Delivery</span>
            <span>R{{ DELIVERY_FEE }}</span>
          </div>

          <div class="summary-row summary-total">
            <span>Total</span>
            <span>R{{ cartGrandTotal.toFixed(0) }}</span>
          </div>

          <div class="demo-note">
            <strong>PayFast sandbox</strong>
            <p>
              This uses PayFast's sandbox environment — no real money moves.
              You'll be taken to PayFast to "pay" with sandbox test card
              details, then brought back here.
            </p>
          </div>

          <button
            class="btn-primary btn-block"
            type="button"
            :disabled="submitting"
            @click="placeOrder"
          >
            {{
              submitting
                ? "Redirecting to PayFast…"
                : "Pay with PayFast"
            }}
          </button>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import {
  cart,
  cartTotal,
  cartGrandTotal,
  clearCart,
  DELIVERY_FEE,
} from "../stores/cart.js";

import { bookingApi, payfastApi } from "../services/api.js";
import { redirectToPayfast } from "../utils/payfast.js";

const store = useStore();
const router = useRouter();

const submitting = ref(false);

const isAuthenticated = computed(
  () => store.getters["auth/isAuthenticated"]
);

const currentUser = computed(
  () => store.state.auth.user
);

const provinces = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
];

const form = reactive({
  name: currentUser.value?.name || "",
  phone: "",
  email: currentUser.value?.email || "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  notes: "",
});

function validate() {
  if (
    !form.name.trim() ||
    !form.phone.trim() ||
    !form.email.trim() ||
    !form.address.trim() ||
    !form.city.trim() ||
    !form.province ||
    !form.postalCode.trim()
  ) {
    Swal.fire(
      "Missing information",
      "Please complete your name, phone number, email and delivery address.",
      "warning"
    );

    return false;
  }

  return true;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function createBookingForItem(item) {
  if (!item.id) {
    throw new Error(
      `The product "${item.title || item.name}" does not have a valid ID.`
    );
  }

  const startDate = new Date();

  const rentalDays = Math.max(
    Number(item.days) || 1,
    1
  );

  const endDate = new Date(startDate);

  endDate.setDate(
    endDate.getDate() + rentalDays - 1
  );

  const bookingData = {
    productId: Number(item.id),
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };

  console.log(
    "CREATING BOOKING FOR PRODUCT:",
    bookingData
  );

  return bookingApi.create(bookingData);
}

async function placeOrder() {
  if (!isAuthenticated.value) {
    router.push("/login");
    return;
  }

  if (!validate()) {
    return;
  }

  if (!cart.items.length) {
    Swal.fire(
      "Your cart is empty",
      "Please add a rental before checking out.",
      "warning"
    );

    return;
  }

  submitting.value = true;

  try {
    console.log(
      "========== CHECKOUT STARTED =========="
    );

    console.log(
      "CART ITEMS:",
      cart.items
    );

    /*
     * Create a booking for every product in the cart.
     *
     * IMPORTANT:
     * The backend expects productId, NOT listingId.
     */
    const results = await Promise.all(
      cart.items.map((item) =>
        createBookingForItem(item)
      )
    );

    console.log(
      "BOOKINGS CREATED SUCCESSFULLY:",
      results
    );

    const successfulEmails = results.filter(
      (result) => result?.emailSent === true
    ).length;

    console.log(
      `EMAILS SENT: ${successfulEmails}/${results.length}`
    );

    const bookingIds = results.map((result) => result.booking.id);

    // Cart is only cleared once we know the bookings exist — if PayFast
    // initiation fails below, the bookings still sit as "pending_payment"
    // and the cart items would otherwise be lost with no way to retry.
    clearCart();

    console.log(
      "STARTING PAYFAST PAYMENT FOR BOOKINGS:",
      bookingIds
    );

    const payment = await payfastApi.initiate(bookingIds);

    console.log(
      "PAYFAST PAYMENT INITIATED:",
      payment.mPaymentId
    );

    // Full-page redirect to PayFast's sandbox — the rest of the flow
    // (payment, return/cancel redirect, ITN confirmation) happens there.
    redirectToPayfast(payment);
  } catch (error) {
    console.error(
      "========== CHECKOUT FAILED =========="
    );

    console.error(error);

    await Swal.fire(
      "Booking failed",
      error?.message ||
        "Something went wrong while creating your booking.",
      "error"
    );
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');

.checkout-page {
  --paper: #faf6ee;
  --surface: #ffffff;
  --surface-alt: #f3ecdc;
  --pine: #0b3b2e;
  --pine-deep: #082820;
  --gold: #d99a2b;
  --gold-deep: #b87f1b;
  --line: #e4decf;
  --ink: #17231f;
  --ink-soft: #5e6863;

  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 24px 90px;
  color: var(--ink);
  font-family: "Inter", sans-serif;
  background: var(--paper);
}

.checkout-head {
  margin-bottom: 36px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--gold-deep);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.checkout-head h1 {
  margin: 0;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 2.1rem;
  color: var(--pine);
}

.checkout-intro {
  margin: 10px 0 0;
  max-width: 620px;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* NOTICE */

.notice-card {
  margin-top: 20px;
  padding: 64px 20px;
  text-align: center;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 4px;
}

.notice-mark {
  display: inline-block;
  font-family: "Fraunces", serif;
  font-size: 1.3rem;
  color: var(--gold-deep);
  margin-bottom: 6px;
}

.notice-card h3 {
  margin: 0;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--pine);
}

.notice-card p {
  margin: 10px auto 26px;
  max-width: 420px;
  color: var(--ink-soft);
  line-height: 1.6;
}

.notice-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* LAYOUT */

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 44px;
  align-items: start;
}

.checkout-form {
  display: flex;
  flex-direction: column;
}

.section-rule {
  height: 1px;
  background: var(--line);
  margin: 34px 0;
}

.form-section h2 {
  margin: 0 0 22px;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--pine);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--ink-soft);
  margin-bottom: 18px;
}

.field:last-child {
  margin-bottom: 0;
}

.optional {
  font-weight: 400;
  color: #a3a89e;
}

.field input,
.field select,
.field textarea {
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 0.94rem;
  font-family: "Inter", sans-serif;
  color: var(--ink);
  background: var(--surface);
  box-sizing: border-box;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(217, 154, 43, 0.18);
}

.field textarea {
  resize: vertical;
}

.field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field-grid-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

/* COURIER */

.courier-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: start;
  padding: 20px;
  border-radius: 8px;
  background: var(--surface-alt);
  border: 1px solid var(--line);
}

.courier-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.courier-info strong {
  display: block;
  font-family: "Fraunces", serif;
  font-weight: 600;
  color: var(--pine);
  margin-bottom: 6px;
  font-size: 1.02rem;
}

.courier-info p {
  margin: 0 0 10px;
  color: var(--ink-soft);
  font-size: 0.86rem;
  line-height: 1.55;
}

.courier-info ul {
  margin: 0;
  padding-left: 18px;
  color: var(--ink-soft);
  font-size: 0.8rem;
  line-height: 1.7;
}

/* SUMMARY */

.order-summary {
  position: sticky;
  top: 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-top: 3px solid var(--pine);
  border-radius: 4px;
  padding: 26px;
}

.order-summary h3 {
  margin: 0 0 18px;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--pine);
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--ink);
}

.summary-item-name small {
  display: block;
  color: var(--ink-soft);
  font-size: 0.72rem;
  margin-top: 2px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
}

.summary-total {
  border-top: 1px solid var(--line);
  margin-top: 6px;
  padding-top: 16px;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--ink);
}

/* DEMO NOTE */

.demo-note {
  margin-top: 18px;
  padding: 14px;
  background: var(--surface-alt);
  border-radius: 6px;
  border: 1px solid var(--line);
}

.demo-note strong {
  display: block;
  margin-bottom: 5px;
  color: var(--pine);
  font-size: 0.85rem;
}

.demo-note p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.76rem;
  line-height: 1.5;
}

/* BUTTONS */

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--gold);
  color: var(--pine-deep);
  padding: 14px 20px;
  border-radius: 6px;
  border: none;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.92rem;
  cursor: pointer;
  margin-top: 20px;
  transition:
    background 0.15s ease,
    transform 0.1s ease;
}

.btn-primary:hover {
  background: var(--gold-deep);
}

.btn-primary:active {
  transform: translateY(1px);
}

.btn-primary:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  border-radius: 6px;
  border: 1px solid var(--pine);
  color: var(--pine);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.92rem;
}

.btn-outline:hover {
  background: var(--surface-alt);
}

.btn-block {
  width: 100%;
  box-sizing: border-box;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .field-grid,
  .field-grid-3 {
    grid-template-columns: 1fr;
  }

  .courier-card {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
  }
}
</style>