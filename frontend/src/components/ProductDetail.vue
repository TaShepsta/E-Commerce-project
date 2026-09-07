<template>
  <div v-if="product" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <button class="close" @click="$emit('close')">X</button>
      <img :src="product.image_url" class="modal-img"/>
      <h2>{{ product.title }}</h2>
      <p class="badge">{{ product.category }} , {{ product.location }} , {{ product.status }}</p>
      <p>{{ product.description }}</p>
      <h3>R{{ product.price_per_day }}/day</h3>

      <div class="control">
        <label>Days: <input type="number" v-model.number="days" min="1"/></label>
        <label>Qty: <input type="number" v-model.number="qty" min="1"/></label>
      </div>

      <p class="subtotal">Subtotal: R{{ product.price_per_day * days * qty }}</p>

      <div class="actions">
        <button class="btn-primary" @click="handleAdd">Add to Cart</button>
        <button class="btn-secondary" @click="handleRentNow">Rent Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import { addToCart } from '../stores/cart.js';
import Swal from 'sweetalert2';
import { useRouter} from 'vue-router';

const props = defineProps({product: Object});
const emit = defineEmits(['close']);
const router = useRouter();
const days = ref(1);
const qty = ref(1);

function handleAdd() {
  addToCart(props.product, days.value, qty.value)
  Swal.fire('Added!', `${props.product.title} added to cart`, 'success')
  emit('close')
}

function handleRentNow() {
  addToCart(props.product, days.value, qty.value)
  router.push('/cart')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000
}
.modal{
  background:white;
  padding: 24px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  position: relative;
}
.modal-img {
  width:100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
}
.close {
  position: absolute;
  top: 10px;
  right: 12px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer
}
.controls {
  display: flex;
  gap: 16px;
  margin: 12px 0;
}
.controls input {
  width: 60px;
  padding: 4px
}
.actions {
  display: flex;
  gap: 12px;
  margin-top: 16px
}
.btn-primary {
  background: #111;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  flex: 1
}
.btn-secondary {
  border: 1px solid #111;
  padding: 10px 16px;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  flex: 1;
}
.subtotal {
  font-weight: bold;
  margin-top: 8px;
}
.badge {
  font-size: 12px;
  color: #555
}
</style>