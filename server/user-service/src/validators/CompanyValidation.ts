import Joi from 'joi';

export const companyValidationSchema = Joi.object({
  name: Joi.string().min(1).trim().required().messages({
    'string.base': '"name" should be a string',
    'string.empty': '"name" cannot be empty',
    'any.required': '"name" is required',
  }),
  industry: Joi.string().min(1).trim().required().messages({
    'string.base': '"industry" should be a string',
    'string.empty': '"industry" cannot be empty',
    'any.required': '"industry" is required',
  }),
  description: Joi.string().min(1).trim().required().messages({
    'string.base': '"description" should be a string',
    'string.empty': '"description" cannot be empty',
    'any.required': '"description" is required',
  }),
  street: Joi.string().min(1).trim().required().messages({
    'string.base': '"street" should be a string',
    'string.empty': '"street" cannot be empty',
    'any.required': '"street" is required',
  }),
  city: Joi.string().min(1).trim().required().messages({
    'string.base': '"city" should be a string',
    'string.empty': '"city" cannot be empty',
    'any.required': '"city" is required',
  }),
  state: Joi.string().min(1).trim().required().messages({
    'string.base': '"state" should be a string',
    'string.empty': '"state" cannot be empty',
    'any.required': '"state" is required',
  }),
  country: Joi.string().min(1).trim().required().messages({
    'string.base': '"country" should be a string',
    'string.empty': '"country" cannot be empty',
    'any.required': '"country" is required',
  }),
  zipcode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.base': '"zipcode" should be a string',
      'string.empty': '"zipcode" cannot be empty',
      'string.pattern.base': '"zipcode" should be exactly 6 digits',
      'any.required': '"zipcode" is required',
    }),
});

