import { Guild } from "discord.js";

export default (tag: string, guild: Guild) => guild.members.cache.find(member => member.user.tag === tag);