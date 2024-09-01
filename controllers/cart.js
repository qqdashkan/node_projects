const {
  findCart,
  createCart,
  setCart,
  addProductToCart,
} = require('../repository/cart.repository');
const {
  createNewOrder,
  getTotalPriceOfOrder,
} = require('../services/cart.service');

const updateCart = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  const { productId } = req.params;
  createCart(headerUserId);
  addProductToCart(headerUserId, productId);
  const updatedCart = findCart(headerUserId);

  res.status(200).send(updatedCart);
};

const deleteProductFromCart = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  const { productId } = req.params;
  let thisCart = findCart(headerUserId);
  const newCart = setCart(thisCart, productId);

  res.status(200).send(newCart);
};

const renderOrder = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  const { products } = findCart(headerUserId);

  const totalPrice = getTotalPriceOfOrder(products);
  const newOrder = createNewOrder(headerUserId, products, totalPrice);

  res.status(200).send(newOrder);
};

module.exports = {
  updateCart,
  deleteProductFromCart,
  renderOrder,
};
