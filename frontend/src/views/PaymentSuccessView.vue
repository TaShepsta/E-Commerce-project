<template>
  <main class="payment-page">
    <div class="payment-card">
      <template v-if="status === 'checking'">
        <div class="spinner"></div>
        <h1>Confirming your payment…</h1>
        <p>Hang tight, we're checking in with PayFast.</p>
      </template>

      <template v-else-if="status === 'complete'">
        <span class="mark success">✓</span>
        <h1>Payment received!</h1>
        <p>Your booking{{ bookingIds.length > 1 ? "s are" : " is" }} confirmed.</p>
        <RouterLink to="/my-bookings" class="btn-primary">
          View my bookings
        </RouterLink>
      </template>

      <template v-else-if="status === 'pending'">
        <span class="mark pending">…</span>
        <h1>Payment received, confirming…</h1>
        <p>
          PayFast has your payment — we're just waiting on their final
          confirmation. This can take a minute in the sandbox. Your booking
          will move to "confirmed" automatically once it arrives.
        </p>
        <RouterLink to="/my-bookings" class="btn-primary">
          View my bookings
        </RouterLink>
      </template>

      <template v-else>
        <span class="mark error">!</span>
        <h1>We couldn't confirm that payment</h1>
        <p>{{ error || "Something went wrong. Please check your bookings or try paying again." }}</p>
        <RouterLink to="/my-bookings" class="btn-primary">
          View my bookings
        </RouterLink>
      </template>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { payfastApi } from "../services/api.js";

const route = useRoute();

const status = ref("checking");
const bookingIds = ref([]);
const error = ref("");

async function poll() {
  const mPaymentId = route.query.m_payment_id || route.query.mPaymentId;

  if (!mPaymentId) {
    // PayFast's return_url doesn't get query params by default unless we
    // pass them — fall back to a generic "check my bookings" message.
    status.value = "pending";
    return;
  }

  const maxAttempts = 6;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const result = await payfastApi.getStatus(mPaymentId);

      bookingIds.value = result.bookingIds || [];

      if (result.status === "complete") {
        status.value = "complete";
        return;
      }

      if (result.status === "failed" || result.status === "cancelled") {
        status.value = "error";
        error.value = "PayFast reported this payment did not go through.";
        return;
      }
    } catch (err) {
      error.value = err.message;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // ITN hasn't arrived yet (common in local dev without a public
  // notify_url) — not an error, just not confirmed yet.
  status.value = "pending";
}

onMounted(poll);
</script>

<style scoped>
.payment-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  background: #f7f3ea;
}
.payment-card {
  max-width: 460px;
  width: 100%;
  text-align: center;
  padding: 48px 32px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e4e0d7;
}
.mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 16px;
}
.mark.success {
  background: #e8f0e5;
  color: #0b3b32;
}
.mark.pending {
  background: #fdf3dc;
  color: #b87f1b;
}
.mark.error {
  background: #fde8e8;
  color: #8b1e1e;
}
h1 {
  margin: 0 0 10px;
  font-size: 1.4rem;
  color: #0b3b32;
}
p {
  margin: 0 0 24px;
  color: #68717a;
  line-height: 1.6;
}
.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 4px solid #e4e0d7;
  border-top-color: #e99b13;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.btn-primary {
  display: inline-flex;
  padding: 12px 22px;
  border-radius: 6px;
  background: #e99b13;
  color: #0b3b32;
  font-weight: 800;
  text-decoration: none;
}
</style>
