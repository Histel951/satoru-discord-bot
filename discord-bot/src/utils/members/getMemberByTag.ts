import { Guild } from "discord.js";

export default async (tag: string, guild: Guild) =>
    (await guild.members.fetch())?.find(member => member.user.tag === tag) ?? undefined;