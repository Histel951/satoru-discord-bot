import { GuildMember, RoleManager } from "discord.js";
import getRankName from "./getRankName";
import addRoleByName from "../roles/addRoleByName";

export default async (member: GuildMember, rankId: number, roleManager: RoleManager): Promise<void> => {
    await addRoleByName(member, getRankName(rankId), roleManager);
};