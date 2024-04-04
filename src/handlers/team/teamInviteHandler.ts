import { ButtonInteraction } from "discord.js";
import teamInviteBtns from "../../ui-interface/btns/teamInviteBtns";
import getTeamInfoEmbed from "../../utils/team/getTeamInfoEmbed";
import { ITeam } from "../../interfaces/schemas/ITeam";
import { Player, TeamInvite } from "../../database/models";
import { IPlayer } from "../../interfaces/schemas/IPlayer";
import { DotaRolesEnum } from "../../enums/DotaRolesEnum";
import { Document } from "mongoose";
import { ITeamInvite } from "../../interfaces/schemas/ITeamInvite";

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

export const acceptTeamInvite = async (interaction: ButtonInteraction) => {
    const player = await Player.findOne({
        discord_id: interaction.user.id
    }).exec() as IPlayer & Document;

    const invite = await TeamInvite.findOne({
        player_id: player._id
    }).populate({
        path: 'team_id',
    }).exec() as ITeamInvite & Document;

    await player.updateOne({
        team_id: invite.team_id
    }).exec();

    const team = invite.team_id as ITeam;

    const teamEmbed = await getTeamInfoEmbed(team);
    teamEmbed.setTitle(team.name);
    teamEmbed.setDescription(`
    Средний рейтинг: 4500
    Состав команды:
    `);

    await TeamInvite.deleteMany({
        player_id: player._id
    }).exec();

    await interaction.update({
        content: `Вы втупили в команду!`,
        components: [],
        embeds: [teamEmbed]
    });
}