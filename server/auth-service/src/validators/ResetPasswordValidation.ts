import Joi from "joi";

export const resetPasswordSchema = Joi.object({
    password:Joi.string().min(6).max(20).required().pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/).messages({
        'string.min':'password atleast contain six letters',
        'string.max':'password must contain six letters',
        'any.required':'Invalid password',
        'string.base':'Invalid password',
        'string.empty':'Invalid password',
        'string.pattern.base': 'Password must contain at least one uppercase letter and one special character.',
    }),
    confirmPassword:Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only":"Passwords must match",
        'string.empty':'Invalid confirm password',
        'any.required':'Invalid confirm password'
    }),
    token: Joi.string().required().messages({
        'any.required': 'Token is required.',
        'string.empty': 'Token cannot be empty.',
      }),

})