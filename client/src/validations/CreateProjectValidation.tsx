import Joi from "joi";

export const projectDetailsSchema = Joi.object({
  projectName: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Project name is required",
    "string.min": "Project name must be at least 2 characters",
    "string.max": "Project name must not exceed 100 characters",
  }),
  projectDescription: Joi.string().trim().min(5).max(1000).required().messages({
    "string.empty": "Project description is required",
    "string.min": "Project description must be at least 5 characters",
    "string.max": "Project description must not exceed 1000 characters",
  }),
  startDate: Joi.date().iso().required().messages({
    "date.base": "Please choose a valid Start date",
    "any.required": "Start date is required",
  }),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).required().messages({
    "date.base": "Please choose a valid End date",
    "date.greater": "End date must be after the start date",
    "any.required": "End date is required",
  }),
  manager: Joi.any().required().messages({
    "any.required": "Please choose a manager",
  }),
  members: Joi.array()
    .items(
      Joi.string().length(24).messages({
        "string.length":
          "Each member ID must be a valid 24-character MongoDB ObjectId",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Members must be an array of valid MongoDB ObjectIds",
      "array.min": "At least one member is required",
    }),
  priority: Joi.any().required().messages({
    "any.required": "Please select a valid one from the list",
  }),
  status: Joi.any().required().messages({
    "any.required": "Please select a valid one from the list",
  }),
  organizationId: Joi.string().trim().required().messages({
    "string.empty": "Organization ID is required",
    "any.required": "Organization ID is required",
  }),
});
