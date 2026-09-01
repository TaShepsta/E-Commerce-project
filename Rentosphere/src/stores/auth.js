const TOKEN_KEY = 'rentosphere_token'

function loadToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null
}

export default {
  namespaced: true,

  state: () => ({
    token: loadToken(),
    user: null,
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
    async login({ commit }, { email, password, remember }) {
      // Replace with your real auth call, e.g.:
      // const res = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })
      // if (!res.ok) throw new Error('Invalid credentials')
      // const { token, user } = await res.json()

      await new Promise((resolve) => setTimeout(resolve, 900))
      const token = 'demo-token'
      const user = { email }

      if (remember) {
        localStorage.setItem(TOKEN_KEY, token)
      } else {
        sessionStorage.setItem(TOKEN_KEY, token)
      }

      commit('SET_AUTH', { token, user })
    },

    logout({ commit }) {
      localStorage.removeItem(TOKEN_KEY)
      sessionStorage.removeItem(TOKEN_KEY)
      commit('CLEAR_AUTH')
    },
  },
}