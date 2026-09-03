<template>
  <div class="about-page">
    <!-- Hero: asymmetric two-column -->
    <section class="hero">
      <h1 class="hero-heading">
        Need it? Rent it.
      </h1>
      <p class="hero-text">
        A trailer for one weekend, a gas tank for one job, a sound system
        for one event — none of it has to be bought when it could already
        be a few streets away. Rentosphere brings trailers, tools,
        appliances, machinery and event equipment onto one platform, so
        you don't have to search a different rental company for every
        different thing you need.
      </p>
    </section>

    <!-- Stats: asymmetric, one large + three small -->
    <section class="stats">
      <div class="stat-lead">
        <p class="stat-number">12K+</p>
        <p class="stat-label">items listed and counting</p>
      </div>
      <div class="stat-minor" v-for="s in stats" :key="s.label">
        <p class="stat-number-sm">{{ s.number }}</p>
        <p class="stat-label">{{ s.label }}</p>
      </div>
    </section>

    <!-- Story: pull-quote band -->
    <section class="story">
      <p class="quote-mark" aria-hidden="true">&ldquo;</p>
      <p class="quote">
        Most of what we own spends far more time in storage than in use.
        We started Rentosphere so those idle hours could be worth something
        — to the owner, to the renter, and to the one less thing that had
        to be made.
      </p>
    </section>

    <!-- Differentiators: what sets the platform apart -->
    <section class="differentiators">
      <h2 class="section-heading">What makes Rentosphere different</h2>
      <div class="diff-grid">
        <div class="diff-card" v-for="d in differentiators" :key="d.title">
          <h3>{{ d.title }}</h3>
          <p>{{ d.text }}</p>
        </div>
      </div>
    </section>

    <!-- How it works: three-step process (order matters, numbering earned) -->
    <section class="process">
      <h2 class="section-heading">How it works</h2>
      <ol class="process-list">
        <li v-for="(step, i) in processSteps" :key="step.title" class="process-step">
          <span class="step-number">{{ i + 1 }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </section>

    <!-- Values: what we hold owners and renters to -->
    <section class="values">
      <h2 class="section-heading">For renters and owners alike</h2>
      <div class="value-grid">
        <div class="value-card" v-for="v in values" :key="v.title">
          <h3>{{ v.title }}</h3>
          <p>{{ v.text }}</p>
        </div>
      </div>
    </section>

    <!-- CTA: mirrors the homepage owner panel -->
    <section class="cta-band">
      <div class="cta-content">
        <h2>Have something sitting idle?</h2>
        <p>
          List it in a few minutes and start earning when someone nearby
          needs it.
        </p>
        <div class="cta-actions">
          <RouterLink to="/list-item" class="cta-btn primary">
            Become an Owner
          </RouterLink>
          <RouterLink to="/browse" class="cta-btn secondary">
            Browse Products
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { number: '4,300+', label: 'active owners' },
  { number: '18', label: 'cities served' },
  { number: '4.8★', label: 'average rating' },
]

const differentiators = [
  {
    title: 'Everything in one place',
    text: 'Trailers, tools, appliances, machinery and event equipment, all searchable in one place — instead of a different rental company for every category.',
  },
  {
    title: 'Every product evaluated',
    text: "Before an item goes live, we check its condition, functionality and safety. That's especially important for equipment where poor condition can be a real risk.",
  },
  {
    title: 'Delivery, coordinated',
    text: "Not everyone can collect a trailer in person. Where it's offered, Rentosphere arranges delivery and collection so the rental fits your day, not the other way round.",
  },
]

const processSteps = [
  {
    title: 'Find what you need',
    text: 'Search by category or location and filter by dates — every listing is verified before it goes live.',
  },
  {
    title: 'Book with confidence',
    text: 'Pay securely through Rentosphere and message the owner directly to sort out pickup or delivery.',
  },
  {
    title: 'Return it, rate it',
    text: "Hand it back and we check it over for damage before the rental closes out. Then both sides leave a review, so trust builds with every booking.",
  },
]

