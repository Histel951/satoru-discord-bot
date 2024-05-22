import AbstractCommand from "../AbstractCommand";
import { CommandInteraction } from "discord.js";
import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import { CatchErrorT } from "../../../types/CatchErrorT";
import handleError from "../../../utils/handleError";

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction) {
        const amount = interaction.options.get('amount')?.value ?? 10;
        const limit = Number(amount) + 1;

        try {
            const fetched = await interaction.channel?.messages.fetch({ limit });

            fetched?.forEach(message => {
                message.delete();
            })
        } catch (error: CatchErrorT) {
            await interaction.reply({
                content: 'Чат не очищен, ошибка: ' + handleError(error),
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
        ];
    }
}