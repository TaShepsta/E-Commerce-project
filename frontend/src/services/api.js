const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const TOKEN_KEY = "rentosphere_token";


function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    window.localStorage.getItem(TOKEN_KEY) ||
    window.sessionStorage.getItem(TOKEN_KEY)
  );
}



async function request(path, options = {}) {
  const token = getToken();

  const isFormData =
    typeof FormData !== "undefined" &&
    options.body instanceof FormData;

  const headers = {
    ...(isFormData
      ? {}
      : {
          "Content-Type": "application/json",
        }),

    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),

    ...(options.headers || {}),
  };

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("API connection error:", error);

    throw new Error(
      "Unable to connect to the backend. Make sure the backend is running on port 5000.",
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.errors?.join(". ") ||
        `Request failed with status ${response.status}`,
    );
  }

  return response.status === 204 ? null : data;
}



export const productsApi = {
  // Get all safety-verified products
  getAll: () => request("/products"),

  // Get one safety-verified product
  getById: (id) => request(`/products/${id}`),
};



export const listingsApi = {
  // Public listings
  getPublic: () => request("/listings"),

  // Logged-in owner's listings
  getMine: () => request("/listings/mine"),

  // Create owner listing
  create: (payload) =>
    request("/listings", {
      method: "POST",
      body: payload,
    }),

  // Update owner listing
  update: (id, payload) => {
    if (payload instanceof FormData) {
      return request(`/listings/${id}`, {
        method: "PUT",
        body: payload,
      });
    }

    return request(`/listings/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  // Delete owner listing
  remove: (id) =>
    request(`/listings/${id}`, {
      method: "DELETE",
    }),
};


export const earningsApi = {
  // Logged-in owner's earnings
  get: () => request("/earnings"),
};

export const ownerApplicationApi = {
  submit: (payload) =>
    request("/owner-applications", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getMine: () => request("/owner-applications/me"),

  listAll: (status) =>
    request(status ? `/owner-applications?status=${status}` : "/owner-applications"),

  approve: (id) =>
    request(`/owner-applications/${id}/approve`, { method: "PATCH" }),

  reject: (id) =>
    request(`/owner-applications/${id}/reject`, { method: "PATCH" }),
};