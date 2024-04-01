import { RanksT } from "../../enums/RanksEnum";
import { Types } from "mongoose";

export type PlayerInfoT = {
    id?: Types.ObjectId,
    account_id: string
    personaname: string
    plus: boolean
    last_login: string|null
    rank: RanksT|string|null
    leaderboard_rank: number|null
    team_id: string
}