import { CommandInteraction, InteractionResponse } from "discord.js";
import { ITeamInvite } from "../../../interfaces/schemas/ITeamInvite";
import { ITeam } from "../../../interfaces/schemas/ITeam";
import { Player, TeamInvite } from "../../../database/models";

export default async (
    interaction: CommandInteraction,
    { team, invite }: { team: ITeam & Document, invite: ITeamInvite & Document }
): Promise<InteractionResponse|void> => {
    await Player.updateOne({
        discord_id: interaction.user.id,
    }, {
        team_id: team._id,
    });

    await TeamInvite.deleteOne({
        _id: invite._id,
    });

    return interaction.reply({
        content: `Теперь вы состоите в команде ${team.name}.`,
    });
}