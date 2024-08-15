require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const errorHandler = require('./middlewares/errorHandler');

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const finderRouter = require('./routes/findUser');

const firstHandler = (req, res) => {
  res.send('Hello customer').status(200);
};

app.get('/', firstHandler);
app.use('/products', productsRouter);
app.use('/register', usersRouter);
app.use('/cart', cartRouter);
app.use('/check', finderRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server was open on port ${PORT}`));
