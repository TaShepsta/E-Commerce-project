<template>
  <div class="detail-backdrop" @click.self="closeModal">
    <div class="detail-modal">
      <!-- CLOSE BUTTON -->
      <button
        type="button"
        class="close-button"
        aria-label="Close"
        @click="closeModal"
      >
        ×
      </button>

      <!-- PRODUCT IMAGE -->
      <section class="detail-image-section">
        <img
          v-if="productImage"
          :src="productImage"
          :alt="product.title"
          class="detail-image"
          @error="imageError = true"
        />

        <div v-else class="detail-image-placeholder">
          <span>{{ product.category || "RENTOSPHERE" }}</span>
        </div>

        <div class="image-badge">
          ✓ Safety Verified
        </div>
      </section>

      <!-- PRODUCT / RENTAL CONTENT -->
      <section class="detail-content">
        <!-- =========================
             PRODUCT DETAILS
        ========================== -->
        <div v-if="!showRentalForm">
          <p class="detail-category">
            {{ product.category || "GENERAL" }}
          </p>

          <h2 class="detail-title">
            {{ product.title }}
          </h2>

          <div class="detail-location">
            <span>📍</span>
            <span>
              {{ product.location || "Location not specified" }}
            </span>
          </div>

          <div class="detail-price">
            <strong>
              R{{ Number(product.price_per_day || 0).toFixed(2) }}
            </strong>
            <span>/ day</span>
          </div>

          <div class="detail-divider"></div>

          <div class="detail-info">
            <h3>About this item</h3>

            <p>
              {{
                product.description ||
                "This item is available to rent through Rentosphere. Check the rental details and choose your dates before booking."
              }}
            </p>
          </div>

          <div class="detail-meta">
            <div class="meta-item">
              <span class="meta-label">Category</span>

              <span class="meta-value">
                {{ product.category || "General" }}
              </span>
            </div>

            <div class="meta-item">
              <span class="meta-label">Location</span>

              <span class="meta-value">
                {{ product.location || "Not specified" }}
              </span>
            </div>

            <div class="meta-item">
              <span class="meta-label">Safety</span>

              <span class="meta-value verified">
                ✓ Safety Verified
              </span>
            </div>
          </div>

          <!-- EXACTLY TWO BUTTONS -->
          <div class="detail-actions">
            <button
              type="button"
              class="add-cart-button"
              @click="handleAdd"
            >
              Add to Cart
            </button>

            <button
              type="button"
              class="rent-button"
              @click="openRentalForm"
            >
              Rent Now
            </button>
          </div>
        </div>

        <!-- =========================
             RENTAL FORM
        ========================== -->
        <div v-else class="rental-form-wrapper">
          <button
            type="button"
            class="back-button"
            @click="showRentalForm = false"
          >
            ← Back to product
          </button>

          <p class="detail-category">
            RENT THIS ITEM
          </p>

          <h2 class="detail-title">
            {{ product.title }}
          </h2>

          <p class="form-intro">
            Enter your rental details below. Your booking will only be
            created when you submit the form.
          </p>

          <form @submit.prevent="submitRental">
            <!-- CUSTOMER DETAILS -->
            <div class="form-section">
              <h3>Customer Details</h3>

              <div class="form-grid">
                <div class="form-group full-width">
                  <label for="fullName">Full Name</label>

                  <input
                    id="fullName"
                    v-model.trim="form.fullName"
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email</label>

                  <input
                    id="email"
                    v-model.trim="form.email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="phone">Phone</label>

                  <input
                    id="phone"
                    v-model.trim="form.phone"
                    type="tel"
                    placeholder="071 234 5678"
                    required
                  />
                </div>

                <div class="form-group full-width">
                  <label for="address">Address</label>

                  <input
                    id="address"
                    v-model.trim="form.address"
                    type="text"
                    placeholder="Street address"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="city">City</label>

                  <input
                    id="city"
                    v-model.trim="form.city"
                    type="text"
                    placeholder="Cape Town"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="province">Province</label>

                  <select
                    id="province"
                    v-model="form.province"
                    required
                  >
                    <option value="">
                      Select province
                    </option>

                    <option value="Eastern Cape">
                      Eastern Cape
                    </option>

                    <option value="Free State">
                      Free State
                    </option>

                    <option value="Gauteng">
                      Gauteng
                    </option>

                    <option value="KwaZulu-Natal">
                      KwaZulu-Natal
                    </option>

                    <option value="Limpopo">
                      Limpopo
                    </option>

                    <option value="Mpumalanga">
                      Mpumalanga
                    </option>

                    <option value="Northern Cape">
                      Northern Cape
                    </option>

                    <option value="North West">
                      North West
                    </option>

                    <option value="Western Cape">
                      Western Cape
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="postalCode">
                    Postal Code
                  </label>

                  <input
                    id="postalCode"
                    v-model.trim="form.postalCode"
                    type="text"
                    placeholder="7785"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- RENTAL DETAILS -->
            <div class="form-section">
              <h3>Rental Details</h3>

              <div class="form-grid">
                <div class="form-group">
                  <label for="startDate">
                    Start Date
                  </label>

                  <input
                    id="startDate"
                    v-model="form.startDate"
                    type="date"
                    :min="today"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="endDate">
                    End Date
                  </label>

                  <input
                    id="endDate"
                    v-model="form.endDate"
                    type="date"
                    :min="form.startDate || today"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="quantity">
                    Quantity
                  </label>

                  <input
                    id="quantity"
                    v-model.number="form.quantity"
                    type="number"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- PAYMENT -->
            <div class="form-section">
              <h3>Payment Details</h3>

              <p class="payment-note">
                Demo payment only. These card details are not sent to
                the backend or stored.
              </p>

              <div class="form-grid">
                <div class="form-group full-width">
                  <label for="cardName">
                    Name on Card
                  </label>

                  <input
                    id="cardName"
                    v-model.trim="form.cardName"
                    type="text"
                    placeholder="Name on card"
                    required
                  />
                </div>

                <div class="form-group full-width">
                  <label for="cardNumber">
                    Card Number
                  </label>

                  <input
                    id="cardNumber"
                    v-model.trim="form.cardNumber"
                    type="text"
                    inputmode="numeric"
                    maxlength="19"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="expiry">
                    Expiry
                  </label>

                  <input
                    id="expiry"
                    v-model.trim="form.expiry"
                    type="text"
                    maxlength="5"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="cvv">
                    CVV
                  </label>

                  <input
                    id="cvv"
                    v-model.trim="form.cvv"
                    type="password"
                    inputmode="numeric"
                    maxlength="4"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- BOOKING SUMMARY -->
            <div class="booking-summary">
              <div>
                <span>Rental price</span>

                <strong>
                  R{{ Number(product.price_per_day || 0).toFixed(2) }}
                  / day
                </strong>
              </div>

              <div>
                <span>Rental days</span>

                <strong>
                  {{ rentalDays }}
                </strong>
              </div>

              <div>
                <span>Quantity</span>

                <strong>
                  {{ form.quantity }}
                </strong>
              </div>

              <div class="total-row">
                <span>Total</span>

                <strong>
                  R{{ totalPrice.toFixed(2) }}
                </strong>
              </div>
            </div>

            <!-- FORM ACTIONS -->
            <div class="form-actions">
              <button
                type="button"
                class="cancel-button"
                @click="showRentalForm = false"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="confirm-button"
                :disabled="submitting"
              >
                {{
                  submitting
                    ? "Processing..."
                    : "Confirm Rental"
                }}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";

