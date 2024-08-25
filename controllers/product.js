const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { EventEmitter } = require('events');
const { setImagesList, setVideosList } = require('../services/services');

const eventEmitter = new EventEmitter();

const now = new Date();
const today = now.toUTCString().slice(5, 25);

eventEmitter.on('fileUploadFailed', () => {
  const text = `${today} - Error occurred, file upload was failed`;

  fs.readFile('filesUpload.log', function (err, data) {
    if (err) {
      console.error(err);
    }

    let array = [];

    if (data) {
      array = JSON.parse(data);
    }
    array.push(text);
    const jsonText = JSON.stringify(array, null, 2);

    fs.writeFile('filesUpload.log', jsonText, (err) => {
      if (err) {
        console.error(err);
      }
      console.log(text);
    });
  });
});

eventEmitter.on('fileUploadStart', () => {
  const text = `${today} - File upload has started`;

  fs.readFile('filesUpload.log', function (err, data) {
    if (err) {
      console.error(err);
    }

    let array = [];

    if (data) {
      array = JSON.parse(data);
    }
    array.push(text);
    const jsonText = JSON.stringify(array, null, 2);

    fs.writeFile('filesUpload.log', jsonText, (err) => {
      if (err) {
        console.error(err);
      }
      console.log(text);
    });
  });
});

eventEmitter.on('fileUploadEnd', (fileName) => {
  const text = `${today} - File ${fileName} upload has finished`;

  fs.readFile('filesUpload.log', function (err, data) {
    if (err) {
      console.error(err);
    }

    let array = [];

    if (data) {
      array = JSON.parse(data);
    }
    array.push(text);
    const jsonText = JSON.stringify(array, null, 2);

    fs.writeFile('filesUpload.log', jsonText, (err) => {
      if (err) {
        console.error(err);
      }
      console.log(text);
    });
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

  fs.readFile('products.store.json', function (err, data) {
    if (err) {
      console.error(err);
    }

    let array = [];

    if (data) {
      array = JSON.parse(data);
      console.log(array);
    }
    array.push(newItem);

    const jsonData = JSON.stringify(array, null, 2);

    fs.writeFile('products.store.json', jsonData, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('OK');
    });
  });
};

const addImageItem = (req, res) => {
  const id = crypto.randomUUID();
  const { productId } = req.params;
  eventEmitter.emit('fileUploadStart');
  console.log(req.body);

  fs.readFile('products.store.json', function (err, data) {
    if (err) {
      console.error(err);
    }

    if (data) {
      const fileName = `${id}.jpg`;
      const filePath = path.join(__dirname, '..', 'media', fileName);
      const streamWrite = fs.createWriteStream(filePath);
      req.pipe(streamWrite);
      0;
      streamWrite.on('end', () => {
        eventEmitter.emit('fileUploadEnd', fileName);
      });

      streamWrite.on('error', () => {
        eventEmitter.emit('fileUploadFailed', fileName);
      });
      setImagesList(productId, fileName);
    }
  });
  res.status(200).send('OK');
};

const addVideoItem = (req, res) => {
  const id = crypto.randomUUID();
  const { productId } = req.params;
  eventEmitter.emit('fileUploadStart');

  fs.readFile('products.store.json', function (err, data) {
    if (err) {
      console.error(err);
    }

    if (data) {
      const fileName = `${id}.mp4`;
      const filePath = path.join(__dirname, '..', 'media', fileName);
      const streamWrite = fs.createWriteStream(filePath);
      req.pipe(streamWrite);

      streamWrite.on('end', () => {
        eventEmitter.emit('fileUploadEnd', fileName);

        streamWrite.on('error', () => {
          eventEmitter.emit('fileUploadFailed', fileName);
        });
      });
      setVideosList(productId, fileName);
    }
  });
  res.status(200).send('OK');
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
