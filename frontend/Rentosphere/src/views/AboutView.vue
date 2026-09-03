<script setup>
const stats = [
  { label: 'Items listed', value: '2,400+' },
  { label: 'Cities covered', value: '18' },
  { label: 'Verified owners', value: '900+' },
]

const values = [
  {
    title: 'Verified & inspected',
    body: 'Every listing goes through a quality check before it goes live, so renters know exactly what they\'re getting.',
  },
  {
    title: 'Secure payments',
    body: 'Payments are held safely and only released once a rental is confirmed, protecting both sides of the deal.',
  },
  {
    title: 'Built for real life',
    body: 'From weekend DIY projects to full events, Rentosphere exists so people can borrow instead of buy.',
  },
]
</script>

<template>
  <section class="about-hero container">
    <h1>Renting made simple, <span class="accent">for everyone.</span></h1>
    <p class="lead">
      Rentosphere connects people who own tools, trailers, and equipment with people who
      need them for a day, a weekend, or a season — without the cost of owning it outright.
    </p>
  </section>

  <section class="about-stats container">
    <div v-for="stat in stats" :key="stat.label" class="stat-card">
      <span class="stat-value">{{ stat.value }}</span>
      <span class="stat-label">{{ stat.label }}</span>
    </div>
  </section>

  <section class="about-story container">
    <div class="story-text">
      <h2>Why we started Rentosphere</h2>
      <p>
        Most of what people own sits unused most of the time — a trailer parked in a driveway,
        a drill in a garage. We built Rentosphere so that equipment could earn its keep, and so
        that renting the right tool for the job is easier than buying one you'll use once.
      </p>
    </div>
  </section>

  <section class="about-values container">
    <h2>What we stand for</h2>
    <div class="values-grid">
      <div v-for="value in values" :key="value.title" class="value-card">
        <h3>{{ value.title }}</h3>
        <p>{{ value.body }}</p>
      </div>
    </div>
  </section>

  <section class="about-cta container">
    <div class="cta-box">
      <h2>Have something worth renting out?</h2>
      <p>List it in minutes and start earning when others rent it from you.</p>
      <router-link to="/signup" class="btn btn-primary">Become an Owner</router-link>
    </div>
  </section>
</template>

<style scoped>
.about-hero {
  padding: 72px 24px 40px;
  max-width: 720px;
}

.about-hero h1 {
  font-size: 2.6rem;
}

.accent {
  color: var(--color-primary);
}

.lead {
  margin-top: 18px;
  font-size: 1.05rem;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 24px;
  max-width: 720px;
}

.stat-card {
  background: var(--color-surface-alt);
  border-radius: var(--radius-md);
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-primary);
}

.stat-label {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  margin-top: 4px;
}

.about-story {
  padding: 40px 24px;
  max-width: 720px;
}

.about-story h2 {
  font-size: 1.6rem;
  margin-bottom: 14px;
}

.about-values {
  padding: 40px 24px;
}

.about-values h2 {
  font-size: 1.6rem;
  margin-bottom: 24px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.value-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 24px;
}

.value-card h3 {
  font-size: 1.05rem;
  margin-bottom: 10px;
}

.about-cta {
  padding: 24px 24px 80px;
}

.cta-box {
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-lg);
  padding: 48px;
  text-align: center;
}

.cta-box h2 {
  color: #fff;
  font-size: 1.6rem;
}

.cta-box p {
  color: rgba(255, 255, 255, 0.85);
  margin: 12px 0 22px;
}

.cta-box .btn-primary {
  background: var(--color-accent);
  color: #1a1a1a;
}

.cta-box .btn-primary:hover {
  background: var(--color-accent-dark);
}

@media (max-width: 760px) {
  .values-grid {
    grid-template-columns: 1fr;
  }
  .about-stats {
    grid-template-columns: 1fr;
  }
  .about-hero h1 {
    font-size: 2rem;
  }
}
</style>