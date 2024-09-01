const { carts, products, orders } = require('../storage');

function findCart(id) {
  return carts.find((item) => item.userId === id);
}

function createCart(id) {
  if (!carts.find((item) => item.userId === id)) {
    const newCart = {
      id: crypto.randomUUID(),
      userId: id,
      products: [],
    };
    carts.push(newCart);
    return newCart;
  }
}

function addProductToCart(id, product) {
  const thisProduct = products.find((item) => item.id === +product);
  const thisCart = findCart(id);
  const newCart = thisCart.products.push(thisProduct);
  return newCart;
}

function setCart(cart, id) {
  const newProductsCart = cart.products.filter((item) => item.id !== +id);
  let newCart = findCart(id);
  newCart = newProductsCart;
  return newCart;
}

function updateOrdersList(newOrder) {
  orders.push(newOrder);
  return newOrder;
}

module.exports = {
  findCart,
  createCart,
  setCart,
  addProductToCart,
  updateOrdersList,
};
