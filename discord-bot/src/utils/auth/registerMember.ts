import { BaseInteraction, RoleManager } from "discord.js";
import updatePlayerInfo from "../dota/updatePlayerInfo";
import addRankRole from "../dota/addRankRole";
import addRoleByName from "../roles/addRoleByName";
import { RolesEnum } from "../../enums/RolesEnum";
import removeRoleByName from "../roles/removeRoleByName";

export default async (interaction: BaseInteraction, dotaId: string | number): Promise<void> => {
    const player = await updatePlayerInfo(interaction.user.id, dotaId);

    const member = await interaction.guild?.members.fetch(interaction.user.id);

    if (member) {
        await addRankRole(member, player.rank, interaction.guild?.roles as RoleManager);
        await addRoleByName(member, RolesEnum.Verified, interaction.guild?.roles as RoleManager);
        await removeRoleByName(member, RolesEnum.UnVerified, interaction.guild?.roles as RoleManager);
    }
}