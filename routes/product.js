const express = require('express');
const {
  createNewProductsList,
  addImageItem,
  addVideoItem,
  showVideo,
  showImage,
} = require('../controllers/product');

const isAuth = require('../middlewares/authorization');
const checkUserRole = require('../middlewares/checkRole');

const router = express.Router();

/**
 * @openapi
 * /product:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     schema:
 *       type: integer
 *     example:
 *       name: Lesson
 *       description: 1 hour English lesson
 *       price: 30
 *     description: Add a new product.
 *     responses:
 *       200:
 *         description: New product was added.
 *       400: Bed Request Error
 * /:productId/image/upload:
 *   post:
 *     requestBody:
 *       content:
 *         image/*:
 *           schema:
 *             type: string
 *             format: binary
 *     parameters:
 *     - in: path
 *     name: productId
 *     schema:
 *       type: string
 *     responses:
 *       200:
 *         description: New image has been added.
 * /:productId/video/upload:
 *   post:
 *     requestBody:
 *       content:
 *         video/mp4:
 *           schema:
 *             type: string
 *             format: binary
 *     parameters:
 *     - in: path
 *     name: productId
 *     schema:
 *       type: string
 *     responses:
 *       200:
 *         description: New video has been added.
 * /video/:fileName:
 *   get:
 *     parameters:
 *     - in: path
 *     name: fileName
 *     schema:
 *       type: string
 *     responses:
 *       200:
 *         description: Returns a video file.
 * /image/:fileName:
 *   get:
 *     parameters:
 *     - in: path
 *     name: fileName
 *     schema:
 *       type: string
 *     responses:
 *       200:
 *         description: Returns an image file.
 */

router.post('/', isAuth, checkUserRole('Admin'), createNewProductsList);
router.post(
  '/:productId/image/upload',
  isAuth,
  checkUserRole('Admin'),
  addImageItem
);
router.post(
  '/:productId/video/upload',
  isAuth,
  checkUserRole('Admin'),
  addVideoItem
);
router.get('/video/:fileName', showVideo);
router.get('/image/:fileName', showImage);

module.exports = router;
