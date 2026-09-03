<template>
  <section class="hero">

    <!-- =================================
         HERO CONTENT
    ================================== -->

    <div class="hero-container">

      <!-- =================================
           LEFT SIDE
      ================================== -->

      <div class="hero-content">

        <h1>
          <span>Rent</span> what you need.
          <span>Earn</span> from what you own.
        </h1>

        <p class="hero-description">
          Rent anything you need, from trailers to tools,
          appliances to event equipment.
        </p>


        <!-- Buttons -->

        <div class="hero-buttons">

          <RouterLink
            to="/browse"
            class="btn btn-primary"
          >
            Browse Products
          </RouterLink>

          <RouterLink
            to="/become-owner"
            class="btn btn-secondary"
          >
            List Your Item
          </RouterLink>

        </div>


        <!-- Trust features -->

        <div class="trust-features">

          <div class="trust-item">

            <div class="trust-icon">
              ✓
            </div>

            <span>
              Verified & Inspected
            </span>

          </div>


          <div class="trust-item">

            <div class="trust-icon">
              🔒
            </div>

            <span>
              Secure Payments
            </span>

          </div>


          <div class="trust-item">

            <div class="trust-icon">
              🚚
            </div>

            <span>
              Delivery Available
            </span>

          </div>

        </div>

      </div>


      <!-- =================================
           RIGHT SIDE
      ================================== -->

      <div class="hero-visual">

        <!-- Product image area -->

        <div class="product-image">

          <img
            src="@/assets/hero-section-bg.jpeg"
            alt="Rental products including trailer, refrigerator, tent, and equipment"
          />

        </div>


       
      </div>

    </div>


    <!-- =================================
         🚚 RENTOSPHERE ROAD
    ================================== -->

    <div class="road-section">

      <div class="road-scene">

        <img
          src="@/assets/rentosphere-road.png"
          alt="Rentosphere truck driving along a road"
          class="road-image"
        />

      </div>

    </div>

  </section>
</template>


<style scoped>

/* ==================================================
   HERO
================================================== */

.hero {
  width: 100%;
  background: #ffffff;
}


/* ==================================================
   HERO CONTAINER
================================================== */

.hero-container {

  max-width: 1450px;

  min-height: 610px;

  margin: 0 auto;

  padding: 55px 50px;

  display: grid;

  grid-template-columns:
    1fr 1.15fr;

  gap: 45px;

  align-items: center;

}


/* ==================================================
   HERO CONTENT
================================================== */

.hero-content {

  position: relative;

  padding-left: 10px;

}


.hero-content h1 {

  margin: 0;

  max-width: 650px;

  font-size:
    clamp(48px, 5vw, 76px);

  line-height: 0.98;

  font-weight: 800;

  letter-spacing: -3px;

  color: #101010;

}


.hero-content h1 span {

  color: #063b2f;

}


/* ==================================================
   HERO DESCRIPTION
================================================== */

.hero-description {

  max-width: 540px;

  margin:
    28px 0 30px;

  font-size: 18px;

  line-height: 1.6;

  color: #333333;

}


/* ==================================================
   BUTTONS
================================================== */

.hero-buttons {

  display: flex;

  gap: 16px;

  margin-bottom: 38px;

}


.btn {

  min-width: 165px;

  padding:
    15px 24px;

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

  transform:
    translateY(-2px);

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

  border:
    1px solid #222222;

}


.btn-secondary:hover {

  background: #f5f5f5;

}


/* ==================================================
   TRUST FEATURES
================================================== */

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


/* ==================================================
   HERO VISUAL
================================================== */

.hero-visual {

  min-height: 500px;

  position: relative;

  display: flex;

  align-items: center;

  justify-content: center;

}


/* ==================================================
   PRODUCT IMAGE
================================================== */

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




/* ==================================================
   🚚 ROAD SECTION
================================================== */

.road-section {

  width: 100%;

  position: relative;

  overflow: hidden;

  /*
    Creates a little breathing room
    between the hero and road.
  */

  margin-top: 5px;

}


/* ==================================================
   ROAD SCENE
================================================== */

.road-scene {

  width: 100%;

  position: relative;

  overflow: hidden;

  /*
    The road image itself controls
    the height of the scene.
  */

  line-height: 0;

}


/* ==================================================
   ROAD IMAGE
================================================== */

.road-image {

  width: 100%;

  height: auto;

  min-height: 115px;

  object-fit: cover;

  object-position: center;

  display: block;

}


/* ==================================================
   TABLET
================================================== */

@media (max-width: 1100px) {

  .hero-container {

    grid-template-columns: 1fr;

    padding:
      50px 35px;

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


  /*
    Road gets slightly taller
    on tablet.
  */

  .road-image {

    min-height: 100px;

    object-fit: cover;

  }

}


/* ==================================================
   MOBILE
================================================== */

@media (max-width: 650px) {

  .hero-container {

    padding:
      35px 20px;

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


  /* =========================
     HERO VISUAL
  ========================= */

  .hero-visual {

    min-height: 600px;

    align-items: flex-start;

  }


  .product-image {

    width: 100%;

    height: 350px;

  }


  .owner-card {

    width:
      calc(100% - 40px);

    right: 20px;

    top: 330px;

    transform: none;

    box-sizing: border-box;

  }


  /* =========================
     ROAD
  ========================= */

  .road-section {

    margin-top: 0;

  }


  .road-scene {

    width: 100%;

    height: 100px;

  }


  .road-image {

    width: 100%;

    height: 100px;

    min-height: 0;

    object-fit: cover;

    object-position: center;

  }

}


/* ==================================================
   VERY SMALL PHONES
================================================== */

@media (max-width: 400px) {

  .hero-content h1 {

    font-size: 42px;

  }


  .road-scene {

    height: 85px;

  }


  .road-image {

    height: 85px;

  }

}

</style>