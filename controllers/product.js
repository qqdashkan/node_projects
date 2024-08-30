const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { EventEmitter } = require('events');
const { setImagesList, setVideosList } = require('../services/services');

const eventEmitter = new EventEmitter();
const productsList = 'products.store.json';

const now = new Date();
const today = now.toUTCString().slice(5, 25);

eventEmitter.on('fileUploadFailed', () => {
  const text = `${today} - Error occurred, file upload was failed`;
  const jsonText = JSON.stringify(text);

  fs.appendFile('filesUpload.log', jsonText + '\n', (err) => {
    if (err) {
      console.error(err);
    }
    console.log(text);
  });
});

eventEmitter.on('fileUploadStart', () => {
  const text = `${today} - File upload has started`;
  const jsonText = JSON.stringify(text);

  fs.appendFile('filesUpload.log', jsonText + '\n', (err) => {
    if (err) {
      console.error(err);
    }
    console.log(text);
  });
});

eventEmitter.on('fileUploadEnd', (fileName) => {
  const text = `${today} - File ${fileName} upload has finished`;
  const jsonText = JSON.stringify(text);

  fs.appendFile('filesUpload.log', jsonText + '\n', (err) => {
    if (err) {
      console.error(err);
    }
    console.log(text);
  });
});

const createNewProductsList = (req, res) => {
  const { name, description, price } = req.body;

  const newItem = {
    id: crypto.randomUUID(),
    name,
    description,
    price,
  };

  fs.readFile(productsList, function (err, data) {
    if (err) {
      console.error(err);
    }

    let array = [];

    if (data) {
      array = JSON.parse(data);
    }
    array.push(newItem);

    const jsonData = JSON.stringify(array, null, 2);

    fs.writeFile(productsList, jsonData, (err) => {
      if (err) {
        console.error(err);
      }
      res.status(200).send('OK');
    });
  });
};

const addImageItem = (req, res) => {
  const id = crypto.randomUUID();
  const { productId } = req.params;
  eventEmitter.emit('fileUploadStart');

  fs.readFile(productsList, function (err, data) {
    if (err) {
      console.error(err);
    }

    if (data) {
      const fileName = `${id}.jpg`;
      const filePath = path.join(__dirname, '..', 'media', fileName);
      const streamWrite = fs.createWriteStream(filePath);
      req.pipe(streamWrite);
      0;
      streamWrite.on('finish', () => {
        eventEmitter.emit('fileUploadEnd', fileName);
      });

      streamWrite.on('error', () => {
        eventEmitter.emit('fileUploadFailed', fileName);
        res.status(200).send('OK');
      });
      setImagesList(productId, fileName);
    }
  });
};

const addVideoItem = (req, res) => {
  const id = crypto.randomUUID();
  const { productId } = req.params;
  eventEmitter.emit('fileUploadStart');

  fs.readFile(productsList, function (err, data) {
    if (err) {
      console.error(err);
    }

    if (data) {
      const fileName = `${id}.mp4`;
      const filePath = path.join(__dirname, '..', 'media', fileName);
      const streamWrite = fs.createWriteStream(filePath);
      req.pipe(streamWrite);

      streamWrite.on('finish', () => {
        eventEmitter.emit('fileUploadEnd', fileName);

        streamWrite.on('error', () => {
          eventEmitter.emit('fileUploadFailed', fileName);
          res.status(200).send('OK');
        });
      });
      setVideosList(productId, fileName);
    }
  });
};

const showVideo = (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, '..', 'media', fileName);

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  };
  const stream = fs.createReadStream(filePath);

  res.writeHead(200, head);
  stream.pipe(res);
};

const showImage = (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, '..', 'media', fileName);

  const stream = fs.createReadStream(filePath);

  stream.pipe(res);
};

module.exports = {
  createNewProductsList,
  addImageItem,
  addVideoItem,
  showVideo,
  showImage,
};
