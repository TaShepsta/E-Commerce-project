<script setup></script>

<template>
  <div class="about-page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-copy">
        <p class="kicker">A note from the founders</p>
        <h1>
          Own less.
          <span class="highlight">Access more.</span>
        </h1>
        <p class="hero-lede">
          Rentosphere started with a simple, slightly annoying question:
          why does everyone on the same street own their own drill,
          their own gazebo, their own trailer — used twice a year, gathering
          dust the rest of the time?
        </p>
        <div class="hero-actions">
          <RouterLink to="/browse" class="btn-ink">Browse Rentals</RouterLink>
          <RouterLink to="/become-owner" class="btn-link">
            Become an Owner
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 5h13.5M9.5 1l4.5 4-4.5 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>
      </div>

      <div class="hero-art">
        <div class="polaroid polaroid-main">
          <img src="/products/outdoor/tent.jpg" alt="Tent available to rent" />
          <span class="polaroid-caption">exhibit A: a tent, unused 51 weeks a year</span>
        </div>
        <div class="tape tape-1"></div>
        <svg class="scribble-arrow" width="120" height="90" viewBox="0 0 120 90" fill="none">
          <path d="M4 8C40 4 70 30 55 55C45 72 20 66 28 48" stroke="#0b3b32" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <path d="M20 44L26 50L34 42" stroke="#0b3b32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
        <div class="stamp">
          <span>est.</span>
          <strong>2022</strong>
        </div>
      </div>
    </section>

    <!-- TICKET STATS -->
    <section class="ticket-strip">
      <div class="ticket">
        <div class="ticket-value">7+</div>
        <div class="ticket-label">categories<br />of gear</div>
      </div>
      <div class="perf"></div>
      <div class="ticket">
        <div class="ticket-value">1000s</div>
        <div class="ticket-label">items listed<br />by real owners</div>
      </div>
      <div class="perf"></div>
      <div class="ticket">
        <div class="ticket-value">R0</div>
        <div class="ticket-label">clutter left<br />in the garage</div>
      </div>
    </section>

    <!-- SCRAPBOOK MISSION -->
    <section class="scrapbook">
      <div class="scrapbook-text">
        <p class="kicker light">the mission</p>
        <h2>
          If it's just sitting there,<br />
          <span class="highlight-light">someone else needs it.</span>
        </h2>
        <p>
          Every unused trailer, tent and sound system is a small waste
          hiding in plain sight. We built Rentosphere so owners can turn
          that idle gear into income, and renters can get exactly what
          they need for the weekend — without buying a single thing they'll
          use once.
        </p>
      </div>

      <div class="scrapbook-photos">
        <div class="poly poly-1">
          <img src="/products/birthdays/braai-barbeque.jpg" alt="Braai set up for a birthday party" />
        </div>
        <div class="poly poly-2">
          <img src="/products/outdoor/camping-chairs.jpg" alt="Camping table and chairs" />
        </div>
        <div class="poly poly-3">
          <img src="/products/outdoor/cooler.jpg" alt="Cooler box available to rent" />
        </div>
        <div class="tape tape-2"></div>
        <div class="tape tape-3"></div>
      </div>
    </section>

    <!-- WINDING TIMELINE -->
    <section class="journey">
      <p class="kicker">the journey so far</p>
      <h2>From one garage to a whole sphere.</h2>

      <div class="journey-path">
        <svg class="path-line" viewBox="0 0 900 760" preserveAspectRatio="none">
          <path d="M20 25 C 260 25, 280 190, 340 215 S 30 400, 90 435 S 760 590, 855 645"
                stroke="#dcd7cc" stroke-width="2" fill="none" stroke-dasharray="2 10" stroke-linecap="round"/>
        </svg>

        <div class="stop stop-1">
          <span class="stop-year">2022</span>
          <h3>The idea</h3>
          <p>A shared spreadsheet between three neighbours, tracking who had what.</p>
        </div>
        <div class="stop stop-2">
          <span class="stop-year">2023</span>
          <h3>Going live</h3>
          <p>Moving, DIY and outdoor gear — the first categories on the platform.</p>
        </div>
        <div class="stop stop-3">
          <span class="stop-year">2024</span>
          <h3>The sphere grows</h3>
          <p>Weddings, birthdays and graduations join, as demand for events took off.</p>
        </div>
        <div class="stop stop-4">
          <span class="stop-year">Today</span>
          <h3>Built on trust</h3>
          <p>Thousands of items, secure payments, and owners who keep coming back.</p>
        </div>
      </div>
    </section>

    <!-- VALUES: STAMPS -->
    <section class="stamps-section">
      <p class="kicker">what we stand for</p>
      <div class="stamps-row">
        <div class="value-stamp rotate-1">
          <h3>Trust</h3>
          <p>Verified listings, secure payments, every time.</p>
        </div>
        <div class="value-stamp rotate-2">
          <h3>Simplicity</h3>
          <p>Search, book, settle up. No friction.</p>
        </div>
        <div class="value-stamp rotate-3">
          <h3>Less waste</h3>
          <p>Share more, buy less, landfill nothing.</p>
        </div>
        <div class="value-stamp rotate-4">
          <h3>Community</h3>
          <p>Real income for real owners nearby.</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="cta-inner">
        <h2>
          Got something to rent out?
          <span class="highlight">Or something to rent?</span>
        </h2>
        <div class="hero-actions center">
          <RouterLink to="/browse" class="btn-ink">Start Browsing</RouterLink>
          <RouterLink to="/become-owner" class="btn-outline">Become an Owner</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&display=swap");

