const { products } = require('../storage');

const getProductsList = (req, res) => {
  const items = products.map((item) => item.title);
  res.status(200).send(items);
};

const getProductByID = (req, res) => {
  const reqID = Number(req.params.productId);
  const item = products.find((item) => item.id === reqID);

  if (!item) {
    res.status(404).json({ err: 'Item not found' });
  } else res.status(200).send(item);
};

module.exports = {
  getProductsList,
  getProductByID,
};
