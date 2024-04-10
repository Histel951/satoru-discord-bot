import Joi from "joi";
import { ITournament } from "../../interfaces/schemas/ITournament";
import { RanksEnum } from "../../enums/RanksEnum";

export default Joi.object<ITournament>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    teamCount: Joi.number().integer().valid(8, 16, 32, 64).required(),
    prizePull: Joi.number().min(0).required(),
    entryFee: Joi.number().min(0).required(),
    maxRank: Joi.number().valid(...Object.values(RanksEnum)).required()
});