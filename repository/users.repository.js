const bcrypt = require('bcrypt');
const { users } = require('../storage');
const { ValidationError } = require('../errorList');

function updateUsersList(newUser) {
  users.push(newUser);
  return newUser;
}

async function getUser(email, password) {
  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new ValidationError('User not found');
  }
  const pass = await bcrypt.compare(password, user.password);
  if (!pass) {
    throw new ValidationError('Invalid password');
  }
  return user;
}

module.exports = {
  getUser,
  updateUsersList,
};
