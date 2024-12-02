import Joi from "joi";

export const registerUserSchema = Joi.object({
    name:Joi.string().min(3).max(50).required().messages({
        'any.required':'Invalid Name',
        'string.empty':'Invalid Name',
        'string.min':'Invalid Name',
        'string.max':'Invalid Name',
        'string.base':'Invalid Name'
    }),
    email:Joi.string().email().required().messages({
        'any.required':"Invalid email",
        'string.email':"Invalid email",
        'string.empty':'Invalid email'
    }),
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
    })

})