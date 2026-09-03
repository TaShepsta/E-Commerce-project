<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleSubmit = () => {
  error.value = ''
  if (!name.value || !email.value || !password.value) {
    error.value = 'Fill in every field to create your account.'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }
  // TODO: replace with a real call to the backend auth endpoint
  console.log('signup attempt', { name: name.value, email: email.value })
  router.push('/')
}
</script>

<template>
  <section class="auth-page container">
    <div class="auth-card">
      <h1>Create your account</h1>
      <p class="subtitle">Join Rentosphere to rent items or list your own.</p>

      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label for="name">Full name</label>
          <input id="name" v-model="name" type="text" placeholder="Jane Doe" autocomplete="name" />
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="you@example.com" autocomplete="email" />
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" placeholder="••••••••" autocomplete="new-password" />
        </div>

        <div class="field">
          <label for="confirm-password">Confirm password</label>
          <input id="confirm-password" v-model="confirmPassword" type="password" placeholder="••••••••" autocomplete="new-password" />
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>

        <button type="submit" class="btn btn-primary btn-block">Create account</button>
      </form>

      <p class="switch-auth">
        Already have an account?
        <router-link to="/login">Log in</router-link>
      </p>
    </div>
  </section>
</template>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  padding: 72px 24px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 40px 32px;
  box-shadow: var(--shadow-card);
  text-align: center;
}

.auth-card h1 {
  font-size: 1.7rem;
}

.subtitle {
  margin: 10px 0 28px;
}

form {
  text-align: left;
}

.form-error {
  color: #b3261e;
  font-size: 0.85rem;
  margin: -6px 0 14px;
}

.switch-auth {
  margin-top: 22px;
  font-size: 0.9rem;
}

.switch-auth a {
  color: var(--color-primary);
  font-weight: 600;
}
</style>