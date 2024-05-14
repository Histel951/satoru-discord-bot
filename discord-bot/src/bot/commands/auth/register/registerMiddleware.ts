import { CommandInteraction } from "discord.js";
import showPlayerInfo from "../../../../utils/me/showPlayerInfo";
import { MiddlewareResult } from "../../../../types/MiddlewareTypes";
import {Player} from "../../../../database/models";

export default async (interaction: CommandInteraction): Promise<MiddlewareResult<CommandInteraction>> => {
    const player = await Player.findOne({
        discord_id: interaction.user.id
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

    return {
        result: true,
        interaction
    };
}