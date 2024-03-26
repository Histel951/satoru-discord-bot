import { CommandInteraction } from "discord.js";
import findPlayer from "../../../utils/dota/findPlayer";
import showPlayerInfo from "../../../utils/me/showPlayerInfo";
import { MiddlewareResult } from "../../../types/MiddlewareTypes";

export default async (interaction: CommandInteraction): Promise<MiddlewareResult<CommandInteraction>> => {
    const player = await findPlayer(interaction.user.id);

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

    return {
        result: true,
        interaction
    };
}