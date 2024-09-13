require('dotenv').config();
const PORT = process.env.PORT;

const cors = require('cors');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());

const errorHandler = require('./middlewares/errorHandler');
const { updateUsersList } = require('./repository/users.repository');

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const productRouter = require('./routes/product');

(async function () {
  const password = 'admin123';
  const hashPassword = await bcrypt.hash(password, 10);
  updateUsersList({
    id: crypto.randomUUID(),
    email: 'admin@test.com',
    password: hashPassword,
    role: 'Admin',
  });
})();

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My First Store API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.status(200).send('Hello User');
});
app.use('/products', productsRouter);
app.use('/signin', usersRouter);
app.use('/cart', cartRouter);
app.use('/check', usersRouter);
app.use('/product', productRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server was open on port ${PORT}`));
