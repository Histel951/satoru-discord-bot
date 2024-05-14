import oDAxios from "../../plugins/oDaxios";
import { PlayerInfoI } from "../../interfaces/dota/PlayerInfoI";
import { RanksT } from "../../enums/RanksEnum";
import getRankName from "./getRankName";
import { PlayerInfoResponseT } from "../../types/dota-api/open-dota/responses/PlayerInfoResponseT";

export default async (dotaId: number|string): Promise<PlayerInfoI> => {
    const { data } = await oDAxios.get<PlayerInfoResponseT>(`/players/${dotaId}`);

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