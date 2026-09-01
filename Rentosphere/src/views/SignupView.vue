

<template>
  <main class="signup-page">

<RouterLink to="/" class="back-home">
  ← Back to Home
</RouterLink>

    <!-- =========================
         PAGE HEADER
    ========================= -->

    <section class="signup-header">

      <p class="eyebrow">
        JOIN RENTOSPHERE
      </p>

      <h1>
        How would you like to use
        <span>Rentosphere?</span>
      </h1>

      <p class="subtitle">
        Choose how you want to get started.
        You can rent products or become an owner
        and earn from the things you already own.
      </p>

    </section>


    <!-- =========================
         SIGNUP OPTIONS
    ========================= -->

    <section class="signup-options">

      <!-- =========================
           RENTER CARD
      ========================= -->

      <RouterLink
        to="/signup/renter"
        class="signup-card renter-card"
      >

        <div class="card-icon renter-icon">
          🛒
        </div>

        <div class="card-content">

          <p class="card-label">
            I WANT TO RENT
          </p>

          <h2>
            Sign up as a Renter
          </h2>

          <p class="card-description">
            Find the products you need without
            having to buy them. Browse verified
            items, choose your dates and rent
            with confidence.
          </p>


          <ul class="benefits">

            <li>
              <span>✓</span>
              Browse thousands of rental items
            </li>

            <li>
              <span>✓</span>
              Secure online payments
            </li>

            <li>
              <span>✓</span>
              Flexible rental periods
            </li>

            <li>
              <span>✓</span>
              Delivery options available
            </li>

          </ul>

        </div>


        <div class="card-footer">

          <span>
            Continue as Renter
          </span>

          <span class="arrow">
            →
          </span>

        </div>

      </RouterLink>


      <!-- =========================
           OWNER CARD
      ========================= -->

      <RouterLink
        to="/signup/owner"
        class="signup-card owner-card"
      >

        <div class="card-icon owner-icon">
          💰
        </div>

        <div class="card-content">

          <p class="card-label">
            I WANT TO EARN
          </p>

          <h2>
            Sign up as an Owner
          </h2>

          <p class="card-description">
            Turn the things you already own into
            extra income. List your products and
            let renters discover and book them.
          </p>


          <ul class="benefits">

            <li>
              <span>✓</span>
              List your items easily
            </li>

            <li>
              <span>✓</span>
              We help verify your products
            </li>

            <li>
              <span>✓</span>
              Set your own rental prices
            </li>

            <li>
              <span>✓</span>
              Receive secure payments
            </li>

          </ul>

        </div>


        <div class="card-footer">

          <span>
            Continue as Owner
          </span>

          <span class="arrow">
            →
          </span>

        </div>

      </RouterLink>

    </section>


    <!-- =========================
         LOGIN
    ========================= -->

    <section class="login-section">

      <p>
        Already have an account?
      </p>

      <RouterLink to="/login">
        Log in
      </RouterLink>

    </section>

  </main>
</template>


<style scoped>

/* =====================================================
   BACK TO HOME
===================================================== */

.back-home {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  color: #063b2f;
  text-decoration: none;

  font-size: 14px;
  font-weight: 600;

  margin-bottom: 35px;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.back-home:hover {
  color: #f5a000;
  transform: translateX(-3px);
}


/* =====================================================
   PAGE
===================================================== */

.signup-page {
  min-height: calc(100vh - 72px);

  background: #ffffff;

  padding: 70px 40px 80px;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  box-sizing: border-box;
}


/* =====================================================
   HEADER
===================================================== */

.signup-header {
  max-width: 800px;

  margin: 0 auto 55px;

  text-align: center;
}


.eyebrow {
  margin: 0 0 14px;

  color: #f5a000;

  font-size: 13px;

  font-weight: 700;

  letter-spacing: 1.5px;
}


.signup-header h1 {
  margin: 0;

  color: #101010;

  font-size: clamp(38px, 5vw, 58px);

  line-height: 1.05;

  font-weight: 800;

  letter-spacing: -2px;
}


.signup-header h1 span {
  color: #063b2f;
}


.subtitle {
  max-width: 650px;

  margin: 22px auto 0;

  color: #555555;

  font-size: 17px;

  line-height: 1.6;
}


/* =====================================================
   SIGNUP OPTIONS
===================================================== */

.signup-options {
  max-width: 1050px;

  margin: 0 auto;

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 30px;
}


/* =====================================================
   CARD
===================================================== */

.signup-card {
  position: relative;

  min-height: 480px;

  padding: 38px;

  box-sizing: border-box;

  border-radius: 22px;

  border: 1px solid #e4e4e4;

  text-decoration: none;

  color: #111111;

  display: flex;

  flex-direction: column;

  overflow: hidden;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}


.signup-card:hover {
  transform: translateY(-7px);

  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.10);

  border-color: #063b2f;
}


