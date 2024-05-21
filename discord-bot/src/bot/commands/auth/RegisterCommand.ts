import { CommandInteraction, RoleManager } from "discord.js";
import { Player } from "../../../database/models";
import showPlayerInfo from "../../../utils/me/showPlayerInfo";
import AbstractCommand from "../AbstractCommand";
import updatePlayerInfo from "../../../utils/dota/updatePlayerInfo";
import addRankRole from "../../../utils/dota/addRankRole";
import addRoleByName from "../../../utils/roles/addRoleByName";
import { RolesEnum } from "../../../enums/RolesEnum";
import removeRoleByName from "../../../utils/roles/removeRoleByName";
import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import createDotaApiPort from "../../../utils/dota-api/createDotaApiPort";

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction, { dotaId }: { dotaId: string | number }) {
        const dotaApi = createDotaApiPort();

        try {
            const player = await updatePlayerInfo(interaction.user.id, dotaId, dotaApi);

            const member = await interaction.guild?.members.fetch(interaction.user.id);

            if (member) {
                await addRankRole(member, player.rank, interaction.guild?.roles as RoleManager);
                await addRoleByName(member, RolesEnum.Verified, interaction.guild?.roles as RoleManager);
                await removeRoleByName(member, RolesEnum.UnVerified, interaction.guild?.roles as RoleManager);
            }

            await interaction.reply({ content: showPlayerInfo(player), ephemeral: true });
        } catch (error) {
            console.error("An error occurred:", error);
            await interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true });
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