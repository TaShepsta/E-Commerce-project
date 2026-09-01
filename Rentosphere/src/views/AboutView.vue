<template>
  <div class="about-page">
    <div class="sphere" aria-hidden="true"></div>

    <!-- Nav -->
    <header class="nav">
      <a href="/" class="brand">
        <span class="brand__mark"></span>
        Rentosphere
      </a>
      <a href="/login" class="nav__link">Log in</a>
    </header>

    <!-- Hero -->
    <section class="hero">
      <h1>Own less.<br />Access more.</h1>
      <p>
        Rentosphere connects people who own things with people who need
        them — for a weekend, a project, or a single afternoon.
      </p>
    </section>

    <!-- Content panel -->
    <div class="panel">
      <section class="story">
        <div class="story__label">Our story</div>
        <div class="story__content">
          <p>
            Most of what we own sits unused most of the time. A trailer
            that moves house once a year. A generator that runs for one
            storm. A pressure washer used twice a summer. Rentosphere
            started with a simple question: what if that idle equipment
            could pay for itself, and what if renting it were as easy as
            buying it?
          </p>
          <p>
            Today, Rentosphere is a marketplace where owners list what
            they have and renters book what they need — with every
            listing checked for safety and quality before it goes live,
            and every booking backed by secure payments and delivery
            support.
          </p>
        </div>
      </section>

      <section class="values">
        <article class="value-card">
          <h2>Trust, verified</h2>
          <p>
            Every item is inspected before listing, every owner is
            reviewed by renters, and every payment is held securely
            until the handover is confirmed.
          </p>
        </article>

        <article class="value-card">
          <h2>Community over inventory</h2>
          <p>
            We're not a warehouse. We're a network of neighbours,
            tradespeople, and small businesses lending each other what
            they already own.
          </p>
        </article>

        <article class="value-card">
          <h2>Less waste, more use</h2>
          <p>
            Every rental is one fewer item manufactured, shipped, and
            thrown away. Sharing what already exists is the quickest way
            to buy less.
          </p>
        </article>
      </section>

      <section class="stats">
        <div class="stat">
          <strong>12,400+</strong>
          <span>items listed</span>
        </div>
        <div class="stat">
          <strong>4.8/5</strong>
          <span>average rating</span>
        </div>
        <div class="stat">
          <strong>1,250+</strong>
          <span>reviews</span>
        </div>
        <div class="stat">
          <strong>18</strong>
          <span>cities served</span>
        </div>
      </section>

      <section class="cta">
        <h2>Have something worth sharing?</h2>
        <p>List it in minutes and start earning from what you already own.</p>
        <div class="cta__actions">
          <a href="/signup" class="cta__primary">Become an owner</a>
          <a href="/browse" class="cta__secondary">Browse rentals</a>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');

.about-page {
  --forest: #0f2820;
  --cream: #faf6ec;
  --ink: #16302a;
  --ink-soft: #6b7770;
  --on-dark: #d9e6df;
  --gold-1: #ffd68a;
  --gold-2: #eb9d3e;
  --line: #e7ddc8;

  position: relative;
  min-height: 100vh;
  background: var(--forest);
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  overflow: hidden;
}

.sphere {
  position: absolute;
  top: -20vw;
  right: -14vw;
  width: 52vw;
  height: 52vw;
  min-width: 420px;
  min-height: 420px;
  max-width: 680px;
  max-height: 680px;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 34%, var(--gold-1) 0%, var(--gold-2) 42%, rgba(235, 157, 62, 0.15) 68%, transparent 78%);
  filter: blur(2px);
  pointer-events: none;
}

/* ---------- Nav ---------- */
.nav {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
  padding: 2.25rem 2rem 0;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--cream);
  text-decoration: none;
}

.brand__mark {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--gold-2);
}

.nav__link {
  font-size: 0.88rem;
  color: var(--on-dark);
  text-decoration: none;
  border-bottom: 1px solid rgba(217, 230, 223, 0.35);
  padding-bottom: 2px;
}

.nav__link:hover {
  border-color: var(--gold-2);
  color: var(--gold-1);
}

/* ---------- Hero ---------- */
.hero {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  padding: 3.5rem 2rem 5rem;
}

.hero h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(2.6rem, 5.5vw, 3.8rem);
  line-height: 1.06;
  margin: 0 0 1.1rem;
  color: var(--cream);
}

.hero p {
  max-width: 46ch;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--on-dark);
  margin: 0;
}

/* ---------- Content panel ---------- */
.panel {
  position: relative;
  z-index: 2;
  background: var(--cream);
  border-radius: 28px 28px 0 0;
  padding-top: 0.5rem;
}

.story {
  max-width: 900px;
  margin: 0 auto;
  padding: 3.5rem 2rem 3rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: 2rem;
}

.story__label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--gold-2);
  padding-top: 0.2rem;
}

.story__content p {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ink);
  margin: 0 0 1.25rem;
  max-width: 62ch;
}

.story__content p:last-child {
  margin-bottom: 0;
}

/* ---------- Values ---------- */
.values {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem 2rem 3.5rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.value-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 1.6rem;
}

.value-card h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0 0 0.6rem;
  color: var(--ink);
}

.value-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--ink-soft);
  margin: 0;
}

/* ---------- Stats ---------- */
.stats {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stat strong {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.9rem;
  color: var(--ink);
}

.stat span {
  font-size: 0.82rem;
  color: var(--ink-soft);
}

/* ---------- CTA ---------- */
.cta {
  max-width: 900px;
  margin: 0 auto;
  padding: 3.5rem 2rem 5rem;
  text-align: center;
}

.cta h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.9rem;
  margin: 0 0 0.6rem;
  color: var(--ink);
}

.cta p {
  font-size: 1rem;
  color: var(--ink-soft);
  margin: 0 0 1.75rem;
}

.cta__actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta__primary {
  background: var(--ink);
  color: var(--cream);
  padding: 0.82rem 1.75rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.94rem;
}

.cta__primary:hover {
  background: #0e211c;
}

.cta__secondary {
  background: transparent;
  color: var(--ink);
  padding: 0.82rem 1.75rem;
  border-radius: 999px;
  border: 1.5px solid var(--line);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.94rem;
}

.cta__secondary:hover {
  border-color: var(--ink);
}

/* ---------- Responsive ---------- */
@media (max-width: 720px) {
  .sphere {
    top: -30vw;
    right: -28vw;
    width: 80vw;
    height: 80vw;
    min-width: 340px;
    min-height: 340px;
  }

  .nav {
    padding: 1.75rem 1.5rem 0;
  }

  .hero {
    padding: 2.5rem 1.5rem 3.5rem;
  }

  .story {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 2.75rem 1.5rem 2rem;
  }

  .values {
    grid-template-columns: 1fr;
    padding: 0.5rem 1.5rem 2.75rem;
  }

  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 2rem;
    padding: 2rem 1.5rem;
  }

  .cta {
    padding: 2.75rem 1.5rem 3.5rem;
  }
}
</style>