import {Team} from "discord.js";

export type CreateTeamType = {
    discordId: string
    name: string
}

export type PlayerType = {
    discord_id: string
    fantasy_points: number|0
    team: Team|null
}