import { ButtonInteraction } from "discord.js";
import getTeamInfoEmbed from "../../../../utils/team/getTeamInfoEmbed";
import { ITeam } from "../../../../interfaces/schemas/ITeam";
import { Player, TeamInvite } from "../../../../database/models";
import { ListenerType } from "../../../../types/ListenerTypes";

const listeners: ListenerType<ButtonInteraction> = {
    name: 'accept-team-invite',
    execute: async interaction => {
        const player = await Player.findOne({
            discord_id: interaction.user.id
        }).exec();

        const invite = await TeamInvite.findOne({
            player_id: player!._id
        }).populate({
            path: 'team_id',
        }).exec();

        const team = invite!.team_id as ITeam;

        await player!.updateOne({
            team_id: invite!.team_id
        }).exec();

        const teamEmbed = await getTeamInfoEmbed(team);
        teamEmbed.setTitle(team.name);
        teamEmbed.setDescription(`
    Средний рейтинг: 4500
    Состав команды:
    `);

        await TeamInvite.deleteMany({
            player_id: player!._id
        }).exec();

        await interaction.update({
            content: `Вы втупили в команду!`,
            components: [],
            embeds: [teamEmbed]
        });
    }
}

export default listeners;