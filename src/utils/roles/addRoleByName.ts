import {GuildMember, RoleManager} from "discord.js";
import findRoleByName from "./findRoleByName";
import addRole from "./addRole";

export default async (member: GuildMember, name: string, roleManager: RoleManager): Promise<void> => {
    const role = findRoleByName(name, roleManager);

    if (role) {
        await addRole(member, role)
    }
}