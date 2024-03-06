import {PlayerInfoT} from "../../types/dota/PlayerInfoT";
import {Player} from "../../database/models";
import {IPlayer} from "../../interfaces/schemas/IPlayer";
import getRankName from "./getRankName";

export default async (discordId: string): Promise<PlayerInfoT> => {
    const player = (await Player.findOne<IPlayer>({ discord_id: discordId }).exec()) as Document & IPlayer;

    return {
        account_id: player.account_id,
        personaname: player.personaname,
        plus: player.plus,
        last_login: player.last_login,
        rank: getRankName(player.rank),
        leaderboard_rank: player.leaderboard_rank
    };
}