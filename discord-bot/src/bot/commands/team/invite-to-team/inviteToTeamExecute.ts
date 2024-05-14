import { CommandInteraction, GuildMember, InteractionResponse } from "discord.js";
import { PlayerInfoI } from "../../../../interfaces/dota/PlayerInfoI";
import { TeamInvite } from "../../../../database/models";

export default async (
    interaction: CommandInteraction,
    {
        invitedPlayer,
        teamOwner,
        role
    } : { member: GuildMember, teamOwner: PlayerInfoI, invitedPlayer: PlayerInfoI, role: string }
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