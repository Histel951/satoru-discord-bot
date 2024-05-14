import {CommandInteraction } from "discord.js";
import { Document } from "mongoose";
import { ITeam } from "../../../../interfaces/schemas/ITeam";
import { IPlayer } from "../../../../interfaces/schemas/IPlayer";
import { ExecuteT } from "../../../../types/ExecuteTypes";
import getTeamInfoEmbed from "../../../../utils/team/getTeamInfoEmbed";

export default async (
    interaction: CommandInteraction,
    { team, players }: { team: ITeam & Document, players: IPlayer[] & Document[] }
): ExecuteT => await interaction.reply({
    embeds: [await getTeamInfoEmbed(team, { players })],
    ephemeral: true,
});