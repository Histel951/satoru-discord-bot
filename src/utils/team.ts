import { Player, Team } from "../database/models";
import { CreateTeamType } from "../types";

export const createTeam = async ({ discordId, name }: CreateTeamType) => {
    try {
        // Находим игрока по Discord ID
        const player = await Player.findOne({ discord_id: discordId }).exec();

        if (!player) {
            throw new Error(`Player with Discord ID ${discordId} not found`);
        }

        // Создаем новую команду с указанным именем и владельцем (игроком)
        const team = new Team({
            name: name,
            owner: player
        });

        // Сохраняем команду
        await team.save();

        // Обновляем информацию о команде у игрока
        player.team = team.id;
        await player.save();

        return team;
    } catch (error) {
        throw new Error(`Failed to create team: ${error.message}`);
    }
};