import { addToCart } from "../stores/cart.js";
import { bookingApi } from "../services/api.js";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const router = useRouter();
const store = useStore();

const showRentalForm = ref(false);
const submitting = ref(false);
const imageError = ref(false);

const currentUser = computed(() => {
  return (
    store.getters["auth/currentUser"] ||
    store.state.auth?.user ||
    store.state.user ||
    null
  );
});

const today = new Date()
  .toISOString()
  .split("T")[0];

const form = reactive({
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",

  startDate: "",
  endDate: "",
  quantity: 1,

  // Demo-only payment fields
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
});

const productImage = computed(() => {
  if (imageError.value) {
    return "";
  }

  return (
    props.product.image_url ||
    props.product.image ||
    ""
  );
});

const rentalDays = computed(() => {
  if (!form.startDate || !form.endDate) {
    return 1;
  }

  const start = new Date(form.startDate);
  const end = new Date(form.endDate);

  const difference =
    end.getTime() - start.getTime();

  const days = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  return days > 0 ? days : 1;
});

const totalPrice = computed(() => {
  const price = Number(
    props.product.price_per_day || 0
  );

  const quantity = Number(
    form.quantity || 1
  );

  return (
    price *
    rentalDays.value *
    quantity
  );
});

function closeModal() {
  emit("close");
}

