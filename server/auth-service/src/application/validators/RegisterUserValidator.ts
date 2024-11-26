import Joi from "joi";

export const registerUserSchema = Joi.object({
    name:Joi.string().min(3).max(50).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).max(50).required(),
    confirmPassword:Joi.string().valid(Joi.ref("password")).required().messages({"any.only":"Passwords must match"})

})