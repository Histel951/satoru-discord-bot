import {Players, Teams} from "../database/models";
import {Document} from "mongoose";
import {CreateTeamType} from "../types";

export const createTeam = async ({ discordId, name }: CreateTeamType) => {
    const player = (await Players.find({
        discord_id: discordId
    }).exec()).shift()

    const team = new Teams({
        name: name,
        owner: player
    })

    await team.save()

    await Players.updateOne({
        discord_id: player.discord_id
    }, {
        team: team
    }).exec()

    return team
}