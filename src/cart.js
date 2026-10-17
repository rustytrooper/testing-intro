function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, qty) { 
  const existing = cart.find(item => item.id === product.id);
  if(existing) {
    return cart.map(item => {
      return item.id === product.id ? {...item, quantity: item.quantity + qty} : item;
    })
  }
   return [...cart, { ...product, quantity: qty }];
}
function changeQuantity() { return notImplemented(); }
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
