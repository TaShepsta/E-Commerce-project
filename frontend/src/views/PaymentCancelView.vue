<template>
  <main class="payment-page">
    <div class="payment-card">
      <span class="mark">✕</span>
      <h1>Payment cancelled</h1>
      <p>
        No charge was made. Your booking is still saved and waiting for
        payment — you can try again any time from My Bookings.
      </p>
      <RouterLink to="/my-bookings" class="btn-primary">
        View my bookings
      </RouterLink>
    </div>
  </main>
</template>

<script setup></script>

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