function openRentalForm() {
  if (!currentUser.value) {
    Swal.fire({
      icon: "info",
      title: "Login required",
      text: "Please log in before renting an item.",
      confirmButtonColor: "#0b3b2e",
    });

    router.push("/login");
    return;
  }

  form.fullName =
    currentUser.value.fullName ||
    currentUser.value.name ||
    "";

  form.email =
    currentUser.value.email ||
    "";

  showRentalForm.value = true;
}

async function handleAdd() {
  if (!currentUser.value) {
    Swal.fire({
      icon: "info",
      title: "Login required",
      text: "Please log in before adding an item to your cart.",
      confirmButtonColor: "#0b3b2e",
    });

    router.push("/login");
    return;
  }

  try {
    await addToCart(
      props.product,
      1,
      1
    );

    await Swal.fire({
      icon: "success",
      title: "Added to cart",
      text: `${props.product.title} has been added to your cart.`,
      confirmButtonColor: "#0b3b2e",
    });

    closeModal();
  } catch (error) {
    console.error(
      "Add to cart error:",
      error
    );

    Swal.fire({
      icon: "error",
      title: "Could not add to cart",
      text:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while adding this item to your cart.",
      confirmButtonColor: "#0b3b2e",
    });
  }
}

function validateForm() {
  if (!form.fullName) {
    return "Please enter your full name.";
  }

  if (!form.email) {
    return "Please enter your email address.";
  }

  if (!form.phone) {
    return "Please enter your phone number.";
  }

  if (!form.address) {
    return "Please enter your address.";
  }

  if (!form.city) {
    return "Please enter your city.";
  }

  if (!form.province) {
    return "Please select your province.";
  }

  if (!form.postalCode) {
    return "Please enter your postal code.";
  }

  if (!form.startDate) {
    return "Please select a start date.";
  }

  if (!form.endDate) {
    return "Please select an end date.";
  }

  if (form.endDate < form.startDate) {
    return "The end date cannot be before the start date.";
  }

  if (!form.quantity || form.quantity < 1) {
    return "Quantity must be at least 1.";
  }

  if (!form.cardName) {
    return "Please enter the name on the card.";
  }

  if (!form.cardNumber) {
    return "Please enter the card number.";
  }

  if (!form.expiry) {
    return "Please enter the card expiry.";
  }

  if (!form.cvv) {
    return "Please enter the CVV.";
  }

  return null;
}

async function submitRental() {
  const validationError =
    validateForm();

  if (validationError) {
    Swal.fire({
      icon: "warning",
      title: "Check your details",
      text: validationError,
      confirmButtonColor: "#0b3b2e",
    });

    return;
  }

  if (!currentUser.value) {
    Swal.fire({
      icon: "info",
      title: "Login required",
      text: "Please log in before completing your rental.",
      confirmButtonColor: "#0b3b2e",
    });

    router.push("/login");
    return;
  }

  submitting.value = true;

  try {
    /*
     * Only the fields expected by the
     * existing booking API are sent.
     *
     * Demo card details remain frontend-only.
     */
    await bookingApi.create({
      productId: props.product.id,
      startDate: form.startDate,
      endDate: form.endDate,
    });

    showRentalForm.value = false;

    await Swal.fire({
      icon: "success",
      title: "Rental booked!",
      text: "Your booking was successfully created. A confirmation email should be sent to your account.",
      confirmButtonColor: "#0b3b2e",
    });

    closeModal();

    router.push("/my-bookings");
  } catch (error) {
    console.error(
      "Booking error:",
      error
    );

    Swal.fire({
      icon: "error",
      title: "Booking failed",
      text:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while creating your booking.",
      confirmButtonColor: "#0b3b2e",
    });
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
/* =========================================================
   BACKDROP
========================================================= */

.detail-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(8, 40, 32, 0.72);
  backdrop-filter: blur(5px);
}

/* =========================================================
   MAIN MODAL
========================================================= */

.detail-modal {
  position: relative;

  width: min(950px, 94vw);
  height: min(680px, 88vh);
  max-height: 88vh;

  display: flex;
  flex-direction: row;

  overflow: hidden;

  background: #ffffff;
  border-radius: 22px;

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.28);

  direction: ltr;
}

/* =========================================================
   CLOSE BUTTON
========================================================= */

