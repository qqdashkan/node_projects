const { products, carts, orders } = require('../storage');
const crypto = require('crypto');

function renderCart(id) {
  if (carts.find((item) => item.userId === id)) {
    return;
  } else {
    const cart = {
      id: crypto.randomUUID(),
      userId: id,
      products: [],
    };
    carts.push(cart);
  }
}

function setCartToStorage(id, cart) {
  let cartFromStorage = carts.find((item) => item.userId === id);
  cartFromStorage = cart;
}

function addProductToCart(id, product) {
  const thisProduct = products.find((item) => item.id === +product);
  const thisCart = carts.find((item) => item.userId === id);
  const arrOfProducts = thisCart.products;
  arrOfProducts.push(thisProduct);
  thisCart.products = arrOfProducts;

  setCartToStorage(id, thisCart);
}

const updateCart = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  const { productId } = req.params;
  renderCart(headerUserId);
  addProductToCart(headerUserId, productId);
  res.send(carts);
};

const deleteProductFromCart = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  const { productId } = req.params;
  const { products } = carts.find((item) => item.userId === headerUserId);

  const thisCart = carts.find((item) => item.userId === headerUserId);
  thisCart.products = products.filter((item) => item.id !== +productId);

  setCartToStorage(headerUserId, thisCart);
  res.send(carts);
};

const renderOrder = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  const { products: list } = carts.find((item) => item.userId === headerUserId);

  const listOfProducts = list.map((item) => Number(item.price));
  let totalPrice = listOfProducts.reduce((sum, current) => sum + current);

  const newOrder = {
    id: crypto.randomUUID(),
    userId: headerUserId,
    products: list,
    totalPrice,
  };

  orders.push(newOrder);
  res.send(orders);
};

module.exports = {
  updateCart,
  deleteProductFromCart,
  renderOrder,
};
