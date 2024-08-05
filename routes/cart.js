const express = require('express');
const getCart = require('../controllers/cart');

const router = express.Router();

router.put('/:productId', getCart);

module.exports = router;
