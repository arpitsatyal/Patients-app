import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(5),
});

export const patientSchema = Joi.object({
  firstName: Joi.string().required().max(15),
  lastName: Joi.string().required().max(15),
  email: Joi.string().required().email().max(20),
  contact: Joi.string().required().max(15),
  address: Joi.string().required(),
  dob: Joi.string().required(),
  specialAttention: Joi.bool(),
  image: Joi.string(),
  allergies: Joi.array().items(Joi.string()),
});

export const updatePatientSchema = Joi.object({
  firstName: Joi.string().max(15),
  lastName: Joi.string().max(15),
  email: Joi.string().email().max(20),
  contact: Joi.string().max(15),
  address: Joi.string(),
  dob: Joi.string(),
  specialAttention: Joi.bool(),
  image: Joi.string(),
  allergies: Joi.array().items(Joi.string()),
});
