import { CommandInteraction } from "discord.js";
import { Document } from "mongoose";
import { ExecuteT } from "../../../../types/ExecuteTypes";
import { Player, TeamInvite } from "../../../../database/models";
import { IPlayer } from "../../../../interfaces/schemas/IPlayer";
import { ITeam } from "../../../../interfaces/schemas/ITeam";
import getTeamInfoEmbed from "../../../../utils/team/getTeamInfoEmbed";
import { DotaRolesEnum } from "../../../../enums/DotaRolesEnum";
import teamInviteBtns from "../../../ui-interface/btns/teamInviteBtns";

export default async (interaction: CommandInteraction): ExecuteT => {
    const player = await Player.findOne({
        discord_id: interaction.user.id,
    }).exec() as Document & IPlayer;

    const invite = await TeamInvite.findOne({
        player_id: player._id,
    }).populate({
        path: 'team_id',
    }).exec();

    if (!invite) {
        return await interaction.reply({
            content: 'У тебя нет приглашений.',
            ephemeral: true,
        });
    }

    const team = invite.team_id as ITeam;

    const teamEmbed = await getTeamInfoEmbed(team);
    teamEmbed.setTitle(`Приглашение в ${team.name}`);
    teamEmbed.setDescription(`
    Роль: ${DotaRolesEnum[invite.role]}
    Средний рейтинг: 4500
    Состав команды:
    `);

    await interaction.reply({
        embeds: [teamEmbed],
        components: [teamInviteBtns()],
        ephemeral: true,
    });
};