<template>
  <div class="checkout">
    <h1>Checkout - R{{ cartTotal }}</h1>

    <h3>1. Delivery Details</h3>
    <input v-model="form.name" placeholder="Full Name"/>
    <input v-mode="form.phone" placeholder="Phone"/>
    <input v-model="form.address" placeholder="Address"/>

    <h3>2. Payment Method</h3>
    <div class="payments">
      <label><input type="radio" v-model="form.payment" value="PayFast"/>PayFast (Card/ EFT)</label>
      <label><input type="radio" v-model="form.payment" value="Ozow"/>Ozow Instant EFT</label>
      <label><input type="radio" v-model="form.payment" value="EFT"/>Manual EFT</label>
      <label><input type="radio" v-model="form.payment" value="Cash"/>Cash on Collection-Cape Town</label>
    </div>

    <div v-if="form.payment ==='EFT'" class="eft-box">
      <p>Bank: Nedbank <br>Account: ********9<br>Ref: Your Name + Order ID</p>
    </div>
    <button class="btn-primary" @click="placeOrder">Pay R{{ cartTotal }} & Confirm Booking</button>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
import {cart, cartTotal, clearCart} from '../stores/cart.js';
import Swal from 'sweetalert2';
import {useRouter} from 'vue-router';

const router = useRouter();
const form = reactive({name: '', phone:'', address:'', payment:'PayFast'});

function placeOrder() {
  if(!form.name || !form.phone) {
    Swal.fire('Missing info', 'Please fill in the neccessary info', 'warning')
    return
  }
  fetch('http://localhost/api/orders', {method:'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify({items: cart.items, ...form, total: cartTotal.value})})

  Swal.fire('Booking Confirmed!', `Total R${cartTotal.value} via ${form.payment}. Owner will contact you.`, 'success')
  clearCart()
  router.push('/browse')
}
</script>

<style scoped>
.checkout {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.payments {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 8px;
}
.eft-box {
  background: #f6f6f6;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
}
.btn-primary {
  background: var(--navy);
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 12px;
}
</style>