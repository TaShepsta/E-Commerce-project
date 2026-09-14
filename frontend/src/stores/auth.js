const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const TOKEN_KEY = "rentosphere_token";
const USER_KEY = "rentosphere_user";

function readStorage(key) {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key) || window.sessionStorage.getItem(key) || null;
}

function getStoredToken() {
  return readStorage(TOKEN_KEY);
}

function getStoredUser() {
  const raw = readStorage(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function persist(token, user, remember = true) {
  if (typeof window === "undefined") return;
  const storage = remember ? window.localStorage : window.sessionStorage;
  storage.setItem(TOKEN_KEY, token);
  storage.setItem(USER_KEY, JSON.stringify(user));
}

function clearPersisted() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.removeItem(USER_KEY);
}

async function request(path, options = {}) {
  const token = getStoredToken();

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Unable to connect to the backend. Start it with npm run backend.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.errors?.join(". ") || `Request failed with status ${response.status}`);
  }

  return data;
}

export default {
  namespaced: true,

  state: () => ({
    token: getStoredToken(),
    user: getStoredUser(),
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    isOwner: (state) => state.user?.role === "owner",
  },

  mutations: {
    SET_AUTH(state, { token, user, remember = true }) {
      state.token = token;
      state.user = user;
      persist(token, user, remember);
    },
    CLEAR_AUTH(state) {
      state.token = null;
      state.user = null;
      clearPersisted();
    },
  },

  actions: {
    async login({ commit }, { email, password, remember = true }) {
      const data = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      commit("SET_AUTH", { token: data.token, user: data.user, remember });

      return data.message || "Logged in successfully.";
    },

    async register({ commit }, { name, email, password, role }) {
      const data = await request("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
      });

      commit("SET_AUTH", { token: data.token, user: data.user, remember: true });

      return data.message || "Account created successfully.";
    },

    async forgotPassword(_context, { email }) {
      const data = await request("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      return data.message;
    },

    async resetPassword(_context, { token, password }) {
      const data = await request("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });

      return data.message;
    },

    logout({ commit }) {
      commit("CLEAR_AUTH");
    },
  },
};
