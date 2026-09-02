<template>
  <div class="categories-page">
    <section class="categories-hero">
      <div class="hero-copy">
        <p class="eyebrow">RENT BY EVENT</p>
        <h1>Everything you need <span>for every occasion.</span></h1>
        <p>
          Find the things you need for your next event, project or special
          occasion without having to buy them.
        </p>
        <label class="hero-search"
          ><span>⌕</span
          ><input
            v-model="searchTerm"
            type="search"
            placeholder="What are you planning?"
            aria-label="Search by event"
        /></label>
      </div>
      <div class="hero-art">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1100&q=85"
          alt="Beautiful event table ready for guests"
        />
        <div class="hero-note">
          <strong>RENT SMARTER.</strong
          ><small>Own less. Experience more.</small>
        </div>
      </div>
    </section>

    <section id="event-categories" class="event-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">EXPLORE BY EVENT</p>
          <h2>What are you <span>planning?</span></h2>
        </div>
        <p>
          Choose an occasion and discover the items available to make it easier.
        </p>
      </div>
      <div class="event-grid">
        <RouterLink
          v-for="(event, index) in filteredCategories"
          :key="event.slug"
          :to="`/browse?category=${event.slug}`"
          class="event-card"
        >
          <div class="event-image">
            <img :src="event.image" :alt="event.name" /><span
              class="event-number"
              >0{{ index + 1 }}</span
            ><span class="card-link">View category</span>
          </div>
          <div class="event-info">
            <h3>{{ event.name }}</h3>
            <p>{{ event.description }}</p>
            <span class="browse-label">Browse rentals</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="slogan-section">
      <div>
        <p class="eyebrow">THE RENTOSPHERE WAY</p>
        <h2>Find it. <span>Rent it.</span><br />Enjoy it.</h2>
      </div>
      <p class="slogan-note">Local items. Flexible dates. Simple renting.</p>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { eventCategories } from "../data/products";

const searchTerm = ref("");
const filteredCategories = computed(() => {
  const query = searchTerm.value.trim().toLowerCase();
  return query
    ? eventCategories.filter((event) =>
        `${event.name} ${event.description}`.toLowerCase().includes(query),
      )
    : eventCategories;
});
</script>

<style scoped>
.categories-page {
  --green: #0b3b32;
  --ink: #111827;
  --cream: #f7f3ea;
  --gold: #e99b13;
  min-height: 100vh;
  color: var(--ink);
  background: var(--cream);
}
.categories-hero {
  min-height: 510px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 70px;
  padding: 76px 7%;
  background:
    radial-gradient(
      circle at 15% 15%,
      rgba(233, 155, 19, 0.13),
      transparent 32%
    ),
    var(--cream);
  overflow: hidden;
}
.hero-copy {
  max-width: 630px;
}
.eyebrow {
  margin: 0 0 14px;
  color: var(--gold);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}
