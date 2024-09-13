const express = require('express');
const { addNewUser, logInUser } = require('../controllers/users');

const router = express.Router();

/**
 * @openapi
 * /register:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     schema:
 *       type: string
 *     example:
 *       email: test@gmail.com
 *       password:
 *         type: string
 *         pattern: '^[a-zA-Z0-9._-]{1,254}@[a-zA-Z0-9._-]+.[a-zA-Z]{2,}$'
 *     description: Create new user.
 *     responses:
 *       201:
 *         description: Created.
 *       401:
 *         description: Unauthorized.
 * /login:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     schema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: test@test.com
 *         password:
 *           type: string
 *           example: Test123$321
 *     description: Login.
 *     responses:
 *       201:
 *         description: Success.
 *       401:
 *         description: Unauthorized.
 */

router.post('/register', addNewUser);
router.post('/login', logInUser);

module.exports = router;
