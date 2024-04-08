import {CommandInteraction} from "discord.js";
import {MiddlewareResult} from "../../../types/MiddlewareTypes";
import {Player, Team, TeamInvite} from "../../../database/models";
import {ITeamInvite} from "../../../interfaces/schemas/ITeamInvite";
import {ITeam} from "../../../interfaces/schemas/ITeam";
import {IPlayer} from "../../../interfaces/schemas/IPlayer";

export default async (interaction: CommandInteraction): Promise<MiddlewareResult<CommandInteraction>> => {
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
        discord_id: interaction.user.id,
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
};