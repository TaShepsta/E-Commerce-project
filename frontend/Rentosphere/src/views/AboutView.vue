<template>
  <div class="about-page">
    <section class="hero">
      <h1>Idle stuff, put to work.</h1>
      <p>
        Rentosphere connects people who own tools, trailers and equipment with people who need
        them for a day, a weekend, or a season — no buying, no clutter, no waste.
      </p>
    </section>

    <section class="story">
      <div class="story-text">
        <h2>How it started</h2>
        <p>
          It began with a trailer that sat in a driveway for eleven months of the year. Our
          founder lent it to a neighbour, then a neighbour's neighbour, and realised half the
          street was quietly borrowing from each other already — just with no easy way to find
          what was available or trust who they were dealing with.
        </p>
        <p>
          Rentosphere started as a simple listing board for that one trailer. It's grown into a
          marketplace for anything worth sharing: power tools, event gear, appliances, and
          everything in between.
        </p>
      </div>

      <div class="story-art" aria-hidden="true">
        <svg viewBox="0 0 240 240">
          <circle cx="120" cy="120" r="118" class="art-ring" />
          <circle cx="168" cy="72" r="14" class="art-dot" />
          <path d="M60 150 L60 110 L100 110 L100 150 Z" class="art-shape" />
          <path d="M100 150 L100 95 L150 95 L150 150 Z" class="art-shape" />
          <line x1="45" y1="150" x2="185" y2="150" class="art-line" />
        </svg>
      </div>
    </section>

    <section class="stats-band">
      <div class="stat">
        <span class="stat-number">6,400+</span>
        <span class="stat-label">items listed</span>
      </div>
      <div class="stat">
        <span class="stat-number">3,100+</span>
        <span class="stat-label">active renters</span>
      </div>
      <div class="stat">
        <span class="stat-number">12</span>
        <span class="stat-label">cities covered</span>
      </div>
    </section>

    <section class="values">
      <h2>What we care about</h2>
      <div class="value-grid">
        <div class="value-card">
          <span class="check">✓</span>
          <h3>Trust, verified</h3>
          <p>Every listing is checked and every renter is identity-verified before a booking is confirmed.</p>
        </div>
        <div class="value-card">
          <span class="check">✓</span>
          <h3>Fair to owners</h3>
          <p>Owners set their own prices and keep the majority of every booking — we're clear about our cut, upfront.</p>
        </div>
        <div class="value-card">
          <span class="check">✓</span>
          <h3>Less waste</h3>
          <p>A drill used twice a year doesn't need to be bought twice a year. Sharing what already exists beats buying new.</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>Got something gathering dust?</h2>
      <p>List it in minutes and start earning when someone else needs it.</p>
      <div class="cta-actions">
        <router-link to="/list-item" class="btn-primary">Become an Owner</router-link>
        <router-link to="/browse" class="btn-outline">Browse Products</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap');

.about-page {
  --green: #12402f;
  --green-hover: #0d3025;
  --amber: #f2a91c;
  --cream: #fbf1e2;
  --cream-border: #efe3cc;
  --ink: #14181a;
  --text-muted: #5b6660;
  --border: #e3e5e1;
  --radius: 8px;

  font-family: 'Inter', sans-serif;
  color: var(--ink);
  background: #ffffff;
}

section {
  max-width: 1040px;
  margin: 0 auto;
  padding: 72px 32px;
}

h1,
h2,
h3 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  margin: 0;
}

/* ---------- hero ---------- */

.hero {
  text-align: center;
  padding-bottom: 56px;
}

.hero h1 {
  font-size: 2.6rem;
  line-height: 1.15;
  max-width: 720px;
  margin: 0 auto 18px;
}

.hero p {
  font-size: 1.05rem;
  color: var(--text-muted);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ---------- story ---------- */

.story {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
  padding-top: 0;
}

.story-text h2 {
  font-size: 1.8rem;
  margin-bottom: 18px;
}

.story-text p {
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0 0 16px;
  max-width: 480px;
}

.story-art {
  display: flex;
  justify-content: center;
}

.story-art svg {
  width: 220px;
  height: 220px;
}

.art-ring {
  fill: var(--cream);
  stroke: var(--cream-border);
  stroke-width: 2;
}

.art-dot {
  fill: var(--amber);
}

.art-shape {
  fill: none;
  stroke: var(--green);
  stroke-width: 4;
  stroke-linejoin: round;
}

.art-line {
  stroke: var(--ink);
  stroke-width: 3;
  stroke-linecap: round;
}

/* ---------- stats band ---------- */

.stats-band {
  background: var(--cream);
  border-top: 1px solid var(--cream-border);
  border-bottom: 1px solid var(--cream-border);
  display: flex;
  justify-content: center;
  gap: 80px;
  padding: 48px 32px;
  max-width: none;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 2.1rem;
  color: var(--green);
}

.stat-label {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 4px;
}

/* ---------- values ---------- */

.values h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 40px;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.value-card {
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px 24px;
}

.value-card .check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--green);
  color: #ffffff;
  font-size: 0.85rem;
  margin-bottom: 16px;
}

.value-card h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.value-card p {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.55;
  margin: 0;
}

/* ---------- cta ---------- */

.cta {
  text-align: center;
}

.cta h2 {
  font-size: 1.9rem;
  margin-bottom: 12px;
}

.cta p {
  color: var(--text-muted);
  margin: 0 0 28px;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
}

.btn-primary,
.btn-outline {
  display: inline-block;
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: var(--radius);
  text-decoration: none;
}

.btn-primary {
  background: var(--green);
  color: #ffffff;
  border: 1px solid var(--green);
}

.btn-primary:hover {
  background: var(--green-hover);
}

.btn-outline {
  background: #ffffff;
  color: var(--ink);
  border: 1px solid var(--ink);
}

.btn-outline:hover {
  background: var(--ink);
  color: #ffffff;
}

/* ---------- responsive ---------- */

@media (max-width: 780px) {
  section {
    padding: 48px 24px;
  }

  .story {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .story-art {
    order: -1;
  }

  .story-art svg {
    width: 160px;
    height: 160px;
  }

  .stats-band {
    gap: 40px;
    flex-wrap: wrap;
  }

  .value-grid {
    grid-template-columns: 1fr;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>