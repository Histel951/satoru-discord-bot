import { ITeam } from "../../interfaces/schemas/ITeam";
import { IPlayer } from "../../interfaces/schemas/IPlayer";
import { BaseInteraction, EmbedBuilder } from "discord.js";
import { Player } from "../../database/models";
import RanksObjectEnumWithNumber from "../../enums/RanksObjectEnumWithNumber";
import { RanksEnum } from "../../enums/RanksEnum";

const generatePlayerInfo = async (player: IPlayer, interaction: BaseInteraction) => {
    const user = await interaction.guild?.members.fetch(player.discordId);
    let value = `Дискорд: ${user}\nРанг: ${RanksObjectEnumWithNumber[player.rank as RanksEnum]}`;

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

export default async (team: ITeam, interaction: BaseInteraction): Promise<EmbedBuilder> => {
    const embed = new EmbedBuilder()
        .setThumbnail(team.image_url)
        .setDescription(generateTeamDescription(team))
        .setTitle(team.name);

    const players = await Player.find({
        team: team._id,
    }).exec();

    const fields = [];
    for (const player of players) {
        fields.push(await generatePlayerInfo(player, interaction))
    }

    embed.setFields(fields);

    return embed;
}