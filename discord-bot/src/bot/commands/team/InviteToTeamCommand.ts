import { CommandInteraction, Guild } from "discord.js";
import { Player, TeamInvite } from "../../../database/models";
import { PlayerInfoI } from "../../../interfaces/dota/PlayerInfoI";
import getMemberByTag from "../../../utils/members/getMemberByTag";
import AbstractCommand from "../AbstractCommand";

type InviteToTeamOptionsT = { teamOwner: PlayerInfoI, invitedPlayer: PlayerInfoI, role: string };

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction, { invitedPlayer, teamOwner, role }: InviteToTeamOptionsT) {
        await TeamInvite.create({
            player_id: invitedPlayer.id,
            team_id: teamOwner.team_id,
            role,
        });

        await interaction.reply({
            content: `Вы пригласили в команду игрока ${invitedPlayer.personaname}.`,
            ephemeral: true,
        });
    }

    async middleware(interaction: CommandInteraction) {
        const options = interaction.options;
        const userTag = options.get('tag')?.value as string;
        const role = options.get('role')?.value as string;

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


        const teamOwner = await Player.findOne({
            discord_id: interaction.user.id
        }).exec();

        const invitedPlayer = await Player.findOne({
            discord_id: member.user.id
        }).exec()

        if (!invitedPlayer) {
            return {
                result: false,
                interaction,
                options: {
                    content: `Игрок с тегом ${userTag} не найден.`,
                    ephemeral: true,
                },
            };
        }

        if (!teamOwner?.team_id) {
            return {
                result: false,
                interaction,
                options: {
                    content: `Команда не найдена.`,
                    ephemeral: true,
                },
            };
        }

        return {
            result: true,
            interaction,
            options: {
                teamOwner,
                invitedPlayer,
                role,
            }
        };
    }
}