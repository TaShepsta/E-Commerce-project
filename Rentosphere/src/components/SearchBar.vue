<script setup>
import { ref } from 'vue'

const location = ref('')
const category = ref('')
const rentalDates = ref('')

const emit = defineEmits(['search'])

function handleSearch() {
  emit('search', {
    location: location.value,
    category: category.value,
    rentalDates: rentalDates.value
  })
}
</script>

<template>
  <section class="search-section">

    <div class="search-bar">

      <!-- Location -->
      <div class="search-field location-field">

        <div class="field-icon">
          📍
        </div>

        <div class="field-content">
          <label>Enter location</label>

          <input
            v-model="location"
            type="text"
            placeholder="Cape Town, Western Cape"
          />
        </div>

      </div>


      <!-- Category -->
      <div class="search-field">

        <div class="field-icon">
          🏷️
        </div>

        <div class="field-content">
          <label>All Categories</label>

          <select v-model="category">
            <option value="">
              Select category
            </option>

            <option value="trailers">
              Trailers
            </option>

            <option value="equipment">
              Equipment
            </option>

            <option value="tools">
              Tools
            </option>

            <option value="appliances">
              Appliances
            </option>

            <option value="event-equipment">
              Event Equipment
            </option>

            <option value="gas-tanks">
              Gas Tanks
            </option>

            <option value="other">
              Other
            </option>
          </select>
        </div>

      </div>


      <!-- Rental Dates -->
      <div class="search-field">

        <div class="field-icon">
          📅
        </div>

        <div class="field-content">
          <label>Select dates</label>

          <input
            v-model="rentalDates"
            type="text"
            placeholder="Choose rental dates"
            onfocus="this.type='date'"
          />
        </div>

      </div>


      <!-- Search Button -->
      <button
        class="search-button"
        @click="handleSearch"
      >
        <span class="search-icon">⌕</span>
        <span>Search</span>
      </button>

    </div>

  </section>
</template>


<style scoped>

.search-section {
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
}

.search-bar {
  width: 100%;
  max-width: 1350px;

  min-height: 70px;

  margin: 0 auto;

  background: #ffffff;

  border: 1px solid #dcdcdc;
  border-radius: 14px;

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

  display: grid;
  grid-template-columns: 1.25fr 1fr 1.1fr auto;

  overflow: hidden;
}


/* =========================
   SEARCH FIELD
========================= */

.search-field {
  min-height: 70px;

  padding: 0 20px;

  display: flex;
  align-items: center;

  gap: 13px;

  border-right: 1px solid #dedede;

  background: #ffffff;

  transition: background 0.2s ease;
}

.search-field:hover {
  background: #fafafa;
}


/* =========================
   ICON
========================= */

.field-icon {
  width: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
}


/* =========================
   CONTENT
========================= */

.field-content {
  min-width: 0;

  display: flex;
  flex-direction: column;

  flex: 1;
}

.field-content label {
  margin-bottom: 4px;

  font-size: 11px;
  font-weight: 600;

  color: #555555;
}

.field-content input,
.field-content select {
  width: 100%;

  padding: 0;

  border: none;
  outline: none;

  background: transparent;

  font-family: inherit;

  font-size: 13px;
  font-weight: 500;

  color: #111111;

  cursor: pointer;
}

.field-content input::placeholder {
  color: #555555;
}


/* Remove default select styling */

.field-content select {
  appearance: none;
  -webkit-appearance: none;

  background-image:
    linear-gradient(45deg, transparent 50%, #333 50%),
    linear-gradient(135deg, #333 50%, transparent 50%);

  background-position:
    calc(100% - 8px) 50%,
    calc(100% - 3px) 50%;

  background-size:
    5px 5px,
    5px 5px;

  background-repeat: no-repeat;

  padding-right: 20px;
}


/* =========================
   SEARCH BUTTON
========================= */

.search-button {
  min-width: 165px;

  border: none;

  background: #f2a900;

  color: #111111;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  padding: 0 30px;

  font-family: inherit;

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.search-button:hover {
  background: #e29c00;
}

.search-button:active {
  transform: scale(0.98);
}

.search-icon {
  font-size: 24px;
  line-height: 1;
}


/* =========================
   TABLET
========================= */

@media (max-width: 1000px) {

  .search-section {
    padding: 0 30px;
  }

  .search-bar {
    grid-template-columns: 1fr 1fr;
  }

  .search-field {
    border-bottom: 1px solid #dedede;
  }

  .search-button {
    min-height: 65px;

    grid-column: span 2;
  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

  .search-section {
    padding: 0 20px;
  }

  .search-bar {
    display: flex;
    flex-direction: column;

    border-radius: 12px;
  }

  .search-field {
    min-height: 65px;

    border-right: none;
    border-bottom: 1px solid #dedede;
  }

  .search-button {
    min-height: 60px;

    width: 100%;
  }

}

</style>