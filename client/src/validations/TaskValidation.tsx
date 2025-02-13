import Joi from "joi";

export const TaskValidationSchema = Joi.object({
  taskName: Joi.string().trim().min(2).required().messages({
    "string.base": "Task Name must be a string",
    "string.empty": "Task Name is required",
    "any.required": "Task Name is required",
  }),
  taskDescription: Joi.string().trim().min(2).required().messages({
    "string.base": "Task Description must be a string",
    "string.empty": "Task Description is required",
    "any.required": "Task Description is required",
  }),
  startDate: Joi.date().required().messages({
    "date.base": "Start Date must be a valid date",
    "any.required": "Start Date is required",
  }),
  endDate: Joi.date().optional().greater(Joi.ref("startDate")).messages({
    "date.base": "End Date must be a valid date",
    "date.greater": "End Date must be after Start Date",
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
  priority: Joi.string()
    .trim()
    .valid("high", "medium", "low")
    .required()
    .messages({
      "any.only": "Priority must be one of high, medium, low",
      "any.required": "Priority is required",
    }),
  file: Joi.alternatives()
    .try(Joi.string(), Joi.valid(null))
    .optional()
    .messages({
      "string.base": "File must be a valid string (URL) if provided",
    }),
  organizationId: Joi.string().required().messages({
    "string.empty": "Organization ID is required",
  }),

  projectId: Joi.string().required().messages({
    "string.empty": "ProjectID is required",
  }),
  _id:Joi.string().optional(),
  status:Joi.string().optional(),
  __v:Joi.optional(),
  parentTaskId:Joi.string().optional(),
  feedback:Joi.optional()
});
