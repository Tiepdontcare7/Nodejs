import Joi from "joi"

const schema = Joi.object({
    name: Joi.string().required().min(5).max(255),
    price: Joi.number().required().min(0),
    description: Joi.string().min(3),
    categoryId: Joi.string()
}) 

export default schema