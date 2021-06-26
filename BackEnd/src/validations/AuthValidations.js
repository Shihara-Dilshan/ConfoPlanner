const Joi = require("joi");

const joiUserSchema = Joi.object({
  name: Joi.string().alphanum().min(4).max(256).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "lk"] },
  }),

  password: Joi.string().min(4).max(1024).required(),

  mobile: Joi.string().min(10).max(10),

  profilePicture: Joi.string().uri().min(4).max(1024),

  role: Joi.string().alphanum().min(4).max(20).required(),
});

module.exports = joiUserSchema;
