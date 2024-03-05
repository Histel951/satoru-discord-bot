import { User, Team, Player } from "../database/models";
import { CreateTeamType } from "../types/ModelTypes";
import handleError from "./handleError";
import { Document } from "mongoose";

export const createTeam = async ({ discordId, name }: CreateTeamType): Promise<Document> => {
    try {
        // Находим игрока по Discord ID
        const user = await User.findOne({ discord_id: discordId }).exec();

        if (!user) {
            throw new Error(`User with Discord ID "${discordId}" not found`);
        }

        // Создаем новую команду с указанным именем и владельцем (игроком)
        const team = new Team({
            name: name,
            owner: user
        });

        // Сохраняем команду
        await team.save();

        if (!user.player_id) {
            const player = new Player({
                team_id: team.id
            });
            await player.save()

            user.player_id = player.id
            await user.save();
        }

        return team;
    } catch (e) {
        throw new Error(`Failed to create team: ${handleError(e as Error)}`);
    }
};
