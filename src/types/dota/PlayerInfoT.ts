import {RanksEnum, RanksT} from "../../enums/RanksEnum";

export type PlayerInfoT = {
    account_id: number,
    personaname: string,
    name: string|null,
    plus: boolean,
    last_login: string,
    rank: RanksT,
    leaderboard_rank: number|null
}