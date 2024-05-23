import AbstractListener from "../AbstractListener";
import { ButtonInteraction } from "discord.js";
import { InteractionT } from "../../../types/InteractionT";
import buildTeamModal from "../../ui-interface/modals/buildTeamModal";
import { Player } from "../../../database/models";

export default class extends AbstractListener<ButtonInteraction> {
    async execute(interaction: ButtonInteraction & InteractionT) {
        const player = await Player.findOne({
            discordId: interaction.user.id
        }).exec();

        if (player && player.team) {
           return await interaction.reply({
               content: 'Вы уже состоите в команде.',
               ephemeral: true,
           });
        }

        return interaction.showModal(buildTeamModal());
    }
}