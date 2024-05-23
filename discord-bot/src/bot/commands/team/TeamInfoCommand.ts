import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import { CommandInteraction } from "discord.js";
import { ITeam } from "../../../interfaces/schemas/ITeam";
import { Document } from "mongoose";
import getTeamInfoEmbed from "../../../utils/team/getTeamInfoEmbed";
import { Player, Team } from "../../../database/models";
import AbstractCommand from "../AbstractCommand";

type TeamInfoOptionT = { team: ITeam & Document };

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction, { team }: TeamInfoOptionT) {
        return await interaction.reply({
            embeds: [await getTeamInfoEmbed(team)],
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

        return {
            result: true,
            interaction,
            options: {
                team,
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