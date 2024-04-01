import {CommandInteraction, GuildMember, InteractionResponse} from "discord.js";
import { TeamInvite } from "../../../database/models";
import { PlayerInfoT } from "../../../types/dota/PlayerInfoT";

export default async (
    interaction: CommandInteraction,
    options: { member: GuildMember, teamOwner: PlayerInfoT, invitedPlayer: PlayerInfoT }
): Promise<InteractionResponse|void> => {

    await TeamInvite.create({
        player_id: options.invitedPlayer?.id,
        team_id: options.teamOwner.team_id
    });

    return await interaction.reply({
        content: `Вы пригласили в команду игрока ${options.invitedPlayer?.personaname}.`,
        ephemeral: true
    });
};