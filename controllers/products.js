const { products } = require('../storage');

const getProductsList = (req, res) => {
  const items = products.map((item) => item.title);
  res.send(items);
};

const getProductByID = (req, res) => {
  const reqID = Number(req.params.productId);
  if (reqID > 10) {
    res.send('Product not found');
  }

  products.forEach((item) => {
    if (item.id === reqID) {
      res.send(item);
    }
  });
};

module.exports = {
  getProductsList,
  getProductByID,
};
