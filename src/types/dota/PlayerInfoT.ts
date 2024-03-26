import {RanksEnum, RanksT} from "../../enums/RanksEnum";

export type PlayerInfoT = {
    account_id: string
    personaname: string
    plus: boolean
    last_login: string|null
    rank: RanksT|string|null
    leaderboard_rank: number|null
    team_id: string
}