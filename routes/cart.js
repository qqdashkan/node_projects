const express = require('express');
const {
  updateCart,
  deleteProductFromCart,
  renderOrder,
} = require('../controllers/cart');

const isAuth = require('../middlewares/authorization');
const checkUserRole = require('../middlewares/checkRole');

const router = express.Router();

/**
 * @openapi
 * /cart/:productId:
 *   put:
 *     parameters:
 *     - in: path
 *     name: productId
 *     schema:
 *       type: integer
 *     description: Get current state of cart.
 *     responses:
 *       200:
 *         description: Returns a current cart.
 *   delete:
 *     description: Remove a product from cart.
 *     responses:
 *       200:
 *         description: Returns an updated cart.
 * /cart/checkout:
 *   post:
 *     description: Create new order.
 *     responses:
 *       200:
 *         description: Returns a formed order.
 */

router.put('/:productId', isAuth, checkUserRole('Customer'), updateCart);
router.delete(
  '/:productId',
  isAuth,
  checkUserRole('Customer'),
  deleteProductFromCart
);
router.post('/checkout', isAuth, checkUserRole('Customer'), renderOrder);

module.exports = router;
