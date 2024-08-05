const crypto = require('crypto');
const storage = require('../storage');
const { users } = storage;

const addNewUser = (req, res) => {
  const { email } = req.body;
  const newUser = {
    id: crypto.randomUUID(),
    email,
  };
  users.push(newUser);
  res.json(newUser);
};

module.exports = addNewUser;
