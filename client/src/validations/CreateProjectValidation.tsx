import Joi from "joi";

export const projectDetailsSchema = Joi.object({
  projectName: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Project name is required",
    "string.min": "Project name must be at least 3 characters",
    "string.max": "Project name must not exceed 100 characters",
  }),
  projectDescription: Joi.string().trim().min(5).max(500).required().messages({
    "string.empty": "Project description is required",
    "string.min": "Project description must be at least 5 characters",
    "string.max": "Project description must not exceed 500 characters",
  }),
  startDate: Joi.date().iso().required().messages({
    "date.base": "Start date must be a valid ISO date",
    "any.required": "Start date is required",
  }),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).required().messages({
    "date.greater": "End date must be after the start date",
    "any.required": "End date is required",
  }),
  manager: Joi.string().trim().required().messages({
    "string.empty": "Manager ID is required",
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
      "array.min": "At least one member is required",
      "array.base": "Members must be an array of valid MongoDB ObjectIds",
    }),
  priority: Joi.string().trim().required().messages({
    "string.empty": "Please choose a valid priority",
  }),
  organizationId: Joi.string().required().messages({
    "string.empty": "Organization ID is required",
  }),
});
