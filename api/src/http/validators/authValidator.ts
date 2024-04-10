import Joi from "joi";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=\S+).{8,}$/

export default Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(passwordPattern).required(),
});