const { products, carts } = require('../storage');
const crypto = require('crypto');

function renderCart(id) {
  const newCart = {
    id: crypto.randomUUID(),
    userId: id,
    products: [],
  };
  if (carts.find((item) => item.userId === id)) {
    return;
  }
  carts.push(newCart);
}

function addProductToCart(id, product) {
  const item = products.find((item) => item.id === +product);
  const newCart = carts.find((item) => item.userId === id);
  let arr = newCart.products;
  arr.push(item);
  newCart.products = arr;
}

const getCart = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  const { productId } = req.params;
  renderCart(headerUserId);
  addProductToCart(headerUserId, productId);
  res.send(carts);
};

module.exports = getCart;
