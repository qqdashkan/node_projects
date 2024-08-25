const express = require('express');
const {
  createNewProductsList,
  addImageItem,
  addVideoItem,
  showVideo,
  showImage,
} = require('../controllers/product');

const router = express.Router();

router.post('/', createNewProductsList);
router.post('/:productId/image/upload', addImageItem);
router.post('/:productId/video/upload', addVideoItem);
router.get('/video/:fileName', showVideo);
router.get('/image/:fileName', showImage);

module.exports = router;
