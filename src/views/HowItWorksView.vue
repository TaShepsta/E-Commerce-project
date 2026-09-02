<template>
  <div class="how-page">
    <!-- HERO -->
    <section class="how-hero">
      <div class="how-hero-content">
        <p class="eyebrow">HOW IT WORKS</p>

        <h1>
          Renting made
          <span>simple.</span>
        </h1>

        <p>
          From finding the right item to returning it after your rental,
          Rentosphere makes the entire process straightforward.
        </p>

        <div class="hero-actions">
          <RouterLink to="/browse" class="primary-button">
            Find Something to Rent
          </RouterLink>

          <a href="#steps" class="text-button"> See how it works ↓ </a>
        </div>
      </div>

      <div class="hero-visual">
        <div
          class="journey-pattern"
          aria-label="Rental journey from search to return"
        >
          <span class="pattern-line"></span>
          <div class="journey-hub">
            <strong>RENT</strong><span>osphere</span
            ><small>Repeat with ease</small>
          </div>
          <div class="journey-node node-search">
            <span>01</span><strong>Search</strong><small>Find an item</small>
          </div>
          <div class="journey-node node-book">
            <span>02</span><strong>Book</strong><small>Choose your dates</small>
          </div>
          <div class="journey-node node-enjoy">
            <span>03</span><strong>Enjoy</strong><small>Make it yours</small>
          </div>
          <div class="journey-node node-return">
            <span>04</span><strong>Return</strong><small>Close the loop</small>
          </div>
        </div>
      </div>
    </section>

    <!-- STEPS -->
    <section id="steps" class="steps-section">
      <div class="steps-heading">
        <p class="eyebrow">THE RENTAL JOURNEY</p>

        <h2>
          Seven simple steps from
          <span>search to settle.</span>
        </h2>

        <p>
          We've made renting straightforward so you can spend less time worrying
          about the process and more time enjoying what you've rented.
        </p>
      </div>

      <div class="steps-list">
        <!-- STEP 1 -->
        <div class="step">
          <div class="step-number">01</div>

          <div class="step-icon">⌕</div>

          <div class="step-content">
            <h3>Search</h3>
            <p>
              Find the product you need by browsing our available rental items
              and categories.
            </p>
          </div>
        </div>

        <!-- STEP 2 -->
        <div class="step">
          <div class="step-number">02</div>

          <div class="step-icon">▣</div>

          <div class="step-content">
            <h3>Choose your dates</h3>
            <p>
              Select when you need the item and check its availability before
              making your booking.
            </p>
          </div>
        </div>

        <!-- STEP 3 -->
        <div class="step">
          <div class="step-number">03</div>

          <div class="step-icon">R</div>

          <div class="step-content">
            <h3>Book & Pay</h3>
            <p>
              Confirm your rental and make a secure payment through the
              platform.
            </p>
          </div>
        </div>

        <!-- STEP 4 -->
        <div class="step">
          <div class="step-number">04</div>

          <div class="step-icon">→</div>

          <div class="step-content">
            <h3>We Deliver</h3>
            <p>
              Depending on the listing, arrange delivery or collection with the
              owner.
            </p>
          </div>
        </div>

        <!-- STEP 5 -->
        <div class="step">
          <div class="step-number">05</div>

          <div class="step-icon">✓</div>

          <div class="step-content">
            <h3>Use & Enjoy</h3>
            <p>
              Use the product during your agreed rental period and get the most
              out of your booking.
            </p>
          </div>
        </div>

        <!-- STEP 6 -->
        <div class="step">
          <div class="step-number">06</div>

          <div class="step-icon">↩</div>

          <div class="step-content">
            <h3>Return</h3>
            <p>
              Return the item on time and in the condition agreed upon with the
              owner.
            </p>
          </div>
        </div>

        <!-- STEP 7 -->
        <div class="step">
          <div class="step-number">07</div>

          <div class="step-icon">✓</div>

          <div class="step-content">
            <h3>We Settle</h3>
            <p>
              Once the rental is completed, the payment is settled with the
              product owner.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST SECTION -->
    <section class="trust-section">
      <div class="trust-text">
        <p class="eyebrow">BUILT AROUND TRUST</p>

        <h2>
          Renting should feel
          <span>safe and simple.</span>
        </h2>

        <p>
          Rentosphere connects renters and owners while keeping the rental
          process organised, transparent and convenient.
        </p>
      </div>

      <div class="trust-grid">
        <div class="trust-card">
          <div class="trust-icon">✓</div>
          <h3>Verified listings</h3>
          <p>
            Listings can be evaluated to help maintain quality and safety
            standards.
          </p>
        </div>

        <div class="trust-card">
          <div class="trust-icon">□</div>
          <h3>Secure payments</h3>
          <p>Keep payments organised through the rental platform.</p>
        </div>

        <div class="trust-card">
          <div class="trust-icon">→</div>
          <h3>Delivery options</h3>
          <p>Selected rentals can be delivered directly to the renter.</p>
        </div>

        <div class="trust-card">
          <div class="trust-icon">?</div>
          <h3>Support</h3>
          <p>Get help when you need it throughout your rental journey.</p>
        </div>
      </div>
    </section>

    <!-- OWNER CTA -->
    <section class="owner-section">
      <div>
        <p class="eyebrow">HAVE SOMETHING TO RENT?</p>

        <h2>
          Turn your unused items
          <span>into extra income.</span>
        </h2>

        <p>
          Become a Rentosphere owner and let others make use of the things you
          already own.
        </p>
      </div>

      <RouterLink to="/become-owner" class="owner-button">
        Become an Owner
      </RouterLink>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
