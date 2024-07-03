import { BaseInteraction } from "discord.js";
import addRankRole from "../dota/addRankRole";
import addRoleByName from "../roles/addRoleByName";
import { RolesEnum } from "../../enums/RolesEnum";
import removeRoleByName from "../roles/removeRoleByName";

export default async (interaction: BaseInteraction, discordId: string, rank: number): Promise<void> => {
    const member = await interaction.guild?.members.fetch(discordId);

    if (member) {
        await addRankRole(member, rank);
        await addRoleByName(member, RolesEnum.Verified);
        await removeRoleByName(member, RolesEnum.UnVerified);
    }
}
