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
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import ListingCard from "../components/ListingCard.vue";
import { eventCategories } from "../data/products";
import { listingsApi } from "../services/api";
import { showToast } from "../utils/notifications";

const ownerListings = ref([]);
const loading = ref(true);
const loadError = ref("");
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
  showToast(
    "Listing creation will connect to your owner profile soon.",
    "info",
  );
}

function viewListing(name) {
  showToast(`Preview for ${name} is coming soon.`, "info");
}

function editListing(name) {
  showToast(`Editing ${name} is coming soon.`, "info");
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
