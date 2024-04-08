import { GuildMember, Role } from "discord.js";

export default async (member: GuildMember, role: Role): Promise<void> => {
    if (!member.roles.cache.has(role.id)) {
        await member.roles.add(role);
    }
};