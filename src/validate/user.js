import Joi from "joi";

const userSignup = Joi.object({
    username: Joi.string().min(3).max(25),
    email: Joi.string().email(),
    password: Joi.string().min(4).max(20),
    confirmPassword: Joi.string().valid(Joi.ref("password")),
    role: Joi.number()
})

const userSignin = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(4).max(20),
})

export { userSignin, userSignup }