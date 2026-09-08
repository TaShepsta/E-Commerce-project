const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const OWNER_APPROVED_KEY = "rentosphere-owner-approved";

function markOwnerApproved() {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(OWNER_APPROVED_KEY, "true");
  window.dispatchEvent(
    new CustomEvent("owner-state-changed", { detail: true }),
  );
}

function ensureListingImage(listing) {
  if (!listing || listing.image) {
    return Promise.resolve(listing);
  }

  if (typeof window === "undefined") {
    return Promise.resolve(listing);
  }

  const fileInput = document.getElementById("image");
  const file = fileInput && fileInput.files && fileInput.files[0];

  if (!file) {
    return Promise.resolve(listing);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        ...listing,
        image: reader.result,
        imageAlt: listing.name || file.name,
      });
    };

    reader.onerror = () => {
      reject(new Error("Could not read the uploaded image."));
    };

    reader.readAsDataURL(file);
  });
}

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
  create: async (listing) => {
    const listingWithImage = await ensureListingImage(listing);
    const createdListing = await request("/listings", {
      method: "POST",
      body: JSON.stringify(listingWithImage),
    });

    markOwnerApproved();

    return createdListing;
  },
  update: (id, listing) =>
    request(`/listings/${id}`, {
      method: "PUT",
      body: JSON.stringify(listing),
    }),
  remove: (id) => request(`/listings/${id}`, { method: "DELETE" }),
};

export const earningsApi = {
  get: () => request("/earnings"),
};
