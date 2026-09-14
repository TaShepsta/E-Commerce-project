<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const email = ref('')
const error = ref('')
const message = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  error.value = ''
  message.value = ''
  if (!email.value) {
    error.value = 'Enter the email address on your account.'
    return
  }
  isSubmitting.value = true
  try {
    message.value = await store.dispatch('auth/forgotPassword', { email: email.value })
  } catch (err) {
    error.value = err.message || 'Unable to send the reset link. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="content-grid">
      <div class="form-col">
        <div class="form-wrap">
          <h1>Reset your password</h1>
          <p class="subtitle">Enter your email and we'll send you a link to reset it.</p>

          <form v-if="!message" @submit.prevent="handleSubmit" novalidate>
            <div class="field">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
              />
            </div>

            <p v-if="error" class="form-error" role="alert">{{ error }}</p>

            <button type="submit" class="btn-submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending…' : 'Send reset link' }}
            </button>
          </form>

          <p v-else class="form-success" role="status">{{ message }}</p>

          <p class="switch-auth">
            <router-link to="/login">Back to log in</router-link>
          </p>
        </div>
      </div>

      <div class="side-panel">
        <h2>We've got you.</h2>
        <p>Password resets go to your inbox and expire after an hour, so your account stays safe.</p>

        <ul class="perk-list">
          <li>
            <span class="check">✓</span>
            Link works once and expires automatically
          </li>
          <li>
            <span class="check">✓</span>
            No account details are revealed either way
          </li>
        </ul>

        <router-link to="/login" class="btn-outline">Back to log in</router-link>

        <svg class="road-strip" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="20" x2="300" y2="20" stroke-dasharray="14 12" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap');

.auth-page {
  --green: #12402f;
  --green-hover: #0d3025;
  --amber: #f2a91c;
  --cream: #fbf1e2;
  --cream-border: #efe3cc;
  --ink: #14181a;
  --text-muted: #5b6660;
  --border: #e3e5e1;
  --error: #b3261e;
  --success: #12402f;
  --radius: 8px;

  min-height: 100vh;
  background: #ffffff;
  font-family: 'Inter', sans-serif;
  color: var(--ink);
  padding: 48px 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.content-grid {
  max-width: 1040px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: 28px;
  align-items: stretch;
}

.form-col {
  display: flex;
  align-items: center;
  padding: 24px 8px;
}

.form-wrap {
  width: 100%;
  max-width: 380px;
}

.form-wrap h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 2.1rem;
  line-height: 1.15;
  margin: 0 0 10px;
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.98rem;
  margin: 0 0 30px;
}

.field {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 7px;
}

input[type='email'] {
  width: 100%;
  box-sizing: border-box;
  padding: 11px 13px;
  font-size: 0.96rem;
  font-family: inherit;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: #ffffff;
  color: var(--ink);
  transition: border-color 120ms ease;
}

input::placeholder {
  color: #a7ada5;
}

input:focus-visible {
  outline: 2px solid var(--amber);
  outline-offset: 1px;
  border-color: var(--amber);
}

.form-error {
  color: var(--error);
  font-size: 0.85rem;
  margin: -6px 0 16px;
}

.form-success {
  color: var(--success);
  font-size: 0.95rem;
  background: var(--cream);
  border: 1px solid var(--cream-border);
  border-radius: var(--radius);
  padding: 14px 16px;
  margin: 0 0 20px;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  font-size: 0.98rem;
  font-weight: 600;
  font-family: inherit;
  color: #ffffff;
  background: var(--green);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background 120ms ease;
}

.btn-submit:hover:not(:disabled) {
  background: var(--green-hover);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-submit:focus-visible {
  outline: 2px solid var(--amber);
  outline-offset: 2px;
}

.switch-auth {
  margin-top: 22px;
  font-size: 0.88rem;
  color: var(--text-muted);
}

.switch-auth a {
  color: var(--green);
  font-weight: 600;
  text-decoration: none;
}

.switch-auth a:hover {
  text-decoration: underline;
}

.side-panel {
  background: var(--cream);
  border: 1px solid var(--cream-border);
  border-radius: 16px;
  padding: 40px 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.side-panel h2 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0 0 10px;
}

.side-panel > p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.55;
  margin: 0 0 24px;
}

.perk-list {
  list-style: none;
  margin: 0 0 30px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.perk-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.92rem;
}

.check {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--green);
  color: #ffffff;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-outline {
  display: inline-block;
  align-self: flex-start;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink);
  background: #ffffff;
  border: 1px solid var(--ink);
  border-radius: var(--radius);
  text-decoration: none;
}

.btn-outline:hover {
  background: var(--ink);
  color: #ffffff;
}

.road-strip {
  width: 100%;
  height: 24px;
  margin-top: 32px;
  opacity: 0.5;
}

.road-strip line {
  stroke: var(--ink);
  stroke-width: 2;
}

@media (max-width: 860px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .form-col {
    padding: 8px;
  }

  .side-panel {
    order: -1;
    padding: 30px 26px;
  }

  .road-strip {
    display: none;
  }
}
</style>
