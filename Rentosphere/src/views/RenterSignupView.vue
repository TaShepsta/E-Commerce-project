<template>
  <main class="signup-page">

    <!-- BACK -->
    <RouterLink to="/signup" class="back-link">
      ← Back to account type
    </RouterLink>


    <!-- HEADER -->
    <section class="signup-header">

      <div class="signup-icon">
        🛒
      </div>

      <p class="eyebrow">
        RENTER ACCOUNT
      </p>

      <h1>
        Create your
        <span>Renter account.</span>
      </h1>

      <p class="subtitle">
        Create an account to browse products,
        make bookings and rent what you need.
      </p>

    </section>


    <!-- FORM -->
    <section class="form-container">

      <form @submit.prevent="createAccount">

        <!-- NAME -->
        <div class="form-row">

          <div class="form-group">

            <label for="firstName">
              First Name
            </label>

            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              placeholder="Enter your first name"
              required
            />

          </div>


          <div class="form-group">

            <label for="lastName">
              Last Name
            </label>

            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              placeholder="Enter your last name"
              required
            />

          </div>

        </div>


        <!-- EMAIL -->
        <div class="form-group">

          <label for="email">
            Email Address
          </label>

          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            required
          />

        </div>


        <!-- PHONE -->
        <div class="form-group">

          <label for="phone">
            Phone Number
          </label>

          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="e.g. 071 234 5678"
            required
          />

        </div>


        <!-- PASSWORD -->
        <div class="form-group">

          <label for="password">
            Password
          </label>

          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Create a password"
            minlength="8"
            required
          />

          <small>
            Password must be at least 8 characters.
          </small>

        </div>


        <!-- CONFIRM PASSWORD -->
        <div class="form-group">

          <label for="confirmPassword">
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirm your password"
            minlength="8"
            required
          />

        </div>


        <!-- TERMS -->
        <div class="terms">

          <input
            id="terms"
            v-model="form.terms"
            type="checkbox"
            required
          />

          <label for="terms">
            I agree to the Rentosphere
            <a href="#" @click.prevent>
              Terms & Conditions
            </a>
            and
            <a href="#" @click.prevent>
              Privacy Policy
            </a>.
          </label>

        </div>


        <!-- ERROR -->
        <p
          v-if="errorMessage"
          class="error-message"
        >
          {{ errorMessage }}
        </p>


        <!-- SUBMIT -->
        <button
          type="submit"
          class="submit-button"
        >
          Create Renter Account
        </button>

      </form>


      <!-- LOGIN -->
      <div class="login-link">

        <span>
          Already have an account?
        </span>

        <RouterLink to="/login">
          Log in
        </RouterLink>

      </div>

    </section>

  </main>
</template>


<script setup>
import Swal from 'sweetalert2'
import { reactive, ref } from 'vue'


const errorMessage = ref('')


const form = reactive({

  firstName: '',

  lastName: '',

  email: '',

  phone: '',

  password: '',

  confirmPassword: '',

  terms: false

})


function createAccount() {

  errorMessage.value = ''


  if (form.password !== form.confirmPassword) {

    errorMessage.value =
      'Passwords do not match.'

    return

  }


  console.log('Renter account:', {

    firstName: form.firstName,

    lastName: form.lastName,

    email: form.email,

    phone: form.phone,

    password: form.password

  })


  Swal.fire({
    title: "Good job!",
    text: "Renter account created successfully!",
    icon: "success"
  })

}

</script>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.signup-page {

  min-height: calc(100vh - 72px);

  background: #ffffff;

  padding: 45px 20px 70px;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  box-sizing: border-box;

}


/* =====================================================
   BACK LINK
===================================================== */

.back-link {

  display: block;

  max-width: 650px;

  margin: 0 auto 35px;

  color: #063b2f;

  text-decoration: none;

  font-size: 14px;

  font-weight: 600;

}


.back-link:hover {

  color: #f5a000;

}


/* =====================================================
   HEADER
===================================================== */

