import { ButtonInteraction } from "discord.js";
import teamInviteBtns from "../../ui-interface/btns/teamInviteBtns";
import getTeamInfoEmbed from "../../utils/team/getTeamInfoEmbed";
import { ITeam } from "../../interfaces/schemas/ITeam";
import { Player, TeamInvite } from "../../database/models";
import { IPlayer } from "../../interfaces/schemas/IPlayer";

export const cancelTeamInvite = async (interaction: ButtonInteraction) => {
    const player = await Player.findOne({
        discord_id: interaction.user.id
    }).exec() as IPlayer;

    await TeamInvite.deleteOne({
        player_id: player._id
    }).exec();

    const newInvite = await TeamInvite.findOne({
        player_id: player._id
    }).populate({
        path: 'team_id',
    }).exec();

    if (!newInvite) {
        return interaction.update({
            content: 'У тебя больше нет приглашений.',
            embeds: [],
            components: [],
        });
    }

    const team = newInvite.team_id as ITeam;

    const teamEmbed = await getTeamInfoEmbed(team);
    teamEmbed.setTitle(`Приглашение в ${team.name}`);

    await interaction.update({
        content: 'test',
        components: [teamInviteBtns()],
        embeds: [teamEmbed]
    });
}