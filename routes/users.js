const express = require('express');
const { addNewUser, findUser } = require('../controllers/users');

const router = express.Router();

router.post('/', addNewUser);
router.get('/', findUser);

module.exports = router;
