import Joi from "joi";
import { createValidator } from "express-joi-validation";

export const validate = createValidator({});

export const breedValidation = Joi.object({
  name: Joi.string().trim().required(),
  lifeSpan: Joi.string().required(),
  description: Joi.string().required(),
  origin: Joi.string().required(),
  price: Joi.number().min(0).required(),
});

export const registerValidation = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(3).required(),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(3).required(),
});

export const productValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string()
    .valid("dog food", "accessories", "toys", "health & care", "others")
    .required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).required(),
});

export const blogValidation = Joi.object({
  title: Joi.string().required(),
  excerpt: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
});

export const subscriberValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

export const contactValidation = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});
