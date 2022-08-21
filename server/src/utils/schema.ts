import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required().min(5),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(5),
});

export const patientSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().email(),
  contact: Joi.string().required(),
  address: Joi.string().required(),
  dob: Joi.string().required(),
  specialAttention: Joi.bool(),
  image: Joi.string(),
  allergies: Joi.array().items(Joi.string()),
});

export const updatePatientSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  contact: Joi.string(),
  address: Joi.string(),
  dob: Joi.string(),
  specialAttention: Joi.bool(),
  image: Joi.string(),
  allergies: Joi.array().items(Joi.string()),
});
