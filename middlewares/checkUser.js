const { Unauthorized } = require('../errorList');
const { users } = require('../storage');

const checkUser = (req, res, next) => {
  const headerUserId = req.headers['x-user-id'];
  if (users.find((item) => item.id !== headerUserId)) {
    throw new Unauthorized();
  }
  next();
};

module.exports = checkUser;
