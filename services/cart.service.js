const crypto = require('crypto');
const { updateOrdersList } = require('../repository/cart.repository');

function createNewOrder(id, usersCartList, totalPrice) {
  const newOrder = {
    id: crypto.randomUUID(),
    userId: id,
    products: usersCartList,
    totalPrice,
  };
  updateOrdersList(newOrder);
  return newOrder;
}

function getTotalPriceOfOrder(productsList) {
  return productsList.reduce((sum, product) => sum + product.price, 0);
}

module.exports = {
  createNewOrder,
  getTotalPriceOfOrder,
};
