const Joi = require('joi');
const { createNewUser, findUserByData } = require('../services/user.service');
const { ValidationError } = require('../errorList');

const signUpBodyRules = Joi.object({
  email: Joi.string()
    .max(254)
    .pattern(new RegExp('^[a-zA-Z0-9._-]{1,254}@[a-zA-Z0-9._-]+.[a-zA-Z]{2,}$'))
    .required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        '^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'
      )
    )
    .required(),
});

const addNewUser = async (req, res) => {
  const { error } = signUpBodyRules.validate(req.body);
  if (error) {
    throw new ValidationError(error.message);
  }
  const newUser = await createNewUser(req.body);
  res.status(201).json(newUser);
};

const logInUser = async (req, res) => {
  const token = await findUserByData(req.body);
  if (!token) {
    throw new Error('No token provided');
  }

  res.cookie('token', token, {
    httpOnly: true,
  });

  res.status(201).send(token);
};

module.exports = {
  addNewUser,
  logInUser,
};
