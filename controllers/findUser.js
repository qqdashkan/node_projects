const { users } = require('../storage');
const { Unauthorized } = require('../errorList');

const findUser = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  if (users.find((item) => item.id !== headerUserId)) {
    throw new Unauthorized();
  } else res.status(200).send('User required');
};

module.exports = findUser;
