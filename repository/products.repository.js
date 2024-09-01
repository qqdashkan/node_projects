const { products } = require('../storage');

function renderProductsList() {
  return products.map((item) => item.title);
}
function findProductByID(id) {
  return products.find((item) => item.id === +id);
}
module.exports = {
  renderProductsList,
  findProductByID,
};
