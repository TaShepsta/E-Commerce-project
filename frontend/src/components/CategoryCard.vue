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
  overflow: hidden;
  border: 1px solid #e4e0d7;
  border-radius: 12px;
  color: #111827;
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
.card-link {
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
.card-link {
  right: 14px;
  bottom: 14px;
  padding: 8px 10px;
  border-radius: 4px;
  color: #0b3b32;
  background: white;
  font-size: 0.72rem;
  font-weight: 800;
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
  background: #0b3b32;
  font-size: 0.82rem;
  font-weight: 800;
}
</style>
