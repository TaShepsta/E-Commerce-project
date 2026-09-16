<template>
  <RouterLink :to="`/browse?category=${event.slug}`" class="event-card">
    <div class="event-image">
      <img :src="event.image" :alt="event.name" />
      <span class="event-number">0{{ index + 1 }}</span>
      <span class="card-link">View category</span>
    </div>
    <div class="event-info">
      <h3>{{ event.name }}</h3>
      <p>{{ event.description }}</p>
      <span class="browse-label">Browse rentals</span>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.event-card {
  --paper: #faf6ee;
  --surface: #ffffff;
  --pine: #0b3b2e;
  --pine-deep: #082820;
  --gold: #d99a2b;
  --gold-deep: #b87f1b;
  --line: #e4decf;
  --ink: #17231f;
  --ink-soft: #5e6863;

  display: block;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--ink);
  text-decoration: none;
  background: var(--surface);
  font-family: "Inter", sans-serif;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  border-color: #d7cfba;
  box-shadow: 0 18px 36px rgba(11, 59, 46, 0.12);
}

.event-image {
  height: 220px;
  position: relative;
  overflow: hidden;
  background: var(--paper);
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
.card-link {
  position: absolute;
  z-index: 1;
}

.event-number {
  top: 16px;
  left: 18px;
  color: #fff;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 0.95rem;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.45);
}

.card-link {
  right: 14px;
  bottom: 14px;
  padding: 8px 12px;
  border-radius: 5px;
  color: var(--pine);
  background: var(--surface);
  font-size: 0.72rem;
  font-weight: 700;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.event-card:hover .card-link {
  opacity: 1;
  transform: translateY(0);
}

.event-info {
  padding: 24px;
}

.event-info h3 {
  margin: 0 0 9px;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.35rem;
  color: var(--ink);
}

.event-info p {
  min-height: 48px;
  margin: 0 0 20px;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.55;
}

.browse-label {
  display: inline-flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 6px;
  color: var(--pine-deep);
  background: var(--gold);
  font-size: 0.82rem;
  font-weight: 700;
  transition: background 0.15s ease;
}

.event-card:hover .browse-label {
  background: var(--gold-deep);
}
</style>