import { GuildMember } from "discord.js";
import addRoleByName from "./roles/addRoleByName";
import { RolesEnum } from "../enums/RolesEnum";
import handleError from "./handleError";
import { CatchErrorT } from "../types/CatchErrorT";

export default async (member: GuildMember) => {
    try {
        await addRoleByName(member, RolesEnum.UnVerified, member.guild.roles)
    } catch (error: CatchErrorT) {
        console.error(`Ошибка выдаче роли при заходе на сервер: ${handleError(error)}`)
    }
}