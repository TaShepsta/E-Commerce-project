<template>
  <main class="bookings-page">
    <header class="page-header">
      <p class="eyebrow">RENTER SPACE</p>
      <h1>My <span>bookings.</span></h1>
      <p>Track the rental items you have requested through Rentosphere.</p>
    </header>

    <section class="bookings-content" aria-live="polite">
      <p v-if="loading">Loading your bookings...</p>
      <p v-else-if="error" class="error">{{ error }}</p>
      <div v-else-if="bookings.length === 0" class="empty-state">
        <h2>No bookings yet</h2>
        <p>Browse available listings and start your next rental.</p>
        <RouterLink to="/browse" class="primary-button">Browse listings</RouterLink>
      </div>
      <div v-else class="booking-list">
        <article v-for="booking in bookings" :key="booking.id" class="booking-row">
          <div>
            <h2>{{ booking.listing_title }}</h2>
            <p>{{ formatDate(booking.start_date) }} to {{ formatDate(booking.end_date) }}</p>
          </div>
          <strong>R{{ Number(booking.total_price).toFixed(2) }}</strong>
          <span class="status" :class="booking.status">{{ formatStatus(booking.status) }}</span>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { bookingApi } from "../services/api.js";

const bookings = ref([]);
const loading = ref(true);
const error = ref("");

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString();
}

function formatStatus(value) {
  return value.replaceAll("_", " ");
}

async function loadBookings() {
  try {
    const data = await bookingApi.getMine();
    bookings.value = data.bookings || [];
  } catch (requestError) {
    error.value = requestError.message;
  } finally {
    loading.value = false;
  }
}

onMounted(loadBookings);
</script>

<style scoped>
.bookings-page {
  min-height: 100vh;
  padding: 72px 7% 100px;
  color: #111827;
  background: #f7f3ea;
}
.page-header,
.bookings-content {
  max-width: 1180px;
  margin: 0 auto;
}
.page-header {
  margin-bottom: 48px;
}
.eyebrow {
  margin: 0 0 12px;
  color: #e99b13;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}
h1 {
  margin: 0;
  font-size: clamp(3rem, 6vw, 5.4rem);
  line-height: 0.95;
  letter-spacing: -0.045em;
}
h1 span {
  color: #e99b13;
}
.page-header > p:last-child {
  max-width: 480px;
  margin-top: 24px;
  color: #68717a;
  line-height: 1.65;
}
.bookings-content {
  padding: 32px;
  background: #ffffff;
  border-top: 1px solid #e4e0d7;
}
.booking-list {
  display: grid;
}
.booking-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 24px;
  align-items: center;
  padding: 22px 0;
  border-bottom: 1px solid #e4e0d7;
}
.booking-row h2 {
  margin: 0 0 7px;
  font-size: 1.1rem;
}
.booking-row p {
  margin: 0;
  color: #68717a;
  font-size: 0.88rem;
}
.booking-row > strong {
  color: #0b3b32;
}
.status {
  padding: 7px 10px;
  border-radius: 4px;
  color: #0b3b32;
  background: #e8f0e5;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: capitalize;
}
.status.cancelled {
  color: #8b1e1e;
  background: #fde8e8;
}
.empty-state {
  text-align: center;
  padding: 48px 16px;
}
.empty-state h2 {
  margin: 0;
  color: #0b3b32;
}
.empty-state p {
  color: #68717a;
}
.primary-button {
  display: inline-block;
  margin-top: 14px;
  padding: 12px 18px;
  border-radius: 7px;
  color: #ffffff;
  background: #0b3b32;
  font-weight: 800;
  text-decoration: none;
}
.error {
  color: #b3261e;
}
@media (max-width: 680px) {
  .bookings-page {
    padding: 48px 20px 80px;
  }
  .bookings-content {
    padding: 20px;
  }
  .booking-row {
    grid-template-columns: 1fr auto;
    gap: 12px;
  }
  .booking-row .status {
    grid-column: 1 / -1;
    justify-self: start;
  }
}
</style>
