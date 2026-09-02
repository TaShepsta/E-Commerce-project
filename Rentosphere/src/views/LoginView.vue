<template>
  <div class="login-page">
    <!-- Left: editorial panel -->
    <section class="panel">
      <div class="panel-inner">
        <div class="mark">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#FBF9F5" stroke-width="1.4" />
            <circle cx="12" cy="12" r="3.4" fill="#E2872E" />
          </svg>
          <span>Rentosphere</span>
        </div>

        <h1 class="panel-heading">
          Everything you need is already owned by someone nearby.
        </h1>

        <p class="panel-text">
          Log back in to pick up your bookings, your listings, and the
          conversations you left off.
        </p>

        <div class="rings" aria-hidden="true">
          <span class="ring ring-a"></span>
          <span class="ring ring-b"></span>
          <span class="ring ring-c"></span>
        </div>
      </div>
    </section>

    <!-- Right: form -->
    <section class="form-side">
      <form class="form" @submit.prevent="handleSubmit">
        <h2 class="form-heading">Log in</h2>

        <div class="field">
          <label for="email">Email address</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            required
          />
        </div>

        <div class="field">
          <div class="field-row">
            <label for="password">Password</label>
            <a href="#" class="forgot" @click.prevent="$emit('forgot-password')">Forgot?</a>
          </div>
          <div class="password-wrap">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              autocomplete="current-password"
              required
            />
            <button
              type="button"
              class="toggle"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <label class="remember">
          <input type="checkbox" v-model="form.remember" />
          Keep me logged in
        </label>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="submit" :disabled="submitting">
          {{ submitting ? 'Logging in' : 'Log in' }}
        </button>

        <p class="switch">
          New here? <a href="#" @click.prevent="$emit('go-signup')">Create an account</a>
        </p>
      </form>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['submit', 'go-signup', 'forgot-password'])

const form = reactive({ email: '', password: '', remember: false })
const showPassword = ref(false)
const submitting = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  submitting.value = true
  try {
    await emit('submit', { ...form })
  } catch (err) {
    error.value = err?.message || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&display=swap');

* { box-sizing: border-box; }

.login-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  font-family: 'Inter', system-ui, sans-serif;
  color: #14211b;
  background: #fbf9f5;
}

/* Left panel */
.panel {
  position: relative;
  background: #123529;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.panel-inner {
  position: relative;
  z-index: 2;
  padding: 64px;
  max-width: 480px;
}
.mark {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fbf9f5;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 72px;
}
.mark svg { width: 26px; height: 26px; }

.panel-heading {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 40px;
  line-height: 1.2;
  color: #fbf9f5;
  margin: 0 0 20px;
  max-width: 20ch;
}

.panel-text {
  color: #b9ccc0;
  font-size: 16px;
  line-height: 1.6;
  max-width: 36ch;
  margin: 0;
}

.rings {
  position: absolute;
  right: -140px;
  bottom: -140px;
  width: 420px;
  height: 420px;
  z-index: 1;
}
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(251, 249, 245, 0.14);
}
.ring-a { inset: 0; }
.ring-b { inset: 60px; border-color: rgba(251, 249, 245, 0.18); }
.ring-c {
  inset: 130px;
  background: #e2872e;
  border: none;
  opacity: 0.9;
}

/* Right side / form */
.form-side {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
}

.form {
  width: 100%;
  max-width: 380px;
}

.form-heading {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 32px;
  margin: 0 0 40px;
}

.field { margin-bottom: 26px; }

.field-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #55645b;
  margin-bottom: 10px;
}

.forgot {
  font-size: 13px;
  color: #123529;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid transparent;
}
.forgot:hover { border-bottom-color: #123529; }

input[type='email'],
input[type='password'],
input[type='text'] {
  width: 100%;
  border: none;
  border-bottom: 1.5px solid #d8d4c9;
  background: transparent;
  padding: 8px 2px 12px;
  font-size: 16px;
  font-family: inherit;
  color: #14211b;
  transition: border-color 0.15s ease;
}
input::placeholder { color: #a3a99c; }
input:focus {
  outline: none;
  border-bottom-color: #e2872e;
}

.password-wrap { position: relative; }
.password-wrap input { padding-right: 52px; }
.toggle {
  position: absolute;
  right: 2px;
  top: 6px;
  background: none;
  border: none;
  font-size: 13px;
  font-weight: 500;
  color: #123529;
  cursor: pointer;
}

.remember {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #55645b;
  margin: 4px 0 32px;
  cursor: pointer;
}
.remember input { accent-color: #123529; width: 15px; height: 15px; }

.error {
  color: #b3261e;
  font-size: 14px;
  margin: -16px 0 20px;
}

.submit {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 999px;
  background: #123529;
  color: #fbf9f5;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}
.submit:hover:not(:disabled) { background: #0c2620; }
.submit:disabled { opacity: 0.6; cursor: not-allowed; }

.switch {
  text-align: center;
  font-size: 14px;
  color: #55645b;
  margin: 28px 0 0;
}
.switch a { color: #123529; font-weight: 600; text-decoration: none; }
.switch a:hover { text-decoration: underline; }

@media (max-width: 860px) {
  .login-page { grid-template-columns: 1fr; }
  .panel { padding: 0; min-height: 320px; }
  .panel-inner { padding: 40px 32px; }
  .panel-heading { font-size: 28px; }
  .mark { margin-bottom: 40px; }
  .rings { width: 280px; height: 280px; right: -100px; bottom: -100px; }
}
</style>