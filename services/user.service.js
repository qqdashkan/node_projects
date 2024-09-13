const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { updateUsersList, getUser } = require('../repository/users.repository');

async function createNewUser({ email, password }) {
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = updateUsersList({
    id: crypto.randomUUID(),
    email,
    password: hashPassword,
  });

  return {
    email: newUser.email,
    id: newUser.id,
  };
}

async function findUserByData({ email, password }) {
  const user = await getUser(email, password);

  if (user.role === 'Admin') {
    return jwt.sign({ role: 'Admin' }, process.env.SECRET_KEY);
  }
  return jwt.sign({ role: 'Customer' }, process.env.SECRET_KEY);
}

module.exports = {
  findUserByData,
  createNewUser,
};
