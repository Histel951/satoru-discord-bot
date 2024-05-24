import AbstractListener from "../AbstractListener";
import { ButtonInteraction } from "discord.js";
import { Player, TeamInvite } from "../../../database/models";
import { ITeam } from "../../../interfaces/schemas/ITeam";
import getTeamInfoEmbed from "../../../utils/team/getTeamInfoEmbed";
import { DotaRolesEnum } from "../../../enums/DotaRolesEnum";
import teamInviteBtns from "../../ui-interface/btns/teamInviteBtns";

export default class extends AbstractListener<ButtonInteraction> {

    async execute(interaction: ButtonInteraction) {
        const player = await Player.findOne({
            discordId: interaction.user.id
        }).exec();

        await TeamInvite.deleteOne({
            player_id: player!._id
        }).exec();

        const newInvite = await TeamInvite.findOne({
            player_id: player!._id
        }).populate({
            path: 'team_id',
        }).exec();

        if (!newInvite) {
            return await interaction.update({
                content: 'У тебя больше нет приглашений.',
                embeds: [],
                components: [],
            });
        }

        const team = newInvite.team_id as ITeam;

        const teamEmbed = await getTeamInfoEmbed(team, interaction);
        teamEmbed.setTitle(`Приглашение в ${team.name}`);
        teamEmbed.setDescription(`
    Позиция: ${DotaRolesEnum[newInvite.role]}
    Средний рейтинг: 4500
    Состав команды:
    `)

        await interaction.update({
            components: [teamInviteBtns()],
            embeds: [teamEmbed]
        });
    }
}