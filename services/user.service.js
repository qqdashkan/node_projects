const crypto = require('crypto');
const { updateUsersList } = require('../repository/users.repository');

function createNewUser({ email, password }) {
  const newUser = {
    id: crypto.randomUUID(),
    email,
    password,
  };
  const user = updateUsersList(newUser);
  delete newUser.password;
  return user;
}

module.exports = {
  createNewUser,
};
