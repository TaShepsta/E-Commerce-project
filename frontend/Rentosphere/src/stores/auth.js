const TOKEN_KEY = 'rentosphere_token'
const USER_KEY = 'rentosphere_user'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function loadToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null
}

function loadUser() {
  const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function persistAuth({ token, user, remember }) {
  const storage = remember ? localStorage : sessionStorage
  const other = remember ? sessionStorage : localStorage
  storage.setItem(TOKEN_KEY, token)
  storage.setItem(USER_KEY, JSON.stringify(user))
  // Make sure we don't leave a stale copy in the other storage.
  other.removeItem(TOKEN_KEY)
  other.removeItem(USER_KEY)
}

function clearPersistedAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(USER_KEY)
}

// Small helper so every call talks to the backend the same way and
// surfaces the backend's own error message on failure.
async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.')
  }

  return data
}

export default {
  namespaced: true,

  state: () => ({
    token: loadToken(),
    user: loadUser(),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  mutations: {
    SET_AUTH(state, { token, user }) {
      state.token = token
      state.user = user
    },
    CLEAR_AUTH(state) {
      state.token = null
      state.user = null
    },
  },

  actions: {
    async login({ commit }, { email, password, remember = true }) {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: { email, password },
      })

      persistAuth({ token: data.token, user: data.user, remember })
      commit('SET_AUTH', { token: data.token, user: data.user })
      return data.user
    },

    async register({ commit }, { name, email, password, role, remember = true }) {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: { name, email, password, role },
      })

      persistAuth({ token: data.token, user: data.user, remember })
      commit('SET_AUTH', { token: data.token, user: data.user })
      return data.user
    },

    // Re-fetches the current user's profile from the backend using the
    // stored token — call this on app startup so a returning user's
    // details come from the server, not just whatever was cached locally.
    async fetchProfile({ state, commit }) {
      if (!state.token) return null

      try {
        const data = await apiRequest('/auth/me', { token: state.token })
        commit('SET_AUTH', { token: state.token, user: data.user })
        return data.user
      } catch (err) {
        // Token expired or invalid — log the user out locally.
        clearPersistedAuth()
        commit('CLEAR_AUTH')
        throw err
      }
    },

    logout({ commit }) {
      clearPersistedAuth()
      commit('CLEAR_AUTH')
    },
  },
}