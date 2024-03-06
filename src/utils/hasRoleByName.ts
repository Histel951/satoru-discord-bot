import {Role, RoleManager} from "discord.js";

export default (name: string, roleManager: RoleManager): boolean => {
    const role = roleManager.cache.find((role: Role) => name === role.name)

    return Boolean(role)
}