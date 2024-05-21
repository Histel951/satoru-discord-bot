import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import { CommandInteraction, Guild, GuildMember } from "discord.js";
import { Player } from "../../../database/models";
import getMemberByTag from "../../../utils/members/getMemberByTag";
import AbstractCommand from "../AbstractCommand";

type TeamKickOptionsT = { member: GuildMember };

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction, { member }: TeamKickOptionsT) {
        await Player.updateOne({
            discordId: member.user.id,
        }, {
            team_id: null,
        });

        await interaction.reply({
            content: `Игрок ${member.user.username} был удалён из команды.`,
            ephemeral: true,
        });
    }

    async middleware(interaction: CommandInteraction) {
        const options = interaction.options;
        const userTag = options.get('tag')?.value as string;

        const member = await getMemberByTag(userTag, interaction.guild as Guild);

        if (!member) {
            return {
                result: false,
                interaction,
                options: {
                    content: 'Пользователь не найден.',
                    ephemeral: true,
                },
            };
        }

        return {
            result: true,
            interaction,
            options: {
                member,
            }
        };
    }

    getOptions(): CommandOptionSetCallbackT[] {
        return [
            option =>
                option.setName('tag')
                    .setDescription('Tag пользователя.')
                    .setRequired(true)
        ];
    }
}