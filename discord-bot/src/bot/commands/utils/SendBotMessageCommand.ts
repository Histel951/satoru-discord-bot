import AbstractCommand from "../AbstractCommand";
import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import { ActionRowBuilder, ButtonBuilder, CommandInteraction } from "discord.js";
import { CreateBtnI } from "../../../interfaces/ui/CreateBtnI";
import { CatchErrorT } from "../../../types/CatchErrorT";
import handleError from "../../../utils/handleError";

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction) {
        const text = interaction.options.get('text')?.value;

        if (!text) {
            return;
        }

        const btnJsonOptions = interaction.options.get('buttons')?.value;

        try {
            const buttonsOptions = btnJsonOptions
                ? JSON.parse(String(btnJsonOptions)) as CreateBtnI[] | null
                : undefined;
            const components: ActionRowBuilder<ButtonBuilder>[] = [];

            if (Array.isArray(buttonsOptions) && buttonsOptions.length) {
                const row = new ActionRowBuilder<ButtonBuilder>();

                console.log(buttonsOptions);
                const btns = buttonsOptions.map(
                    (buttonOptions: CreateBtnI) => new ButtonBuilder()
                        .setLabel(buttonOptions.label)
                        .setCustomId(buttonOptions.customId)
                        .setStyle(Number(buttonOptions.style))
                );

                row.addComponents(...btns);
                components.push(row);
            }

            interaction.channel?.send({
                content: String(text),
                components,
            });

            return interaction.reply({
                content: 'Сообщение отправлено.',
                ephemeral: true,
            });
        } catch (error: CatchErrorT) {
            return interaction.reply({
                content: 'Сообщение не отправлено, ошибка: ' + handleError(error),
                ephemeral: true,
            });
        }
    }

    getOptions(): CommandOptionSetCallbackT[] {
        return [
            option => option
                .setName('text')
                .setDescription('Текст сообщения')
                .setRequired(true),

            option => option
                .setName('buttons')
                .setDescription('Массив кнопок в виде JSON, параметры кнопки - ButtonStyle, можно посмотреть в документации Discord'),
        ];
    }
}