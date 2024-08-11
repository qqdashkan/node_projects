const express = require('express');
const {
  updateCart,
  deleteProductFromCart,
  renderOrder,
} = require('../controllers/cart');

const router = express.Router();

router.put('/:productId', updateCart);
router.delete('/:productId', deleteProductFromCart);
router.post('/checkout', renderOrder);

module.exports = router;
