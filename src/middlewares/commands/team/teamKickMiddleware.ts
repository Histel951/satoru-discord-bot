import {CommandInteraction, Guild} from "discord.js";
import {MiddlewareResult} from "../../../types/MiddlewareTypes";
import {Player} from "../../../database/models";
import getMemberByTag from "../../../utils/members/getMemberByTag";

export default async (interaction: CommandInteraction): Promise<MiddlewareResult<CommandInteraction>> => {
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