import {PlayerType} from "../types";
import {Players} from "../database/models";

export const createPlayer = ({discord_id, team = null, fantasy_points = 0}: PlayerType) => {
    return new Players({
        discord_id,
        team,
        fantasy_points
    }).save()
}

export const findByDiscordId = async (discordId: string) => {
    return (await Players.find({
        discord_id: discordId
    }).exec()).shift();
}