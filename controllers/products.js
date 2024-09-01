const { products } = require('../storage');
const { NotFoundError } = require('../errorList');

const getProductsList = (req, res) => {
  const items = products.map((item) => item.title);
  res.status(200).send(items);
};

const getProductByID = (req, res) => {
  const { productId } = req.params;
  const item = products.find((item) => item.id === productId);

  if (!item) {
    throw new NotFoundError(`Product ${productId} not found`);
  } else res.status(200).send(item);
};

module.exports = {
  getProductsList,
  getProductByID,
};
