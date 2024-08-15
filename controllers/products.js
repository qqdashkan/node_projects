const { products } = require('../storage');
const { NotFoundError } = require('../errorList');

const getProductsList = (req, res) => {
  const items = products.map((item) => item.title);
  res.status(200).send(items);
};

const getProductByID = (req, res) => {
  const reqID = Number(req.params.productId);
  const item = products.find((item) => item.id === reqID);

  if (!item) {
    throw new NotFoundError();
  } else res.status(200).send(item);
};

module.exports = {
  getProductsList,
  getProductByID,
};
