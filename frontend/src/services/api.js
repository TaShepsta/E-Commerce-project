const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const OWNER_APPROVED_KEY = "rentosphere-owner-approved";

function markOwnerApproved() {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(OWNER_APPROVED_KEY, "true");
  window.dispatchEvent(
    new CustomEvent("owner-state-changed", { detail: true }),
  );
}

async function request(path, options = {}) {
  const isFormData = options.body instanceof FormData;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: isFormData
        ? options.headers
        : {
            "Content-Type": "application/json",
            ...options.headers,
          },
      ...options,
    });
  } catch {
    throw new Error(
      "Unable to connect to the backend. Start it with npm run backend.",
    );
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message ||
        error.errors?.join(". ") ||
        `Request failed with status ${response.status}`,
    );
  }

  return response.status === 204 ? null : response.json();
}

export const listingsApi = {
  getAll: () => request("/listings"),
  create: async (payload) => {
    const createdListing = await request("/listings", {
      method: "POST",
      body: payload,
    });

    markOwnerApproved();

    return createdListing;
  },
  update: (id, payload) =>
    request(`/listings/${id}`, {
      method: "PUT",
      body: payload,
    }),
  remove: (id) => request(`/listings/${id}`, { method: "DELETE" }),
};

export const earningsApi = {
  get: () => request("/earnings"),
};
