const { Joi } = require("express-validation");

const messageValidation = {
  body: Joi.object({
    date: Joi.date().default(new Date()),
    text: Joi.string().required(),
    sender: Joi.string,
    recipient: Joi.string,
  }),
};

module.exports = messageValidation;
