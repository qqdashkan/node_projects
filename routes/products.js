const express = require('express');
const { getProductsList, getProductByID } = require('../controllers/products');

const router = express.Router();

router.get('/', getProductsList);
router.get('/:productId', getProductByID);

module.exports = router;
