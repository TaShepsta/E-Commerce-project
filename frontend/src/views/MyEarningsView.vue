<template>
  <div class="owner-page earnings-page">
    <section class="owner-hero">
      <div>
        <p class="eyebrow">OWNER SPACE</p>
        <h1>My <span>earnings.</span></h1>
        <p class="intro">
          Follow what your rentals are earning and when your next payout is on
          its way.
        </p>
      </div>
    </section>

    <section class="earnings-content">
      <div class="section-heading">
        <div>
          <p class="eyebrow">YOUR PAYOUTS</p>
          <h2>A clearer view of <span>your income.</span></h2>
        </div>
      </div>

      <div class="summary-grid">
        <article class="summary-card featured">
          <span>Total earnings</span>
          <strong>R{{ summary.total }}</strong>
          <small>Since joining Rentosphere</small>
        </article>
        <article class="summary-card">
          <span>This month</span>
          <strong>R{{ summary.month }}</strong>
          <small>Across {{ summary.rentals }} completed rentals</small>
        </article>
        <article class="summary-card">
          <span>Available to withdraw</span>
          <strong>R{{ summary.available }}</strong>
          <small>Next payout {{ summary.nextPayout || "Not scheduled" }}</small>
        </article>
      </div>

      <p v-if="loading">Loading your earnings...</p>
      <p v-else-if="loadError">{{ loadError }}</p>

      <section class="trend-panel" aria-labelledby="earnings-trend-title">
        <div class="trend-copy">
          <p class="eyebrow">EARNINGS TREND</p>
          <h2 id="earnings-trend-title">
            A steady <span>upward rhythm.</span>
          </h2>
          <p>
            Monthly rental income after completed bookings and platform fees.
          </p>
        </div>
        <div
          class="chart"
          role="img"
          aria-label="Bar chart showing monthly earnings from April to September 2026"
        >
          <div class="chart-gridline chart-gridline-top">
            <span>{{ formatCurrency(chartMax) }}</span>
          </div>
          <div class="chart-gridline chart-gridline-middle">
            <span>{{ formatCurrency(chartMax / 2) }}</span>
          </div>
          <div class="chart-gridline chart-gridline-bottom">
            <span>R0</span>
          </div>
          <div class="bars">
            <div
              v-for="month in monthlyEarnings"
              :key="month.label"
              class="bar-column"
            >
              <span class="bar-value">R{{ month.amount }}</span>
              <div class="bar-track">
                <div
                  class="bar"
                  :style="{ height: `${(month.amount / chartMax) * 100}%` }"
                ></div>
              </div>
              <span class="bar-label">{{ month.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <div class="history-heading">
        <h2>Payout history</h2>
        <span>{{ history.length }} recent payouts</span>
      </div>
      <div class="history-table" role="region" aria-label="Payout history">
        <div v-for="payout in history" :key="payout.id" class="history-row">
          <div>
            <strong>{{ payout.description }}</strong>
            <span>{{ payout.date }}</span>
          </div>
          <span class="payout-status" :class="payout.status.toLowerCase()">{{
            payout.status
          }}</span>
          <strong class="payout-amount">+R{{ payout.amount }}</strong>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { earningsApi } from "../services/api";

const summary = ref({
  total: 0,
  month: 0,
  rentals: 4,
  available: 0,
  nextPayout: null,
});
const monthlyEarnings = ref([]);
const history = ref([]);
const loading = ref(true);
const loadError = ref("");

const chartMax = computed(() => {
  const amounts = monthlyEarnings.value.map(
    (month) => Number(month.amount) || 0,
  );
  return Math.max(...amounts, 1);
});

function formatCurrency(amount) {
  return `R${Number(amount).toFixed(0)}`;
}

async function loadEarnings() {
  loading.value = true;
  loadError.value = "";
  try {
    const data = await earningsApi.get();
    summary.value = data.summary;
    monthlyEarnings.value = data.monthlyEarnings;
    history.value = data.history;
  } catch (error) {
    loadError.value = error.message;
  } finally {
    loading.value = false;
  }
}

onMounted(loadEarnings);
</script>

<style scoped>
.owner-page {
  --green: #0b3b32;
  --ink: #111827;
  --cream: #f7f3ea;
  --gold: #e99b13;
  min-height: 100vh;
  color: var(--ink);
  background: var(--cream);
}
.owner-hero {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 32px;
  padding: 72px 7% 64px;
}
.eyebrow {
  margin: 0 0 12px;
  color: var(--gold);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}
h1,
h2 {
  margin: 0;
  line-height: 0.92;
  letter-spacing: -0.045em;
}
h1 {
  font-size: clamp(3.2rem, 6vw, 5.6rem);
}
h1 span,
h2 span {
  color: var(--gold);
}
.intro {
  max-width: 490px;
  margin: 24px 0 0;
  color: #68717a;
  line-height: 1.65;
}
.secondary-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--green);
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none;
}
.secondary-link span {
  font-size: 1.1rem;
}
.earnings-content {
  padding: 70px 7% 100px;
  background: white;
}
.section-heading,
.summary-grid,
.history-heading,
.history-table {
  max-width: 1180px;
  margin-right: auto;
  margin-left: auto;
}
.section-heading {
  margin-bottom: 36px;
}
.section-heading h2 {
  max-width: 500px;
  font-size: clamp(2.4rem, 4vw, 4rem);
}
.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.summary-card {
  min-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px;
  border: 1px solid #e4e0d7;
  border-radius: 9px;
  background: #fbfaf7;
}
.summary-card.featured {
  color: white;
  border-color: var(--green);
  background: var(--green);
}
.summary-card span,
.summary-card small {
  font-size: 0.8rem;
}
.summary-card span {
  font-weight: 800;
}
.summary-card small {
  color: #68717a;
}
.summary-card.featured small {
  color: #d6e2d9;
}
.summary-card strong {
  font-size: 2.25rem;
  letter-spacing: -0.04em;
}
.trend-panel {
  max-width: 1180px;
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(420px, 1.6fr);
  gap: 55px;
  padding: 32px 0 26px;
  margin: 58px auto 0;
  border-top: 1px solid #e4e0d7;
  border-bottom: 1px solid #e4e0d7;
}
.trend-copy h2 {
  max-width: 300px;
  font-size: 2.15rem;
}
.trend-copy > p:not(.eyebrow) {
  max-width: 290px;
  margin: 20px 0;
  color: #68717a;
  font-size: 0.84rem;
  line-height: 1.6;
}
.trend-change {
  color: var(--green);
  font-size: 1.2rem;
}
.trend-change small {
  color: #68717a;
  font-size: 0.74rem;
  font-weight: 500;
}
.chart {
  min-height: 245px;
  position: relative;
  padding: 8px 0 0 42px;
}
.chart-gridline {
  position: absolute;
  right: 0;
  left: 42px;
  border-top: 1px dashed #ddd8ce;
}
.chart-gridline span {
  position: absolute;
  top: -10px;
  left: -42px;
  color: #8a8e91;
  font-size: 0.68rem;
}
.chart-gridline-top {
  top: 8px;
}
.chart-gridline-middle {
  top: 50%;
}
.chart-gridline-bottom {
  bottom: 28px;
}
.bars {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: end;
  gap: 18px;
  padding: 8px 10px 0;
}
.bar-column {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 8px;
}
.bar-value {
  color: #68717a;
  font-size: 0.68rem;
  white-space: nowrap;
}
.bar-track {
  width: min(100%, 42px);
  height: 170px;
  display: flex;
  align-items: end;
  overflow: hidden;
  border-radius: 5px 5px 2px 2px;
  background: #f0ede6;
}
.bar {
  width: 100%;
  border-radius: 5px 5px 2px 2px;
  background: var(--green);
  transition: height 0.3s ease;
}
.bar-column:last-child .bar {
  background: var(--gold);
}
.bar-label {
  color: #68717a;
  font-size: 0.72rem;
}
.history-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-top: 72px;
  margin-bottom: 18px;
}
.history-heading h2 {
  font-size: 1.7rem;
}
.history-heading > span {
  color: #68717a;
  font-size: 0.8rem;
}
.history-table {
  border-top: 1px solid #e4e0d7;
}
.history-row {
  display: grid;
  grid-template-columns: 1fr auto 100px;
  align-items: center;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid #e4e0d7;
}
.history-row div {
  display: grid;
  gap: 4px;
}
.history-row div span {
  color: #68717a;
  font-size: 0.78rem;
}
.payout-status {
  padding: 6px 9px;
  border-radius: 4px;
  color: var(--green);
  background: #e8f0e5;
  font-size: 0.72rem;
  font-weight: 800;
}
.payout-status.pending {
  color: #765315;
  background: #f8edcf;
}
.payout-amount {
  color: var(--green);
  text-align: right;
}
@media (max-width: 700px) {
  .owner-hero {
    align-items: start;
    flex-direction: column;
  }
  .summary-grid {
    grid-template-columns: 1fr;
  }
  .trend-panel {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .chart {
    min-height: 220px;
  }
  .bars {
    gap: 8px;
  }
  .bar-track {
    width: min(100%, 34px);
  }
  .history-row {
    grid-template-columns: 1fr auto;
  }
  .payout-amount {
    grid-column: 2;
    grid-row: 1;
  }
  .payout-status {
    grid-column: 1 / -1;
    width: fit-content;
  }
}
@media (max-width: 520px) {
  .owner-hero,
  .earnings-content {
    padding-right: 5%;
    padding-left: 5%;
  }
}
</style>
