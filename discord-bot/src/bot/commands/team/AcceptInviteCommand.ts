import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import { CommandInteraction } from "discord.js";
import { Player, Team, TeamInvite } from "../../../database/models";
import { ITeam } from "../../../interfaces/schemas/ITeam";
import { ITeamInvite } from "../../../interfaces/schemas/ITeamInvite";
import { IPlayer } from "../../../interfaces/schemas/IPlayer";
import AbstractCommand from "../AbstractCommand";

type AcceptInviteOptionsT = { team: ITeam & Document, invite: ITeamInvite & Document };

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction, { team, invite }: AcceptInviteOptionsT) {
        await Player.updateOne({
            discordId: interaction.user.id,
        }, {
            team_id: team._id,
            role: invite.role,
        });

        await TeamInvite.deleteOne({
            _id: invite._id,
        });

        return interaction.reply({
            content: `Теперь вы состоите в команде ${team.name}.`,
            ephemeral: true,
        });
    }

    async middleware(interaction: CommandInteraction) {
        const options = interaction.options;
        const teamName = options.get('team-name')?.value as string;

        const team = await Team.findOne<ITeam>({
            name: teamName
        }).exec();

        if (!team) {
            return {
                result: false,
                interaction,
                options: {
                    content: 'Команда не найдена.',
                    ephemeral: true,
                },
            };
        }

        const player = await Player.findOne<IPlayer>({
            discordId: interaction.user.id,
        }).exec() as IPlayer;

        const invite = await TeamInvite.findOne<ITeamInvite>({
            team_id: team._id,
            player_id: player._id
        }).exec();

        if (!invite) {
            return {
                result: false,
                interaction,
                options: {
                    content: 'Приглашение не найдено.',
                    ephemeral: true,
                }
            }
        }

        return {
            result: true,
            interaction,
            options: {
                team,
                invite,
            },
        };
    }

    getOptions(): CommandOptionSetCallbackT[] {
        return [
            option =>
                option.setName('team-name')
                    .setDescription('Имя команды в которую хотите принять приглашение на вступление.')
                    .setRequired(true),
        ]
    }
}