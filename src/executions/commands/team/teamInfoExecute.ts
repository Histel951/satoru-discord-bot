import {CommandInteraction, EmbedBuilder} from "discord.js";
import { ExecuteT } from "../../../types/ExecuteTypes";
import { ITeam } from "../../../interfaces/schemas/ITeam";
import { IPlayer } from "../../../interfaces/schemas/IPlayer";
import { DotaRolesEnum } from "../../../enums/DotaRolesEnum";

export default async (interaction: CommandInteraction, { team, players }: { team: ITeam & Document, players: IPlayer[] & Document[] }): ExecuteT => {
    const embed = new EmbedBuilder().setColor('#379C6F')
        .setThumbnail(team.image_url)
        .setDescription('Состав команды: ')
        .setTitle(team.name);

    players.forEach(player => {
        embed.setFields({
            name: player.personaname,
            value: DotaRolesEnum[player.role as number],
        });
    });

    return await interaction.reply({
        embeds: [embed]
    });
}