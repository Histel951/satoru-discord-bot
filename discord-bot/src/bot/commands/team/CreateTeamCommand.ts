import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import { CommandInteraction } from "discord.js";
import { Player } from "../../../database/models";
import buildTeamModal from "../../ui-interface/modals/buildTeamModal";
import AbstractCommand from "../AbstractCommand";

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction) {
        return interaction.showModal(buildTeamModal());
    }

    async middleware(interaction: CommandInteraction) {
        const player = await Player.findOne({
            discordId: interaction.user.id
        }).exec();

        if (!player) {
            return {
                result: false,
                interaction,
                options: {
                    content: 'Игрок не найден.',
                    ephemeral: true,
                },
            };
        }

        if (player.teamId) {
            return {
                result: false,
                interaction,
                options: {
                    content: 'Вы уже состоите в команде.',
                    ephemeral: true,
                },
            };
        }

        return {
            result: true,
            interaction,
        };
    }
}