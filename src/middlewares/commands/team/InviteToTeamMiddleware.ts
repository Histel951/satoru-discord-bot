import {CommandInteraction, Guild} from "discord.js";
import {MiddlewareResult} from "../../../types/MiddlewareTypes";
import getMemberByTag from "../../../utils/members/getMemberByTag";
import findPlayer from "../../../utils/dota/findPlayer";
import {PlayerInfoT} from "../../../types/dota/PlayerInfoT";

export default async (interaction: CommandInteraction): Promise<MiddlewareResult<CommandInteraction>> => {
    const options = interaction.options;
    const userTag = options.get('tag')?.value as string;
    const role = options.get('role')?.value as string;

    const member = getMemberByTag(userTag, interaction.guild as Guild);

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

    const teamOwner = await findPlayer(interaction.user.id) as PlayerInfoT;
    const invitedPlayer = await findPlayer(member.user.id);

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

    if (!teamOwner.team_id) {
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
            member,
            teamOwner,
            invitedPlayer,
            role,
        }
    };
}