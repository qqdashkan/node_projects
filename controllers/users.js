const Joi = require('joi');
const { createNewUser } = require('../services/user.service');
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

const addNewUser = (req, res) => {
  const { error } = signUpBodyRules.validate(req.body);
  if (error) {
    throw new ValidationError(error.message);
  }
  const newUser = createNewUser(req.body);
  res.status(201).send(newUser);
};

module.exports = {
  addNewUser,
};
