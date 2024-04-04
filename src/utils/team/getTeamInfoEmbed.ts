import { ITeam } from "../../interfaces/schemas/ITeam";
import { IPlayer } from "../../interfaces/schemas/IPlayer";
import { EmbedBuilder } from "discord.js";
import { DotaRolesEnum } from "../../enums/DotaRolesEnum";
import { Player } from "../../database/models";
import { Document } from "mongoose";

export default async (team: ITeam, { players }: { players?: IPlayer[] & Document[] } = {}): Promise<EmbedBuilder> => {
    const embed = new EmbedBuilder().setColor(team.color)
        .setThumbnail(team.image_url)
        .setDescription('Состав команды: ')
        .setTitle(team.name);

    if (players) {
        players.forEach(player => {
            embed.setFields({
                name: player.personaname,
                value: DotaRolesEnum[player.role as number],
            });
        });
    } else {
        const players = await Player.find({
            team_id: team._id,
        }).exec();


        players.forEach(player => {
            embed.setFields({
                name: player.personaname,
                value: DotaRolesEnum[player.role as number],
            });
        });
    }


    return embed;
}