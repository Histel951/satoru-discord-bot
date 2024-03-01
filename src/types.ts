import {Team} from "discord.js";

export type CreateTeamType = {
    discordId: string
    name: string
}

export type PlayerType = {
    discord_id: string
    team: Team|null
}