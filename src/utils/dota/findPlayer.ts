import {PlayerInfoT} from "../../types/dota/PlayerInfoT";
import {Player} from "../../database/models";
import {IPlayer} from "../../interfaces/schemas/IPlayer";
import getRankName from "./getRankName";
import {PopulateOptions} from "mongoose";

export default async (
    discordId: string,
    populate: PopulateOptions | (PopulateOptions | string)[] = { path: 'team_id' }
): Promise<PlayerInfoT | null> => {
    const player = await Player.findOne<IPlayer & Document>({ discord_id: discordId })
        .populate(populate).exec();

    return player ? {
        id: player._id,
        account_id: player.account_id,
        personaname: player.personaname,
        plus: player.plus,
        last_login: player.last_login,
        rank: getRankName(player.rank),
        leaderboard_rank: player.leaderboard_rank,
        team_id: player.team_id as unknown as string,
    } : null;
};