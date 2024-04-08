import {GuildMember, Role} from "discord.js";

export default async (member: GuildMember, role: Role) => {
    if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
    }
}