const values = [
  {
    title: 'For renters',
    text: "Compare products by price, condition and availability, pay securely through the platform, and know what shows up is what you booked.",
  },
  {
    title: 'For owners',
    text: 'List something sitting unused, set your own availability, and get paid out once the rental is returned and checked over.',
  },
  {
    title: 'For everyone',
    text: "No cash handoffs, no chasing deposits. Every payment, message and booking stays on the platform, so there's a record if something needs sorting out.",
  },
]
</script>

<style scoped>
.about-page {
  color: #16221c;
}

.section-heading {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 32px;
}

/* ---------- Hero ---------- */
.hero {
  max-width: 720px;
  margin: 0 auto;
  padding: 96px 24px 64px;
  text-align: center;
}

.hero-heading {
  font-size: clamp(34px, 5vw, 52px);
  line-height: 1.12;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
}

.hero-text {
  font-size: 18px;
  line-height: 1.65;
  color: #414d47;
  margin: 0;
}

/* ---------- Stats ---------- */
.stats {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 24px 80px;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 24px;
  align-items: end;
}

.stat-lead .stat-number {
  font-size: 56px;
  font-weight: 700;
  color: #0f4c3a;
  line-height: 1;
  margin: 0 0 8px;
}

.stat-number-sm {
  font-size: 32px;
  font-weight: 700;
  color: #16221c;
  line-height: 1;
  margin: 0 0 8px;
}

.stat-label {
  font-size: 14px;
  color: #5b6660;
  margin: 0;
}

/* ---------- Story ---------- */
.story {
  background: #0f4c3a;
  color: #ffffff;
  padding: 88px 24px;
}

.quote-mark {
  max-width: 760px;
  margin: 0 auto;
  font-size: 64px;
  line-height: 1;
  color: #f5a623;
  font-weight: 700;
}

.quote {
  max-width: 760px;
  margin: -12px auto 0;
  font-size: 26px;
  line-height: 1.5;
  font-weight: 500;
  letter-spacing: -0.01em;
}

/* ---------- Differentiators ---------- */
.differentiators {
  max-width: 1040px;
  margin: 0 auto;
  padding: 96px 24px 0;
}

.diff-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.diff-card {
  border: 1.5px solid #e6e9e6;
  border-radius: 16px;
  padding: 28px;
}

.diff-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 10px;
}

.diff-card p {
  font-size: 15px;
  line-height: 1.6;
  color: #414d47;
  margin: 0;
}

/* ---------- Process ---------- */
.process {
  max-width: 780px;
  margin: 0 auto;
  padding: 96px 24px;
}

.process-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.process-step {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5a623;
  color: #16221c;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.process-step h3 {
  font-size: 19px;
  font-weight: 700;
  margin: 4px 0 8px;
}

.process-step p {
  font-size: 16px;
  line-height: 1.6;
  color: #414d47;
  margin: 0;
  max-width: 56ch;
}

/* ---------- Values ---------- */
.values {
  background: #f7f1e4;
  padding: 96px 24px;
}

.values .section-heading {
  max-width: 1040px;
  margin: 0 auto 32px;
}

.value-grid {
  max-width: 1040px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.value-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 10px;
}

.value-card p {
  font-size: 15px;
  line-height: 1.6;
  color: #414d47;
  margin: 0;
}

/* ---------- CTA band ---------- */
.cta-band {
  padding: 96px 24px;
  display: flex;
  justify-content: center;
}

.cta-content {
  background: #0f4c3a;
  color: #ffffff;
  border-radius: 24px;
  padding: 64px 48px;
  max-width: 640px;
  width: 100%;
  text-align: center;
}

.cta-content h2 {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 12px;
}

.cta-content p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.82);
  margin: 0 0 32px;
}

.cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.15s ease;
}

.cta-btn:hover {
  opacity: 0.9;
}

.cta-btn.primary {
  background: #f5a623;
  color: #16221c;
}

.cta-btn.secondary {
  background: transparent;
  color: #ffffff;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
}

/* ---------- Responsive ---------- */
@media (max-width: 860px) {
  .stats {
    grid-template-columns: 1fr 1fr;
    row-gap: 40px;
  }

  .value-grid,
  .diff-grid {
    grid-template-columns: 1fr;
  }

  .quote {
    font-size: 21px;
  }

  .cta-content {
    padding: 48px 28px;
  }
}
</style>