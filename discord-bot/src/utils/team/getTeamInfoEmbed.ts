import { ITeam } from "../../interfaces/schemas/ITeam";
import { IPlayer } from "../../interfaces/schemas/IPlayer";
import { EmbedBuilder } from "discord.js";
import { Player } from "../../database/models";
import RanksObjectEnumWithNumber from "../../enums/RanksObjectEnumWithNumber";
import { RanksEnum } from "../../enums/RanksEnum";

const generatePlayerInfo = (player: IPlayer) => {
    let value = `Роль: Керри\nРанг: ${RanksObjectEnumWithNumber[player.rank as RanksEnum]}`;

    if (player.rank === RanksEnum.Immortal && player.leaderboardRank) {
        value += ` #${player.leaderboardRank}`;
    }

    value += `\nDota id: ${player.steamAccountId}`;

    return {
        name: `- ${player.name}`,
        value,
    }
}

const generateTeamDescription = (team: ITeam) => `🏆 Рейтинг: ${team.ratingPoints}\n\n👥 Состав команды: `;

export default async (team: ITeam): Promise<EmbedBuilder> => {
    const embed = new EmbedBuilder()
        .setThumbnail(team.image_url)
        .setDescription(generateTeamDescription(team))
        .setTitle(team.name);

    const players = await Player.find({
        team: team._id,
    }).exec();

    const fields = players.map(player => generatePlayerInfo(player));
    embed.setFields(fields);

    return embed;
}