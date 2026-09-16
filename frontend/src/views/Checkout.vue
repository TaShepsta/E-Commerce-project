<template>
  <div class="checkout-page">
    <!-- LOGIN REQUIRED -->
    <div v-if="!isAuthenticated" class="notice-card">
      <span class="notice-mark">1</span>
      <h3>Log in to check out</h3>
      <p>You'll need a Rentosphere account so we can confirm your booking and keep you posted on delivery.</p>
      <div class="notice-actions">
        <RouterLink to="/login" class="btn-primary">Log In</RouterLink>
        <RouterLink to="/signup" class="btn-outline">Create an Account</RouterLink>
      </div>
    </div>

    <!-- EMPTY CART -->
    <div v-else-if="cart.items.length === 0" class="notice-card">
      <span class="notice-mark">···</span>
      <h3>Your cart is empty</h3>
      <p>Add an item to your cart before checking out.</p>
      <RouterLink to="/browse" class="btn-primary">Browse Rentals</RouterLink>
    </div>

    <div v-else>
      <header class="checkout-head">
        <h1>Checkout</h1>
        <ol class="step-track">
          <li>Delivery</li>
          <li>Courier</li>
          <li>Payment</li>
        </ol>
      </header>

      <div class="checkout-layout">
        <div class="checkout-form">
          <!-- DELIVERY ADDRESS -->
          <section class="form-section">
            <h2>Delivery address</h2>

            <div class="field-grid">
              <label class="field">
                Full name
                <input v-model="form.name" type="text" placeholder="Jane Dlamini" />
              </label>
              <label class="field">
                Phone number
                <input v-model="form.phone" type="tel" placeholder="081 234 5678" />
              </label>
            </div>

            <label class="field">
              Email
              <input v-model="form.email" type="email" placeholder="jane@email.com" />
            </label>

            <label class="field">
              Street address
              <input v-model="form.address" type="text" placeholder="12 Main Road" />
            </label>

            <div class="field-grid field-grid-3">
              <label class="field">
                City
                <input v-model="form.city" type="text" placeholder="Cape Town" />
              </label>
              <label class="field">
                Province
                <select v-model="form.province">
                  <option value="">Select province</option>
                  <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
                </select>
              </label>
              <label class="field">
                Postal code
                <input v-model="form.postalCode" type="text" placeholder="8001" />
              </label>
            </div>

            <label class="field">
              Delivery notes <span class="optional">optional</span>
              <textarea
                v-model="form.notes"
                rows="2"
                placeholder="Gate code, landmark, preferred time, etc."
              ></textarea>
            </label>
          </section>

          <div class="section-rule"></div>

          <!-- COURIER -->
          <section class="form-section">
            <h2>Delivery method</h2>

            <div class="courier-card">
              <div class="courier-icon">🚚</div>
              <div class="courier-info">
                <strong>Rentosphere Courier</strong>
                <p>
                  All rentals are delivered and collected by our own courier team,
                  so every handover is tracked and insured.
                </p>
                <ul>
                  <li>Estimated delivery: 1–3 business days</li>
                  <li>Items collected at the end of the rental period</li>
                  <li>SMS &amp; email updates once your courier is on the way</li>
                </ul>
              </div>
              <div class="courier-fee">
                <span>Delivery fee</span>
                <strong>R{{ DELIVERY_FEE }}</strong>
              </div>
            </div>
          </section>

          <div class="section-rule"></div>

          <!-- PAYMENT -->
          <section class="form-section">
            <h2>Payment details</h2>

            <label class="field">
              Name on card
              <input v-model="form.cardName" type="text" placeholder="J Dlamini" />
            </label>

            <label class="field">
              Card number
              <input
                :value="form.cardNumber"
                @input="handleCardNumberInput"
                type="text"
                inputmode="numeric"
                maxlength="19"
                placeholder="1234 5678 9012 3456"
              />
            </label>

            <div class="field-grid">
              <label class="field">
                Expiry (MM/YY)
                <input
                  :value="form.cardExpiry"
                  @input="handleExpiryInput"
                  type="text"
                  maxlength="5"
                  placeholder="08/28"
                />
              </label>
              <label class="field">
                CVV
                <input
                  v-model="form.cardCvv"
                  type="password"
                  inputmode="numeric"
                  maxlength="4"
                  placeholder="123"
                />
              </label>
            </div>

            <p class="secure-note">🔒 Payments are encrypted. We never store your full card number.</p>
          </section>
        </div>

        <!-- ORDER SUMMARY -->
        <aside class="order-summary">
          <h3>Order summary</h3>

          <div class="summary-items">
            <div v-for="item in cart.items" :key="item.id" class="summary-item">
              <span class="summary-item-name">
                {{ item.title || item.name }}
                <small>{{ item.days }} day{{ item.days > 1 ? "s" : "" }} × {{ item.qty }}</small>
              </span>
              <span>R{{ (item.price_per_day * item.days * item.qty).toFixed(0) }}</span>
            </div>
          </div>

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

          <button class="btn-primary btn-block" type="button" :disabled="submitting" @click="placeOrder">
            {{ submitting ? "Placing order…" : `Pay R${cartGrandTotal.toFixed(0)} & confirm booking` }}
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
import { bookingApi } from "../services/api.js";

