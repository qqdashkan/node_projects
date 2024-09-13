const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { EventEmitter } = require('events');
const { BadRequest } = require('../errorList');
const { setImagesList, setVideosList } = require('../services/media.service');

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
    throw new BadRequest(err.message);
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

  eventEmitter.emit('fileUploadStart');

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
        eventEmitter.emit('fileUploadFailed', newItem.name);
      }
      eventEmitter.emit('fileUploadEnd', newItem.name);
      res.status(200).send('New product has been added');
    });
  });
};

const addImageItem = (req, res) => {
  const id = crypto.randomUUID();
  const { productId } = req.params;
  eventEmitter.emit('fileUploadStart');

  fs.readFile(productsList, async function (err, data) {
    if (err) {
      console.error(err);
    }

    if (data) {
      const fileName = `${id}.jpg`;
      const filePath = path.join(__dirname, '..', 'media', fileName);
      const streamWrite = fs.createWriteStream(filePath);
      req.pipe(streamWrite);

      const writeFilePromise = () => {
        return new Promise((resolve, reject) => {
          streamWrite.on('finish', () => {
            setVideosList(productId, fileName);
            resolve();
          });

          streamWrite.on('error', (err) => {
            console.error(err.message);
            reject();
          });
        });
      };

      try {
        await writeFilePromise();
        eventEmitter.emit('fileUploadEnd', fileName);
        res.status(200).send('New image has been added');
      } catch (err) {
        eventEmitter.emit('fileUploadFailed', fileName);
        res.status(err.status).send(err.message);
      }
    }
  });
};

const addVideoItem = (req, res) => {
  const id = crypto.randomUUID();
  const { productId } = req.params;
  eventEmitter.emit('fileUploadStart');

  fs.readFile(productsList, async function (err, data) {
    if (err) {
      console.error(err);
    }

    if (data) {
      const fileName = `${id}.mp4`;
      const filePath = path.join(__dirname, '..', 'media', fileName);
      const streamWrite = fs.createWriteStream(filePath);
      req.pipe(streamWrite);

      const writeFilePromise = () => {
        return new Promise((resolve, reject) => {
          streamWrite.on('finish', () => {
            setVideosList(productId, fileName);
            resolve();
          });

          streamWrite.on('error', (err) => {
            console.error(err.message);
            reject();
          });
        });
      };

      try {
        await writeFilePromise();
        eventEmitter.emit('fileUploadEnd', fileName);
        res.status(200).send('New video has been added');
      } catch (err) {
        eventEmitter.emit('fileUploadFailed', fileName);
        res.status(err.status).send(err.message);
      }
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
