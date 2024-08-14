const express = require('express');
const findUser = require('../controllers/signin');

const router = express.Router();

router.get('/', findUser);

module.exports = router;
