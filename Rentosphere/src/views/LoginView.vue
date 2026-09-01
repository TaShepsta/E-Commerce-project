<script setup>
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const errors = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)
const isSubmitting = ref(false)
const formError = ref('')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isValid = computed(() => {
  return emailPattern.test(form.email) && form.password.length >= 6
})

function validate() {
  errors.email = form.email
    ? emailPattern.test(form.email)
      ? ''
      : 'Enter a valid email address.'
    : 'Email is required.'

  errors.password = form.password
    ? form.password.length >= 6
      ? ''
      : 'Password must be at least 6 characters.'
    : 'Password is required.'

  return !errors.email && !errors.password
}

async function handleSubmit() {
  formError.value = ''
  if (!validate()) return

  isSubmitting.value = true
  try {
    await store.dispatch('auth/login', {
      email: form.email,
      password: form.password,
      remember: form.remember,
    })
    // router.push('/dashboard')
  } catch (err) {
    formError.value = 'We could not log you in. Check your details and try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="sphere" aria-hidden="true"></div>

    <a href="/" class="brand">
      <span class="brand__mark"></span>
      Rentosphere
    </a>

    <main class="stage">
      <div class="panel">
        <header class="panel__header">
          <h1>Sign in</h1>
          <p>Access your bookings, listings, and messages.</p>
        </header>

        <form novalidate @submit.prevent="handleSubmit">
          <div class="field">
            <label for="email">Email address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              :aria-invalid="!!errors.email"
              :class="{ 'field--error': errors.email }"
              @blur="validate"
            />
            <span v-if="errors.email" class="field__error">{{ errors.email }}</span>
          </div>

          <div class="field">
            <div class="field__label-row">
              <label for="password">Password</label>
              <a href="/forgot-password" class="field__link">Forgot password?</a>
            </div>
            <div class="password-input">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Enter your password"
                :aria-invalid="!!errors.password"
                :class="{ 'field--error': errors.password }"
                @blur="validate"
              />
              <button
                type="button"
                class="password-toggle"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M3 3l18 18" />
                  <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a15.8 15.8 0 0 1-4.2 4.9M6.5 6.6C3.9 8.3 2 12 2 12s3.6 7 10 7c1.3 0 2.5-.2 3.6-.6" />
                  <path d="M9.9 10a3 3 0 0 0 4.2 4.2" />
                </svg>
              </button>
            </div>
            <span v-if="errors.password" class="field__error">{{ errors.password }}</span>
          </div>

          <label class="checkbox">
            <input v-model="form.remember" type="checkbox" />
            <span>Keep me signed in</span>
          </label>

          <p v-if="formError" class="form-error" role="alert">{{ formError }}</p>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Sign in</span>
            <span v-else>Signing in…</span>
          </button>
        </form>

        <p class="panel__footer">
          New to Rentosphere? <a href="/signup">Create an account</a>
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');

.auth-page {
  --forest: #0f2820;
  --forest-deep: #0a1c16;
  --cream: #faf6ec;
  --ink: #16302a;
  --ink-soft: #6b7770;
  --on-dark: #d9e6df;
  --gold-1: #ffd68a;
  --gold-2: #eb9d3e;
  --error: #c0492f;

  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: var(--forest);
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
}

.sphere {
  position: absolute;
  top: -22vw;
  right: -16vw;
  width: 60vw;
  height: 60vw;
  min-width: 480px;
  min-height: 480px;
  max-width: 780px;
  max-height: 780px;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 34%, var(--gold-1) 0%, var(--gold-2) 42%, rgba(235, 157, 62, 0.15) 68%, transparent 78%);
  filter: blur(2px);
  pointer-events: none;
}

.brand {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin: 2.25rem 0 0 2.5rem;
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

.stage {
  position: relative;
  z-index: 2;
  min-height: calc(100vh - 5.5rem);
  display: flex;
  align-items: center;
  padding: 2rem 2.5rem 4rem;
}

.panel {
  width: 100%;
  max-width: 400px;
  background: var(--cream);
  border-radius: 18px;
  padding: 2.75rem 2.5rem;
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.55);
}

.panel__header {
  margin-bottom: 2.1rem;
}

.panel__header h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 2.3rem;
  line-height: 1.1;
  margin: 0 0 0.55rem;
  color: var(--ink);
}

.panel__header p {
  margin: 0;
  font-size: 0.94rem;
  color: var(--ink-soft);
}

.field {
  margin-bottom: 1.4rem;
}

.field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 0.5rem;
}

.field__label-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.field__label-row label {
  margin-bottom: 0;
}

.field__link {
  font-size: 0.78rem;
  color: var(--ink-soft);
  text-decoration: none;
}

.field__link:hover {
  color: var(--gold-2);
  text-decoration: underline;
}

.field input[type='email'],
.field input[type='password'],
.field input[type='text'] {
  width: 100%;
  box-sizing: border-box;
  padding: 0.55rem 0;
  border: none;
  border-bottom: 1.5px solid rgba(22, 48, 42, 0.18);
  border-radius: 0;
  background: transparent;
  font-family: inherit;
  font-size: 0.98rem;
  color: var(--ink);
  transition: border-color 0.15s ease;
}

.field input::placeholder {
  color: #a8ae9f;
}

.field input:focus {
  outline: none;
  border-color: var(--ink);
}

.field input.field--error {
  border-color: var(--error);
}

.field__error {
  display: block;
  margin-top: 0.45rem;
  font-size: 0.78rem;
  color: var(--error);
}

.password-input {
  position: relative;
}

.password-input input {
  padding-right: 2rem;
}

.password-toggle {
  position: absolute;
  right: 0;
  bottom: 0.5rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--ink-soft);
  display: flex;
}

.password-toggle svg {
  width: 18px;
  height: 18px;
}

.password-toggle:hover {
  color: var(--ink);
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.86rem;
  color: var(--ink);
  cursor: pointer;
  margin-bottom: 1.75rem;
}

.checkbox input {
  width: 15px;
  height: 15px;
  accent-color: var(--ink);
  cursor: pointer;
}

.form-error {
  background: #fbe8e2;
  border: 1px solid #e5b7a5;
  color: #8f3a24;
  font-size: 0.82rem;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  margin: 0 0 1.2rem;
}

.submit-btn {
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 999px;
  background: var(--ink);
  color: var(--cream);
  font-family: 'Inter', sans-serif;
  font-size: 0.96rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.05s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #0e211c;
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.99);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.panel__footer {
  margin: 1.6rem 0 0;
  text-align: center;
  font-size: 0.86rem;
  color: var(--ink-soft);
}

.panel__footer a {
  color: var(--ink);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid var(--gold-2);
}

@media (max-width: 720px) {
  .sphere {
    top: -34vw;
    right: -30vw;
    width: 90vw;
    height: 90vw;
    min-width: 380px;
    min-height: 380px;
  }

  .brand {
    margin: 1.75rem 0 0 1.5rem;
  }

  .stage {
    padding: 1.5rem 1.25rem 3rem;
    align-items: flex-end;
    min-height: calc(100vh - 4.5rem);
  }

  .panel {
    padding: 2.25rem 1.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .submit-btn {
    transition: none;
  }
}
</style>