.signup-header {

  max-width: 650px;

  margin: 0 auto 35px;

  text-align: center;

}


.signup-icon {

  width: 65px;

  height: 65px;

  margin: 0 auto 20px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #f5f0e7;

  border-radius: 16px;

  font-size: 30px;

}


.eyebrow {

  margin: 0 0 12px;

  color: #f5a000;

  font-size: 12px;

  font-weight: 700;

  letter-spacing: 1.5px;

}


.signup-header h1 {

  margin: 0;

  color: #101010;

  font-size: clamp(38px, 5vw, 55px);

  line-height: 1.05;

  font-weight: 800;

  letter-spacing: -2px;

}


.signup-header h1 span {

  color: #063b2f;

}


.subtitle {

  max-width: 550px;

  margin: 18px auto 0;

  color: #555555;

  font-size: 16px;

  line-height: 1.6;

}


/* =====================================================
   FORM CONTAINER
===================================================== */

.form-container {

  width: 100%;

  max-width: 650px;

  margin: 0 auto;

  padding: 35px;

  box-sizing: border-box;

  background: #ffffff;

  border: 1px solid #e5e5e5;

  border-radius: 20px;

  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.06);

}


/* =====================================================
   FORM ROW
===================================================== */

.form-row {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 18px;

}


/* =====================================================
   FORM GROUP
===================================================== */

.form-group {

  margin-bottom: 20px;

}


.form-group label {

  display: block;

  margin-bottom: 8px;

  color: #222222;

  font-size: 14px;

  font-weight: 600;

}


.form-group input {

  width: 100%;

  height: 48px;

  padding: 0 14px;

  box-sizing: border-box;

  border: 1px solid #d8d8d8;

  border-radius: 8px;

  outline: none;

  background: #ffffff;

  color: #111111;

  font-size: 14px;

  font-family: inherit;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

}


.form-group input::placeholder {

  color: #999999;

}


.form-group input:focus {

  border-color: #063b2f;

  box-shadow:
    0 0 0 3px rgba(6, 59, 47, 0.08);

}


.form-group small {

  display: block;

  margin-top: 6px;

  color: #777777;

  font-size: 12px;

}


/* =====================================================
   TERMS
===================================================== */

.terms {

  display: flex;

  align-items: flex-start;

  gap: 10px;

  margin: 5px 0 22px;

}


.terms input {

  width: 17px;

  height: 17px;

  margin-top: 2px;

  accent-color: #063b2f;

  flex-shrink: 0;

}


.terms label {

  color: #555555;

  font-size: 13px;

  line-height: 1.5;

}


.terms a {

  color: #063b2f;

  font-weight: 600;

  text-decoration: none;

}


.terms a:hover {

  color: #f5a000;

}


/* =====================================================
   ERROR
===================================================== */

.error-message {

  margin: 0 0 18px;

  padding: 12px;

  border-radius: 8px;

  background: #fff0f0;

  color: #b42318;

  font-size: 13px;

}


/* =====================================================
   SUBMIT BUTTON
===================================================== */

.submit-button {

  width: 100%;

  height: 50px;

  border: none;

  border-radius: 8px;

  background: #063b2f;

  color: #ffffff;

  font-family: inherit;

  font-size: 15px;

  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;

}


.submit-button:hover {

  background: #052e25;

  transform: translateY(-1px);

}


/* =====================================================
   LOGIN
===================================================== */

.login-link {

  display: flex;

  justify-content: center;

  gap: 6px;

  margin-top: 25px;

  color: #666666;

  font-size: 14px;

}


.login-link a {

  color: #063b2f;

  font-weight: 700;

  text-decoration: none;

}


.login-link a:hover {

  color: #f5a000;

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {

  .signup-page {

    padding: 30px 16px 50px;

  }


  .form-container {

    padding: 25px 20px;

  }


  .form-row {

    grid-template-columns: 1fr;

    gap: 0;

  }


  .signup-header h1 {

    font-size: 38px;

  }


  .login-link {

    flex-direction: column;

    align-items: center;

  }

}

</style>