const { Joi } = require("express-validation");

const messageValidation = {
  body: Joi.object({
    date: Joi.date().default(new Date()),
    text: Joi.string().required(),
    sender: Joi.array(),
    recipient: Joi.array(),
  }),
};

module.exports = messageValidation;