.how-page {
  min-height: 100vh;
  background: #f7f3ea;
  color: #111827;
}

/* ---------------- HERO ---------------- */

.how-hero {
  min-height: 560px;
  padding: 90px 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  background: linear-gradient(
    120deg,
    #f7f3ea 0%,
    #f7f3ea 65%,
    #e9a11a 65%,
    #e9a11a 100%
  );
}

.how-hero-content {
  max-width: 620px;
}

.eyebrow {
  margin: 0 0 15px;
  color: #e99b13;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.how-hero h1 {
  margin: 0;
  font-size: clamp(3.2rem, 7vw, 6rem);
  line-height: 0.92;
  letter-spacing: -4px;
}

.how-hero h1 span {
  color: #e99b13;
}

.how-hero-content > p:not(.eyebrow) {
  max-width: 540px;
  margin: 30px 0;
  color: #555b64;
  font-size: 1.05rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 25px;
}

.primary-button {
  padding: 15px 25px;
  border-radius: 9px;
  background: #0b3b32;
  color: white;
  text-decoration: none;
  font-weight: 700;
}

.text-button {
  color: #172033;
  text-decoration: none;
  font-weight: 700;
}

/* HERO VISUAL */

.hero-visual {
  width: 390px;
  height: 390px;
  position: relative;
  flex-shrink: 0;
}

.journey-pattern {
  position: relative;
  width: 390px;
  height: 390px;
  padding: 20px;
  border: 1px solid rgba(23, 32, 51, 0.15);
  border-radius: 50%;
  background: rgba(248, 245, 238, 0.72);
  box-shadow: 0 24px 50px rgba(23, 32, 51, 0.12);
}
.journey-pattern::before,
.journey-pattern::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(233, 155, 19, 0.35);
}
.journey-pattern::before {
  inset: 28px;
}
.journey-pattern::after {
  inset: 58px;
  border-color: rgba(11, 59, 50, 0.18);
}
.pattern-line {
  position: absolute;
  inset: 89px;
  border: 2px dashed rgba(233, 155, 19, 0.7);
  border-radius: 50%;
}
.journey-hub {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: 118px;
  height: 118px;
  display: grid;
  place-content: center;
  transform: translate(-50%, -50%);
  border: 8px solid #f7f3ea;
  border-radius: 50%;
  text-align: center;
  background: #0b3b32;
  color: white;
  box-shadow: 0 10px 25px rgba(23, 32, 51, 0.18);
}
.journey-hub strong {
  color: #f2b33d;
  font-size: 1.2rem;
  letter-spacing: 0.08em;
}
.journey-hub span {
  font-size: 0.9rem;
}
.journey-hub small {
  margin-top: 7px;
  color: #d2ddd8;
  font-size: 0.58rem;
}
.journey-node {
  position: absolute;
  z-index: 1;
  width: 126px;
  padding: 12px;
  border: 1px solid #dedbd3;
  border-radius: 10px;
  background: white;
  box-shadow: 0 10px 22px rgba(23, 32, 51, 0.1);
}
.journey-node span,
.journey-node strong,
.journey-node small {
  display: block;
}
.journey-node span {
  margin-bottom: 9px;
  color: #e99b13;
  font-size: 0.7rem;
  font-weight: 900;
}
.journey-node strong {
  color: #0b3b32;
  font-size: 1rem;
}
.journey-node small {
  margin-top: 3px;
  color: #737984;
  font-size: 0.68rem;
}
.node-search {
  top: 29px;
  left: 50%;
  transform: translateX(-50%);
}
.node-book {
  top: 50%;
  right: 18px;
  transform: translateY(-50%);
}
.node-enjoy {
  bottom: 29px;
  left: 50%;
  transform: translateX(-50%);
}
.node-return {
  top: 50%;
  left: 18px;
  transform: translateY(-50%);
}

