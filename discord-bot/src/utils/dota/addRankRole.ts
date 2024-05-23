import { GuildMember, RoleManager } from "discord.js";
import getRankName from "./getRankName";
import addRoleByName from "../roles/addRoleByName";

export default async (member: GuildMember, rankId: number): Promise<void> => {
    await addRoleByName(member, getRankName(rankId));
};