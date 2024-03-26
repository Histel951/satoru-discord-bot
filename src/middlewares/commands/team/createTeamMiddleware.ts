import { CommandInteraction } from "discord.js";
import findPlayer from "../../../utils/dota/findPlayer";
import { MiddlewareResult } from "../../../types/MiddlewareTypes";

export default async (interaction: CommandInteraction): Promise<MiddlewareResult<CommandInteraction>> => {
    const player = await findPlayer(interaction.user.id);

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