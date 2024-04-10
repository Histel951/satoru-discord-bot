import Joi from "joi";
import { IUser } from "../../interfaces/schemas/IUser";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=\S+).{8,}$/

export default Joi.object<IUser>({
    login: Joi.string().required(),
    password: Joi.string().pattern(passwordPattern).required(),
});