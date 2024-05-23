import AbstractCommand from "../AbstractCommand";
import { CommandInteraction } from "discord.js";
import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import { CatchErrorT } from "../../../types/CatchErrorT";
import handleError from "../../../utils/handleError";

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction) {
        const amount = interaction.options.get('amount')?.value ?? 10;

        try {
            const fetched = await interaction.channel?.messages.fetch({
                limit: Number(amount)
            });

            if (fetched) {
                for (const message of fetched) {
                    try {
                        await message[1]?.delete();
                    } catch (e) {
                        console.debug(handleError(e));
                    }
                }
            }

            return await interaction.reply({
                content: `Очистка ${amount} сообщений.`,
                ephemeral: true,
            })
        } catch (error: CatchErrorT) {
            return await interaction.reply({
                content: 'Сообщения не очищен, ошибка: ' + handleError(error),
                ephemeral: true,
            });
        }
    }

    getOptions(): CommandOptionSetCallbackT[] {
        return [
            option => option
                .setName('amount')
                .setDescription('Количество последних сообщений которое надо очистить.')
                .setMinLength(1)
                .setRequired(false)
        ];
    }
}