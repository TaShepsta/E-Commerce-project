import {reactive, computed} from 'vue';

export const cart = reactive ({
  items: JSON.parse(localStorage.getItem('rentosphere_cart')|| '[]')
})

export function addToCart(product, days = 1, qty = 1) {
  const existing = cart.items.find(i => i.id === product.id)
  if(existing) {
    existing.days = days
    existing.qty = qty
  } else {
    cart.items.push({...product, days, qty})
  }
  save()
}

export function removeFromCart(id) {
  cart.items = cart.items.filter(i => i.id !== id)
  save()
}

export function clearCart() {
  cart.items = []
  save()
}

export const cartTotal = computed(() =>
  cart.items.reduce((sum, i) => sum + (i.price_per_day * i.days * i.qty), 0)
)

export const cartCount = computed(() =>
  cart.items.reduce((sum, i) => sum + i.qty, 0)
)

function save() {
  localStorage.setItem('rentosphere_cart', JSON.stringify(cart.items))
}