.close-button {
  position: absolute;
  top: 14px;
  right: 14px;

  z-index: 20;

  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  border: none;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.95);
  color: #0b3b2e;

  font-size: 27px;
  line-height: 1;

  cursor: pointer;

  box-shadow:
    0 5px 15px rgba(0, 0, 0, 0.14);

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.close-button:hover {
  transform: scale(1.05);
  background: #f7f3ea;
}

/* =========================================================
   IMAGE
========================================================= */

.detail-image-section {
  position: relative;

  flex: 0 0 42%;

  width: 42%;
  height: 100%;
  min-height: 0;

  overflow: hidden;

  background: #f3ecdc;
}

.detail-image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  background: #f3ecdc;
}

.detail-image-placeholder {
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;

  padding: 25px;
  box-sizing: border-box;

  background:
    linear-gradient(
      135deg,
      #eee4d0,
      #f9f3e7
    );

  color: #0b3b2e;

  text-align: center;
}

.detail-image-placeholder span {
  font-size: 13px;
  font-weight: 900;

  letter-spacing: 0.14em;
}

.image-badge {
  position: absolute;

  left: 18px;
  bottom: 18px;

  padding: 9px 13px;

  border-radius: 999px;

  background: #0b3b2e;
  color: #ffffff;

  font-size: 11px;
  font-weight: 800;

  letter-spacing: 0.04em;

  box-shadow:
    0 5px 14px rgba(0, 0, 0, 0.16);
}

/* =========================================================
   CONTENT
========================================================= */

.detail-content {
  flex: 1;

  min-width: 0;
  min-height: 0;

  width: 58%;
  height: 100%;

  box-sizing: border-box;

  padding: 42px 38px 32px;

  overflow-y: auto;

  background: #ffffff;
  color: #111827;

  direction: ltr;
}

.detail-content::-webkit-scrollbar {
  width: 7px;
}

.detail-content::-webkit-scrollbar-track {
  background: transparent;
}

.detail-content::-webkit-scrollbar-thumb {
  background: #d9d0bd;
  border-radius: 10px;
}

/* =========================================================
   PRODUCT INFO
========================================================= */

.detail-category {
  margin: 0 0 8px;

  color: #d99a2b;

  font-size: 11px;
  font-weight: 900;

  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.detail-title {
  margin: 0;

  color: #0b3b2e;

  font-size: clamp(30px, 3.4vw, 42px);
  line-height: 1.04;
  font-weight: 900;

  max-width: 520px;
}

.detail-location {
  display: flex;
  align-items: center;
  gap: 7px;

  margin-top: 15px;

  color: #68736e;

  font-size: 13px;
  font-weight: 600;
}

.detail-price {
  display: flex;
  align-items: baseline;
  gap: 6px;

  margin-top: 20px;

  color: #0b3b2e;
}

.detail-price strong {
  font-size: 27px;
  font-weight: 900;
}

.detail-price span {
  color: #68736e;

  font-size: 13px;
  font-weight: 600;
}

.detail-divider {
  width: 100%;
  height: 1px;

  margin: 23px 0;

  background: #e5dfd3;
}

.detail-info h3 {
  margin: 0 0 8px;

  color: #0b3b2e;

  font-size: 16px;
  font-weight: 900;
}

.detail-info p {
  margin: 0;

  color: #68736e;

  font-size: 14px;
  line-height: 1.7;
}

/* =========================================================
   META
========================================================= */

.detail-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  margin-top: 20px;
}

.meta-item {
  padding: 13px;

  border: 1px solid #e5dfd3;
  border-radius: 10px;

  background: #faf6ee;
}

.meta-label {
  display: block;

  margin-bottom: 4px;

  color: #68736e;

  font-size: 10px;
  font-weight: 800;

  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.meta-value {
  display: block;

  color: #0b3b2e;

  font-size: 12px;
  font-weight: 800;
}

.meta-value.verified {
  color: #16735f;
}

/* =========================================================
   PRODUCT BUTTONS
========================================================= */

.detail-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  margin-top: 24px;
}

