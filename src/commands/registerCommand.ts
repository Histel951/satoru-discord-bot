import { CommandType } from "../types/CommandTypes";
import createInput from "../utils/ui/createInput";
import { Role, TextInputBuilder, TextInputStyle } from "discord.js";
import createModal from "../utils/ui/createModal";
import { RolesEnum } from "../enums/RolesEnum";
import showPlayerInfo from "../utils/me/showPlayerInfo";
import findPlayer from "../utils/dota/findPlayer";

export const registerCommand: CommandType = {
    name: 'register',
    description: 'Зарегистрироваться на сервере как игрок',
    middleware: async interaction => {
        const member = await interaction.guild?.members.fetch(interaction.user.id);

        if (member && member.roles.cache.some(role => role.name === RolesEnum.Approved)) {
            const player = await findPlayer(interaction.user.id);
            return interaction.reply({
                content: `Вы уже зарегистрированы как:\n${showPlayerInfo(player)}`,
                ephemeral: true,
            });
        }

        return interaction;
    },
    execute: async interaction => {
        const dotaIdInput = createInput({
            customId: 'input-dota-profile-id',
            label: 'Укажите ID профиля Dota 2:',
            style: TextInputStyle.Short,
        });

        const modal = createModal<TextInputBuilder>({
            customId: 'player-registration',
            title: 'Регистрация игрока',
            rows: [dotaIdInput],
        });

        return interaction.showModal(modal);
    },
};
