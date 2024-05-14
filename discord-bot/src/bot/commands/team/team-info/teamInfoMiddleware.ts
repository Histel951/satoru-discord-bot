import { CommandInteraction } from "discord.js";
import { MiddlewareResult } from "../../../../types/MiddlewareTypes";
import { Player, Team } from "../../../../database/models";

export default async (interaction: CommandInteraction): Promise<MiddlewareResult<CommandInteraction>> => {
    const options = interaction.options;
    const name = options.get('team-name')?.value as string;

    const team = await Team.findOne({
        name
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

    const players = await Player.find({
        team_id: team?._id,
    }).exec();

    return {
        result: true,
        interaction,
        options: {
            team,
            players,
        }
    }
}