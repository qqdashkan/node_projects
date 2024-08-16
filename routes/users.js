const express = require('express');
const { addNewUser, findUser } = require('../controllers/users');

const router = express.Router();

router.post('/', addNewUser);

module.exports = router;
