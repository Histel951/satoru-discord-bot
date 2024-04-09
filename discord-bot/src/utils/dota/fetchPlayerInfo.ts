import { PlayerDotaResponseT } from "../../types/dota/PlayerDotaInfoResponseT";
import openDotaAxios from "../../axios/openDotaAxios";
import { PlayerInfoT } from "../../types/dota/PlayerInfoT";
import { RanksT } from "../../enums/RanksEnum";
import getRankName from "./getRankName";

export default async (dotaId: number|string): Promise<PlayerInfoT> => {
    const { data } = await openDotaAxios.get<PlayerDotaResponseT>(`/players/${dotaId}`);

    return {
        account_id: String(data.profile.account_id),
        personaname: data.profile.personaname,
        plus: data.profile.plus,
        last_login: data.profile.last_login,
        rank: getRankName(data.rank_tier) as RanksT,
        leaderboard_rank: data.leaderboard_rank,
        team_id: '',
    };
};