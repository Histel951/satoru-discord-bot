import {InteractionResponse, ModalSubmitInteraction, RoleManager} from "discord.js";
import showPlayerInfo from "../../utils/me/showPlayerInfo";
import updatePlayerInfo from "../../utils/dota/updatePlayerInfo";
import addRankRole from "../../utils/dota/addRankRole";
import addRoleByName from "../../utils/roles/addRoleByName";
import { RolesEnum } from "../../enums/RolesEnum";
import removeRoleByName from "../../utils/roles/removeRoleByName";

export default async (interaction: ModalSubmitInteraction): Promise<void> => {
    try {
        const dotaId = interaction.fields.getTextInputValue('input-dota-profile-id');
        const [playerInfo, player] = await updatePlayerInfo(interaction.user.id, dotaId);

        const member = await interaction.guild?.members.fetch(interaction.user.id);

        if (member) {
            await addRankRole(member, player.rank, interaction.guild?.roles as RoleManager);
            await addRoleByName(member, RolesEnum.Approved, interaction.guild?.roles as RoleManager);
            await removeRoleByName(member, RolesEnum.Unproved, interaction.guild?.roles as RoleManager);
        }

        await interaction.reply({ content: showPlayerInfo(playerInfo), ephemeral: true });
    } catch (error) {
        console.error("An error occurred:", error);
        await interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true });
    }
};
