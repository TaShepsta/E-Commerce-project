import { reactive, computed } from 'vue';

function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem('rentosphere_user') || window.sessionStorage.getItem('rentosphere_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getCartKey() {
  const user = getCurrentUser();
  const userId = user?.id ?? 'guest';
  return `rentosphere_cart_${userId}`;
}

function getStoredCart() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(getCartKey()) || '[]');
  } catch {
    return [];
  }
}

function normalizePrice(product) {
  const rawPrice = Number(product.price_per_day ?? product.price ?? 0);
  return Number.isFinite(rawPrice) ? rawPrice : 0;
}

export const cart = reactive({
  items: getStoredCart(),
});

// Flat-rate fee for Rentosphere's own delivery courier. Kept as a single
// source of truth so the Cart summary and Checkout total always match.
export const DELIVERY_FEE = 99;

export function getCartStorageKey() {
  return getCartKey();
}

export function syncCartToUser() {
  const user = getCurrentUser();
  const nextKey = `rentosphere_cart_${user?.id ?? 'guest'}`;
  const stored = JSON.parse(localStorage.getItem(nextKey) || '[]');
  cart.items = Array.isArray(stored) ? stored : [];
}

export function addToCart(product, days = 1, qty = 1) {
  const normalizedPrice = normalizePrice(product);
  const existing = cart.items.find((i) => i.id === product.id);

  if (existing) {
    existing.days = days;
    existing.qty = qty;
    existing.price_per_day = normalizedPrice;
    existing.price = normalizedPrice;
  } else {
    cart.items.push({
      ...product,
      price_per_day: normalizedPrice,
      price: normalizedPrice,
      days,
      qty,
    });
  }

  save();
}

export function updateCartItem(id, changes) {
  const item = cart.items.find((i) => i.id === id);
  if (!item) return;
  if (changes.days !== undefined) item.days = Math.max(1, Number(changes.days) || 1);
  if (changes.qty !== undefined) item.qty = Math.max(1, Number(changes.qty) || 1);
  const normalizedPrice = normalizePrice(item);
  item.price_per_day = normalizedPrice;
  item.price = normalizedPrice;
  save();
}

export function removeFromCart(id) {
  cart.items = cart.items.filter((i) => i.id !== id);
  save();
}

export function clearCart() {
  cart.items = [];
  save();
}

export const cartTotal = computed(() =>
  cart.items.reduce((sum, i) => {
    const price = Number(i.price_per_day ?? i.price ?? 0);
    return sum + (price * Number(i.days || 1) * Number(i.qty || 1));
  }, 0)
);

export const cartCount = computed(() =>
  cart.items.reduce((sum, i) => sum + Number(i.qty || 1), 0)
);

export const cartGrandTotal = computed(() =>
  cart.items.length ? cartTotal.value + DELIVERY_FEE : 0
);

function save() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(getCartKey(), JSON.stringify(cart.items));
}