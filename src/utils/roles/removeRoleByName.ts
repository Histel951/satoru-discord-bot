import {GuildMember, RoleManager} from "discord.js";
import findRoleByName from "./findRoleByName";
import deleteRole from "./deleteRole";

export default async (member: GuildMember, name: string, roleManager: RoleManager) => {
    const role = findRoleByName(name, roleManager);

    if (role) {
        await deleteRole(member, role)
    }
}