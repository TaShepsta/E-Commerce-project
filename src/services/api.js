const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
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
      error.message || `Request failed with status ${response.status}`,
    );
  }

  return response.status === 204 ? null : response.json();
}

export const listingsApi = {
  getAll: () => request("/listings"),
  update: (id, listing) =>
    request(`/listings/${id}`, {
      method: "PUT",
      body: JSON.stringify(listing),
    }),
};

export const earningsApi = {
  get: () => request("/earnings"),
};
