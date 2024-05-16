import { ModalSubmitInteraction, RoleManager } from "discord.js";
import { InteractionT } from "../../../types/InteractionT";
import { DotaApiPortI } from "../../../interfaces/dota-api/DotaApiPortI";
import updatePlayerInfo from "../../../utils/dota/updatePlayerInfo";
import addRankRole from "../../../utils/dota/addRankRole";
import addRoleByName from "../../../utils/roles/addRoleByName";
import { RolesEnum } from "../../../enums/RolesEnum";
import removeRoleByName from "../../../utils/roles/removeRoleByName";
import showPlayerInfo from "../../../utils/me/showPlayerInfo";
import AbstractListener from "../AbstractListener";

export default class extends AbstractListener<ModalSubmitInteraction> {
    async execute(interaction: ModalSubmitInteraction & InteractionT) {
        const dotaApi = interaction.client.data?.dotaApi as DotaApiPortI;

        try {
            const dotaId = interaction.fields.getTextInputValue('input-dota-profile-id');

            const player = await updatePlayerInfo(interaction.user.id, dotaId, dotaApi);

            const member = await interaction.guild?.members.fetch(interaction.user.id);

            if (member) {
                await addRankRole(member, player.rank_tier, interaction.guild?.roles as RoleManager);
                await addRoleByName(member, RolesEnum.Approved, interaction.guild?.roles as RoleManager);
                await removeRoleByName(member, RolesEnum.Unproved, interaction.guild?.roles as RoleManager);
            }

            await interaction.reply({ content: showPlayerInfo(player), ephemeral: true });
        } catch (error) {
            console.error("An error occurred:", error);
            await interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true });
        }
    }
}