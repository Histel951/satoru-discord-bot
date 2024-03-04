import { User, Team } from "../database/models";
import { CreateTeamType } from "../types/ModelTypes";
import handleError from "./handleError";

export const createTeam = async ({ discordId, name }: CreateTeamType) => {
    try {
        // Находим игрока по Discord ID
        const user = await User.findOne({ discord_id: discordId }).exec();

        if (!user) {
            throw new Error(`Player with Discord ID ${discordId} not found`);
        }

        // Создаем новую команду с указанным именем и владельцем (игроком)
        const team = new Team({
            name: name,
            owner: user
        });

        // Сохраняем команду
        await team.save();

        // Обновляем информацию о команде у игрока
        user.team = team.id;
        await user.save();

        return team;
    } catch (e) {
        throw new Error(`Failed to create team: ${handleError(e as Error)}`);
    }
};
