const jwt = require('jsonwebtoken');
const { ValidationError } = require('../errorList');
const { getUser } = require('../repository/users.repository');

const authenticate = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    console.log('here 1');

    throw new ValidationError('No token provided');
  }

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  req.userRole = decodedToken.role;

  /*   const { email, password } = req.body;
  const user = await getUser(email, password);

  if (!user) {
    console.log('here 1');
    throw new ValidationError('User not defined');
  } */
  next();
};

module.exports = authenticate;
