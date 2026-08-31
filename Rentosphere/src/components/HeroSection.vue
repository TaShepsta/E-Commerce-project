<template>
  <section class="hero">

    <div class="hero-container">

      <!-- LEFT SIDE -->
      <div class="hero-content">

        <h1>
          <span>Rent</span> what you need. <span>Earn</span> from what you own.
        </h1>

        <p class="hero-description">
          Rent anything you need, from trailers to tools,
          appliances to event equipment.
        </p>

        <!-- Buttons -->
        <div class="hero-buttons">

          <RouterLink to="/browse" class="btn btn-primary">
            Browse Products
          </RouterLink>

          <RouterLink to="/become-owner" class="btn btn-secondary">
            List Your Item
          </RouterLink>

        </div>

        <!-- Trust features -->
        <div class="trust-features">

          <div class="trust-item">
            <div class="trust-icon">✓</div>
            <span>Verified & Inspected</span>
          </div>

          <div class="trust-item">
            <div class="trust-icon">🔒</div>
            <span>Secure Payments</span>
          </div>

          <div class="trust-item">
            <div class="trust-icon">🚚</div>
            <span>Delivery Available</span>
          </div>

        </div>

      </div>


      <!-- RIGHT SIDE -->
      <div class="hero-visual">

        <!-- Product image area -->
        <div class="product-image">
          <img src="@/assets/hero-section-bg.jpeg" alt="Rental products including trailer, refrigerator, tent, and equipment" />
        </div>


        <!-- Owner card -->
        <div class="owner-card">

          <h2>
            Earn from what
            you already own.
          </h2>

          <p>
            List your items and start earning
            extra income when others rent them.
          </p>

          <ul>
            <li>
              <span>✓</span>
              Easy listing process
            </li>

            <li>
              <span>✓</span>
              We do the evaluation
            </li>

            <li>
              <span>✓</span>
              Get paid securely
            </li>
          </ul>

          <RouterLink
            to="/become-owner"
            class="owner-button"
          >
            Become an Owner
          </RouterLink>

        </div>

      </div>

    </div>

  </section>
</template>


<style scoped>

/* =========================
   HERO
========================= */

.hero {
  width: 100%;
  background: #ffffff;
}

.hero-container {
  max-width: 1450px;
  min-height: 610px;

  margin: 0 auto;
  padding: 55px 50px;

  display: grid;
  grid-template-columns: 1fr 1.15fr;

  gap: 45px;
  align-items: center;
}


/* =========================
   HERO CONTENT
========================= */

.hero-content {
  padding-left: 10px;
}

.hero-content h1 {
  margin: 0;

  max-width: 650px;

  font-size: clamp(48px, 5vw, 76px);
  line-height: 0.98;

  font-weight: 800;
  letter-spacing: -3px;

  color: #101010;
}

.hero-content h1 span {
  color: #063b2f;
}


.hero-description {
  max-width: 540px;

  margin: 28px 0 30px;

  font-size: 18px;
  line-height: 1.6;

  color: #333333;
}


/* =========================
   BUTTONS
========================= */

.hero-buttons {
  display: flex;
  gap: 16px;

  margin-bottom: 38px;
}

.btn {
  min-width: 165px;

  padding: 15px 24px;

  border-radius: 8px;

  font-size: 15px;
  font-weight: 600;

  text-align: center;
  text-decoration: none;

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: #063b2f;
  color: #ffffff;
}

.btn-primary:hover {
  background: #052e25;
}

.btn-secondary {
  background: #ffffff;

  color: #111111;

  border: 1px solid #222222;
}

.btn-secondary:hover {
  background: #f5f5f5;
}


/* =========================
   TRUST FEATURES
========================= */

.trust-features {
  display: flex;
  flex-wrap: wrap;

  gap: 28px;
}

.trust-item {
  display: flex;
  align-items: center;

  gap: 9px;

  font-size: 13px;
  font-weight: 500;

  color: #222222;
}

.trust-icon {
  width: 25px;
  height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #063b2f;

  font-size: 15px;
}


/* =========================
   HERO VISUAL
========================= */

.hero-visual {
  min-height: 500px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
}


/* Product area */

.product-image {
  width: 72%;
  height: 430px;

  border-radius: 24px;

  overflow: hidden;

  background: #f4f1e8;

  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}


/* =========================
   OWNER CARD
========================= */

.owner-card {
  width: 280px;

  padding: 28px;

  position: absolute;

  right: 0;
  top: 50%;

  transform: translateY(-50%);

  background: #f5f0e7;

  border-radius: 18px;

  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
}

.owner-card h2 {
  margin: 0 0 14px;

  font-size: 24px;
  line-height: 1.15;

  color: #111111;
}

.owner-card p {
  margin: 0 0 20px;

  font-size: 14px;
  line-height: 1.6;

  color: #333333;
}

.owner-card ul {
  padding: 0;
  margin: 0 0 24px;

  list-style: none;
}

.owner-card li {
  display: flex;
  align-items: center;

  gap: 10px;

  margin-bottom: 12px;

  font-size: 13px;
}

.owner-card li span {
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #2f7d45;
  color: white;

  font-size: 11px;
}

.owner-button {
  display: block;

  padding: 13px 15px;

  border-radius: 8px;

  background: #063b2f;
  color: white;

  text-align: center;
  text-decoration: none;

  font-size: 14px;
  font-weight: 600;
}

.owner-button:hover {
  background: #052e25;
}


/* =========================
   TABLET
========================= */

@media (max-width: 1100px) {

  .hero-container {
    grid-template-columns: 1fr;

    padding: 50px 35px;
  }

  .hero-content {
    text-align: center;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons,
  .trust-features {
    justify-content: center;
  }

  .hero-visual {
    min-height: 500px;
  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 650px) {

  .hero-container {
    padding: 35px 20px;
  }

  .hero-content h1 {
    font-size: 48px;
    letter-spacing: -2px;
  }

  .hero-description {
    font-size: 16px;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    box-sizing: border-box;
  }

  .trust-features {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .hero-visual {
    min-height: 600px;
    align-items: flex-start;
  }

  .product-image {
    width: 100%;
    height: 350px;
  }

  .owner-card {
    width: calc(100% - 40px);

    right: 20px;
    top: 330px;

    transform: none;

    box-sizing: border-box;
  }

}

</style>