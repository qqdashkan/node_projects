const fs = require('fs');

function setImagesList(id, pic) {
  fs.readFile('products.store.json', function (err, data) {
    if (err) {
      console.error(err);
    }

    if (data) {
      const array = JSON.parse(data);
      let product = array.find((item) => item.id === id);
      product.photos = product.photos ? product.photos : [];
      product.photos.push(pic);
      const jsonData = JSON.stringify(array, null, 2);
      fs.writeFile('products.store.json', jsonData, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
}

function setVideosList(id, video) {
  fs.readFile('products.store.json', function (err, data) {
    if (err) {
      console.error(err);
    }

    if (data) {
      const array = JSON.parse(data);
      let product = array.find((item) => item.id === id);
      product.videos = product.videos ? product.videos : [];
      product.videos.push(video);
      const jsonData = JSON.stringify(array, null, 2);
      fs.writeFile('products.store.json', jsonData, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
}

module.exports = {
  setImagesList,
  setVideosList,
};