.about-page {
  background: #f7f3ea;
  color: #172033;
  overflow-x: hidden;
}

.kicker {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: 1.05rem;
  color: #e99b13;
  margin: 0 0 18px;
}

.kicker.light {
  color: #f2b33d;
}

h1,
h2,
h3 {
  font-family: "Fraunces", serif;
  font-weight: 600;
  margin: 0;
  color: #0b3b32;
}

.highlight {
  background: linear-gradient(transparent 62%, #f2c869 62%);
}

.highlight-light {
  background: linear-gradient(transparent 62%, rgba(242, 179, 61, 0.55) 62%);
}

/* ---------------- HERO ---------------- */

.hero {
  padding: 110px 7% 90px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 40px;
  align-items: center;
}

.hero-copy h1 {
  font-size: clamp(2.6rem, 5.2vw, 4.4rem);
  line-height: 1.08;
  letter-spacing: -1px;
}

.hero-lede {
  max-width: 460px;
  margin: 28px 0 0;
  color: #555b64;
  font-size: 1.08rem;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-top: 38px;
  flex-wrap: wrap;
}

.hero-actions.center {
  justify-content: center;
}

.btn-ink {
  padding: 15px 26px;
  border-radius: 3px;
  background: #172033;
  color: #f7f3ea;
  text-decoration: none;
  font-weight: 700;
}

.btn-outline {
  padding: 15px 26px;
  border-radius: 3px;
  border: 1.5px solid #f7f3ea;
  color: #f7f3ea;
  text-decoration: none;
  font-weight: 700;
}

.btn-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #172033;
  text-decoration: none;
  font-weight: 700;
  border-bottom: 2px solid #e9a11a;
  padding-bottom: 2px;
}

.hero-art {
  position: relative;
  height: 420px;
}

.polaroid {
  background: white;
  padding: 14px 14px 44px;
  box-shadow: 0 24px 45px rgba(23, 32, 51, 0.2);
}

.polaroid-main {
  width: 300px;
  position: absolute;
  top: 10px;
  left: 60px;
  transform: rotate(-4deg);
}

.polaroid-main img {
  width: 100%;
  height: 260px;
  object-fit: contain;
  background: #f2ede2;
  display: block;
}

.polaroid-caption {
  position: absolute;
  bottom: 14px;
  left: 14px;
  right: 14px;
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: 0.82rem;
  color: #555b64;
}

.tape {
  position: absolute;
  width: 70px;
  height: 26px;
  background: rgba(242, 179, 61, 0.55);
  box-shadow: 0 4px 8px rgba(23, 32, 51, 0.08);
}

.tape-1 {
  top: -6px;
  left: 175px;
  transform: rotate(8deg);
  z-index: 2;
}

.scribble-arrow {
  position: absolute;
  top: 100px;
  right: 40px;
}

.stamp {
  position: absolute;
  bottom: 20px;
  right: 30px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 2px dashed #0b3b32;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotate(10deg);
  color: #0b3b32;
}

.stamp span {
  font-size: 0.7rem;
  letter-spacing: 1px;
}

.stamp strong {
  font-family: "Fraunces", serif;
  font-size: 1.3rem;
}

/* ---------------- TICKET STRIP ---------------- */

.ticket-strip {
  margin: 0 7% 90px;
  background: white;
  border: 1px dashed #cfc9bb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34px 20px;
}

.ticket {
  flex: 1;
  text-align: center;
}

.ticket-value {
  font-family: "Fraunces", serif;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: #e99b13;
}

.ticket-label {
  margin-top: 8px;
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.4;
}

.perf {
  width: 0;
  height: 60px;
  border-left: 2px dashed #dcd7cc;
}

/* ---------------- SCRAPBOOK ---------------- */

