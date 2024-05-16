import AbstractListener from "../AbstractListener";
import { ButtonInteraction } from "discord.js";
import { InteractionT } from "../../../types/InteractionT";
import { Player, TeamInvite } from "../../../database/models";
import { ITeam } from "../../../interfaces/schemas/ITeam";
import getTeamInfoEmbed from "../../../utils/team/getTeamInfoEmbed";

export default class extends AbstractListener<ButtonInteraction> {
    async execute(interaction: ButtonInteraction & InteractionT) {
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