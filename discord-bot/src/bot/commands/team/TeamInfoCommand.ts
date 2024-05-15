import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import { CommandInteraction } from "discord.js";
import { ITeam } from "../../../interfaces/schemas/ITeam";
import { Document } from "mongoose";
import { IPlayer } from "../../../interfaces/schemas/IPlayer";
import getTeamInfoEmbed from "../../../utils/team/getTeamInfoEmbed";
import { Player, Team } from "../../../database/models";
import AbstractCommand from "../AbstractCommand";

type TeamInfoOptionT = { team: ITeam & Document, players: IPlayer[] & Document[] };

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction, { team, players }: TeamInfoOptionT) {
        return await interaction.reply({
            embeds: [await getTeamInfoEmbed(team, { players })],
            ephemeral: true,
        });
    }

    async middleware(interaction: CommandInteraction) {
        const options = interaction.options;
        const name = options.get('team-name')?.value as string;

        const team = await Team.findOne({
            name
        }).exec();

        if (!team) {
            return {
                result: false,
                interaction,
                options: {
                    content: 'Команда не найдена.',
                    ephemeral: true,
                },
            };
        }

        const players = await Player.find({
            team_id: team?._id,
        }).exec();

        return {
            result: true,
            interaction,
            options: {
                team,
                players,
            }
        }
    }

    getOptions(): CommandOptionSetCallbackT[] {
        return [
            options =>
                options.setName('team-name')
                    .setDescription('Информация по команде.')
                    .setRequired(true),
        ]
    }
}