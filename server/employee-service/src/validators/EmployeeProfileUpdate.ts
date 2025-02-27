import Joi from "joi";

export const employeeProfileUpdate = Joi.object({
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
  position: Joi.string().trim().min(2).max(50).required().messages({
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
    "string.empty": "Image URL cannot be empty.",
  }),
  dateOfJoining: Joi.date().allow(null, "").messages({
    "date.base": "Invalid date format for date of joining.",
  }),
  dateOfBirth: Joi.date().allow(null, "").messages({
    "date.base": "Invalid date format for date of birth.",
  }),
  highestQualification: Joi.string().trim().allow(null, "").messages({
    "string.base": "Invalid format for highest qualification.",
  }),
  institution: Joi.string().trim().allow(null, "").messages({
    "string.base": "Invalid format for institution.",
  }),
  qualificationYear: Joi.string().pattern(/^\d{4}$/).allow(null, "").messages({
    "string.base": "Qualification year must be a string.",
    "string.pattern.base": "Qualification year must be a 4-digit year (e.g., 2023).",
  }),
  fatherName: Joi.string().trim().allow(null, "").messages({
    "string.base": "Invalid format for father's name.",
  }),
  fatherProfession: Joi.string().trim().allow(null, "").messages({
    "string.base": "Invalid format for father's profession.",
  }),
  motherName: Joi.string().trim().allow(null, "").messages({
    "string.base": "Invalid format for mother's name.",
  }),
  motherProfession: Joi.string().trim().allow(null, "").messages({
    "string.base": "Invalid format for mother's profession.",
  }),
});
