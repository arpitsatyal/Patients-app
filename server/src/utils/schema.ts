import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(5),
}).options({ allowUnknown: true });

export const patientSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().email(),
  contact: Joi.string().required(),
  address: Joi.string().required(),
  dob: Joi.string().required(),
}).options({ allowUnknown: true });