const store = useStore();
const router = useRouter();
const submitting = ref(false);

const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
const currentUser = computed(() => store.state.auth.user);

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
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
});

function handleCardNumberInput(event) {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 16);
  form.cardNumber = digits.replace(/(.{4})/g, "$1 ").trim();
}

function handleExpiryInput(event) {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
  form.cardExpiry = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

function validate() {
  if (!form.name || !form.phone || !form.address || !form.city || !form.province || !form.postalCode) {
    Swal.fire("Missing delivery info", "Please fill in your full delivery address.", "warning");
    return false;
  }

  const cardDigits = form.cardNumber.replace(/\s/g, "");
  if (!form.cardName || cardDigits.length < 15 || !/^\d{2}\/\d{2}$/.test(form.cardExpiry) || form.cardCvv.length < 3) {
    Swal.fire("Missing payment info", "Please fill in your card details.", "warning");
    return false;
  }

  return true;
}

async function placeOrder() {
  if (!validate()) return;

  submitting.value = true;

  const cardDigits = form.cardNumber.replace(/\s/g, "");

  try {
    const startDate = new Date();

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    await Promise.all(
      cart.items.map((item) =>
        (() => {
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + (Number(item.days) || 1) - 1);

          return bookingApi.create({
            listingId: item.id,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          });
        })(),
      ),
    );
  } catch (error) {
    submitting.value = false;
    await Swal.fire("Booking failed", error.message, "error");
    return;
  }

  await Swal.fire(
    "Booking Confirmed!",
    `Total R${cartGrandTotal.value.toFixed(0)}. Rentosphere Courier will be in touch to arrange delivery.`,
    "success"
  );

  clearCart();
  submitting.value = false;
  router.push("/browse");
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
  --danger: #b3261e;

  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 24px 90px;
  color: var(--ink);
  font-family: "Inter", sans-serif;
  background: var(--paper);
}

.checkout-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 36px;
}

.checkout-head h1 {
  margin: 0;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 2.1rem;
  letter-spacing: -0.01em;
  color: var(--pine);
}

.step-track {
  display: flex;
  gap: 22px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--ink-soft);
}

.step-track li {
  position: relative;
  padding-left: 20px;
}

.step-track li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold);
}

/* ---------------- NOTICE ---------------- */

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

/* ---------------- LAYOUT ---------------- */

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
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
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
  font-family: "Inter", sans-serif;
}

.field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field-grid-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.secure-note {
  margin: 6px 0 0;
  font-size: 0.78rem;
  color: var(--ink-soft);
}

/* ---------------- COURIER CARD ---------------- */

.courier-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;
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

.courier-fee {
  text-align: right;
  white-space: nowrap;
}

.courier-fee span {
  display: block;
  font-size: 0.72rem;
  color: var(--ink-soft);
}

.courier-fee strong {
  font-family: "Fraunces", serif;
  color: var(--pine);
  font-size: 1.15rem;
}

/* ---------------- SUMMARY ---------------- */

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
  transition: background 0.15s ease, transform 0.1s ease;
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

/* ---------------- RESPONSIVE ---------------- */

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
    text-align: left;
  }

  .courier-fee {
    text-align: left;
  }

  .order-summary {
    position: static;
  }
}
</style>