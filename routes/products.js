const express = require('express');
const { getProductsList, getProductByID } = require('../controllers/products');

const isAuth = require('../middlewares/authorization');
const checkUserRole = require('../middlewares/checkRole');

const router = express.Router();

/**
 * @openapi
 * /products:
 *   get:
 *     description: Get products list.
 *     parameters:
 *     - in: cookie
 *     name: token
 *     schema:
 *       type: string
 *     responses:
 *       200:
 *         description: Returns a list of products.
 * /products/:productId:
 *   get:
 *    description: Get a product by ID.
 *    parameters:
 *    - in: path
 *    name: productId
 *    schema:
 *      type: integer
 *    responses:
 *     200:
 *       description: Returns a product.
 *     404:
 *       description: Returns a Not Found Error.
 *
 */

router.get('/', isAuth, checkUserRole('Customer'), getProductsList);
router.get('/:productId', isAuth, checkUserRole('Customer'), getProductByID);

module.exports = router;