.hero-copy h1 {
  max-width: 620px;
  margin: 0;
  font-size: clamp(3.3rem, 6vw, 5.8rem);
  line-height: 0.93;
  letter-spacing: -0.045em;
}
.hero-copy h1 span,
h2 span {
  color: var(--gold);
}
.hero-copy > p:not(.eyebrow) {
  max-width: 510px;
  margin: 28px 0;
  color: #59616b;
  font-size: 1.05rem;
  line-height: 1.7;
}
.hero-search {
  width: min(100%, 420px);
  height: 54px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 17px;
  border: 1px solid #dad6cb;
  border-radius: 9px;
  background: white;
}
.hero-search span {
  color: var(--gold);
  font-size: 1.55rem;
}
.hero-search input {
  width: 100%;
  border: 0;
  outline: 0;
  color: var(--ink);
  background: transparent;
  font: inherit;
}
.hero-art {
  width: min(42vw, 500px);
  height: 360px;
  position: relative;
}
.hero-art::before {
  content: "";
  position: absolute;
  inset: 18px -22px -18px 34px;
  border-radius: 50%;
  background: var(--green);
}
.hero-art img {
  position: relative;
  width: 78%;
  height: 300px;
  object-fit: cover;
  border: 10px solid var(--cream);
  border-radius: 170px 170px 16px 16px;
  transform: rotate(4deg);
  box-shadow: 0 22px 42px rgba(17, 24, 39, 0.2);
}
.hero-note {
  position: absolute;
  right: 0;
  bottom: 8px;
  display: grid;
  gap: 6px;
  padding: 23px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 18px 40px rgba(17, 24, 39, 0.13);
}
.hero-note strong {
  color: var(--green);
  font-size: 1.15rem;
  letter-spacing: 0.08em;
}
.hero-note small {
  color: #70757d;
}
.event-section {
  padding: 90px 7%;
  background: white;
}
.section-heading {
  max-width: 1180px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 40px;
  margin: 0 auto 42px;
}
.section-heading h2 {
  margin: 0;
  font-size: clamp(2.7rem, 5vw, 4.8rem);
  line-height: 0.92;
  letter-spacing: -0.04em;
}
.section-heading > p {
  max-width: 390px;
  margin: 0;
  color: #69717b;
  line-height: 1.7;
}
.event-grid {
  max-width: 1180px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
}
.event-card {
  overflow: hidden;
  border: 1px solid #e4e0d7;
  border-radius: 12px;
  color: var(--ink);
  text-decoration: none;
  background: #fbfaf7;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.event-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.12);
}
.event-image {
  height: 220px;
  position: relative;
  overflow: hidden;
}
.event-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.event-card:hover img {
  transform: scale(1.06);
}
.event-number,
.card-arrow {
  position: absolute;
  z-index: 1;
}
.event-number {
  top: 16px;
  left: 17px;
  color: white;
  font-size: 0.78rem;
  font-weight: 800;
  text-shadow: 0 1px 5px #000;
}
.card-arrow {
  top: 14px;
  right: 14px;
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--green);
  background: white;
  font-size: 1.1rem;
}
.event-info {
  padding: 22px;
}
.event-info h3 {
  margin: 0 0 9px;
  font-size: 1.35rem;
}
.event-info p {
  min-height: 48px;
  margin: 0 0 18px;
  color: #68717a;
  font-size: 0.9rem;
  line-height: 1.55;
}
.browse-label {
  display: inline-block;
  padding: 10px 14px;
  border-radius: 7px;
  color: white;
  background: var(--green);
  font-size: 0.82rem;
  font-weight: 800;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}
.event-card:hover .browse-label {
  background: #092f29;
  transform: translateY(-1px);
}
.slogan-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 48px 7%;
  color: var(--ink);
  background: #f2ede2;
}
.slogan-section h2 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 4.6rem);
  line-height: 0.9;
  letter-spacing: -0.045em;
}
.slogan-note {
  max-width: 230px;
  margin: 0;
  color: #68717a;
  line-height: 1.6;
}
.slogan-section .eyebrow {
  color: var(--gold);
}
.primary-button {
  display: inline-flex;
  gap: 15px;
  padding: 14px 19px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  background: var(--green);
  font-weight: 800;
}
@media (max-width: 850px) {
  .categories-hero {
    padding: 60px 5%;
    gap: 35px;
  }
  .hero-art {
    width: 340px;
  }
  .event-section {
    padding: 70px 5%;
  }
  .event-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .slogan-section {
    padding: 55px 5%;
  }
}
@media (max-width: 620px) {
  .categories-hero {
    display: block;
  }
  .hero-art {
    width: 100%;
    height: 300px;
    margin-top: 35px;
  }
  .hero-art img {
    height: 245px;
  }
  .hero-note {
    right: 4%;
  }
  .section-heading {
    display: block;
  }
  .section-heading > p {
    margin-top: 20px;
  }
  .event-grid {
    grid-template-columns: 1fr;
  }
  .event-image {
    height: 235px;
  }
  .slogan-section {
    display: block;
  }
}
</style>
