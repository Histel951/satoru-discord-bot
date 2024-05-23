import {GuildMember, RoleManager} from "discord.js";
import findRoleByName from "./findRoleByName";
import addRole from "./addRole";

export default async (member: GuildMember, name: string): Promise<void> => {
    const role = findRoleByName(name, member.guild.roles);

    if (role) {
        await addRole(member, role)
    }
}