/* =====================================================
   RENTER CARD
===================================================== */

.renter-card {
  background: #ffffff;
}


/* =====================================================
   OWNER CARD
===================================================== */

.owner-card {
  background: #063b2f;

  color: #ffffff;

  border-color: #063b2f;
}


.owner-card:hover {
  border-color: #063b2f;

  box-shadow:
    0 20px 50px rgba(6, 59, 47, 0.25);
}


/* =====================================================
   CARD ICON
===================================================== */

.card-icon {
  width: 65px;

  height: 65px;

  border-radius: 16px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 30px;

  margin-bottom: 28px;
}


.renter-icon {
  background: #f5f0e7;
}


.owner-icon {
  background: rgba(255, 255, 255, 0.12);
}


/* =====================================================
   CARD CONTENT
===================================================== */

.card-content {
  flex: 1;
}


.card-label {
  margin: 0 0 10px;

  color: #f5a000;

  font-size: 12px;

  font-weight: 700;

  letter-spacing: 1.2px;
}


.card-content h2 {
  margin: 0 0 16px;

  font-size: 30px;

  line-height: 1.15;

  font-weight: 750;
}


.card-description {
  max-width: 440px;

  margin: 0 0 25px;

  font-size: 15px;

  line-height: 1.65;

  color: #555555;
}


.owner-card .card-description {
  color: #dce8e4;
}


/* =====================================================
   BENEFITS
===================================================== */

.benefits {
  padding: 0;

  margin: 0;

  list-style: none;
}


.benefits li {
  display: flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 13px;

  font-size: 14px;

  color: #333333;
}


.owner-card .benefits li {
  color: #ffffff;
}


.benefits li span {
  width: 21px;

  height: 21px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background: #2f7d45;

  color: #ffffff;

  font-size: 11px;

  font-weight: 700;
}


/* =====================================================
   CARD FOOTER
===================================================== */

.card-footer {
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-top: 30px;

  padding-top: 22px;

  border-top: 1px solid #e5e5e5;

  font-size: 15px;

  font-weight: 700;
}


.owner-card .card-footer {
  border-top-color: rgba(255, 255, 255, 0.2);
}


.arrow {
  width: 38px;

  height: 38px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #f5a000;

  color: #111111;

  font-size: 20px;

  transition: transform 0.2s ease;
}


.signup-card:hover .arrow {
  transform: translateX(5px);
}


/* =====================================================
   LOGIN
===================================================== */

.login-section {
  display: flex;

  justify-content: center;

  align-items: center;

  gap: 7px;

  margin-top: 45px;

  font-size: 14px;

  color: #555555;
}


.login-section a {
  color: #063b2f;

  font-weight: 700;

  text-decoration: none;
}


.login-section a:hover {
  color: #f5a000;
}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 850px) {

  .signup-page {
    padding: 55px 25px 70px;
  }


  .signup-options {
    grid-template-columns: 1fr;

    max-width: 600px;
  }


  .signup-card {
    min-height: 430px;
  }

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 550px) {

  .signup-page {
    padding: 40px 18px 60px;
  }


  .signup-header {
    margin-bottom: 35px;
  }


  .signup-header h1 {
    font-size: 38px;

    letter-spacing: -1.5px;
  }


  .subtitle {
    font-size: 15px;
  }


  .signup-options {
    gap: 20px;
  }


  .signup-card {
    min-height: auto;

    padding: 28px;

    border-radius: 18px;
  }


  .card-icon {
    width: 58px;

    height: 58px;

    font-size: 26px;
  }


  .card-content h2 {
    font-size: 26px;
  }


  .card-description {
    font-size: 14px;
  }

}

</style>