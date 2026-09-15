<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'

const router = useRouter()
const store = useStore()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const error = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  error.value = ''

  if (
    !form.firstName.trim() ||
    !form.lastName.trim() ||
    !form.email.trim() ||
    !form.phone.trim() ||
    !form.password ||
    !form.confirmPassword
  ) {
    error.value = 'Please fill in all fields.'
    return
  }

  if (form.password.length < 8) {
    error.value = 'Password must be at least 8 characters.'
    return
  }

  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match.'
    return
  }

  if (!form.terms) {
    error.value = 'Please accept the terms and conditions.'
    return
  }

  isSubmitting.value = true

  try {
    // Goes through the Vuex auth store so the JWT + user get saved
    // and the navbar updates immediately, same as a normal login.
    await store.dispatch('auth/register', {
      name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      role: 'owner'
    })

    await Swal.fire({
      icon: 'success',
      title: 'Account Created!',
      text: 'Your owner account has been created successfully.',
      confirmButtonText: 'Continue'
    })

    // Already logged in via the store now, so go straight into the site
    router.push('/')
  } catch (err) {
    console.error('Owner signup error:', err)

    error.value =
      err.message || 'Unable to create your account. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="signup-page">
    <RouterLink to="/signup" class="back-link">
      ← Back to account type
    </RouterLink>

    <section class="signup-wrapper">
      <div class="signup-header">
        <div class="signup-icon">
          💰
        </div>

        <p class="eyebrow">
          OWNER ACCOUNT
        </p>

        <h1>
          Turn what you own into
          <span>income.</span>
        </h1>

        <p class="signup-description">
          Create your Rentosphere owner account and start listing the
          items you want to make available for rental.
        </p>
      </div>

      <form class="signup-form" @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="field">
            <label for="firstName">First name</label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              placeholder="First name"
              autocomplete="given-name"
            />
          </div>

          <div class="field">
            <label for="lastName">Last name</label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              placeholder="Last name"
              autocomplete="family-name"
            />
          </div>
        </div>

        <div class="field">
          <label for="email">Email address</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
          />
        </div>

        <div class="field">
          <label for="phone">Phone number</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="e.g. 071 234 5678"
            autocomplete="tel"
          />
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="At least 8 characters"
            autocomplete="new-password"
          />
        </div>

        <div class="field">
          <label for="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Enter your password again"
            autocomplete="new-password"
          />
        </div>

        <label class="terms">
          <input
            v-model="form.terms"
            type="checkbox"
          />

          <span>
            I agree to the Rentosphere terms and conditions.
          </span>
        </label>

        <p v-if="error" class="form-error">
          {{ error }}
        </p>

        <button
          type="submit"
          class="submit-button"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Creating account...' : 'Create Owner Account' }}
        </button>
      </form>

      <p class="login-link">
        Already have an account?
        <RouterLink to="/login">
          Log in
        </RouterLink>
      </p>
    </section>
  </main>
</template>

<style scoped>
.signup-page {
  min-height: 100vh;
  background: #f5f0e7;
  padding: 30px 24px 70px;
  color: #17211e;
}

.back-link {
  display: inline-block;
  color: #063b2f;
  text-decoration: none;
  font-weight: 700;
  margin-bottom: 35px;
}

.back-link:hover {
  color: #f5a000;
}

.signup-wrapper {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 24px;
  padding: 45px;
  box-shadow: 0 15px 45px rgba(6, 59, 47, 0.1);
}

.signup-header {
  text-align: center;
  margin-bottom: 35px;
}

.signup-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #063b2f;
  font-size: 30px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #f5a000;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.signup-header h1 {
  margin: 0;
  color: #063b2f;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.1;
}

.signup-header h1 span {
  color: #f5a000;
}

.signup-description {
  max-width: 520px;
  margin: 16px auto 0;
  color: #66716d;
  line-height: 1.7;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  color: #063b2f;
  font-size: 0.9rem;
  font-weight: 700;
}

.field input {
  width: 100%;
  box-sizing: border-box;
  padding: 14px 15px;
  border: 1px solid #d9d5cb;
  border-radius: 10px;
  background: #fff;
  color: #17211e;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.field input:focus {
  border-color: #063b2f;
  box-shadow: 0 0 0 3px rgba(6, 59, 47, 0.1);
}

.terms {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #66716d;
  font-size: 0.88rem;
  line-height: 1.5;
  cursor: pointer;
}

.terms input {
  margin-top: 3px;
  accent-color: #063b2f;
}

.form-error {
  margin: 0;
  padding: 12px 14px;
  border-radius: 10px;
  background: #fff0ef;
  color: #b3261e;
  font-size: 0.88rem;
}

.submit-button {
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 15px 20px;
  background: #063b2f;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.submit-button:hover:not(:disabled) {
  background: #0b4d40;
  transform: translateY(-1px);
}

.submit-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.login-link {
  margin: 25px 0 0;
  text-align: center;
  color: #66716d;
  font-size: 0.9rem;
}

.login-link a {
  color: #063b2f;
  font-weight: 800;
  text-decoration: none;
}

.login-link a:hover {
  color: #f5a000;
}

@media (max-width: 650px) {
  .signup-page {
    padding: 20px 15px 50px;
  }

  .signup-wrapper {
    padding: 30px 22px;
    border-radius: 18px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>