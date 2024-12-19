import Joi from "joi";

export const registerEmployeeSchema = Joi.object({
  userName: Joi.string().trim().min(2).max(50).required().messages({
    "any.required": "Invalid UserName",
    "string.empty": "Invalid UserName",
    "string.min": "Invalid UserName",
    "string.max": "Invalid UserName",
    "string.base": "Invalid UserName",
  }),
  email: Joi.string()
    .email()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      "any.required": "Invalid email",
      "string.email": "Invalid email",
      "string.empty": "Invalid email",
      "string.pattern.base": "Invalid email.",
    }),
  firstName: Joi.string().trim().min(2).max(50).required().messages({
    "any.required": "Invalid firstName",
    "string.empty": "Invalid firstName",
    "string.min": "Invalid firstName",
    "string.max": "Invalid firstName",
    "string.base": "Invalid firstName",
  }),
  organizationId: Joi.string().required().messages({
    "any.required": "Invalid organizationId",
    "string.empty": "Invalid organizationId",
    "string.base": "Invalid organizationId",
  }),
  lastName: Joi.string().trim().min(1).max(50).required().messages({
    "any.required": "Invalid lastName",
    "string.empty": "Invalid lastName",
    "string.min": "Invalid lastName",
    "string.max": "Invalid lastName",
    "string.base": "Invalid lastName",
  }),
  phone: Joi.string().length(10).pattern(/^\d+$/).required().messages({
    "string.base": '"phone" must be a string of numeric characters',
    "string.empty": '"phone" is required and cannot be empty',
    "string.length": '"phone" must be exactly 10 digits',
    "string.pattern.base": '"phone" must only contain numeric digits',
    "any.required": '"phone" is required',
  }),
  position: Joi.string().trim().min(3).max(50).required().messages({
    "any.required": "Invalid Position",
    "string.empty": "Invalid Position",
    "string.min": "Invalid Position",
    "string.max": "Invalid Position",
    "string.base": "Invalid Position",
  }),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.required": "Gender is required.",
    "string.empty": "Gender is required.",
    "any.only": "Invalid gender selection. Please choose 'male' or 'female'.",
  }),
  image: Joi.string().uri().required().messages({
    "string.uri": "Invalid image URL format.",
    "any.required": "Image is required.",
    "string.empty": "Image URL cannot be empty."
  }),

  
});
