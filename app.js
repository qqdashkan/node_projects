const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');

const firstHandler = (req, res) => {
  res.send('Hello customer');
};

app.get('/', firstHandler);
app.use('/products', productsRouter);
app.use('/register', usersRouter);
app.use('/cart', cartRouter);

app.listen(5000, () => console.log('Server was open on port 5000'));
