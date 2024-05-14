import { ModalSubmitInteraction, RoleManager } from "discord.js";
import showPlayerInfo from "../../../../utils/me/showPlayerInfo";
import updatePlayerInfo from "../../../../utils/dota/updatePlayerInfo";
import addRankRole from "../../../../utils/dota/addRankRole";
import addRoleByName from "../../../../utils/roles/addRoleByName";
import { RolesEnum } from "../../../../enums/RolesEnum";
import removeRoleByName from "../../../../utils/roles/removeRoleByName";
import { ListenerType } from "../../../../types/ListenerTypes";
import {InteractionT} from "../../../../types/InteractionT";
import {Player} from "../../../../database/models";
import getRankName from "../../../../utils/dota/getRankName";
import {DotaApiPortI} from "../../../../interfaces/dota-api/DotaApiPortI";

const listener: ListenerType<ModalSubmitInteraction & InteractionT> = {
    name: 'player-registration',
    execute: async interaction => {
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
};

export default listener;