.scrapbook {
  background: #0b3b32;
  color: #f7f3ea;
  padding: 100px 7%;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 70px;
  align-items: center;
}

.scrapbook h2 {
  color: #f7f3ea;
  font-size: clamp(2.1rem, 4vw, 3.1rem);
  line-height: 1.2;
}

.scrapbook-text p:not(.kicker) {
  margin-top: 24px;
  color: #cfe0da;
  line-height: 1.75;
  max-width: 460px;
}

.scrapbook-photos {
  position: relative;
  height: 380px;
}

.poly {
  position: absolute;
  background: white;
  padding: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
}

.poly img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.poly-1 {
  width: 240px;
  height: 200px;
  top: 0;
  left: 20px;
  transform: rotate(-6deg);
  z-index: 2;
}

.poly-2 {
  width: 190px;
  height: 150px;
  bottom: 10px;
  left: 0;
  transform: rotate(5deg);
  z-index: 1;
  background: #f2ede2;
}

.poly-3 {
  width: 190px;
  height: 240px;
  top: 30px;
  right: 10px;
  transform: rotate(4deg);
  z-index: 1;
  background: #f2ede2;
}

.tape-2 {
  top: -10px;
  left: 100px;
  transform: rotate(-8deg);
  z-index: 3;
}

.tape-3 {
  bottom: 130px;
  right: 60px;
  transform: rotate(12deg);
  z-index: 3;
}

/* ---------------- JOURNEY ---------------- */

.journey {
  padding: 110px 7% 100px;
  text-align: center;
}

.journey h2 {
  font-size: clamp(2.1rem, 4vw, 3.2rem);
  margin: 10px 0 70px;
}

.journey-path {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  height: 760px;
}

.path-line {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.stop {
  position: absolute;
  width: 260px;
  text-align: left;
}

.stop-year {
  display: inline-block;
  font-family: "Fraunces", serif;
  font-style: italic;
  color: #e99b13;
  margin-bottom: 6px;
}

.stop h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.stop p {
  margin: 0;
  color: #6b7280;
  font-size: 0.88rem;
  line-height: 1.6;
}

.stop-1 {
  top: 0;
  left: 0;
}

.stop-2 {
  top: 210px;
  left: 300px;
}

.stop-3 {
  top: 420px;
  left: 30px;
}

.stop-4 {
  top: 630px;
  right: 0;
  left: auto;
  text-align: right;
}

/* ---------------- STAMPS ---------------- */

.stamps-section {
  padding: 60px 7% 120px;
  text-align: center;
}

.stamps-row {
  display: flex;
  justify-content: center;
  gap: 34px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.value-stamp {
  width: 200px;
  padding: 26px 20px;
  background: white;
  border: 2px dashed #cfc9bb;
  text-align: left;
}

.value-stamp h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.value-stamp p {
  margin: 0;
  color: #6b7280;
  font-size: 0.86rem;
  line-height: 1.55;
}

.rotate-1 {
  transform: rotate(-3deg);
}
.rotate-2 {
  transform: rotate(2deg);
}
.rotate-3 {
  transform: rotate(-2deg);
}
.rotate-4 {
  transform: rotate(3deg);
}

/* ---------------- CTA ---------------- */

.cta {
  background: #172033;
  padding: 110px 7%;
}

.cta-inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.cta h2 {
  color: #f7f3ea;
  font-size: clamp(2.2rem, 4.4vw, 3.4rem);
  line-height: 1.25;
}

.cta .highlight {
  display: block;
  background: none;
  color: #e9a11a;
}

/* ---------------- RESPONSIVE ---------------- */

@media (max-width: 1000px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-art {
    height: 340px;
  }

  .polaroid-main {
    left: 20px;
  }

  .scrapbook {
    grid-template-columns: 1fr;
  }

  .journey-path {
    height: auto;
  }

  .path-line {
    display: none;
  }

  .stop {
    position: static;
    width: 100%;
    max-width: 420px;
    margin: 0 auto 40px;
    text-align: left !important;
  }
}

@media (max-width: 600px) {
  .ticket-strip {
    flex-direction: column;
    gap: 24px;
  }

  .perf {
    width: 60px;
    height: 0;
    border-left: none;
    border-top: 2px dashed #dcd7cc;
  }

  .scrapbook-photos {
    height: 300px;
  }

  .poly-1 {
    width: 180px;
    height: 150px;
  }

  .poly-2 {
    width: 140px;
    height: 110px;
  }

  .poly-3 {
    width: 140px;
    height: 180px;
  }

  .stamps-row {
    gap: 20px;
  }

  .value-stamp {
    width: 44%;
  }
}
</style>