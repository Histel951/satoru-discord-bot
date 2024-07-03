import { CommandInteraction } from "discord.js";
import { Player } from "../../../database/models";
import showPlayerInfo from "../../../utils/me/showPlayerInfo";
import AbstractCommand from "../AbstractCommand";
import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import registerMember from "../../../utils/auth/registerMember";
import rcpRequest from "../../../utils/rabbit-mq/rcpRequest";

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction, { dotaId }: { dotaId: string | number }) {
        try {
            // @ts-ignore
            const response: { discordId: string, rank: number } = await rcpRequest('registerMember', {
                discordId: interaction.user.id,
                dotaId
            });

            await registerMember(interaction, response.discordId, response.rank);
        } catch (error) {
            console.error("An error occurred:", error);

            return await interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true });
        }

        return interaction.reply({
            ephemeral: true,
            content: 'Вы успешно зарегистрировались!'
        });
    }

    getOptions(): CommandOptionSetCallbackT[] {
        return [
            option =>
                option.setName('dota-id')
                .setDescription('id аккаунта в доте.')
                .setRequired(true)
        ];
    }

    async middleware(interaction: CommandInteraction) {
        const player = await Player.findOne({
            discordId: interaction.user.id
        }).exec();

        if (player) {
            return {
                result: false,
                interaction,
                options: {
                    content: `Вы уже зарегистрированы как:\n${showPlayerInfo(player)}`,
                    ephemeral: true,
                },
            };
        }

        const options = interaction.options;
        const dotaId = options.get('dota-id')?.value;

        if (dotaId === undefined || typeof dotaId === 'boolean') {
            return {
                result: false,
                interaction,
                options: {
                    content: `Неверное значение id.`,
                    ephemeral: true,
                },
            }
        }

        return {
            result: true,
            interaction,
            options: {
                dotaId
            },
        };
    }
}
