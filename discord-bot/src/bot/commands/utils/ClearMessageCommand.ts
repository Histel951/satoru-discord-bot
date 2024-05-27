import AbstractCommand from "../AbstractCommand";
import { CommandInteraction } from "discord.js";
import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import { CatchErrorT } from "../../../types/CatchErrorT";
import handleError from "../../../utils/handleError";

export default class extends AbstractCommand {
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply({ ephemeral: true });

        const amountOption = interaction.options.get('amount');
        const amount = amountOption ? amountOption.value as number : 10;

        try {
            const fetchedMessages = await interaction.channel?.messages.fetch({ limit: amount });

            if (fetchedMessages?.size) {
                const deletionPromises = fetchedMessages.map(message => message.delete().catch(handleError));
                await Promise.all(deletionPromises);
            }

            await interaction.editReply({
                content: `Удалено ${fetchedMessages?.size ?? 0} сообщений.`
            });
        } catch (error: CatchErrorT) {
            await interaction.editReply({
                content: `Не удалось удалить сообщения, ошибка: ${handleError(error)}`
            });
        }
    }

    getOptions(): CommandOptionSetCallbackT[] {
        return [
            option => option
                .setName('amount')
                .setDescription('Количество последних сообщений, которое нужно удалить.')
                .setRequired(false)
        ];
    }
}
