import {GuildMember, RoleManager} from "discord.js";
import getRankName from "./getRankName";
import addRoleByName from "../roles/addRoleByName";

export default async (member: GuildMember, rankId: number, roleManager: RoleManager): Promise<void> => {
    const rankName = getRankName(rankId, true);

    await addRoleByName(member, rankName as string, roleManager);
};