import { CommandInteraction } from "discord.js";
import { MiddlewareResult } from "../../../types/MiddlewareTypes";
import { Player } from "../../../database/models";

export default async (interaction: CommandInteraction): Promise<MiddlewareResult<CommandInteraction>> => {
    const player = await Player.findOne({
        discord_id: interaction.user.id
    }).exec();

    if (!player) {
        return {
            result: false,
            interaction,
            options: {
                content: 'Игрок не найден.',
                ephemeral: true,
            },
        };
    }

    if (player.team_id) {
        return {
            result: false,
            interaction,
            options: {
                content: 'Вы уже состоите в команде.',
                ephemeral: true,
            },
        };
    }

    return {
        result: true,
        interaction,
    };
}