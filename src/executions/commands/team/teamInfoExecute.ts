import {CommandInteraction } from "discord.js";
import { ExecuteT } from "../../../types/ExecuteTypes";
import { ITeam } from "../../../interfaces/schemas/ITeam";
import { IPlayer } from "../../../interfaces/schemas/IPlayer";
import getTeamInfoEmbed from "../../../utils/team/getTeamInfoEmbed";
import { Document } from "mongoose";

export default async (
    interaction: CommandInteraction,
    { team, players }: { team: ITeam & Document, players: IPlayer[] & Document[] }
): ExecuteT => await interaction.reply({
    embeds: [await getTeamInfoEmbed(team, { players })],
    ephemeral: true,
});