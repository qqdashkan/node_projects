const express = require('express');
const {
  updateCart,
  deleteProductFromCart,
  renderOrder,
} = require('../controllers/cart');

const checkUser = require('../middlewares/checkUser');

const router = express.Router();

router.use(checkUser);
router.put('/:productId', updateCart);
router.delete('/:productId', deleteProductFromCart);
router.post('/checkout', renderOrder);

module.exports = router;
