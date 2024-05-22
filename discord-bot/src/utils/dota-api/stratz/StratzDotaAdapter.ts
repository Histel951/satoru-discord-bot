import { DotaPlayerApiAdapter } from "../../../interfaces/dota-api/DotaPlayerApiAdapter";
import { PlayerInfoStratzResponseT } from "../../../types/dota-api/open-dota/responses/PlayerInfoStratzResponseT";
import { PlayerInfoT } from "../../../types/dota-api/adapter/PlayerInfoT";

export default class implements DotaPlayerApiAdapter<PlayerInfoStratzResponseT> {
    playerInfo(data: PlayerInfoStratzResponseT): PlayerInfoT {
        return {
            steamAccountId: data.player.steamAccount.id,
            name: data.player.names[0].name,
            rank: data.player.performance.rank,
            leaderboardRank: data.player.leaderboardRanks[0]?.rank ?? null,
            lastMatchDate: data.player.lastMatchDate,
        };
    }
}