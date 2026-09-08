<template>
  <div class="owner-page listings-page">
    <section class="owner-hero">
      <div>
        <p class="eyebrow">OWNER SPACE</p>
        <h1>My <span>listings.</span></h1>
        <p class="intro">
          Keep your rental items up to date and ready for the next person to
          enjoy.
        </p>
      </div>
      <button class="primary-button" type="button" @click="addListing">
        <span aria-hidden="true">+</span> Add a listing
      </button>
    </section>

    <section class="owner-content">
      <div class="section-heading">
        <div>
          <p class="eyebrow">YOUR RENTALS</p>
          <h2>{{ activeListings.length }} items <span>listed.</span></h2>
        </div>
        <p>Manage availability, pricing and the details guests see.</p>
      </div>

      <div
        class="listing-table"
        role="region"
        aria-label="Your rental listings"
      >
        <p v-if="loading">Loading your listings...</p>
        <p v-else-if="loadError">{{ loadError }}</p>
        <ListingCard
          v-else
          v-for="listing in ownerListings"
          :key="listing.id"
          :listing="listing"
          :category="categoryName(listing.category)"
          @view="viewListing"
          @edit="editListing"
          @toggle="toggleListing"
          @delete="deleteListing"
        />
      </div>

      <div
        v-if="editingListing"
        class="edit-modal-backdrop"
        @click.self="closeEditListing"
      >
        <div class="edit-modal" role="dialog" aria-modal="true">
          <div class="modal-header">
            <h3>Edit listing</h3>
            <button type="button" class="close-icon" @click="closeEditListing">
              ×
            </button>
          </div>

          <form class="edit-form" @submit.prevent="saveEditedListing">
            <div class="form-grid">
              <label>
                <span>Title</span>
                <input v-model="editDraft.name" type="text" required />
              </label>

              <label>
                <span>Category</span>
                <select v-model="editDraft.category" required>
                  <option
                    v-for="category in categoryOptions"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </label>

              <label>
                <span>Price per day</span>
                <input
                  v-model.number="editDraft.price"
                  type="number"
                  min="0"
                  required
                />
              </label>

              <label>
                <span>Status</span>
                <select v-model="editDraft.status" required>
                  <option value="Available">Available</option>
                  <option value="Paused">Paused</option>
                </select>
              </label>

              <label class="full-width">
                <span>Location</span>
                <input
                  v-model="editDraft.location"
                  type="text"
                  placeholder="Cape Town"
                />
              </label>

              <label class="full-width">
                <span>Description</span>
                <textarea v-model="editDraft.description" rows="4" />
              </label>
            </div>

            <div class="modal-actions">
              <button
                type="button"
                class="secondary-button"
                @click="closeEditListing"
              >
                Cancel
              </button>
              <button type="submit" class="primary-button">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ListingCard from "../components/ListingCard.vue";
import { eventCategories } from "../data/products";
import { listingsApi } from "../services/api";
import { showToast } from "../utils/notifications";

const router = useRouter();

const ownerListings = ref([]);
const loading = ref(true);
const loadError = ref("");
const editingListing = ref(null);
const editDraft = ref(null);
const categoryOptions = eventCategories.map((category) => category.name);
const activeListings = computed(() =>
  ownerListings.value.filter((listing) => listing.status === "Available"),
);

async function loadListings() {
  loading.value = true;
  loadError.value = "";
  try {
    ownerListings.value = await listingsApi.getAll();
  } catch (error) {
    loadError.value = error.message;
  } finally {
    loading.value = false;
  }
}

function categoryName(slug) {
  return (
    eventCategories.find((category) => category.slug === slug)?.name || slug
  );
}

function addListing() {
  router.push("/become-owner");
}

function viewListing(listing) {
  const message = listing?.name
    ? `Preview for ${listing.name} is now available in the listing details.`
    : "Preview is ready.";

  showToast(message, "info");
}

function editListing(listing) {
  const details = parseListingDetails(listing.description || "");

  editingListing.value = listing;
  editDraft.value = {
    name: listing.name || "",
    category: listing.category || "",
    price: listing.price || 0,
    status: listing.status || "Available",
    location: details.location,
    description: details.description,
  };
}

function closeEditListing() {
  editingListing.value = null;
  editDraft.value = null;
}

function parseListingDetails(description = "") {
  const locationMatch = description.match(/^Location:\s*([^\n]+)/i);
  const cleanDescription = description
    .replace(/^Location:\s*[^\n]+\n\s*/i, "")
    .trim();

  return {
    location: locationMatch ? locationMatch[1].trim() : "",
    description: cleanDescription,
  };
}

async function toggleListing(listing) {
  const status = listing.status === "Paused" ? "Available" : "Paused";

  try {
    const updatedListing = await listingsApi.update(listing.id, {
      ...listing,
      status,
    });

    Object.assign(listing, updatedListing);
    showToast(`${listing.name} is now ${status.toLowerCase()}.`, "success");
  } catch (error) {
    showToast(error.message, "error");
  }
}

