import { CommandInteraction, GuildMember, InteractionResponse } from "discord.js";
import {Player, TeamInvite} from "../../../database/models";
import { PlayerInfoT } from "../../../types/dota/PlayerInfoT";

export default async (
    interaction: CommandInteraction,
    {
        invitedPlayer,
        teamOwner,
        role
    } : { member: GuildMember, teamOwner: PlayerInfoT, invitedPlayer: PlayerInfoT, role: string }
): Promise<InteractionResponse|void> => {

    await TeamInvite.create({
        player_id: invitedPlayer.id,
        team_id: teamOwner.team_id,
        role,
    });

    await interaction.reply({
        content: `Вы пригласили в команду игрока ${invitedPlayer.personaname}.`,
        ephemeral: true,
    });
};