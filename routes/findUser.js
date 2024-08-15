const express = require('express');
const findUser = require('../controllers/findUser');

const router = express.Router();

router.get('/', findUser);

module.exports = router;
