const products = require('../src/data/products');

function addToCart(cart, product, qty) { 
  const existing = cart.find(item => item.id === product.id);
  if (qty === 0) {
    throw new RangeError('Quantity must be higher than 0');
  }
  if(existing) {
    return cart.map(item => {
      return item.id === product.id ? {...item, quantity: item.quantity + qty} : item;
    })
  }

  for(let i=0; i < products.length; i++) {
    if(product.id === products[i].id && qty > products[i].stock) {
      throw new RangeError('You added more products than we have in stock. Please try to chose less quantity');
    }
  }

   return [...cart, { ...product, quantity: qty }];
}
function changeQuantity(cart, startQty, endQty) { 
  const updatedCart =[];
  if (endQty === 0) {
    throw new RangeError('Quantity must be higher than 0');
  }
    for(let i = 0; i < cart.length; i++) {
      if (endQty > cart[i].stock){
         throw new RangeError('You added more products than we have in stock. Please try to chose less quantity');
      }
      cart[i].quantity = endQty;
      updatedCart.push(cart[i]);
    }
  return updatedCart;
 }
function removeFromCart(cart, productPosition) {
  const filteredCart = cart.filter(product => product.id !== productPosition);
  return filteredCart;
 }
function calculateCartSubtotal(cart) {
  let totalSubtotal = 0;
  if (cart.length === 0) {
    return 0;
  }
  for(let i = 0; i < cart.length; i++) {
    totalSubtotal += cart[i].price * cart[i].quantity;
  }
  return totalSubtotal;
 }
function calculateOrderTotal(cart, promo) { 
  let delivery = 30000;
  for(let i = 0; i < cart.length; i ++) {
    const subTotal =  cart[i].price * cart[i].quantity;
    const discountTotal = subTotal * 0.1;
    if (subTotal >= 50000 && !promo) {
      delivery = 0;
    }
    if (promo !== 'SAVE10') {
      return {subtotal: subTotal, discount: 0, delivery, total: subTotal + delivery};
    }
    if (cart.length < 2 && !promo) {
      return {subtotal: subTotal, discount: 0, delivery, total: subTotal + delivery};
    }
    if (subTotal < 20000 && promo) {
      return {subtotal: subTotal, discount: 0, delivery, total: subTotal + delivery};
    }
    if (subTotal > 20000 && promo) {
      return {subtotal: subTotal, discount: discountTotal, delivery, total: (subTotal - discountTotal) + delivery};
    }
   
  }
 }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
