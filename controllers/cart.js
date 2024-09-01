const { products, carts, orders } = require('../storage');
const crypto = require('crypto');

function createCart(id) {
  if (!carts.find((item) => item.userId === id)) {
    const cart = {
      id: crypto.randomUUID(),
      userId: id,
      products: [],
    };
    carts.push(cart);
  }
}

function addProductToCart(id, product) {
  const thisProduct = products.find((item) => item.id === +product);
  const thisCart = carts.find((item) => item.userId === id);
  thisCart.products.push(thisProduct);
}

const updateCart = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  const { productId } = req.params;
  createCart(headerUserId);
  addProductToCart(headerUserId, productId);

  res.status(200).send(carts);
};

const deleteProductFromCart = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  const { productId } = req.params;
  const thisCart = carts.find((item) => item.userId === headerUserId);
  thisCart.products.filter((item) => item.id !== +productId);

  res.status(200).send(carts);
};

const renderOrder = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  const { products: list } = carts.find((item) => item.userId === headerUserId);
  const totalPrice = list.reduce((sum, product) => sum + product.price, 0);

  const newOrder = {
    id: crypto.randomUUID(),
    userId: headerUserId,
    products: list,
    totalPrice,
  };

  orders.push(newOrder);
  res.status(200).send(orders);
};

module.exports = {
  updateCart,
  deleteProductFromCart,
  renderOrder,
};
