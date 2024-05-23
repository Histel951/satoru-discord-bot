import { Role, RoleManager } from "discord.js";

export default (name: string, roleManager: RoleManager): Role | undefined =>
    roleManager.cache.find((role: Role) => name === role.name)