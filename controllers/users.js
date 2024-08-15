const crypto = require('crypto');
const { users } = require('../storage');
const { Unprocessable, Unauthorized } = require('../errorList');

const addNewUser = (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    throw new Unprocessable('Provide valid email');
  }

  if (!validatePassword(password)) {
    throw new Unprocessable('Provide valid password');
  }

  const newUser = {
    id: crypto.randomUUID(),
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

const findUser = (req, res) => {
  const headerUserId = req.headers['x-user-id'];
  if (users.find((item) => item.id !== headerUserId)) {
    throw new Unauthorized();
  } else res.status(200).send('User required');
};

function validateEmail(email) {
  const emailValid = /^[a-zA-Z0-9._-]{1,254}@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
  return emailValid.test(email);
}

function validatePassword(password) {
  const passwordValid =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordValid.test(password);
}

module.exports = {
  addNewUser,
  findUser,
};