async function saveEditedListing() {
  if (!editingListing.value || !editDraft.value) {
    return;
  }

  try {
    const payload = {
      ...editingListing.value,
      ...editDraft.value,
      price: Number(editDraft.value.price),
      priceUnit: editingListing.value.priceUnit || "day",
      status: editDraft.value.status,
      description:
        editDraft.value.location || editDraft.value.description
          ? `Location: ${editDraft.value.location || ""}\n\n${editDraft.value.description || ""}`.trim()
          : editingListing.value.description || "",
    };

    const updatedListing = await listingsApi.update(
      editingListing.value.id,
      payload,
    );

    ownerListings.value = ownerListings.value.map((item) =>
      item.id === updatedListing.id ? updatedListing : item,
    );

    showToast(`${updatedListing.name} was updated successfully.`, "success");
    closeEditListing();
  } catch (error) {
    showToast(error.message, "error");
  }
}

async function deleteListing(listing) {
  try {
    await listingsApi.remove(listing.id);
    ownerListings.value = ownerListings.value.filter(
      (item) => item.id !== listing.id,
    );
    showToast(`${listing.name} was deleted successfully.`, "success");
  } catch (error) {
    showToast(error.message, "error");
  }
}

onMounted(loadListings);
</script>

<style scoped>
.owner-page {
  --green: #0b3b32;
  --ink: #111827;
  --cream: #f7f3ea;
  --gold: #e99b13;
  min-height: 100vh;
  color: var(--ink);
  background: var(--cream);
}
.owner-hero {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 32px;
  padding: 72px 7% 64px;
}
.eyebrow {
  margin: 0 0 12px;
  color: var(--gold);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}
h1,
h2 {
  margin: 0;
  line-height: 0.92;
  letter-spacing: -0.045em;
}
h1 {
  font-size: clamp(3.2rem, 6vw, 5.6rem);
}
h1 span,
h2 span {
  color: var(--gold);
}
.intro {
  max-width: 490px;
  margin: 24px 0 0;
  color: #68717a;
  line-height: 1.65;
}
.primary-button {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 0;
  border-radius: 7px;
  padding: 13px 17px;
  color: white;
  background: var(--green);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
}
.primary-button span {
  font-size: 1.2rem;
  line-height: 0.8;
}
.owner-content {
  padding: 70px 7% 100px;
  background: white;
}
.section-heading {
  max-width: 1180px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 30px;
  margin: 0 auto 36px;
}
h2 {
  font-size: clamp(2.4rem, 4vw, 4rem);
}
.section-heading > p {
  max-width: 350px;
  margin: 0;
  color: #68717a;
  line-height: 1.6;
}
.listing-table {
  max-width: 1180px;
  margin: 0 auto;
  border-top: 1px solid #e4e0d7;
}
.listing-row {
  display: grid;
  grid-template-columns: 88px minmax(180px, 1fr) 120px 110px auto;
  align-items: center;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid #e4e0d7;
}
.listing-row > img {
  width: 88px;
  height: 72px;
  border-radius: 7px;
  object-fit: cover;
}
.listing-details h3 {
  margin: 0 0 5px;
  font-size: 1.08rem;
}
.listing-details p,
.listing-price span {
  margin: 0;
  color: #68717a;
  font-size: 0.82rem;
}
.listing-price strong {
  font-size: 1.15rem;
}
.status {
  width: fit-content;
  padding: 6px 9px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 800;
}
.status.available {
  color: var(--green);
  background: #e8f0e5;
}
.status.paused {
  color: #765315;
  background: #f8edcf;
}
.listing-actions {
  display: flex;
  justify-content: end;
  gap: 8px;
}
.listing-actions button {
  border: 1px solid #d9d5cc;
  border-radius: 5px;
  padding: 8px 10px;
  color: var(--green);
  background: white;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
}
.listing-actions button:hover {
  border-color: var(--green);
}

.edit-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(17, 24, 39, 0.45);
}

.edit-modal {
  width: min(760px, 100%);
  background: white;
  border-radius: 18px;
  border: 1px solid #e4e0d7;
  box-shadow: 0 24px 48px rgba(17, 24, 39, 0.18);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e4e0d7;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.4rem;
}

.close-icon {
  border: none;
  background: transparent;
  color: #111827;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
}

.edit-form {
  padding: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.edit-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #111827;
}

.edit-form label.full-width {
  grid-column: 1 / -1;
}

.edit-form input,
.edit-form select,
.edit-form textarea {
  width: 100%;
  border: 1px solid #d9d5cc;
  border-radius: 8px;
  padding: 11px 12px;
  font: inherit;
  background: white;
  color: #111827;
}

.edit-form textarea {
  resize: vertical;
  min-height: 100px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.secondary-button {
  border: 1px solid #d9d5cc;
  border-radius: 8px;
  padding: 10px 16px;
  background: white;
  color: #0b3b32;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 850px) {
  .owner-hero,
  .section-heading {
    align-items: start;
    flex-direction: column;
  }
  .listing-row {
    grid-template-columns: 76px 1fr auto;
    gap: 14px;
  }
  .listing-row > img {
    width: 76px;
    height: 64px;
  }
  .listing-price,
  .status {
    grid-column: 2;
  }
  .listing-actions {
    grid-column: 3;
    grid-row: 1 / span 2;
    flex-direction: column;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 520px) {
  .owner-hero,
  .owner-content {
    padding-right: 5%;
    padding-left: 5%;
  }
  .listing-row {
    grid-template-columns: 64px 1fr;
  }
  .listing-row > img {
    width: 64px;
    height: 58px;
  }
  .listing-price,
  .status,
  .listing-actions {
    grid-column: 2;
    grid-row: auto;
  }
  .listing-actions {
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
  }
}
</style>
