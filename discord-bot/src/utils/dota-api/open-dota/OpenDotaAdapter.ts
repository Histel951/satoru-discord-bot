import { DotaPlayerApiAdapter } from "../../../interfaces/dota-api/DotaPlayerApiAdapter";
import { PlayerInfoT } from "../../../types/dota-api/adapter/PlayerInfoT";
import { PlayerInfoResponseT } from "../../../types/dota-api/open-dota/responses/PlayerInfoResponseT";

export default class implements DotaPlayerApiAdapter<PlayerInfoResponseT> {
    playerInfo(response: PlayerInfoResponseT): PlayerInfoT {
        return {
            account_id: response.profile.account_id,
            nickname: response.profile.personaname,
            avatar: response.profile.avatar,
            rank_tier: response.rank_tier,
            leaderboard_rank: response.leaderboard_rank,
        };
    }
}