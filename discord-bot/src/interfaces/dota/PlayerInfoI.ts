import { RanksT } from "../../enums/RanksEnum";
import { Types } from "mongoose";

export interface PlayerInfoI {
    id?: Types.ObjectId,
    account_id: string
    personaname: string
    plus: boolean
    last_login: string|null
    rank: RanksT|string|null
    leaderboard_rank: number|null
    team_id: string
}