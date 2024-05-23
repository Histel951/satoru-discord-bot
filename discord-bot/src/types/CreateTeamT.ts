import { GuildMember } from "discord.js";

export type CreateTeamT = {
    guildMember: GuildMember
    name: string
    image_url?: string
}