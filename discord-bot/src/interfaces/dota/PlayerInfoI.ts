import { RanksT } from "../../enums/RanksEnum";
import { Types } from "mongoose";

export interface PlayerInfoI {
    id?: Types.ObjectId
    steamAccountId: string
    name: string
    lastMatchDate: string|null
    rank: RanksT|string|null
    leaderboardRank: number|null
    teamId: string
}