const { NotFoundError } = require('../errorList');
const {
  renderProductsList,
  findProductByID,
} = require('../repository/products.repository');

const getProductsList = (req, res) => {
  const list = renderProductsList();
  res.status(200).send(list);
};

const getProductByID = (req, res) => {
  const { productId } = req.params;
  const item = findProductByID(productId);

  if (!item) {
    throw new NotFoundError(`Product ${productId} not found`);
  }
  res.status(200).send(item);
};

module.exports = {
  getProductsList,
  getProductByID,
};