.add-cart-button,
.rent-button {
  min-height: 48px;

  border-radius: 10px;

  padding: 13px 16px;

  font-size: 13px;
  font-weight: 900;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.add-cart-button {
  border: 1px solid #0b3b2e;

  background: #ffffff;
  color: #0b3b2e;
}

.rent-button {
  border: none;

  background: #0b3b2e;
  color: #ffffff;
}

.add-cart-button:hover,
.rent-button:hover {
  transform: translateY(-1px);

  box-shadow:
    0 8px 18px rgba(11, 59, 46, 0.15);
}

.add-cart-button:hover {
  background: #f7f3ea;
}

.rent-button:hover {
  background: #082820;
}

/* =========================================================
   RENTAL FORM
========================================================= */

.rental-form-wrapper {
  padding-bottom: 10px;
}

.back-button {
  margin-bottom: 22px;

  padding: 0;

  border: none;
  background: transparent;

  color: #0b3b2e;

  font-size: 13px;
  font-weight: 800;

  cursor: pointer;
}

.back-button:hover {
  text-decoration: underline;
}

.form-intro {
  margin: 12px 0 22px;

  color: #68736e;

  font-size: 13px;
  line-height: 1.6;
}

.form-section {
  margin-bottom: 24px;
}

.form-section h3 {
  margin: 0 0 12px;

  color: #0b3b2e;

  font-size: 16px;
  font-weight: 900;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  color: #0b3b2e;

  font-size: 11px;
  font-weight: 800;
}

.form-group input,
.form-group select {
  width: 100%;
  min-height: 43px;

  box-sizing: border-box;

  border: 1px solid #dcd5c7;
  border-radius: 9px;

  padding: 10px 12px;

  background: #ffffff;
  color: #111827;

  font-family: inherit;
  font-size: 13px;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #0b3b2e;

  box-shadow:
    0 0 0 3px rgba(11, 59, 46, 0.08);
}

.form-group input::placeholder {
  color: #9aa09c;
}

.payment-note {
  margin: -4px 0 14px;

  color: #68736e;

  font-size: 11px;
  line-height: 1.5;
}

/* =========================================================
   BOOKING SUMMARY
========================================================= */

.booking-summary {
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-top: 10px;
  padding: 16px;

  border: 1px solid #e5dfd3;
  border-radius: 12px;

  background: #faf6ee;
}

.booking-summary > div {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  color: #68736e;

  font-size: 12px;
}

.booking-summary strong {
  color: #0b3b2e;
}

.booking-summary .total-row {
  margin-top: 5px;
  padding-top: 12px;

  border-top: 1px solid #ded6c6;

  color: #0b3b2e;

  font-size: 14px;
  font-weight: 900;
}

.booking-summary .total-row strong {
  font-size: 18px;
}

/* =========================================================
   FORM BUTTONS
========================================================= */

.form-actions {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 10px;

  margin-top: 20px;
}

.cancel-button,
.confirm-button {
  min-height: 47px;

  border-radius: 10px;

  padding: 12px 15px;

  font-size: 13px;
  font-weight: 900;

  cursor: pointer;
}

.cancel-button {
  border: 1px solid #d9d1c1;

  background: #ffffff;
  color: #0b3b2e;
}

.confirm-button {
  border: none;

  background: #0b3b2e;
  color: #ffffff;
}

.confirm-button:hover:not(:disabled) {
  background: #082820;
}

.confirm-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 850px) {
  .detail-backdrop {
    padding: 12px;
  }

  .detail-modal {
    width: min(700px, 100%);

    height: auto;
    max-height: 92vh;

    display: flex;
    flex-direction: column;

    overflow-y: auto;
  }

  .detail-image-section {
    flex: none;

    width: 100%;
    height: 280px;
    min-height: 280px;
  }

  .detail-content {
    flex: none;

    width: 100%;
    height: auto;

    max-height: none;

    overflow: visible;

    padding: 30px 25px 25px;
  }

  .detail-title {
    font-size: 32px;
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 560px) {
  .detail-backdrop {
    align-items: flex-end;

    padding: 0;
  }

  .detail-modal {
    width: 100%;

    max-height: 94vh;

    display: flex;
    flex-direction: column;

    border-radius: 20px 20px 0 0;
  }

  .detail-image-section {
    flex: none;

    width: 100%;
    height: 220px;
    min-height: 220px;
  }

  .detail-content {
    width: 100%;
    height: auto;

    padding: 24px 18px 20px;
  }

  .detail-title {
    font-size: 28px;
  }

  .detail-meta {
    grid-template-columns: 1fr;
  }

  .detail-actions {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
  }

  .form-actions {
    grid-template-columns: 1fr;
  }

  .close-button {
    top: 10px;
    right: 10px;

    width: 34px;
    height: 34px;

    font-size: 23px;
  }
}
</style>