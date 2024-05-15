import {
    CommandInteraction,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
import createInput from "../../../utils/ui/createInput";
import createModal from "../../../utils/ui/createModal";
import AbstractCommand from "../AbstractCommand";

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction) {
        const name = createInput({
            customId: 'input-tournament-name',
            label: 'Название турнира',
            style: TextInputStyle.Short,
            required: true,
            maxLength: 50,
        });

        const description = createInput({
            customId: 'input-tournament-description',
            label: 'Описание турнира',
            style: TextInputStyle.Paragraph,
            required: true,
        });

        const imageUrl = createInput({
            customId: 'input-tournament-image-url',
            label: 'URL изображения турнира',
            style: TextInputStyle.Short,
            required: true,
        });

        const teamCount = new StringSelectMenuBuilder()
            .setCustomId('select-team-count')
            .setPlaceholder('Количество команд на турнире')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setValue('8')
                    .setLabel('8 команд'),
                new StringSelectMenuOptionBuilder()
                    .setValue('16')
                    .setLabel('16 команд'),
                new StringSelectMenuOptionBuilder()
                    .setValue('32')
                    .setLabel('32 команды'),
                new StringSelectMenuOptionBuilder()
                    .setValue('64')
                    .setLabel('64 команды'),
            );

        const modal = createModal<TextInputBuilder>({
            customId: 'tournament-create',
            title: 'Создание турнира',
            rows: [
                name,
                description,
                imageUrl,
                teamCount,
            ],
        });

        return interaction.showModal(modal);
    }
}