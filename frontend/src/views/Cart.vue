<template>
  <div class="cart-page">
    <h1>Your Cart ({{ CartCount }})</h1>
    <div v-if="cart.items.length === 0">Cart is empty.<router-link to="/browse">Browse products</router-link></div>

    <div v-for="item in cart.items" :key="item.id" class="cart-item">
      <img :src="item.image_url" />
      <div>
        <h3>{{ item.title }}</h3>
        <p>R{{ item.price_per_day }} X {{ item.day }} days X {{ item.qty }} qty</p>
        <p><b>R{{ item.price_per_day * item.days * item.qty }}</b></p>
      </div>
      <button @click="removeFromCart(item.id)">Remove</button>
    </div>
    <h2 v-if="cart.items.lenth">Total: R{{ cartTotal }}</h2>
    <router-link v-if="cart.items.length" to="/checkout" class="btn-primary">Proceed to Checkout</router-link>
  </div>
</template>

<script setup>
import {cart, cartTotal, cartCount, removeFromCart} from '../stores/cart.js';
</script>

<style scoped>
.cart-page {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}
.cart-item {
  display: flex;
  gap: 16px;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
}
.cart-item img {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
}
.btn-primary {
  display: inline-block;
  background: var(--navy);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  margin-top: 16px;
}
</style>