/* ---------------- STEPS ---------------- */

.steps-section {
  padding: 100px 7%;
  background: white;
}

.steps-heading {
  max-width: 720px;
  margin-bottom: 70px;
}

.steps-heading h2 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 0.98;
}

.steps-heading h2 span {
  color: #e99b13;
}

.steps-heading > p:not(.eyebrow) {
  margin-top: 25px;
  color: #6b7280;
  line-height: 1.7;
}

/* STEP LIST */

.steps-list {
  max-width: 1000px;
  margin: auto;
  position: relative;
}

.steps-list::before {
  content: "";
  position: absolute;
  left: 35px;
  top: 35px;
  bottom: 35px;
  width: 1px;
  background: #dcd7cc;
}

.step {
  min-height: 120px;
  position: relative;
  display: grid;
  grid-template-columns: 70px 80px 1fr;
  align-items: center;
  gap: 25px;
  padding: 20px 0;
}

.step-number {
  width: 70px;
  height: 70px;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e9a11a;
  color: #172033;
  font-size: 1.1rem;
  font-weight: 900;
}

.step-icon {
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dedbd3;
  border-radius: 50%;
  background: #f7f3ea;
  color: #0b3b32;
  font-size: 1.4rem;
  font-weight: 800;
}

.step-content h3 {
  margin: 0 0 8px;
  font-size: 1.3rem;
}

.step-content p {
  max-width: 600px;
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

/* ---------------- TRUST ---------------- */

.trust-section {
  padding: 100px 7%;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 80px;
  background: #0b3b32;
  color: white;
}

.trust-text h2 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 0.95;
}

.trust-text h2 span {
  display: block;
  color: #f2b33d;
}

.trust-text > p:not(.eyebrow) {
  max-width: 500px;
  margin-top: 25px;
  color: #d2ddd8;
  line-height: 1.7;
}

.trust-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.trust-card {
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
}

.trust-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  border-radius: 50%;
  background: #e9a11a;
  color: #172033;
  font-weight: 900;
}

.trust-card h3 {
  margin: 0 0 10px;
}

.trust-card p {
  margin: 0;
  color: #c9d5d1;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* ---------------- OWNER CTA ---------------- */

.owner-section {
  padding: 75px 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  background: #f2ede2;
}

.owner-section h2 {
  max-width: 750px;
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 0.95;
}

.owner-section h2 span {
  color: #e99b13;
}

.owner-section p:not(.eyebrow) {
  margin-top: 18px;
  color: #6b7280;
}

.owner-button {
  padding: 16px 27px;
  border-radius: 9px;
  background: #172033;
  color: white;
  text-decoration: none;
  font-weight: 700;
  white-space: nowrap;
}

.owner-button:hover {
  background: #0b3b32;
}

/* ---------------- RESPONSIVE ---------------- */

@media (max-width: 950px) {
  .how-hero {
    padding: 70px 5%;
    background: #f7f3ea;
  }

  .hero-visual {
    width: 300px;
    height: 300px;
  }

  .journey-pattern {
    width: 300px;
    height: 300px;
  }

  .steps-section,
  .trust-section {
    padding: 70px 5%;
  }

  .trust-section {
    gap: 50px;
  }
}

@media (max-width: 700px) {
  .how-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-visual {
    width: 100%;
    height: 300px;
  }
  .journey-pattern {
    margin: 0 auto;
  }

  .step {
    grid-template-columns: 55px 1fr;
    gap: 20px;
  }

  .step-number {
    width: 55px;
    height: 55px;
  }

  .step-icon {
    display: none;
  }

  .steps-list::before {
    left: 27px;
  }

  .trust-section {
    grid-template-columns: 1fr;
  }

  .trust-grid {
    grid-template-columns: 1fr;
  }

  .owner-section {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
